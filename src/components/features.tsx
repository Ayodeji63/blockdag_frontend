import React from "react";
import FeatureCard from "./featureCard";
import SectionHeader from "../utils/sectionHeader";
import { Box, Cpu, Layers, Network, Shield, Timer } from "lucide-react";
const Features = () => (
  <section id="features" className="py-16 md:py-24 relative">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader
        title="Built for BlockDAG's Architecture"
        subtitle="Generic SDKs bottleneck BlockDAG's speed. Ours leverages the graph structure for true parallelism."
        center={false}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={Layers}
          title="Parallel Execution"
          desc="Submit multiple UserOperations simultaneously. Our SDK routes them through optimal DAG parents to prevent conflicts."
          metric="3x Faster Confirmation"
          delay={0}
        />
        <FeatureCard
          icon={Cpu}
          title="Mining Rewards Integration"
          desc="Unique to BlockDAG: Pay transaction fees directly using your pending mining rewards without claiming them first."
          metric="Auto-Gas Funding"
          delay={0.1}
        />
        <FeatureCard
          icon={Network}
          title="DAG-Optimized Routing"
          desc="Smart parent block selection algorithm ensures your UserOps are confirmed via the fastest path in the graph."
          metric="Smart Routing"
          delay={0.2}
        />
        <FeatureCard
          icon={Shield}
          title="Social Recovery"
          desc="Let users recover accounts via trusted guardians (friends, devices). No more lost seed phrases or locked funds."
          metric="Never Lose Access"
          delay={0.3}
        />
        <FeatureCard
          icon={Timer}
          title="Session Keys"
          desc="Create temporary, limited-scope keys for games and dApps. Sign once, play for hours without wallet popups."
          metric="Seamless UX"
          delay={0.4}
        />
        <FeatureCard
          icon={Box}
          title="Batch Operations"
          desc="Approve, Swap, and Bridge in a single atomic transaction. Reduce user clicks by 80% and save gas."
          metric="1 Tx = Many Actions"
          delay={0.5}
        />
      </div>
    </div>
  </section>
);

export default Features;
