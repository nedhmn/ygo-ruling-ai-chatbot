import { getPineconeIndex } from "#pinecone.js";
import { PineconeVector } from "#types.js";

export async function batchUpsertVectors(
  vectors: PineconeVector[],
  batchSize: number = 50
): Promise<void> {
  // Get Pinecone Index
  const pineconeIndex = await getPineconeIndex();

  for (let i = 0; i < vectors.length; i += batchSize) {
    const batch = vectors.slice(i, i + batchSize);

    try {
      await pineconeIndex.upsert(batch);
      console.log(
        `Successfully upserted batch ${i / batchSize + 1} with ${
          batch.length
        } vectors.`
      );
    } catch (error) {
      console.error("Error upserting batch to Pinecone:", error);
    }
  }
}
