import axiosInstance from "../api/axiosInstance";

export const getCandidates = async () => {
  const response = await axiosInstance.get("/candidate");
  return response.data;
};

export const getMyCandidateProfile = async () => {
  const response = await axiosInstance.get("/candidate/my-profile");
  return response.data;
};

export const registerAsCandidate = async (candidateData) => {
  const response = await axiosInstance.post(
    "/candidate/register",
    candidateData
  );

  return response.data;
};

export const voteCandidate = async (id) => {
  const response = await axiosInstance.post(
    `/candidate/${id}/vote`
  );

  return response.data;
};

export const getVoteCount = async () => {
  const response = await axiosInstance.get(
    "/candidate/vote/count"
  );

  return response.data;
};