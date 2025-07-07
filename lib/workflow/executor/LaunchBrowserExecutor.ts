import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import chromium from "@sparticuz/chromium-min";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";

export async function LaunchBrowserExecutor(
  enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>
): Promise<boolean> {
  const remoteExecutablePath = `https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar`;

  try {
    const websiteUrl = enviornment.getInput("Website Url");
    console.log(websiteUrl);

    let browser;
    if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === "production") {
      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(remoteExecutablePath),
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
