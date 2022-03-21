const db = require("../../models/db");
const dotenv = require("dotenv").config();
const { MessageEmbed } = require("discord.js");
var names_str, pts_string;
module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$xpboard")) {
      if (msg.author.id == `${process.env.ADMIN_ID}`) {
        db.find()
          .sort({ xp_points: "descending" })
          .then((doc) => {
            console.log(doc);
            let usernames = [];
            let points = [];
            doc.forEach((e, i) => {
              usernames.push(e.discord_username);
              points.push(e.xp_points);
            });
            //create big string

            names_str = usernames.join("\n");
            pts_string = points.join("\n");
            console.log(names_str, pts_string);
          })
          .then(() => {
            console.log("Sending leaderboard");
            // inside a command, event listener, etc.
            const leaderboard = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle("Ludufi Bot Leaderboard")
              .setDescription("Leardboard based on points")
              .addFields({
                name: "Users",
                value: `${names_str}`,
                inline: true,
              })
              .addFields({
                name: "XP points",
                value: `${pts_string}`,
                inline: true,
              })
              .setTimestamp();
            msg.channel.send({ embeds: [leaderboard] });
            //clear out vars
            names_str = "";
            pts_string = "";
          });
      }
    }
  });
};
