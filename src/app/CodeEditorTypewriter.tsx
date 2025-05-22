import React, { useEffect, useState, useRef } from "react";
import { Highlight, themes } from "prism-react-renderer";
import { Copy } from "lucide-react";

interface CodeEditorTypewriterProps {
  onRun?: () => void;
  output?: string | null;
  disabled?: boolean;
}

const codeSnippet = `function smartScheduleDay(meetings, tasks) {
  // 9am-6pm, 9 slots
  const slots = Array(9).fill(null);
  // Place meetings
  meetings.forEach(m => {
    for (let h = m.start; h < m.end; h++) {
      const idx = h - 9;
      if (idx >= 0 && idx < 9) slots[idx] = { type: 'meeting', label: 'Meeting' };
    }
  });
  // Sort tasks by urgency (highest first)
  const sortedTasks = [...tasks].sort((a, b) => b.urgency - a.urgency);
  let slotIdx = 0;
  let scheduled = [];
  let overflow = [];
  for (const task of sortedTasks) {
    // Find next free slot
    while (slotIdx < 9 && slots[slotIdx]) slotIdx++;
    if (slotIdx < 9) {
      slots[slotIdx] = { type: 'task', label: task.name, urgency: task.urgency };
      scheduled.push({ ...task, scheduledFor: 'today' });
      slotIdx++;
    } else {
      // Increase urgency for tomorrow
      overflow.push({ ...task, urgency: Math.min(5, task.urgency + 1), scheduledFor: 'tomorrow' });
    }
  }
  return { slots, scheduled, overflow };
}`;

const editorBg = "bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-cyan-400/60 shadow-2xl";
const editorHeader = "flex items-center px-4 py-2 bg-slate-900/80 border-b border-cyan-400/20 rounded-t-lg relative z-10";
const dot = "w-3 h-3 rounded-full mr-2";
const statusBar = "flex items-center justify-between px-4 py-1 bg-slate-900/80 border-t border-cyan-400/20 text-xs text-cyan-300 font-mono rounded-b-lg";

export default function CodeEditorTypewriter({ onRun, output, disabled }: CodeEditorTypewriterProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([""]);
  const [done, setDone] = useState(false);
  const [localOutput, setLocalOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [cursor, setCursor] = useState<{ line: number; col: number }>({ line: 0, col: 0 });
  const codeLines = codeSnippet.split("\n");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animate line-by-line, then char-by-char per line
  useEffect(() => {
    let line = 0;
    let col = 0;
    setDisplayedLines([""]);
    setCursor({ line: 0, col: 0 });
    setDone(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayedLines((prev) => {
        const newLines = [...prev];
        if (line < codeLines.length) {
          if (!newLines[line]) newLines[line] = "";
          newLines[line] = codeLines[line].slice(0, col + 1);
        }
        return newLines;
      });
      setCursor({ line, col: col + 1 });
      col++;
      if (col > codeLines[line].length) {
        line++;
        col = 0;
        if (line < codeLines.length) {
          setDisplayedLines((prev) => [...prev, ""]);
        }
      }
      if (line === codeLines.length) {
        setDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 5); // Faster typewriter effect
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  // For standalone use, fallback to local output
  const handleRun = () => {
    if (onRun) {
      onRun();
    } else {
      setLocalOutput("(output would appear here)");
    }
  };

  // Calculate status bar info
  const lastLine = Math.min(cursor.line, codeLines.length - 1);
  const lastCol = cursor.col > codeLines[lastLine]?.length ? codeLines[lastLine]?.length : cursor.col;

  return (
    <div className="flex flex-col items-center w-full">
      <div className={`w-full max-w-xl rounded-lg overflow-hidden relative ${editorBg} shadow-2xl border-2 border-cyan-400/40`} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.98rem', boxShadow: '0 0 32px 4px #06b6d4, 0 0 0 1px #0ff3, 0 2px 16px #0ff3' }}>
        {/* Animated grid/circuit background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.08 }}>
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="32" height="32" fill="none" stroke="#67e8f9" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Glass/reflection overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(120deg,rgba(255,255,255,0.08) 20%,rgba(0,0,0,0) 60%)', mixBlendMode: 'screen' }} />
        {/* Tab bar */}
        <div className="flex items-center h-9 px-4 bg-slate-900/90 border-b border-cyan-400/20 relative z-20">
          <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
          <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />
          <span className="w-2 h-2 rounded-full bg-green-500 mr-4" />
          <span className="text-xs text-cyan-200 font-mono select-none">smart-schedule.js</span>
          <span className="ml-4 text-xs text-cyan-400/60 select-none bg-cyan-400/10 px-2 py-0.5 rounded">JavaScript</span>
          <button className="ml-auto flex items-center text-cyan-300 hover:text-cyan-100 transition-colors px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400/50" onClick={handleCopy} title="Copy code">
            <Copy className="w-4 h-4 mr-1" />
            <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          </button>
          <button className="ml-2 text-cyan-400/60 hover:text-cyan-200 text-lg font-bold px-2 rounded transition-colors" title="New File (disabled)" disabled>+</button>
        </div>
        {/* Code block */}
        <div className="p-4 text-left whitespace-pre min-h-[320px] bg-transparent relative z-20 overflow-x-auto max-w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
          <Highlight theme={themes.duotoneDark} code={displayedLines.join("\n")} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
              <pre className={className + ' min-w-[340px] md:min-w-0'} style={{ ...style, background: "none", margin: 0, padding: 0 }}>
                {tokens.map((line: any, i: number) => (
                  <div key={i} {...getLineProps({ line })} style={{ position: 'relative' }}>
                    {line.map((token: any, key: number) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                    {/* Blinking cursor at the end of the current line */}
                    {i === cursor.line && !done && (
                      <span className="inline-block animate-pulse text-cyan-200" style={{ width: '1ch' }}>|</span>
                    )}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
        {/* Status bar */}
        <div className={statusBar + " relative z-20 flex-wrap md:flex-nowrap overflow-x-auto max-w-full"}>
          <span>Ln {lastLine + 1}, Col {lastCol + 1}</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>JavaScript</span>
        </div>
      </div>
      <button
        className="mt-4 px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-white rounded-md font-medium transition-all duration-300 shadow-lg disabled:opacity-50 w-full max-w-xl"
        onClick={handleRun}
        disabled={!done || disabled}
      >
        Run Code
      </button>
      {(output || localOutput) && (
        <div className="mt-4 w-full max-w-xl bg-black/80 border border-cyan-400/30 rounded-lg p-4 text-cyan-200 text-lg text-center animate-fade-in overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <span className="font-mono">{output || localOutput}</span>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
