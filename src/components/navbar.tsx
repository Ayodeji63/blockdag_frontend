import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { href } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navs = [
    {
      id: 1,
      text: "Features",
      href: "#features",
    },
    {
      id: 2,
      text: "Camparison",
      href: "#comparison",
    },
    {
      id: 3,
      text: "Roadmap",
      href: "#roadmap",
    },
    {
      id: 4,
      text: "Documentation",
      href: "/docs",
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-white/10 py-3"
          : "bg-transparent border-transparent py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
            B
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-white">
            BlockDAG <span className="text-blue-400">AA-SDK</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {navs.map((item) => (
            <a
              key={item.id}
              href={`${item.href.toLowerCase()}`}
              className="hover:text-white transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:shadow-white/20"
            >
              {item.text}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(182,33,254,0.3)] transition-all transform hover:scale-105 font-semibold">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-[#0a0a0a] border-b border-white/10 md:hidden absolute w-full"
          >
            <div className="flex flex-col p-6 gap-4">
              {navs.map((item) => (
                <a
                  key={item.id}
                  href={`${item.href.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 py-3 text-lg border-b border-white/5"
                >
                  {item.text}
                </a>
              ))}
              <button className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white mt-2">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
