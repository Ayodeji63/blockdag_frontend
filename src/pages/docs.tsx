import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Zap,
  Terminal,
  Wallet,
  ChevronRight,
  Box,
  Cpu,
  Shield,
  Search,
  Menu,
  X,
  ExternalLink,
  Check,
  Copy,
  Layout,
  Settings,
  HelpCircle,
  FileCode,
  Layers,
  Construction,
} from "lucide-react";

import { NavLink, useNavigate, useParams } from "react-router-dom";

// --- DATA & CONFIGURATION ---

const CONFIG = {
  chainId: 1043,
  rpcMainnet: "https://rpc.awakening.bdagscan.com",
  rpcTestnet: "https://rpc.primordial.bdagscan.com",
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  explorer: "https://bdagscan.com",
  github: "https://github.com/yourusername/blockdag-sdk",
};

const PAGES = [
  { id: "overview", title: "Overview", icon: Layout, category: "General" },
  { id: "quick-start", title: "Quick Start", icon: Zap, category: "General" },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    icon: FileCode,
    category: "Protocol",
  },
  {
    id: "installation",
    title: "Installation",
    icon: Terminal,
    category: "AA SDK",
  },
  {
    id: "create-account",
    title: "Create Smart Account",
    icon: Wallet,
    category: "AA SDK",
  },
  {
    id: "send-transactions",
    title: "Send Transactions",
    icon: ChevronRight,
    category: "AA SDK",
  },
  {
    id: "batch-transactions",
    title: "Batch Transactions",
    icon: Box,
    category: "AA SDK",
  },
  {
    id: "mining-rewards",
    title: "Mining Rewards",
    icon: Cpu,
    category: "AA SDK",
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Settings,
    category: "AA SDK",
  },
  {
    id: "session-keys",
    title: "Session Keys",
    icon: Shield,
    category: "Advanced",
  },
  { id: "faq", title: "FAQ", icon: HelpCircle, category: "Support" },
];

const CODE_SNIPPETS = {
  quickStart: `import { createBlockDAGClient } from 'blockdag-sdk';
import { privateKeyToAccount } from 'viem/accounts';

// 1. Setup the owner (your EOA)
const owner = privateKeyToAccount('0xYOUR_PRIVATE_KEY');

// 2. Initialize the Smart Account Client
// This wraps the BlockDAGLightAccount contracts automatically
const bdagClient = await createBlockDAGClient({
  signer: owner,
  chain: 'mainnet', // or 'testnet'
  apiKey: 'YOUR_API_KEY' // Optional
});

console.log("My Smart Account:", bdagClient.account.address);`,

  solidityInterface: `// BlockDAGLightAccount.sol Interface
interface IBlockDAGLightAccount {
    // Execute a single call
    function execute(address dest, uint256 value, bytes calldata func) external;
    
    // Execute multiple calls (Atomic Batch)
    function executeBatch(address[] calldata dest, uint256[] calldata value, bytes[] calldata func) external;
    
    // Deposit rewards for gas or staking
    function depositMiningRewards() external payable;
    
    // Get nonce for parallel execution (2D Nonce)
    function getNonce(uint192 key) external view returns (uint256);
}`,

  factoryInterface: `// BlockDAGLightAccountFactory.sol
// Deploys accounts using CREATE2 for deterministic addresses
function createAccount(address owner, uint256 salt) external returns (BlockDAGLightAccount);

function getAddress(address owner, uint256 salt) public view returns (address);`,

  install: `npm install blockdag-sdk viem`,

  createAccount: `import { createSmartAccount } from 'blockdag-sdk';
import { http } from 'viem';

// The SDK uses BlockDAGLightAccountFactory under the hood
const account = await createSmartAccount({
  signer: owner, 
  transport: http('${CONFIG.rpcMainnet}'),
  entryPoint: '${CONFIG.entryPoint}', 
  salt: 123n // Optional salt for address generation
});`,

  sendTx: `const hash = await bdagClient.sendUserOperation({
  target: '0xRecipientAddress',
  value: parseEther('10'), // Sending 10 BDAG
  data: '0x'
});

await bdagClient.waitForUserOperationTransaction(hash);`,

  batch: `// This calls BlockDAGLightAccount.executeBatch()
const hash = await bdagClient.sendBatchUserOperation([
  {
    target: tokenAddress,
    data: encodeFunctionData({ ...approveAbi... })
  },
  {
    target: swapContract,
    data: encodeFunctionData({ ...swapAbi... })
  }
]);`,

  mining: `// Interacts with miningRewardsBalance mapping
const balance = await bdagClient.mining.getRewardsBalance();

// Calls depositMiningRewards() on the smart account
const tx = await bdagClient.mining.depositRewards({
  value: parseEther('100')
});`,
};

