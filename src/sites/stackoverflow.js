// const puppeteer = require("puppeteer");
const crawler = require("../core/crawler");

module.exports = function () {
  (async () => {
    try {
      const crawl = await crawler.get("https://stackoverflow.com/jobs");
      await crawler.screenshot();
    } catch (e) {
      console.log(e);
    }
  })();
};
