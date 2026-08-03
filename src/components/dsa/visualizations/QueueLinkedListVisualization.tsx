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

// ─── Node Diagram ─────────────────────────────────────────────────────────────
interface NodeEl {
  id: number;
  val: number;
}

function NodeDiagram({
  nodes,
  activeId,
  isDequeuing,
}: {
  nodes: NodeEl[];
  activeId: number;
  isDequeuing: boolean;
}) {
  return (
    <div className="overflow-x-auto py-3">
      <div className="flex items-center gap-0 min-w-fit">
        {nodes.length > 0 && (
          <div className="flex flex-col items-center mr-2 shrink-0">
            <span className="text-[10px] font-semibold text-blue-500">HEAD</span>
            <span className="text-[10px] text-blue-500">= FRONT</span>
          </div>
        )}
        <AnimatePresence initial={false}>
          {nodes.map((node, i) => {
            const isActive = node.id === activeId;
            const isTail = i === nodes.length - 1;
            return (
              <motion.div
                key={node.id}
                initial={isTail ? { opacity: 0, x: 28 } : { opacity: 1 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-0"
              >
                <div
                  className="flex rounded-lg border-2 overflow-hidden font-mono text-sm"
                  style={{
                    borderColor: isActive
                      ? isDequeuing
                        ? "#ef4444"
                        : "#22c55e"
                      : undefined,
                  }}
                >
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? isDequeuing
                          ? "#ef444430"
                          : "#22c55e30"
                        : "transparent",
                    }}
                    transition={{ duration: 0.25 }}
                    className="px-3 py-2 font-bold min-w-[2.25rem] text-center"
                  >
                    {node.val}
                  </motion.div>
                  <div className="px-2 py-2 border-l border-border text-muted-foreground text-xs flex items-center">
                    →
                  </div>
                </div>
                {i < nodes.length - 1 && (
                  <span className="text-muted-foreground text-sm px-0.5">→</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
        {nodes.length > 0 ? (
          <>
            <span className="text-sm text-muted-foreground ml-1.5 font-mono">
              null
            </span>
            <div className="flex flex-col items-center ml-3 shrink-0">
              <span className="text-[10px] font-semibold text-amber-500">TAIL</span>
              <span className="text-[10px] text-amber-500">= REAR</span>
            </div>
          </>
        ) : (
          <span className="text-sm text-muted-foreground italic font-mono">
            head = null (empty)
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface LLQueueStep {
  nodes: NodeEl[];
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

// ─── buildQueueLL ─────────────────────────────────────────────────────────────
function buildQueueLL(input: string): {
  arr: number[];
  steps: LLQueueStep[];
  code: string;
  output: string[];
} {
  let nextId = 0;
  const parsed = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = parsed.length >= 2 ? parsed.slice(0, 6) : [10, 20, 30, 40, 50];

  const steps: LLQueueStep[] = [];
  const nodes: NodeEl[] = []; // nodes[0]=head=front, nodes[last]=tail=rear

  steps.push({
    nodes: [],
    activeId: -1,
    isDequeuing: false,
    action: "new Queue()",
    msg: "Queue created — head = tail = null  (FIFO: First In, First Out)",
  });

  for (const val of arr) {
    const el: NodeEl = { id: nextId++, val };
    nodes.push(el); // append to tail
    steps.push({
      nodes: [...nodes],
      activeId: el.id,
      isDequeuing: false,
      action: `enqueue(${val})`,
      msg: `new Node(${val}) → tail.next = node → tail = node  |  size = ${nodes.length}`,
    });
  }

  const frontNode = nodes[0];
  steps.push({
    nodes: [...nodes],
    activeId: frontNode.id,
    isDequeuing: false,
    action: `peek() → ${frontNode.val}`,
    msg: `peek() returns head.val = ${frontNode.val} without modifying the list`,
  });

  const dequeued = nodes.shift()!;
  steps.push({
    nodes: [...nodes],
    activeId: nodes.length ? nodes[0].id : -1,
    isDequeuing: true,
    action: `dequeue() → ${dequeued.val}`,
    msg: `head = head.next — removes ${dequeued.val}  ←  FIFO!${
      nodes.length
        ? `  new front = ${nodes[0].val}`
        : "  list is now empty"
    }`,
  });

  const listStr = arr.join(" → ") + " → null";

  return {
    arr,
    steps,
    code: [
      "class Node {",
      "  constructor(val) { this.val = val; this.next = null; }",
      "}",
      "class Queue {",
      "  constructor() { this.head = null; this.tail = null; this._size = 0; }",
      "  enqueue(val) {",
      "    const n = new Node(val);  // O(1)",
      "    if (!this.tail) { this.head = this.tail = n; }",
      "    else { this.tail.next = n; this.tail = n; }",
      "    this._size++;",
      "  }",
      "  dequeue() {",
      "    if (!this.head) return null;",
      "    const v = this.head.val; // O(1)",
      "    this.head = this.head.next;",
      "    if (!this.head) this.tail = null;",
      "    this._size--;",
      "    return v;",
      "  }",
      "  peek() { return this.head?.val ?? null; }",
      "  size()  { return this._size; }",
      "}",
      "const q = new Queue();",
      ...arr.map((v) => `q.enqueue(${v});`),
      `// list: ${listStr}`,
      `console.log("peek:", q.peek());      // ${arr[0]}`,
      `console.log("dequeue:", q.dequeue()); // ${arr[0]}`,
    ].join("\n"),
    output: [
      `List: ${listStr}`,
      `peek()    → ${arr[0]}`,
      `dequeue() → ${arr[0]}`,
      `size()    → ${arr.length - 1}`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "levelOrder" | "hitCounter" | "rottingOranges";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "levelOrder": {
      // BFS level-order traversal of a simple binary tree
      // Input: array representing level-order values (null = missing)
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const arr = nums.length >= 3 ? nums.slice(0, 7) : [3, 9, 20, 15, 7, 4, 2];

      // Build tree levels using queue-like BFS simulation
      const levels: number[][] = [];
      const queue: { val: number; level: number }[] = arr.map((v, i) => ({
        val: v,
        level: Math.floor(Math.log2(i + 1)),
      }));

      const levelMap: Record<number, number[]> = {};
      for (const { val, level } of queue) {
        if (!levelMap[level]) levelMap[level] = [];
        levelMap[level].push(val);
      }
      for (const lvl of Object.keys(levelMap).sort()) {
        levels.push(levelMap[Number(lvl)]);
      }

      const steps: PracticeStep[] = [
        { label: "Tree", value: `[${arr.join(", ")}] (level-order)` },
      ];

      const processQueue: number[] = [arr[0]];
      let idx = 1;
      let levelNum = 0;

      while (processQueue.length && idx <= arr.length) {
        const size = processQueue.length;
        const level: number[] = [];
        for (let i = 0; i < size; i++) {
          const val = processQueue.shift()!;
          level.push(val);
          if (idx < arr.length) { processQueue.push(arr[idx++]); }
          if (idx < arr.length) { processQueue.push(arr[idx++]); }
        }
        steps.push({
          label: `Level ${levelNum}`,
          value: `[${level.join(", ")}]  queue:[${processQueue.join(",")}]`,
        });
        levelNum++;
      }

      const resultStr = levels.map((l) => `[${l.join(",")}]`).join(", ");
      steps.push({
        label: "Result",
        value: `[${resultStr}]`,
        highlight: true,
      });

      return {
        code: [
          "function levelOrder(root) {",
          "  if (!root) return [];",
          "  const q = [root], result = [];",
          "  while (q.length) {",
          "    const size = q.length, level = [];",
          "    for (let i = 0; i < size; i++) {",
          "      const node = q.shift();",
          "      level.push(node.val);",
          "      if (node.left)  q.push(node.left);",
          "      if (node.right) q.push(node.right);",
          "    }",
          "    result.push(level);",
          "  }",
          "  return result;",
          "}",
          `// Tree: [${arr.join(", ")}]`,
          `// Output: [${resultStr}]`,
        ].join("\n"),
        output: `[${resultStr}]`,
        steps,
      };
    }

    case "hitCounter": {
      // Design Hit Counter — track hits in last 300 seconds
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n))
        .sort((a, b) => a - b);
      const timestamps = nums.length >= 2 ? nums.slice(0, 6) : [1, 2, 3, 301, 302, 303];

      const queue: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Hits", value: `[${timestamps.join(", ")}]` },
      ];

      for (const t of timestamps) {
        queue.push(t);
        while (queue[0] <= t - 300) queue.shift();
        steps.push({
          label: `hit(${t})`,
          value: `window:[${queue.join(",")}]  count=${queue.length}`,
        });
      }

      const lastT = timestamps[timestamps.length - 1];
      const finalCount = queue.length;
      steps.push({
        label: `getHits(${lastT})`,
        value: `${finalCount} hits in last 300s`,
        highlight: true,
      });

      return {
        code: [
          "class HitCounter {",
          "  constructor() { this.q = []; }",
          "  hit(timestamp) { this.q.push(timestamp); }",
          "  getHits(timestamp) {",
          "    while (this.q[0] <= timestamp - 300)",
          "      this.q.shift();",
          "    return this.q.length;",
          "  }",
          "}",
          "const hc = new HitCounter();",
          ...timestamps.map((t) => `hc.hit(${t});`),
          `console.log(hc.getHits(${lastT})); // ${finalCount}`,
        ].join("\n"),
        output: `getHits(${lastT}) → ${finalCount}`,
        steps,
      };
    }

    case "rottingOranges": {
      // Simplified: trace BFS spread rounds
      // Input: comma-separated row of oranges (0=empty, 1=fresh, 2=rotten)
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => n >= 0 && n <= 2);
      const grid1D = nums.length >= 3 ? nums.slice(0, 9) : [2, 1, 1, 1, 1, 0, 0, 1, 1];

      const steps: PracticeStep[] = [
        { label: "Grid", value: `[${grid1D.join(",")}]  (0=empty,1=fresh,2=rotten)` },
      ];

      const state = [...grid1D];
      let minutes = 0;
      let changed = true;

      while (changed) {
        changed = false;
        const next = [...state];
        for (let i = 0; i < state.length; i++) {
          if (state[i] === 2) {
            // neighbors in 1D (just left/right for simplicity)
            for (const ni of [i - 1, i + 1]) {
              if (ni >= 0 && ni < state.length && state[ni] === 1) {
                next[ni] = 2;
                changed = true;
              }
            }
          }
        }
        if (changed) {
          minutes++;
          for (let i = 0; i < state.length; i++) state[i] = next[i];
          steps.push({
            label: `min ${minutes}`,
            value: `[${state.join(",")}]`,
          });
        }
      }

      const hasFresh = state.includes(1);
      steps.push({
        label: "Result",
        value: hasFresh ? "-1 (unreachable fresh)" : `${minutes} minutes`,
        highlight: true,
      });

      return {
        code: [
          "// BFS: rotting oranges spread minute by minute",
          "function orangesRotting(grid) {",
          "  const q = [];",
          "  let fresh = 0, minutes = 0;",
          "  for (let i=0;i<grid.length;i++)",
          "    for (let j=0;j<grid[0].length;j++) {",
          "      if (grid[i][j]===2) q.push([i,j]);",
          "      if (grid[i][j]===1) fresh++;",
          "    }",
          "  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];",
          "  while (q.length && fresh) {",
          "    minutes++;",
          "    for (let s=q.length;s--;) {",
          "      const [r,c] = q.shift();",
          "      for (const [dr,dc] of dirs) {",
          "        const nr=r+dr, nc=c+dc;",
          "        if (grid[nr]?.[nc]===1) {",
          "          grid[nr][nc]=2; fresh--; q.push([nr,nc]);",
          "        }",
          "      }",
          "    }",
          "  }",
          "  return fresh ? -1 : minutes;",
          "}",
          `// 1D simulation result: ${hasFresh ? -1 : minutes}`,
        ].join("\n"),
        output: hasFresh ? "-1 (some fresh oranges unreachable)" : `${minutes} minutes`,
        steps,
      };
    }
  }
}

// ─── Labels & colours ─────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  levelOrder: "BFS Level Order  (LC 102)",
  hitCounter: "Hit Counter  (LC 362)",
  rottingOranges: "Rotting Oranges  (LC 994)",
};

const practiceColor: Record<PracticeTab, string> = {
  levelOrder:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  hitCounter:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  rottingOranges:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const tabDefaults: Record<PracticeTab, string> = {
  levelOrder: "3,9,20,15,7,4,2",
  hitCounter: "1,2,3,301,302,303",
  rottingOranges: "2,1,1,1,1,0,0,1,1",
};

const tabPlaceholders: Record<PracticeTab, string> = {
  levelOrder: "e.g. 3,9,20,15,7",
  hitCounter: "e.g. 1,2,3,301,302",
  rottingOranges: "e.g. 2,1,1,0,1 (0/1/2)",
};

// ─── Main Section ─────────────────────────────────────────────────────────────
function MainSection() {
  const [input, setInput] = useState("10,20,30,40,50");
  const [hasRun, setHasRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildQueueLL> | null>(
    null
  );

  const handleRun = async () => {
    const r = buildQueueLL(input);
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
        <CardTitle className="text-base">Queue using Linked List</CardTitle>
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
                <NodeDiagram
                  nodes={step.nodes}
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
                    enqueued / tail
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
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-72">
              {result?.code ?? buildQueueLL(input).code}
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
  const [tab, setTab] = useState<PracticeTab>("levelOrder");
  const [input, setInput] = useState(tabDefaults["levelOrder"]);
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
export function QueueLinkedListVisualization() {
  return (
    <div className="space-y-6">
      <MainSection />
      <PracticeSection />
    </div>
  );
}
