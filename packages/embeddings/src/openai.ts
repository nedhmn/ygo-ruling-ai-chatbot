import env from "#config.js";
import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";

let _openAIClient: OpenAIProvider | undefined;

function getOpenAIClient(): OpenAIProvider {
  if (_openAIClient) {
    return _openAIClient;
  }

  _openAIClient = createOpenAI({
    apiKey: env.OPENAI_API_KEY,
  });

  return _openAIClient;
}

export default getOpenAIClient;
