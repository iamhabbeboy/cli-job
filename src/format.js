const { getJobs } = require("./sites/stackoverflow");

const getJobListing = async () => {
  return Promise.all([getJobs()])
    .then(job => {
      console.log(job);
    })
    .catch(err => {
      console.log("Error occured while formatting output");
    });
};

module.exports = getJobListing;