// --- COMPONENTS ---

const CodeBlock = ({ code, lang = "typescript" }: { code: any; lang: any }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (str: any) => {
    return str.split("\n").map((line: string, i: number) => (
      <div key={i} className="table-row">
        <span className="table-cell text-right pr-4 select-none text-slate-700 w-8 text-xs">
          {i + 1}
        </span>
        <span className="table-cell">
          {line
            .split(
              /(\/\/.*$|'.*'|".*"|\b(?:const|await|import|from|return|async|function|interface|external|public|view|returns|address|uint256|bytes|calldata|payable)\b)/g
            )
            .map((part, j) => {
              if (part.trim().startsWith("//"))
                return (
                  <span key={j} className="text-slate-500 italic">
                    {part}
                  </span>
                );
              if (part.match(/^'.*'$/) || part.match(/^".*"$/))
                return (
                  <span key={j} className="text-emerald-400">
                    {part}
                  </span>
                );
              if (
                [
                  "const",
                  "await",
                  "import",
                  "from",
                  "return",
                  "async",
                  "function",
                  "interface",
                  "external",
                  "public",
                  "view",
                  "returns",
                  "address",
                  "uint256",
                  "bytes",
                  "calldata",
                  "payable",
                ].includes(part)
              )
                return (
                  <span key={j} className="text-purple-400 font-medium">
                    {part}
                  </span>
                );
              return (
                <span key={j} className="text-slate-200">
                  {part}
                </span>
              );
            })}
        </span>
      </div>
    ));
  };

  return (
    <div className="relative group my-6 rounded-lg overflow-hidden border border-slate-800 bg-[#0F111A] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-[#151725] border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30"></div>
        </div>
        <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">
          {lang}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={14} className="text-emerald-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed bg-[#0B0C15]/50">
        {highlightCode(code)}
      </div>
    </div>
  );
};

const ComingSoon = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-[#151725]/50">
    <div className="p-4 bg-slate-800/50 rounded-full mb-6">
      <Construction size={48} className="text-sky-400" />
    </div>
    <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
    <p className="text-slate-400 max-w-md mx-auto">
      We are currently finalizing the documentation for this section. Check back
      in v1.1.0 for updates.
    </p>
  </div>
);

