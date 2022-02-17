var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { connectDB } = require("./config/db_connect");
var flash = require("express-flash");
var session = require("express-session");
const axios = require("axios");
const admin = require("./models/admin");
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
var app = express();
require("./Passport");
//connect db
connectDB();

//create the admin user
// admin({email:'admin@admin.com',password:'decrypto'}).save().then((doc)=>{
//   console.log('Admin created sucessfully!');
//   console.log(doc);
// })

//Middleares for passport
app.use(session({ secret: "Your_Secret" }));
app.use(bodyParser.urlencoded({ exteded: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);



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

//send req to keep bot online on free dynos
// setInterval(() => {
//   axios.get("https://invite-bot-cryptolegions.herokuapp.com/").then(() => {
//     console.log("Req sent!");
//   });
// }, 50000);
