const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");
const User = require("../models/User");

const { jwtAuthMiddleware } = require("../jwt");

// =====================================================
// GET ALL CANDIDATES
// =====================================================

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate("user", "name email role")
      .sort({ voteCount: -1 });

    res.status(200).json(candidates);
  } catch (error) {
    console.error("GET CANDIDATES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch candidates",
    });
  }
});

// =====================================================
// GET MY CANDIDATE PROFILE
// IMPORTANT: MUST COME BEFORE /:id
// =====================================================

router.get(
  "/my-profile",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      console.log(
        "MY PROFILE USER ID:",
        req.user.id
      );

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const candidate =
        await Candidate.findOne({
          user: user._id,
        });

      if (!candidate) {
        return res.status(404).json({
          message:
            "Candidate profile not found",
        });
      }

      res.status(200).json({
        candidate,
      });
    } catch (error) {
      console.error(
        "MY CANDIDATE PROFILE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch candidate profile",
      });
    }
  }
);

// =====================================================
// REGISTER AS CANDIDATE
// =====================================================

router.post(
  "/register",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const { party } = req.body;

      if (!party || !party.trim()) {
        return res.status(400).json({
          message: "Party name is required",
        });
      }

      const user =
        await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.role === "admin") {
        return res.status(403).json({
          message:
            "Admin cannot register as candidate",
        });
      }

      const existingCandidate =
        await Candidate.findOne({
          user: userId,
        });

      if (existingCandidate) {
        return res.status(400).json({
          message:
            "You are already registered as a candidate",
          candidate: existingCandidate,
        });
      }

      const candidate =
        await Candidate.create({
          name: user.name,
          age: user.age,
          party: party.trim(),
          user: user._id,
          voteCount: 0,
        });

      user.role = "candidate";

      await user.save();

      res.status(201).json({
        message:
          "Candidate registered successfully",
        candidate,
      });
    } catch (error) {
      console.error(
        "CANDIDATE REGISTER ERROR:",
        error
      );

      res.status(500).json({
        message:
          error.message ||
          "Failed to register candidate",
      });
    }
  }
);

// =====================================================
// RESULTS
// IMPORTANT: MUST COME BEFORE /:id
// =====================================================

router.get(
  "/vote/count",
  async (req, res) => {
    try {
      const candidates =
        await Candidate.find()
          .select(
            "name age party voteCount"
          )
          .sort({
            voteCount: -1,
          });

      res.status(200).json(candidates);
    } catch (error) {
      console.error(
        "RESULTS ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch results",
      });
    }
  }
);

// =====================================================
// VOTE
// =====================================================

router.post(
  "/:id/vote",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const userId = req.user.id;

      const user =
        await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Candidate cannot vote
      if (user.role === "candidate") {
        return res.status(403).json({
          message:
            "Candidates are not allowed to vote",
        });
      }

      // Admin cannot vote
      if (user.role === "admin") {
        return res.status(403).json({
          message:
            "Admin is not allowed to vote",
        });
      }

      // Only voters
      if (user.role !== "voter") {
        return res.status(403).json({
          message:
            "Only voters can vote",
        });
      }

      // Already voted
      if (user.isVoted) {
        return res.status(400).json({
          message:
            "You have already voted",
        });
      }

      const candidate =
        await Candidate.findById(
          req.params.id
        );

      if (!candidate) {
        return res.status(404).json({
          message:
            "Candidate not found",
        });
      }

      candidate.voteCount += 1;

      await candidate.save();

      user.isVoted = true;

      await user.save();

      res.status(200).json({
        message:
          "Vote cast successfully",
      });
    } catch (error) {
      console.error(
        "VOTING ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to cast vote",
      });
    }
  }
);

// =====================================================
// GET SINGLE CANDIDATE
// MUST COME AFTER SPECIAL ROUTES
// =====================================================

router.get(
  "/:id",
  async (req, res) => {
    try {
      const candidate =
        await Candidate.findById(
          req.params.id
        ).populate(
          "user",
          "name email role"
        );

      if (!candidate) {
        return res.status(404).json({
          message:
            "Candidate not found",
        });
      }

      res.status(200).json(candidate);
    } catch (error) {
      console.error(
        "GET SINGLE CANDIDATE ERROR:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch candidate",
      });
    }
  }
);

module.exports = router;