import { Download, Key, Terminal, Zap } from "lucide-react";
import React from "react";
import SectionHeader from "../utils/sectionHeader";
import { motion } from "framer-motion";

const QuickStart = () => {
  const steps = [
    {
      id: "01",
      title: "Install the SDK",
      desc: "Add the core package and chain definitions to your project.",
      icon: Download,
      code: "npm install @blockdag-aa/core @blockdag-aa/chains",
    },
    {
      id: "02",
      title: "Initialize Client",
      desc: "Set up the client with your API key.",
      icon: Key,
      code: `import { createBlockDAGClient } from '@blockdag-aa/core';
import { blockDAGMainnet } from '@blockdag-aa/chains';

const client = await createBlockDAGClient({
  chain: blockDAGMainnet,
  apiKey: process.env.API_KEY,
});`,
    },
    {
      id: "03",
      title: "Send Transaction",
      desc: "Execute your first parallel UserOperation.",
      icon: Zap,
      code: `const hash = await client.sendUserOperation({
  target: "0xContract...",
  data: encodeFunctionData({ ... }),
});`,
    },
  ];

  return (
    <section id="quickstart" className="py-16 md:py-24 bg-[#0c0c0c] relative">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Get Started in Minutes"
          subtitle="Three simple steps to supercharge your dApp."
          center={false}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              {/* Connector Line (Desktop only) */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-blue-500/30 to-transparent z-0" />
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#111] border border-white/10 flex items-center justify-center shadow-xl group hover:border-blue-500/50 transition-colors">
                    <step.icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  </div>
                  <div className="font-mono text-3xl md:text-4xl font-bold text-white/5">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 min-h-[2.5rem]">
                  {step.desc}
                </p>

                <div className="flex-grow">
                  <div className="rounded-lg overflow-hidden border border-white/10 bg-[#050505] shadow-inner h-full">
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                      <Terminal size={12} className="text-gray-500" />
                      <span className="text-xs text-gray-500">bash/ts</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-blue-100 whitespace-pre-wrap">
                        {step.code}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickStart;
