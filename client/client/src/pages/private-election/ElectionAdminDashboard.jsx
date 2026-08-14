import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getElectionDetails,
  updateParticipantRole,
  getElectionResults,
  completeElection,
} from "../../services/electionService";

function ElectionAdminDashboard() {
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

      alert(
        error.response?.data?.message ||
          "Failed to load election."
      );
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (
    userId,
    role
  ) => {
    try {
      await updateParticipantRole(
        id,
        userId,
        role
      );

      await loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update role."
      );
    }
  };

  const finishElection = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to end this election?"
    );

    if (!confirmed) return;

    try {
      await completeElection(id);

      alert("Election completed.");

      await loadData();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to complete election."
      );
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

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-white shadow-lg">

          <p className="text-indigo-100">
            {data.election.className}
          </p>

          <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <h1 className="text-4xl font-bold">
                {data.election.name}
              </h1>

              <p className="mt-3 text-indigo-100">
                Election Organizer Dashboard
              </p>
            </div>

            <div className="rounded-xl bg-white/15 p-4">
              <p className="text-xs text-indigo-100">
                Share this code
              </p>

              <p className="text-xl font-bold tracking-widest">
                {data.election.code}
              </p>
            </div>

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-white p-7 shadow">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <h2 className="text-2xl font-bold">
                Participants
              </h2>

              <p className="mt-1 text-gray-500">
                Assign students as voters or candidates.
              </p>
            </div>

            {data.election.status !==
              "completed" && (
              <button
                onClick={finishElection}
                className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
              >
                End Election
              </button>
            )}

          </div>

          <div className="mt-6 space-y-4">

            {data.participants?.map(
              (participant) => (
                <div
                  key={participant.participantId}
                  className="flex flex-col justify-between gap-4 rounded-xl bg-slate-50 p-5 md:flex-row md:items-center"
                >

                  <div>
                    <h3 className="font-bold">
                      {participant.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {participant.email}
                    </p>

                    <p className="mt-1 text-xs capitalize text-blue-600">
                      Current role: {participant.role}
                    </p>
                  </div>

                  {participant.role !==
                    "organizer" && (
                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          changeRole(
                            participant.userId,
                            "voter"
                          )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                      >
                        Make Voter
                      </button>

                      <button
                        onClick={() =>
                          changeRole(
                            participant.userId,
                            "candidate"
                          )
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Make Candidate
                      </button>

                    </div>
                  )}

                </div>
              )
            )}

          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-white p-7 shadow">

          <h2 className="text-2xl font-bold">
            Results
          </h2>

          <div className="mt-5 space-y-4">

            {results.map((candidate, index) => (
              <div
                key={candidate.userId}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                    {index + 1}
                  </div>

                  <p className="font-bold">
                    {candidate.name}
                  </p>

                </div>

                <p className="font-bold text-blue-600">
                  {candidate.votes} votes
                </p>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ElectionAdminDashboard;