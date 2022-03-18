const dotenv = require("dotenv");
dotenv.config();
const { Client, Intents, MessageEmbed } = require("discord.js");
const add_role = require("./add_role");
const role = require("./role");
//const create_invite = require("./create_invite");

// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

//upon user joining
//create_invite(client);

add_role(client);
role(client)

client.login(process.env.BOT_TOKEN); //the bot token
console.log(process.env.BOT_TOKEN);