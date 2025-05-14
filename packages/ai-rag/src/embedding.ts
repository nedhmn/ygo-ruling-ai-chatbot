import env from "#config.js";
import openai from "#openai.js";
import { embed } from "ai";

const embeddingModel = openai.embedding(env.OPENAI_EMBEDDING_MODEL);

export async function generateEmbedding(value: string): Promise<number[]> {
  // Clean value
  const input = value.replaceAll("\\n", " ");

  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });

  return embedding;
}
