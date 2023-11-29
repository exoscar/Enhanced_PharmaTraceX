const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

async function connectToDb() {
  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log("Connected to MongoDB using Mongoose");
    return mongoose.connection.db;
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
    throw error;
  }
}

module.exports = { connectToDb };
