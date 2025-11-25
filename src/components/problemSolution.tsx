import React from "react";
import SectionHeader from "../utils/sectionHeader";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const ProblemSolution = () => (
  <section className="py-16 md:py-24 bg-[#0c0c0c] relative border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader
        title="Why BlockDAG Needs AA"
        subtitle="Bridging the gap between raw DAG power and mainstream user experience."
        center={false}
      />

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Problem */}
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: -50, opacity: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-2xl bg-red-950/10 border border-red-500/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <XCircle size={80} className="text-red-500" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-6 flex items-center gap-3">
            <XCircle className="w-6 h-6" /> The Friction
          </h3>
          <ul className="space-y-4">
            {[
              "Users need BDAG tokens just to start",
              "Complex wallet management (Seed phrases)",
              "Single-threaded transaction feel",
              "No batch operations (Approve + Swap = 2 Tx)",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-400 text-sm md:text-base"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Solution */}
        <motion.div
          whileInView={{ x: 0, opacity: 1 }}
          initial={{ x: 50, opacity: 0 }}
          viewport={{ once: true }}
          className="p-6 md:p-8 rounded-2xl bg-green-950/10 border border-green-500/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CheckCircle2 size={80} className="text-green-500" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" /> The Solution
          </h3>
          <ul className="space-y-4">
            {[
              "Gasless transactions via Paymasters",
              "Social recovery & Session keys",
              "Parallel execution on DAG (High Throughput)",
              "Auto-batching UserOperations (One click)",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-300 text-sm md:text-base"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ProblemSolution;
