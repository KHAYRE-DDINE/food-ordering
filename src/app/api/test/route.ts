import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyLength: process.env.OPENAI_API_KEY?.length,
    apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7)
  });
}