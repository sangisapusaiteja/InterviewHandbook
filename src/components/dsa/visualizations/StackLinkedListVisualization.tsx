"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// ─── Console Output ──────────────────────────────────────────────────────────
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
  isPopping,
}: {
  nodes: NodeEl[];
  activeId: number;
  isPopping: boolean;
}) {
  return (
    <div className="overflow-x-auto py-3">
      <div className="flex items-center gap-0 min-w-fit">
        {nodes.length > 0 && (
          <div className="flex flex-col items-center mr-2 shrink-0">
            <span className="text-[10px] font-semibold text-primary">HEAD</span>
            <span className="text-[10px] text-muted-foreground">= TOP</span>
          </div>
        )}
        <AnimatePresence initial={false}>
          {nodes.map((node, i) => {
            const isActive = node.id === activeId;
            const isHead = i === 0;
            return (
              <motion.div
                key={node.id}
                initial={isHead ? { opacity: 0, x: -28 } : { opacity: 1 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-0"
              >
                <div
                  className="flex rounded-lg border-2 overflow-hidden font-mono text-sm"
                  style={{
                    borderColor: isActive
                      ? isPopping
                        ? "#ef4444"
                        : "#22c55e"
                      : undefined,
                  }}
                >
                  <motion.div
                    animate={{
                      backgroundColor: isActive
                        ? isPopping
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
          <span className="text-sm text-muted-foreground ml-1.5 font-mono">
            null
          </span>
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
interface LLStackStep {
  nodes: NodeEl[];
  activeId: number;
  isPopping: boolean;
  action: string;
  msg: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildStackLL ─────────────────────────────────────────────────────────────
function buildStackLL(input: string): {
  arr: number[];
  steps: LLStackStep[];
  code: string;
  output: string[];
} {
  let nextId = 0;
  const parsed = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = parsed.length >= 2 ? parsed.slice(0, 6) : [5, 3, 8, 1, 4];

  const steps: LLStackStep[] = [];
  const nodes: NodeEl[] = []; // nodes[0] = head = top

  steps.push({
    nodes: [],
    activeId: -1,
    isPopping: false,
    action: "new Stack()",
    msg: "Stack created — head = null  (LIFO: Last In, First Out)",
  });

  for (const val of arr) {
    const el: NodeEl = { id: nextId++, val };
    nodes.unshift(el); // prepend → new head
    steps.push({
      nodes: [...nodes],
      activeId: el.id,
      isPopping: false,
      action: `push(${val})`,
      msg: `new Node(${val}) → node.next = old head → head = node  |  size = ${nodes.length}`,
    });
  }

  const topNode = nodes[0];
  steps.push({
    nodes: [...nodes],
    activeId: topNode.id,
    isPopping: false,
    action: `peek() → ${topNode.val}`,
    msg: `peek() returns head.val = ${topNode.val} without modifying the list`,
  });

  const popped = nodes.shift()!;
  steps.push({
    nodes: [...nodes],
    activeId: nodes.length ? nodes[0].id : -1,
    isPopping: true,
    action: `pop() → ${popped.val}`,
    msg: `head = head.next — removes ${popped.val}  ←  LIFO!${
      nodes.length
        ? `  new head = ${nodes[0].val}`
        : "  list is now empty"
    }`,
  });

  // Pretty-print list: top → ... → null
  const listStr = arr.slice().reverse().join(" → ") + " → null";

  return {
    arr,
    steps,
    code: [
      "class Node {",
      "  constructor(val) { this.val = val; this.next = null; }",
      "}",
      "class Stack {",
      "  constructor() { this.head = null; this._size = 0; }",
      "  push(val) {",
      "    const n = new Node(val);  // O(1)",
      "    n.next = this.head;",
      "    this.head = n;",
      "    this._size++;",
      "  }",
      "  pop() {",
      "    if (!this.head) return null;",
      "    const v = this.head.val; // O(1)",
      "    this.head = this.head.next;",
      "    this._size--;",
      "    return v;",
      "  }",
      "  peek() { return this.head?.val ?? null; }",
      "  size()  { return this._size; }",
      "}",
      "const s = new Stack();",
      ...arr.map((v) => `s.push(${v});`),
      `// list: ${listStr}`,
      `console.log("peek:", s.peek()); // ${arr[arr.length - 1]}`,
      `console.log("pop:", s.pop());   // ${arr[arr.length - 1]}`,
    ].join("\n"),
    output: [
      `List: ${listStr}`,
      `peek() → ${arr[arr.length - 1]}`,
      `pop()  → ${arr[arr.length - 1]}`,
      `size() → ${arr.length - 1}`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "queueUsingStacks" | "sortStack" | "reverseWithStack";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "queueUsingStacks": {
      // LeetCode 232 — Implement Queue using Two Stacks
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const enqueued = nums.length >= 2 ? nums.slice(0, 5) : [1, 2, 3, 4, 5];

      const inbox: number[] = [];
      const outbox: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Enqueue", value: `[${enqueued.join(", ")}]` },
      ];

      for (const v of enqueued) {
        inbox.push(v);
        steps.push({
          label: `enqueue(${v})`,
          value: `inbox:[${inbox.join(",")}]  outbox:[${outbox.join(",")}]`,
        });
      }

      // dequeue 2 items
      for (let d = 0; d < 2; d++) {
        if (!outbox.length) {
          while (inbox.length) outbox.push(inbox.pop()!);
          steps.push({
            label: "pour",
            value: `inbox→outbox  outbox:[${outbox.join(",")}]`,
          });
        }
        const dq = outbox.pop()!;
        steps.push({
          label: `dequeue()`,
          value: `→ ${dq}  outbox:[${outbox.join(",")}]`,
          highlight: true,
        });
      }

      return {
        code: [
          "class MyQueue {",
          "  constructor() { this.inbox=[]; this.outbox=[]; }",
          "  push(v)  { this.inbox.push(v); }",
          "  pop() {",
          "    this._pour();",
          "    return this.outbox.pop();",
          "  }",
          "  peek() {",
          "    this._pour();",
          "    return this.outbox.at(-1);",
          "  }",
          "  _pour() {",
          "    if (!this.outbox.length)",
          "      while (this.inbox.length)",
          "        this.outbox.push(this.inbox.pop());",
          "  }",
          "}",
          "const q = new MyQueue();",
          ...enqueued.map((v) => `q.push(${v});`),
          `console.log(q.pop());  // ${enqueued[0]}`,
          `console.log(q.pop());  // ${enqueued[1]}`,
        ].join("\n"),
        output: `dequeue → ${enqueued[0]}, ${enqueued[1]}  (FIFO from two stacks)`,
        steps,
      };
    }

    case "sortStack": {
      // Sort a stack so smallest is on top, using one extra stack
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const arr = nums.length >= 2 ? nums.slice(0, 5) : [3, 1, 4, 2, 5];

      const src = [...arr];
      const tmp: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Input", value: `stack (top→bot): [${[...src].reverse().join(",")}]` },
      ];

      while (src.length) {
        const cur = src.pop()!;
        let moved = 0;
        while (tmp.length && tmp[tmp.length - 1] > cur) {
          src.push(tmp.pop()!);
          moved++;
        }
        tmp.push(cur);
        if (moved > 0) {
          steps.push({
            label: `insert ${cur}`,
            value: `moved ${moved} back  tmp:[${[...tmp].reverse().join(",")}]`,
          });
        } else {
          steps.push({
            label: `insert ${cur}`,
            value: `tmp:[${[...tmp].reverse().join(",")}]`,
          });
        }
      }

      steps.push({
        label: "Sorted",
        value: `top→bot: [${[...tmp].reverse().join(",")}]`,
        highlight: true,
      });

      return {
        code: [
          "function sortStack(stack) {",
          "  const tmp = [];",
          "  while (stack.length) {",
          "    const cur = stack.pop();",
          "    while (tmp.length && tmp.at(-1) > cur)",
          "      stack.push(tmp.pop());",
          "    tmp.push(cur);",
          "  }",
          "  return tmp; // smallest on top",
          "}",
          `const result = sortStack([${arr.join(",")}]);`,
          `console.log(result); // [${[...tmp].join(",")}]`,
        ].join("\n"),
        output: `[${[...tmp].join(", ")}]  (smallest on top)`,
        steps,
      };
    }

    case "reverseWithStack": {
      // Reverse an array/string using a stack
      const raw = input.trim();
      const chars =
        raw.length >= 2 ? raw.replace(/,/g, "").slice(0, 8).split("") : "hello".split("");

      const stk: string[] = [];
      const steps: PracticeStep[] = [
        { label: "Input", value: `"${chars.join("")}"` },
      ];

      for (const ch of chars) {
        stk.push(ch);
        steps.push({ label: `push '${ch}'`, value: `stack:[${stk.join(",")}]` });
      }

      const reversed: string[] = [];
      while (stk.length) {
        const c = stk.pop()!;
        reversed.push(c);
        steps.push({ label: `pop '${c}'`, value: `result: "${reversed.join("")}"` });
      }

      steps.push({
        label: "Result",
        value: `"${reversed.join("")}"`,
        highlight: true,
      });

      return {
        code: [
          "function reverseString(s) {",
          "  const stack = [];",
          "  for (const ch of s) stack.push(ch);",
          "  let result = '';",
          "  while (stack.length) result += stack.pop();",
          "  return result;",
          "}",
          `console.log(reverseString("${chars.join("")}"));`,
          `// "${reversed.join("")}"`,
        ].join("\n"),
        output: `"${reversed.join("")}"`,
        steps,
      };
    }
  }
}

// ─── Labels & colours ─────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  queueUsingStacks: "Queue via 2 Stacks  (LC 232)",
  sortStack: "Sort a Stack",
  reverseWithStack: "Reverse with Stack",
};

const practiceColor: Record<PracticeTab, string> = {
  queueUsingStacks:
    "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  sortStack:
    "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  reverseWithStack:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const tabDefaults: Record<PracticeTab, string> = {
  queueUsingStacks: "1,2,3,4,5",
  sortStack: "3,1,4,2,5",
  reverseWithStack: "hello",
};

const tabPlaceholders: Record<PracticeTab, string> = {
  queueUsingStacks: "e.g. 1,2,3,4,5",
  sortStack: "e.g. 3,1,4,2,5",
  reverseWithStack: "e.g. hello",
};

// ─── Main Section ─────────────────────────────────────────────────────────────
function MainSection() {
  const [input, setInput] = useState("5,3,8,1,4");
  const [hasRun, setHasRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildStackLL> | null>(
    null
  );

  const handleRun = async () => {
    const r = buildStackLL(input);
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
        <CardTitle className="text-base">Stack using Linked List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">
                Values to push (comma-separated)
              </label>
              <input
                className="w-full rounded-md border bg-background px-3 py-1.5 text-sm font-mono"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. 5,3,8,1,4"
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
                  isPopping={step.isPopping}
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
                    pushed / head
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{
                        backgroundColor: "#ef444430",
                        borderColor: "#ef4444",
                      }}
                    />
                    popped
                  </span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-3">
            <pre className="rounded-xl border bg-muted/50 px-4 py-3 text-xs font-mono overflow-auto max-h-72">
              {result?.code ?? buildStackLL(input).code}
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
  const [tab, setTab] = useState<PracticeTab>("queueUsingStacks");
  const [input, setInput] = useState(tabDefaults["queueUsingStacks"]);
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
export function StackLinkedListVisualization() {
  return (
    <div className="space-y-6">
      <MainSection />
      <PracticeSection />
    </div>
  );
}
