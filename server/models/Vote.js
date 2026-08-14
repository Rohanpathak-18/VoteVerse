const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },

    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

voteSchema.index(
  { election: 1, voter: 1 },
  { unique: true }
);

module.exports =
  mongoose.models.Vote ||
  mongoose.model("Vote", voteSchema);