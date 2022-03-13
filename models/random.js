let mongoose = require("mongoose");
let random = new mongoose.Schema({
  random_string: String,
  created_for: String,
});

module.exports = mongoose.model("random", random);
