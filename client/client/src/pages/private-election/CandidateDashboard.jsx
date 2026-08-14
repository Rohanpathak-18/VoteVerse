import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getElectionDetails,
  getElectionResults,
} from "../../services/electionService";

function CandidateDashboard() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const electionData =
        await getElectionDetails(id);

      setData(electionData);

      const resultData =
        await getElectionResults(id);

      setResults(resultData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const myResult = results.find(
    (candidate) =>
      candidate.userId ===
      data.candidates.find(
        (candidate) =>
          candidate.userId
      )?.userId
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="font-semibold text-blue-600">
            {data.election.className}
          </p>

          <h1 className="mt-1 text-4xl font-bold">
            {data.election.name}
          </h1>

          <p className="mt-2 text-gray-500">
            Candidate Dashboard
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            Candidate Information
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-gray-500">
                Role
              </p>

              <p className="mt-1 font-bold capitalize">
                {data.myRole}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-gray-500">
                Election Status
              </p>

              <p className="mt-1 font-bold capitalize">
                {data.election.status}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-gray-500">
                Your Votes
              </p>

              <p className="mt-1 text-2xl font-bold text-blue-600">
                {myResult?.votes ?? 0}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow">

          <h2 className="mb-5 text-2xl font-bold">
            Election Results
          </h2>

          <div className="space-y-4">

            {results.map((candidate, index) => (
              <div
                key={candidate.userId}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-5"
              >

                <div className="flex items-center gap-4">

                  <span className="font-bold">
                    #{index + 1}
                  </span>

                  <span className="font-semibold">
                    {candidate.name}
                  </span>

                </div>

                <span className="font-bold text-blue-600">
                  {candidate.votes} votes
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default CandidateDashboard;