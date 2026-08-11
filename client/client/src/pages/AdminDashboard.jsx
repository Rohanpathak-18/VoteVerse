import { useEffect, useState } from "react";

import {
  getCandidates,
  getVoteCount,
} from "../services/candidateService";

import { useAuth } from "../store/AuthContext";

function AdminDashboard() {
  const {
    user,
    logout,
  } = useAuth();

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const candidateData =
        await getCandidates();

      const resultData =
        await getVoteCount();

      setCandidates(
        Array.isArray(candidateData)
          ? candidateData
          : []
      );

      // Results are already sorted
      console.log(
        "Election results:",
        resultData
      );
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Unable to load admin dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">

          <div>
            <p className="font-semibold text-blue-600">
              VoteVerse Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome, {user?.name || "Admin"}
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>

        </div>

        {/* STATS */}

        <div className="mb-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Total Candidates
            </p>

            <p className="mt-2 text-4xl font-bold">
              {candidates.length}
            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Admin
            </p>

            <p className="mt-2 text-2xl font-bold">
              {user?.name}
            </p>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow">

            <p className="text-gray-500">
              Role
            </p>

            <p className="mt-2 text-2xl font-bold capitalize">
              {user?.role}
            </p>

          </div>

        </div>

        {/* CANDIDATES */}

        <div className="rounded-3xl bg-white p-8 shadow">

          <h2 className="text-2xl font-bold">
            Registered Candidates
          </h2>

          <p className="mt-2 text-gray-500">
            View all candidates participating in the election.
          </p>

          <div className="mt-8 overflow-x-auto">

            {candidates.length === 0 ? (
              <p className="text-gray-500">
                No candidates registered.
              </p>
            ) : (
              <table className="w-full text-left">

                <thead>
                  <tr className="border-b">

                    <th className="p-4">
                      Name
                    </th>

                    <th className="p-4">
                      Age
                    </th>

                    <th className="p-4">
                      Party
                    </th>

                    <th className="p-4">
                      Votes
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {candidates.map(
                    (candidate) => (
                      <tr
                        key={candidate._id}
                        className="border-b"
                      >

                        <td className="p-4 font-semibold">
                          {candidate.name}
                        </td>

                        <td className="p-4">
                          {candidate.age}
                        </td>

                        <td className="p-4">
                          {candidate.party}
                        </td>

                        <td className="p-4 font-bold text-blue-600">
                          {candidate.voteCount || 0}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;