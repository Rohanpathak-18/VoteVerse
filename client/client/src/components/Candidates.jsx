// src/components/Candidates.jsx

import { useEffect, useState } from "react";
import { getCandidates } from "../services/candidateService";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCandidates();

      setCandidates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(
        "Failed to fetch candidates:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch candidates."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading candidates...
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Meet Our Candidates
          </h2>

          <p className="mt-4 text-gray-500">
            View the candidates participating in the election.
          </p>
        </div>

        {error ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="font-semibold text-red-600">
              {error}
            </p>

            <button
              onClick={loadCandidates}
              className="mt-4 rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        ) : candidates.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h3 className="text-xl font-semibold text-gray-800">
              No candidates registered yet.
            </h3>

            <p className="mt-2 text-gray-500">
              Candidates will appear here after registration.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="overflow-hidden rounded-2xl bg-white shadow-md"
              >
                <div className="flex h-48 items-center justify-center bg-blue-100">
                  <span className="text-6xl">
                    👤
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {candidate.name}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Party: {candidate.party}
                  </p>

                  <p className="mt-1 text-gray-500">
                    Age: {candidate.age}
                  </p>

                  <p className="mt-4 font-semibold text-blue-600">
                    Votes: {candidate.voteCount ?? 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Candidates;