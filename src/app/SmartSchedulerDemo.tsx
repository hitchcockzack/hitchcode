import React, { useState } from "react";
import CodeEditorTypewriter from "./CodeEditorTypewriter";

const initialMeetings = [
  { start: 10, end: 11 },
  { start: 13, end: 14 },
  { start: 15, end: 16 }
];
const initialTasks = [
  "Call supplier",
  "Send invoices",
  "Plan marketing campaign",
  "Order inventory",
  "Schedule staff meeting"
];

export default function SmartSchedulerDemo() {
  const [output, setOutput] = useState<string | null>(null);
  const [highlightBlock, setHighlightBlock] = useState<{start: number, end: number} | null>(null);
  const [highlightTask, setHighlightTask] = useState<string | null>(null);

  // This function mimics the logic in the code editor
  function getSmartScheduleSuggestion(meetings: {start: number, end: number}[], tasks: string[]) {
    const workStart = 9, workEnd = 18;
    let freeBlocks: {start: number, end: number}[] = [];
    let lastEnd = workStart;
    meetings = meetings.slice().sort((a, b) => a.start - b.start);
    for (const m of meetings) {
      if (m.start > lastEnd) {
        freeBlocks.push({ start: lastEnd, end: m.start });
      }
      lastEnd = Math.max(lastEnd, m.end);
    }
    if (lastEnd < workEnd) freeBlocks.push({ start: lastEnd, end: workEnd });
    const bestBlock = freeBlocks.reduce((a, b) => (b.end-b.start > a.end-a.start ? b : a), {start:0,end:0});
    if (bestBlock.end - bestBlock.start >= 1) {
      const topTask = tasks[0] || "your most important task";
      return {
        suggestion: `You have a ${bestBlock.end-bestBlock.start} hour window at ${bestBlock.start}:00. Block it for: ${topTask}`,
        block: bestBlock,
        task: topTask
      };
    }
    return {
      suggestion: "No large free blocks today. Try batching meetings or delegating tasks.",
      block: null,
      task: null
    };
  }

  const handleRun = () => {
    const result = getSmartScheduleSuggestion(initialMeetings, initialTasks);
    setOutput(result.suggestion);
    setHighlightBlock(result.block);
    setHighlightTask(result.task);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full items-start justify-center mt-8">
      {/* Code Editor */}
      <div className="flex-1 min-w-[320px]">
        <CodeEditorTypewriter onRun={handleRun} output={output} />
      </div>
      {/* Calendar and To-Do List */}
      <div className="flex flex-col gap-6 flex-1 min-w-[320px]">
        <DayCalendar meetings={initialMeetings} highlightBlock={highlightBlock} />
        <TodoList tasks={initialTasks} highlightTask={highlightTask} />
      </div>
    </div>
  );
}

// Calendar visualization
function DayCalendar({ meetings, highlightBlock }: { meetings: {start: number, end: number}[], highlightBlock: {start: number, end: number} | null }) {
  const hours = Array.from({length: 10}, (_, i) => 9 + i); // 9am-6pm
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-cyan-400/30 rounded-xl shadow-lg p-4 w-full relative overflow-hidden">
      <div className="text-cyan-200 text-sm font-bold mb-3 flex items-center gap-2">
        <svg width="20" height="20" fill="none" className="inline-block mr-1"><rect x="2" y="2" width="16" height="16" rx="4" stroke="#22d3ee" strokeWidth="2" fill="#0e172a" /></svg>
        Today's Schedule
      </div>
      <div className="relative" style={{ minHeight: 320 }}>
        {/* Vertical grid lines */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <svg width="100%" height="100%" className="absolute inset-0" style={{ opacity: 0.08 }}>
            <defs>
              <pattern id="vgrid" width="100%" height="32" patternUnits="userSpaceOnUse">
                <line x1="0" y1="32" x2="100%" y2="32" stroke="#67e8f9" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vgrid)" />
          </svg>
        </div>
        {/* Hour labels and rows */}
        <div className="flex flex-col relative z-10">
          {hours.map(hour => {
            const meeting = meetings.find(m => hour >= m.start && hour < m.end);
            const isHighlight = highlightBlock && hour >= highlightBlock.start && hour < highlightBlock.end;
            return (
              <div key={hour} className="flex items-stretch h-10 group">
                <div className="w-14 flex items-center justify-end pr-2 text-xs text-cyan-300 select-none">
                  {hour}:00
                </div>
                <div className="flex-1 relative flex items-center">
                  {/* Meeting block */}
                  {meeting && (
                    <div className="absolute left-0 right-0 top-1 bottom-1 bg-blue-500/70 border border-blue-300/30 rounded-md shadow-md flex items-center px-3 text-xs text-blue-50 font-semibold z-10 animate-fade-in">
                      Meeting
                    </div>
                  )}
                  {/* Focus block */}
                  {isHighlight && !meeting && (
                    <div className="absolute left-0 right-0 top-1 bottom-1 bg-cyan-400/30 border border-cyan-300/40 rounded-md shadow-md flex items-center px-3 text-xs text-cyan-100 font-semibold z-10 animate-fade-in">
                      Focus Block
                    </div>
                  )}
                  <div className="h-8 w-full border-b border-cyan-400/10 group-last:border-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
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

// To-Do List visualization
function TodoList({ tasks, highlightTask }: { tasks: string[], highlightTask: string | null }) {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-cyan-400/30 rounded-xl shadow-lg p-4 w-full">
      <div className="text-cyan-200 text-sm font-bold mb-3 flex items-center gap-2">
        <svg width="20" height="20" fill="none" className="inline-block mr-1"><rect x="2" y="2" width="16" height="16" rx="4" stroke="#22d3ee" strokeWidth="2" fill="#0e172a" /></svg>
        To-Do List
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map(task => (
          <li key={task} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all shadow-sm border border-transparent bg-slate-900/60 hover:bg-slate-800/80 ${highlightTask === task ? 'border-cyan-400/60 bg-cyan-900/40 text-cyan-100 font-semibold ring-2 ring-cyan-400/40' : 'text-cyan-300'}`}>
            <input type="checkbox" className="accent-cyan-400 w-4 h-4 rounded" checked={highlightTask === task} readOnly />
            <span className="flex-1 select-none">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
