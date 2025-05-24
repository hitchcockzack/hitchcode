'use client';
import React, { useState, useRef, useEffect } from "react";
import CodeEditorTypewriter from "./CodeEditorTypewriter";

const initialMeetings = [
  { start: 10, end: 11, name: "Vendor Call" },
  { start: 13, end: 14, name: "Team Lunch" },
  { start: 15, end: 16, name: "Client Check-in" }
];

// 9am-6pm, 9 slots, 3 meetings = 3 slots taken, 6 left. Add 7 tasks so 1 will be bumped.
const initialTasks = [
  { name: "Call supplier", urgency: 4, scheduledFor: null as string | null },
  { name: "Send invoices", urgency: 5, scheduledFor: null as string | null },
  { name: "Plan marketing campaign", urgency: 3, scheduledFor: null as string | null },
  { name: "Order inventory", urgency: 2, scheduledFor: null as string | null },
  { name: "Schedule staff meeting", urgency: 1, scheduledFor: null as string | null },
  { name: "Prepare payroll", urgency: 3, scheduledFor: null as string | null },
  { name: "Check inventory levels", urgency: 2, scheduledFor: null as string | null }
];

const URGENCY_COLORS = [
  "bg-blue-400/80 text-blue-900", // 1
  "bg-cyan-400/80 text-cyan-900", // 2
  "bg-yellow-300/80 text-yellow-900", // 3
  "bg-orange-400/80 text-orange-900", // 4
  "bg-red-500/80 text-red-50" // 5
];

