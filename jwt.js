const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  console.log("Headers:", req.headers);

  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      error: "No token",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "invalid token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  jwtAuthMiddleware,
  generateToken,
};
