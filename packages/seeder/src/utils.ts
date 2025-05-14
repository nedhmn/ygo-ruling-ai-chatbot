import axios from "axios";

/**
 * Creates an array of URLs for goatformat.com's ruling pages.
 */
export function createRulingURLs(): string[] {
  const urls = [];

  // There's only 8 pages
  for (let i = 1; i <= 8; i++) {
    urls.push(`https://www.goatformat.com/rulings${i}.html`);
  }

  return urls;
}

/**
 * Get a URL's HTML
 */
export async function getHTML(url: string): Promise<string> {
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error(
      `Bad status code. URL ${url} Status code ${response.status}`
    );
  }

  return response.data;
}

/**
 * Extract card names from ruling.
 *
 * @param {string} ruling
 * @returns {string[]} - Array of lowercased card names that was extracted from ruling.
 */
export function getInvolvedCards(ruling: string): string[] {
  const regex = /"([^"]+)"/g;
  const matches = ruling.matchAll(regex);
  const involvedCards: string[] = [];

  // Process each card
  for (const match of matches) {
    if (match[1]) {
      let card = match[1]
        .trim()
        .replace(/\(s\)$/i, "") // Remove trailing "(s)"
        .replace(/(?:'s)$/i, ""); // Remove trailing "'s"

      if (!/(lord of d|t\.a\.d\.p\.o\.l\.e)/i.test(card)) {
        card = card.replace(/\.$/, ""); // Remove trailing "."
      }

      involvedCards.push(card);
    }
  }

  return Array.from(new Set(involvedCards)).sort();
}
