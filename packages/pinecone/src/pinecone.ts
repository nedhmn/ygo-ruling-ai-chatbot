import env from "#config.js";
import { Index, Pinecone } from "@pinecone-database/pinecone";

let _pineconeIndex: Index | undefined;

export async function getPineconeIndex(): Promise<Index> {
  if (_pineconeIndex) {
    return _pineconeIndex;
  }

  // Initialize Pinecone Vector Database
  const pc = new Pinecone({
    apiKey: env.PINECONE_API_KEY,
  });

  const { indexes } = await pc.listIndexes();
  const indexExists = indexes?.find((i) => i.name === env.PINECONE_INDEX_NAME);

  // If "PINECONE_INDEX_NAME" doesn't exist, create it
  if (!indexExists) {
    await pc.createIndex({
      name: env.PINECONE_INDEX_NAME,
      dimension: env.PINECONE_INDEX_DIMENSION,
      metric: env.PINECONE_INDEX_METRIC,
      spec: {
        serverless: {
          cloud: env.PINECONE_INDEX_CLOUD,
          region: env.PINECONE_INDEX_REGION,
        },
      },
      waitUntilReady: true,
      suppressConflicts: true,
    });
  }

  _pineconeIndex = pc.index(env.PINECONE_INDEX_NAME);

  return _pineconeIndex;
}
