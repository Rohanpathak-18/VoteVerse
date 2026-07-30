const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URL_LOCAL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err.message);
  });

module.exports = mongoose;