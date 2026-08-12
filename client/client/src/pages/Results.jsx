// src/pages/Results.jsx

import { useEffect, useState } from "react";

import {
  getVoteCount,
} from "../services/candidateService";

function Results() {
  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getVoteCount();

      setResults(
        Array.isArray(data) ? data : []
      );

    } catch (error) {
      console.error(
        "Results error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to load election results."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading results...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">

          <h1 className="text-4xl font-bold">
            Election Results
          </h1>

          <p className="mt-3 text-gray-500">
            Current election results
          </p>

        </div>

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <p className="font-semibold text-red-600">
              {error}
            </p>

            <button
              onClick={loadResults}
              className="mt-5 rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600"
            >
              Try Again
            </button>

          </div>
        ) : results.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">

            <h2 className="text-xl font-semibold">
              No results available
            </h2>

            <p className="mt-2 text-gray-500">
              Results will appear after candidates are registered.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {results.map(
              (candidate, index) => (
                <div
                  key={candidate._id}
                  className="flex items-center justify-between rounded-2xl bg-white p-6 shadow"
                >

                  <div className="flex items-center gap-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <div>

                      <h2 className="text-xl font-bold">
                        {candidate.name}
                      </h2>

                      <p className="text-gray-500">
                        {candidate.party}
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Age: {candidate.age}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Votes
                    </p>

                    <p className="text-3xl font-bold text-blue-600">
                      {candidate.voteCount ?? 0}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default Results;