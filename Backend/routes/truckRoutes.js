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

router.post("/search", async (req, res) => {
  try {
    const { search } = req.body;

    // Validate the 'search' parameter
    if (!search) {
      return res.status(400).json({ message: "Search parameter is required." });
    }

    // Find TruckDetails based on the RegistrationNumber
    const truckData = await Trucks.find({ RegistrationNumber: search });

    if (truckData.length > 0) {
      return res.json(truckData);
    } else {
      return res.json("No data found");
    }
  } catch (error) {
    console.error("Error fetching truck data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
