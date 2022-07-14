import { Page } from "puppeteer";

interface Strategy {
  execute(url: string, page: Page): Promise<void>;
}
export default Strategy;
