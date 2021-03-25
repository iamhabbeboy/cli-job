const { Crawler } = require("../core/crawler");

const getFilteredJobs = async crawler => {
  await crawler.page.waitForSelector(".previewable-results");
  const jobs = await crawler.page.$$eval(".listResults > div", jobs => {
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
      // var formattedOutput = title.textContent + " | ";
      // formattedOutput +=
      //   company.toString() +
      //   // "\n" +
      //   // tags.join(",") +
      //   // "\t" +
      //   // date.join(", ") +
      //   "\n";
      // result.push(formattedOutput);
      result.push({
        title: title.textContent,
        url: title.href,
        company: company.join(" - "),
        tag: tags.join(","),
        date: datePosted.join(" - "),
      });
    }
    return result;
  });
  await crawler.browser.close();
  return jobs;
};

const getJobs = async () => {
  let crawler = await Crawler.run();
  await crawler.setUrl("https://stackoverflow.com/jobs");
  return await getFilteredJobs(crawler);
};

module.exports = { getJobs };
