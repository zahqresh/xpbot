let mongoose = require("mongoose");
let db = new mongoose.Schema({
  discord_username: String,
  discord_id: String,
  xp_points: String,
});

module.exports = mongoose.model("db", db);
