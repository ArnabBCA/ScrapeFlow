import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
//import chromium from "@sparticuz/chromium-min";
import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = enviornment.getInput("Website Url");

    let browser;
    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      /*const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v137.0.1/chromium-v137.0.1-pack.x64.tar"
      );*/
      const executablePath = "/opt/nodejs/node_modules/@sparticuz/chromium/bin";
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
