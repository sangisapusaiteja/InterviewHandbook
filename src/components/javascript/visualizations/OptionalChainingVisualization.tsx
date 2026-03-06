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
type ChainingTab = "propertyAccess" | "methodsBrackets" | "withNullish" | "realWorld";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ChainingTab, GroupInfo> = {
  propertyAccess: {
    label: "Property Access",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Use ?. to safely access nested properties. If any part of the chain is null or undefined, the expression short-circuits and returns undefined instead of throwing an error.",
    codeSnippet: `const user = {
  name: "Alice",
  address: {
    city: "Paris",
    zip: "75001"
  }
};

console.log(user?.name);
console.log(user?.address?.city);
console.log(user?.address?.street);

const guest = null;
console.log(guest?.name);
console.log(guest?.address?.city);`,
    codeOutput: [
      "Alice",
      "Paris",
      "undefined",
      "undefined",
      "undefined",
    ],
  },
  methodsBrackets: {
    label: "Methods & Brackets",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Optional chaining works with method calls (obj?.method()) and bracket notation (obj?.[key]). If the method or property doesn't exist, undefined is returned without throwing.",
    codeSnippet: `const api = {
  getData: () => "fetched!",
  items: { first: "A", second: "B" }
};

// Method call
console.log(api?.getData());
console.log(api?.missing?.());

// Bracket notation
const key = "first";
console.log(api?.items?.[key]);
console.log(api?.missing?.[key]);

// Array-like access
const arr = [10, 20, 30];
console.log(arr?.[1]);
console.log(null?.[0]);`,
    codeOutput: [
      "fetched!",
      "undefined",
      "A",
      "undefined",
      "20",
      "undefined",
    ],
  },
  withNullish: {
    label: "With ?? Operator",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Combine ?. with the nullish coalescing operator (??) to provide default values when the chain evaluates to null or undefined. This is a powerful pattern for safe property access with fallbacks.",
    codeSnippet: `const config = {
  theme: { color: "blue" },
  debug: false,
  count: 0
};

// Fallback for missing values
console.log(config?.theme?.color ?? "default");
console.log(config?.theme?.size ?? "medium");
console.log(config?.missing?.deep ?? "fallback");

// ?? vs || : ?? only catches null/undefined
console.log(config?.debug ?? true);   // false
console.log(config?.debug || true);   // true
console.log(config?.count ?? 10);     // 0
console.log(config?.count || 10);     // 10`,
    codeOutput: [
      "blue",
      "medium",
      "fallback",
      "false",
      "true",
      "0",
      "10",
    ],
  },
  realWorld: {
    label: "Real-world APIs",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "In real applications, optional chaining shines when handling API responses, user-provided data, or configuration objects that may have missing or incomplete fields.",
    codeSnippet: `// API response handling
const response = {
  data: {
    user: { name: "Alice", posts: [{ title: "Hello" }] }
  }
};

const title = response?.data?.user?.posts?.[0]?.title;
console.log(title);

const missing = response?.data?.user?.posts?.[5]?.title;
console.log(missing ?? "No post found");

// Config access with defaults
const appConfig = { db: { host: "localhost" } };
const port = appConfig?.db?.port ?? 5432;
console.log("Port:", port);

// Event handler safety
const button = { onClick: () => "clicked!" };
console.log(button?.onClick?.());
console.log(button?.onHover?.());`,
    codeOutput: [
      "Hello",
      "No post found",
      "Port: 5432",
      "clicked!",
      "undefined",
    ],
  },
};

const order: ChainingTab[] = ["propertyAccess", "methodsBrackets", "withNullish", "realWorld"];

// ─── chain diagram steps for Property Access breakdown ────────────────────────
const chainSteps = [
  { id: "obj", label: "obj", description: "Start object", exists: true },
  { id: "check1", label: "?.", description: "Checkpoint 1", isCheckpoint: true },
  { id: "address", label: "address", description: "Nested property", exists: true },
  { id: "check2", label: "?.", description: "Checkpoint 2", isCheckpoint: true },
  { id: "city", label: "city", description: "Target value", exists: true },
];

