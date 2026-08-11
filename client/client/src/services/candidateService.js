import axiosInstance from "../api/axiosInstance";


// ============================================
// GET ALL CANDIDATES
// ============================================

export const getCandidates = async () => {

    const response =
        await axiosInstance.get(
            "/candidate"
        );

    return response.data;
};


// ============================================
// GET MY CANDIDATE PROFILE
// ============================================

export const getMyCandidateProfile =
    async () => {

        const response =
            await axiosInstance.get(
                "/candidate/my-profile"
            );

        return response.data;
    };


// ============================================
// REGISTER AS CANDIDATE
// ============================================

export const registerAsCandidate =
    async (candidateData) => {

        const response =
            await axiosInstance.post(
                "/candidate/register",
                candidateData
            );

        return response.data;
    };


// ============================================
// VOTE
// ============================================

export const voteCandidate =
    async (candidateId) => {

        const response =
            await axiosInstance.post(
                `/candidate/${candidateId}/vote`
            );

        return response.data;
    };


// ============================================
// GET VOTE COUNT / RESULTS
// ============================================

export const getVoteCount =
    async () => {

        const response =
            await axiosInstance.get(
                "/candidate/vote/count"
            );

        return response.data;
    };