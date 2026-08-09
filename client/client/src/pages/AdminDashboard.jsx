import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="font-medium text-blue-600">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Welcome, {user?.name}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-3 font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Registered Users
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              --
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Candidates
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              --
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Total Votes
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              --
            </h2>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">
            Admin Controls
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <button className="rounded-xl bg-blue-600 px-5 py-4 font-semibold text-white hover:bg-blue-700">
              Manage Candidates
            </button>

            <button className="rounded-xl bg-green-600 px-5 py-4 font-semibold text-white hover:bg-green-700">
              View Votes
            </button>

            <button className="rounded-xl bg-purple-600 px-5 py-4 font-semibold text-white hover:bg-purple-700">
              Manage Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;