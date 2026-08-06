import { motion } from "framer-motion";
import CandidateCard from "./CandidateCard";

const candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    party: "Future Party",
  },
  {
    id: 2,
    name: "Priya Singh",
    party: "People's Alliance",
  },
  {
    id: 3,
    name: "Amit Verma",
    party: "National Vision",
  },
];

function Candidates() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold">
            Meet Our Candidates
          </h2>

          <p className="mt-4 text-gray-500">
            Choose your preferred candidate and cast your vote securely.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Candidates;