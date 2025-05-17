import { getPineconeIndex } from "#pinecone.js";
import { ScoredPineconeRecord } from "@pinecone-database/pinecone";

export interface Metadata {
  card: string;
  ruling: string;
  title: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type ContextType = ScoredPineconeRecord<Metadata>;

/**
 * Use embeddings to get topK relevant content from
 * Pinecone database.
 *
 * @param {number[]} embeddings - An array of embeddings.
 * @param {number} topK - The number of results to return.
 */
export async function getRelevantContext(
  embeddings: number[],
  topK: number = 3
): Promise<ContextType[]> {
  const pineconeIndex = await getPineconeIndex();

  const { matches } = await pineconeIndex.query({
    vector: embeddings,
    topK: topK,
    includeMetadata: true,
  });

  return matches as ContextType[];
}
