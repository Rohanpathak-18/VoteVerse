const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");
const User = require("../models/User");
const { jwtAuthMiddleware } = require("../jwt")

const checkAdminRole = async (userId) => {
  const user = await User.findById(userId);

  return user && user.role === "admin";
};

// GET ALL CANDIDATES
router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({
      voteCount: -1,
    });

    res.status(200).json({
      candidates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch candidates",
    });
  }
});

// ADD CANDIDATE - ADMIN
router.post("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const isAdmin = await checkAdminRole(req.user.id);

    if (!isAdmin) {
      return res.status(403).json({
        error: "Admin access required",
      });
    }

    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      message: "Candidate created successfully",
      candidate,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create candidate",
    });
  }
});

// UPDATE CANDIDATE - ADMIN
router.put(
  "/:candidateID",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const isAdmin = await checkAdminRole(req.user.id);

      if (!isAdmin) {
        return res.status(403).json({
          error: "Admin access required",
        });
      }

      const candidate = await Candidate.findByIdAndUpdate(
        req.params.candidateID,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!candidate) {
        return res.status(404).json({
          error: "Candidate not found",
        });
      }

      res.status(200).json({
        message: "Candidate updated successfully",
        candidate,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to update candidate",
      });
    }
  }
);

// DELETE CANDIDATE - ADMIN
router.delete(
  "/:candidateID",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const isAdmin = await checkAdminRole(req.user.id);

      if (!isAdmin) {
        return res.status(403).json({
          error: "Admin access required",
        });
      }

      const candidate =
        await Candidate.findByIdAndDelete(
          req.params.candidateID
        );

      if (!candidate) {
        return res.status(404).json({
          error: "Candidate not found",
        });
      }

      res.status(200).json({
        message: "Candidate deleted successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "Failed to delete candidate",
      });
    }
  }
);

// VOTE
router.post(
  "/vote/:candidateID",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      if (user.role === "admin") {
        return res.status(403).json({
          error: "Admin cannot vote",
        });
      }

      if (user.isVoted) {
        return res.status(400).json({
          error: "You have already voted",
        });
      }

      const candidate = await Candidate.findById(
        req.params.candidateID
      );

      if (!candidate) {
        return res.status(404).json({
          error: "Candidate not found",
        });
      }

      candidate.votes.push({
        user: user._id,
      });

      candidate.voteCount += 1;

      await candidate.save();

      user.isVoted = true;

      await user.save();

      res.status(200).json({
        message: "Vote recorded successfully",
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error: "An error occurred while voting",
      });
    }
  }
);

// VOTE COUNT
router.get("/vote/count", async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({
      voteCount: -1,
    });

    res.status(200).json({
      candidates,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch vote count",
    });
  }
});

module.exports = router;