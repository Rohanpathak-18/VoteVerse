import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

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

    try {
      setLoading(true);

      const response = await login(formData);

      console.log("Login response:", response);

      const role =
        response.user?.role ||
        response.role;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-blue-600">
          VoteVerse
        </h1>

        <h2 className="mt-6 text-2xl font-bold">
          Welcome Back
        </h2>

        <p className="mt-2 text-gray-500">
          Login to access your voting account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="mb-2 block font-medium">
              Aadhar Card Number
            </label>

            <input
              type="text"
              name="aadharCardNumber"
              value={formData.aadharCardNumber}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="mt-6 text-center text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600"
          >
            Create Account
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
