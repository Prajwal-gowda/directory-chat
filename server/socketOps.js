let mongoose = require("mongoose"),
  express = require("express");

// let chats = require("./models/chat-schema"),
//   user = require("./models/user-schema"),
//   groups = require("./models/group-schema"),
//   groupChats = require("./models/group-chat-schema");

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
      //   let encodedData = Buffer.from(msg).toString("base64");
      //   console.log(encodedData);
      //   let chatRecord = new chats({
      //     sender: username,
      //     message: encodedData,
      //     reciever: "all"
      //   });
      //   chatRecord.save(function(err, chatData) {
      //     if (err) return console.error(err);
      //     console.log("saved to collection.");
      //   });
      console.log(username);
      console.log(msg);
      console.log(userId);
      io.emit("chat message", msg, username, userId, "all");
    });

    socket.on("private", (pvtMsg, sender, reciever) => {
      console.log("inside private chat");
      console.log(sender);
      console.log(reciever);
      let sid = userList.filter(
        elem => elem.userID === sender._id || elem.userID === reciever._id
      );
      console.log(sid);
      sid.forEach(elm =>
        io
          .to(`${elm.socketID}`)
          .emit("private", pvtMsg, sender.name, reciever.name)
      );
      // let senderId = userData[String(reciever)];
      // let recieverId = userData[String(sender)];
      // let encodedData = Buffer.from(pvtMsg).toString("base64");
      // let sid = userList.filter(
      //   elem => elem.username === sender || elem.username === reciever
      // );
      // let privateRecord = new chats({
      //   sender: sender,
      //   message: encodedData,
      //   reciever: reciever
      // });
      // privateRecord.save(function(err, chatData) {
      //   if (err) return console.error(err);
      //   console.log("saved to collection.");
      // });
      // sid.forEach(elm =>
      //   io
      //     .to(`${elm.socketID}`)
      //     .emit("private", pvtMsg, sender, reciever, privateList)
      // );
    });
    // socket.on("addRoom", (roomName, memberList, createdBy) => {
    //   rooms.push(roomName);
    //   console.log(rooms);
    //   let groupData = new groups({
    //     groupname: roomName,
    //     members: memberList,
    //     createdBy: createdBy
    //   });
    //   groupData.save((err, data) => {
    //     if (err) return console.error(err);
    //     console.log("group created");
    //   });
    //   io.emit("addRoom", { groupname: roomName, members: memberList });
    // });

    // socket.on("joinGroup", (room, member) => {
    //   socket.join(room);
    //   console.log(member + "joined" + room);
    //   console.log(socket.id + "joined" + room);

    //   groups.findOne({ groupname: room }, (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     if (data.members.includes(member)) {
    //       console.log("member present");
    //     } else {
    //       groups.updateOne(
    //         { groupname: room },
    //         { $push: { members: member } },
    //         (err, data) => {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             console.log("member added");
    //           }
    //         }
    //       );
    //     }
    //   });
    // });

    // socket.on("groupMessage", (groupName, msg, sender) => {
    //   console.log("sending messages to groups");
    //   let encodedData = Buffer.from(msg).toString("base64");
    //   let groupMessageData = new groupChats({
    //     sender: sender,
    //     message: encodedData,
    //     groupname: groupName
    //   });

    //   groups.findOne({ groupname: groupName }, (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log(data.members);
    //     console.log(userList);
    //     let groupMembers = data.members;

    //     if (groupMembers.includes(sender)) {
    //       let groupIds = userList.filter(user => {
    //         if (groupMembers.includes(user.username)) {
    //           return user;
    //         }
    //       });
    //       console.log(groupIds);
    //       groupIds.forEach(member =>
    //         io
    //           .to(`${member.socketID}`)
    //           .emit("groupMessage", msg, sender, groupName)
    //       );

    //       groupMessageData.save((err, data) => {
    //         if (err) {
    //           console.log(err);
    //         }
    //         console.log(data);
    //       });
    //     }
    //   });
    //   // io.to(groupName).emit("groupMessage", msg, sender, groupName);
    // });

    // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};
module.exports = {
  allSocketOps
};
