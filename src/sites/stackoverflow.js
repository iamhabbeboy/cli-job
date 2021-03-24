const crawler = require("../core/crawler");

module.exports = function () {
  (async () => {
    // try {
    await crawler.setUrl("https://stackoverflow.com/jobs");
    await crawler.getJobs();
    // } catch (e) {
    //   console.log(">Error fetching data from stackoverflow");
    // }
  })();
};
