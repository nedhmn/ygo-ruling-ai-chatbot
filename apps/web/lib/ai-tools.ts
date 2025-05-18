import { generateEmbedding } from "@repo/embeddings";
import { ContextType, getRelevantContext } from "@repo/pinecone/query";

export async function getRelevantRulings(text: string): Promise<ContextType[]> {
  const embeddings = await generateEmbedding(text);
  const rulingsMetadata = await getRelevantContext(embeddings, 5);
  return rulingsMetadata;
}
