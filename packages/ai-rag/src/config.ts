import { z } from "zod";
import { loadEnvFile } from "@repo/utils";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  loadEnvFile("../.env.local", import.meta.url);
}

const env_schema = z.object({
  OPENAI_API_KEY: z.string(),
  EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  EMBEDDING_DIMENSIONS: z.number().int().default(1536),
  PINECONE_API_KEY: z.string(),
  PINECONE_INDEX_NAME: z.string(),
  PINECONE_INDEX_DIMENSION: z.number().int().default(1536),
  PINECONE_INDEX_METRIC: z
    .enum(["cosine", "dotproduct", "euclidean"] as const)
    .default("cosine"),
  PINECONE_INDEX_CLOUD: z.enum(["aws", "azure", "gcp"] as const).default("aws"),
  PINECONE_INDEX_REGION: z.string().default("us-east-1"),
});

const env = env_schema.parse(process.env);

export default env;
