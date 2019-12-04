const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String
    },
    designation: {
      type: String
    },
    emailId: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    dob: {
      type: String
    },
    employeeId: {
      type: String
    },
    department: {
      type: String
    },
    skills: {
      type: Array
    }
  },
  {
    collection: "users"
  }
);

module.exports = mongoose.model("users", userSchema);
