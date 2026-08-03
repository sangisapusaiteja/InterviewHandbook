"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px] overflow-auto"
        >
          {lines.map((line, i) => (
            <p key={i} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">
            Click ▶ Run to see output
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Cycle Node Diagram ───────────────────────────────────────────────────────
function CycleNodeDiagram({
  arr,
  cycleEntry,  // -1 means no cycle
  slowIdx,
  fastIdx,
  metIdx,      // -1 unless met
}: {
  arr: number[];
  cycleEntry: number;
  slowIdx: number;
  fastIdx: number;
  metIdx: number;
}) {
  const n = arr.length;
  const cycleTail = n - 1;
  const showCycle = cycleEntry >= 0;

  return (
    <div className="flex flex-wrap items-end justify-center gap-0 py-3">
      {arr.map((val, i) => {
        let bg = "transparent";
        let fg = "inherit";

        if (metIdx === i) { bg = "#f97316"; fg = "#fff"; }          // orange meeting
        else if (showCycle && i === cycleEntry && i === slowIdx) { bg = "#7c3aed"; fg = "#fff"; } // violet s·f at entry
        else if (showCycle && i === cycleEntry) { bg = "#ef4444"; fg = "#fff"; }  // red entry ring
        else if (slowIdx === fastIdx && slowIdx === i) { bg = "#7c3aed"; fg = "#fff"; }
        else if (slowIdx === i) { bg = "#a855f7"; fg = "#fff"; }
        else if (fastIdx === i) { bg = "#eab308"; fg = "#000"; }

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* pointer label */}
              <div className="h-4 text-[9px] font-bold mb-0.5 flex items-center justify-center">
                {slowIdx === fastIdx && slowIdx === i && metIdx !== i && (
                  <span className="text-violet-400">s·f</span>
                )}
                {slowIdx === i && fastIdx !== i && metIdx !== i && (
                  <span className="text-purple-400">slow</span>
                )}
                {fastIdx === i && slowIdx !== i && metIdx !== i && (
                  <span className="text-amber-400">fast</span>
                )}
                {metIdx === i && (
                  <span className="text-orange-400">meet!</span>
                )}
              </div>
              <div className="relative">
                <motion.div
                  animate={{ backgroundColor: bg, color: fg }}
                  transition={{ duration: 0.3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
                >
                  {val}
                </motion.div>
                {/* cycle-entry ring */}
                {showCycle && i === cycleEntry && metIdx !== i && (
                  <div className="absolute -inset-1 rounded-lg border-2 border-red-400 pointer-events-none opacity-60" />
                )}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">{i}</span>
            </div>

            {/* connector */}
            {i < n - 1 ? (
              <div className="flex items-center mb-4 mx-0.5 text-muted-foreground">
                <div className="w-3 h-px bg-muted-foreground" />
                <span className="text-[10px]">›</span>
              </div>
            ) : showCycle ? (
              /* cycle back-arrow */
              <div className="flex items-center mb-4 ml-1 text-red-400 text-[10px] font-semibold gap-0.5">
                <div className="w-2 h-px bg-red-400" />
                <span>↩[{i === cycleTail ? arr[cycleEntry] : "?"}]</span>
              </div>
            ) : (
              <div className="flex items-center mb-4 ml-1 text-[10px] text-muted-foreground gap-0.5">
                <div className="w-2 h-px bg-muted-foreground" />
                <span>null</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step / data types ────────────────────────────────────────────────────────
interface CycleDiagramStep {
  slow: number;
  fast: number;  // n = "past end / null"
  metIdx: number; // ≥ 0 when they meet
  noCycle: boolean;
  msg: string;
}
interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildCycle ───────────────────────────────────────────────────────────────
function parseCycleInputs(listStr: string, entryStr: string) {
  const nums = listStr
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = nums.length >= 2 ? nums : [3, 1, 4, 2, 5];
  const n = arr.length;
  const entryNum = parseInt(entryStr.trim(), 10);
  const cycleEntry =
    !isNaN(entryNum) && entryNum >= 0 && entryNum < n - 1 ? entryNum : -1;
  const cycleTail = n - 1;
  const nextIdx = (i: number): number => {
    if (cycleEntry >= 0 && i === cycleTail) return cycleEntry;
    return i + 1; // may equal n (= past end)
  };
  return { arr, n, cycleEntry, cycleTail, nextIdx };
}

function buildCycle(
  listStr: string,
  entryStr: string
): {
  arr: number[];
  cycleEntry: number;
  steps: CycleDiagramStep[];
  code: string;
  output: string[];
} {
  const { arr, n, cycleEntry, cycleTail, nextIdx } = parseCycleInputs(
    listStr,
    entryStr
  );

  const steps: CycleDiagramStep[] = [];
  steps.push({
    slow: 0,
    fast: 0,
    metIdx: -1,
    noCycle: false,
    msg: "Init: slow = fast = head (index 0)",
  });

  let slow = 0,
    fast = 0,
    iters = 0,
    detected = false;

  for (let iter = 1; iter <= 40; iter++) {
    const f1 = nextIdx(fast);
    if (f1 >= n) {
      steps.push({
        slow,
        fast: n,
        metIdx: -1,
        noCycle: true,
        msg: `fast.next = null after ${iters} steps — no cycle`,
      });
      break;
    }
    const f2 = nextIdx(f1);
    if (f2 >= n) {
      steps.push({
        slow,
        fast: n,
        metIdx: -1,
        noCycle: true,
        msg: `fast.next.next = null after ${iters} steps — no cycle`,
      });
      break;
    }
    slow = nextIdx(slow);
    fast = f2;
    iters++;
    const met = slow === fast;
    steps.push({
      slow,
      fast,
      metIdx: met ? slow : -1,
      noCycle: false,
      msg: met
        ? `Iter ${iter}: slow = fast = index ${slow} [${arr[slow]}] — cycle DETECTED!`
        : `Iter ${iter}: slow → ${slow} [${arr[slow]}]  ·  fast → ${fast} [${arr[fast]}]`,
    });
    if (met) {
      detected = true;
      break;
    }
  }

  const hasCycle = detected;
  const meetPt = hasCycle ? slow : -1;

  return {
    arr,
    cycleEntry,
    steps,
    code: [
      "function hasCycle(head) {",
      "  let slow = head, fast = head;",
      "  while (fast !== null && fast.next !== null) {",
      "    slow = slow.next;",
      "    fast = fast.next.next;",
      "    if (slow === fast) return true;",
      "  }",
      "  return false;",
      "}",
      "",
      `// Input : [${arr.join(", ")}]`,
      cycleEntry >= 0
        ? `// Cycle : tail [${arr[cycleTail]}] → entry idx ${cycleEntry} [${arr[cycleEntry]}]`
        : "// No cycle",
      `// Output: ${hasCycle}`,
    ].join("\n"),
    output: hasCycle
      ? [
          "true — cycle detected!",
          `Meeting point: index ${meetPt} [${arr[meetPt]}]`,
          `Iterations: ${iters}`,
        ]
      : [
          "false — no cycle",
          `fast reached null after ${iters} steps`,
        ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "findEntry" | "cycleLength" | "removeCycle";

function buildPractice(
  tab: PracticeTab,
  listStr: string,
  entryStr: string
): { code: string; output: string; steps: PracticeStep[] } {
  const { arr, n, cycleEntry, cycleTail } = parseCycleInputs(
    listStr,
    entryStr
  );

  // Ensure there's a cycle for practice problems (default entry=1 if none)
  const entry = cycleEntry >= 0 ? cycleEntry : Math.min(1, n - 2);
  const tail = cycleTail;
  const nx = (i: number) => (i === tail ? entry : i + 1);

  // Run Floyd's phase 1 to get meeting point
  let slow = 0,
    fast = 0;
  for (let i = 0; i < 40; i++) {
    const f1 = nx(fast);
    const f2 = nx(f1);
    slow = nx(slow);
    fast = f2;
    if (slow === fast) break;
  }
  const meetPt = slow;

  if (tab === "findEntry") {
    // Phase 2: reset slow=0, both +1
    let s = 0,
      f = meetPt;
    const phase2Steps: string[] = [];
    for (let i = 0; i < 20; i++) {
      s = nx(s);
      f = nx(f);
      phase2Steps.push(`slow→${s}, fast→${f}`);
      if (s === f) break;
    }
    const entryFound = s;
    return {
      code: [
        "// LeetCode 142 — Linked List Cycle II",
        "function detectCycle(head) {",
        "  let slow = head, fast = head;",
        "  // phase 1: find meeting point",
        "  while (fast && fast.next) {",
        "    slow = slow.next;",
        "    fast = fast.next.next;",
        "    if (slow === fast) break;",
        "  }",
        "  if (!fast || !fast.next) return null;",
        "  // phase 2: reset slow, advance both +1",
        "  slow = head;",
        "  while (slow !== fast) {",
        "    slow = slow.next;",
        "    fast = fast.next;",
        "  }",
        "  return slow; // cycle entry node",
        "}",
        "",
        `// Input : [${arr.join(", ")}], cycle entry idx ${entry}`,
        `// Output: node.val = ${arr[entryFound]}  (index ${entryFound})`,
      ].join("\n"),
      output: `Cycle entry: index ${entryFound}  →  value ${arr[entryFound]}`,
      steps: [
        { label: "Input", value: `[${arr.join(", ")}]  cycle@${entry}` },
        {
          label: "Phase 1 (Floyd)",
          value: `meeting point → idx ${meetPt} [${arr[meetPt]}]`,
        },
        { label: "Reset slow", value: `slow = head (idx 0)` },
        ...phase2Steps.map((s, i) => ({ label: `Phase 2 step ${i + 1}`, value: s })),
        {
          label: "Entry Found",
          value: `index ${entryFound}  →  value ${arr[entryFound]}`,
          highlight: true,
        },
      ],
    };
  }

  if (tab === "cycleLength") {
    let s = meetPt;
    let count = 0;
    const walkSteps: PracticeStep[] = [];
    for (let i = 0; i < 20; i++) {
      s = nx(s);
      count++;
      const done = s === meetPt;
      walkSteps.push({
        label: `Step ${count}`,
        value: `slow → idx ${s} [${arr[s]}]${done ? " = meeting pt" : ""}`,
      });
      if (done) break;
    }
    return {
      code: [
        "// Cycle Length — after Floyd's meeting point",
        "function cycleLength(meetNode) {",
        "  let cur = meetNode, count = 0;",
        "  do {",
        "    cur = cur.next;",
        "    count++;",
        "  } while (cur !== meetNode);",
        "  return count;",
        "}",
        "",
        `// Input : cycle with meeting point idx ${meetPt}`,
        `// Output: ${count}`,
      ].join("\n"),
      output: `Cycle length: ${count} nodes`,
      steps: [
        { label: "Meeting pt", value: `idx ${meetPt} [${arr[meetPt]}]` },
        { label: "Fix fast", value: `keep at meeting point` },
        ...walkSteps,
        {
          label: "Cycle Length",
          value: String(count),
          highlight: true,
        },
      ],
    };
  }

  // removeCycle
  const walkSteps: PracticeStep[] = [];
  let cur = entry;
  for (let i = 0; i < 20; i++) {
    const nxt = nx(cur);
    const isTail = nxt === entry;
    walkSteps.push({
      label: isTail ? "Tail Found" : `Walk`,
      value: isTail
        ? `idx ${cur} [${arr[cur]}]  →  cur.next = null`
        : `idx ${cur} [${arr[cur]}]  →  next = ${nxt} ≠ entry`,
    });
    cur = nxt;
    if (isTail) break;
  }
  return {
    code: [
      "// Remove Cycle",
      "function removeCycle(head, entryNode) {",
      "  let cur = entryNode;",
      "  while (cur.next !== entryNode) {",
      "    cur = cur.next;",
      "  }",
      "  cur.next = null; // cut the cycle",
      "}",
      "",
      `// Input : [${arr.join(", ")}], entry idx ${entry}`,
      `// Output: [${arr.join(", ")}]  (acyclic)`,
    ].join("\n"),
    output: `[${arr.join(", ")}]  (cycle removed, acyclic)`,
    steps: [
      { label: "Cycle entry", value: `idx ${entry}  →  [${arr[entry]}]` },
      { label: "Walk from entry", value: `find tail (cur.next = entry)` },
      ...walkSteps,
      {
        label: "Result",
        value: `[${arr.join(", ")}]  acyclic ✓`,
        highlight: true,
      },
    ],
  };
}

// ─── constants ────────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  findEntry: "Find Cycle Entry (142)",
  cycleLength: "Cycle Length",
  removeCycle: "Remove Cycle",
};
const practiceColor: Record<PracticeTab, string> = {
  findEntry:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  cycleLength:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  removeCycle:
    "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
};

// ─── MainSection ──────────────────────────────────────────────────────────────
function MainSection() {
  const [listStr, setListStr] = useState("3,1,4,2,5");
  const [entryStr, setEntryStr] = useState("1");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<CycleDiagramStep[]>([]);
  const [arr, setArr] = useState<number[]>([3, 1, 4, 2, 5]);
  const [cycleEntry, setCycleEntry] = useState(1);
  const [output, setOutput] = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const { code } = buildCycle(listStr, entryStr);

  const clear = () => {
    setStepIndex(-1);
    setSteps([]);
    setOutput(null);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const res = buildCycle(listStr, entryStr);
    setArr(res.arr);
    setCycleEntry(res.cycleEntry);
    setOutput(res.output);
    setSteps(res.steps);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < res.steps.length; i++) {
      await new Promise<void>((r) => setTimeout(r, 520));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const cur = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Visualization
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: inputs + legend + live step */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Linked list (comma-separated)
            </p>
            <input
              value={listStr}
              onChange={(e) => { setListStr(e.target.value); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 3,1,4,2,5"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Cycle entry index{" "}
              <span className="font-normal text-muted-foreground/70">
                (-1 or blank = no cycle)
              </span>
            </p>
            <input
              value={entryStr}
              onChange={(e) => { setEntryStr(e.target.value); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 1  (tail loops back to index 1)"
            />
          </div>

          <Button
            size="sm"
            onClick={handleRun}
            disabled={running}
            className="w-full"
          >
            <Play className="h-3.5 w-3.5 mr-1" />
            {running ? "Running…" : "Run"}
          </Button>

          <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
            <p>
              <span className="font-semibold text-purple-600 dark:text-purple-400">Purple</span>
              {" — "}slow pointer (+1 per step)
            </p>
            <p>
              <span className="font-semibold text-amber-600 dark:text-amber-400">Amber</span>
              {" — "}fast pointer (+2 per step)
            </p>
            <p>
              <span className="font-semibold text-orange-600 dark:text-orange-400">Orange</span>
              {" — "}meeting point (cycle detected)
            </p>
            <p>
              <span className="font-semibold text-red-600 dark:text-red-400">Red ring</span>
              {" — "}cycle entry node · <span className="text-red-400">↩[v]</span> back-arrow
            </p>
          </div>

          {cur && (
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.msg}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs"
              >
                {cur.msg}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Right: code + output */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">
              Code
            </p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[150px]"
              >
                {code}
              </motion.pre>
            </AnimatePresence>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">
              Output
            </p>
            <ConsoleOutput lines={output} />
          </div>
        </div>
      </div>

      {/* Diagram */}
      {hasRun && (
        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Diagram
              {stepIndex >= 0 && (
                <span className="ml-2 font-normal">
                  — Step {stepIndex + 1}/{steps.length}
                </span>
              )}
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-2 text-xs"
              onClick={clear}
            >
              <RotateCcw className="h-3 w-3 mr-1" /> Reset
            </Button>
          </div>
          <CycleNodeDiagram
            arr={arr}
            cycleEntry={cur?.noCycle ? -1 : cycleEntry}
            slowIdx={cur?.slow ?? 0}
            fastIdx={cur && cur.fast < arr.length ? cur.fast : 0}
            metIdx={cur?.metIdx ?? -1}
          />
        </div>
      )}
    </div>
  );
}

// ─── PracticeSection ──────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab] = useState<PracticeTab>("findEntry");
  const [listStr, setListStr] = useState("3,1,4,2,5");
  const [entryStr, setEntryStr] = useState("1");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [steps, setSteps] = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning] = useState(false);

  const { code } = buildPractice(tab, listStr, entryStr);

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const res = buildPractice(tab, listStr, entryStr);
    setOutputLines([res.output]);
    setSteps(res.steps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= res.steps.length; i++) {
      await new Promise<void>((r) => setTimeout(r, 280));
      setVisibleSteps(i);
    }
    setRunning(false);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Practice Problems
      </p>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(practiceLabel) as PracticeTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); clearOutput(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? practiceColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {practiceLabel[key]}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="flex flex-wrap gap-2 items-end">
        <div className="space-y-1 flex-1 min-w-[150px]">
          <p className="text-xs font-semibold text-muted-foreground">List</p>
          <input
            value={listStr}
            onChange={(e) => { setListStr(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 3,1,4,2,5"
            disabled={running}
          />
        </div>
        <div className="space-y-1 w-28">
          <p className="text-xs font-semibold text-muted-foreground">
            Cycle entry idx
          </p>
          <input
            value={entryStr}
            onChange={(e) => { setEntryStr(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 1"
            disabled={running}
          />
        </div>
        <Button size="sm" onClick={handleRun} disabled={running || !listStr}>
          <Play className="h-3.5 w-3.5 mr-1" />
          {running ? "Running…" : "Run"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={clearOutput}
          disabled={running}
        >
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

      {/* Code + output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">
            Code
          </p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[180px]"
            >
              {code}
            </motion.pre>
          </AnimatePresence>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">
            Output
          </p>
          <ConsoleOutput lines={outputLines} />
        </div>
      </div>

      {/* Step table */}
      {steps.length > 0 && (
        <div className="rounded-xl border overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
            <span>Step</span>
            <span>Value</span>
          </div>
          {steps.slice(0, visibleSteps).map((step, i) => (
            <motion.div
              key={`${i}-${step.label}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-2 border-t px-3 py-2 ${
                step.highlight ? `font-semibold ${practiceColor[tab]}` : ""
              }`}
            >
              <span className="font-mono">{step.label}</span>
              <span className="font-mono break-all">{step.value}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function LinkedListCycleVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Linked List Cycle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MainSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
