const db = require("../../models/db");
const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");
module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$LudufiHelp")) {
      // inside a command, event listener, etc.
      const cmd = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Ludufi Bot Leaderboard")
        .setDescription("Leardboard based on points")
        .addFields({
          name: "$xp={amount to allocate}, @mentionUser",
          value: `Allocates x amount of xp to user`,
        })
        .addFields({
          name: "$purgexp",
          value: `restores xp of all users`,
        })
        .addFields({
          name: "$myxp",
          value: `show's user their current xp`,
        })
        .addFields({
          name: "$xpboard",
          value: `shows xp leaderboard`,
        })
        .addFields({
          name: "$resetxp, @mentionedUser",
          value: `restores xp of all users`,
        })
        .addFields({
          name: "$LudufiHelp",
          value: `Ludufi will show you a list of command`,
        })
        .setTimestamp();
      msg.channel.send({ embeds: [cmd] });
    }
  });
};
