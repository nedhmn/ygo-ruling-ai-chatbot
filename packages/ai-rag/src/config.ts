import { loadEnvFile } from "@repo/utils";
import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  loadEnvFile("../.env.local", import.meta.url);
}

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  OPENAI_EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  OPENAI_EMBEDDING_DIMENSION: z.number().int().default(1536),
});

const env = envSchema.parse(process.env);

export default env;
