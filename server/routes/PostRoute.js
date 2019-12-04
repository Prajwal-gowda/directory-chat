const express = require("express");
const app = express();
const PostRoute = express.Router();
const gravatar = require("gravatar");
const middleware = require("../middleware");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Require Post model in our routes module
let Post = require("../models/user-schema.js");

PostRoute.route("/add").post(function(req, res) {
  Post.findOne({ emailId: req.body.emailId }).then(user => {
    if (user) {
      console.log("user exists");
      const payload = {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        emailId: user.emailId
      };
      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 36000
        },
        (err, token) => {
          if (err) console.error("There is some error in token", err);
          else {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        }
      );
    } else {
      const newUser = new Post({
        name: req.body.name,
        emailId: req.body.emailId,
        avatarUrl: req.body.avatarUrl
      });
      newUser.save().then(user => {
        const payload = {
          _id: user._id,
          name: user.name,
          avatarUrl: user.avatarUrl,
          emailId: user.emailId
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 36000
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      });
    }
  });
});

// Defined get data(index or listing) route
PostRoute.route("/").get(middleware.checkToken, function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.json(posts);
    }
  });
});

PostRoute.route("/update/:id").put(middleware.checkToken, function(req, res) {
  Post.findByIdAndUpdate(
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

PostRoute.route("/getuser/:id").get(middleware.checkToken, function(req, res) {
  Post.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
      console.log("User found");
    }
  });
});

PostRoute.route("/search").get(middleware.checkToken, function(req, res) {
  if (req.query.searchString) {
    const regex = new RegExp(escapeRegex(req.query.searchString), "gi");
    Post.find({ $or: [{ name: regex }, { skills: regex }] }, function(
      err,
      allUsers
    ) {
      if (err) {
        console.log(err);
      } else {
        res.json(allUsers);
      }
    });
  }
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

PostRoute.route("/employees").get(middleware.checkToken, function(req, res) {
  var pageNo = parseInt(req.query.pageNo);
  var size = 20;
  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  // Find some documents
  Post.count({}, function(err, totalCount) {
    if (err) {
      response = { error: true, message: "Error fetching data" };
    }
    Post.find({}, {}, query, function(err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { error: true, message: "Error fetching data" };
      } else {
        var totalPages = Math.ceil(totalCount / size);
        response = { error: false, message: data, pages: totalPages };
      }
      res.json(response);
    });
  });
});

module.exports = PostRoute;
