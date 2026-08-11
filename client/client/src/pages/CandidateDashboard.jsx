import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyCandidateProfile,
} from "../services/candidateService";

import {
  registerAsCandidate,
} from "../services/candidateService";

import { useAuth } from "../store/AuthContext";

function CandidateDashboard() {
  const {
    user,
    updateUser,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const [candidate, setCandidate] =
    useState(null);

  const [party, setParty] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [registering, setRegistering] =
    useState(false);

  useEffect(() => {
    loadCandidate();
  }, []);

  const loadCandidate = async () => {
    try {
      const response =
        await getMyCandidateProfile();

      setCandidate(
        response.candidate
      );
    } catch (error) {
      // 404 simply means voter hasn't
      // registered as candidate
      if (
        error.response?.status !== 404
      ) {
        console.error(
          "Candidate profile error:",
          error
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!party.trim()) {
      alert(
        "Please enter party name."
      );
      return;
    }

    try {
      setRegistering(true);

      const response =
        await registerAsCandidate({
          party: party.trim(),
        });

      setCandidate(
        response.candidate
      );

      // Update role locally
      const updatedUser = {
        ...user,
        role: "candidate",
      };

      updateUser(updatedUser);

      alert(
        "You are now registered as a candidate!"
      );

      navigate(
        "/candidate-dashboard"
      );
    } catch (error) {
      console.error(
        "Candidate registration error:",
        error
      );

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Candidate registration failed"
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading candidate dashboard...
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
            onClick={logout}
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

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Name
              </p>

              <p className="mt-1 font-semibold">
                {user?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="mt-1 font-semibold">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="mt-1 font-semibold capitalize">
                {user?.role}
              </p>
            </div>

          </div>
        </div>

        {/* REGISTER VOTER AS CANDIDATE */}

        {!candidate &&
          user?.role === "voter" && (
            <div className="rounded-3xl bg-white p-8 shadow">

              <h2 className="text-2xl font-bold">
                Register as Candidate
              </h2>

              <p className="mt-2 text-gray-500">
                Enter your party name to become a candidate.
              </p>

              <form
                onSubmit={handleRegister}
                className="mt-8 max-w-xl"
              >

                <label className="mb-2 block font-medium">
                  Party Name
                </label>

                <input
                  type="text"
                  value={party}
                  onChange={(e) =>
                    setParty(e.target.value)
                  }
                  required
                  placeholder="Enter party name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3"
                />

                <button
                  type="submit"
                  disabled={registering}
                  className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {registering
                    ? "Registering..."
                    : "Register as Candidate"}
                </button>

              </form>
            </div>
          )}

        {/* CANDIDATE PROFILE */}

        {candidate && (
          <div className="rounded-3xl bg-white p-8 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-green-600">
                  ✓ Candidate Registered
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {candidate.name}
                </h2>

                <p className="mt-2 text-gray-500">
                  Party: {candidate.party}
                </p>

                <p className="mt-1 text-gray-500">
                  Age: {candidate.age}
                </p>

              </div>

              <div className="rounded-2xl bg-blue-50 px-6 py-4 text-center">

                <p className="text-sm text-gray-500">
                  Votes
                </p>

                <p className="text-3xl font-bold text-blue-600">
                  {candidate.voteCount || 0}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* CANDIDATE CANNOT VOTE */}

        {user?.role === "candidate" && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            Candidates cannot vote in the election.
          </div>
        )}

      </div>
    </div>
  );
}

export default CandidateDashboard;