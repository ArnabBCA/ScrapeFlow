import fs from "fs";
import path from "path";
import axios from "axios";
import * as tar from "tar";
import { fileURLToPath } from "url";

// Resolve __dirname in ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VERSION = "v137.0.1";
const FILENAME = `chromium-${VERSION}-pack.x64.tar`;
const DOWNLOAD_URL = `https://github.com/Sparticuz/chromium/releases/download/${VERSION}/${FILENAME}`;
const OUTPUT_DIR = path.resolve(__dirname, "../.chromium");
const TAR_PATH = path.join(OUTPUT_DIR, FILENAME);

async function downloadFile(url: string, dest: string): Promise<void> {
  const writer = fs.createWriteStream(dest);
  const response = await axios.get(url, { responseType: "stream" });

  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function extractTar(filePath: string, dest: string): Promise<void> {
  await tar.x({
    file: filePath,
    cwd: dest,
  });
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`🔽 Downloading Chromium from: ${DOWNLOAD_URL}`);
  await downloadFile(DOWNLOAD_URL, TAR_PATH);

  console.log("📦 Extracting archive...");
  await extractTar(TAR_PATH, OUTPUT_DIR);

  fs.unlinkSync(TAR_PATH);
  console.log("✅ Chromium is ready at:", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("❌ Failed to download Chromium:", err.message);
  process.exit(1);
});
