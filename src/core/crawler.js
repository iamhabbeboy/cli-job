const puppeteer = require("puppeteer");
const chalk = require("chalk");
const loader = require("./loader");
const log = console.log;

const MAX_PAGE = 2;

const setUrl = async url => {
  try {
    this.browser = await puppeteer.launch();
    const page = await this.browser.newPage();
    log(chalk.green("Loading data from page"));
    await page.goto(url);
    this.page = page;
    this.url = url;
  } catch (e) {
    log(chalk.red("Unable to crawl site, please try again later: ", e));
    this.browser.close();
  }
};

const getFilteredJobs = async () => {
  await this.page.waitForSelector(".previewable-results");
  const jobs = await this.page.$$eval(".listResults > div", jobs => {
    const result = [];
    for (let job of jobs) {
      let title = job.querySelector("h2.fs-body3 > a");
      let tags = Array.from(job.querySelectorAll(".ps-relative > a")).map(tag =>
        tag.textContent.trim()
      );

      let company = Array.from(
        job.querySelectorAll(".fc-black-700 > span")
      ).map(company => company.textContent.trim());

      let datePosted = Array.from(
        job.querySelectorAll(".horizontal-list > li")
      ).map(date => date.textContent.trim());

      if (!title) {
        continue;
      }
      result.push({
        title: title.textContent,
        url: title.href,
        company: company,
        tag: tags,
        date: datePosted,
      });
    }
    return result;
  });
  return jobs;
};

const getJobs = async () => {
  let currentPage = 1;
  if (currentPage < MAX_PAGE) {
    const jobs = await getFilteredJobs();
    console.log(JSON.stringify(jobs[0]));

    await this.page.close();
    await this.page.waitForTimeout(5000);
    const nextPageUrl = `${this.url}?p=2`;
    await setUrl(nextPageUrl);
  } else {
    console.log("STOP !");
  }
  await this.browser.close();
};

module.exports = {
  setUrl,
  getJobs,
};
