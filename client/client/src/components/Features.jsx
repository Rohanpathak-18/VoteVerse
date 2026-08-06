import { motion } from "framer-motion";
import {
  ShieldCheck,
  BarChart3,
  Vote,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Voting",
    description:
      "Advanced authentication and encrypted voting ensure every vote is protected.",
    color: "text-blue-600",
  },
  {
    icon: Vote,
    title: "One Person, One Vote",
    description:
      "Each registered voter can cast only one vote, ensuring a fair election.",
    color: "text-green-600",
  },
  {
    icon: BarChart3,
    title: "Live Results",
    description:
      "Watch election results update instantly after votes are counted.",
    color: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "VoteVerse works seamlessly on desktop, tablet, and mobile devices.",
    color: "text-orange-500",
  },
];

function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="font-semibold uppercase tracking-wider text-blue-600">
            Why Choose VoteVerse?
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            Built for Modern Elections
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            VoteVerse combines security, speed, transparency, and simplicity to
            deliver a modern digital voting experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg transition hover:shadow-2xl"
              >
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 ${feature.color}`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;