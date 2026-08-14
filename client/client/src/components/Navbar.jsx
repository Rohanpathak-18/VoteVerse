// src/components/Navbar.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
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
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Main Navbar */}
        <div className="flex min-h-[70px] items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-2"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-bold text-white shadow-md transition-transform duration-200 group-hover:scale-105">
              V
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                Vote<span className="text-blue-600">Verse</span>
              </h1>

              <p className="-mt-1 text-[9px] font-medium tracking-wider text-gray-400 sm:text-[10px]">
                DIGITAL VOTING
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">

            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/results"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
            >
              Results
            </Link>

           

            {/* Voter Navigation */}
            {user?.role === "voter" && (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <Link
                  to="/vote"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  Vote
                </Link>

                <Link
                  to="/candidate/register"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-blue-50 hover:text-blue-600"
                >
                  Become Candidate
                </Link>
              </>
            )}

            {/* Candidate Navigation */}
            {user?.role === "candidate" && (
              <Link
                to="/candidate-dashboard"
                className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-100"
              >
                Candidate Dashboard
              </Link>
            )}

            {/* Admin Navigation */}
            {user?.role === "admin" && (
              <Link
                to="/admin-dashboard"
                className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-100"
              >
                Admin Dashboard
              </Link>
            )}

            {/* Logged Out */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Signup
                </Link>
              </>
            )}

            {/* Logged In User */}
            {user && (
              <>
                {/* User Info */}
                <div className="ml-2 flex items-center gap-3 border-l border-gray-200 pl-3">
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
                  type="button"
                  onClick={handleLogout}
                  className="ml-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-500 hover:text-white hover:shadow-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-4 md:hidden">
            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/results"
                onClick={closeMenu}
                className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              >
                Results
              </Link>

             

              {/* Voter Navigation */}
              {user?.role === "voter" && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/vote"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Vote
                  </Link>

                  <Link
                    to="/candidate/register"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Become Candidate
                  </Link>
                </>
              )}

              {/* Candidate Navigation */}
              {user?.role === "candidate" && (
                <Link
                  to="/candidate-dashboard"
                  onClick={closeMenu}
                  className="rounded-lg bg-blue-50 px-4 py-3 font-semibold text-blue-600"
                >
                  Candidate Dashboard
                </Link>
              )}

              {/* Admin Navigation */}
              {user?.role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  onClick={closeMenu}
                  className="rounded-lg bg-indigo-50 px-4 py-3 font-semibold text-indigo-600"
                >
                  Admin Dashboard
                </Link>
              )}

              {/* Logged Out */}
              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-lg px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="mt-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center font-semibold text-white shadow-md"
                  >
                    Signup
                  </Link>
                </>
              )}

              {/* Logged In User */}
              {user && (
                <>
                  {/* Mobile User Info */}
                  <div className="mt-2 flex items-center gap-3 border-t border-gray-100 px-4 pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.name}
                      </p>

                      <p className="text-xs capitalize text-gray-400">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;