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

// ─── Node Diagram ─────────────────────────────────────────────────────────────
function NodeDiagram({
  arr,
  slowIdx,
  fastIdx,
  foundIdx,
}: {
  arr: number[];
  slowIdx: number;
  fastIdx: number;
  foundIdx: number;
}) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-0 py-3">
      {arr.map((val, i) => {
        let bg = "transparent";
        let fg = "inherit";
        if (foundIdx === i) { bg = "#22c55e"; fg = "#fff"; }
        else if (slowIdx === fastIdx && slowIdx === i) { bg = "#7c3aed"; fg = "#fff"; }
        else if (slowIdx === i) { bg = "#a855f7"; fg = "#fff"; }
        else if (fastIdx === i) { bg = "#eab308"; fg = "#000"; }

        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* pointer label */}
              <div className="h-4 text-[9px] font-bold mb-0.5 flex items-center justify-center">
                {slowIdx === fastIdx && slowIdx === i && (
                  <span className="text-violet-400">s·f</span>
                )}
                {slowIdx === i && fastIdx !== i && (
                  <span className="text-purple-400">slow</span>
                )}
                {fastIdx === i && slowIdx !== i && (
                  <span className="text-amber-400">fast</span>
                )}
              </div>
              <motion.div
                animate={{ backgroundColor: bg, color: fg }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border font-mono text-sm font-bold"
              >
                {val}
              </motion.div>
              <span className="text-[10px] text-muted-foreground mt-1">{i}</span>
            </div>
            {i < arr.length - 1 ? (
              <div className="flex items-center mb-4 mx-0.5 text-muted-foreground">
                <div className="w-3 h-px bg-muted-foreground" />
                <span className="text-[10px]">›</span>
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
interface MiddleStep {
  slow: number;
  fast: number;
  foundIdx: number; // ≥ 0 on last step
  msg: string;
}
interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildMiddle ──────────────────────────────────────────────────────────────
function buildMiddle(input: string): {
  arr: number[];
  steps: MiddleStep[];
  code: string;
  output: string[];
} {
  const nums = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = nums.length >= 2 ? nums : [1, 2, 3, 4, 5];
  const n = arr.length;

  const steps: MiddleStep[] = [];
  steps.push({ slow: 0, fast: 0, foundIdx: -1, msg: "Init: slow = fast = head (index 0)" });

  let slow = 0, fast = 0, iters = 0;
  while (fast + 1 < n) {
    slow++;
    fast = Math.min(fast + 2, n - 1);
    iters++;
    const done = fast + 1 >= n;
    steps.push({
      slow,
      fast,
      foundIdx: done ? slow : -1,
      msg: done
        ? `fast.next = null — stop. Middle = index ${slow}, value ${arr[slow]}`
        : `slow → ${slow} [${arr[slow]}]  ·  fast → ${fast} [${arr[fast]}]`,
    });
  }

  const mid = slow;
  const isOdd = n % 2 === 1;

  return {
    arr,
    steps,
    code: [
      "function middleNode(head) {",
      "  let slow = head, fast = head;",
      "  while (fast !== null && fast.next !== null) {",
      "    slow = slow.next;",
      "    fast = fast.next.next;",
      "  }",
      "  return slow;",
      "}",
      "",
      `// Input : [${arr.join(", ")}]`,
      `// Output: node.val = ${arr[mid]}  (index ${mid})`,
    ].join("\n"),
    output: [
      `Middle value: ${arr[mid]}  (index ${mid})`,
      `Length ${n} is ${isOdd ? "odd" : "even"} → ${isOdd ? "exact centre" : "second of two middles"}`,
      `Iterations: ${iters}`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "deleteMiddle" | "palindrome" | "reorder";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  const nums = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const defaultList =
    tab === "palindrome" ? [1, 2, 3, 2, 1] : [1, 2, 3, 4, 5];
  const arr = nums.length >= 2 ? nums : defaultList;
  const n = arr.length;

  // find middle index
  let slow = 0, fast = 0;
  while (fast + 1 < n) { slow++; fast = Math.min(fast + 2, n - 1); }
  const mid = slow;

  if (tab === "deleteMiddle") {
    const result = [...arr.slice(0, mid), ...arr.slice(mid + 1)];
    return {
      code: [
        "// LeetCode 2095 — Delete the Middle Node",
        "function deleteMiddle(head) {",
        "  if (!head || !head.next) return null;",
        "  let slow = head, fast = head.next;",
        "  while (fast.next && fast.next.next) {",
        "    slow = slow.next;",
        "    fast = fast.next.next;",
        "  }",
        "  slow.next = slow.next.next; // bypass middle",
        "  return head;",
        "}",
        "",
        `// Input : [${arr.join(", ")}]`,
        `// Output: [${result.join(", ")}]`,
      ].join("\n"),
      output: `[${result.join(", ")}]`,
      steps: [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "Middle idx", value: `${mid}  →  value ${arr[mid]}` },
        {
          label: "Predecessor",
          value:
            mid > 0
              ? `index ${mid - 1}  →  value ${arr[mid - 1]}`
              : "head (no predecessor)",
        },
        { label: "Bypass", value: `prev.next = slow.next` },
        { label: "Result", value: `[${result.join(", ")}]`, highlight: true },
      ],
    };
  }

  if (tab === "palindrome") {
    const firstHalf = arr.slice(0, mid);
    const secondReversed = arr.slice(mid + 1).reverse();
    const isPalin = firstHalf.every((v, i) => v === secondReversed[i]);
    return {
      code: [
        "// LeetCode 234 — Palindrome Linked List",
        "function isPalindrome(head) {",
        "  let slow = head, fast = head;",
        "  while (fast && fast.next) {",
        "    slow = slow.next; fast = fast.next.next;",
        "  }",
        "  // reverse second half",
        "  let prev = null, cur = slow;",
        "  while (cur) {",
        "    const nxt = cur.next;",
        "    cur.next = prev; prev = cur; cur = nxt;",
        "  }",
        "  // compare",
        "  let l = head, r = prev;",
        "  while (r) {",
        "    if (l.val !== r.val) return false;",
        "    l = l.next; r = r.next;",
        "  }",
        "  return true;",
        "}",
        "",
        `// Input : [${arr.join(", ")}]`,
        `// Output: ${isPalin}`,
      ].join("\n"),
      output: isPalin ? "true  (palindrome)" : "false  (not palindrome)",
      steps: [
        { label: "Input", value: `[${arr.join(", ")}]` },
        { label: "Middle at", value: `index ${mid}  →  [${arr[mid]}]` },
        {
          label: "2nd half",
          value: `[${arr.slice(mid + 1).join(", ")}]`,
        },
        {
          label: "2nd reversed",
          value: `[${secondReversed.join(", ")}]`,
        },
        {
          label: "Compare",
          value: `[${firstHalf.join(",")}]  vs  [${secondReversed
            .slice(0, firstHalf.length)
            .join(",")}]`,
        },
        {
          label: "Result",
          value: isPalin ? "true — palindrome ✓" : "false — not palindrome ✗",
          highlight: true,
        },
      ],
    };
  }

  // reorder
  const firstHalf = arr.slice(0, mid + 1);
  const secondHalf = arr.slice(mid + 1);
  const reversed = [...secondHalf].reverse();
  const merged: number[] = [];
  let i = 0, j = 0;
  while (i < firstHalf.length || j < reversed.length) {
    if (i < firstHalf.length) merged.push(firstHalf[i++]);
    if (j < reversed.length) merged.push(reversed[j++]);
  }
  return {
    code: [
      "// LeetCode 143 — Reorder List",
      "function reorderList(head) {",
      "  // 1. find middle",
      "  let slow = head, fast = head;",
      "  while (fast && fast.next) {",
      "    slow = slow.next; fast = fast.next.next;",
      "  }",
      "  // 2. reverse second half",
      "  let prev = null, cur = slow.next;",
      "  slow.next = null;",
      "  while (cur) {",
      "    const nxt = cur.next;",
      "    cur.next = prev; prev = cur; cur = nxt;",
      "  }",
      "  // 3. merge alternately",
      "  let l1 = head, l2 = prev;",
      "  while (l2) {",
      "    const t1 = l1.next, t2 = l2.next;",
      "    l1.next = l2; l2.next = t1;",
      "    l1 = t1; l2 = t2;",
      "  }",
      "}",
      "",
      `// Input : [${arr.join(", ")}]`,
      `// Output: [${merged.join(", ")}]`,
    ].join("\n"),
    output: `[${merged.join(", ")}]`,
    steps: [
      { label: "Input", value: `[${arr.join(", ")}]` },
      { label: "Middle at", value: `index ${mid}  →  [${arr[mid]}]` },
      { label: "First half", value: `[${firstHalf.join(", ")}]` },
      { label: "2nd half", value: `[${secondHalf.join(", ")}]` },
      { label: "2nd reversed", value: `[${reversed.join(", ")}]` },
      { label: "Merged", value: `[${merged.join(", ")}]`, highlight: true },
    ],
  };
}

// ─── constants ────────────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  deleteMiddle: "Delete Middle Node",
  palindrome: "Palindrome Check",
  reorder: "Reorder List",
};
const practiceColor: Record<PracticeTab, string> = {
  deleteMiddle:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  palindrome:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  reorder:
    "bg-purple-500/15 border-purple-500/40 text-purple-700 dark:text-purple-300",
};

// ─── MainSection ──────────────────────────────────────────────────────────────
function MainSection() {
  const [input, setInput] = useState("1,2,3,4,5");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<MiddleStep[]>([]);
  const [arr, setArr] = useState<number[]>([1, 2, 3, 4, 5]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const { code } = buildMiddle(input);

  const clear = () => {
    setStepIndex(-1);
    setSteps([]);
    setOutput(null);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const res = buildMiddle(input);
    setArr(res.arr);
    setOutput(res.output);
    setSteps(res.steps);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < res.steps.length; i++) {
      await new Promise<void>((r) => setTimeout(r, 500));
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
        {/* Left: input + legend + live step */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Linked list (comma-separated)
            </p>
            <input
              value={input}
              onChange={(e) => { setInput(e.target.value); clear(); }}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 1,2,3,4,5"
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
              <span className="font-semibold text-violet-600 dark:text-violet-400">Violet</span>
              {" — "}slow · fast on same node
            </p>
            <p>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Green</span>
              {" — "}middle node (result)
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
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[130px]"
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
          <NodeDiagram
            arr={arr}
            slowIdx={cur?.slow ?? 0}
            fastIdx={cur?.fast ?? 0}
            foundIdx={cur?.foundIdx ?? -1}
          />
        </div>
      )}
    </div>
  );
}

// ─── PracticeSection ──────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab] = useState<PracticeTab>("deleteMiddle");
  const [input, setInput] = useState("1,2,3,4,5");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [steps, setSteps] = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning] = useState(false);

  const { code } = buildPractice(tab, input);

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const res = buildPractice(tab, input);
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

      {/* Input + controls */}
      <div className="flex flex-wrap gap-2 items-end">
        <div className="space-y-1 flex-1 min-w-[180px]">
          <p className="text-xs font-semibold text-muted-foreground">
            Linked list (comma-separated)
          </p>
          <input
            value={input}
            onChange={(e) => { setInput(e.target.value); clearOutput(); }}
            className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none ${practiceColor[tab]}`}
            placeholder="e.g. 1,2,3,4,5"
            disabled={running}
          />
        </div>
        <Button size="sm" onClick={handleRun} disabled={running || !input}>
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
export function MiddleOfLinkedListVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Middle of Linked List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MainSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
