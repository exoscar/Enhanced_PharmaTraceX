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

async function startServer() {
  await connectToDb();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
