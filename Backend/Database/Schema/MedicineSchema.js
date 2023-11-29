const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  MedicineName: String,
  StripID: {
    type: Number,
    integer: true, // Specify that the value should be an integer
  },
  mintemp: String,
  maxtemp: String,
  minhumi: String,
  maxhumi: String,
  Quantity: String,
  Ingredients: String,
  SideEffects: String,
  ExpiryDate: String,
  ManufactureDate: String,
  BatchNumber: String,
  Price: String,
  status: String,
  address: String,
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
