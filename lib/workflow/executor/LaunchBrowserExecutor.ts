import { ExecutionEnviornment } from "@/lib/types";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
//import chromium from "@sparticuz/chromium-min";

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
      const chromium = (await import("@sparticuz/chromium")).default;
      const puppeteerCore = (await import("puppeteer-core")).default;
      const executablePath = await chromium.executablePath(
        "/opt/nodejs/node_modules/@sparticuz/chromium/bin/chromium.br"
      );
      console.log("Executable Path:", executablePath);
      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath,
        headless: true,
      });
    } else {
      const puppeteer = (await import("puppeteer")).default;
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
