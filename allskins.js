const axios = require("axios");
const fs = require("fs");
function getAllSkins() {
  axios({
    method: 'get',
    url: 'https://defly.io/img/add-skins.js',
    responseType: 'stream'
  })
    .then(function(response) {
      response.data.pipe(fs.createWriteStream('allskins.txt'))
    });
}
getAllSkins();