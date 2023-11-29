const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    default: "",
  },
  metamaskID: {
    type: String,
    required: true,
    default: "",
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
