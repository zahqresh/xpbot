var express = require("express");
var router = express.Router();
const randomstring = require("randomstring");
const { auth } = require("../auth");
const random = require("../models/random");
const dotenv = require("dotenv").config();
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

//Api endpoint for sending back links
router.get("/api/get-roles/:role/:apikey", (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  console.log(process.env.APIKEY);

  const { apikey, role } = req.params;
  if (apikey == process.env.APIKEY) {
    random({ random_string: string, created_for: `${role}` })
      .save()
      .then((doc) => {
        console.log(doc);
        res.json({
          link: `http://www.cryptolegions.link/users/invite/${doc.random_string}`, //updated
        });
      });
  } else {
    res.json({ err: "forbidden!" });
  }
});

/* GET link generator page. */
router.get("/secret-generator", auth, function (req, res, next) {
  //create a random string save to db
  res.render("index", {
    tester: "Please generate link...",
    whitelist_role: "Please generate link...",
    beast_master: "Please generate link...",
    monster_conqueror: "Please generate link...",
    warrior_master: "Please generate link...",
    king_of_nicah: "Please generate link...",
    legion_master: "Please generate link...",
  });
});

/* Post link generator page  tester*/

router.post("/secret-generator/tester", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "tester" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: string,
        whitelist_role: "Please generate link...",
        beast_master: "Please generate link...",
        monster_conqueror: "Please generate link...",
        warrior_master: "Please generate link...",
        king_of_nicah: "Please generate link...",
        legion_master: "Please generate link...",
      });
    });
});

router.post("/secret-generator/whitelist_role", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "whitelist_role" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: "Please generate link...",
        whitelist_role: string,
        beast_master: "Please generate link...",
        monster_conqueror: "Please generate link...",
        warrior_master: "Please generate link...",
        king_of_nicah: "Please generate link...",
        legion_master: "Please generate link...",
      });
    });
});

/* Post link generator page */

router.post("/secret-generator/beast_master", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "beast_master" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: "Please generate link...",
        whitelist_role: "Please generate link...",
        beast_master: string,
        monster_conqueror: "Please generate link...",
        warrior_master: "Please generate link...",
        king_of_nicah: "Please generate link...",
        legion_master: "Please generate link...",
      });
    });
});

/* Post link generator moster conquerer */

router.post("/secret-generator/monster_conqueror", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "monster_conqueror" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: "Please generate link...",
        whitelist_role: "Please generate link...",
        beast_master: "Please generate link...",
        monster_conqueror: string,
        warrior_master: "Please generate link...",
        king_of_nicah: "Please generate link...",
        legion_master: "Please generate link...",
      });
    });
});

/* Post link generator page */

router.post("/secret-generator/warrior_master", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "warrior_master" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: "Please generate link...",
        whitelist_role: "Please generate link...",
        beast_master: "Please generate link...",
        monster_conqueror: "Please generate link...",
        warrior_master: string,
        king_of_nicah: "Please generate link...",
        legion_master: "Please generate link...",
      });
    });
});

/* Post link generator page */

router.post("/secret-generator/king_of_nicah", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "king_of_nicah" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: "Please generate link...",
        whitelist_role: "Please generate link...",
        beast_master: "Please generate link...",
        monster_conqueror: "Please generate link...",
        warrior_master: "Please generate link...",
        king_of_nicah: string,
        legion_master: "Please generate link...",
      });
    });
});

/* Post link generator page */

router.post("/secret-generator/legion_master", auth, (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string, created_for: "legion_master" })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        tester: "Please generate link...",
        whitelist_role: "Please generate link...",
        beast_master: "Please generate link...",
        monster_conqueror: "Please generate link...",
        warrior_master: "Please generate link...",
        king_of_nicah: "Please generate link...",
        legion_master: string,
      });
    });
});

router.get("/", (req, res) => {
  res.json({ res: "API IS RUNNING 🚀" });
});

//admin routes setup
router.get("/login", (req, res) => {
  res.render("Login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login-error" }),
  function (req, res) {
    res.redirect("/secret-generator");
  }
);

router.get("/login-error", (req, res) => {
  req.flash("msg", "One or more details are wrong!");
  req.flash("type", "warning");
  res.redirect("/login");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
