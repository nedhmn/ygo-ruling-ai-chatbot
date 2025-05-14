import scrapeRulings from "#scraper.js";
import { CardRuling } from "#types.js";
import { generateEmbedding } from "@repo/embeddings";
import { PineconeVector } from "@repo/pinecone/types";
import { batchUpsertVectors } from "@repo/pinecone/upsert";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

/**
 * Scrape, embed, and upsert rulings data to Pinecone.
 */
async function seedDatabase(): Promise<void> {
  const dataFilePath = "data/parsed-rulings.json";
  let rulings: CardRuling[] = [];

  // Scrape rulings data if it isn't saved already
  if (!existsSync(dataFilePath)) {
    rulings = await scrapeRulings();
    writeFileSync(dataFilePath, JSON.stringify(rulings, null, 2), "utf-8");
  } else {
    const rulingsJSON = readFileSync(dataFilePath, "utf-8");
    rulings = JSON.parse(rulingsJSON);
  }

  const vectorsToUpsert: PineconeVector[] = [];

  for (const ruling of rulings.slice(0, 10)) {
    // Prepend ruling with card name
    const augmentedText = `ruling for "${ruling.card}": ${ruling.ruling}`;
    const embeddingValues = await generateEmbedding(augmentedText);

    vectorsToUpsert.push({
      id: randomUUID(),
      values: embeddingValues,
      metadata: {
        card: ruling.card,
        text: ruling.ruling,
        url: ruling.url,
      },
    });
  }

  // Batch upsert vectors to Pinecone
  await batchUpsertVectors(vectorsToUpsert, 100);
}

await seedDatabase();
