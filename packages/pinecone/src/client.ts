import { Pinecone } from "@pinecone-database/pinecone";
import env from "#config.js";

const pc = new Pinecone({
  apiKey: env.PINECONE_API_KEY,
});

export default pc;
