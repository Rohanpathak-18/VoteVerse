import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyElections,
} from "../../services/electionService";

function PrivateElections() {
  const navigate = useNavigate();

  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadElections();
  }, []);

  const loadElections = async () => {
    try {
      const data = await getMyElections();

      setElections(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Load elections error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading private elections...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Private Elections
            </h1>

            <p className="mt-2 text-gray-500">
              Create or participate in class and group elections.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() =>
                navigate("/private-election/join")
              }
              className="rounded-xl border border-blue-600 px-5 py-3 font-semibold text-blue-600 hover:bg-blue-50"
            >
              Join Election
            </button>

            <button
              onClick={() =>
                navigate("/private-election/create")
              }
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Create Election
            </button>
          </div>

        </div>

        {elections.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow">

            <h2 className="text-2xl font-bold">
              No private elections
            </h2>

            <p className="mt-2 text-gray-500">
              Create an election or join one using an election code.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {elections.map((election) => (
              <div
                key={election.id}
                className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {election.name}
                    </h2>

                    <p className="mt-1 text-sm text-blue-600">
                      {election.className}
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                    {election.role}
                  </span>

                </div>

                <p className="mt-4 text-sm text-gray-500">
                  {election.description ||
                    "Private group election"}
                </p>

                <div className="mt-5 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-gray-400">
                    Election Code
                  </p>

                  <p className="font-bold tracking-wider text-gray-800">
                    {election.code}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(
                      `/private-election/${election.id}`
                    )
                  }
                  className="mt-5 w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white hover:bg-gray-800"
                >
                  Open Election
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default PrivateElections;