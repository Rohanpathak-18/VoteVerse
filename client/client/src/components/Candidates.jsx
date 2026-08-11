import { useEffect, useState } from "react";
import { getCandidates } from "../services/candidateService";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await getCandidates();

        console.log("Candidates response:", data);

        if (Array.isArray(data)) {
          setCandidates(data);
        } else if (Array.isArray(data.candidates)) {
          setCandidates(data.candidates);
        } else {
          console.error("Unexpected candidates response:", data);
          setCandidates([]);
          setError("Invalid candidates data received.");
        }
      } catch (error) {
        console.error("Failed to fetch candidates:", error);

        setError(
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to fetch candidates."
        );

        setCandidates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading candidates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">
            Candidates
          </h1>

          <p className="mt-3 text-gray-500">
            View all candidates participating in the election.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 p-4 text-center text-red-600">
            {error}
          </div>
        )}

        {candidates.length === 0 && !error && (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold">
              No candidates registered yet.
            </h2>
          </div>
        )}

        {candidates.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-blue-100 text-5xl">
                  👤
                </div>

                <h2 className="text-2xl font-bold">
                  {candidate.name}
                </h2>

                <p className="mt-2 text-gray-500">
                  Party: {candidate.party}
                </p>

                <p className="mt-1 text-gray-500">
                  Age: {candidate.age}
                </p>

                <p className="mt-4 font-semibold text-blue-600">
                  Votes: {candidate.voteCount || 0}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Candidates;