var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
const { connectDB } = require("./config/db_connect");
const app = express();
const axios = require("axios");

//connect db
connectDB();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // set locals, only providing error in development
  res.locals.msg = req.flash("msg");
  res.locals.type = req.flash("type");
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render("error");
});
//get the bot up
require("./utils/discord/discord");

app.listen(process.env.PORT || 5000, () => {
  console.log("API ONLINE!");
});

setInterval(() => {
  axios.get("https://ludufi-bot.herokuapp.com/").then(() => {
    console.log("Awaking ludufi bot... 👀");
  });
}, 20000);
