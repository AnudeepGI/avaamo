const https = require('https');

class ApiCall {
    static fetchData(URL){
        return new Promise((resolve, reject) => {
            https.get(URL).on("response", function (response) {
              let body = "";
              let i = 0;
              response.on("data", function (chunk) {
                console.log(`Started reading............${i}`);
                i++;
                body += chunk;
              });
              response.on("end", function () {
                console.log("Done");
                resolve(body);
              });
            });
          });
    }
}

module.exports = ApiCall;