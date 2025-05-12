import { openai } from "@repo/ai-rag";

const response = await openai.responses.create({
  model: "gpt-4.1-nano",
  input: "Write a one-sentence bedtime story about a unicorn.",
});

console.log(response.output_text);
