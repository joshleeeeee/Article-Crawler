import puppeteer, { Page } from "puppeteer";
import fs from "fs";
import path from "path";
import Strategy from "./strategy/Strategy";
import Com5188Strategy from "./strategy/Com5188Strategy"
const merge = require("easy-pdf-merge");


var pdfNames: string[] = [];
const rootPath = path.join(__dirname, "..");
const savePath = path.join(rootPath, "pdf");

function readUrls(): string[] {
  const data = fs.readFileSync(path.join(rootPath, "data.txt"), {
    encoding: "utf8",
    flag: "r",
  });
  return data.split("\n");
}

async function savePDF(page: Page) {
  if (!fs.existsSync(savePath)) {
    fs.mkdirSync(savePath);
  }
  const fullFileName = path.join(savePath, `temp_${pdfNames.length}.pdf`);
  await page.pdf({
    path: fullFileName,
    format: "A4",
  });
  pdfNames.push(fullFileName);
}

function mergePDFs() {
  const outPath = path.join(savePath, `output_${Date.now()}.pdf`);
  merge(pdfNames, outPath, (err: any) => {
    if (err) {
      console.error(err);
    }
    deleteTempPDFs();
    console.info(`合并【${pdfNames.length}】篇文章成功！（${outPath}）`);
  });
}

function getUndoneUrls() {}

function deleteTempPDFs() {
  for (let path of pdfNames) {
    fs.unlinkSync(path);
  }
}

class TaskContext {
  private urls: string[];

  private page: Page;

  constructor(urls: string[], page: Page) {
    this.urls = urls;
    this.page = page;
  }

  public getUrls(): string[] {
    return this.urls;
  }

  public getPage(): Page {
    return this.page;
  }
}

class CrawlerContext {
  private strategy: Strategy | undefined;

  private taskContext: TaskContext;

  constructor(taskContext: TaskContext) {
    this.taskContext = taskContext;
  }

  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  public async run() {
    let urls = this.taskContext.getUrls();
    const page = this.taskContext.getPage();
    for (let [index, url] of urls.entries()) {
      try {
        this.setStrategy(getStrategy(url));
        if (!this.strategy) {
          continue;
        }
        await this.strategy.execute(url, page);
        await savePDF(page);
        console.log(`【${index}】执行成功：${url}`);
      } catch (err: any) {
        console.error(`第${index}个任务执行失败！(${url})`);
        console.error(err.message);
      }
    }
  }
}

function getStrategy(url: string) {
  if (url.indexOf("5118.com") > -1) {
    return new Com5188Strategy();
  }
  throw new Error(`Don't find current strategy!（${url}）`);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  const urls = readUrls();
  console.info(`共读取到【${urls.length}】个链接`);
  const crawler = new CrawlerContext(new TaskContext(urls, page));
  await crawler.run();

  mergePDFs();

  await browser.close();
}
main();
