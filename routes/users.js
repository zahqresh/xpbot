var express = require("express");
const db = require("../models/db");
const random = require("../models/random");
var router = express.Router();
const dotenv = require('dotenv').config()

/* GET users listing. */
router.get("/invite/:id", function (req, res, next) {
  random.exists({ random_string: req.params.id }, (err, bool) => {
    console.log(bool);
    if (bool != null) {
      res.render("users", {
        invite_id: req.params.id,
      });
    } else {
      res.send("This link is used or invalid...");
    }
    if (err) {
      res.send({ err: err });
    }
  });
});

router.post("/invite/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);
  //get the unique id and delete
  random.findOneAndDelete({ random_string: req.params.id }).then(() => {
    //register the user in db to verify later on...
    db({
      discord_username: req.body.discord_username,
      discord_id: req.body.discord_id,
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


module.exports = router;
