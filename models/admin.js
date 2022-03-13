let mongoose = require("mongoose");
let admin = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("admin", admin);
