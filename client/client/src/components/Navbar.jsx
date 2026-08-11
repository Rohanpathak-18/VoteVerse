import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          VoteVerse
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/results"
            className="text-gray-600 hover:text-blue-600"
          >
            Results
          </Link>

          {/* Voter */}
          {user?.role === "voter" && (
            <>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                to="/vote"
                className="text-gray-600 hover:text-blue-600"
              >
                Vote
              </Link>

              <Link
                to="/candidate/register"
                className="text-gray-600 hover:text-blue-600"
              >
                Become Candidate
              </Link>
            </>
          )}

          {/* Candidate */}
          {user?.role === "candidate" && (
            <Link
              to="/candidate-dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              Candidate Dashboard
            </Link>
          )}

          {/* Admin */}
          {user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="text-gray-600 hover:text-blue-600"
            >
              Admin Dashboard
            </Link>
          )}

          {/* Not logged in */}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          )}

          {/* Logged in */}
          {user && (
            <>
              <span className="hidden text-sm font-medium text-gray-500 md:block">
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;