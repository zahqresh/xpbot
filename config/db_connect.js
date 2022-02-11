const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/discordrole", () => {
    console.log("DB CONNECTED!");
  });
};

module.exports = { connectDB };
