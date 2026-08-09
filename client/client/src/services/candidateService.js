import axiosInstance from "../api/axiosInstance";

export const getCandidates = async () => {
  const response = await axiosInstance.get(
    "/candidate"
  );

  return response.data;
};

export const voteCandidate = async (candidateID) => {
  const response = await axiosInstance.post(
    `/candidate/vote/${candidateID}`
  );

  return response.data;
};

export const getResults = async () => {
  const response = await axiosInstance.get(
    "/candidate/vote/count"
  );

  return response.data;
};

export const createCandidate = async (data) => {
  const response = await axiosInstance.post(
    "/candidate",
    data
  );

  return response.data;
};

export const updateCandidate = async (
  candidateID,
  data
) => {
  const response = await axiosInstance.put(
    `/candidate/${candidateID}`,
    data
  );

  return response.data;
};

export const deleteCandidate = async (
  candidateID
) => {
  const response = await axiosInstance.delete(
    `/candidate/${candidateID}`
  );

  return response.data;
};