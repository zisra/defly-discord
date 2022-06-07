const axios = require("axios");
const prompt = require('prompt');
const fs = require("fs");
const skinData = JSON.parse(fs.readFileSync('./allskins.txt', 'utf8'));
function getSkin(skin) {
  let finalSkin = {};
  finalSkin.spec = skinData.specs[skin];
  finalSkin.images = {};
  if (skinData.specs[skin].base) {
    const imageName = skinData.specs[skin].base;
    finalSkin.images[imageName] = skinData.images[imageName]
  }
  const rotors = skinData.specs[skin].rotors.map(i => i.img);
  rotors.forEach((rotor) => {
    finalSkin.images[rotor] = skinData.images[rotor]
  })
  fs.writeFileSync(`skins/skin${skin}.txt`, JSON.stringify(finalSkin));

}
getSkin(process.argv[2]);
