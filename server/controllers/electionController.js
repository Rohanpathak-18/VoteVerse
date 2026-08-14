const bcrypt = require("bcrypt");

const Election = require("../models/Election");
const ElectionParticipant = require("../models/ElectionParticipant");
const Vote = require("../models/Vote");
const User = require("../models/user");


// =====================================================
// GENERATE UNIQUE ELECTION CODE
// =====================================================

const generateElectionCode = async () => {
  let code;
  let exists = true;

  while (exists) {
    code =
      "VV-" +
      Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase();

    exists = await Election.exists({ code });
  }

  return code;
};


// =====================================================
// CREATE ELECTION
// =====================================================

const createElection = async (req, res) => {
  try {
    const {
      name,
      className,
      description,
      password,
      startDate,
      endDate,
    } = req.body;

    if (!name || !className || !password) {
      return res.status(400).json({
        message:
          "Election name, class name and password are required",
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        message:
          "Election password must contain at least 4 characters",
      });
    }

    const code = await generateElectionCode();

    const passwordHash =
      await bcrypt.hash(password, 10);

    const election = await Election.create({
      name: name.trim(),
      className: className.trim(),
      description: description?.trim() || "",
      code,
      passwordHash,
      createdBy: req.user.id,
      startDate: startDate || null,
      endDate: endDate || null,
      status: "active",
    });

    await ElectionParticipant.create({
      election: election._id,
      user: req.user.id,
      role: "organizer",
    });

    res.status(201).json({
      message: "Private election created successfully",
      election: {
        id: election._id,
        name: election.name,
        className: election.className,
        description: election.description,
        code: election.code,
        status: election.status,
        startDate: election.startDate,
        endDate: election.endDate,
      },
    });
  } catch (error) {
    console.error("CREATE ELECTION ERROR:", error);

    res.status(500).json({
      message:
        error.message || "Failed to create election",
    });
  }
};


// =====================================================
// GET MY ELECTIONS
// =====================================================

const getMyElections = async (req, res) => {
  try {
    const participants =
      await ElectionParticipant.find({
        user: req.user.id,
      }).populate({
        path: "election",
        populate: {
          path: "createdBy",
          select: "name email",
        },
      });

    const elections = participants
      .filter((item) => item.election)
      .map((item) => ({
        id: item.election._id,
        name: item.election.name,
        className: item.election.className,
        description: item.election.description,
        code: item.election.code,
        status: item.election.status,
        role: item.role,
        hasVoted: item.hasVoted,
        startDate: item.election.startDate,
        endDate: item.election.endDate,
        createdBy: item.election.createdBy,
      }));

    res.status(200).json(elections);
  } catch (error) {
    console.error("GET MY ELECTIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch elections",
    });
  }
};


// =====================================================
// JOIN ELECTION
// =====================================================

const joinElection = async (req, res) => {
  try {
    const { code, password } = req.body;

    if (!code || !password) {
      return res.status(400).json({
        message:
          "Election code and password are required",
      });
    }

    const election = await Election.findOne({
      code: code.trim().toUpperCase(),
    });

    if (!election) {
      return res.status(404).json({
        message: "Election not found",
      });
    }

    if (election.status === "completed") {
      return res.status(400).json({
        message: "This election has already ended",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        election.passwordHash
      );

    if (!validPassword) {
      return res.status(401).json({
        message: "Incorrect election password",
      });
    }

    const existing =
      await ElectionParticipant.findOne({
        election: election._id,
        user: req.user.id,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "You have already joined this election",
      });
    }

    await ElectionParticipant.create({
      election: election._id,
      user: req.user.id,
      role: "voter",
    });

    res.status(200).json({
      message: "Joined election successfully",
      electionId: election._id,
    });
  } catch (error) {
    console.error("JOIN ELECTION ERROR:", error);

    res.status(500).json({
      message: "Failed to join election",
    });
  }
};


// =====================================================
// GET ELECTION DETAILS
// =====================================================

const getElectionDetails = async (req, res) => {
  try {
    const election = req.election;
    const participant = req.participant;

    const candidates =
      await ElectionParticipant.find({
        election: election._id,
        role: "candidate",
      }).populate(
        "user",
        "name email age"
      );

    const response = {
      election: {
        id: election._id,
        name: election.name,
        className: election.className,
        description: election.description,
        code: election.code,
        status: election.status,
        startDate: election.startDate,
        endDate: election.endDate,
      },

      myRole: participant.role,
      hasVoted: participant.hasVoted,

      candidates: candidates.map((item) => ({
        participantId: item._id,
        userId: item.user._id,
        name: item.user.name,
        email: item.user.email,
        age: item.user.age,
      })),
    };

    if (participant.role === "organizer") {
      const participants =
        await ElectionParticipant.find({
          election: election._id,
        }).populate(
          "user",
          "name email age role"
        );

      response.participants =
        participants.map((item) => ({
          participantId: item._id,
          userId: item.user._id,
          name: item.user.name,
          email: item.user.email,
          age: item.user.age,
          role: item.role,
          hasVoted: item.hasVoted,
        }));
    }

    res.status(200).json(response);
  } catch (error) {
    console.error(
      "GET ELECTION DETAILS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch election details",
    });
  }
};


