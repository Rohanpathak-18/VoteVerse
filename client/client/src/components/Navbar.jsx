// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const {
    user,
    logout,
    loading,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            Vote<span className="text-indigo-600">Verse</span>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 shadow-sm backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md transition-transform duration-200 group-hover:scale-105">
            V
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Vote<span className="text-blue-600">Verse</span>
            </h1>

            <p className="-mt-1 text-[10px] font-medium tracking-wider text-gray-400">
              DIGITAL VOTING
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/results"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Results
          </Link>

          {user?.role === "voter" && (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <Link
                to="/vote"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Vote
              </Link>

              <Link
                to="/candidate/register"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Become Candidate
              </Link>
            </>
          )}

          {user?.role === "candidate" && (
            <Link
              to="/candidate-dashboard"
              className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100"
            >
              Candidate Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-100"
            >
              Admin Dashboard
            </Link>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-200"
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              {/* User information */}
              <div className="ml-3 hidden items-center gap-3 border-l border-gray-200 pl-4 md:flex">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>

                  <p className="text-xs capitalize text-gray-400">
                    {user.role}
                  </p>
                </div>

              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="ml-2 rounded-xl border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-md"
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