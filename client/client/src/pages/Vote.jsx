// src/pages/Vote.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCandidates,
  voteCandidate,
} from "../services/candidateService";

import { useAuth } from "../store/AuthContext";

function Vote() {
  const {
    user,
    updateUser,
  } = useAuth();

  const navigate = useNavigate();

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [votingId, setVotingId] =
    useState(null);

  useEffect(() => {
    if (user?.role !== "voter") {
      setLoading(false);
      return;
    }

    loadCandidates();
  }, [user]);

  const loadCandidates = async () => {
    try {
      setLoading(true);

      const data =
        await getCandidates();

      setCandidates(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Candidates error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to load candidates."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    if (user?.role !== "voter") {
      alert(
        "Only voters are allowed to vote."
      );
      return;
    }

    if (user?.isVoted) {
      alert(
        "You have already voted."
      );
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to vote for this candidate?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setVotingId(candidateId);

      await voteCandidate(candidateId);

      const updatedUser = {
        ...user,
        isVoted: true,
      };

      updateUser(updatedUser);

      alert(
        "Vote cast successfully!"
      );

      navigate("/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error(
        "Voting error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Unable to cast vote."
      );
    } finally {
      setVotingId(null);
    }
  };

  if (user?.role !== "voter") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">

        <div className="max-w-lg rounded-3xl bg-white p-10 text-center shadow">

          <h1 className="text-3xl font-bold text-gray-900">
            Voting Not Available
          </h1>

          <p className="mt-4 text-gray-500">
            Only registered voters can cast a vote.
          </p>

          {user?.role === "candidate" && (
            <p className="mt-2 font-semibold text-red-600">
              Candidates cannot vote.
            </p>
          )}

          {user?.role === "admin" && (
            <p className="mt-2 font-semibold text-red-600">
              Administrators cannot vote.
            </p>
          )}

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Go Home
          </button>

        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading candidates...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold">
            Cast Your Vote
          </h1>

          <p className="mt-3 text-gray-500">
            Choose one candidate and cast your vote securely.
          </p>

        </div>

        {user?.isVoted && (
          <div className="mb-8 rounded-xl border border-green-300 bg-green-100 p-5 text-center text-green-700">
            You have already voted in this election.
          </div>
        )}

        {candidates.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <h2 className="text-xl font-semibold">
              No candidates available
            </h2>

            <p className="mt-2 text-gray-500">
              Candidates will appear here once registered.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">

            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >

                <div className="flex h-52 items-center justify-center bg-blue-100">
                  <span className="text-6xl">
                    👤
                  </span>
                </div>

                <div className="p-6">

                  <h2 className="text-2xl font-bold">
                    {candidate.name}
                  </h2>

                  <p className="mt-2 text-gray-500">
                    Party: {candidate.party}
                  </p>

                  <p className="mt-1 text-gray-500">
                    Age: {candidate.age}
                  </p>

                  <button
                    disabled={
                      user.isVoted ||
                      votingId !== null
                    }
                    onClick={() =>
                      handleVote(candidate._id)
                    }
                    className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {user.isVoted
                      ? "Already Voted"
                      : votingId === candidate._id
                        ? "Processing..."
                        : "Vote Now"}
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Vote;