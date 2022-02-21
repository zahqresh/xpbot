const db = require("../../models/db");
const dotenv = require("dotenv").config();

module.exports = (client) => {
  client.on("messageCreate", (msg) => {
    if (msg.channel.id == process.env.VERIFY_CHANNEL_ID) {
      //specific channel channel to verify
      console.log(msg.content);
      if (msg.content.includes("!verify")) {
        db.findOne({ discord_id: msg.author.id })
          .then((doc) => {
            //return member.roles.add(member.guild.roles.cache.get('919279049946308628')); //Issuing a role
            if (doc != null) {
              msg.channel.send("`NEW ROLE ASSIGNED TO YOUR PROFILE!`");
              let johnMember = msg.guild.members.cache.get(`${doc.discord_id}`);
              let mcRole; //this would be the specific role id to give to people
              switch (`${doc.registered_for}`) {
                case "tester":
                  mcRole = msg.guild.roles.cache.get(`${process.env.tester}`);
                  break;
                case "whitelist_role":
                  mcRole = msg.guild.roles.cache.get(
                    `${process.env.whitelist_role}`
                  );
                  break;
                case "beast_master":
                  mcRole = msg.guild.roles.cache.get(
                    `${process.env.beast_master}`
                  );
                  break;
                case "warrior_master":
                  mcRole = msg.guild.roles.cache.get(
                    `${process.env.warrior_master}`
                  );
                  break;
                case "legion_master":
                  mcRole = msg.guild.roles.cache.get(
                    `${process.env.legion_master}`
                  );
                  break;
                case "monster_conqueror":
                  mcRole = msg.guild.roles.cache.get(
                    `${process.env.warrior_conqueror}`
                  );
                  break;
                case "king_of_nicah":
                  mcRole = msg.guild.roles.cache.get(
                    `${process.env.king_of_nicah}`
                  );
                  break;

                default:
                  break;
              }
              if (!mcRole) return;
              if (!johnMember) return;
              if (johnMember.roles.cache.has(mcRole.id)) return;
              johnMember.roles.add(mcRole.id);
            }
            if (doc == null) {
              console.log("Unverified user running command!");
              msg.channel.send(
                "`USER NOT FOUND IN REGISTERATION!`"
              );
            }
          })
          .then(() => {
            db.findOneAndDelete({ discord_id: msg.author.id }).then((data) => {
             // console.log(data);
              console.log(`${data} deleted after adding role!`);
            });
          });
      }
    }
  });
};
