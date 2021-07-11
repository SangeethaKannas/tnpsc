"use strict";
const express = require("express");
const app = express();

const fs = require("fs");
const pdf = require("pdf-parse");
const log = console.log;

const { LinkedNode, LinkedList } = require("./LinkedList");
const RegistrationDocument = require("./models/RegistrationDocument");
const { LINES_TO_IGNORE, ENDING_LINE, RULES } = require("./const");

let dataBuffer = fs.readFileSync("./temp.pdf");

let parseLine = (line, registrationDoc, array = [], index = 0) =>
  RULES.filter((rule) =>
    rule.values.some((value) => line.includes(value))
  ).reduce(
    (acc, rule) => rule.handler.call(this, line, acc, array, index),
    registrationDoc
  );

let parseData = (data) => {
  let registrationDoc = new RegistrationDocument();
  return data
    .split("\n")
    .reduce(
      (registrationDoc, line, array, index) =>
        parseLine(line, registrationDoc, array, index),
      registrationDoc
    );
};

app.get("/", (request, response) => {
  pdf(dataBuffer)
    .then(function (data) {
      const filteredData = data.text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 1)
        .filter((line) => LINES_TO_IGNORE.includes(line) == false);

      //filteredData.length = filteredData.indexOf(ENDING_LINE);
      filteredData.length = 12;
      //log(parseData(filteredData.join("\n")));
      response.status(200).send(parseData(filteredData.join("\n")));
    })
    .catch((error) => {
      console.log(error);
      response.send(error.message);
    });
});

app.listen(10000, function () {
  console.log("Started application on port %d", 10000);
});
