import pc from "#client.js";
import env from "#config.js";

async function getPineconeIndex() {
  const indexes = (await pc.listIndexes()).indexes;

  // Create the Index if it doesn't exist
  if (
    !indexes ||
    indexes.filter((i) => i.name === env.PINECONE_INDEX_NAME).length !== 1
  ) {
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

  return pc.index(env.PINECONE_INDEX_NAME);
}

export async function findRelevantContext() {}
