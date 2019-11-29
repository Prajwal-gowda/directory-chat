const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let groupSchema = new Schema(
  {
    groupname: {
      type: String
    },
    members: {
      type: Array
    },
    createdBy: {
      type: String
    }
  },
  {
    collection: "groups"
  }
);

module.exports = mongoose.model("groups", groupSchema);
