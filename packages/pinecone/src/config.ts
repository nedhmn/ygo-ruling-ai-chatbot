import { z } from "zod";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}

const envSchema = z.object({
  PINECONE_API_KEY: z.string(),
  PINECONE_INDEX_NAME: z.string(),
  PINECONE_INDEX_DIMENSION: z
    .number()
    .int()
    .default(1536)
    .describe(
      "Vector database dimensions need to match embedding model dimensions"
    ),
  PINECONE_INDEX_METRIC: z
    .enum(["cosine", "dotproduct", "euclidean"] as const)
    .default("cosine"),
  PINECONE_INDEX_CLOUD: z.enum(["aws", "azure", "gcp"] as const).default("aws"),
  PINECONE_INDEX_REGION: z.string().default("us-east-1"),
});

const env = envSchema.parse(process.env);

export default env;
