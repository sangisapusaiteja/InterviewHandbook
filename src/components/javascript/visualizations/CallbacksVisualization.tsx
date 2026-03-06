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
type CallbackTab = "whatIs" | "syncCallbacks" | "asyncCallbacks" | "errorFirst";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<CallbackTab, GroupInfo> = {
  whatIs: {
    label: "What is a Callback?",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "A callback is a function passed as an argument to another function, which is then invoked inside the outer function to complete some kind of action or routine.",
    codeSnippet: `function greet(name, callback) {
  console.log("Hello, " + name + "!");
  callback();
}

function sayGoodbye() {
  console.log("Goodbye!");
}

greet("Alice", sayGoodbye);`,
    codeOutput: [
      "Hello, Alice!",
      "Goodbye!",
    ],
  },
  syncCallbacks: {
    label: "Sync Callbacks",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Synchronous callbacks are executed immediately during the execution of the higher-order function. Common examples include Array.map, forEach, and filter.",
    codeSnippet: `const nums = [1, 2, 3, 4, 5];

// map -- transform each element
const doubled = nums.map(n => n * 2);
console.log("map:", doubled);

// filter -- keep matching elements
const evens = nums.filter(n => n % 2 === 0);
console.log("filter:", evens);

// forEach -- side effects
nums.forEach(n => {
  console.log("forEach:", n);
});`,
    codeOutput: [
      "map: [2, 4, 6, 8, 10]",
      "filter: [2, 4]",
      "forEach: 1",
      "forEach: 2",
      "forEach: 3",
      "forEach: 4",
      "forEach: 5",
    ],
  },
  asyncCallbacks: {
    label: "Async Callbacks",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Asynchronous callbacks are executed after an async operation completes. They don't block the main thread, allowing other code to run while waiting.",
    codeSnippet: `console.log("Start");

// setTimeout -- runs callback after delay
setTimeout(() => {
  console.log("Timeout done (2s)");
}, 2000);

console.log("After setTimeout");

// Simulated API call
function fetchUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: "Alice" });
  }, 1000);
}

fetchUser(1, (user) => {
  console.log("User:", user.name);
});`,
    codeOutput: [
      "Start",
      "After setTimeout",
      "User: Alice          // after ~1s",
      "Timeout done (2s)    // after ~2s",
    ],
  },
  errorFirst: {
    label: "Error-First Pattern",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The error-first callback pattern is a Node.js convention where the first argument of the callback is reserved for an error object. If no error occurred, the first argument is null.",
    codeSnippet: `function readFile(path, callback) {
  if (path === "") {
    callback(new Error("Path is empty"), null);
    return;
  }
  // Simulate success
  callback(null, "File contents here");
}

// Success case
readFile("data.txt", (err, data) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});

// Error case
readFile("", (err, data) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});`,
    codeOutput: [
      "Data: File contents here",
      "Error: Path is empty",
    ],
  },
};

const order: CallbackTab[] = ["whatIs", "syncCallbacks", "asyncCallbacks", "errorFirst"];

// ─── flow diagram steps for "What is a Callback?" ────────────────────────────
const flowSteps = [
  { id: "define", label: "Define Function", description: "Create callback fn", color: "bg-blue-500 text-white" },
  { id: "pass", label: "Pass as Argument", description: "Give to higher-order fn", color: "bg-amber-500 text-white" },
  { id: "execute", label: "Execute Later", description: "Called inside outer fn", color: "bg-emerald-500 text-white" },
  { id: "result", label: "Result", description: "Action completed", color: "bg-violet-500 text-white" },
];

// ─── comparison table data ──────────────────────────────────────────────────
const comparisonRows = [
  {
    type: "Synchronous",
    whenCalled: "Immediately",
    example: "Array.map(cb)",
    pattern: "Blocking",
  },
  {
    type: "Asynchronous",
    whenCalled: "After async op",
    example: "setTimeout(cb, ms)",
    pattern: "Non-blocking",
  },
  {
    type: "Error-First",
    whenCalled: "After async op",
    example: "fs.readFile(path, cb)",
    pattern: "cb(err, data)",
  },
  {
    type: "Event Listener",
    whenCalled: "On event trigger",
    example: "el.addEventListener(e, cb)",
    pattern: "Observer",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CallbacksVisualization() {
  const [selected, setSelected] = useState<CallbackTab>("whatIs");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: CallbackTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
  };

  const runFlowAnimation = async () => {
    setAnimating(true);
    for (let i = 0; i < flowSteps.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 800));
    }
    await new Promise((r) => setTimeout(r, 400));
    setActiveStep(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Callbacks in JavaScript</CardTitle>
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
                  callback
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

            {/* Interactive flow diagram for "What is a Callback?" */}
            {selected === "whatIs" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Callback Flow
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {flowSteps.map((step, idx) => (
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
                        {idx < flowSteps.length - 1 && (
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
                      onClick={runFlowAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate Flow"}
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
            Callback Types
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Type</span>
              <span>When Called</span>
              <span>Example</span>
              <span>Pattern</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.type}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.whenCalled}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.example}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.pattern}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
