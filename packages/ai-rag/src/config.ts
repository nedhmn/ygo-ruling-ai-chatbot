import { z } from "zod";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
  const env_path = path.resolve(__dirname, "../.env.local");
  dotenv.config({ path: env_path });
}

const env_schema = z.object({
  OPENAI_API_KEY: z.string(),
});

const env = env_schema.parse(process.env);

export default env;
