import { motion } from "framer-motion";
import { User, BadgeCheck } from "lucide-react";

function CandidateCard({ candidate }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg"
    >
      {/* Candidate Image */}
      <div className="flex h-60 items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <User size={80} className="text-blue-600" />
      </div>

      {/* Candidate Details */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {candidate.name}
          </h2>

          <BadgeCheck className="text-blue-600" size={24} />
        </div>

        <p className="mt-2 text-gray-500">
          {candidate.party}
        </p>

        <button className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
          Vote Now
        </button>
      </div>
    </motion.div>
  );
}

export default CandidateCard;