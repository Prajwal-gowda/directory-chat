let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let user = require("../models/user-schema");

router.route("/create").post((req, res, next) => {
  user.find({ emailId: req.body.emailId }, (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data && data.length) {
      user
        .update(
          { "data[0].emailId": "req.body.emailId" },
          { $set: { "data[0].avatarUrl": "req.body.avatarUrl" } }
        )
        .then(() => res.json(data[0]));
    } else {
      user.create(req.body, (error, user) => {
        if (error) {
          return next(error);
        } else {
          console.log(user);
          res.json(user);
        }
      });
    }
  });
});

module.exports = router;
