const db = require("../../models/db");
const dotenv = require("dotenv").config();

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$myxp")) {
      db.findOne({ discord_id: msg.author.id }).then((doc) => {
        if (doc != null) {
          msg.channel.send(
            `${"<@" + msg.author.id + ">"} you have ${doc.xp_points} points ٭`
          );
        } else {
          msg.channel.send(
            `${"<@" + msg.author.id + ">"} sorry you dont have any points assigned to you ☹️`
          );
        }
      });
    }
  });
};
