const db = require("../../models/db");
const dotenv = require('dotenv').config();
module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.channel.id == process.env.VERIFY_CHANNEL_ID) { //specific channel channel to verify
      console.log(msg.content);
      if (msg.content.includes("!verify")) {
        db.findOne({ discord_id: msg.author.id }).then((doc) => {
          //return member.roles.add(member.guild.roles.cache.get('919279049946308628')); //Issuing a role
          if (doc != null) {
            msg.channel.send("You have a new role now...");
            let johnMember = msg.guild.members.cache.get(`${doc.discord_id}`);
            let mcRole = msg.guild.roles.cache.get(`${process.env.ROLE_ID}`); //this would be the specific role id to give to people
            if (!mcRole) return;
            if (!johnMember) return;
            if (johnMember.roles.cache.has(mcRole.id)) return;
            johnMember.roles.add(mcRole.id);
          }
          if (doc == null) {
            console.log("You are not registered and cant be verified...");
            msg.channel.send("You are not registered and cant be verified...");
          }
        });
      }
    }
  });
};
