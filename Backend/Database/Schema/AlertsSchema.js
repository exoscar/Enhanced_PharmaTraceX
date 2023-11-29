const mongoose = require("mongoose");

const alertsSchema = new mongoose.Schema({
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  RegistrationNumber: {
    type: String,
    required: true,
  },
  StripID: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Alerts = mongoose.model("Alerts", alertsSchema);

module.exports = Alerts;
