const mongoose = require("mongoose");
const dotenv= require('dotenv').config()
const connectDB = () => {
  mongoose.connect(process.env.DB_LINK, () => { //mongo url created 
    console.log("DB CONNECTED!");
  });
};

module.exports = { connectDB };
