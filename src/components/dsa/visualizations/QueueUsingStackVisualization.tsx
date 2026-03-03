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

// ─── Two-Stack Diagram ────────────────────────────────────────────────────────
interface TwoStackEl {
  id: number;
  val: number;
}

function TwoStackDiagram({
  inbox,
  outbox,
  activeInbox,
  activeOutbox,
  isPour,
  isDequeuing,
}: {
  inbox: TwoStackEl[];
  outbox: TwoStackEl[];
  activeInbox: number;
  activeOutbox: number;
  isPour: boolean;
  isDequeuing: boolean;
}) {
  const renderStack = (
    items: TwoStackEl[],
    label: string,
    sublabel: string,
    activeId: number,
    isOut: boolean
  ) => {
    const reversed = [...items].reverse();
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-semibold text-primary tracking-widest uppercase">
          Top
        </span>
        <div className="border-2 border-dashed border-border rounded-xl px-4 py-3 min-h-[60px] flex flex-col gap-1.5 items-center w-fit">
          <AnimatePresence initial={false}>
            {reversed.map((el) => {
              const isActive = el.id === activeId;
              const isGreen = isActive && !isOut && !isPour;
              const isRed = isActive && isOut && isDequeuing;
              const isOrange = isPour && isActive;
              return (
                <motion.div
                  key={el.id}
                  initial={{ opacity: 0, y: -14, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    backgroundColor: isRed
                      ? "#ef444430"
                      : isOrange
                      ? "#f59e0b30"
                      : isGreen
                      ? "#22c55e30"
                      : "transparent",
                  }}
                  exit={{ opacity: 0, y: -14, scale: 0.85 }}
                  transition={{ duration: 0.25 }}
                  className="w-12 h-9 flex items-center justify-center rounded-lg border-2 font-mono text-sm font-bold"
                  style={{
                    borderColor: isRed
                      ? "#ef4444"
                      : isOrange
                      ? "#f59e0b"
                      : isGreen
                      ? "#22c55e"
                      : undefined,
                  }}
                >
                  {el.val}
                </motion.div>
              );
            })}
          </AnimatePresence>
          {items.length === 0 && (
            <p className="text-xs text-muted-foreground italic px-1 py-1">
              empty
            </p>
          )}
        </div>
        <div className="w-20 border-b-2 border-border/60 my-0.5" />
        <p className="text-[11px] font-semibold text-primary">{label}</p>
        <p className="text-[10px] text-muted-foreground">{sublabel}</p>
      </div>
    );
  };

  return (
    <div className="flex items-end gap-6 py-2 overflow-x-auto">
      {renderStack(inbox, "Inbox", "(enqueue here)", activeInbox, false)}
      <div className="flex flex-col items-center gap-1 pb-8">
        <motion.span
          animate={{ opacity: isPour ? 1 : 0.3, x: isPour ? [0, 4, 0] : 0 }}
          transition={{ duration: 0.4, repeat: isPour ? 2 : 0 }}
          className="text-lg text-amber-500"
        >
          →
        </motion.span>
        <span className="text-[10px] text-muted-foreground">pour</span>
      </div>
      {renderStack(outbox, "Outbox", "(dequeue here)", activeOutbox, true)}
    </div>
  );
}

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface QSStep {
  inbox: TwoStackEl[];
  outbox: TwoStackEl[];
  activeInbox: number;
  activeOutbox: number;
  isPour: boolean;
  isDequeuing: boolean;
  action: string;
  msg: string;
}

interface PracticeStep {
  label: string;
  value: string;
  highlight?: boolean;
}

