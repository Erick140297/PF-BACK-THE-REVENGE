const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);

const db = () => {
  mongoose.connect(process.env.URL);
  console.log("Connected to MongoDB");
};

module.exports = db;
