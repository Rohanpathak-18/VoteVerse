const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./db");

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoutes);

// Test
app.get("/", (req, res) => {
  res.send("VoteVerse API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});