import { getPineconeIndex } from "#pinecone.js";
import { PineconeVector } from "#types.js";

/**
 * Upsert array of vectors to Pinecone.
 *
 * @param {PineconeVector[]} vectors - Array of vector objects.
 */
export async function upsertVectors(vectors: PineconeVector[]): Promise<void> {
  const pineconeIndex = await getPineconeIndex();
  await pineconeIndex.upsert(vectors);
}
