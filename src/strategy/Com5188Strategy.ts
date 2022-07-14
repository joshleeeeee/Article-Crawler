import Strategy from "./Strategy";
import { Page } from "puppeteer";

class Com5188Strategy implements Strategy {
  async execute(url: string, page: Page) {
    await page.goto(url);
    await page.$eval(".classify-wrap", (e) => e.remove());
    await page.$eval("#header_layout", (e) => e.remove());
    await page.$eval("#footer_layout", (e) => e.remove());
    await page.$eval(".other-list", (e) => e.remove());
    await page.$eval("#topad_layout", (e) => e.remove());
    await page.$eval(".main-wrap", (e) => {
      e.setAttribute("style", "width: 1100px;");
    });
    await page.$eval("#app", (e) => {
      e.removeAttribute("style");
      e.removeAttribute("class");
    });
    await page.$eval(".correlation-wrap", (e) => e.remove());
  }
}

export default Com5188Strategy;
