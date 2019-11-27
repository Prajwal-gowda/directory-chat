let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let user = require("../models/user-schema");

router.route("/").get((req, res) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
