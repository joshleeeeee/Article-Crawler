import { Page } from "puppeteer";

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

export default TaskContext;