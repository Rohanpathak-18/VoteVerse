import axiosInstance from "../api/axiosInstance";

// =====================================================
// GET ALL CANDIDATES
// =====================================================

export const getCandidates = async () => {
  const response =
    await axiosInstance.get(
      "/candidate"
    );

  return response.data;
};

// =====================================================
// GET MY CANDIDATE PROFILE
// =====================================================

export const getMyCandidateProfile =
  async () => {
    const response =
      await axiosInstance.get(
        "/candidate/my-profile"
      );

    return response.data;
  };

// =====================================================
// REGISTER AS CANDIDATE
// =====================================================

export const registerAsCandidate =
  async (candidateData) => {
    const response =
      await axiosInstance.post(
        "/candidate/register",
        candidateData
      );

    return response.data;
  };

// =====================================================
// VOTE
// =====================================================

export const voteCandidate =
  async (id) => {
    const response =
      await axiosInstance.post(
        `/candidate/${id}/vote`
      );

    return response.data;
  };

// =====================================================
// RESULTS
// =====================================================

export const getVoteCount =
  async () => {
    const response =
      await axiosInstance.get(
        "/candidate/vote/count"
      );

    return response.data;
  };

// =====================================================
// ADMIN ADD
// =====================================================

export const addCandidate =
  async (candidateData) => {
    const response =
      await axiosInstance.post(
        "/candidate",
        candidateData
      );

    return response.data;
  };

// =====================================================
// ADMIN UPDATE
// =====================================================

export const updateCandidate =
  async (id, candidateData) => {
    const response =
      await axiosInstance.put(
        `/candidate/${id}`,
        candidateData
      );

    return response.data;
  };

// =====================================================
// ADMIN DELETE
// =====================================================

export const deleteCandidate =
  async (id) => {
    const response =
      await axiosInstance.delete(
        `/candidate/${id}`
      );

    return response.data;
  };