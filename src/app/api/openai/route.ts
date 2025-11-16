import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  console.log("=== OpenAI API Route Called ===");
  
  try {
    // Log that we're starting the request
    console.log("1. Environment check:");
    console.log("   - API Key exists:", !!process.env.OPENAI_API_KEY);
    console.log("   - API Key length:", process.env.OPENAI_API_KEY?.length);
    console.log("   - API Key prefix:", process.env.OPENAI_API_KEY?.substring(0, 7));

    const body = await request.json();
    console.log("2. Request body received:", JSON.stringify(body, null, 2));

    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.log("3. Error: Invalid messages format");
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    console.log("3. Creating OpenAI completion with messages:", messages.length);

    // Create a simpler, more controlled request
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Respond in a friendly manner."
        },
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    console.log("4. OpenAI response received:");
    console.log("   - Choices count:", completion.choices.length);
    console.log("   - First choice message:", completion.choices[0]?.message);

    const assistantMessage = completion.choices[0]?.message;

    if (!assistantMessage || !assistantMessage.content) {
      console.log("5. Error: No valid response from OpenAI");
      throw new Error("No response generated from OpenAI");
    }

    console.log("5. Success: Sending response to client");
    
    return NextResponse.json({
      role: "assistant",
      content: assistantMessage.content
    });

  } catch (error: unknown) {
    console.error("6. ERROR DETAILS:");
    
    // Type-safe error handling
    let errorMessage = "An unexpected error occurred";
    let statusCode = 500;
    
    // Log error details safely
    if (error instanceof Error) {
      console.error("   - Error name:", error.name);
      console.error("   - Error message:", error.message);
    }
    
    // Type assertion for API error with code and status
    const apiError = error as { code?: string; status?: number; message?: string };
    
    console.error("   - Error code:", apiError.code);
    console.error("   - Error status:", apiError.status);
    console.error("   - Full error:", error);

    if (apiError.code === 'invalid_api_key') {
      errorMessage = "Invalid OpenAI API key. Please check your API key.";
      statusCode = 401;
    } else if (apiError.status === 429) {
      errorMessage = "Rate limit exceeded. Please try again later.";
      statusCode = 429;
    } else if (apiError.status === 401) {
      errorMessage = "Authentication error. Please check your API key.";
      statusCode = 401;
    } else if (apiError.message?.includes('quota')) {
      errorMessage = "API quota exceeded. Please check your OpenAI account billing.";
      statusCode = 402;
    } else {
      errorMessage = apiError.message || "Internal server error";
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        code: apiError.code,
        status: apiError.status
      },
      { status: statusCode }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}