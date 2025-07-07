import fs from "fs";
import path from "path";
import axios from "axios";

const VERSION = "v137.0.1";
const FILENAME = `chromium-${VERSION}-pack.x64.tar`;
const DOWNLOAD_URL = `https://github.com/Sparticuz/chromium/releases/download/${VERSION}/${FILENAME}`;
const OUTPUT_DIR = path.resolve(".next/server/.chromium");
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

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`🔽 Downloading Chromium tarball from: ${DOWNLOAD_URL}`);
  await downloadFile(DOWNLOAD_URL, TAR_PATH);

  if (fs.existsSync(TAR_PATH)) {
    const { size } = fs.statSync(TAR_PATH);
    console.log(`📁 File saved at: ${TAR_PATH}`);
    console.log(`📦 Size: ${(size / 1024 / 1024).toFixed(2)} MB`);
  }
}

main().catch((err) => {
  console.error("❌ Failed to download Chromium tarball:", err);
  process.exit(1);
});
