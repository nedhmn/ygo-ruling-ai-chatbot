import { CardRuling } from "#types.js";
import { createRulingURLs, getHTML, getInvolvedCards } from "#utils.js";
import * as cheerio from "cheerio";

/**
 * Scrape all card rulings from goatformat.com.
 *
 * @returns {Promise<CardRuling[]>} - Scraped card rulings.
 */
export default async function scrapeRulings(): Promise<CardRuling[]> {
  // Get and scrape goatformat.com's ruling URLs
  const urls = createRulingURLs();
  const rulings = await Promise.all(
    urls.map((url) => scrapeRulingsFromURL(url))
  );
  const flatRulings = rulings.flat();

  console.log(`Scraped ${flatRulings.length} rulings from goatformat.com.`);
  return flatRulings;
}

/**
 * Scrape card rulings from URL.
 *
 * @param {string} url - Goatformat.com's ruling URL.
 */
async function scrapeRulingsFromURL(url: string): Promise<CardRuling[]> {
  // Get ruling URL's HTML
  const html = await getHTML(url);

  // Load HTML
  const $ = cheerio.load(html);
  const $container = $("div.paragraph").first();

  if (!$container.length) {
    throw new Error(`Could not find paragraph element for URL ${url}`);
  }

  const rulings: CardRuling[] = [];
  let currentCard: string = "";
  let currentRulingType: string = "";

  $container.contents().each((index, element) => {
    const $element = $(element);

    // Check if the element is the "card_name"
    if ($element.is("strong")) {
      currentCard = $element.text().trim().toLowerCase();
      currentRulingType = "";
      return;
    }

    // Check if the element is the "ruling_type"
    if (element.type === "text") {
      const text = $element.text().trim().toLowerCase();
      const match = text.match(
        /(individual card faqs|netrep rulings|netrep q&as)/i
      );

      if (match && match[1]) {
        currentRulingType = match[1];
      }

      return;
    }

    // Check if the element is the "ruling"
    if ($element.is("ul") && currentCard) {
      $element.find("li").each((li_index, li_element) => {
        const $li = $(li_element);
        const ruling = $li
          .text()
          .replace(/\s+/g, " ") // Replace \n + whitespace to single space
          .replace(/[“”]/g, '"') // Replace double-smart-quotes with double-quotes
          .replace(/[\u2018\u2019]/g, "'") // Replace single-smart-quote with single-quote
          .trim()
          .toLowerCase();

        const involvedCards = getInvolvedCards(ruling);

        rulings.push({
          card: currentCard,
          ruling: ruling,
          ruling_type: currentRulingType,
          involved_cards: involvedCards,
          title: $("head title").text().trim(),
          url: url,
        });
      });
    }
  });

  return rulings;
}
