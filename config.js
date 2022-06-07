module.exports.PREFIX = "d?";
module.exports.TEAM_EMOJIS = {
  blue: "884904847118323722",
  "dark-green": "884904846887649291",
  orange: "884904847067979837",
  red: "884904847160246332",
  "sky-blue": "884904847038615592",
};
module.exports.UPGRADES = {
  ON: "<:upg_on:948707185716772874>",
  OFF: "<:upg_off:948707185771294771>",
};
module.exports.EMBED_COLOR = "f659ff";
module.exports.EXCUSES = ["I swear it was lag!", "Dang, why is my ping so high?", "Why do people have to kill me when I get a disconnect?", "Dang, that was an invisible bullet.", "My cat just walked on my keyboard :(", "I was AFK! Darn it!", "Why did I just die? My key was jammed.", "Oh no! My keyboard dropped and it made me die. How unfortunate :(", "My computer is so laggy today", "A lightning stroke my house and I lost signal, Thor hates me.", "I don't use this skin usually, it makes me lag a lot.", "I was checking Discord! Why did you kill me?", "Why are there so many hackers in this game? Get reported!", "My battery died, the charger didn't plug correctly.", "Is this a new update? I see bullets go faster than usual.", "I swear someone changed the hitbox size!", "Get reported, hackers!", "I'm using a different browser. Curse you internet explorer!", "I had a phone to pick! How rude >:(", "Okay I'm back- Wait, when did I get killed?", "Weird how I died, there must be a bug in the game", "Not to make any excuses, but I'm pretty sure I got killed by a hacker.", "Oof, that was my clone."];
module.exports.MAX_SKINS = 136; 
module.exports.COMMANDS = [
  {
    command: "about",
    info: "Basic information & credits regarding the bot. "
  },
  {
    command: "help",
    info: "Gets a list of all commands",
  },
  {
    command: "elite-team <name>",
    info: "Gets info on each elite team. `<name>` is the name of an elite team",
  },
  {
    command: "elite-teams",
    info: "Gets a list of each elite team",
  },
  {
    command: "badges",
    info: "Gets a list of all badges for premium users",
  },
  {
    command: "badge <number>",
    info: "Gets info on a specific badge",
  },
  {
    command: "randombadge",
    info: "Gets a random badge for premium users",
  },
  {
    command: "wiki <article>",
    info: "Gets a given wiki article from the defly.io wiki",
  },
  {
    command: "build <build>",
    info: "Sends a graphic for any chosen build",
  },
  {
    command: "skin <skin-id>",
    info: "Sends the file for a current in-game skin. Supports almost every skin."
  },
  {
    command: "excuse",
    info: "You died in defly.io and need something to cover up your shame? This command has you covered, because it gives you a random excuse for your comfort!"
  }
];
