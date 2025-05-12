import OpenAI from "openai";
import env from "@repo/ai-rag/config";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [{ role: "user", content: "write a haiku about ai" }],
});

completion.then((result) => {
  const message = result?.choices?.[0]?.message;
  if (message) {
    console.log(message);
  }
});
