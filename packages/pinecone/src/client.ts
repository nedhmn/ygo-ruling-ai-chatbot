import { Pinecone } from "@pinecone-database/pinecone";
import env from "#config.js";

// Initialize Pinecone Vector Database
const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});

async function initPineconeIndex(): Promise<void> {
  // Get all indexes
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
}

await initPineconeIndex();

const pcIndex = pc.index(env.PINECONE_INDEX_NAME);

export default pcIndex;
