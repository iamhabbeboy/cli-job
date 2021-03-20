#!/usr/bin/env node
const stackoverflow = require("./src/sites/stackoverflow");
// const testing = require("./src/core/crawler");

// console.log(testing);

const testing = stackoverflow();
console.log("hello world");
