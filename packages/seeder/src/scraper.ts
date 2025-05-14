import axios from "axios";
import * as cheerio from "cheerio";
import { CardRuling } from "./types.js";

export async function get_rulings_from_url(url: string): Promise<CardRuling[]> {
  // Get html content
  const html = await get_html(url);

  // Setup cheerio
  const $ = cheerio.load(html);
  const rulings: CardRuling[] = [];

  // Setup rulings loop
  const $container = $("div.paragraph").first();

  if (!$container.length) {
    throw new Error(`Could not find paragraph element for URL ${url}`);
  }

  let current_card_name: string = "";
  let current_ruling_type: string = "";

  $container.contents().each((index, element) => {
    const $element = $(element);

    // Check if the element is the card_name
    if ($element.is("strong")) {
      current_card_name = $element.text().trim().toLowerCase();
      current_ruling_type = "";
      return;
    }

    // Check if the element is the ruling_type
    if (element.type === "text") {
      const text = $element.text().trim().toLowerCase();
      const match = text.match(
        /(individual card faqs|netrep rulings|netrep q&as)/i
      );

      if (match && match[1]) {
        current_ruling_type = match[1];
      }

      return;
    }

    // Check if the element is the rulings
    if ($element.is("ul") && current_card_name) {
      $element.find("li").each((li_index, li_element) => {
        const $li = $(li_element);
        const ruling = $li
          .text()
          .replace(/\s+/g, " ") // Replace \n + whitespace to single space
          .replace(/[“”]/g, '"') // Replace double-smart-quotes with double-quotes
          .replace(/[\u2018\u2019]/g, "'") // Replace single-smart-quote with single-quote
          .trim()
          .toLowerCase();

        // Get involved cards
        const involved_cards = get_involved_card_names(ruling);

        rulings.push({
          card: current_card_name,
          ruling: ruling,
          ruling_type: current_ruling_type,
          involved_cards: involved_cards,
          url: url,
        });
      });
    }
  });

  // Return card rulings
  return rulings;
}

async function get_html(url: string): Promise<string> {
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error(
      `Bad status code. URL ${url} Status code ${response.status}`
    );
  }

  return response.data;
}

function get_involved_card_names(ruling: string): string[] {
  // Involved card regex are cards wrapped in double quotation marks
  const regex = /"([^"]+)"/g;
  const involved_cards: string[] = [];
  let match;

  while ((match = regex.exec(ruling)) !== null) {
    if (match[1]) {
      // Clean card name
      let card = match[1]
        .trim()
        .replace(/\(s\)$/i, "") // Remove trailing "(s)"
        .replace(/(?:'s)$/i, ""); // Remove trailing "'s"

      if (!/(lord of d|t\.a\.d\.p\.o\.l\.e)/i.test(card)) {
        card = card.replace(/\.$/, ""); // Remove trailing "."
      }

      involved_cards.push(card);
    }
  }

  // Return unique card names
  return Array.from(new Set(involved_cards)).sort();
}
