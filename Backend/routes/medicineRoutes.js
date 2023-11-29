// routes/medicineRoutes.js
const express = require("express");
const router = express.Router();
const path = require("path");
// Define medicine-related routes
const Medicine = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "MedicineSchema.js"
));
router.post("/addMedicine", async (req, res) => {
  try {
    const {
      MedicineName,
      StripID,
      Conditions,
      Quantity,
      Ingredients,
      SideEffects,
      ExpiryDate,
      ManufactureDate,
      BatchNumber,
      Price,
    } = req.body;

    // Validate required fields
    if (
      !MedicineName ||
      !StripID ||
      !Conditions ||
      !Quantity ||
      !Ingredients ||
      !SideEffects ||
      !ExpiryDate ||
      !ManufactureDate ||
      !BatchNumber ||
      !Price
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate conditions format
    const conditionParts = Conditions.split(",");
    if (
      conditionParts.length !== 2 ||
      conditionParts.some((item) => item.trim() === "" || item.trim() === null)
    ) {
      return res.status(400).json({
        message:
          "Conditions must be in the format 'minTemp-maxTemp, minHumi-maxHumi'.",
      });
    }

    const [tempCondition, humiCondition] = conditionParts;

    const tempRange = tempCondition.split("-");
    const humiRange = humiCondition.split("-");

    if (tempRange.length !== 2 || humiRange.length !== 2) {
      return res.status(400).json({
        message:
          "Temperature and humidity conditions must be in the format 'min-max'.",
      });
    }

    // Check if Medicine with the same StripID already exists
    const existingMedicine = await Medicine.findOne({ StripID });

    if (existingMedicine) {
      return res
        .status(409)
        .json({ message: "Medicine with the same StripID already exists." });
    }

    // Create new Medicine document
    const newMedicine = new Medicine({
      MedicineName,
      StripID,
      mintemp: tempRange[0],
      maxtemp: tempRange[1],
      minhumi: humiRange[0],
      maxhumi: humiRange[1],
      Quantity,
      Ingredients,
      SideEffects,
      ExpiryDate,
      ManufactureDate,
      BatchNumber,
      Price,
      status: "Ideal",
      address: "0x0000000",
    });

    // Save the document
    await newMedicine.save();

    console.log("Medicine document saved successfully");
    return res.json({ message: "Medicine document saved successfully" });
  } catch (error) {
    console.error("Error adding new Medicine document:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/medicines", (req, res) => {
  // Handle getting medicine details logic
});

module.exports = router;
