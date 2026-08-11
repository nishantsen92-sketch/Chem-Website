import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, current_app_html } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: GEMINI_API_KEY is missing.' },
        { status: 500 }
      );
    }

    // Build the system and context instruction prompt for Gemini
    const systemPrompt = `You are an expert Three.js and modern Web UI developer. Modify the user's provided HTML/JS app according to their prompt. Return ONLY valid, executable raw HTML code with integrated CDN scripts (Three.js, Tailwind, Canvas) without markdown wrapping.

Here is the current HTML code of the 3D chemistry simulation:
\`\`\`html
${current_app_html}
\`\`\`

User instructions for modifications:
${prompt}

Remember: Output ONLY the complete, corrected, single HTML file containing style, body, and javascript. No markdown code blocks (e.g. do NOT wrap with \`\`\`html or \`\`\` tags). Just output raw executable HTML.`;

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
            temperature: 0.1, // Low temperature for precise code editing
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

    // Strip markdown code block wrappers if the model generated them
    text = text.trim();
    if (text.includes('```html')) {
      text = text.split('```html')[1].split('```')[0];
    } else if (text.includes('```')) {
      text = text.split('```')[1].split('```')[0];
    }

    const updated_html = text.trim();

    return NextResponse.json({ updated_html });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to refine app code.' },
      { status: 500 }
    );
  }
}
