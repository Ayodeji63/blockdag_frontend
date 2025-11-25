import React from "react";
import SectionHeader from "../utils/sectionHeader";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Cpu, Network, Lock } from "lucide-react";

const Architecture = () => (
  <section
    id="architecture"
    className="py-16 md:py-32 overflow-hidden relative"
  >
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
    <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
      <SectionHeader title="How It Works" subtitle={""} center={false} />

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden md:block" />

        <div className="space-y-12 md:space-y-16">
          {/* Layer 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/10 p-6 rounded-xl max-w-md mx-auto text-center relative z-10"
          >
            <div className="font-mono text-blue-400 text-xs mb-2 uppercase tracking-wider">
              Application Layer
            </div>
            <h3 className="font-bold text-lg md:text-xl text-white">
              Your dApp (React, Vue)
            </h3>
            <div className="mt-4 flex justify-center gap-2">
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                User Action
              </span>
              <span className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                Intent
              </span>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center py-2 md:py-4">
            <ArrowRight className="rotate-90 text-blue-500/50" />
          </div>

          {/* Layer 2 - The SDK */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] border border-blue-500/30 p-6 md:p-8 rounded-2xl max-w-3xl mx-auto text-center shadow-[0_0_50px_rgba(59,130,246,0.1)] relative z-10"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              BlockDAG AA-SDK
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors">
                <h4 className="text-white font-semibold mb-1 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Cpu size={16} className="text-blue-400" /> Parallel Executor
                </h4>
                <p className="text-xs text-gray-500">
                  Splits batches into DAG-compatible ops
                </p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-purple-500/50 transition-colors">
                <h4 className="text-white font-semibold mb-1 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Zap size={16} className="text-purple-400" /> Gas Manager
                </h4>
                <p className="text-xs text-gray-500">
                  Paymasters & Mining Rewards
                </p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-green-500/50 transition-colors">
                <h4 className="text-white font-semibold mb-1 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Lock size={16} className="text-green-400" /> Signer Logic
                </h4>
                <p className="text-xs text-gray-500">
                  Passkeys, Session Keys, EOA
                </p>
              </div>
              <div className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-orange-500/50 transition-colors">
                <h4 className="text-white font-semibold mb-1 flex items-center justify-center gap-2 text-sm md:text-base">
                  <Network size={16} className="text-orange-400" /> DAG Router
                </h4>
                <p className="text-xs text-gray-500">
                  Optimal Parent Selection
                </p>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex justify-center py-2 md:py-4">
            <ArrowRight className="rotate-90 text-blue-500/50" />
          </div>

          {/* Layer 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-white/10 p-6 rounded-xl max-w-md mx-auto text-center relative z-10"
          >
            <div className="font-mono text-purple-400 text-xs mb-2 uppercase tracking-wider">
              Network Layer
            </div>
            <h3 className="font-bold text-lg md:text-xl text-white">
              BlockDAG Network
            </h3>
            <div className="mt-4 flex justify-center gap-4 text-xs md:text-sm text-gray-500">
              <span>⚡ Instant Finality</span>
              <span>⛓️ Parallel Blocks</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default Architecture;
