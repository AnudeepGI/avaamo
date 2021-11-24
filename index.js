const express = require("express");
const app = express();
const fs = require("fs");
let ApiCall = require("./service/");
let Helper = require("./helper/");

let URL = "https://norvig.com/big.txt";
let apiKey = "dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9";
let urlYandex = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${apiKey}&lang=en-ru&text=`;

/* 
  This logic can divid into 2 parts router and Controller 
  
*/
app.get("/", function (req, res) {
  let getData = ApiCall.fetchData(URL);
  getData.then((value) => {
    let arrayData = Helper.slitIntoArray(value);
    processData(arrayData);
  });

  function processData(data) {
    let obj = Helper.genrateArray(data);
    let sortedArray = Helper.sortedArray(obj);

    let getMoreData = [];
    sortedArray.forEach((val) => {
      var keys = Object.keys(val)[0];
      getMoreData.push(ApiCall.fetchData(urlYandex + keys));
    });

    let newData = Promise.all(getMoreData);
    let newSend = [];
    newData.then((data) => {
      for (let i = 0; i < data.length; i++) {
        let parsedData = JSON.parse(data[i]);
        let text = Object.keys(sortedArray[i])[0];
        let pos = parsedData.def.length == 0 ? 'No Data from API' : parsedData.def[0].pos;
        newSend.push({
          'text' : text,
          'pos':pos,
          'count' : sortedArray[i][text]
        });
      }
      res.send(newSend);
    });
  }
});

app.listen(3000);
