const db = require("../../models/db");
const dotenv = require("dotenv").config();

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$resetxp,")) {
      if (msg.author.id == `${process.env.ADMIN_ID}`) {
        const user = msg.mentions.users.first();
        if (user === undefined) {
          console.log("USER MENTIONED NOT FOUND!");
          return; // Do not proceed, there is no user.
        }
        const { id, username } = user;
        let str = msg.content.substring(0, msg.content.indexOf(","));
        const xp_points = str.substring(str.indexOf(",") + 1);

        console.log(xp_points, username, id); // 👉️ we have xp points now

        //find user and reset xp

        db.findOne({ discord_id: id }).then((doc) => {
          if (doc != null) {
            db.findOneAndUpdate(
              { discord_id: id },
              {
                xp_points: 0,
              },
              {
                new: true,
              }
            ).then(() => {
              msg.channel.send(
                `${"<@" + user.id + ">"} your points got reset!`
              );
            });
          }
        });
      }
    }
  });
};
