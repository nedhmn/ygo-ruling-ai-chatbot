import dotenv from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}

const envSchema = z.object({
  OPENAI_API_KEY: z.string(),
  OPENAI_EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  OPENAI_EMBEDDING_DIMENSION: z.number().int().default(1536),
});

const env = envSchema.parse(process.env);

export default env;