// ─── buildQueueUsingStack ─────────────────────────────────────────────────────
function buildQueueUsingStack(input: string): {
  arr: number[];
  steps: QSStep[];
  code: string;
  output: string[];
} {
  let nextId = 0;
  const parsed = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n));
  const arr = parsed.length >= 2 ? parsed.slice(0, 5) : [1, 2, 3, 4, 5];

  const steps: QSStep[] = [];
  const inbox: TwoStackEl[] = [];
  const outbox: TwoStackEl[] = [];

  steps.push({
    inbox: [],
    outbox: [],
    activeInbox: -1,
    activeOutbox: -1,
    isPour: false,
    isDequeuing: false,
    action: "new MyQueue()",
    msg: "Queue created — two stacks: inbox (for enqueue) + outbox (for dequeue)",
  });

  for (const val of arr) {
    const el: TwoStackEl = { id: nextId++, val };
    inbox.push(el);
    steps.push({
      inbox: [...inbox],
      outbox: [...outbox],
      activeInbox: el.id,
      activeOutbox: -1,
      isPour: false,
      isDequeuing: false,
      action: `enqueue(${val})`,
      msg: `inbox.push(${val}) — O(1)  |  inbox size = ${inbox.length}`,
    });
  }

  // Peek — triggers pour
  if (!outbox.length) {
    steps.push({
      inbox: [...inbox],
      outbox: [...outbox],
      activeInbox: inbox.length ? inbox[inbox.length - 1].id : -1,
      activeOutbox: -1,
      isPour: true,
      isDequeuing: false,
      action: "peek() → pour inbox → outbox",
      msg: "outbox empty → pour all inbox items into outbox (reverses order → FIFO!)",
    });
    while (inbox.length) outbox.push(inbox.pop()!);
  }

  const frontEl = outbox[outbox.length - 1];
  steps.push({
    inbox: [...inbox],
    outbox: [...outbox],
    activeInbox: -1,
    activeOutbox: frontEl.id,
    isPour: false,
    isDequeuing: false,
    action: `peek() → ${frontEl.val}`,
    msg: `peek() returns outbox.top = ${frontEl.val} without removing — O(1) amortized`,
  });

  // Dequeue
  const dequeued = outbox.pop()!;
  steps.push({
    inbox: [...inbox],
    outbox: [...outbox],
    activeInbox: -1,
    activeOutbox: outbox.length ? outbox[outbox.length - 1].id : -1,
    isPour: false,
    isDequeuing: true,
    action: `dequeue() → ${dequeued.val}`,
    msg: `outbox.pop() removes ${dequeued.val}  ←  FIFO achieved via pour!${
      outbox.length
        ? `  next front = ${outbox[outbox.length - 1].val}`
        : "  outbox empty (will pour from inbox on next dequeue)"
    }`,
  });

  return {
    arr,
    steps,
    code: [
      "class MyQueue {",
      "  constructor() { this.inbox = []; this.outbox = []; }",
      "",
      "  enqueue(val) {",
      "    this.inbox.push(val); // always O(1)",
      "  }",
      "",
      "  _pour() {",
      "    if (!this.outbox.length) // lazy transfer",
      "      while (this.inbox.length)",
      "        this.outbox.push(this.inbox.pop());",
      "  }",
      "",
      "  dequeue() {",
      "    this._pour();",
      "    return this.outbox.pop() ?? null; // amortized O(1)",
      "  }",
      "",
      "  peek() {",
      "    this._pour();",
      "    return this.outbox.at(-1) ?? null;",
      "  }",
      "",
      "  isEmpty() { return !this.inbox.length && !this.outbox.length; }",
      "}",
      "",
      "const q = new MyQueue();",
      ...arr.map((v) => `q.enqueue(${v});`),
      `console.log("peek:", q.peek());       // ${arr[0]}`,
      `console.log("dequeue:", q.dequeue()); // ${arr[0]}`,
      `console.log("peek:", q.peek());       // ${arr[1]}`,
    ].join("\n"),
    output: [
      `Enqueued: [${arr.join(", ")}]`,
      `peek()    → ${arr[0]}  (after pour)`,
      `dequeue() → ${arr[0]}`,
      `peek()    → ${arr[1]}`,
    ],
  };
}

// ─── buildPractice ────────────────────────────────────────────────────────────
type PracticeTab = "implementQueue" | "decodeString" | "asteroidCollision";

