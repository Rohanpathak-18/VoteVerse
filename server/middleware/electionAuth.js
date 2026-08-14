const Election = require("../models/Election");
const ElectionParticipant = require("../models/ElectionParticipant");

const electionAuth = async (req, res, next) => {
  try {
    const electionId = req.params.id;

    const election = await Election.findById(electionId);

    if (!election) {
      return res.status(404).json({
        message: "Election not found",
      });
    }

    const participant =
      await ElectionParticipant.findOne({
        election: electionId,
        user: req.user.id,
      });

    if (!participant) {
      return res.status(403).json({
        message:
          "You are not a participant in this election",
      });
    }

    req.election = election;
    req.participant = participant;

    next();
  } catch (error) {
    console.error("ELECTION AUTH ERROR:", error);

    res.status(500).json({
      message: "Failed to verify election access",
    });
  }
};

const organizerOnly = (req, res, next) => {
  if (req.participant.role !== "organizer") {
    return res.status(403).json({
      message:
        "Only the election organizer can perform this action",
    });
  }

  next();
};

const voterOnly = (req, res, next) => {
  if (req.participant.role !== "voter") {
    return res.status(403).json({
      message: "Only voters can perform this action",
    });
  }

  next();
};

module.exports = {
  electionAuth,
  organizerOnly,
  voterOnly,
};