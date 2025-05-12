import * as fs from "fs";
import { get_rulings_from_url } from "./scraper.js";

async function main() {
  // Build an array of URLs: rulings1.html to rulings8.html
  const base_url = "https://www.goatformat.com/";
  const urls = [];
  for (let i = 1; i <= 8; i++) {
    urls.push(`${base_url}rulings${i}.html`);
  }

  // Get rulings from urls and flatten to single array
  const rulings_array = await Promise.all(
    urls.map((url) => get_rulings_from_url(url))
  );
  const flat_rulings = rulings_array.flat();

  // Save rulings as json
  fs.writeFileSync(
    "data/parsed-rulings.json",
    JSON.stringify(flat_rulings, null, 2)
  );
}

main();
