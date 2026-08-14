import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  joinElection,
} from "../../services/electionService";

function JoinElection() {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || !password) {
      alert(
        "Election code and password are required."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await joinElection(
          code.toUpperCase(),
          password
        );

      alert("Joined election successfully!");

      navigate(
        `/private-election/${data.electionId}`
      );
    } catch (error) {
      console.error(
        "Join election error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to join election."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-xl">

        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold">
            Join Private Election
          </h1>

          <p className="mt-2 text-gray-500">
            Enter the election code and password shared by your organizer.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow"
        >

          <div className="space-y-5">

            <div>
              <label className="mb-2 block font-semibold">
                Election Code
              </label>

              <input
                value={code}
                onChange={(e) =>
                  setCode(e.target.value)
                }
                placeholder="VV-ABCDE"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 uppercase tracking-wider outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Election password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          <button
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Joining..."
              : "Join Election"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default JoinElection;