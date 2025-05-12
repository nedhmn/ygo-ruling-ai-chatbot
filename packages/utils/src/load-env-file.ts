import { fileURLToPath } from "url";
import * as path from "path";
import * as dotenv from "dotenv";

export function loadEnvFile(relativePath: string, metaUrl: string): void {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  const envPath = path.resolve(__dirname, relativePath);
  dotenv.config({ path: envPath });
}
