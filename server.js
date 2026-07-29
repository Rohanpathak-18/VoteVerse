const express = require("express");
const app = express();

// const dotenv = require("dotenv");

const bodyParser = require("body-parser");
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
