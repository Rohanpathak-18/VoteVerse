const jwt = require("jsonwebtoken");

const generateToken = (userData) => {
  return jwt.sign(
    userData,
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


const jwtAuthMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        error: "Token not provided",
      });
    }

    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : authorization;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};


module.exports = {
  generateToken,
  jwtAuthMiddleware,
};