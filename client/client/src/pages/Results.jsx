import { motion } from "framer-motion";
import { Trophy, Vote, Users, BarChart3 } from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    party: "Future Party",
    votes: 1250,
    percentage: 42,
  },
  {
    id: 2,
    name: "Priya Singh",
    party: "People's Alliance",
    votes: 980,
    percentage: 33,
  },
  {
    id: 3,
    name: "Amit Verma",
    party: "National Vision",
    votes: 750,
    percentage: 25,
  },
];

function Results() {
  const totalVotes = candidates.reduce(
    (total, candidate) => total + candidate.votes,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <Trophy className="text-blue-600" size={32} />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Election Results
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            View the latest voting results and see how each candidate is
            performing.
          </p>
        </motion.div>

        {/* Statistics */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <Vote className="text-blue-600" />
            </div>

            <p className="text-sm text-gray-500">
              Total Votes
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {totalVotes.toLocaleString()}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Users className="text-green-600" />
            </div>

            <p className="text-sm text-gray-500">
              Candidates
            </p>

            <h2 className="mt-1 text-3xl font-bold text-gray-900">
              {candidates.length}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <BarChart3 className="text-purple-600" />
            </div>

            <p className="text-sm text-gray-500">
              Leading Candidate
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">
              {candidates[0].name}
            </h2>
          </motion.div>

        </div>

        {/* Candidate Results */}
        <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Candidate Results
            </h2>

            <p className="mt-1 text-gray-500">
              Current vote distribution
            </p>
          </div>

          <div className="space-y-8">

            {candidates.map((candidate, index) => (
              <motion.div
                key={candidate.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="mb-3 flex items-center justify-between">

                  <div>
                    <h3 className="font-bold text-gray-900">
                      {candidate.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {candidate.party}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {candidate.votes.toLocaleString()} votes
                    </p>

                    <p className="text-sm text-blue-600">
                      {candidate.percentage}%
                    </p>
                  </div>

                </div>

                {/* Progress bar */}
                <div className="h-4 overflow-hidden rounded-full bg-gray-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${candidate.percentage}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.2,
                    }}
                    className="h-full rounded-full bg-blue-600"
                  />
                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-500">
            Results shown are for demonstration purposes.
          </p>
        </motion.div>

      </div>
    </div>
  );
}

export default Results;