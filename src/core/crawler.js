const puppeteer = require("puppeteer");
const chalk = require("chalk");
const log = console.log;

class Crawler {
  static async run() {
    let crawler = new Crawler();
    await crawler._init();
    return crawler;
  }
  async _init() {
    this._browser = await puppeteer.launch({ timeout: 0 });
    this._page = await this._browser.newPage();
  }

  get browser() {
    return this._browser;
  }

  get page() {
    return this._page;
  }
  async setUrl(url) {
    try {
      log(chalk.green("Loading data from page..."));
      await this._page.goto(url);
    } catch (e) {
      log(chalk.red("Unable to crawl site, please try again later: ", e));
      this.browser.close();
    }
  }
}

module.exports = { Crawler };
