"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
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
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type PromiseTab = "basicChain" | "asyncChain" | "errorPropagation" | "commonMistakes";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<PromiseTab, GroupInfo> = {
  basicChain: {
    label: "Basic Chain",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Each .then() receives the value returned by the previous .then(). Values flow through the chain like a pipeline, transforming at each step.",
    codeSnippet: `Promise.resolve(1)
  .then((val) => {
    console.log(val);   // 1
    return val + 1;
  })
  .then((val) => {
    console.log(val);   // 2
    return val * 3;
  })
  .then((val) => {
    console.log(val);   // 6
    return "done: " + val;
  })
  .then((val) => {
    console.log(val);   // "done: 6"
  });`,
    codeOutput: ["1", "2", "6", "done: 6"],
  },
  asyncChain: {
    label: "Async Chain",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When a .then() returns a Promise, the next .then() waits for it to resolve. This lets you sequence async operations like fetching a user, then their orders, then order details.",
    codeSnippet: `function getUser(id) {
  return Promise.resolve({ id, name: "Alice" });
}
function getOrders(user) {
  return Promise.resolve([
    { orderId: 101, item: "Book" }
  ]);
}
function getDetails(order) {
  return Promise.resolve({
    ...order, status: "Shipped"
  });
}

getUser(1)
  .then((user) => {
    console.log("User:", user.name);
    return getOrders(user);
  })
  .then((orders) => {
    console.log("Orders:", orders.length);
    return getDetails(orders[0]);
  })
  .then((details) => {
    console.log("Detail:", details.item,
      "-", details.status);
  });`,
    codeOutput: [
      "User: Alice",
      "Orders: 1",
      "Detail: Book - Shipped",
    ],
  },
  errorPropagation: {
    label: "Error Propagation",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When an error is thrown (or a Promise rejects), it skips all subsequent .then() handlers and jumps straight to the nearest .catch(). After .catch() handles it, the chain continues normally.",
    codeSnippet: `Promise.resolve("start")
  .then((val) => {
    console.log(val);
    throw new Error("Oops!");
  })
  .then((val) => {
    // This is SKIPPED
    console.log("Never runs:", val);
  })
  .then((val) => {
    // This is also SKIPPED
    console.log("Also skipped:", val);
  })
  .catch((err) => {
    console.log("Caught:", err.message);
    return "recovered";
  })
  .then((val) => {
    console.log("After catch:", val);
  });`,
    codeOutput: [
      "start",
      "Caught: Oops!",
      "After catch: recovered",
    ],
  },
  commonMistakes: {
    label: "Common Mistakes",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Forgetting to return inside .then() breaks the chain -- the next .then() receives undefined. Nesting .then() inside .then() (instead of returning) creates callback-hell style code.",
    codeSnippet: `// Mistake 1: Forgetting to return
Promise.resolve(10)
  .then((val) => {
    val * 2; // no return!
  })
  .then((val) => {
    console.log("Broken:", val);
  });

// Mistake 2: Broken chain (nesting)
Promise.resolve("A")
  .then((val) => {
    // nested instead of returned
    Promise.resolve(val + "B")
      .then((inner) => {
        console.log("Nested:", inner);
      });
    // outer chain continues with undefined
  })
  .then((val) => {
    console.log("Outer:", val);
  });`,
    codeOutput: [
      "Broken: undefined",
      "Outer: undefined",
      "Nested: AB",
    ],
  },
};

const order: PromiseTab[] = ["basicChain", "asyncChain", "errorPropagation", "commonMistakes"];

// ─── chain diagram steps for Basic Chain ──────────────────────────────────────
const chainSteps = [
  { id: "start", label: "1", description: "Initial value", color: "bg-blue-500 text-white" },
  { id: "then1", label: "val + 1", description: ".then()", color: "bg-amber-500 text-white" },
  { id: "val2", label: "2", description: "Result", color: "bg-emerald-500 text-white" },
  { id: "then2", label: "val * 3", description: ".then()", color: "bg-violet-500 text-white" },
  { id: "val3", label: "6", description: "Result", color: "bg-rose-500 text-white" },
  { id: "then3", label: '"done: " + val', description: ".then()", color: "bg-cyan-500 text-white" },
  { id: "val4", label: '"done: 6"', description: "Final", color: "bg-blue-600 text-white" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    returnType: "Value",
    nextThenGets: "That value directly",
    example: "return 42",
  },
  {
    returnType: "Promise",
    nextThenGets: "Resolved value of that Promise",
    example: "return fetch(url)",
  },
  {
    returnType: "Nothing (undefined)",
    nextThenGets: "undefined",
    example: "// forgot return",
  },
  {
    returnType: "throw Error",
    nextThenGets: "Skipped -- goes to .catch()",
    example: 'throw new Error("fail")',
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function PromiseChainingVisualization() {
  const [selected, setSelected] = useState<PromiseTab>("basicChain");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: PromiseTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
  };

  const runChainAnimation = async () => {
    setAnimating(true);
    for (let i = 0; i < chainSteps.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 600));
    }
    await new Promise((r) => setTimeout(r, 400));
    setActiveStep(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Promise Chaining</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  promise
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* Interactive chain diagram for Basic Chain */}
            {selected === "basicChain" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Chain Flow
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {chainSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: activeStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeStep === idx
                                ? "0 0 16px rgba(59,130,246,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeStep === idx
                              ? step.color + " ring-2 ring-offset-2 ring-offset-background ring-blue-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">{step.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              activeStep === idx ? "opacity-90" : "opacity-60"
                            }`}
                          >
                            {step.description}
                          </span>
                        </motion.div>
                        {idx < chainSteps.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeStep === idx
                                  ? "rgb(59,130,246)"
                                  : "rgb(161,161,170)",
                            }}
                            className="text-lg font-bold select-none"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runChainAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Chain Behavior
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Return Type</span>
              <span>Next .then() Gets</span>
              <span>Example</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.returnType}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.returnType}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.nextThenGets}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
