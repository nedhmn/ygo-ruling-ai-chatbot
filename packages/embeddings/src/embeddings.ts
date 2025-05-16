import env from "#config.js";
import getOpenAIClient from "#openai.js";
import { embed, embedMany, EmbeddingModel } from "ai";

let _embeddingModel: EmbeddingModel<string> | undefined;

/**
 * Get Embedding Model from OpenAI.
 *
 * @returns {EmbeddingModel<string>} - Embedding model.
 */
export function getEmbeddingModel(): EmbeddingModel<string> {
  if (_embeddingModel) {
    return _embeddingModel;
  }

  const openai = getOpenAIClient();

  // ref: https://ai-sdk.dev/providers/ai-sdk-providers/openai#embedding-models
  _embeddingModel = openai.embedding(env.OPENAI_EMBEDDING_MODEL, {
    dimensions: env.OPENAI_EMBEDDING_DIMENSION,
  });

  return _embeddingModel;
}

/**
 * Generate embeddings from an array of texts.
 *
 * @param {string[]} texts - Array of texts to embed.
 * @returns {Promise<number[][]>} - An array of embeddings.
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddingModel = getEmbeddingModel();

  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: texts,
  });

  return embeddings;
}

/**
 * Generate embeddings from text.
 *
 * @param {string} text - The text to embed.
 * @returns {Promise<number[]>} - The embeddings of the text.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const embeddingModel = getEmbeddingModel();

  const { embedding } = await embed({
    model: embeddingModel,
    value: text,
  });

  return embedding;
}
