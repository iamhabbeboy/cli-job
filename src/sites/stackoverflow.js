// const puppeteer = require("puppeteer");
const crawler = require("../core/crawler");

module.exports = function () {
  (async () => {
    try {
      await crawler.get("https://stackoverflow.com/jobs");
      await crawler.getJobs();
    } catch (e) {
      console.log(e);
    }
  })();
};
