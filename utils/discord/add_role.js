const db = require("../../models/db");

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.channel.id == "869648063063556206") {
      console.log(msg.content);
      if (msg.content.includes("!verify")) {
        db.findOne({ discord_id: msg.author.id }).then((doc) => {
          //return member.roles.add(member.guild.roles.cache.get('919279049946308628')); //Issuing a role
          if (doc != null) {
            msg.channel.send("You have a new role now...");
            let johnMember = msg.guild.members.cache.get(`${doc.discord_id}`);
            let mcRole = msg.guild.roles.cache.get("919279049946308628");
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
