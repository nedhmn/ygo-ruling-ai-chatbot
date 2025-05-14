import env from "#config.js";
import getOpenAIClient from "#openai.js";
import { embed, EmbeddingModel } from "ai";

let _embeddingModel: EmbeddingModel<string> | undefined;

/**
 * Get Embedding Model from OpenAI.
 */
export function getEmbeddingModel(): EmbeddingModel<string> {
  const openai = getOpenAIClient();

  // ref: https://ai-sdk.dev/providers/ai-sdk-providers/openai#embedding-models
  _embeddingModel = openai.embedding(env.OPENAI_EMBEDDING_MODEL, {
    dimensions: env.OPENAI_EMBEDDING_DIMENSION,
  });

  return _embeddingModel;
}

/**
 * Generate embeddings from text.
 *
 * @param {string} text - The text to embed.
 * @returns {Promise<number[]>} - The embeddings of the text.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Initialize embedding model and clean input
  const embeddingModel = getEmbeddingModel();
  const input = text.replaceAll("\\n", " ");

  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });

  return embedding;
}
