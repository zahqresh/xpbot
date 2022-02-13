var express = require("express");
var router = express.Router();
const randomstring = require("randomstring");
const random = require("../models/random");
/* GET link generator page. */
router.get("/secret-generator", function (req, res, next) {
  //create a random string save to db
  res.render("index", {
    string: "Please generate link...",
  });
});

/* Post link generator page */

router.post("/secret-generator", (req, res) => {
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

router.get('/',(req,res)=>{
  res.json({res:"API IS RUNNING 🚀"})
})

module.exports = router;
