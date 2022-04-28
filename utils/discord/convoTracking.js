const { db } = require("../../models/convo.js");
const convo = require("../../models/convo.js");
const dotenv = require("dotenv").config();

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (!msg.author.bot) {
      console.log(msg.content);

      convo.findOne({ discord_id: msg.author.id }).then((doc) => {
        if (doc == null) {
          convo({
            discord_id: msg.author.id,
            points: 0.5,
            level: 0,
            discord_username: msg.author.username,
          })
            .save()
            .then((doc) => {
              console.log("First time points logged for ", msg.author.username);
            });
        } else {
          convo.findOne({ discord_id: msg.author.id }).then((doc) => {
            //check the points level etc
            if (doc.points >= 500) {
              console.log("User reached max. level with 500xp points");
            }
            if (doc.points < 500) {
              convo
                .findOneAndUpdate({
                  points: Number(doc.points) + Number(0.5),
                  level: doc.points / 10,
                })
                .then(() => {
                  console.log("Points and level updated ✅");
                });
            }
          });
        }
      });
    }
  });
};
