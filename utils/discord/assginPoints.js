const db = require("../../models/db");
const dotenv = require("dotenv").config();

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.content.includes("$xp=")) {
      if (msg.author.id == `${process.env.ADMIN_ID}`) {
        const user = msg.mentions.users.first();
        if (user === undefined) {
          console.log("USER MENTIONED NOT FOUND!");
          return; // Do not proceed, there is no user.
        }
        const { id, username } = user;
        let str = msg.content.substring(0, msg.content.indexOf(","));
        const xp_points = str.substring(str.indexOf("=") + 1);

        console.log(xp_points, username, id); // 👉️ we have xp points now

        //find the user update points

        db.findOne({
          discord_id: id,
        }).then((doc) => {
          if (doc != null) {
            console.log("Creating points for already existing user");
            //get users already existing points and add them up
            let points = doc.xp_points;
            points = Number(xp_points) + Number(points);
            //now save updated points to db
            db.findOneAndUpdate(
              { discord_id: id },
              {
                xp_points: points,
              },
              { new: true }
            ).then((doc) => {
              console.log(
                `${doc.discord_username} got assigned ${doc.xp_points} points!`
              );
              msg.channel.send(
                `${"<@" + user.id + ">"} got assigned ${doc.xp_points} points!`
              );
              return;
            });
          } else {
            console.log("Creating points for new user");
            db({
              discord_username: username,
              discord_id: id,
              xp_points,
            })
              .save()
              .then((doc) => {
                console.log(
                  `${doc.discord_username} got assigned ${doc.xp_points} points!`
                );
                msg.channel.send(
                  `${"<@" + user.id + ">"} got assigned ${
                    doc.xp_points
                  } points!`
                );
                return;
              });
          }
        });
      } else {
        console.log("Un-authrized user running command");
      }
    }
  });
};
