const dotenv = require("dotenv");
dotenv.config();
const { Client, Intents, MessageEmbed } = require("discord.js");

const assginPoints = require("./assginPoints");
const getUserPoints = require("./getUserPoints");

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

//assign points
assginPoints(client);
//show users their points
getUserPoints(client);
client.login(process.env.BOT_TOKEN); //the bot token
