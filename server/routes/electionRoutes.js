const express = require("express");

const router = express.Router();

const {
  jwtAuthMiddleware,
} = require("../jwt");

const {
  electionAuth,
  organizerOnly,
  voterOnly,
} = require("../middleware/electionAuth");

const {
  createElection,
  getMyElections,
  joinElection,
  getElectionDetails,
  updateParticipantRole,
  castVote,
  getResults,
  completeElection,
} = require("../controllers/electionController");


// =====================================================
// CREATE PRIVATE ELECTION
// =====================================================

router.post(
  "/create",
  jwtAuthMiddleware,
  createElection
);


// =====================================================
// MY ELECTIONS
// =====================================================

router.get(
  "/my",
  jwtAuthMiddleware,
  getMyElections
);


// =====================================================
// JOIN ELECTION
// =====================================================

router.post(
  "/join",
  jwtAuthMiddleware,
  joinElection
);


// =====================================================
// ELECTION DETAILS
// =====================================================

router.get(
  "/:id",
  jwtAuthMiddleware,
  electionAuth,
  getElectionDetails
);


// =====================================================
// CHANGE PARTICIPANT ROLE
// =====================================================

router.put(
  "/:id/participants/:userId/role",
  jwtAuthMiddleware,
  electionAuth,
  organizerOnly,
  updateParticipantRole
);


// =====================================================
// VOTE
// =====================================================

router.post(
  "/:id/vote",
  jwtAuthMiddleware,
  electionAuth,
  voterOnly,
  castVote
);


// =====================================================
// RESULTS
// =====================================================

router.get(
  "/:id/results",
  jwtAuthMiddleware,
  electionAuth,
  getResults
);


// =====================================================
// COMPLETE ELECTION
// =====================================================

router.put(
  "/:id/complete",
  jwtAuthMiddleware,
  electionAuth,
  organizerOnly,
  completeElection
);


module.exports = router;