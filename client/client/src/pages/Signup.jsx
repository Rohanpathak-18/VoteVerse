import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import axiosInstance from "../api/axiosInstance";


function Signup() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    aadharCardNumber: "",
    address: "",
    password: "",
    role: "voter",
  });


  const [loading, setLoading] =
    useState(false);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);


    try {

      const response =
        await axiosInstance.post(
          "/user/signup",
          {
            ...formData,
            age: Number(formData.age),
          }
        );


      localStorage.setItem(
        "token",
        response.data.token
      );


      alert(
        "Account created successfully!"
      );


      if (response.data.user.role === "candidate") {

        navigate("/candidate-dashboard");

      } else {

        navigate("/dashboard");

      }

    } catch (error) {

      console.error(
        "Signup error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Signup failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex justify-center px-4 py-12">

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="w-full max-w-2xl"
      >

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-blue-600">
            VoteVerse
          </h1>

          <p className="mt-2 text-gray-500">
            Create your voting account
          </p>

        </div>


        <div className="rounded-3xl bg-white p-8 shadow-xl">

          <h2 className="text-2xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-gray-500">
            Register as a voter or candidate.
          </p>


          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >

            {/* Name */}

            <div>
              <label className="mb-2 block font-medium">
                Full Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Full name"
              />
            </div>


            {/* Age */}

            <div>
              <label className="mb-2 block font-medium">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="18"
                required
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Age"
              />
            </div>


            {/* Email */}

            <div>
              <label className="mb-2 block font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Email"
              />
            </div>


            {/* Mobile */}

            <div>
              <label className="mb-2 block font-medium">
                Mobile Number
              </label>

              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Mobile number"
              />
            </div>


            {/* Aadhar */}

            <div>
              <label className="mb-2 block font-medium">
                Aadhar Card Number
              </label>

              <input
                name="aadharCardNumber"
                value={formData.aadharCardNumber}
                onChange={handleChange}
                maxLength={12}
                required
                className="w-full rounded-xl border px-4 py-3"
                placeholder="12 digit Aadhar number"
              />
            </div>


            {/* Role */}

            <div>
              <label className="mb-2 block font-medium">
                Register As
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3"
              >

                <option value="voter">
                  Voter
                </option>

                <option value="candidate">
                  Candidate
                </option>

              </select>

            </div>


            {/* Address */}

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Your address"
              />

            </div>


            {/* Password */}

            <div className="md:col-span-2">

              <label className="mb-2 block font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
                className="w-full rounded-xl border px-4 py-3"
                placeholder="Create password"
              />

            </div>


            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

              </button>

            </div>

          </form>


          <p className="mt-6 text-center text-gray-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600"
            >
              Login
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}


export default Signup;