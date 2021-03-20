const puppeteer = require("puppeteer");

module.exports = {
  page: undefined,
  browser: undefined,
  async get(url) {
    this.browser = await puppeteer.launch();
    const page = await this.browser.newPage();
    await page.goto(url);
    this.page = page;
  },

  async screenshot() {
    await this.page.screenshot({ path: "example100.png" });
    await this.browser.close();
  },
};
