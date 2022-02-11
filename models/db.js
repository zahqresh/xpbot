let mongoose = require("mongoose");
let db = new mongoose.Schema({
  discord_username: String,
  discord_id: String,
});

module.exports = mongoose.model("db", db);