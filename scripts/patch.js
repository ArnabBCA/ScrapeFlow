const fs = require("fs");
const path = require("path");

const loc = path.join(process.cwd(), "bin");
const patchDir = path.resolve(
  ".next/standalone/node_modules/@sparticuz/chromium/bin"
);
const sourceDir = path.resolve(loc);

// Ensure the destination directory exists
if (!fs.existsSync(patchDir)) {
  fs.mkdirSync(patchDir, { recursive: true });
}

try {
  fs.cpSync(sourceDir, patchDir, { recursive: true, force: true });
  console.log("✅ Chromium binaries copied successfully to .next/tmp/chromium");
} catch (err) {
  console.error("❌ Error copying Chromium binaries:", err);
}
