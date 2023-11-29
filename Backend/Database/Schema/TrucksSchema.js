const mongoose = require("mongoose");

const trucksSchema = new mongoose.Schema({
  RegistrationNumber: {
    type: String,
    required: true,
    default: "",
  },
  StripID: {
    type: [String],
    required: true,
    default: "",
  },
  From: {
    type: String,
    required: true,
    default: "",
  },
  To: {
    type: String,
    required: true,
    default: "",
  },
  status: {
    type: String,
    required: true,
    default: "",
  },
  metamaskID: {
    type: String,
    required: true,
    default: "",
  },
  user: {
    type: mongoose.Schema.Types.String,
    ref: "users",
    localField: "metamaskID",
    foreignField: "metamaskID",
  },
});

const Trucks = mongoose.model("Trucks", trucksSchema);

module.exports = Trucks;