function buildPractice(
  tab: PracticeTab,
  input: string
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "implementQueue": {
      // LC 232 — step-by-step trace
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
          label: "dequeue()",
          value: `→ ${dq}  outbox:[${outbox.join(",")}]`,
          highlight: true,
        });
      }

      return {
        code: [
          "class MyQueue {",
          "  constructor() { this.inbox=[]; this.outbox=[]; }",
          "  push(v)  { this.inbox.push(v); }",
          "  pop() { this._pour(); return this.outbox.pop(); }",
          "  peek() { this._pour(); return this.outbox.at(-1); }",
          "  empty() { return !this.inbox.length && !this.outbox.length; }",
          "  _pour() { if(!this.outbox.length) while(this.inbox.length) this.outbox.push(this.inbox.pop()); }",
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

    case "decodeString": {
      // LC 394 — Decode String using stack
      const raw = input.trim();
      const s = /\d/.test(raw) && raw.includes("[") ? raw : "3[a2[b]]";

      const stack: { str: string; repeat: number }[] = [];
      let curStr = "";
      let curNum = 0;
      const steps: PracticeStep[] = [
        { label: "Input", value: `"${s}"` },
      ];

      for (const ch of s) {
        if (/\d/.test(ch)) {
          curNum = curNum * 10 + Number(ch);
          steps.push({ label: `'${ch}'`, value: `curNum=${curNum}` });
        } else if (ch === "[") {
          stack.push({ str: curStr, repeat: curNum });
          curStr = "";
          curNum = 0;
          steps.push({ label: `'['`, value: `push  stack depth=${stack.length}` });
        } else if (ch === "]") {
          const { str: prev, repeat } = stack.pop()!;
          curStr = prev + curStr.repeat(repeat);
          steps.push({ label: `']'`, value: `"${curStr}"` });
        } else {
          curStr += ch;
          steps.push({ label: `'${ch}'`, value: `curStr="${curStr}"` });
        }
      }

      steps.push({ label: "Result", value: `"${curStr}"`, highlight: true });

      return {
        code: [
          "function decodeString(s) {",
          "  const stack = [];",
          "  let curStr = '', curNum = 0;",
          "  for (const ch of s) {",
          "    if (/\\d/.test(ch)) { curNum = curNum*10 + +ch; }",
          "    else if (ch === '[') { stack.push([curStr, curNum]); curStr=''; curNum=0; }",
          "    else if (ch === ']') {",
          "      const [prev, k] = stack.pop();",
          "      curStr = prev + curStr.repeat(k);",
          "    } else { curStr += ch; }",
          "  }",
          "  return curStr;",
          "}",
          `console.log(decodeString("${s}")); // "${curStr}"`,
        ].join("\n"),
        output: `"${curStr}"`,
        steps,
      };
    }

    case "asteroidCollision": {
      // LC 735 — Asteroid Collision using stack
      const nums = input
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n));
      const asteroids = nums.length >= 2 ? nums.slice(0, 7) : [5, 10, -5, -10, 8, -8, 3];

      const stack: number[] = [];
      const steps: PracticeStep[] = [
        { label: "Input", value: `[${asteroids.join(", ")}]` },
      ];

      for (const a of asteroids) {
        let exploded = false;
        while (stack.length && a < 0 && stack[stack.length - 1] > 0) {
          const top = stack[stack.length - 1];
          if (top < -a) {
            stack.pop();
            steps.push({
              label: `${a} hits ${top}`,
              value: `${top} explodes  stack:[${stack.join(",")}]`,
            });
          } else if (top === -a) {
            stack.pop();
            exploded = true;
            steps.push({
              label: `${a} hits ${top}`,
              value: `both explode  stack:[${stack.join(",")}]`,
            });
            break;
          } else {
            exploded = true;
            steps.push({
              label: `${a} hits ${top}`,
              value: `${a} explodes  stack:[${stack.join(",")}]`,
            });
            break;
          }
        }
        if (!exploded) {
          stack.push(a);
          steps.push({
            label: `push ${a}`,
            value: `stack:[${stack.join(",")}]`,
          });
        }
      }

      steps.push({
        label: "Result",
        value: `[${stack.join(", ")}]`,
        highlight: true,
      });

      return {
        code: [
          "function asteroidCollision(asteroids) {",
          "  const stack = [];",
          "  for (const a of asteroids) {",
          "    let exploded = false;",
          "    while (stack.length && a < 0 && stack.at(-1) > 0) {",
          "      if (stack.at(-1) < -a)      { stack.pop(); continue; }",
          "      else if (stack.at(-1) === -a) { stack.pop(); }",
          "      exploded = true; break;",
          "    }",
          "    if (!exploded) stack.push(a);",
          "  }",
          "  return stack;",
          "}",
          `console.log(asteroidCollision([${asteroids.join(",")}]));`,
          `// [${stack.join(", ")}]`,
        ].join("\n"),
        output: `[${stack.join(", ")}]`,
        steps,
      };
    }
  }
}

// ─── Labels & colours ─────────────────────────────────────────────────────────
const practiceLabel: Record<PracticeTab, string> = {
  implementQueue: "Implement Queue  (LC 232)",
  decodeString: "Decode String  (LC 394)",
  asteroidCollision: "Asteroid Collision  (LC 735)",
};

const practiceColor: Record<PracticeTab, string> = {
  implementQueue:
    "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  decodeString:
    "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  asteroidCollision:
    "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const tabDefaults: Record<PracticeTab, string> = {
  implementQueue: "1,2,3,4,5",
  decodeString: "3[a2[b]]",
  asteroidCollision: "5,10,-5,-10,8,-8,3",
};

const tabPlaceholders: Record<PracticeTab, string> = {
  implementQueue: "e.g. 1,2,3,4,5",
  decodeString: "e.g. 3[a2[b]]",
  asteroidCollision: "e.g. 5,10,-5,-10,8",
};

// ─── Main Section ─────────────────────────────────────────────────────────────
function MainSection() {
  const [input, setInput] = useState("1,2,3,4,5");
  const [hasRun, setHasRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildQueueUsingStack> | null>(null);

  const handleRun = async () => {
    const r = buildQueueUsingStack(input);
    setResult(r);
    setHasRun(true);
    setStepIndex(0);
    for (let i = 0; i < r.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 650));
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
        <CardTitle className="text-base">Queue using Two Stacks</CardTitle>
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
                placeholder="e.g. 1,2,3,4,5"
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
                <TwoStackDiagram
                  inbox={step.inbox}
                  outbox={step.outbox}
                  activeInbox={step.activeInbox}
                  activeOutbox={step.activeOutbox}
                  isPour={step.isPour}
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
                      style={{ backgroundColor: "#22c55e30", borderColor: "#22c55e" }}
                    />
                    enqueued
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{ backgroundColor: "#f59e0b30", borderColor: "#f59e0b" }}
                    />
                    pour transfer
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm border"
                      style={{ backgroundColor: "#ef444430", borderColor: "#ef4444" }}
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
              {result?.code ?? buildQueueUsingStack(input).code}
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
  const [tab, setTab] = useState<PracticeTab>("implementQueue");
  const [input, setInput] = useState(tabDefaults["implementQueue"]);
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
export function QueueUsingStackVisualization() {
  return (
    <div className="space-y-6">
      <MainSection />
      <PracticeSection />
    </div>
  );
}
