import os from "os";
import axios from "axios";
import * as tar from "tar";

const VERSION = "v137.0.1";
const FILENAME = `chromium-${VERSION}-pack.x64.tar`;
const DOWNLOAD_URL = `https://github.com/Sparticuz/chromium/releases/download/${VERSION}/${FILENAME}`;
const EXTRACT_DIR = os.tmpdir(); // Extract directly to tmp

export async function main() {
  console.log(`🔽 Streaming & extracting Chromium from: ${DOWNLOAD_URL}`);
  const response = await axios.get(DOWNLOAD_URL, { responseType: "stream" });

  await new Promise((resolve, reject) => {
    response.data
      .pipe(
        tar.x({
          cwd: EXTRACT_DIR,
          strict: true,
          preservePaths: false,
          // strip: 1 — not needed unless tar has a folder wrapper
        })
      )
      .on("finish", () => {
        console.log(`✅ Extracted directly to: ${EXTRACT_DIR}`);
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ Extraction error:", err.message);
        reject(err);
      });
  });
}
