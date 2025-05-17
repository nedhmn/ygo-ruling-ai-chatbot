import { getRelevantRulings } from "@/lib/ai-tools";
import getOpenAIClient from "@repo/embeddings/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { env } from "@/app/env";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const openai = getOpenAIClient();

    const result = streamText({
      model: openai.responses(env.OPENAI_MODEL),
      messages,
      system: `
        You are a Yu-Gi-Oh! Goat Format ruling expert.
        You only answer questions about Yu-Gi-Oh! Goat Format rulings.
        The getInformation tool is mandatory for providing ruling context.
        The getInformation tool returns an array of objects containing the keys "title" and "url".
        Always link the URL as the source (with the title as the hyperlink text) for any ruling context you use.
        If the tool's results do not completely answer the question, respond with "Sorry, I don't know."
        If a query involves content outside of Goat Format rulings, respond with "I only do Goat Format rulings."
        Check your knowledge base before answering any questions.
      `,
      tools: {
        getInformation: tool({
          description:
            "Get information from your knowledge base to answer Yu-Gi-Oh! Goat Format rulings questions.",
          parameters: z.object({
            question: z.string().describe("the user's question"),
          }),
          execute: async ({ question }) => getRelevantRulings(question),
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