const Sidebar = ({
  currentPage,
  setCurrentPage,
  isOpen,
  setIsOpen,
}: {
  currentPage: any;
  setCurrentPage: any;
  isOpen: any;
  setIsOpen: any;
}) => {
  // Group pages by category
  const groupedPages = PAGES.reduce<Record<string, (typeof PAGES)[number][]>>(
    (acc, page) => {
      if (!acc[page.category]) acc[page.category] = [];
      acc[page.category].push(page);
      return acc;
    },
    {} as Record<string, (typeof PAGES)[number][]>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
        fixed top-16 bottom-0 left-0 z-40 w-72 bg-[#0B0C15] border-r border-slate-800 
        transform transition-transform duration-300 
        lg:translate-x-0 lg:fixed lg:top-16 lg:bottom-0 lg:h-[calc(100vh-4rem)] 
        lg:overflow-y-auto custom-scrollbar
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="sticky top-0 bg-[#0B0C15] z-10 p-6 pb-2">
          <div className="relative group">
            <Search
              className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-sky-400 transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search docs..."
              className="w-full bg-[#151725] border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/20 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <nav className="px-3 pb-12 space-y-6 mt-4">
          {Object.entries(groupedPages).map(([category, pages]) => (
            <div key={category}>
              <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {category}
              </h3>
              <div className="space-y-0.5">
                {pages.map((page) => (
                  <div
                    className={`
                      w-full flex cursor-pointer items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group text-left
                      ${
                        currentPage === page.id
                          ? "bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20"
                          : "text-slate-400 hover:text-slate-100 hover:bg-[#151725]"
                      }
                    `}
                    onClick={() => {
                      setCurrentPage(page.id), console.log(page);
                    }}
                  >
                    <page.icon
                      size={18}
                      className={`transition-colors shrink-0 ${
                        currentPage === page.id
                          ? "text-sky-400"
                          : "text-slate-600 group-hover:text-slate-400"
                      }`}
                    />
                    {page.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

// --- CONTENT PAGES ---

const OverviewPage = ({ setPage }: { setPage: any }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-bold tracking-wider text-sky-400 uppercase bg-sky-500/10 rounded-full border border-sky-500/20 animate-pulse">
      <span className="w-2 h-2 rounded-full bg-sky-400"></span>
      Awakening Mainnet Live
    </div> */}
    <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
      Build the future on <br className="hidden md:block" />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
        BlockDAG Network
      </span>
    </h1>
    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
      The professional TypeScript SDK for ERC-4337 Account Abstraction on Chain
      ID {CONFIG.chainId}. Powered by the <code>BlockDAGLightAccount</code>{" "}
      smart contracts.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => setPage("quick-start")}
        className="inline-flex items-center justify-center px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-sky-900/20 hover:scale-[1.02] active:scale-[0.98]"
      >
        Start Building <ChevronRight className="ml-2" size={20} />
      </button>
      <button
        onClick={() => setPage("smart-contracts")}
        className="inline-flex items-center justify-center px-8 py-4 bg-[#151725] hover:bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl transition-all hover:border-slate-600"
      >
        View Contracts
      </button>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-[#151725]/50 border border-slate-800/50 rounded-2xl">
        <Zap className="text-yellow-400 mb-4" size={32} />
        <h3 className="text-white font-bold text-lg mb-2">High Throughput</h3>
        <p className="text-slate-400 text-sm">
          Optimized for BlockDAG's parallel execution capabilities.
        </p>
      </div>
      <div className="p-6 bg-[#151725]/50 border border-slate-800/50 rounded-2xl">
        <Shield className="text-sky-400 mb-4" size={32} />
        <h3 className="text-white font-bold text-lg mb-2">ERC-4337 Native</h3>
        <p className="text-slate-400 text-sm">
          Built-in account abstraction support without trusted relays.
        </p>
      </div>
      <div className="p-6 bg-[#151725]/50 border border-slate-800/50 rounded-2xl">
        <Cpu className="text-purple-400 mb-4" size={32} />
        <h3 className="text-white font-bold text-lg mb-2">Mining Rewards</h3>
        <p className="text-slate-400 text-sm">
          First-class support for participating in consensus.
        </p>
      </div>
    </div>
  </div>
);

const QuickStartPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Quick Start</h1>
    <p className="text-lg text-slate-400 leading-relaxed mb-8">
      Initialize a Smart Account in under 30 seconds. The SDK handles all the
      complexity of the UserOperation loop and contract deployment.
    </p>
    <CodeBlock code={CODE_SNIPPETS.quickStart} lang={undefined} />
    <div className="bg-sky-500/10 border-l-4 border-sky-500 p-4 mt-6 rounded-r-lg">
      <p className="text-sm text-sky-200">
        <strong>Tip:</strong> You do not need to deploy the contract manually.
        The SDK uses a "Counterfactual Address" which allows you to receive
        funds before the account is deployed.
      </p>
    </div>
  </div>
);

const SmartContractsPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Smart Contracts</h1>
    <p className="text-slate-400 mb-8">
      The SDK interacts with two primary contracts deployed on the BlockDAG
      network. These contracts are optimized for high-throughput and parallel
      execution using a 2D nonce mechanism.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="p-6 bg-[#151725] rounded-xl border border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Layers size={20} />
          </div>
          <h3 className="text-white font-bold">Light Account</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          <code>BlockDAGLightAccount.sol</code>
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
          <li>BaseAccount implementation</li>
          <li>Parallel execution via 2D Nonces</li>
          <li>Native mining rewards support</li>
          <li>Batch execution enabled</li>
        </ul>
      </div>

      <div className="p-6 bg-[#151725] rounded-xl border border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
            <Cpu size={20} />
          </div>
          <h3 className="text-white font-bold">Factory</h3>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          <code>BlockDAGLightAccountFactory.sol</code>
        </p>
        <ul className="text-sm text-slate-400 space-y-2 list-disc list-inside">
          <li>Deterministic Deployment (CREATE2)</li>
          <li>ERC-1967 Proxy pattern</li>
          <li>Gas-efficient instantiation</li>
          <li>Salt-based address derivation</li>
        </ul>
      </div>
    </div>

    <p className="text-slate-400 mb-2 font-medium">Light Account Interface:</p>
    <CodeBlock code={CODE_SNIPPETS.solidityInterface} lang="solidity" />

    <p className="text-slate-400 mb-2 font-medium mt-6">Factory Interface:</p>
    <CodeBlock code={CODE_SNIPPETS.factoryInterface} lang="solidity" />
  </div>
);

const InstallationPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Installation</h1>
    <p className="text-slate-400 mb-8">
      Install the SDK and its peer dependency, viem.
    </p>
    <div className="grid grid-cols-1 gap-4">
      <div className="p-5 bg-[#151725] rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold flex items-center gap-2">
            <Terminal
              size={18}
              className="text-slate-500 group-hover:text-sky-400 transition-colors"
            />{" "}
            NPM
          </h4>
        </div>
        <code className="text-sky-400 font-mono text-sm block bg-black/30 p-3 rounded-lg border border-white/5">
          {CODE_SNIPPETS.install}
        </code>
      </div>
      <div className="p-5 bg-[#151725] rounded-xl border border-slate-800 hover:border-slate-700 transition-colors group">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-white font-semibold flex items-center gap-2">
            <Box
              size={18}
              className="text-slate-500 group-hover:text-purple-400 transition-colors"
            />{" "}
            Yarn
          </h4>
        </div>
        <code className="text-purple-400 font-mono text-sm block bg-black/30 p-3 rounded-lg border border-white/5">
          yarn add blockdag-sdk viem
        </code>
      </div>
    </div>
  </div>
);

const CreateAccountPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Create Smart Account</h1>
    <p className="text-slate-400 mb-6">
      BlockDAG uses the <code>BlockDAGLightAccountFactory</code> to deploy
      accounts. This ensures you can generate your address <i>before</i> you pay
      any gas (Counterfactual deployment).
    </p>
    <CodeBlock code={CODE_SNIPPETS.createAccount} lang={undefined} />
  </div>
);

const SendTxPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Send Transactions</h1>
    <p className="text-slate-400 mb-6">
      Sending basic transactions is as simple as defining a target and value.
      The SDK manages the <code>UserOperation</code> signing automatically.
    </p>
    <CodeBlock code={CODE_SNIPPETS.sendTx} lang={undefined} />
  </div>
);

const BatchTxPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Batch Transactions</h1>
    <p className="text-slate-400 mb-6">
      The <code>BlockDAGLightAccount</code> supports atomic batch execution.
      This saves gas and improves UX by bundling approve+swap or multiple
      transfers into a single signature.
    </p>
    <CodeBlock code={CODE_SNIPPETS.batch} lang={undefined} />
  </div>
);

const MiningRewardsPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Mining Rewards</h1>
    <div className="bg-gradient-to-br from-indigo-900/40 to-sky-900/20 p-8 rounded-2xl border border-indigo-500/30 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 blur-3xl rounded-full"></div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Cpu className="text-indigo-400" /> Native Mining Integration
        </h3>
        <p className="text-sm text-slate-300 max-w-xl">
          Unique to Chain ID 1043, Smart Accounts can participate in the
          consensus mechanism directly via delegation. The{" "}
          <code>miningRewardsBalance</code> state variable tracks your accrued
          rewards.
        </p>
      </div>
    </div>
    <CodeBlock code={CODE_SNIPPETS.mining} lang={undefined} />
  </div>
);

const ConfigPage = () => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <h1 className="text-3xl font-bold text-white mb-6">Configuration</h1>
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#151725]">
      <table className="w-full text-left min-w-[500px]">
        <thead className="bg-[#0f111a]">
          <tr className="text-slate-400 text-xs uppercase tracking-wider">
            <th className="py-4 px-6 font-medium border-b border-slate-800">
              Parameter
            </th>
            <th className="py-4 px-6 font-medium border-b border-slate-800">
              Mainnet (Awakening)
            </th>
            <th className="py-4 px-6 font-medium border-b border-slate-800">
              Testnet (Primordial)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50 text-sm font-mono text-slate-300">
          <tr>
            <td className="py-4 px-6 text-slate-500">Chain ID</td>
            <td className="py-4 px-6 text-sky-400 font-bold">
              {CONFIG.chainId}
            </td>
            <td className="py-4 px-6 text-sky-400">10431</td>
          </tr>
          <tr>
            <td className="py-4 px-6 text-slate-500">RPC URL</td>
            <td className="py-4 px-6">{CONFIG.rpcMainnet}</td>
            <td className="py-4 px-6">{CONFIG.rpcTestnet}</td>
          </tr>
          <tr>
            <td className="py-4 px-6 text-slate-500">Explorer</td>
            <td className="py-4 px-6 text-indigo-300 underline underline-offset-4 decoration-indigo-500/30">
              bdagscan.com
            </td>
            <td className="py-4 px-6 text-indigo-300 underline underline-offset-4 decoration-indigo-500/30">
              testnet.bdagscan.com
            </td>
          </tr>
          <tr>
            <td className="py-4 px-6 text-slate-500">EntryPoint</td>
            <td
              colSpan={2}
              className="py-4 px-6 text-slate-400 break-all bg-black/20"
            >
              {CONFIG.entryPoint}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN APP ---

export default function DocsPage() {
  const params = useParams();
  const paramPage = params.pageId;
  const router = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(paramPage ?? "overview");

  useEffect(() => {
    setCurrentPage(paramPage ?? "overview");
  }, [paramPage]);

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return <OverviewPage setPage={setCurrentPage} />;
      case "quick-start":
        return <QuickStartPage />;
      case "smart-contracts":
        return <SmartContractsPage />;
      case "installation":
        return <InstallationPage />;
      case "create-account":
        return <CreateAccountPage />;
      case "send-transactions":
        return <SendTxPage />;
      case "batch-transactions":
        return <BatchTxPage />;
      case "mining-rewards":
        return <MiningRewardsPage />;
      case "configuration":
        return <ConfigPage />;
      case "session-keys":
        return <ComingSoon />;
      case "faq":
        return <ComingSoon />;
      default:
        return <OverviewPage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] text-slate-300 font-sans selection:bg-sky-500/30 selection:text-white">
      {/* Scrollbar styles injected directly */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0B0C15;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #1e293b;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #334155;
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0B0C15]/80 backdrop-blur-xl border-b border-slate-800 h-16 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setCurrentPage("overview")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-900/20">
              <span className="text-white font-bold font-mono text-lg">B</span>
            </div>
            <span
              className="font-bold text-lg text-white tracking-tight hidden sm:inline-block"
              onClick={() => router("/")}
            >
              BlockDAG <span className="text-slate-500 font-medium">SDK</span>
            </span>
            {/* <span className="text-[10px] font-bold bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full border border-slate-700 ml-2">
              v1.0.4
            </span> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={CONFIG.explorer}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
          >
            <ExternalLink size={16} /> Explorer
          </a>
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-slate-100 text-[#0B0C15] px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-all shadow-lg shadow-white/5"
          >
            GitHub
          </a>
        </div>
      </nav>

      <div className="flex pt-16">
        <Sidebar
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl mx-auto px-6 lg:px-12 py-12 pb-32 overflow-x-hidden lg:ml-72">
          {renderContent()}

          <footer className="mt-32 pt-12 border-t border-slate-800 text-center">
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-white transition-colors"
              >
                Discord
              </a>
            </div>
            <p className="text-slate-600 text-sm mb-4">
              © 2025 BlockDAG SDK. Released under MIT License.
            </p>
            <p className="text-slate-700 text-xs">
              Not financial advice. Use at your own risk.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
