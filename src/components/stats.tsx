import { Activity, Layers, Server, Zap } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const Stats = () => (
  <section className="py-12 md:py-16 border-y border-white/5 bg-[#0a0a0a]">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { label: "Faster Execution", val: "3x", icon: Zap },
          { label: "Gas Fees (Sponsored)", val: "$0", icon: Activity },
          { label: "Uptime", val: "100%", icon: Server },
          { label: "Account Types", val: "5+", icon: Layers },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="flex justify-center mb-3 text-gray-600 group-hover:text-blue-500 transition-colors">
              <stat.icon size={24} />
            </div>
            <div className="text-3xl md:text-5xl font-bold text-white mb-1">
              {stat.val}
            </div>
            <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default Stats;
