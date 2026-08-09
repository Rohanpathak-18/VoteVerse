const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 VoteVerse API is Running",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
  }
};

startServer();