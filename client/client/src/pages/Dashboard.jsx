import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {user?.name || "Voter"}!
            </h1>

            <p className="text-slate-500 mt-2">
              Welcome to your VoteVerse dashboard.
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Profile */}

          <div className="bg-white p-7 rounded-2xl shadow">

            <h2 className="text-2xl font-bold mb-6">
              Profile
            </h2>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-slate-500">
                  Name
                </p>

                <p className="font-semibold">
                  {user?.name || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold">
                  {user?.email || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Role
                </p>

                <p className="font-semibold capitalize">
                  {user?.role || "voter"}
                </p>
              </div>

            </div>

          </div>

          {/* Voting */}

          <div className="bg-white p-7 rounded-2xl shadow">

            <h2 className="text-2xl font-bold">
              Voting
            </h2>

            <p className="text-slate-500 mt-3">
              Participate in the current election.
            </p>

            <div className="mt-6">

              {user?.isVoted ? (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                  ✓ You have already voted.
                </div>
              ) : (
                <button
                  onClick={() => navigate("/vote")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Vote Now
                </button>
              )}

            </div>

          </div>

          {/* Results */}

          <div className="bg-white p-7 rounded-2xl shadow">

            <h2 className="text-2xl font-bold">
              Election Results
            </h2>

            <p className="text-slate-500 mt-3">
              View the latest election results.
            </p>

            <button
              onClick={() => navigate("/results")}
              className="mt-6 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-xl font-semibold"
            >
              View Results
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;