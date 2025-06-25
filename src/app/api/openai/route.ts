// src/app/api/openai/route.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge' // or 'nodejs' if you prefer

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY!
    })
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant for a food ordering application." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    })
    
    const text = response.choices[0].message.content

    return NextResponse.json({ text })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}