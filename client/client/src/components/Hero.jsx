import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Vote,
  ShieldCheck,
  Users,
  BarChart3,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Background Blur */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl"></div>

      <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl"></div>

      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 lg:flex-row">
        {/* Left Section */}

        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Secure Digital Election Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
            Vote With
            <span className="text-blue-600"> Confidence.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
            VoteVerse provides a secure, transparent and modern online voting
            experience. Cast your vote with confidence and view live election
            results instantly.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:scale-105 hover:bg-blue-700"
            >
              Vote Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/results"
              className="rounded-xl border border-blue-600 px-7 py-4 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Live Results
            </Link>
          </div>
        </motion.div>

        {/* Right Section */}

        <motion.div
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-1 justify-center"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <Vote className="mb-4 text-blue-600" size={42} />
              <h2 className="text-3xl font-bold">12K+</h2>
              <p className="text-gray-500">Votes Cast</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <Users className="mb-4 text-green-600" size={42} />
              <h2 className="text-3xl font-bold">2500+</h2>
              <p className="text-gray-500">Registered Users</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <ShieldCheck className="mb-4 text-purple-600" size={42} />
              <h2 className="text-3xl font-bold">100%</h2>
              <p className="text-gray-500">Secure Voting</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <BarChart3 className="mb-4 text-orange-500" size={42} />
              <h2 className="text-3xl font-bold">Live</h2>
              <p className="text-gray-500">Election Results</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;