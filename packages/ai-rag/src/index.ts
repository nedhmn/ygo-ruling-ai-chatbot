import OpenAI from "openai";
import env from "@repo/ai-rag/config";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default openai;
