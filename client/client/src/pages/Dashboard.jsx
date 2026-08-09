import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">
          Loading user...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome, {user.name}
            </h1>

            <p className="mt-2 text-lg text-gray-500">
              Welcome to your VoteVerse dashboard.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-red-500 px-6 py-4 font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>

        </div>


        {/* Dashboard Cards */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* Profile */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Profile
            </h2>

            <div className="mt-6 space-y-4">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Name
                </p>

                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>


              <div>
                <p className="text-sm font-medium text-gray-500">
                  Email
                </p>

                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>


              <div>
                <p className="text-sm font-medium text-gray-500">
                  Role
                </p>

                <p className="mt-1 text-lg font-semibold capitalize text-blue-600">
                  {user.role}
                </p>
              </div>

            </div>

          </div>


          {/* Voting */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Voting
            </h2>

            <p className="mt-3 text-gray-500">
              Participate in the current election.
            </p>

            <Link
              to="/vote"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Vote Now
            </Link>

          </div>


          {/* Results */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              Election Results
            </h2>

            <p className="mt-3 text-gray-500">
              View the latest election results.
            </p>

            <Link
              to="/results"
              className="mt-6 inline-block rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              View Results
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;