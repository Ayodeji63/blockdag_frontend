import { useState, useEffect } from "react";
import { CheckCircle2, Copy, Terminal } from "lucide-react";

export const CodeWindow = ({
  code,
  title,
  isTyping = false,
  showLineNumbers = true,
  highlightLines = [],
}: {
  code: string;
  title: string;
  isTyping?: boolean;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}) => {
  const [displayCode, setDisplayCode] = useState(isTyping ? "" : code);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      setDisplayCode(code);
      return;
    }
    let i = 0;
    const timer = setInterval(() => {
      setDisplayCode(code.substring(0, i));
      i++;
      if (i > code.length) clearInterval(timer);
    }, 10);
    return () => clearInterval(timer);
  }, [code, isTyping]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightCode = (line: string) => {
    // First, escape any existing HTML
    let processed = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Now apply syntax highlighting in the correct order

    // 1. Highlight strings first (so keywords inside strings won't be highlighted)
    processed = processed.replace(
      /(["'`])((?:\\.|(?!\1).)*?)\1/g,
      '<span class="text-green-400">$&</span>'
    );

    // 2. Highlight comments
    processed = processed.replace(
      /\/\/.*/g,
      '<span class="text-gray-500 italic">$&</span>'
    );

    // 3. Highlight keywords (but not if they're inside our span tags)
    processed = processed.replace(
      /\b(const|await|import|from|export|default|return|async|var|let)\b(?![^<]*<\/span>)/g,
      '<span class="text-purple-400">$1</span>'
    );

    // 4. Highlight function names
    processed = processed.replace(
      /\b(function|class|interface|createBlockDAGClient|sendUserOperation|sendParallelUserOperations|sendTransaction|wait)\b(?![^<]*<\/span>)/g,
      '<span class="text-blue-400">$1</span>'
    );

    // 5. Highlight boolean/null values
    processed = processed.replace(
      /\b(true|false|null|undefined)\b(?![^<]*<\/span>)/g,
      '<span class="text-orange-400">$1</span>'
    );

    return processed;
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-2xl group text-left w-full max-w-[90vw] md:max-w-full mx-auto">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161616] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="ml-3 text-[10px] md:text-xs text-gray-500 font-mono flex items-center gap-2 truncate">
            <Terminal size={12} />
            {title}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-500 hover:text-white transition-colors"
        >
          {copied ? (
            <CheckCircle2 size={14} className="text-green-400" />
          ) : (
            <Copy size={14} />
          )}
        </button>
      </div>
      <div className="p-3 md:p-6 overflow-x-auto custom-scrollbar bg-[#0a0a0a]/50 backdrop-blur-sm">
        <pre className="font-mono text-xs md:text-sm leading-relaxed">
          <code className="text-blue-100 block min-w-max">
            {displayCode.split("\n").map((line, i) => (
              <div
                key={i}
                className={`table-row ${
                  highlightLines.includes(i + 1) ? "bg-blue-500/10" : ""
                }`}
              >
                {showLineNumbers && (
                  <span className="table-cell text-right pr-3 md:pr-4 text-gray-700 select-none w-6 md:w-8">
                    {i + 1}
                  </span>
                )}
                <span
                  className="table-cell"
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(line) || " ",
                  }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};


