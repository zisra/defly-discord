process.on("uncaughtException", (error, origin) => {
  console.log("----- Uncaught exception -----");
  console.log(error);
  console.log("----- Exception origin -----");
  console.log(origin);
});
process.on("unhandledRejection", (reason, promise) => {
  console.log("----- Unhandled Rejection at -----");
  console.log(promise);
  console.log("----- Reason -----");
  console.log(reason);
});
const fs = require("fs")
const express = require("express");
const app = express();
const Discord = require("discord.js");
const axios = require("axios");
const constants = require("./constants.js");
const config = require("./config.js");

const client = new Discord.Client({
  intents: ["GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS", "GUILDS","DIRECT_MESSAGES"],
  allowedMentions: { parse: ["users", "roles"], repliedUser: false },
  partials: ["CHANNEL"]
});


String.prototype.capitalize = () => {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.escapeMarkdown = function () {
  return Discord.Util.escapeMarkdown(this);
};

client.on("ready", async (client) => {
  client.user.setActivity("defly.io");
  console.log("Bot working");
});

client
    .on("debug", console.log)
    .on("warn", console.log)

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith(config.PREFIX)) return;
  const args = message.content.slice(config.PREFIX.length).trim().split(" ");
  const command = args.shift();
  if (command === "elite-team") {
    const eliteTeam = args[0];
    if (!args[0])
      return message.reply(
        `Please select an elite team: ${constants.ELITE_TEAM_NAMES.join(", ")}`
      );
    if (!constants.ELITE_TEAM_NAMES.includes(args[0]))
      return message.reply(
        `Please select an elite team: ${constants.ELITE_TEAM_NAMES.join(", ")}`
      );
    const embed = new Discord.MessageEmbed()
      .setColor(constants.ELITE_TEAMS[eliteTeam].color)
      .setThumbnail(
        `https://cdn.discordapp.com/emojis/${config.TEAM_EMOJIS[eliteTeam]}.png`
      )
      .setTitle(`${args[0].replace("-", " ")}`)
      .setDescription(
        `**Captain:** ${constants.ELITE_TEAMS[
          eliteTeam
        ].captain.escapeMarkdown()}\n**Vice captain:** ${constants.ELITE_TEAMS[
          eliteTeam
        ].vice.escapeMarkdown()}\n${constants.ELITE_TEAMS[eliteTeam].members
          .join("\n")
          .escapeMarkdown()}`
      );
    await message.reply({ embeds: [embed] });
  } else if (command === "elite-teams") {
    let arr = [];
    let i = 0;
    while (i < constants.ELITE_TEAM_NAMES.length) {
      i++;
      const eliteTeam = Object.keys(constants.ELITE_TEAMS)[parseInt(i - 1)];
      const embed = new Discord.MessageEmbed()
        .setColor(constants.ELITE_TEAMS[eliteTeam].color)
        .setThumbnail(
          `https://cdn.discordapp.com/emojis/${config.TEAM_EMOJIS[eliteTeam]}.png`
        )
        .setTitle(
          `${Object.keys(constants.ELITE_TEAMS)[parseInt(i - 1)].replace(
            "-",
            " "
          )}`
        )
        .setDescription(
          `**Captain:** ${constants.ELITE_TEAMS[
            eliteTeam
          ].captain.escapeMarkdown()}\n**Vice captain:** ${constants.ELITE_TEAMS[
            eliteTeam
          ].vice.escapeMarkdown()}\n${constants.ELITE_TEAMS[eliteTeam].members
            .join("\n")
            .escapeMarkdown()}`
        );
      arr.push(embed);
    }

    await message.reply({ embeds: arr });
  } else if (command === "help") {
    const invite = await client.generateInvite({
      permissions: ["ADMINISTRATOR"],
      scopes: ["bot"],
    });
    const embed = new Discord.MessageEmbed()
      .setTitle("Defly.io community bot | Commands")
      .setDescription(
        `${config.COMMANDS.map((i) => "`d?" + i.command + "`: " + i.info).join(
          "\n"
        )}\n\n**Developer:** Isra#1719`
      )
      .setColor(config.EMBED_COLOR);
    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setURL(invite)
        .setLabel("Invite Bot")
        .setStyle("LINK"),
      new Discord.MessageButton()
        .setURL("https://discord.gg/fA94DsyF76")
        .setLabel("Join support")
        .setStyle("LINK")
    );
    await message.reply({ embeds: [embed], components: [row] });
  } else if (command === "badges") {
    const embed = new Discord.MessageEmbed()
      .setTitle("Defly.io badges")
      .setDescription(
        client.guilds.cache
          .get("877177181413994496")
          .emojis.cache.map((e) => e.toString())
          .sort()
          .join(" ")
      )
      .setColor(config.EMBED_COLOR);

    await message.reply({ embeds: [embed] });
  } else if (command === "badge") {
    if (!args[0] || args[0] < 1 || args[0] > 47)
      return message.reply(`Please select a badge number: 1 - 47`);
    const embed = new Discord.MessageEmbed()
      .setTitle(`Defly.io badge ${args[0]}`)
      .setImage(`https://defly.io/img/badges/${args[0]}.png`)
      .setColor(config.EMBED_COLOR);

    await message.reply({ embeds: [embed] });
  } else if (command === "eval") {
    if (message.author.id !== process.env.BOT_OWNER) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.reply(evaled, { code: "xl" });
    } catch (err) {
      message.reply(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      console.log(err);
    }
  } else if (command === "randombadge") {
    const badgeNumber = Math.floor(Math.random() * 47) + 1;
    const embed = new Discord.MessageEmbed()
      .setTitle(`Defly.io badge ${badgeNumber}`)
      .setImage(`https://defly.io/img/badges/${badgeNumber}.png`)
      .setColor(config.EMBED_COLOR);
    await message.reply({ embeds: [embed] });
  } else if (command === "wiki") {
    if (!args.length) {
      await message.reply(
        "Please type in the title of a defly.io wiki article"
      );
    } else {
      const title = args.join(" ");
      try {
        const res = await axios.get("https://deflyio.fandom.com/wiki/" + title);
        if (res.status == 200) {
          const embed = new Discord.MessageEmbed()
            .setTitle(title + " | Wiki Article")
            .setURL("https://deflyio.fandom.com/wiki/" + title)
            .setDescription("[Defly.io wiki](https://deflyio.fandom.com/)")
            .setColor(config.EMBED_COLOR);
          await message.reply({ embeds: [embed] });
        } else {
          await message.reply("Article not found");
        }
      } catch (err) {
        await message.reply("Article not found");
      }
    }
  } else if (command === "build") {
    let added = args[0].split("");
    if (
      args[0].length !== 7 ||
      added.reduce((a, b) => parseInt(a) + parseInt(b), 0) !== 32 ||
      !args[0]
    ) {
      message.reply("Please enter a valid build. Example: 4727048");
    } else {
      await message.reply(
        `**Build:** ${args[0]}\n` +
          added
            .map(
              (n) =>
                config.UPGRADES.ON.repeat(n) + config.UPGRADES.OFF.repeat(8 - n)
            )
            .join("\n")
      );
    }
  } else if (command === "skin") {
    if (!args[0] || args[0] < 26 || args[0] > config.MAX_SKINS) {
      message.reply(`Please provide a valid skin ID: 26-${config.MAX_SKINS}\nYou can get the skin ID here:** https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197 **`);
    } else {
    const skin = args[0];
    try {
      const row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setCustomId("getimages")
          .setLabel("Get images")
          .setStyle("PRIMARY")
      );
      message.reply({
        content: `Defly.io skin ID: ${skin}`,
        files: [
          {
            attachment: `./skins/skin${skin}.txt`,
            name: `skin${skin}.txt`,
            description: `Defly.io skin ID: ${skin}`,
          },
        ],
        components: [row],
      });
    } catch (err) {
      console.log(err);
      message.reply(`Please provide a valid skin ID: 26-${config.MAX_SKINS}\nYou can get the skin ID here:** https://docs.google.com/spreadsheets/d/1RWiaX_GJjaO9f9FyA78wD-ETSEL3_7Kbmexg5xBQ-ZA/edit#gid=757313197 **`);
    }
    }
  } else if(command === "about"){
  const invite = await client.generateInvite({
      permissions: ["ADMINISTRATOR"],
      scopes: ["bot"],
    });
    const embed = new Discord.MessageEmbed().setColor(config.EMBED_COLOR).setTitle("About").setDescription(`Hello! I'm ${client.user}. Invite the me if you are interested in defly.io and related meta commands! I have a set of commands. If you would like to see a list of all commands, type \`d?help\`. The prefix of this bot is \`d?\`, so if you want to use a command, you must send \`d?commandname\` followed by any arguments, which will be specified with \`<argumentname>\` in the help command. The bot was developed by Isra#1719. The logo was made by Storm Trooper 816#7240. `)
   const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setURL(invite)
        .setLabel("Invite Bot")
        .setStyle("LINK"),
      new Discord.MessageButton()
        .setURL("https://discord.gg/fA94DsyF76")
        .setLabel("Join support")
        .setStyle("LINK")
    );
    await message.reply({ embeds: [embed], components: [row] });
  } else if(command === "excuse"){
    const excuse = config.EXCUSES[Math.floor(Math.random() * config.EXCUSES.length)];
    const embed = new Discord.MessageEmbed().setColor(config.EMBED_COLOR).setTitle("Your random excuse").setDescription(excuse);
    message.reply({embeds: [embed]})
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.type !== "MESSAGE_COMPONENT") return;
  try {
    const skinId = interaction.message.content.replace(
      "Defly.io skin ID: ",
      ""
    );
    const skinFile = JSON.parse(
      fs.readFileSync(`./skins/skin${skinId}.txt`, "utf8")
    );
    
    const skin = Object.keys(skinFile.images).map((key) => {
      return {
        file:skinFile.images[key].split(',')[1],
        name:key
      };
    });
    if (interaction.customId === "getimages") {
      
      await interaction.reply({
        ephemeral: true,
        files: 
          skin.map((i) => new Discord.MessageAttachment(Buffer.from(i.file, 'base64'),`${i.name}.png`)),
      });
    }
  } catch (err) {
    console.log(err);
  }
  
});

client.login(process.env.DISCORD_TOKEN);
app.get("/", async (req, res) => {
  res.send("Server Working");
});
app.use("/skinfiles", express.static("skins"))

app.get("/skin/:skin", (req, res) => {
  try {
  let skinFile = JSON.parse(fs.readFileSync(`./skins/skin${req.params.skin}.txt`, 'utf8'));
  skin = Object.keys(skinFile.images).map((key) => skinFile.images[key]);
res.send(`<a href="/skinfiles/skin${req.params.skin}.txt" download>Download skin</a><br />`+skin.map(i=>`<img style="background-color:black;" src="${i}" alt="${Object.keys(skinFile.images)}"  width="300"/>`).join("<br/>"))  
  } catch {
    res.send("Skin does not exist")
  }
});



app.listen(3000, () => {
  console.log("Server working");
});