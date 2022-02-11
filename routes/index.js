var express = require("express");
var router = express.Router();
const randomstring = require("randomstring");
const random = require("../models/random");
/* GET home page. */
router.get("/", function (req, res, next) {
  //create a random string save to db
  res.render("index", {
    string: "Please generate link...",
  });
});

/* Post Home page */

router.post("/", (req, res) => {
  let string = randomstring.generate({
    length: 12,
    charset: "alphanumeric",
  });

  random({ random_string: string })
    .save()
    .then((doc) => {
      console.log(doc);
      res.render("index", {
        string: string,
      });
    });
});

module.exports = router;
