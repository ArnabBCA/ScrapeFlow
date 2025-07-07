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

async function downloadFile(url, dest) {
  const writer = fs.createWriteStream(dest);
  const response = await axios.get(url, { responseType: "stream" });

  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on("finish", () => {
      writer.close(() => {
        console.log("✅ Download complete:", dest);
        resolve();
      });
    });
    writer.on("error", (err) => {
      console.error("❌ Stream write error:", err.message);
      reject(err);
    });
  });
}

async function extractTar(filePath, dest) {
  console.log("📦 Extracting archive...");
  await tar.x({
    file: filePath,
    cwd: dest,
  });
  console.log("✅ Extraction done.");
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Optional: skip download if already exists
  if (fs.existsSync(path.join(OUTPUT_DIR, "chrome"))) {
    console.log("✅ Chromium already extracted, skipping download.");
    return;
  }

  console.log(`🔽 Downloading Chromium from: ${DOWNLOAD_URL}`);
  await downloadFile(DOWNLOAD_URL, TAR_PATH);

  // Optional: log file size
  if (fs.existsSync(TAR_PATH)) {
    const { size } = fs.statSync(TAR_PATH);
    console.log(`📁 Downloaded size: ${(size / 1024 / 1024).toFixed(2)} MB`);
  }

  await extractTar(TAR_PATH, OUTPUT_DIR);

  fs.unlinkSync(TAR_PATH);
  console.log("✅ Chromium is ready at:", OUTPUT_DIR);
}

main().catch((err) => {
  console.error("❌ Failed to download or extract Chromium:", err);
  process.exit(1);
});
