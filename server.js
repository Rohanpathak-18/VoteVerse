const express = require("express");
const app = express();
require("dotenv").config();
require("./db");

app.use(express.json());

const bodyParser = require('body-parser')
app.use(bodyParser.json());


const userRoutes = require("./routes/userRoutes");
const  candidateRoutes = require("./routes/candidateRoutes");


app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);


const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("🚀 VoteVerse API is Running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});