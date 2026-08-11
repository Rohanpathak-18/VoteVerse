const express = require("express");
const router = express.Router();

const Candidate = require("../models/Candidate");
const User = require("../models/User");

const { jwtAuthMiddleware } = require("../jwt");

// =====================================================
// GET ALL CANDIDATES
// PUBLIC
// =====================================================

router.get("/", async (req, res) => {
    try {
        const candidates = await Candidate.find()
            .populate("user", "name email role")
            .sort({ voteCount: -1 });

        res.status(200).json(candidates);

    } catch (error) {
        console.error("Error fetching candidates:", error);

        res.status(500).json({
            error: "Failed to fetch candidates",
        });
    }
});


// =====================================================
// GET MY CANDIDATE PROFILE
// PROTECTED
// =====================================================

router.get(
    "/my-profile",
    jwtAuthMiddleware,
    async (req, res) => {
        try {

            const userId = req.user.id;

            const candidate = await Candidate.findOne({
                user: userId,
            }).populate("user", "name email role");

            if (!candidate) {
                return res.status(404).json({
                    message: "Candidate profile not found",
                });
            }

            res.status(200).json({
                candidate,
            });

        } catch (error) {

            console.error(
                "Candidate profile error:",
                error
            );

            res.status(500).json({
                error: "Failed to fetch candidate profile",
            });
        }
    }
);


// =====================================================
// REGISTER AS CANDIDATE
// PROTECTED
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

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }


            // Admin cannot become candidate
            if (user.role === "admin") {
                return res.status(403).json({
                    message:
                        "Admin cannot register as candidate",
                });
            }


            // Check if already registered
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


            // Create candidate
            const candidate = new Candidate({
                name: user.name,
                age: user.age,
                party: party.trim(),
                user: user._id,
                voteCount: 0,
            });

            await candidate.save();


            // Change voter to candidate
            user.role = "candidate";

            await user.save();


            res.status(201).json({
                message:
                    "Candidate registered successfully",

                candidate,
            });

        } catch (error) {

            console.error(
                "Candidate registration error:",
                error
            );

            res.status(500).json({
                error:
                    "Failed to register as candidate",
            });
        }
    }
);


// =====================================================
// GET SINGLE CANDIDATE
// PUBLIC
// =====================================================

router.get("/:id", async (req, res) => {

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
                message: "Candidate not found",
            });
        }

        res.status(200).json(candidate);

    } catch (error) {

        console.error(
            "Error fetching candidate:",
            error
        );

        res.status(500).json({
            error:
                "Failed to fetch candidate",
        });
    }
});


// =====================================================
// VOTE
// PROTECTED
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


            // Only voter
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


            // Increase vote
            candidate.voteCount += 1;

            await candidate.save();


            // Mark user as voted
            user.isVoted = true;

            await user.save();


            res.status(200).json({
                message:
                    "Vote cast successfully",
            });

        } catch (error) {

            console.error(
                "Voting error:",
                error
            );

            res.status(500).json({
                error:
                    "Failed to cast vote",
            });
        }
    }
);


// =====================================================
// RESULTS
// PUBLIC
// =====================================================

router.get(
    "/vote/count",
    async (req, res) => {

        try {

            const candidates =
                await Candidate.find()
                    .select(
                        "name party voteCount"
                    )
                    .sort({
                        voteCount: -1,
                    });

            res.status(200).json(
                candidates
            );

        } catch (error) {

            console.error(
                "Results error:",
                error
            );

            res.status(500).json({
                error:
                    "Failed to fetch results",
            });
        }
    }
);


module.exports = router;