import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import path from "path";
import fs from "fs";
export const maxDuration = 60;
import chromium from "@sparticuz/chromium";
import os from "os";
import { main } from "@/scripts/download-chromium";

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviornment.getInput("Website Url");

    let browser;

    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      //const chromium = require("@sparticuz/chromium");
      const TAR_PATH = path.join(os.tmpdir(), "chromium-v137.0.1-pack.x64.tar");
      if (!fs.existsSync(TAR_PATH)) {
        await main();
      } else {
        let errorMessage = `File not found at: ${TAR_PATH}`;
        enviornment.log.error(errorMessage);
        return false;
      }
      const executablePath = await chromium.executablePath(TAR_PATH);
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