function SmartSchedulerDemo() {
  console.log('SmartSchedulerDemo mounted');
  // Log initial calendar blocks
  const initialCalendarBlocks = (() => {
    const slots = Array(9).fill(null);
    initialMeetings.forEach(m => {
      for (let h = m.start; h < m.end; h++) {
        const idx = h - 9;
        if (idx >= 0 && idx < 9) slots[idx] = { type: 'meeting', label: m.name };
      }
    });
    return slots;
  })();
  console.log('initialCalendarBlocks:', initialCalendarBlocks);

  const [output, setOutput] = useState<string | null>(null);
  const [calendarBlocks, setCalendarBlocks] = useState<(null | { type: 'meeting' | 'task', label: string, urgency?: number })[]>(initialCalendarBlocks);
  const [todayTasks, setTodayTasks] = useState(initialTasks);
  const [tomorrowTasks, setTomorrowTasks] = useState<any[]>([]); // allow fromYesterday
  const [animating, setAnimating] = useState(false);
  const [urgencyPulse, setUrgencyPulse] = useState<{ [taskName: string]: boolean }>({});
  const [step, setStep] = useState(0);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const calendarTodoRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState(false);

  // Helper: get color for urgency
  const getUrgencyColor = (urgency: number) => URGENCY_COLORS[Math.max(0, Math.min(urgency - 1, 4))];

  // Scheduling logic
  function scheduleDay(meetings: { start: number, end: number, name: string }[], tasks: typeof initialTasks | any[]) {
    // 9am-6pm, 9 slots
    const slots = Array(9).fill(null) as (null | { type: 'meeting' | 'task', label: string, urgency?: number })[];
    // Place meetings
    meetings.forEach(m => {
      for (let h = m.start; h < m.end; h++) {
        const idx = h - 9;
        if (idx >= 0 && idx < 9) slots[idx] = { type: 'meeting', label: m.name };
      }
    });
    // Place tasks by urgency
    const sortedTasks = [...tasks].sort((a, b) => b.urgency - a.urgency);
    let slotIdx = 0;
    let scheduledTasks: typeof initialTasks = [];
    let overflowTasks: any[] = [];
    for (const task of sortedTasks) {
      // Find next free slot
      while (slotIdx < 9 && slots[slotIdx]) slotIdx++;
      if (slotIdx < 9) {
        slots[slotIdx] = { type: 'task', label: task.name, urgency: task.urgency };
        scheduledTasks.push({ ...task, scheduledFor: 'today' });
        slotIdx++;
      } else {
        // If task was already from yesterday, keep that property
        overflowTasks.push({ ...task, urgency: Math.min(5, task.urgency + 1), scheduledFor: 'tomorrow', fromYesterday: task.fromYesterday || false });
      }
    }
    return { slots, scheduledTasks, overflowTasks };
  }

  // Animation sequence
  const handleRun = () => {
    console.log('handleRun called');
    setAnimating(true);
    setOutput(null);
    setStep(0);
    setUrgencyPulse({});

    // Clear any existing timeouts
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    // Use the current state of tasks for scheduling
    const currentTasks = todayTasks.map(t => ({ ...t, scheduledFor: null }));
    setCalendarBlocks(initialCalendarBlocks.slice()); // Start with meetings only
    setTodayTasks(currentTasks);
    setTomorrowTasks([]); // Clear tomorrow tasks for fresh start

    // Calculate final scheduling using current tasks
    const { slots: finalSlots, scheduledTasks, overflowTasks } = scheduleDay(initialMeetings, currentTasks);

    // Animation: place tasks one by one
    let taskIdx = 0;

    const placeNextTask = () => {
      if (taskIdx < scheduledTasks.length) {
        // Place a scheduled task
        const task = scheduledTasks[taskIdx];

        // Find where this task should go in the final layout
        const targetSlot = finalSlots.findIndex(s =>
          s && s.type === 'task' && s.label === task.name
        );

        if (targetSlot !== -1) {
          // Update calendar to show this task
          setCalendarBlocks(current => {
            const updated = [...current];
            updated[targetSlot] = {
              type: 'task',
              label: task.name,
              urgency: task.urgency
            };
            return updated;
          });

          // Update task status
          setTodayTasks(current =>
            current.map(t =>
              t.name === task.name
                ? { ...t, scheduledFor: 'today' }
                : t
            )
          );
        }

        taskIdx++;
        animationRef.current = setTimeout(placeNextTask, 320);

      } else if (taskIdx < scheduledTasks.length + overflowTasks.length) {
        // Handle overflow tasks
        const overflowIdx = taskIdx - scheduledTasks.length;
        const overflowTask = overflowTasks[overflowIdx];

        setTomorrowTasks(current => [
          ...current,
          { ...overflowTask, fromYesterday: false }
        ]);

        setUrgencyPulse(current => ({
          ...current,
          [overflowTask.name]: true
        }));

        taskIdx++;
        animationRef.current = setTimeout(placeNextTask, 320);

      } else {
        // Animation complete
        setAnimating(false);
        setOutput(
          overflowTasks.length > 0
            ? `Some tasks couldn't fit today and will be prioritized tomorrow!`
            : `All tasks scheduled for today!`
        );
      }
    };

    // Start animation after a short delay to ensure state has settled
    setTimeout(placeNextTask, 100);
    console.log('Animation started');
  };

  // Clean up animation timeout
  React.useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
      console.log('SmartSchedulerDemo unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('calendarBlocks updated:', calendarBlocks);
  }, [calendarBlocks]);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full items-start justify-center mt-8">
      {/* Code Editor */}
      <div className="flex-1 min-w-0 w-full max-w-full md:min-w-[320px] md:max-w-xl">
        <CodeEditorTypewriter onRun={handleRun} output={output} disabled={animating} />
      </div>
      {/* Calendar and To-Do List */}
      <div
        ref={calendarTodoRef}
        className={`flex flex-col gap-6 flex-1 min-w-0 w-full max-w-full md:min-w-[340px] md:max-w-xl transition-shadow duration-500 ${highlight ? 'ring-4 ring-cyan-400/60 shadow-2xl' : ''}`}
      >
        <DayCalendar calendarBlocks={calendarBlocks} animating={animating} />
        <TodoList todayTasks={todayTasks} tomorrowTasks={tomorrowTasks} urgencyPulse={urgencyPulse} getUrgencyColor={getUrgencyColor} animating={animating} />
      </div>
    </div>
  );
}

