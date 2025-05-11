import * as fs from "fs";
import { get_rulings_from_url } from "@repo/seeder/scraper";

async function main() {
  const rulings = await get_rulings_from_url(
    "https://www.goatformat.com/rulings1.html"
  );

  // Save rulings as json
  fs.writeFileSync(
    "data/parsed-rulings.json",
    JSON.stringify(rulings, null, 2)
  );
}

main();
