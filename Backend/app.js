const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require("./routes");
app.use("/", routes);

// const { connectToDb } = require("./Database/index.js");
// const Medicine = require("./Database/Schema/MedicineSchema.js");
const path = require("path");
const { connectToDb } = require(path.join(__dirname, "Database", "index.js"));
// const Medicine = require(path.join(__dirname, 'Database', 'Schema', 'MedicineSchema.js'));

// app.post("/addMedicine", async (req, res) => {
//   const {
//     MedicineName,
//     StripID,
//     Conditions,
//     Quantity,
//     Ingredients,
//     SideEffects,
//     ExpiryDate,
//     ManufactureDate,
//     BatchNumber,
//     Price,
//   } = req.body;
//   const address = "0x0000000";
//   console.log(req.body);
//   const status = "Ideal";
//   const Condition = Conditions.split(",");
//   const temp = Condition[0].split("-");
//   const humi = Condition[1].split("-");
//   try {
//     const newMedicine = new Medicine({
//       MedicineName: MedicineName,
//       StripID: StripID,
//       mintemp: temp[0],
//       maxtemp: temp[1],
//       minhumi: humi[0],
//       maxhumi: humi[1],
//       Quantity: Quantity,
//       Ingredients: Ingredients,
//       SideEffects: SideEffects,
//       ExpiryDate: ExpiryDate,
//       ManufactureDate: ManufactureDate,
//       BatchNumber: BatchNumber,
//       Price: Price,
//       status: status,
//       address: address,
//     });
//     await newMedicine.save();
//     console.log("Medicine document saved successfully");
//   } catch (error) {
//     console.error("Error adding new Medicine document:", error);
//   }
// });

async function startServer() {
  await connectToDb();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
