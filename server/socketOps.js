let mongoose = require("mongoose"),
  express = require("express");

let chats = require("./models/chat-schema");
(user = require("./models/user-schema")),
  (groups = require("./models/group-schema")),
  (groupChats = require("./models/group-chat-schema"));

const allSocketOps = io => {
  const userData = {},
    privateList = [],
    userList = [],
    rooms = [],
    userDetails = {};

  io.on("connection", socket => {
    console.log("New client connected");

    socket.on("addUser", (name, userInfo) => {
      socket.username = name;
      console.log(socket.id);
      userData[name] = socket.id;
      userList.push({
        username: name,
        socketID: socket.id,
        userID: userInfo._id
      });
      console.log(userInfo);
      console.log(userList);
      userDetails[name] = userInfo;
      io.emit("addUser", userData, userDetails);
    });

    socket.on("chat message", (msg, username, userId) => {
      // let encodedData = Buffer.from(msg).toString("base64");
      // console.log(encodedData);
      let chatRecord = new chats({
        senderId: userId,
        sender: username,
        message: msg,
        reciever: "all",
        recieverId: "all"
      });
      chatRecord.save(function(err, chatData) {
        if (err) return console.error(err);
        console.log("saved to collection.");
      });
      // console.log(username);
      // console.log(msg);
      // console.log(userId);
      io.emit("chat message", msg, username, userId, "all");
    });

    socket.on("private", (pvtMsg, sender, reciever) => {
      console.log("inside private chat");
      // console.log(sender);
      // console.log(reciever);
      let sid = userList.filter(
        elem => elem.userID === sender._id || elem.userID === reciever._id
      );
      console.log(sid);
      sid.forEach(elm =>
        io
          .to(`${elm.socketID}`)
          .emit(
            "private",
            pvtMsg,
            sender.name,
            reciever.name,
            sender._id,
            reciever._id
          )
      );
      // let senderId = userData[String(reciever)];
      // let recieverId = userData[String(sender)];

      // let sid = userList.filter(
      //   elem => elem.username === sender || elem.username === reciever
      // );
      // let encodedData = Buffer.from(pvtMsg).toString("base64");
      let privateRecord = new chats({
        senderId: sender._id,
        sender: sender.name,
        message: pvtMsg,
        reciever: reciever.name,
        recieverId: reciever._id
      });
      privateRecord.save(function(err, chatData) {
        if (err) return console.error(err);
        console.log("saved to collection.");
      });
      // sid.forEach(elm =>
      //   io
      //     .to(`${elm.socketID}`)
      //     .emit("private", pvtMsg, sender, reciever, privateList)
      // );
    });
    socket.on("addRoom", (groupId, roomName, memberList, createdBy) => {
      rooms.push(roomName);
      // console.log(groupId);
      let groupData = new groups({
        groupId: groupId,
        groupname: roomName,
        members: memberList,
        createdBy: createdBy.name,
        creatorId: createdBy._id
      });
      groupData.save((err, data) => {
        if (err) return console.error(err);
        console.log("group created");
      });
      io.emit("addRoom", {
        groupId: groupId,
        groupname: roomName,
        members: memberList,
        createdBy: createdBy.name,
        creatorId: createdBy._id
      });
    });

    socket.on("joinGroup", (roomId, room, memberList) => {
      groups.findOne({ groupId: roomId }, (err, data) => {
        if (err) {
          console.log(err);
        }
        memberList.forEach(member => {
          if (data.members.includes(member)) {
            console.log("member present");
          } else {
            groups.updateOne(
              { groupname: room },
              { $push: { members: member } },
              (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("member added");
                }
              }
            );
          }
        });
      });
    });

    socket.on("groupMessage", (groupData, msg, sender) => {
      console.log("sending messages to groups");
      // let encodedData = Buffer.from(msg).toString("base64");
      let groupMessageData = new groupChats({
        senderId: sender._id,
        sender: sender.name,
        message: msg,
        groupname: groupData.groupname,
        groupId: groupData.groupId
      });

      groups.findOne({ groupId: groupData.groupId }, (err, data) => {
        if (err) {
          console.log(err);
        }
        // console.log(data.members);
        // console.log(userList);
        let groupMembers = data.members;

        if (groupMembers.includes(sender.name)) {
          let groupIds = userList.filter(user => {
            if (groupMembers.includes(user.username)) {
              return user;
            }
          });
          // console.log(groupIds);
          groupIds.forEach(member =>
            io
              .to(`${member.socketID}`)
              .emit(
                "groupMessage",
                msg,
                sender.name,
                data.groupname,
                data.groupId
              )
          );

          groupMessageData.save((err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(data);
          });
        }
      });
      // io.to(groupName).emit("groupMessage", msg, sender, groupName);
    });

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
      console.log(socket.id);
      console.log(userData);
    });
  });
};
module.exports = {
  allSocketOps
};
