import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyCandidateProfile,
} from "../services/candidateService";

import { useAuth } from "../store/AuthContext";

function CandidateDashboard() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [candidate, setCandidate] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role !== "candidate") {
      setLoading(false);
      return;
    }

    loadCandidate();
  }, [user]);

  const loadCandidate = async () => {
    try {
      setLoading(true);

      const response =
        await getMyCandidateProfile();

      setCandidate(
        response?.candidate || null
      );
    } catch (error) {
      console.error(
        "Candidate profile error:",
        error
      );

      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">
          Loading candidate dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">

          <div>
            <p className="font-semibold text-blue-600">
              Candidate Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Welcome, {user?.name}
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your candidate profile.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* USER PROFILE */}

        <div className="mb-8 rounded-3xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            Your Profile
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-4">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-1 font-semibold">
                {user?.name || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-semibold">
                {user?.email || "N/A"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="mt-1 font-semibold capitalize">
                {user?.role || "candidate"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Voting Status
              </p>

              <p className="mt-1 font-semibold text-red-600">
                Candidates Cannot Vote
              </p>
            </div>

          </div>
        </div>

        {/* CANDIDATE PROFILE */}

        {candidate ? (
          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div>

                <p className="font-semibold text-green-600">
                  ✓ Candidate Registered
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {candidate.name}
                </h2>

                <p className="mt-3 text-gray-500">
                  Party: {candidate.party}
                </p>

                <p className="mt-1 text-gray-500">
                  Age: {candidate.age}
                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 px-8 py-5 text-center">

                <p className="text-sm text-gray-500">
                  Votes
                </p>

                <p className="mt-1 text-4xl font-bold text-blue-600">
                  {candidate.voteCount ?? 0}
                </p>

              </div>

            </div>

          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 text-center shadow">

            <h2 className="text-2xl font-bold">
              Candidate profile not found
            </h2>

            <p className="mt-2 text-gray-500">
              Your account is marked as candidate,
              but no candidate record exists for
              this account.
            </p>

            <p className="mt-4 text-sm text-red-500">
              Please register this account as a
              candidate again or create the
              candidate record in MongoDB.
            </p>

          </div>
        )}

        {/* VOTING RESTRICTION */}

        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
          Candidates are registered participants
          and cannot cast votes.
        </div>

      </div>
    </div>
  );
}

export default CandidateDashboard;