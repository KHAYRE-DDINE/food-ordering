// src/app/api/gemini/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'edge' // or 'nodejs' if you prefer

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ text })
  } catch (error) {
    console.error('Error in Gemini API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}