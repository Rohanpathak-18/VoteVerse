import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getElectionDetails,
} from "../../services/electionService";

function ElectionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadElection();
  }, [id]);

  const loadElection = async () => {
    try {
      const result =
        await getElectionDetails(id);

      setData(result);
    } catch (error) {
      console.error(
        "Election details error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load election."
      );

      navigate("/private-elections");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading election...
      </div>
    );
  }

  if (!data) return null;

  const { election, myRole, hasVoted } = data;

  const openDashboard = () => {
    if (myRole === "organizer") {
      navigate(
        `/private-election/${id}/admin`
      );
    } else if (myRole === "candidate") {
      navigate(
        `/private-election/${id}/candidate`
      );
    } else {
      navigate(
        `/private-election/${id}/voter`
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <p className="text-sm font-medium text-blue-100">
                {election.className}
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                {election.name}
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                {election.description ||
                  "Private election"}
              </p>
            </div>

            <span className="w-fit rounded-full bg-white/20 px-4 py-2 text-sm font-semibold capitalize">
              {myRole}
            </span>

          </div>

        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Election Code
            </p>

            <p className="mt-2 text-xl font-bold tracking-wider">
              {election.code}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Your Role
            </p>

            <p className="mt-2 text-xl font-bold capitalize">
              {myRole}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Voting Status
            </p>

            <p className="mt-2 text-xl font-bold">
              {myRole === "voter"
                ? hasVoted
                  ? "Voted"
                  : "Not Voted"
                : "N/A"}
            </p>
          </div>

        </div>

        <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow">

          <h2 className="text-2xl font-bold">
            Welcome to the election
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-gray-500">
            Open your dashboard to participate in or manage this election.
          </p>

          <button
            onClick={openDashboard}
            className="mt-6 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Open My Dashboard
          </button>

        </div>

      </div>
    </div>
  );
}

export default ElectionDetails;