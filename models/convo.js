let mongoose = require("mongoose");
let convo = new mongoose.Schema({
  points: Number,
  discord_id: String,
  level: String,
  discord_username: String,
});

module.exports = mongoose.model("convo", convo);
