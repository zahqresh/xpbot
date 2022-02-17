let mongoose = require("mongoose");
let db = new mongoose.Schema({
  discord_username: String,
  discord_id: String,
  registered_for: String,
});

module.exports = mongoose.model("db", db);
