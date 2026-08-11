import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Trophy,
  Vote,
  Users,
  BarChart3,
} from "lucide-react";

import { getVoteCount } from "../services/candidateService";

function Results() {

  const [candidates, setCandidates] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    loadResults();

  }, []);


  const loadResults = async () => {

    try {

      const response =
        await getVoteCount();

      setCandidates(
        response.candidates || []
      );

    } catch (error) {

      console.error(
        "Results error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  const totalVotes =
    candidates.reduce(
      (total, candidate) =>
        total +
        (candidate.voteCount || 0),
      0
    );


  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">

      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-12 text-center"
        >

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">

            <Trophy
              className="text-blue-600"
              size={32}
            />

          </div>


          <h1 className="text-4xl font-bold text-gray-900">
            Election Results
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            View the latest voting results.
          </p>

        </motion.div>


        {loading ? (

          <div className="py-20 text-center">
            Loading results...
          </div>

        ) : (

          <>

            {/* Statistics */}

            <div className="mb-12 grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl bg-white p-6 shadow">

                <Vote
                  className="mb-4 text-blue-600"
                  size={32}
                />

                <p className="text-sm text-gray-500">
                  Total Votes
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {totalVotes.toLocaleString()}
                </h2>

              </div>


              <div className="rounded-2xl bg-white p-6 shadow">

                <Users
                  className="mb-4 text-green-600"
                  size={32}
                />

                <p className="text-sm text-gray-500">
                  Candidates
                </p>

                <h2 className="mt-1 text-3xl font-bold">
                  {candidates.length}
                </h2>

              </div>


              <div className="rounded-2xl bg-white p-6 shadow">

                <BarChart3
                  className="mb-4 text-purple-600"
                  size={32}
                />

                <p className="text-sm text-gray-500">
                  Leading Candidate
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {candidates.length > 0
                    ? candidates[0].name
                    : "No candidates"}
                </h2>

              </div>

            </div>


            {/* Results */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold">
                Candidate Results
              </h2>

              <p className="mt-1 text-gray-500">
                Current vote distribution
              </p>


              <div className="mt-8 space-y-8">

                {candidates.length === 0 ? (

                  <p className="text-gray-500">
                    No candidates available.
                  </p>

                ) : (

                  candidates.map(
                    (candidate, index) => {

                      const votes =
                        candidate.voteCount || 0;

                      const percentage =
                        totalVotes === 0
                          ? 0
                          : Math.round(
                              (votes /
                                totalVotes) *
                                100
                            );

                      return (

                        <motion.div
                          key={candidate._id}
                          initial={{
                            opacity: 0,
                            x: -30,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay:
                              index * 0.1,
                          }}
                        >

                          <div className="mb-3 flex items-center justify-between">

                            <div>

                              <h3 className="font-bold">
                                {candidate.name}
                              </h3>

                              <p className="text-sm text-gray-500">
                                {candidate.party}
                              </p>

                            </div>


                            <div className="text-right">

                              <p className="font-bold">
                                {votes.toLocaleString()} votes
                              </p>

                              <p className="text-sm text-blue-600">
                                {percentage}%
                              </p>

                            </div>

                          </div>


                          <div className="h-4 overflow-hidden rounded-full bg-gray-100">

                            <motion.div
                              initial={{
                                width: 0,
                              }}
                              animate={{
                                width:
                                  `${percentage}%`,
                              }}
                              transition={{
                                duration: 1,
                              }}
                              className="h-full rounded-full bg-blue-600"
                            />

                          </div>

                        </motion.div>

                      );
                    }
                  )

                )}

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Results;