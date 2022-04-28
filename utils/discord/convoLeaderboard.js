const db = require("../../models/db");
const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");
const convo = require("../../models/convo");
var names_str, pts_string, levels_str;
module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$convoLeaderboard")) {
      if (msg.author.id == `${process.env.ADMIN_ID}`) {
        convo
          .find({})
          .sort({ points: "descending" })
          .then((doc) => {
            console.log(doc);
            let usernames = [];
            let points = [];
            let levels = [];
            doc.forEach((e, i) => {
              usernames.push(e.discord_username);
              points.push(e.points);
              levels.push(Math.trunc(e.level));
            });
            //create big string

            names_str = usernames.join("\n");
            pts_string = points.join("\n");
            levels_str = levels.join("\n");
            console.log(names_str, pts_string, levels_str);
          })
          .then(() => {
            console.log("Sending leaderboard");
            // inside a command, event listener, etc.
            const leaderboard = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle("Ludufi Bot Coversation Leaderboard")
              .setDescription("Leardboard based on points")
              .addFields({
                name: "Users",
                value: `${names_str}`,
                inline: true,
              })
              .addFields({
                name: "Points",
                value: `${pts_string}`,
                inline: true,
              })
              .addFields({
                name: "Levels",
                value: `${levels_str}`,
                inline: true,
              })
              .setTimestamp();
            msg.channel.send({ embeds: [leaderboard] });
            //clear out vars
            names_str = "";
            pts_string = "";
            levels_str = "";
          });
      }
    }
  });
};
