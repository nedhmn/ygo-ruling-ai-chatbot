import { getPineconeIndex } from "@repo/pinecone";

const pineconeIndex = await getPineconeIndex();

const stats = await pineconeIndex.describeIndexStats();
console.log(stats);
