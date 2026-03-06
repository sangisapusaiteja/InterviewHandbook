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
type CallStackTab = "lifo" | "nested" | "overflow" | "eventLoop";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── stack animation data ─────────────────────────────────────────────────────
interface StackFrame {
  name: string;
  color: string;
}

interface StackStep {
  action: "push" | "pop";
  frame: string;
  stack: StackFrame[];
  description: string;
}

const stackSteps: StackStep[] = [
  {
    action: "push",
    frame: "main()",
    stack: [{ name: "main()", color: "bg-blue-500" }],
    description: "Program starts, main() pushed onto stack",
  },
  {
    action: "push",
    frame: "greet()",
    stack: [
      { name: "main()", color: "bg-blue-500" },
      { name: "greet()", color: "bg-emerald-500" },
    ],
    description: "main() calls greet(), pushed onto stack",
  },
  {
    action: "push",
    frame: "sayHello()",
    stack: [
      { name: "main()", color: "bg-blue-500" },
      { name: "greet()", color: "bg-emerald-500" },
      { name: "sayHello()", color: "bg-violet-500" },
    ],
    description: "greet() calls sayHello(), pushed onto stack",
  },
  {
    action: "pop",
    frame: "sayHello()",
    stack: [
      { name: "main()", color: "bg-blue-500" },
      { name: "greet()", color: "bg-emerald-500" },
    ],
    description: "sayHello() returns, popped off stack",
  },
  {
    action: "pop",
    frame: "greet()",
    stack: [{ name: "main()", color: "bg-blue-500" }],
    description: "greet() returns, popped off stack",
  },
  {
    action: "pop",
    frame: "main()",
    stack: [],
    description: "main() returns, stack is empty",
  },
];

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<CallStackTab, GroupInfo> = {
  lifo: {
    label: "LIFO Basics",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The call stack follows Last-In, First-Out (LIFO) order. When a function is called, it is pushed onto the stack. When it returns, it is popped off. The most recently added frame is always the first to be removed.",
    codeSnippet: `function third() {
  console.log("third");
}

function second() {
  third();
  console.log("second");
}

function first() {
  second();
  console.log("first");
}

first();`,
    codeOutput: [
      "third",
      "second",
      "first",
    ],
  },
  nested: {
    label: "Nested Calls",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When functions call other functions, each new call adds a frame to the stack. The deepest function must return first before the outer functions can continue executing.",
    codeSnippet: `function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log("Square of " + n + " is " + result);
}

printSquare(5);`,
    codeOutput: [
      "Square of 5 is 25",
    ],
  },
  overflow: {
    label: "Stack Overflow",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "A stack overflow occurs when there are too many frames on the call stack, usually caused by infinite recursion where a function calls itself without a base case to stop.",
    codeSnippet: `// This will cause a stack overflow!
function recurseForever() {
  console.log("Calling myself...");
  recurseForever(); // no base case!
}

try {
  recurseForever();
} catch (e) {
  console.log("Error: " + e.message);
}`,
    codeOutput: [
      "Calling myself...",
      "Calling myself...",
      "Calling myself...",
      "... (thousands more)",
      "Error: Maximum call stack size exceeded",
    ],
  },
  eventLoop: {
    label: "Event Loop",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Async callbacks (setTimeout, fetch, etc.) do not go directly onto the call stack. They wait in the callback queue until the stack is empty, then the event loop pushes them onto the stack.",
    codeSnippet: `console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End");`,
    codeOutput: [
      "Start",
      "End",
      "Promise callback",
      "Timeout callback",
    ],
  },
};

const order: CallStackTab[] = ["lifo", "nested", "overflow", "eventLoop"];

