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
type ECTab = "globalEC" | "functionEC" | "creationPhase" | "executionPhase";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ECTab, GroupInfo> = {
  globalEC: {
    label: "Global EC",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The Global Execution Context is created when your script first runs. It sets up the global object (window in browsers, global in Node.js) and binds &quot;this&quot; to it. There is only one Global EC per program.",
    codeSnippet: `// Global Execution Context
var name = "JavaScript";
console.log(this === window); // true (browser)
console.log(name);            // "JavaScript"
console.log(window.name);     // "JavaScript"

function greet() {
  return "Hello, " + name;
}
console.log(greet());`,
    codeOutput: [
      "true",
      "JavaScript",
      "JavaScript",
      "Hello, JavaScript",
    ],
  },
  functionEC: {
    label: "Function EC",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "A new Function Execution Context is created every time a function is invoked. Each has its own arguments object, local variables, and &quot;this&quot; binding. It is pushed onto the Call Stack and popped when the function returns.",
    codeSnippet: `function multiply(a, b) {
  // New EC created here
  console.log("arguments:", a, b);
  var result = a * b;
  console.log("result:", result);
  return result;
}

var product = multiply(3, 7);
console.log("product:", product);`,
    codeOutput: [
      "arguments: 3 7",
      "result: 21",
      "product: 21",
    ],
  },
  creationPhase: {
    label: "Creation Phase",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "During the Creation Phase the JS engine scans the code and: 1) hoists function declarations (fully available), 2) hoists var declarations (set to undefined), 3) sets up the scope chain and determines &quot;this&quot; binding.",
    codeSnippet: `console.log(x);        // undefined (hoisted)
console.log(typeof greet); // "function" (hoisted)

var x = 10;
function greet() {
  return "Hi!";
}

console.log(x);        // 10
console.log(greet());  // "Hi!"`,
    codeOutput: [
      "undefined",
      "function",
      "10",
      "Hi!",
    ],
  },
  executionPhase: {
    label: "Execution Phase",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "During the Execution Phase the engine runs the code line by line: assigns values to variables, evaluates expressions, executes function calls, and processes return values.",
    codeSnippet: `var a = 5;          // assign 5 to a
var b = 10;         // assign 10 to b

function add(x, y) {
  var sum = x + y;  // compute sum
  return sum;       // return value
}

var result = add(a, b);
console.log("a:", a);
console.log("b:", b);
console.log("result:", result);`,
    codeOutput: [
      "a: 5",
      "b: 10",
      "result: 15",
    ],
  },
};

const order: ECTab[] = ["globalEC", "functionEC", "creationPhase", "executionPhase"];

// ─── interactive phase steps ─────────────────────────────────────────────────
const creationSteps = [
  { id: "scan", label: "Scan Code", description: "Engine reads all declarations", color: "bg-violet-500 text-white" },
  { id: "hoist-fn", label: "Hoist Functions", description: "Function declarations stored in memory", color: "bg-blue-500 text-white" },
  { id: "hoist-var", label: "Hoist Variables", description: "var declarations set to undefined", color: "bg-amber-500 text-white" },
  { id: "scope", label: "Setup Scope", description: "Scope chain + this binding created", color: "bg-emerald-500 text-white" },
];

const executionSteps = [
  { id: "assign", label: "Assign Values", description: "Variables get their actual values", color: "bg-orange-500 text-white" },
  { id: "evaluate", label: "Evaluate Expressions", description: "Expressions computed line by line", color: "bg-rose-500 text-white" },
  { id: "call", label: "Execute Functions", description: "Function calls create new ECs", color: "bg-blue-500 text-white" },
  { id: "return", label: "Return Values", description: "Results returned, EC popped off stack", color: "bg-emerald-500 text-white" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    type: "Global EC",
    createdWhen: "Script first loads",
    thisBinding: "Global object (window / global)",
    scope: "Outermost scope, no parent EC",
  },
  {
    type: "Function EC",
    createdWhen: "Function is invoked",
    thisBinding: "Depends on call-site (default, implicit, explicit, new)",
    scope: "Local scope + closure over parent",
  },
  {
    type: "Eval EC",
    createdWhen: "eval() is called",
    thisBinding: "Inherits from calling context",
    scope: "Calling context scope (avoid using eval)",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ExecutionContextVisualization() {
  const [selected, setSelected] = useState<ECTab>("globalEC");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeCreationStep, setActiveCreationStep] = useState<number | null>(null);
  const [activeExecutionStep, setActiveExecutionStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: ECTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveCreationStep(null);
    setActiveExecutionStep(null);
    setAnimating(false);
  };

  const runPhaseAnimation = async () => {
    setAnimating(true);
    setActiveCreationStep(null);
    setActiveExecutionStep(null);

    // Creation Phase steps
    for (let i = 0; i < creationSteps.length; i++) {
      setActiveCreationStep(i);
      await new Promise((r) => setTimeout(r, 900));
    }
    setActiveCreationStep(null);

    // Brief pause between phases
    await new Promise((r) => setTimeout(r, 400));

    // Execution Phase steps
    for (let i = 0; i < executionSteps.length; i++) {
      setActiveExecutionStep(i);
      await new Promise((r) => setTimeout(r, 900));
    }
    setActiveExecutionStep(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Execution Context in JavaScript</CardTitle>
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
                  execution context
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

            {/* Interactive Phase Visual */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Creation &amp; Execution Phases
              </p>
              <div className="rounded-xl border bg-muted/20 px-4 py-5 space-y-5">
                {/* Creation Phase */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                    Phase 1: Creation
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {creationSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: activeCreationStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeCreationStep === idx
                                ? "0 0 16px rgba(139,92,246,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeCreationStep === idx
                              ? step.color + " ring-2 ring-offset-2 ring-offset-background ring-violet-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">{step.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              activeCreationStep === idx ? "opacity-90" : "opacity-60"
                            }`}
                          >
                            {step.description}
                          </span>
                        </motion.div>
                        {idx < creationSteps.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeCreationStep === idx
                                  ? "rgb(139,92,246)"
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
                </div>

                {/* Divider arrow between phases */}
                <div className="flex justify-center">
                  <motion.span
                    animate={{
                      color:
                        activeCreationStep !== null
                          ? "rgb(139,92,246)"
                          : activeExecutionStep !== null
                          ? "rgb(249,115,22)"
                          : "rgb(161,161,170)",
                    }}
                    className="text-2xl font-bold select-none"
                  >
                    ↓
                  </motion.span>
                </div>

                {/* Execution Phase */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                    Phase 2: Execution
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {executionSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: activeExecutionStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeExecutionStep === idx
                                ? "0 0 16px rgba(249,115,22,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeExecutionStep === idx
                              ? step.color + " ring-2 ring-offset-2 ring-offset-background ring-orange-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">{step.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              activeExecutionStep === idx ? "opacity-90" : "opacity-60"
                            }`}
                          >
                            {step.description}
                          </span>
                        </motion.div>
                        {idx < executionSteps.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeExecutionStep === idx
                                  ? "rgb(249,115,22)"
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
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={animating}
                    onClick={runPhaseAnimation}
                  >
                    <Play className="h-3.5 w-3.5 mr-1" />
                    {animating ? "Animating..." : "Animate Phases"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Global EC vs Function EC vs Eval EC
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Type</span>
              <span>Created When</span>
              <span>this Binding</span>
              <span>Scope</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.type}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.type}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.createdWhen}</span>
                <span className="text-[11px] text-muted-foreground">{row.thisBinding}</span>
                <span className="text-[11px] text-muted-foreground">{row.scope}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