// Calendar visualization
function DayCalendar({ calendarBlocks, animating }: { calendarBlocks: (null | { type: 'meeting' | 'task', label: string, urgency?: number })[], animating: boolean }) {
  const hours = Array.from({length: 9}, (_, i) => 9 + i); // 9am-5pm
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
          {hours.map((hour, idx) => {
            const block = calendarBlocks[idx];
            console.log(`Hour ${hour}:`, block);
            return (
              <div key={hour} className="flex items-stretch h-10 group">
                <div className="w-14 flex items-center justify-end pr-2 text-xs text-cyan-300 select-none">
                  {hour}:00
                </div>
                <div className="flex-1 relative flex items-center">
                  {/* Meeting block */}
                  {block && block.type === 'meeting' && (
                    <div style={{ border: '2px solid red' }} className="absolute left-0 right-0 top-1 bottom-1 bg-blue-500/70 border border-blue-300/30 rounded-md shadow-md flex items-center px-3 text-xs text-blue-50 font-semibold z-10 animate-fade-in">
                      {block.label}
                    </div>
                  )}
                  {/* Task block */}
                  {block && block.type === 'task' && (
                    <div style={{ border: '2px solid red' }} className="absolute left-0 right-0 top-1 bottom-1 bg-cyan-400/30 border border-cyan-300/40 rounded-md shadow-md flex items-center px-3 text-xs text-cyan-100 font-semibold z-10 animate-fade-in">
                      <span>{block.label}</span>
                      {block.urgency && (
                        <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-bold shadow-sm ${URGENCY_COLORS[Math.max(0, Math.min(block.urgency - 1, 4))]}`}>Urgency {block.urgency}</span>
                      )}
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
function TodoList({ todayTasks, tomorrowTasks, urgencyPulse, getUrgencyColor, animating }: {
  todayTasks: typeof initialTasks,
  tomorrowTasks: any[],
  urgencyPulse: { [taskName: string]: boolean },
  getUrgencyColor: (urgency: number) => string,
  animating: boolean
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-cyan-400/30 rounded-xl shadow-lg p-4 w-full">
      <div className="text-cyan-200 text-sm font-bold mb-3 flex items-center gap-2">
        <svg width="20" height="20" fill="none" className="inline-block mr-1"><rect x="2" y="2" width="16" height="16" rx="4" stroke="#22d3ee" strokeWidth="2" fill="#0e172a" /></svg>
        To-Do List
      </div>
      <div className="mb-2 text-xs text-cyan-400/80">Today</div>
      <ul className="flex flex-col gap-2 mb-4">
        {todayTasks.map(task => (
          <li key={task.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all shadow-sm border border-transparent bg-slate-900/60 hover:bg-slate-800/80 ${task.scheduledFor === 'today' ? 'border-cyan-400/60 bg-cyan-900/40 text-cyan-100 font-semibold ring-2 ring-cyan-400/40' : 'text-cyan-300'}`}>
            <input type="checkbox" className="accent-cyan-400 w-4 h-4 rounded" checked={task.scheduledFor === 'today'} readOnly />
            <span className="flex-1 select-none flex items-center">
              {task.name}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-bold shadow-sm ${getUrgencyColor(task.urgency)} ${urgencyPulse[task.name] ? 'animate-pulse-urgency' : ''}`}>Urgency {task.urgency}</span>
              {task.scheduledFor === 'today' && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-400/80 text-yellow-900 font-bold shadow-sm animate-fade-in">Scheduled</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="mb-2 text-xs text-cyan-400/80">Tomorrow</div>
      <ul className="flex flex-col gap-2">
        {tomorrowTasks.map(task => (
          <li key={task.name} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all shadow-sm border border-transparent bg-slate-900/60 hover:bg-slate-800/80 text-cyan-300`}>
            <input type="checkbox" className="accent-cyan-400 w-4 h-4 rounded" checked={false} readOnly />
            <span className="flex-1 select-none flex items-center">
              {task.name}
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-bold shadow-sm ${getUrgencyColor(task.urgency)} ${urgencyPulse[task.name] ? 'animate-pulse-urgency' : ''}`}>Urgency {task.urgency}</span>
              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full font-bold shadow-sm animate-fade-in ${task.fromYesterday ? 'bg-green-400/80 text-green-900' : 'bg-red-400/80 text-red-900'}`}>{task.fromYesterday ? 'Moved from Yesterday' : 'Moved to Tomorrow'}</span>
            </span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-urgency {
          animation: pulseUrgency 1.2s cubic-bezier(0.4, 0, 0.2, 1) 2;
        }
        @keyframes pulseUrgency {
          0%, 100% { box-shadow: 0 0 0 0 #f87171; }
          50% { box-shadow: 0 0 0 6px #f87171aa; }
        }
      `}</style>
    </div>
  );
}

// Memoize and export only the memoized version as default:
const MemoizedSmartSchedulerDemo = React.memo(SmartSchedulerDemo);
export default MemoizedSmartSchedulerDemo;
