"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ───────────────────────────────────────────────────────────
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

// ─── Queue Diagram ────────────────────────────────────────────────────────────
interface QueueEl {
  id: number;
  val: number;
}

function QueueDiagram({
  elements,
  activeId,
  isDequeuing,
}: {
  elements: QueueEl[];
  activeId: number;
  isDequeuing: boolean;
}) {
  return (
    <div className="space-y-1 py-2">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {elements.length > 0 && (
          <div className="flex flex-col items-center shrink-0">
            <span className="text-[10px] font-semibold text-blue-500">FRONT</span>
            <span className="text-blue-500 text-sm">↓</span>
          </div>
        )}
        <AnimatePresence initial={false}>
          {elements.map((el) => {
            const isActive = el.id === activeId;
            return (
              <motion.div
                key={el.id}
                initial={{ opacity: 0, x: 24, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  backgroundColor: isActive
                    ? isDequeuing
                      ? "#ef444430"
                      : "#22c55e30"
                    : "transparent",
                }}
                exit={{ opacity: 0, x: -24, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                className="w-12 h-10 flex items-center justify-center rounded-lg border-2 font-mono text-sm font-bold shrink-0"
                style={{
                  borderColor: isActive
                    ? isDequeuing
                      ? "#ef4444"
                      : "#22c55e"
                    : undefined,
                }}
              >
                {el.val}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {elements.length === 0 && (
          <p className="text-xs text-muted-foreground italic px-2 py-2 border-2 border-dashed border-border rounded-xl">
            empty queue
          </p>
        )}
        {elements.length > 0 && (
          <div className="flex flex-col items-center shrink-0">
            <span className="text-[10px] font-semibold text-amber-500">REAR</span>
            <span className="text-amber-500 text-sm">↓</span>
          </div>
        )}
      </div>
      {elements.length > 0 && (
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono">
          <span className="text-blue-500">dequeue ←</span>
          <div className="flex-1 border-t border-dashed border-border/60" />
          <span className="text-amber-500">→ enqueue</span>
        </div>
      )}
    </div>
  );
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface QueueStep {
  elements: QueueEl[];
  activeId: number;
  isDequeuing: boolean;
  action: string;
  msg: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildQueue ───────────────────────────────────────────────────────────────
function buildQueue(input: string): {
  arr: number[];
  steps: QueueStep[];
  code: string;
  output: string[];
} {
  let nextId = 0;
  const parsed = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = parsed.length >= 2 ? parsed.slice(0, 6) : [10, 20, 30, 40, 50];

  const steps: QueueStep[] = [];
  const queue: QueueEl[] = [];

  steps.push({
    elements: [],
    activeId: -1,
    isDequeuing: false,
    action: "new Queue()",
    msg: "Queue created — empty  (FIFO: First In, First Out)",
  });

  for (const val of arr) {
    const el: QueueEl = { id: nextId++, val };
    queue.push(el);
    steps.push({
      elements: [...queue],
      activeId: el.id,
      isDequeuing: false,
      action: `enqueue(${val})`,
      msg: `enqueue(${val}) → added to rear  |  size = ${queue.length}`,
    });
  }

  const frontEl = queue[0];
  steps.push({
    elements: [...queue],
    activeId: frontEl.id,
    isDequeuing: false,
    action: `peek() → ${frontEl.val}`,
    msg: `peek() returns ${frontEl.val} (front) without removing it`,
  });

  const dequeued = queue.shift()!;
  steps.push({
    elements: [...queue],
    activeId: queue.length ? queue[0].id : -1,
    isDequeuing: true,
    action: `dequeue() → ${dequeued.val}`,
    msg: `dequeue() removes ${dequeued.val} from front  ←  FIFO!${
      queue.length
        ? `  new front = ${queue[0].val}`
        : "  queue is now empty"
    }`,
  });

  return {
    arr,
    steps,
    code: [
      "class Queue {",
      "  constructor() { this.items = []; }",
      "  enqueue(val) { this.items.push(val); }         // O(1)",
      "  dequeue()    { return this.items.shift() ?? null; } // O(n)",
      "  peek()       { return this.items[0] ?? null; } // O(1)",
      "  isEmpty()    { return this.items.length === 0; }",
      "  size()       { return this.items.length; }",
      "}",
      "",
      "const q = new Queue();",
      ...arr.map((v) => `q.enqueue(${v});`),
      `console.log("peek:", q.peek());     // ${arr[0]}`,
      `console.log("dequeue:", q.dequeue()); // ${arr[0]}`,
      `console.log("size:", q.size());     // ${arr.length - 1}`,
    ].join("\n"),
    output: [
      `After enqueue [${arr.join(", ")}]`,
      `peek()    → ${arr[0]}`,
      `dequeue() → ${arr[0]}`,
      `size()    → ${arr.length - 1}`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "recentCalls" | "movingAverage" | "firstUnique";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "recentCalls": {
      // LC 933 — Number of Recent Calls
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n))
        .sort((a, b) => a - b);
      const pings = nums.length >= 2 ? nums.slice(0, 6) : [1, 100, 3001, 3002, 4000, 7000];

      const queue: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Pings", value: `[${pings.join(", ")}]` },
      ];

      const results: number[] = [];
      for (const t of pings) {
        queue.push(t);
        while (queue[0] < t - 3000) queue.shift();
        results.push(queue.length);
        steps.push({
          label: `ping(${t})`,
          value: `window:[${queue.join(",")}]  count=${queue.length}`,
          highlight: false,
        });
      }

      steps.push({
        label: "Counts",
        value: `[${results.join(", ")}]`,
        highlight: true,
      });

      return {
        code: [
          "class RecentCounter {",
          "  constructor() { this.q = []; }",
          "  ping(t) {",
          "    this.q.push(t);",
          "    while (this.q[0] < t - 3000)",
          "      this.q.shift();",
          "    return this.q.length;",
          "  }",
          "}",
          "const rc = new RecentCounter();",
          ...pings.map((t, i) => `console.log(rc.ping(${t})); // ${results[i]}`),
        ].join("\n"),
        output: `counts: [${results.join(", ")}]`,
        steps,
      };
    }

    case "movingAverage": {
      // LC 346 — Moving Average from Data Stream
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const arr = nums.length >= 3 ? nums.slice(0, 6) : [1, 10, 3, 5, 8, 2];
      const windowSize = 3;

      const queue: number[] = [];
      let sum = 0;
      const steps: PracticeStep[] = [
        { label: "Stream", value: `[${arr.join(", ")}]  window=${windowSize}` },
      ];
      const avgs: string[] = [];

      for (const v of arr) {
        queue.push(v);
        sum += v;
        if (queue.length > windowSize) {
          sum -= queue.shift()!;
        }
        const avg = (sum / queue.length).toFixed(2);
        avgs.push(avg);
        steps.push({
          label: `add(${v})`,
          value: `window:[${queue.join(",")}]  avg=${avg}`,
        });
      }

      steps.push({
        label: "Averages",
        value: `[${avgs.join(", ")}]`,
        highlight: true,
      });

      return {
        code: [
          "class MovingAverage {",
          `  constructor(size) { this.size=${windowSize}; this.q=[]; this.sum=0; }`,
          "  next(val) {",
          "    this.q.push(val); this.sum += val;",
          "    if (this.q.length > this.size)",
          "      this.sum -= this.q.shift();",
          "    return this.sum / this.q.length;",
          "  }",
          "}",
          `const ma = new MovingAverage(${windowSize});`,
          ...arr.map((v, i) => `console.log(ma.next(${v})); // ${avgs[i]}`),
        ].join("\n"),
        output: `averages: [${avgs.join(", ")}]`,
        steps,
      };
    }

    case "firstUnique": {
      // First Non-Repeating Char using queue
      const raw = input.replace(/[^a-zA-Z]/g, "").toLowerCase();
      const str = raw.length >= 2 ? raw.slice(0, 8) : "aabbcde";

      const freq: Record<string, number> = {};
      const queue: string[] = [];
      const steps: PracticeStep[] = [
        { label: "String", value: `"${str}"` },
      ];
      const results: string[] = [];

      for (const ch of str) {
        freq[ch] = (freq[ch] ?? 0) + 1;
        queue.push(ch);
        while (queue.length && freq[queue[0]] > 1) queue.shift();
        const first = queue.length ? queue[0] : "#";
        results.push(first);
        steps.push({
          label: `'${ch}'`,
          value: `queue:[${queue.join(",")}]  first='${first}'`,
        });
      }

      const finalResult = results[results.length - 1];
      steps.push({
        label: "Answer",
        value: finalResult === "#" ? "no unique char" : `'${finalResult}'`,
        highlight: true,
      });

      return {
        code: [
          "function firstUniqChar(s) {",
          "  const freq = {}, queue = [];",
          "  for (const ch of s) {",
          "    freq[ch] = (freq[ch] ?? 0) + 1;",
          "    queue.push(ch);",
          "    while (queue.length && freq[queue[0]] > 1)",
          "      queue.shift();",
          "  }",
          "  return queue[0] ?? '#';",
          "}",
          `console.log(firstUniqChar("${str}")); // '${finalResult}'`,
        ].join("\n"),
        output: `first unique: '${finalResult}'`,
        steps,
      };
    }
  }
}

// ─── Labels & colours ─────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  recentCalls: "Recent Calls  (LC 933)",
  movingAverage: "Moving Average  (LC 346)",
  firstUnique: "First Unique Char",
};

const practiceColor: Record<PracticeTab, string> = {
  recentCalls:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  movingAverage:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  firstUnique:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const tabDefaults: Record<PracticeTab, string> = {
  recentCalls: "1,100,3001,3002,4000,7000",
  movingAverage: "1,10,3,5,8,2",
  firstUnique: "aabbcde",
};

const tabPlaceholders: Record<PracticeTab, string> = {
  recentCalls: "e.g. 1,100,3001,3002",
  movingAverage: "e.g. 1,10,3,5,8",
  firstUnique: "e.g. aabbcde",
};

// ─── Main Section ─────────────────────────────────────────────────────────────
function MainSection() {
  const [input, setInput] = useState("10,20,30,40,50");
  const [hasRun, setHasRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildQueue> | null>(
    null
  );

  const handleRun = async () => {
    const r = buildQueue(input);
    setResult(r);
    setHasRun(true);
    setStepIndex(0);
    for (let i = 0; i < r.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 600));
      setStepIndex(i);
    }
  };

  const handleReset = () => {
    setHasRun(false);
    setResult(null);
    setStepIndex(0);
  };

  const step = result?.steps[stepIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Queue using Array</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Values to enqueue (comma-separated)
              </label>
              <input
                className="w-full rounded-md border bg-background px-3 py-1.5 text-sm font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 10,20,30,40,50"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleRun} className="gap-1.5">
                <Play className="h-3.5 w-3.5" /> Run
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </Button>
            </div>

            {hasRun && result && step && (
              <>
                <QueueDiagram
                  elements={step.elements}
                  activeId={step.activeId}
                  isDequeuing={step.isDequeuing}
                />
                <div className="rounded-lg border bg-muted/30 p-3 text-xs space-y-1">
                  <p className="font-mono font-semibold text-primary">
                    {step.action}
                  </p>
                  <p className="text-muted-foreground">{step.msg}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{
                        backgroundColor: "#22c55e30",
                        borderColor: "#22c55e",
                      }}
                    />
                    enqueued / front
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{
                        backgroundColor: "#ef444430",
                        borderColor: "#ef4444",
                      }}
                    />
                    dequeued
                  </span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-60">
              {result?.code ?? buildQueue(input).code}
            </pre>
            <ConsoleOutput lines={result?.output ?? null} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Practice Section ─────────────────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab] = useState<PracticeTab>("recentCalls");
  const [input, setInput] = useState(tabDefaults["recentCalls"]);
  const [result, setResult] = useState<{
    code: string;
    output: string;
    steps: PracticeStep[];
  } | null>(null);
  const [visibleSteps, setVisibleSteps] = useState(0);

  const handleRun = async () => {
    const r = buildPractice(tab, input);
    setResult(r);
    setVisibleSteps(0);
    for (let i = 1; i <= r.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 280));
      setVisibleSteps(i);
    }
  };

  const handleReset = () => {
    setResult(null);
    setVisibleSteps(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Practice Problems</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(practiceLabel) as PracticeTab[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setInput(tabDefaults[t]);
                setResult(null);
                setVisibleSteps(0);
              }}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                tab === t
                  ? practiceColor[t]
                  : "bg-muted/30 border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {practiceLabel[t]}
            </button>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Input
          </label>
          <input
            className="w-full rounded-md border bg-background px-3 py-1.5 text-sm font-mono"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={tabPlaceholders[tab]}
          />
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={handleRun} className="gap-1.5">
            <Play className="h-3.5 w-3.5" /> Run
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
        </div>

        {result && (
          <div className="grid md:grid-cols-2 gap-4">
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-64">
              {result.code}
            </pre>
            <div className="space-y-2">
              <ConsoleOutput lines={[result.output]} />
              <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-3 py-2 max-h-48 overflow-auto space-y-1">
                {result.steps.slice(0, visibleSteps).map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex justify-between gap-2 text-xs font-mono ${
                      s.highlight
                        ? "text-emerald-400 font-bold"
                        : "text-zinc-400"
                    }`}
                  >
                    <span className="text-zinc-500 shrink-0">{s.label}</span>
                    <span className="text-right">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function QueueArrayVisualization() {
  return (
    <div className="space-y-6">
      <MainSection />
      <PracticeSection />
    </div>
  );
}
