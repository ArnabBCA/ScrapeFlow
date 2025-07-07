import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import path from "path";
import fs from "fs";
export const maxDuration = 60;

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviornment.getInput("Website Url");

    let browser;

    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      const chromium = (await import("@sparticuz/chromium")).default;
      const filePath = path.join(
        process.cwd(),
        "node_modules/@sparticuz/chromium/",
        "chromium-v137.0.1-pack.x64.tar"
      );
      if (!fs.existsSync(filePath)) {
        const dirPath = path.dirname(filePath);
        let errorMessage = `❌ File not found at: ${filePath}`;
        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          if (files.length === 0) {
            errorMessage += `\n📁 Directory "${dirPath}" is empty.`;
          } else {
            errorMessage += `\n📁 Files in directory "${dirPath}":\n - ${files.join(
              "\n - "
            )}`;
          }
        } else {
          errorMessage += `\n❗ Directory does not exist: ${dirPath}`;
          // 🔍 Check parent directory
          const parentDir = path.dirname(dirPath);
          if (fs.existsSync(parentDir)) {
            const parentFiles = fs.readdirSync(parentDir);
            if (parentFiles.length === 0) {
              errorMessage += `\n📁 Parent directory "${parentDir}" is empty.`;
            } else {
              errorMessage += `\n📁 Files in parent directory "${parentDir}":\n - ${parentFiles.join(
                "\n - "
              )}`;
            }
          } else {
            errorMessage += `\n❗ Parent directory also does not exist: ${parentDir}`;
          }
        }
        enviornment.log.error(errorMessage);
        return false;
      }
      const executablePath = await chromium.executablePath(filePath);
      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath,
        headless: true,
      });
    } else {
      browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: true,
      });
    }

    enviornment.log.info("Browser started successfully");
    enviornment.setBrowser(browser as any);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    enviornment.setPage(page as any);
    enviornment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    enviornment.log.error(error.message);
    return false;
  }
}
