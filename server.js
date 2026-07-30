const express = require("express");
const app = express();
require("dotenv").config();

require("./db");

app.use(express.json());

const userRoutes = require("./routes/userRoutes");


app.use("/user", userRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 VoteVerse API is Running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});