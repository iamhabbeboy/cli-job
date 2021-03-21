const puppeteer = require("puppeteer");
const chalk = require("chalk");
const log = console.log;

module.exports = {
  page: undefined,
  browser: undefined,

  async get(url) {
    try {
      this.browser = await puppeteer.launch();
      const page = await this.browser.newPage();
      log(chalk.green("Loading data from page"));
      await page.goto(url);
      this.page = page;
    } catch (e) {
      log.error("Unable to crawl site, please try again later: ", e);
    }
  },

  async getJobs() {
    await this.page.waitForSelector(".previewable-results");
    const url = await this.page.$$eval(".listResults > div", jobs => {
      const result = [];
      jobs.map(job => {
        let title = job.querySelector("h2.fs-body3 > a");
        let tags = Array.from(
          job.querySelectorAll(".ps-relative > a")
        ).map(tag => tag.textContent.trim());

        let company = Array.from(
          job.querySelectorAll(".fc-black-700 > span")
        ).map(company => company.textContent.trim());

        let datePosted = Array.from(
          job.querySelectorAll(".horizontal-list > li")
        ).map(date => date.textContent.trim());

        if (title) {
          result.push({
            title: title.textContent,
            url: title.href,
            company: company,
            tag: tags,
            date: datePosted,
          });
        }
      });

      return result;
    });

    log(chalk.greenBright(JSON.stringify(url[0])));

    // log(jobTitle);
    // log(chalk.red(company.length));
    // log(chalk.cyan(filters.length));
    // log(chalk.yellow(jobType.length));

    await this.browser.close();
  },

  async screenshot() {
    await this.page.screenshot({ path: "example100.png" });
    await this.browser.close();
  },
};
