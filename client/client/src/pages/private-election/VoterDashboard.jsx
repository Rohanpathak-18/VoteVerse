import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getElectionDetails,
  voteInElection,
  getElectionResults,
} from "../../services/electionService";

function VoterDashboard() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const electionData =
        await getElectionDetails(id);

      setData(electionData);

      if (
        electionData.election.status ===
        "completed"
      ) {
        const resultData =
          await getElectionResults(id);

        setResults(resultData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    const confirmed = window.confirm(
      "Are you sure you want to vote for this candidate?"
    );

    if (!confirmed) return;

    try {
      setVoting(true);

      await voteInElection(
        id,
        candidateId
      );

      alert("Vote cast successfully!");

      await loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to cast vote."
      );
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) return null;

  const canVote =
    data.myRole === "voter" &&
    !data.hasVoted &&
    data.election.status !== "completed";

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="text-blue-600 font-semibold">
            {data.election.className}
          </p>

          <h1 className="mt-1 text-4xl font-bold">
            {data.election.name}
          </h1>

          <p className="mt-2 text-gray-500">
            Voter Dashboard
          </p>
        </div>

        {data.hasVoted && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5 font-semibold text-green-700">
            ✓ Your vote has been submitted successfully.
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">

          {data.candidates.map((candidate) => (
            <div
              key={candidate.userId}
              className="rounded-2xl bg-white p-6 shadow"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {candidate.name
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {candidate.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Candidate
                  </p>
                </div>

              </div>

              <button
                disabled={!canVote || voting}
                onClick={() =>
                  handleVote(candidate.userId)
                }
                className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {data.hasVoted
                  ? "Already Voted"
                  : voting
                  ? "Submitting..."
                  : "Vote"}
              </button>

            </div>
          ))}

        </div>

        {data.election.status === "completed" && (
          <div className="mt-10">

            <h2 className="mb-5 text-2xl font-bold">
              Election Results
            </h2>

            <div className="space-y-4">

              {results.map((candidate, index) => (
                <div
                  key={candidate.userId}
                  className="flex items-center justify-between rounded-2xl bg-white p-5 shadow"
                >
                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                      {index + 1}
                    </div>

                    <p className="font-bold">
                      {candidate.name}
                    </p>

                  </div>

                  <p className="text-xl font-bold text-blue-600">
                    {candidate.votes} votes
                  </p>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default VoterDashboard;