const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const routes = require("./routes");
app.use("/", routes);

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
