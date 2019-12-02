const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupchatSchema = new Schema(
  {
    senderId: {
      type: String
    },
    sender: {
      type: String
    },
    message: {
      type: String
    },
    groupname: {
      type: String
    },
    groupId: {
      type: String
    }
  },
  {
    collection: "groupchats"
  }
);

module.exports = mongoose.model("groupchats", groupchatSchema);
