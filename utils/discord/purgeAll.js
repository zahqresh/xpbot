const db = require("../../models/db");
const dotenv = require("dotenv").config();

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$purgexp")) {
      if (msg.author.id == `${process.env.ADMIN_ID}`) {
        db.updateMany({}, { xp_points: Number(0) }).then(() => {
          msg.channel.send("`Xp points of all users are restored!`");
        });
      }
    }
  });
};
