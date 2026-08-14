const mongoose = require("mongoose");

const electionParticipantSchema = new mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      enum: ["organizer", "voter", "candidate"],
      default: "voter",
    },

    hasVoted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

electionParticipantSchema.index(
  { election: 1, user: 1 },
  { unique: true }
);

module.exports =
  mongoose.models.ElectionParticipant ||
  mongoose.model(
    "ElectionParticipant",
    electionParticipantSchema
  );