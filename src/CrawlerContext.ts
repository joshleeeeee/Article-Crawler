import Com5188Strategy from "./strategy/Com5188Strategy";
import Strategy from "./strategy/Strategy";
import TaskContext from "./TaskContext";
import { Page } from "puppeteer";


function getStrategy(url: string) {
  if (url.indexOf("5118.com") > -1) {
    return new Com5188Strategy();
  }
  throw new Error(`Don't find current strategy!（${url}）`);
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
    const page: Page = this.taskContext.getPage();
    for (let [index, url] of urls.entries()) {
      try {
        this.setStrategy(getStrategy(url));
        if (!this.strategy) {
          continue;
        }
        await this.strategy.execute(url, page);
        // TODO:await savePDF(page);
        console.log(`【${index}】执行成功：${url}`);
      } catch (err: any) {
        console.error(`第${index}个任务执行失败！(${url})`);
        console.error(err.message);
      }
    }
  }
}
export default CrawlerContext;