const chainStepsNull = [
  { id: "obj", label: "obj", description: "Start object", exists: true },
  { id: "check1", label: "?.", description: "Checkpoint 1", isCheckpoint: true },
  { id: "address", label: "address", description: "Is null!", exists: false },
  { id: "check2", label: "?.", description: "Checkpoint 2", isCheckpoint: true },
  { id: "city", label: "city", description: "Never reached", exists: false },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    syntax: "obj?.prop",
    useCase: "Property access",
    without: "obj && obj.prop",
    withChain: "obj?.prop",
  },
  {
    syntax: "obj?.[expr]",
    useCase: "Bracket notation",
    without: "obj && obj[expr]",
    withChain: "obj?.[expr]",
  },
  {
    syntax: "obj?.method()",
    useCase: "Method call",
    without: "obj && obj.method && obj.method()",
    withChain: "obj?.method?.()",
  },
  {
    syntax: "obj?.a ?? val",
    useCase: "With fallback",
    without: "obj && obj.a != null ? obj.a : val",
    withChain: "obj?.a ?? val",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function OptionalChainingVisualization() {
  const [selected, setSelected] = useState<ChainingTab>("propertyAccess");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [chainScenario, setChainScenario] = useState<"exists" | "null">("exists");

  const group = groups[selected];

  const handleSelect = (key: ChainingTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
    setChainScenario("exists");
  };

  const runChainAnimation = async (scenario: "exists" | "null") => {
    setChainScenario(scenario);
    setAnimating(true);
    setActiveStep(null);

    const steps = scenario === "exists" ? chainSteps : chainStepsNull;

    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 700));

      // If we hit a null value (not a checkpoint), short-circuit
      if (!steps[i].isCheckpoint && !steps[i].exists && i > 0) {
        await new Promise((r) => setTimeout(r, 500));
        break;
      }
    }

    await new Promise((r) => setTimeout(r, 400));
    setActiveStep(null);
    setAnimating(false);
  };

  const currentChain = chainScenario === "exists" ? chainSteps : chainStepsNull;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Optional Chaining (?.)</CardTitle>
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
                  ?.
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

            {/* Interactive chain diagram for Property Access */}
            {selected === "propertyAccess" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Chain Resolution Diagram
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  {/* Scenario label */}
                  <div className="flex justify-center mb-4">
                    <span className="text-xs font-mono text-muted-foreground">
                      {chainScenario === "exists" ? (
                        <>obj<span className="text-blue-500">?.</span>address<span className="text-blue-500">?.</span>city<span className="mx-2 text-emerald-500">→</span><span className="text-emerald-500 font-bold">&quot;Paris&quot;</span></>
                      ) : (
                        <>obj<span className="text-blue-500">?.</span>address<span className="text-blue-500">?.</span>city<span className="mx-2 text-red-500">→</span><span className="text-red-500 font-bold">undefined</span></>
                      )}
                    </span>
                  </div>

                  {/* Chain steps */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {currentChain.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            scale: activeStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeStep === idx
                                ? step.isCheckpoint
                                  ? "0 0 16px rgba(59,130,246,0.5)"
                                  : step.exists
                                  ? "0 0 16px rgba(34,197,94,0.5)"
                                  : "0 0 16px rgba(239,68,68,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                            activeStep === idx
                              ? step.isCheckpoint
                                ? "bg-blue-500 text-white ring-2 ring-offset-2 ring-offset-background ring-blue-400"
                                : step.exists
                                ? "bg-emerald-500 text-white ring-2 ring-offset-2 ring-offset-background ring-emerald-400"
                                : "bg-red-500 text-white ring-2 ring-offset-2 ring-offset-background ring-red-400"
                              : activeStep !== null && activeStep > idx
                              ? step.isCheckpoint
                                ? "bg-blue-500/20 border border-blue-500/40 text-blue-700 dark:text-blue-300"
                                : step.exists
                                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                                : "bg-red-500/20 border border-red-500/40 text-red-700 dark:text-red-300"
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
                          {/* Status icon for active step */}
                          {activeStep === idx && !step.isCheckpoint && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-sm mt-1"
                            >
                              {step.exists ? "\u2713" : "\u2717"}
                            </motion.span>
                          )}
                        </motion.div>
                        {idx < currentChain.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeStep !== null && activeStep >= idx
                                  ? !currentChain[idx].exists && !currentChain[idx].isCheckpoint && idx > 0
                                    ? "rgb(239,68,68)"
                                    : "rgb(59,130,246)"
                                  : "rgb(161,161,170)",
                            }}
                            className="text-lg font-bold select-none"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                    {/* Result indicator */}
                    <motion.span
                      animate={{
                        color:
                          activeStep !== null
                            ? chainScenario === "exists"
                              ? "rgb(34,197,94)"
                              : "rgb(239,68,68)"
                            : "rgb(161,161,170)",
                      }}
                      className="text-lg font-bold select-none ml-1"
                    >
                      =
                    </motion.span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        activeStep !== null
                          ? chainScenario === "exists"
                            ? "text-emerald-500"
                            : "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {chainScenario === "exists" ? '"Paris"' : "undefined"}
                    </span>
                  </div>

                  {/* Animation buttons */}
                  <div className="flex justify-center gap-3 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={() => runChainAnimation("exists")}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating && chainScenario === "exists" ? "Animating..." : "Value Exists"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={() => runChainAnimation("null")}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating && chainScenario === "null" ? "Animating..." : "Null Short-circuit"}
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
            Optional Chaining Syntax
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Syntax</span>
              <span>Use Case</span>
              <span>Without ?.</span>
              <span>With ?.</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.syntax}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.syntax}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.useCase}</span>
                <code className="font-mono text-[10px] text-red-600 dark:text-red-400">
                  {row.without}
                </code>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.withChain}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
