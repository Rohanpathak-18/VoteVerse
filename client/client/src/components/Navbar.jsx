import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../store/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            ✓
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              VoteVerse
            </h1>

            <p className="text-xs text-gray-500">
              Secure Digital Voting
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600"
                : "font-medium text-gray-700 hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/results"
            className={({ isActive }) =>
              isActive
                ? "font-medium text-blue-600"
                : "font-medium text-gray-700 hover:text-blue-600"
            }
          >
            Results
          </NavLink>

          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-blue-600"
                  : "font-medium text-gray-700 hover:text-blue-600"
              }
            >
              Dashboard
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-red-600"
                  : "font-medium text-red-500 hover:text-red-700"
              }
            >
              Admin
            </NavLink>
          )}

        </div>

        {/* Right side */}
        <div className="hidden items-center gap-4 md:flex">

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-blue-600 px-5 py-2 font-medium text-blue-600 hover:bg-blue-50"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl border px-4 py-2"
              >
                <UserCircle size={20} />

                <span>
                  {user.name}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="space-y-4 border-t bg-white px-6 py-6 md:hidden">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            Home
          </Link>

          <Link
            to="/results"
            onClick={() => setOpen(false)}
            className="block"
          >
            Results
          </Link>

          {user && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="block"
            >
              Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block font-semibold text-red-600"
            >
              Admin Dashboard
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-red-500 py-2 text-white"
            >
              Logout
            </button>
          )}

        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;