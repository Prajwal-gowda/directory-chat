const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupSchema = new Schema(
  {
    groupId: {
      type: String
    },
    groupname: {
      type: String
    },
    members: {
      type: Array
    },
    createdBy: {
      type: String
    },
    creatorId: {
      type: String
    }
  },
  {
    collection: "groups"
  }
);

module.exports = mongoose.model("groups", groupSchema);
