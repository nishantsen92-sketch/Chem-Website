import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { target, prompt, currentContent, topic } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: GEMINI_API_KEY is missing.' },
        { status: 500 }
      );
    }

    let systemPrompt = '';
    if (target === 'script') {
      systemPrompt = `You are an expert chemistry copywriter and educator. Modify and rewrite the Hinglish reels script according to the user prompt. Keep the Hinglish style, pacing, and timecodes [00:00] format. Return ONLY the modified script text without markdown formatting wrappers.

Topic: ${topic}
Current script:
${currentContent}

User modification instructions:
${prompt}`;
    } else if (target === 'app') {
      systemPrompt = `You are an expert Three.js and modern Web UI developer. Modify the user's provided HTML/JS app according to their prompt. Return ONLY valid, executable raw HTML code with integrated CDN scripts (Three.js, Tailwind, Canvas) without markdown wrapping.

Topic: ${topic}
Current app html:
${currentContent}

User modification instructions:
${prompt}`;
    } else {
      // target === 'image'
      systemPrompt = `You are an expert chemistry graphic designer. Expand the user's instructions for a chemistry note sheet into a detailed, descriptive image generation prompt (describing visual elements, colors, chemical formulas, and diagrams). Output ONLY the descriptive prompt under 75 words without any preambles or markdown formatting wrappers.

Topic: ${topic}
User instructions:
${prompt}`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: target === 'image' ? 0.3 : 0.1,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Gemini API returned error: ${errorData || response.statusText}`);
    }

    const resJson = await response.json();
    let text = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';

    text = text.trim();

    if (target === 'script') {
      return NextResponse.json({ script: text });
    } else if (target === 'app') {
      // Strip markdown code blocks if the model generates them anyway
      if (text.includes('```html')) {
        text = text.split('```html')[1].split('```')[0];
      } else if (text.includes('```')) {
        text = text.split('```')[1].split('```')[0];
      }
      return NextResponse.json({ app_html: text.trim() });
    } else {
      // target === 'image'
      // Prepend the required strict 2D Pinterest Infographic guidelines
      const enforcedStyle = "Vertical 2D flat visual infographic study sheet on grid paper background, Pinterest handwritten aesthetic, pastel containers, doodle diagrams, clean educational poster. STRICTLY NO REAL WORLD PHOTOGRAPHY, NO 3D REALISTIC RENDERS. ";
      const fullImagePrompt = enforcedStyle + text;

      try {
        const imagenResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prompt: fullImagePrompt,
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '3:4',
            }),
          }
        );

        if (!imagenResponse.ok) {
          const errText = await imagenResponse.text();
          throw new Error(`Imagen API error: ${errText}`);
        }

        const imagenJson = await imagenResponse.json();
        const base64Bytes = imagenJson.generatedImages?.[0]?.image?.imageBytes;
        if (!base64Bytes) {
          throw new Error('Imagen response did not contain imageBytes.');
        }

        const image_url = `data:image/jpeg;base64,${base64Bytes}`;
        return NextResponse.json({ image_url });
      } catch (imagenError: any) {
        console.warn('Imagen generation failed, falling back to Unsplash:', imagenError.message);
        
        // Fallback to Unsplash chemistry note search query
        const keywords = topic.toLowerCase().replace(/[^a-z0-9]/g, ',');
        const image_url = `https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=800&q=80&sig=${Math.floor(Math.random() * 10000)}&q=${encodeURIComponent(keywords)}`;
        return NextResponse.json({ image_url });
      }
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to refine content.' },
      { status: 500 }
    );
  }
}
