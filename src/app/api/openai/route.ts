import { NextResponse } from "next/server";
import OpenAI from "openai";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  // The client is created per request so the build does not require the key.
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "The assistant is not available right now." },
      { status: 503 }
    );
  }
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const body = await request.json();
    const { messages } = body as { messages?: unknown };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Only forward user/assistant text, capped in count and length, so callers
    // cannot inject a system prompt or send unbounded input.
    const safeMessages: ChatMessage[] = messages
      .filter(
        (msg): msg is ChatMessage =>
          typeof msg === "object" &&
          msg !== null &&
          (msg.role === "user" || msg.role === "assistant") &&
          typeof msg.content === "string"
      )
      .slice(-10)
      .map((msg) => ({ role: msg.role, content: msg.content.slice(0, 1000) }));

    if (safeMessages.length === 0) {
      return NextResponse.json({ error: "No valid messages" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Respond in a friendly manner.",
        },
        ...safeMessages,
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const assistantMessage = completion.choices[0]?.message;
    if (!assistantMessage || !assistantMessage.content) {
      throw new Error("No response generated from OpenAI");
    }

    return NextResponse.json({
      role: "assistant",
      content: assistantMessage.content,
    });
  } catch (error: unknown) {
    const apiError = error as { code?: string; status?: number; message?: string };
    // Log the error class/status only: never keys, prompts or full payloads.
    console.error("OpenAI route error:", apiError.status ?? "", apiError.code ?? "", error instanceof Error ? error.name : "");

    let errorMessage = "The assistant could not answer right now. Please try again.";
    let statusCode = 500;

    if (apiError.status === 429) {
      errorMessage = "The assistant is busy. Please try again later.";
      statusCode = 429;
    } else if (apiError.status === 401 || apiError.code === "invalid_api_key") {
      // Misconfiguration: do not reveal details to the client.
      errorMessage = "The assistant is not available right now.";
      statusCode = 503;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
