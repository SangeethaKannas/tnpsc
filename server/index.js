const express = require("express");
var app = express();

const fs = require('fs');
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('./temp.pdf');

const RULES = [
   {
     "IGNORE": [""]
   }
]

let parseData = (data) => {

  RULES.forEach(())
};
 
pdf(dataBuffer).then(function(data) {
 
    // number of pages
    //console.log(data.numpages);
    // number of rendered pages
    //console.log(data.numrender);
    // PDF info
    // console.log(data.info);
    // PDF metadata
    // console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    // console.log(data.version);
    // PDF text    
    parseData(data.text);
        
});

app.get("/", function (request, response) {
  response.send("Hello World!");
});

app.listen(10000, function () {
  console.log("Started application on port %d", 10000);
});
