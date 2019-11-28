let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
const middleware = require("../middleware"),
  jwt = require("jsonwebtoken");

let chats = require("../models/chat-schema");
//   groups = require("../models/group-schema"),
//   groupChat = require("../models/group-chat-schema"),
//   user = require("../models/user-schema");

router.route("/").get(middleware.checkToken, (req, res) => {
  chats.find({ reciever: "all" }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      data.forEach(
        elem =>
          (elem.message = Buffer.from(elem.message, "base64").toString("ascii"))
      );
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/private").get((req, res) => {
  console.log("getting private messages");
  console.log(req.query);
  chats.find(
    {
      $or: [
        {
          $and: [
            { senderId: req.query.senderId },
            { recieverId: req.query.recieverId }
          ]
        },
        {
          $and: [
            { recieverId: req.query.senderId },
            { senderId: req.query.recieverId }
          ]
        }
      ]
    },
    (err, data) => {
      if (err) {
        return next(err);
      } else {
        data.forEach(
          elem =>
            (elem.message = Buffer.from(elem.message, "base64").toString(
              "ascii"
            ))
        );
        // console.log(data);
        res.json(data);
      }
    }
  );
});

router.route("/grouplist").get((req, res) => {
  console.log("fetching group list");
  groups.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/groupmessage").get((req, res) => {
  console.log(req.query);

  groups.findOne({ groupname: req.query.groupname }, (err, data) => {
    if (err) throw err;
    try {
      if (data.members.length > 0 && data.members.includes(req.query.sender)) {
        console.log("member of group");
        groupChat.find({ groupname: req.query.groupname }, (err, data) => {
          if (err) {
            console.log(err);
          }
          // console.log(data);
          data.forEach(
            elem =>
              (elem.message = Buffer.from(elem.message, "base64").toString(
                "ascii"
              ))
          );
          console.log(data);
          res.json(data);
        });
      } else {
        res.json([]);
      }
    } catch (error) {
      error;
    }
  });
});

router.route("/userlist").get((req, res) => {
  user.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
