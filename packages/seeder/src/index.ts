import scrapeRulings from "#scraper.js";
import { CardRuling } from "#types.js";
import { generateEmbeddings } from "@repo/embeddings";
import { upsertVectors } from "@repo/pinecone/upsert";
import { randomUUID } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { getPineconeIndex } from "@repo/pinecone";

/**
 * Scrape, embed, and upsert rulings data to Pinecone.
 */
async function seedDatabase(): Promise<void> {
  console.log("Starting seedDatabase...");

  const dataFilePath = "data/parsed-rulings.json";
  let rulings: CardRuling[] = [];

  // Scrape rulings data if it isn't saved already
  if (!existsSync(dataFilePath)) {
    console.log(`Data file not found at ${dataFilePath}, scraping rulings...`);
    rulings = await scrapeRulings();
    writeFileSync(dataFilePath, JSON.stringify(rulings, null, 2), "utf-8");
    console.log(`Saved ${rulings.length} rulings to ${dataFilePath}.`);
  } else {
    console.log(`Data file found at ${dataFilePath}, loading rulings...`);
    const rulingsJSON = readFileSync(dataFilePath, "utf-8");
    rulings = JSON.parse(rulingsJSON);
    console.log(`Loaded ${rulings.length} rulings from ${dataFilePath}.`);
  }

  const pineconeIndex = await getPineconeIndex();
  const { totalRecordCount } = await pineconeIndex.describeIndexStats();

  // Exit if Pinecone has already been seeded
  if (totalRecordCount && totalRecordCount > 0) {
    console.log(
      `Pinecone database is already seeded with ${totalRecordCount} records. Exiting...`
    );
    return;
  }

  const batchSize = 100;
  const totalBatches = Math.ceil(rulings.length / batchSize);
  console.log(
    `Processing ${rulings.length} rulings in ${totalBatches} batches of ${batchSize}...`
  );

  // Embed and upsert rulings to Pinecone in batches
  for (let i = 0; i < rulings.length; i += batchSize) {
    const batchNumber = Math.floor(i / batchSize) + 1;
    const batch = rulings.slice(i, i + batchSize);
    console.log(
      `Processing batch ${batchNumber}/${totalBatches} (items ${i + 1}-${Math.min(i + batchSize, rulings.length)})`
    );

    // Augment rulings to include the card name
    const augmentedRulings = batch.map(
      (ruling) => `ruling for ${ruling.card}: ${ruling.ruling}`
    );

    // Get embeddings from augmentedRulings
    console.log(`Batch ${batchNumber}: Generating embeddings...`);
    const batchedEmbeddings = await generateEmbeddings(augmentedRulings);
    console.log(
      `Batch ${batchNumber}: Generated embeddings for ${batchedEmbeddings.length} items.`
    );

    // Create rulingVectors to upsert to Pinecone
    const rulingVectors = batch.map((ruling, index) => {
      return {
        id: randomUUID(),
        values: batchedEmbeddings[index]!,
        metadata: {
          card: ruling.card,
          ruling: ruling.ruling,
          title: ruling.title,
          url: ruling.url,
        },
      };
    });

    // Upsert vectors
    console.log(`Batch ${batchNumber}: Upserting vectors to Pinecone...`);
    await upsertVectors(rulingVectors);
    console.log(`Batch ${batchNumber}: Upsert complete.`);
  }

  console.log("seedDatabase complete.");
}

await seedDatabase();
