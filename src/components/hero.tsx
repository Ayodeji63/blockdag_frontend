import React from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import GradientBlob from "../utils/GradientBlob";
import { ArrowRight, GitBranch, Zap } from "lucide-react";
import { CodeWindow } from "../utils/codeWindow";
import { comingSoon } from "../utils/comingSoon";

const Hero = () => {
  const { scrollY } = useScroll();
  // Disable parallax on mobile to prevent jitter
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const y1 = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -150]);

  return (
    <section className="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden min-h-screen flex items-center">
      <GradientBlob className="top-0 left-[-20%] md:left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20" />
      <GradientBlob className="bottom-0 right-[-20%] md:right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/20" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div
          style={{ y: y1 }}
          className="flex flex-col items-start text-center lg:text-left"
        >
          {/* <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live on BlockDAG Buildathon Wave 2
            </motion.div>
          </div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white"
          >
            Account Abstraction, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 animate-gradient-x">
              Supercharged.
            </span>
            <div></div>
            <span>for BlockDAG</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0"
          >
            The first ERC-4337 SDK built natively for BlockDAG's parallel
            architecture. Integrate gasless transactions, mining rewards, and
            session keys in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
          >
            <button
              className="px-8 py-4 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center cursor-pointer justify-center gap-2 group"
              onClick={() => comingSoon()}
            >
              Get Started{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-lg bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <GitBranch className="w-4 h-4" /> View on GitHub
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative w-full"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse" />
          <CodeWindow
            title="social_login.ts"
            isTyping={true}
            code={`import { createBlockDAGClient } from '@blockdag-aa/core';
import { SocialSigner } from '@blockdag-aa/auth';

// 🚀 Login with Google, Apple, or X
const signer = new SocialSigner({ provider: 'google' });
await signer.authenticate();

const client = await createBlockDAGClient({
  chain: blockDAGMainnet,
  signer: signer, 
});

// ✨ Smart Account ready! No seed phrase needed.
console.log(\`Wallet created: \${client.account.address}\`);`}
          />

          {/* Floating Badge */}
          {/* <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 -right-8 bg-[#1a1a1a] border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Zap className="text-green-400 w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-400">Gas Saved</div>
                <div className="text-lg font-bold text-white">$1,240.50</div>
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
