// src/pages/CandidateRegister.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  registerAsCandidate,
  getMyCandidateProfile,
} from "../services/candidateService";

import { useAuth } from "../store/AuthContext";

function CandidateRegister() {
  const navigate = useNavigate();

  const {
    user,
    updateUser,
  } = useAuth();

  const [party, setParty] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!party.trim()) {
      alert("Please enter party name.");
      return;
    }

    try {
      setLoading(true);

      await registerAsCandidate({
        party: party.trim(),
      });

      const profileResponse =
        await getMyCandidateProfile();

      const updatedUser = {
        ...user,
        role: "candidate",
      };

      updateUser(updatedUser);

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert(
        "You are now registered as a candidate!"
      );

      navigate("/candidate-dashboard", {
        replace: true,
      });

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
      setLoading(false);
    }
  };

  if (user?.role !== "voter") {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Become a Candidate
        </h1>

        <p className="mt-2 text-gray-500">
          Register yourself as a candidate for the election.
        </p>

        <div className="mt-6 rounded-xl bg-blue-50 p-4">
          <p className="text-sm text-gray-500">
            Candidate Name
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {user?.name}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block font-medium">
              Party Name
            </label>

            <input
              type="text"
              value={party}
              onChange={(e) =>
                setParty(e.target.value)
              }
              placeholder="Enter party name"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Registering..."
              : "Register as Candidate"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default CandidateRegister;