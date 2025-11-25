import { Activity } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  metric,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  metric: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{title}</h3>
    <p className="text-gray-400 mb-4 leading-relaxed text-sm relative z-10">
      {desc}
    </p>
    <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full relative z-10">
      <Activity className="w-3 h-3" />
      {metric}
    </div>
  </motion.div>
);

export default FeatureCard;
