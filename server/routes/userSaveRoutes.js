let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let user = require("../models/user-schema");
router.route("/users").get((req, res) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});
router.route("/update/:id").put((req, res, next) => {
  user.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("User updated successfully !");
      }
    }
  );
});

module.exports = router;
