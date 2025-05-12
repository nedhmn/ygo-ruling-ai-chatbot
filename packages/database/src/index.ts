import { Pinecone } from "@pinecone-database/pinecone";
import env from "@repo/database/config";

const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});

// Create an index if one doesn't exist
if (!pc.index(env.PINECONE_INDEX_NAME)) {
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
  });
}

export const index = pc.index(env.PINECONE_INDEX_NAME);
