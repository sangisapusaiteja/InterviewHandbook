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

// ─── Circular Queue Diagram ───────────────────────────────────────────────────
interface CircularSlot {
  value: number | null; // null = empty
  isHead: boolean;
  isTail: boolean;
  isActive: boolean;
  isDequeuing: boolean;
}

function CircularQueueDiagram({ slots }: { slots: CircularSlot[] }) {
  const capacity = slots.length;
  // Lay out slots in a horizontal ring-like display
  return (
    <div className="space-y-2 py-2">
      <div className="flex items-end gap-1 overflow-x-auto pb-1">
        {slots.map((slot, i) => (
          <div key={i} className="flex flex-col items-center gap-0.5 shrink-0">
            {/* Pointer labels above */}
            <div className="h-5 flex items-center gap-0.5">
              {slot.isHead && (
                <span className="text-[9px] font-bold text-blue-500 leading-none">H</span>
              )}
              {slot.isTail && (
                <span className="text-[9px] font-bold text-amber-500 leading-none">T</span>
              )}
            </div>
            <motion.div
              animate={{
                backgroundColor: slot.isActive
                  ? slot.isDequeuing
                    ? "#ef444430"
                    : "#22c55e30"
                  : slot.value !== null
                  ? "hsl(var(--muted) / 0.5)"
                  : "transparent",
                borderColor: slot.isActive
                  ? slot.isDequeuing
                    ? "#ef4444"
                    : "#22c55e"
                  : slot.isHead
                  ? "#3b82f6"
                  : slot.isTail
                  ? "#f59e0b"
                  : undefined,
              }}
              transition={{ duration: 0.25 }}
              className="w-11 h-10 flex items-center justify-center rounded-lg border-2 font-mono text-sm font-bold"
            >
              {slot.value !== null ? slot.value : (
                <span className="text-muted-foreground text-xs">—</span>
              )}
            </motion.div>
            {/* Index below */}
            <span className="text-[9px] text-muted-foreground font-mono">[{i}]</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 text-[10px] font-mono">
        <span className="text-blue-500 font-semibold">H = head (front)</span>
        <span className="text-amber-500 font-semibold">T = tail (rear)</span>
        <span className="text-muted-foreground">capacity = {capacity}</span>
      </div>
    </div>
  );
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface CQStep {
  buffer: (number | null)[];
  head: number;
  tail: number;
  size: number;
  capacity: number;
  activeIdx: number;
  isDequeuing: boolean;
  action: string;
  msg: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildCircularQueue ───────────────────────────────────────────────────────
function buildCircularQueue(input: string, cap: number): {
  steps: CQStep[];
  code: string;
  output: string[];
} {
  const parsed = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = parsed.length >= 2 ? parsed.slice(0, cap) : [10, 20, 30, 40].slice(0, cap);
  const capacity = cap;

  const steps: CQStep[] = [];
  const buffer: (number | null)[] = Array(capacity).fill(null);
  let head = 0;
  let tail = 0;
  let size = 0;

  const snapshot = (): CQStep => ({
    buffer: [...buffer],
    head,
    tail,
    size,
    capacity,
    activeIdx: -1,
    isDequeuing: false,
    action: "",
    msg: "",
  });

  steps.push({
    ...snapshot(),
    activeIdx: -1,
    isDequeuing: false,
    action: "new CircularQueue()",
    msg: `CircularQueue created — capacity = ${capacity}, head = tail = 0, size = 0`,
  });

  for (const val of arr) {
    if (size === capacity) break;
    buffer[tail] = val;
    const enqueuedIdx = tail;
    tail = (tail + 1) % capacity;
    size++;
    steps.push({
      ...snapshot(),
      activeIdx: enqueuedIdx,
      isDequeuing: false,
      action: `enqueue(${val})`,
      msg: `buffer[${enqueuedIdx}] = ${val}  |  tail → ${tail}  |  size = ${size}`,
    });
  }

  // Peek
  steps.push({
    ...snapshot(),
    activeIdx: head,
    isDequeuing: false,
    action: `front() → ${buffer[head]}`,
    msg: `front() returns buffer[head=${head}] = ${buffer[head]} (no removal)`,
  });

  // Dequeue
  const dqVal = buffer[head];
  const dqIdx = head;
  buffer[head] = null;
  head = (head + 1) % capacity;
  size--;
  steps.push({
    ...snapshot(),
    activeIdx: dqIdx,
    isDequeuing: true,
    action: `dequeue() → ${dqVal}`,
    msg: `buffer[${dqIdx}] = null  |  head → ${head}  |  size = ${size}  ←  FIFO with wrap-around!`,
  });

  // Enqueue one more to demonstrate wrap-around if possible
  if (size < capacity && arr.length > 0) {
    const wrapVal = arr[0] + 5; // a new value
    buffer[tail] = wrapVal;
    const wrapIdx = tail;
    tail = (tail + 1) % capacity;
    size++;
    steps.push({
      ...snapshot(),
      activeIdx: wrapIdx,
      isDequeuing: false,
      action: `enqueue(${wrapVal}) — wraps!`,
      msg: `buffer[${wrapIdx}] = ${wrapVal}  (tail wrapped to ${tail})  |  size = ${size}`,
    });
  }

  return {
    steps,
    code: [
      "class CircularQueue {",
      `  constructor(k) {`,
      `    this.buf = new Array(k).fill(null);`,
      "    this.head = 0; this.tail = 0;",
      "    this.size = 0; this.k = k;",
      "  }",
      "  enqueue(val) {",
      "    if (this.size === this.k) return false;",
      "    this.buf[this.tail] = val;",
      "    this.tail = (this.tail + 1) % this.k;",
      "    this.size++;",
      "    return true;",
      "  }",
      "  dequeue() {",
      "    if (this.size === 0) return null;",
      "    const v = this.buf[this.head];",
      "    this.buf[this.head] = null;",
      "    this.head = (this.head + 1) % this.k;",
      "    this.size--;",
      "    return v;",
      "  }",
      "  front()   { return this.size ? this.buf[this.head] : null; }",
      "  rear()    { return this.size ? this.buf[(this.tail-1+this.k)%this.k] : null; }",
      "  isEmpty() { return this.size === 0; }",
      "  isFull()  { return this.size === this.k; }",
      "}",
      `const cq = new CircularQueue(${capacity});`,
      ...arr.map((v) => `cq.enqueue(${v});`),
      `console.log("front:", cq.front());`,
      `console.log("dequeue:", cq.dequeue());`,
    ].join("\n"),
    output: [
      `Capacity: ${capacity}`,
      `Enqueued: [${arr.join(", ")}]`,
      `front()   → ${arr[0]}`,
      `dequeue() → ${arr[0]}  (head wraps on next enqueue)`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "designCircular" | "taskScheduler" | "slidingWindowMax";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "designCircular": {
      // LC 622 — Design Circular Queue
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const k = nums.length >= 1 ? Math.min(nums[0], 6) : 4;
      const vals = nums.slice(1, 1 + k + 2);
      const items = vals.length ? vals : [10, 20, 30, 40, 50];

      const buf: (number | null)[] = Array(k).fill(null);
      let h = 0, t = 0, sz = 0;
      const steps: PracticeStep[] = [
        { label: "k", value: `${k}` },
      ];

      for (const v of items.slice(0, k)) {
        if (sz < k) {
          buf[t] = v;
          t = (t + 1) % k;
          sz++;
          steps.push({
            label: `enqueue(${v})`,
            value: `[${buf.map((x) => (x === null ? "_" : x)).join(",")}]  h=${h} t=${t}`,
          });
        }
      }

      steps.push({ label: "isFull?", value: sz === k ? "true" : "false" });

      const dv = buf[h];
      buf[h] = null;
      h = (h + 1) % k;
      sz--;
      steps.push({
        label: `dequeue()`,
        value: `→${dv}  [${buf.map((x) => (x === null ? "_" : x)).join(",")}]  h=${h}`,
        highlight: true,
      });

      if (sz < k) {
        const nv = items[k] ?? 99;
        buf[t] = nv;
        t = (t + 1) % k;
        sz++;
        steps.push({
          label: `enqueue(${nv})`,
          value: `[${buf.map((x) => (x === null ? "_" : x)).join(",")}]  wraps!`,
          highlight: true,
        });
      }

      return {
        code: [
          `// Design Circular Queue with k=${k}`,
          "class MyCircularQueue {",
          `  constructor(k) { this.q=new Array(k).fill(0); this.h=0; this.t=0; this.sz=0; this.k=k; }`,
          "  enQueue(v) { if(this.isFull()) return false; this.q[this.t]=v; this.t=(this.t+1)%this.k; this.sz++; return true; }",
          "  deQueue()  { if(this.isEmpty()) return false; this.h=(this.h+1)%this.k; this.sz--; return true; }",
          "  Front()    { return this.isEmpty()?-1:this.q[this.h]; }",
          "  Rear()     { return this.isEmpty()?-1:this.q[(this.t-1+this.k)%this.k]; }",
          "  isEmpty()  { return this.sz===0; }",
          "  isFull()   { return this.sz===this.k; }",
          "}",
        ].join("\n"),
        output: `Circular Queue k=${k}: wrap-around enqueue/dequeue demonstrated`,
        steps,
      };
    }

    case "taskScheduler": {
      // LC 621 — Task Scheduler (frequency count)
      const raw = input.replace(/[^a-zA-Z,]/g, "").toUpperCase();
      const tasks = raw.length >= 2
        ? raw.split(",").flatMap((s) => s.split(""))
        : "AAABBC".split("");
      const n = 2; // cooldown

      const freq: Record<string, number> = {};
      for (const t of tasks) freq[t] = (freq[t] ?? 0) + 1;

      const maxFreq = Math.max(...Object.values(freq));
      const maxCount = Object.values(freq).filter((f) => f === maxFreq).length;
      const result = Math.max(
        tasks.length,
        (maxFreq - 1) * (n + 1) + maxCount
      );

      const steps: PracticeStep[] = [
        { label: "Tasks", value: `[${tasks.join(",")}]  n=${n}` },
      ];
      for (const [ch, cnt] of Object.entries(freq)) {
        steps.push({ label: `freq('${ch}')`, value: `${cnt}` });
      }
      steps.push({ label: "maxFreq", value: `${maxFreq}` });
      steps.push({ label: "maxCount", value: `${maxCount}` });
      steps.push({
        label: "intervals",
        value: `(${maxFreq}-1)*(${n}+1)+${maxCount} = ${(maxFreq - 1) * (n + 1) + maxCount}`,
      });
      steps.push({
        label: "Result",
        value: `max(${tasks.length}, ${(maxFreq - 1) * (n + 1) + maxCount}) = ${result}`,
        highlight: true,
      });

      return {
        code: [
          "function leastInterval(tasks, n) {",
          "  const freq = {};",
          "  for (const t of tasks) freq[t]=(freq[t]??0)+1;",
          "  const maxF = Math.max(...Object.values(freq));",
          "  const maxC = Object.values(freq).filter(f=>f===maxF).length;",
          "  return Math.max(tasks.length, (maxF-1)*(n+1)+maxC);",
          "}",
          `console.log(leastInterval([${tasks.map((t) => `"${t}"`).join(",")}], ${n}));`,
          `// ${result}`,
        ].join("\n"),
        output: `minimum intervals: ${result}`,
        steps,
      };
    }

    case "slidingWindowMax": {
      // LC 239 — Sliding Window Maximum (deque/monotonic queue)
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const arr = nums.length >= 3 ? nums.slice(0, 8) : [1, 3, -1, -3, 5, 3, 6, 7];
      const k = 3;

      const deque: number[] = []; // stores indices
      const result: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Array", value: `[${arr.join(", ")}]  k=${k}` },
      ];

      for (let i = 0; i < arr.length; i++) {
        while (deque.length && deque[0] < i - k + 1) deque.shift();
        while (deque.length && arr[deque[deque.length - 1]] < arr[i]) deque.pop();
        deque.push(i);
        if (i >= k - 1) {
          result.push(arr[deque[0]]);
          steps.push({
            label: `i=${i}`,
            value: `deque:[${deque.map((d) => arr[d]).join(",")}]  max=${arr[deque[0]]}`,
            highlight: i >= k - 1,
          });
        } else {
          steps.push({
            label: `i=${i}`,
            value: `deque:[${deque.map((d) => arr[d]).join(",")}]  (filling window)`,
          });
        }
      }

      steps.push({
        label: "Result",
        value: `[${result.join(", ")}]`,
        highlight: true,
      });

      return {
        code: [
          "function maxSlidingWindow(nums, k) {",
          "  const deque = [], result = [];",
          "  for (let i = 0; i < nums.length; i++) {",
          "    while (deque.length && deque[0] < i - k + 1) deque.shift();",
          "    while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();",
          "    deque.push(i);",
          "    if (i >= k - 1) result.push(nums[deque[0]]);",
          "  }",
          "  return result;",
          "}",
          `console.log(maxSlidingWindow([${arr.join(",")}], ${k}));`,
          `// [${result.join(", ")}]`,
        ].join("\n"),
        output: `[${result.join(", ")}]`,
        steps,
      };
    }
  }
}

// ─── Labels & colours ─────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  designCircular: "Design Circular Queue  (LC 622)",
  taskScheduler: "Task Scheduler  (LC 621)",
  slidingWindowMax: "Sliding Window Max  (LC 239)",
};

const practiceColor: Record<PracticeTab, string> = {
  designCircular:
    "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  taskScheduler:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  slidingWindowMax:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const tabDefaults: Record<PracticeTab, string> = {
  designCircular: "4,10,20,30,40,50",
  taskScheduler: "A,A,A,B,B,C",
  slidingWindowMax: "1,3,-1,-3,5,3,6,7",
};

const tabPlaceholders: Record<PracticeTab, string> = {
  designCircular: "k,v1,v2,... e.g. 4,10,20,30,40",
  taskScheduler: "e.g. A,A,A,B,B,C",
  slidingWindowMax: "e.g. 1,3,-1,-3,5,3,6,7",
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const DEFAULT_CAPACITY = 5;

function MainSection() {
  const [input, setInput] = useState("10,20,30,40");
  const [hasRun, setHasRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildCircularQueue> | null>(null);

  const handleRun = async () => {
    const r = buildCircularQueue(input, DEFAULT_CAPACITY);
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

  // Build slots for diagram
  const slots: CircularSlot[] = step
    ? step.buffer.map((v, i) => ({
        value: v,
        isHead: i === step.head && step.size > 0,
        isTail: i === (step.tail - 1 + step.capacity) % step.capacity && step.size > 0,
        isActive: i === step.activeIdx,
        isDequeuing: step.isDequeuing,
      }))
    : Array(DEFAULT_CAPACITY).fill({
        value: null,
        isHead: false,
        isTail: false,
        isActive: false,
        isDequeuing: false,
      });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Circular Queue (Ring Buffer) — capacity {DEFAULT_CAPACITY}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Values to enqueue (comma-separated, max {DEFAULT_CAPACITY})
              </label>
              <input
                className="w-full rounded-md border bg-background px-3 py-1.5 text-sm font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 10,20,30,40"
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
                <CircularQueueDiagram slots={slots} />
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
                      style={{ backgroundColor: "#22c55e30", borderColor: "#22c55e" }}
                    />
                    enqueued
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{ backgroundColor: "#ef444430", borderColor: "#ef4444" }}
                    />
                    dequeued
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-blue-500 font-bold text-xs">H</span>
                    <span>head</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-amber-500 font-bold text-xs">T</span>
                    <span>tail</span>
                  </span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-72">
              {result?.code ?? buildCircularQueue(input, DEFAULT_CAPACITY).code}
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
  const [tab, setTab] = useState<PracticeTab>("designCircular");
  const [input, setInput] = useState(tabDefaults["designCircular"]);
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
export function CircularQueueVisualization() {
  return (
    <div className="space-y-6">
      <MainSection />
      <PracticeSection />
    </div>
  );
}
