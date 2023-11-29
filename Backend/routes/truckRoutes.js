// routes/truckRoutes.js
const express = require("express");
const router = express.Router();
const path = require("path");
const Trucks = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "TrucksSchema.js"
));

const users = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "UserSchema.js"
));

const Alerts = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "AlertsSchema.js"
));

const isValidData = (temperature, humidity) => {
  return !isNaN(temperature) && !isNaN(humidity);
};

router.post("/sendTruckDetails", async (req, res) => {
  try {
    const { RegistrationNumber, StripID, From, To, address } = req.body;
    const initialStatus = "0";

    if (!RegistrationNumber || !StripID || !From || !To || !address) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userExists = await users.findOne({ metamaskID: address });

    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingTruck = await Trucks.findOne({ RegistrationNumber });

    if (existingTruck) {
      return res.status(409).json({ message: "Truck already exists" });
    }

    const newTruck = new Trucks({
      RegistrationNumber,
      StripID,
      From,
      To,
      status: initialStatus,
      metamaskID: address,
    });

    await newTruck.save();

    return res
      .status(201)
      .json({ message: "Truck details added successfully" });
  } catch (error) {
    console.error("Error in /sendTruckDetails route:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/sendEnvConditions", async (req, res) => {
  try {
    const { temperature, humidity, RegistrationNumber } = req.body;
    console.log(temperature, humidity, RegistrationNumber);

    // Validate temperature and humidity as numbers
    if (!isValidData(temperature, humidity)) {
      return res.status(400).json({
        message: "Temperature and humidity must be valid numbers.",
      });
    }

    // Find truck details with the given RegistrationNumber and status "0"
    const truckDetails = await Trucks.findOne({
      RegistrationNumber,
      status: "0",
    });

    if (!truckDetails) {
      console.log("No matching truck with given registration number is found.");
      return res.status(404).json({
        message: "No matching truck with given registration number is found.",
      });
    }

    const StripID = truckDetails.StripID;

    // Check if there are existing alerts for the given RegistrationNumber and status "0"
    const existingAlerts = await Alerts.findOne({
      RegistrationNumber,
      status: "0",
    });

    if (existingAlerts) {
      return res.json("Alerts already exist for the provided details.");
    }

    // Insert new alerts with the provided data
    const newAlertsData = {
      temperature,
      humidity,
      RegistrationNumber,
      StripID,
      status: "0",
    };

    await Alerts.insertMany([newAlertsData]);
    return res.json("Data inserted successfully.");
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
