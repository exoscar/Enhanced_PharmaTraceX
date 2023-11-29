// routes/index.js
const express = require("express");
const authRoutes = require("./authRoutes");
const truckRoutes = require("./truckRoutes");
const medicineRoutes = require("./medicineRoutes");

const router = express.Router();

// Use the route modules
router.use("/auth", authRoutes);
router.use("/trucks", truckRoutes);
router.use("/medicines", medicineRoutes);

module.exports = router;
