import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const getFilePath = () => path.join('/tmp', 'draft_content.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const filePath = getFilePath();
    
    // Write JSON payload to draft_content.json in the project root
    await fs.writeFile(filePath, JSON.stringify(body, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save draft.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = getFilePath();
    
    // Read and parse file
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Draft content not found or unreadable.' },
      { status: 404 }
    );
  }
}
