var express = require("express");
const db = require("../models/db");
const random = require("../models/random");
var router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
/* GET users listing. */
router.get("/invite/:id", function (req, res, next) {
  random
    .findOne({ random_string: req.params.id })
    .then((doc) => {
      console.log(doc);
      if (doc != null) {
        res.render("users", {
          invite_id: req.params.id,
          created_for: doc.created_for,
        });
      } else {
        res.send("This link is used or invalid...");
      }
    })
    .catch((err) => {
      res.send({ err: err });
    });
});

router.post("/invite/:id/:created_for", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  //get the unique id and delete
  random.findOneAndDelete({ random_string: req.params.id }).then(() => {
    //register the user in db to verify later on...
    db({
      discord_username: req.body.discord_username,
      discord_id: req.body.discord_id,
      registered_for: req.params.created_for,
    })
      .save()
      .then((doc) => {
        //send the creds to user
        // res.send({
        //   body: req.body,
        //   params: req.params,
        //   invite_link: "Invite link",
        // });
        res.render("inviteLink", {
          link: process.env.PERM_INVITE_LINK,
        });
      });
  });
});

router.get("/auth/redirect", (req, res) => {
  res.render("inviteLink");
});

router.get("/add-user", async (req, res) => {
  let code = req.query.code;
  let created_for = req.query.createdfor;
  let id = req.query.id;
  console.log(id, created_for, code);
  //fetch the user info after authenticated
  try {
    const oauthResult = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri: `https://www.cryptolegions.link/users/auth/redirect`,
        scope: "identify",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const oauthData = await oauthResult.json();
    console.log(oauthData);
    const userResult = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });
    //res.redirect(process.env.PERM_INVITE_LINK);
    let user = await userResult.json();
    console.log(user);
    random.findOneAndDelete({ random_string: id }).then(() => {
      //register the user in db to verify later on...
      db({
        discord_username: user.username,
        discord_id: user.id,
        registered_for: created_for,
      })
        .save()
        .then((doc) => {
          //send the creds to user
          // res.send({
          //   body: req.body,
          //   params: req.params,
          //   invite_link: "Invite link",
          // });
          res.redirect(process.env.PERM_INVITE_LINK);
        });
    });
  } catch (error) {
    // NOTE: An unauthorized token will not throw an error;
    // it will return a 401 Unauthorized response in the try block above
    console.error(error);
  }
});

module.exports = router;
