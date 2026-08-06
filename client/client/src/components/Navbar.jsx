import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Vote } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Results", path: "/results" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg shadow-sm"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 text-white">
            <Vote size={24} />
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

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden gap-4 md:flex">
          <button className="rounded-xl border border-blue-600 px-5 py-2 font-medium text-blue-600 transition hover:bg-blue-50">
            Login
          </button>

          <button className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700">
            Sign Up
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 border-t bg-white px-6 py-6 md:hidden"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block font-medium ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button className="w-full rounded-xl border border-blue-600 py-2 text-blue-600">
            Login
          </button>

          <button className="w-full rounded-xl bg-blue-600 py-2 text-white">
            Sign Up
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;