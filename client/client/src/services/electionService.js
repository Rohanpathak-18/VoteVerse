import axiosInstance from "../api/axiosInstance";


// =====================================================
// CREATE ELECTION
// =====================================================

export const createElection = async (electionData) => {
  const response = await axiosInstance.post(
    "/elections/create",
    electionData
  );

  return response.data;
};


// =====================================================
// GET MY ELECTIONS
// =====================================================

export const getMyElections = async () => {
  const response = await axiosInstance.get(
    "/elections/my"
  );

  return response.data;
};


// =====================================================
// JOIN ELECTION
// =====================================================

export const joinElection = async (
  code,
  password
) => {
  const response = await axiosInstance.post(
    "/elections/join",
    {
      code,
      password,
    }
  );

  return response.data;
};


// =====================================================
// GET ELECTION DETAILS
// =====================================================

export const getElectionDetails = async (id) => {
  const response = await axiosInstance.get(
    `/elections/${id}`
  );

  return response.data;
};


// =====================================================
// CHANGE PARTICIPANT ROLE
// =====================================================

export const updateParticipantRole = async (
  electionId,
  userId,
  role
) => {
  const response = await axiosInstance.put(
    `/elections/${electionId}/participants/${userId}/role`,
    {
      role,
    }
  );

  return response.data;
};


// =====================================================
// VOTE
// =====================================================

export const voteInElection = async (
  electionId,
  candidateId
) => {
  const response = await axiosInstance.post(
    `/elections/${electionId}/vote`,
    {
      candidateId,
    }
  );

  return response.data;
};


// =====================================================
// RESULTS
// =====================================================

export const getElectionResults = async (
  electionId
) => {
  const response = await axiosInstance.get(
    `/elections/${electionId}/results`
  );

  return response.data;
};


// =====================================================
// COMPLETE ELECTION
// =====================================================

export const completeElection = async (
  electionId
) => {
  const response = await axiosInstance.put(
    `/elections/${electionId}/complete`
  );

  return response.data;
};