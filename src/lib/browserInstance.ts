import puppeteer, { Browser } from "puppeteer";

let browser: Browser | null = null;

export const browserInstance = async (): Promise<Browser> => {
    if (!browser) {
        browser = await puppeteer.launch({
            headless: true,
        });
    }
    return browser;
};
