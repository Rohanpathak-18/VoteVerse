import { useEffect, useState } from "react";

import { getVoteCount } from "../services/candidateService";

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const data = await getVoteCount();

      console.log("Results:", data);

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Results error:", error);
      setResults([]);
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

        {results.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold">
              No results available
            </h2>
          </div>
        ) : (
          <div className="space-y-5">
            {results.map((candidate, index) => (
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
                  </div>

                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Votes
                  </p>

                  <p className="text-3xl font-bold text-blue-600">
                    {candidate.voteCount}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Results;