import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import path from "path";
import fs from "fs";

import chromium from "@sparticuz/chromium-min";
import os from "os";
import { main } from "@/scripts/download-chromium";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  let log = "";
  try {
    const websiteUrl = enviornment.getInput("Website Url");

    let browser;

    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      //const chromium = require("@sparticuz/chromium");
      const TAR_PATH = path.join(os.tmpdir(), "chromium.br");
      if (!fs.existsSync(TAR_PATH)) {
        log =
          log + `Chromium tarball not found at ${TAR_PATH}. Downloading...\n`;
        await main();
      } else {
        log = log + `Chromium tarball found at ${TAR_PATH}.\n`;
      }
      const executablePath = await chromium.executablePath(os.tmpdir());
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

    enviornment.log.info(log + "Browser started successfully");
    enviornment.setBrowser(browser as any);
    const page = await browser.newPage();
    await page.goto(websiteUrl);
    enviornment.setPage(page as any);
    enviornment.log.info(`Opened page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    enviornment.log.error(log + error.message);
    return false;
  }
}
