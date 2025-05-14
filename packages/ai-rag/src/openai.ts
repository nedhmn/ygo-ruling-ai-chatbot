import { createOpenAI } from "@ai-sdk/openai";
import env from "#config.js";

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export default openai;
