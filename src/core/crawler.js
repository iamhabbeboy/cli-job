const puppeteer = require("puppeteer");

module.exports = {
  page: undefined,
  browser: undefined,

  async get(url) {
    try {
      this.browser = await puppeteer.launch();
      const page = await this.browser.newPage();
      await page.goto(url);
      this.page = page;
    } catch (e) {
      console.error("Unable to crawl site, please try again later: ", e);
    }
  },

  async getJobs() {
    await this.page.waitForSelector(".previewable-results");
    let jobTitle = await this.page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".stretched-link")
      ).map(list => list.innerText.trim());
    });

    let company = await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll(".fc-black-700")).map(list =>
        list.innerText.trim()
      );
    });

    let filters = await this.page.evaluate(() => {
      return Array.from(document.querySelectorAll(".fw-wrap"))
        .splice(1)
        .map(list => list.innerText.trim());
    });

    let filters = await this.page.evaluate(() => {
      return Array.from(
        document.querySelectorAll(".horizontal-list")
      ).map(list => list.innerText.trim());
    });

    await this.browser.close();
  },

  async screenshot() {
    await this.page.screenshot({ path: "example100.png" });
    await this.browser.close();
  },
};
