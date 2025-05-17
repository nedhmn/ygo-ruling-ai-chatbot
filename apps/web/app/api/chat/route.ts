import getOpenAIClient from "@repo/embeddings/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const openai = getOpenAIClient();

    const result = streamText({
      model: openai.responses("gpt-4o-mini"),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
