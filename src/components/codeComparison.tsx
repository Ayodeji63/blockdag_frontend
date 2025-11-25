import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../utils/sectionHeader";
import { CodeWindow } from "../utils/codeWindow";

const CodeComparison = () => (
  <section id="comparison" className="py-16 md:py-24 bg-[#0a0a0a]">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader
        title="From Complex to Simple"
        subtitle={""}
        center={false}
      />

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-red-400 font-mono text-xs mb-3 text-center uppercase tracking-widest">
            Traditional Way
          </div>
          <CodeWindow
            title="Legacy.js"
            code={`// Traditional approach
const tx1 = await wallet.sendTransaction({
  to: nftContract,
  data: mintData,
  value: 0,
  gasLimit: 100000,
});
await tx1.wait();

const tx2 = await wallet.sendTransaction({
  to: tokenContract,
  data: swapData,
});
await tx2.wait();

// ❌ User paid gas twice
// ❌ Waited for 2 blocks`}
            highlightLines={[2, 10]}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl blur opacity-20" />
          <div className="relative">
            <div className="text-green-400 font-mono text-xs mb-3 text-center uppercase tracking-widest">
              BlockDAG AA SDK
            </div>
            <CodeWindow
              title="BlockDAG_AA.ts"
              code={`// BlockDAG AA - single batch
await client.sendParallelUserOperations([
  { target: nftContract, data: mintData },
  { target: tokenContract, data: swapData }
]);

// ✅ Single UserOperation
// ✅ No gas fees (sponsored)
// ✅ Parallel execution
// ✅ 3x faster`}
              highlightLines={[2, 3, 4, 5]}
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
export default CodeComparison;
