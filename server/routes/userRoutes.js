const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Candidate = require("../models/candidate");

const {
  jwtAuthMiddleware,
  generateToken,
} = require("../jwt");

// =====================================================
// SIGNUP
// =====================================================

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
      party,
    } = req.body;

    // -----------------------------
    // Basic validation
    // -----------------------------

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

    if (Number(age) < 18) {
      return res.status(400).json({
        message: "User must be at least 18 years old",
      });
    }

    if (!/^\d{12}$/.test(String(aadharCardNumber))) {
      return res.status(400).json({
        message: "Aadhar number must contain exactly 12 digits",
      });
    }

    // -----------------------------
    // Only voter/candidate allowed
    // -----------------------------

    const selectedRole =
      role === "candidate"
        ? "candidate"
        : "voter";

    // Candidate must provide party
    if (
      selectedRole === "candidate" &&
      (!party || !party.trim())
    ) {
      return res.status(400).json({
        message:
          "Party name is required when registering as candidate",
      });
    }

    // -----------------------------
    // Check duplicate user
    // -----------------------------

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { mobile },
        { aadharCardNumber },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          "User already exists with these details",
      });
    }

    // -----------------------------
    // Create user
    // -----------------------------

    const newUser = new User({
      name,
      age: Number(age),
      email,
      mobile,
      aadharCardNumber,
      address,
      password,
      role: selectedRole,
    });

    const savedUser = await newUser.save();

    // -----------------------------
    // If candidate, create candidate
    // profile automatically
    // -----------------------------

    if (selectedRole === "candidate") {
      const candidate = new Candidate({
        name: savedUser.name,
        age: savedUser.age,
        party: party.trim(),
        user: savedUser._id,
        voteCount: 0,
      });

      await candidate.save();
    }

    // -----------------------------
    // Generate token
    // -----------------------------

    const token = generateToken({
      id: savedUser._id,
      role: savedUser.role,
    });

    // -----------------------------
    // Response
    // -----------------------------

    res.status(201).json({
      message: "Account created successfully",

      token,

      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        isVoted: savedUser.isVoted,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message:
        error.message || "Signup failed",
    });
  }
});

// =====================================================
// LOGIN
// =====================================================

router.post("/login", async (req, res) => {
  try {
    const {
      aadharCardNumber,
      password,
    } = req.body;

    if (!aadharCardNumber || !password) {
      return res.status(400).json({
        error:
          "Aadhar number and password are required",
      });
    }

    const user = await User.findOne({
      aadharCardNumber,
    });

    if (
      !user ||
      !(await user.comparePassword(password))
    ) {
      return res.status(400).json({
        error:
          "Invalid Aadhar number or password",
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
        isVoted: user.isVoted,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "An error occurred while login",
    });
  }
});

// =====================================================
// PROFILE
// =====================================================

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
      console.error(
        "Profile error:",
        error
      );

      res.status(500).json({
        message: "Failed to fetch profile",
      });
    }
  }
);

// =====================================================
// CHANGE PASSWORD
// =====================================================

router.put(
  "/profile/password",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message:
            "Current and new password are required",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          message:
            "New password must contain at least 6 characters",
        });
      }

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
          message:
            "Current password is incorrect",
        });
      }

      user.password = newPassword;

      await user.save();

      res.status(200).json({
        message:
          "Password updated successfully",
      });
    } catch (error) {
      console.error(
        "Password update error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to update password",
      });
    }
  }
);

module.exports = router;