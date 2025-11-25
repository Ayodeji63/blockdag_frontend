import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  Zap,
  Shield,
  Layers,
  Code2,
  GitBranch,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Copy,
  Terminal,
  Cpu,
  Network,
  MousePointer2,
  Star,
  Menu,
  X,
  Box,
  Lock,
  Timer,
  ChevronRight,
  Activity,
  Globe,
  Server,
  FileText,
  MessageSquare,
  Github,
  Twitter,
  Rocket,
  Smartphone,
  Download,
  Key,
} from "lucide-react";
import SectionHeader from "./utils/sectionHeader";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Features from "./components/features";
import ProblemSolution from "./components/problemSolution";
import CodeComparison from "./components/codeComparison";
import Architecture from "./components/architecture";
import Stats from "./components/stats";
import QuickStart from "./components/quickStart";
import { comingSoon } from "./utils/comingSoon";
import { Routes, Route } from "react-router-dom";
import DocsPage from "./pages/docs";

// --- Section Components ---

const Roadmap = () => {
  const milestones = [
    {
      id: 1,
      period: "Q1 2026",
      title: "Core SDK Beta",
      description:
        "Launch of the core Typescript SDK with basic account abstraction features.",
      status: "in-progress",
      icon: Rocket,
    },
    {
      id: 2,
      period: "Q2 2026",
      title: "React Native Support",
      description:
        "Native bindings for iOS and Android. Pre-built UI kits for mobile wallets.",
      status: "upcoming",
      icon: Smartphone,
    },
    {
      id: 3,
      period: "Q3 2026",
      title: "Modular Plugin System",
      description: "Plugin architecture for spending limits and auto-payments.",
      status: "upcoming",
      icon: Box,
    },
    {
      id: 4,
      period: "Q4 2026",
      title: "Advanced Gas & Multi-chain",
      description:
        "AI-driven gas optimization and expansion to other DAG networks.",
      status: "upcoming",
      icon: Zap,
    },
  ];

  return (
    <section id="roadmap" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          title="Roadmap"
          subtitle="Our journey to redefine blockchain interaction."
          center={false}
        />

        <div className="relative pl-4 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-transparent" />

          <div className="space-y-12">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              const isCompleted = item.status === "completed";
              const isInProgress = item.status === "in-progress";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row gap-6 md:gap-16 relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div
                    className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#0a0a0a] z-10 mt-1.5
                            bg-gray-800 box-content
                           "
                  >
                    <div
                      className={`w-full h-full rounded-full ${
                        isCompleted
                          ? "bg-green-500"
                          : isInProgress
                          ? "bg-blue-500 animate-pulse"
                          : "bg-gray-600"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider px-2 py-1 rounded ${
                        isCompleted
                          ? "bg-green-500/10 text-green-400"
                          : isInProgress
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-gray-800 text-gray-400"
                      } ${isEven ? "md:flex-row-reverse" : ""}`}
                    >
                      {item.status === "completed" && (
                        <CheckCircle2 size={12} />
                      )}
                      {item.status === "in-progress" && (
                        <Activity size={12} className="animate-spin-slow" />
                      )}
                      {item.status === "upcoming" && <Timer size={12} />}
                      {item.period}
                    </div>

                    <h3
                      className={`text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          isInProgress ? "text-blue-400" : "text-gray-500"
                        }`}
                      />
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side on desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const DocsGrid = () => (
  <section id="docs" className="py-16 md:py-24">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader
        title="Everything You Need"
        subtitle="Comprehensive resources to help you build better dApps."
        center={false}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Getting Started",
            desc: "Installation, setup, and your first transaction.",
            icon: FileText,
          },
          {
            title: "API Reference",
            desc: "Detailed documentation for all SDK methods.",
            icon: Code2,
          },
          {
            title: "Tutorials",
            desc: "Step-by-step guides for common use cases.",
            icon: Terminal,
          },
          {
            title: "Examples",
            desc: "Production-ready code snippets.",
            icon: Globe,
          },
          {
            title: "Migration Guide",
            desc: "Moving from other AA SDKs? Start here.",
            icon: GitBranch,
          },
          {
            title: "FAQ",
            desc: "Common questions about BlockDAG AA.",
            icon: MessageSquare,
          },
        ].map((doc, i) => (
          <motion.a
            // href="#"
            key={i}
            whileHover={{ y: -5 }}
            className="block p-6 rounded-xl bg-[#111] border cursor-pointer border-white/10 hover:border-blue-500/50 group transition-all"
            onClick={() => comingSoon()}
          >
            <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
              <doc.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {doc.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">{doc.desc}</p>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 py-12 bg-[#050505] relative overflow-hidden">
    {/* Background Glow */}
    <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
              B
            </div>
            <span className="text-xl font-bold text-white">
              BlockDAG AA-SDK
            </span>
          </div>
          <p className="text-gray-500 mb-6 max-w-xs">
            Empowering developers to build the next generation of UX-focused
            dApps on the BlockDAG network.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-gray-400"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all text-gray-400"
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all text-gray-400"
            >
              <MessageSquare size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                API Reference
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Examples
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Community
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Project</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                BlockDAG Network
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                GitHub Repo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                NPM Package
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400 transition-colors">
                Brand Assets
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <div className="text-center md:text-left">
          © 2025 BlockDAG AA-SDK. Open Source (MIT).
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gray-300">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const ComparisonTable = () => {
  const features = [
    {
      name: "Native BlockDAG Support",
      us: true,
      others: false,
      label: "Optimized",
    },
    { name: "Parallel Execution", us: true, others: false, label: "Fast" },
    {
      name: "Mining Rewards Integration",
      us: true,
      others: false,
      label: "Unique",
    },
    { name: "Gasless Transactions", us: true, others: true },
    { name: "Social Recovery", us: true, others: true },
    { name: "DAG-Optimized Routing", us: true, others: false },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Why Choose BlockDAG AA-SDK?"
          subtitle=""
          center={false}
        />
        <div className="overflow-x-auto rounded-xl border border-white/10 shadow-2xl">
          <table className="w-full bg-[#111] min-w-[600px]">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="text-left py-5 px-6 text-gray-400 font-medium w-1/2">
                  Feature
                </th>
                <th className="text-center py-5 px-6 text-white font-bold text-lg bg-blue-900/10 w-1/4 border-x border-white/5">
                  BlockDAG AA
                </th>
                <th className="text-center py-5 px-6 text-gray-500 w-1/4">
                  Others
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {features.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 px-6 text-gray-300 group-hover:text-white transition-colors flex items-center gap-2">
                    {row.name}
                    {row.label && (
                      <span className="text-[10px] uppercase bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                        {row.label}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center bg-blue-900/5 border-x border-white/5">
                    {row.us && (
                      <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.others ? (
                      <CheckCircle2 className="w-5 h-5 text-gray-600 mx-auto" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-800 mx-auto" />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// --- Main App Component ---

export default function Index() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <Navbar />

      <main>
        <Hero />
        <ProblemSolution />
        <CodeComparison />
        <Features />
        <ComparisonTable />
        <Architecture />
        <Stats />
        <QuickStart />
        <Roadmap />
        <DocsGrid />

        {/* CTA Section */}
        <section className="py-16 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.h2
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="text-3xl md:text-6xl font-bold mb-8 text-white"
            >
              Ready to build the future?
            </motion.h2>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 md:p-4 px-4 md:px-6 rounded-lg border border-white/10 font-mono text-xs md:text-base shadow-xl max-w-full overflow-hidden">
                <ChevronRight className="text-purple-400 w-4 h-4 shrink-0" />
                <span className="text-gray-300">npm install</span>
                <span className="text-white truncate">@blockdag-aa/core</span>
                <button className="ml-2 md:ml-4 text-gray-500 hover:text-white transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <button
                  className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] w-full sm:w-auto cursor-pointer "
                  onClick={() => comingSoon()}
                >
                  Read Documentation
                </button>
                <button
                  className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-500 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.5)] w-full sm:w-auto cursor-pointer"
                  onClick={() => comingSoon()}
                >
                  Join Discord
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
