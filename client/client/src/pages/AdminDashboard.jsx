import { useEffect, useState } from "react";
import {
  getCandidates,
  addCandidate,
  deleteCandidate,
  getVoteCount,
} from "../services/candidateService";
import { useAuth } from "../store/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const [candidates, setCandidates] = useState([]);
  const [voteResults, setVoteResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    party: "",
    age: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const candidateData = await getCandidates();

      setCandidates(
        Array.isArray(candidateData)
          ? candidateData
          : candidateData.candidates || []
      );

      try {
        const resultData = await getVoteCount();

        setVoteResults(
          Array.isArray(resultData)
            ? resultData
            : resultData.candidates || []
        );
      } catch (error) {
        console.log("Vote count unavailable:", error);
      }

    } catch (error) {
      console.error("Admin dashboard error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load admin dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Candidate name is required.");
      return;
    }

    try {
      await addCandidate({
        name: form.name,
        party: form.party,
        age: Number(form.age),
      });

      alert("Candidate added successfully.");

      setForm({
        name: "",
        party: "",
        age: "",
      });

      loadData();
    } catch (error) {
      console.error("Add candidate error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to add candidate."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this candidate?"
    );

    if (!confirmed) return;

    try {
      await deleteCandidate(id);

      alert("Candidate deleted.");

      loadData();
    } catch (error) {
      console.error("Delete candidate error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete candidate."
      );
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome, {user?.name || "Admin"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-slate-500">
              Total Candidates
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {candidates.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-slate-500">
              Admin
            </p>

            <h2 className="text-xl font-bold mt-2">
              {user?.name || "Administrator"}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-slate-500">
              Role
            </p>

            <h2 className="text-xl font-bold mt-2 capitalize">
              {user?.role || "admin"}
            </h2>
          </div>

        </div>

        {/* Add Candidate */}

        <div className="bg-white p-8 rounded-2xl shadow mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Add Candidate
          </h2>

          <form
            onSubmit={handleAddCandidate}
            className="grid md:grid-cols-4 gap-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Candidate name"
              value={form.name}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="text"
              name="party"
              placeholder="Party"
              value={form.party}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
              className="border p-3 rounded-xl"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              Add Candidate
            </button>

          </form>

        </div>

        {/* Candidates */}

        <div className="bg-white p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Manage Candidates
          </h2>

          {candidates.length === 0 ? (
            <p className="text-slate-500">
              No candidates found.
            </p>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">
                      Name
                    </th>

                    <th className="text-left p-4">
                      Party
                    </th>

                    <th className="text-left p-4">
                      Age
                    </th>

                    <th className="text-left p-4">
                      Votes
                    </th>

                    <th className="text-left p-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {candidates.map((candidate) => {

                    const result = voteResults.find(
                      (item) =>
                        item._id === candidate._id
                    );

                    const votes =
                      result?.voteCount ??
                      candidate.voteCount ??
                      0;

                    return (
                      <tr
                        key={candidate._id}
                        className="border-b"
                      >

                        <td className="p-4 font-semibold">
                          {candidate.name}
                        </td>

                        <td className="p-4">
                          {candidate.party || "-"}
                        </td>

                        <td className="p-4">
                          {candidate.age || "-"}
                        </td>

                        <td className="p-4 font-semibold">
                          {votes}
                        </td>

                        <td className="p-4">

                          <button
                            onClick={() =>
                              handleDelete(candidate._id)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;