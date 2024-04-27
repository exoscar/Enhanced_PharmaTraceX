// routes/medicineRoutes.js
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const qr = require("qrcode");
// Define medicine-related routes
const Medicine = require(path.join(
  __dirname,
  "..",
  "Database",
  "Schema",
  "MedicineSchema.js"
));

const verifyTokenMiddleware = require(path.join(
  __dirname,
  "..",
  "Security",
  "authMiddleware.js"
)).verifyTokenMiddleware;

router.post("/addMedicine", verifyTokenMiddleware, async (req, res) => {
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
      address,
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
      !Price ||
      !address
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
    const StripIDs = [];
    const commaSeparatedParts = StripID.split(",");

    for (const part of commaSeparatedParts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(Number);
        for (let i = start; i <= end; i++) {
          StripIDs.push(i);
        }
      } else {
        StripIDs.push(Number(part));
      }
    }

    const existingMedicines = await Medicine.find({
      StripID: { $in: StripIDs },
    });

    if (existingMedicines.length > 0) {
      return res.status(409).json({
        message: "Medicine with one or more StripIDs already exists.",
      });
    }

    // Create new Medicine document
    const newMedicines = StripIDs.map((stripID) => ({
      MedicineName,
      StripID: stripID,
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
      address: address,
    }));

    StripIDs.forEach((StripID) => {
      const viewurl =
        "http://localhost:3000/viewMedicine/" + StripID.toString();
      qr.toDataURL(viewurl, (err, dataUrl) => {
        if (err) {
          console.error("Error generating QR code for StripID:", StripID, err);
        } else {
          const imageBuffer = Buffer.from(
            dataUrl.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          );

          const filePath = path.resolve(
            __dirname,
            `../genqrs/qr-code${StripID}.png`
          );

          fs.writeFileSync(filePath, imageBuffer, "base64");

          console.log(`QR code for StripID ${StripID} saved successfully.`);
        }
      });
    });

    // Save the document
    await Medicine.insertMany(newMedicines);
    console.log("Medicine document saved successfully");
    return res.json({
      status: "success",
      message: "Medicine document saved successfully",
    });
  } catch (error) {
    console.error("Error adding new Medicine document:", error);
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

    // Search for Medicines with the provided StripID
    const mdata = await Medicine.find({ StripID: search });

    if (mdata && mdata.length > 0) {
      return res.json(mdata);
    } else {
      return res.status(404).json({ message: "No data found." });
    }
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Start of http get methods

router.get("/viewMedicines", verifyTokenMiddleware, async (req, res) => {
  try {
    // Find all medicines
    const mdata = await Medicine.find({});

    if (mdata.length > 0) {
      return res.json(mdata);
    } else {
      return res.json("No meds found");
    }
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
