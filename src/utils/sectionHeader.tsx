import React from "react";
import { motion } from "framer-motion";

const SectionHeader = ({
  title,
  subtitle,
  center = true,
}: {
  title: string;
  subtitle: string;
  center: boolean;
}) => (
  <div className={`mb-12 md:mb-16 ${center ? "text-center" : "text-left"}`}>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 px-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default SectionHeader;
