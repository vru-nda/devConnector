const mongoose = require("mongoose");
const config = require("config");

const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error(error.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
