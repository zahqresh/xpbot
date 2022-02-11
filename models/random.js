let mongoose = require("mongoose");
let random = new mongoose.Schema({
  random_string: String,
});

module.exports = mongoose.model("random", random);