// ─── comparison table data ──────────────────────────────────────────────────
const conceptRows = [
  {
    concept: "Call Stack",
    description: "A LIFO data structure that tracks function execution",
    example: "function a() calls b(), stack: [a, b]",
  },
  {
    concept: "Stack Frame",
    description: "A single entry representing one function call",
    example: "Contains function args, local variables, return address",
  },
  {
    concept: "Push",
    description: "Adding a frame when a function is invoked",
    example: "Calling greet() pushes a new frame",
  },
  {
    concept: "Pop",
    description: "Removing a frame when a function returns",
    example: "return value pops the current frame",
  },
  {
    concept: "Stack Overflow",
    description: "Error when the stack exceeds its maximum size",
    example: "Infinite recursion with no base case",
  },
  {
    concept: "Event Loop",
    description: "Mechanism that moves queued callbacks onto the stack",
    example: "setTimeout callback waits for empty stack",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CallStackVisualization() {
  const [selected, setSelected] = useState<CallStackTab>("lifo");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: CallStackTab) => {
    setSelected(key);
    setOutputLines(null);
    setCurrentStep(-1);
    setAnimating(false);
  };

  const runStackAnimation = async () => {
    setAnimating(true);
    setCurrentStep(-1);
    for (let i = 0; i < stackSteps.length; i++) {
      setCurrentStep(i);
      await new Promise((r) => setTimeout(r, 900));
    }
    await new Promise((r) => setTimeout(r, 600));
    setAnimating(false);
  };

  const currentStack = currentStep >= 0 ? stackSteps[currentStep].stack : [];
  const currentDescription = currentStep >= 0 ? stackSteps[currentStep].description : "Click Step Through to watch the call stack in action";
  const currentAction = currentStep >= 0 ? stackSteps[currentStep].action : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Call Stack in JavaScript</CardTitle>
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
                  call stack
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

            {/* Interactive stack visualization */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Stack Visualization
              </p>
              <div className="rounded-xl border bg-muted/20 px-4 py-5">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                  {/* Stack visual */}
                  <div className="flex flex-col-reverse items-center gap-1 min-h-[180px] min-w-[180px] justify-start">
                    {currentStack.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-muted-foreground italic py-8"
                      >
                        Stack is empty
                      </motion.div>
                    )}
                    <AnimatePresence>
                      {currentStack.map((frame, idx) => (
                        <motion.div
                          key={`${frame.name}-${idx}`}
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className={`${frame.color} text-white px-6 py-2.5 rounded-lg text-xs font-mono font-bold w-[160px] text-center shadow-md ${
                            idx === currentStack.length - 1 ? "ring-2 ring-offset-2 ring-offset-background ring-yellow-400" : ""
                          }`}
                        >
                          {frame.name}
                          {idx === currentStack.length - 1 && (
                            <span className="ml-1 text-[10px] opacity-80">← top</span>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Description + controls */}
                  <div className="flex flex-col items-center md:items-start gap-3 flex-1">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-center md:text-left"
                    >
                      {currentAction && (
                        <Badge
                          variant="secondary"
                          className={`text-[10px] mb-1 ${
                            currentAction === "push"
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "bg-red-500/20 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {currentAction === "push" ? "PUSH" : "POP"}
                        </Badge>
                      )}
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {currentDescription}
                      </p>
                    </motion.div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={animating}
                        onClick={runStackAnimation}
                      >
                        <Play className="h-3.5 w-3.5 mr-1" />
                        {animating ? "Running..." : "Step Through"}
                      </Button>
                      {currentStep >= 0 && !animating && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setCurrentStep(-1)}
                        >
                          Reset
                        </Button>
                      )}
                    </div>

                    {/* Step indicator */}
                    <div className="flex gap-1.5 mt-1">
                      {stackSteps.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentStep
                              ? "bg-blue-500 scale-125"
                              : idx < currentStep
                              ? "bg-blue-500/40"
                              : "bg-muted-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Reference table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Key Concepts
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Concept</span>
              <span>Description</span>
              <span>Example</span>
            </div>
            {conceptRows.map((row) => (
              <div
                key={row.concept}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.concept}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.description}</span>
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