// =====================================================
// CHANGE PARTICIPANT ROLE
// =====================================================

const updateParticipantRole = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["voter", "candidate"].includes(role)) {
      return res.status(400).json({
        message:
          "Role must be either voter or candidate",
      });
    }

    if (userId === req.user.id) {
      return res.status(400).json({
        message:
          "Organizer cannot change their own role",
      });
    }

    const participant =
      await ElectionParticipant.findOne({
        election: req.election._id,
        user: userId,
      });

    if (!participant) {
      return res.status(404).json({
        message:
          "User is not a participant in this election",
      });
    }

    participant.role = role;

    if (role === "candidate") {
      participant.hasVoted = false;
    }

    await participant.save();

    const user = await User.findById(userId);

    res.status(200).json({
      message: `Participant changed to ${role}`,
      participant: {
        userId: user._id,
        name: user.name,
        role: participant.role,
        hasVoted: participant.hasVoted,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE PARTICIPANT ROLE ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update participant role",
    });
  }
};


// =====================================================
// CAST PRIVATE ELECTION VOTE
// =====================================================

const castVote = async (req, res) => {
  try {
    const { candidateId } = req.body;

    if (!candidateId) {
      return res.status(400).json({
        message: "Candidate is required",
      });
    }

    if (req.election.status === "completed") {
      return res.status(400).json({
        message: "This election has ended",
      });
    }

    if (req.participant.hasVoted) {
      return res.status(400).json({
        message:
          "You have already voted in this election",
      });
    }

    const candidate =
      await ElectionParticipant.findOne({
        election: req.election._id,
        user: candidateId,
        role: "candidate",
      });

    if (!candidate) {
      return res.status(404).json({
        message:
          "Candidate does not belong to this election",
      });
    }

    if (candidateId === req.user.id) {
      return res.status(400).json({
        message:
          "You cannot vote for yourself",
      });
    }

    await Vote.create({
      election: req.election._id,
      voter: req.user.id,
      candidate: candidateId,
    });

    req.participant.hasVoted = true;

    await req.participant.save();

    res.status(200).json({
      message: "Vote cast successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "You have already voted in this election",
      });
    }

    console.error("PRIVATE VOTE ERROR:", error);

    res.status(500).json({
      message: "Failed to cast vote",
    });
  }
};


// =====================================================
// RESULTS
// =====================================================

const getResults = async (req, res) => {
  try {
    const candidates =
      await ElectionParticipant.find({
        election: req.election._id,
        role: "candidate",
      }).populate(
        "user",
        "name email age"
      );

    const results = await Promise.all(
      candidates.map(async (candidate) => {
        const votes =
          await Vote.countDocuments({
            election: req.election._id,
            candidate: candidate.user._id,
          });

        return {
          userId: candidate.user._id,
          name: candidate.user.name,
          age: candidate.user.age,
          votes,
        };
      })
    );

    results.sort((a, b) => b.votes - a.votes);

    res.status(200).json(results);
  } catch (error) {
    console.error("PRIVATE RESULTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch results",
    });
  }
};


// =====================================================
// COMPLETE ELECTION
// =====================================================

const completeElection = async (req, res) => {
  try {
    req.election.status = "completed";

    await req.election.save();

    res.status(200).json({
      message: "Election completed successfully",
    });
  } catch (error) {
    console.error(
      "COMPLETE ELECTION ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to complete election",
    });
  }
};


module.exports = {
  createElection,
  getMyElections,
  joinElection,
  getElectionDetails,
  updateParticipantRole,
  castVote,
  getResults,
  completeElection,
};