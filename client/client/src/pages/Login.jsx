import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../store/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [formData, setFormData] = useState({
    aadharCardNumber: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.aadharCardNumber.length !== 12) {
      alert("Aadhar number must contain exactly 12 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.post(
        "/user/login",
        formData
      );

      const { token, user } = response.data;

      // Save token
      localStorage.setItem("token", token);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Update AuthContext
      setUser(user);

      alert("Login successful!");

      // Role-based navigation
      if (user.role === "candidate") {
        navigate("/candidate-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >

        {/* Logo */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">
            VoteVerse
          </h1>

          <p className="mt-2 text-gray-500">
            Login to your voting account
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-white p-8 shadow-xl border border-gray-100">

          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="mt-2 text-gray-500">
            Login to continue to VoteVerse.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* Aadhar */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Aadhar Card Number
              </label>

              <input
                type="text"
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                maxLength={12}
                minLength={12}
                pattern="[0-9]{12}"
                required
                placeholder="Enter 12 digit Aadhar number"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

          </form>

          {/* Signup */}
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

export default Login;