const express = require("express");
const app = express();
const db = require("./db");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());


const userRoutes = require("./routes/userRoutes");
app.use("/user" , userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
