const express = require("express");
const router = express.Router();

const User = require("../models/user");
const {
  jwtAuthMiddleware,
  generateToken,
} = require("../jwt");


// ===============================
// SIGNUP
// ===============================
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      age,
      email,
      mobile,
      aadharCardNumber,
      address,
      password,
      role,
    } = req.body;


    if (
      !name ||
      !age ||
      !email ||
      !mobile ||
      !aadharCardNumber ||
      !address ||
      !password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    if (String(aadharCardNumber).length !== 12) {
      return res.status(400).json({
        message: "Aadhar number must contain 12 digits",
      });
    }


    const existingUser = await User.findOne({
      $or: [
        { email },
        { mobile },
        { aadharCardNumber },
      ],
    });


    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with these details",
      });
    }


    const newUser = new User({
      name,
      age,
      email,
      mobile,
      aadharCardNumber,
      address,
      password,
      role: role || "voter",
    });


    const savedUser = await newUser.save();


    const token = generateToken({
      id: savedUser._id,
      role: savedUser.role,
    });


    res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });

  } catch (error) {

    console.error("Signup error:", error);

    res.status(500).json({
      message: error.message || "Signup failed",
    });
  }
});


// ===============================
// LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {

    const {
      aadharCardNumber,
      password,
    } = req.body;


    if (!aadharCardNumber || !password) {
      return res.status(400).json({
        message: "Aadhar number and password are required",
      });
    }


    const user = await User.findOne({
      aadharCardNumber,
    });


    if (!user) {
      return res.status(401).json({
        message: "Invalid Aadhar number or password",
      });
    }


    const passwordMatch =
      await user.comparePassword(password);


    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid Aadhar number or password",
      });
    }


    const token = generateToken({
      id: user._id,
      role: user.role,
    });


    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.error("Login error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});


// ===============================
// PROFILE
// ===============================
router.get(
  "/profile",
  jwtAuthMiddleware,
  async (req, res) => {

    try {

      const user = await User.findById(
        req.user.id
      ).select("-password");


      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }


      res.status(200).json({
        user,
      });

    } catch (error) {

      console.error("Profile error:", error);

      res.status(500).json({
        message: "Failed to fetch profile",
      });
    }
  }
);


// ===============================
// CHANGE PASSWORD
// ===============================
router.put(
  "/profile/password",
  jwtAuthMiddleware,
  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;


      const user = await User.findById(
        req.user.id
      );


      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }


      const valid =
        await user.comparePassword(
          currentPassword
        );


      if (!valid) {
        return res.status(400).json({
          message: "Current password is incorrect",
        });
      }


      user.password = newPassword;

      await user.save();


      res.status(200).json({
        message: "Password updated successfully",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: "Failed to update password",
      });
    }
  }
);


module.exports = router;