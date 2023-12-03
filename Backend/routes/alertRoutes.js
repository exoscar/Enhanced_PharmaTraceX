const express = require("express");
const router = express.Router();
const path = require("path");

const Medicine = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "MedicineSchema.js"
));

const Alerts = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "AlertsSchema.js"
));
const Trucks = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "TrucksSchema.js"
));

const verifyTokenMiddleware = require(path.join(
  __dirname,
  "..",
  "Security",
  "authMiddleware.js"
)).verifyTokenMiddleware;

const isValidData = (temperature, humidity) => {
  return !isNaN(temperature) && !isNaN(humidity);
};

router.post("/sendEnvConditions", verifyTokenMiddleware, async (req, res) => {
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

router.post("/search", verifyTokenMiddleware, async (req, res) => {
  try {
    const { search } = req.body;

    // Validate the 'search' parameter
    if (!search) {
      return res.status(400).json({ message: "Search parameter is required." });
    }

    // Search for Alerts with the provided RegistrationNumber
    const adata = await Alerts.find({ RegistrationNumber: search });

    if (adata && adata.length > 0) {
      return res.json(adata);
    } else {
      return res.status(404).json({ message: "No matching results found." });
    }
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/updateStatus", verifyTokenMiddleware, async (req, res) => {
  try {
    const { sid } = req.body;
    const sidd = sid.toString();

    // Validate the 'sid' parameter
    if (!sidd) {
      return res.status(400).json({ message: "StripID is required." });
    }

    // Update Medicine status to "Corrupted"
    const medicineUpdate = await Medicine.updateMany(
      { StripID: sidd },
      { $set: { status: "Corrupted" } }
    );

    // Update Alerts status to "corrupted" for matching conditions
    const alertUpdate = await Alerts.updateMany(
      { StripID: sidd, status: "0" },
      { $set: { status: "corrupted" } }
    );

    if (medicineUpdate && alertUpdate) {
      return res.json({ message: "Updated successfully" });
    } else {
      return res.json({ message: "Update failed" });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//begin of http get methods

router.get("/viewAlerts", verifyTokenMiddleware, async (req, res) => {
  try {
    // Find Alerts with status "0"
    const result = await Alerts.find({ status: "0" });

    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.json("No alerts found");
    }
  } catch (error) {
    console.error("Error fetching alerts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
