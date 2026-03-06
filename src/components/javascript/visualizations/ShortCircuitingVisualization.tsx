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
type SCTab = "or" | "and" | "nullish" | "reactPatterns";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<SCTab, GroupInfo> = {
  or: {
    label: "|| (OR)",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Returns the first truthy value, or the last value if none are truthy. Commonly used for providing default values.",
    codeSnippet: `const name = "" || "Anonymous";
console.log(name); // "Anonymous"

const port = 0 || 3000;
console.log(port); // 3000

const val = null || undefined || "found!";
console.log(val); // "found!"

const allFalsy = "" || 0 || null || undefined;
console.log(allFalsy); // undefined`,
    codeOutput: [
      '"Anonymous"',
      "3000",
      '"found!"',
      "undefined",
    ],
  },
  and: {
    label: "&& (AND)",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Returns the first falsy value, or the last value if all are truthy. Used for conditional execution -- the right side only runs if the left side is truthy.",
    codeSnippet: `const a = 1 && 2 && 3;
console.log(a); // 3 (all truthy, returns last)

const b = 1 && 0 && 3;
console.log(b); // 0 (first falsy)

const user = { name: "Alice" };
const greeting = user && user.name && "Hello!";
console.log(greeting); // "Hello!"

const c = null && "never reached";
console.log(c); // null`,
    codeOutput: [
      "3",
      "0",
      '"Hello!"',
      "null",
    ],
  },
  nullish: {
    label: "?? (Nullish)",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Returns the first non-nullish value (not null or undefined). Unlike ||, it treats 0, \"\", and false as valid values -- only null and undefined are skipped.",
    codeSnippet: `// ?? vs || with falsy-but-valid values
const count1 = 0 || 10;
console.log("||:", count1);  // 10 (0 is falsy)

const count2 = 0 ?? 10;
console.log("??:", count2);  // 0 (0 is not nullish)

const text1 = "" || "default";
console.log("||:", text1);   // "default"

const text2 = "" ?? "default";
console.log("??:", text2);   // "" (empty string is not nullish)

const val = null ?? undefined ?? "fallback";
console.log(val);            // "fallback"`,
    codeOutput: [
      "||: 10",
      "??: 0",
      '||: "default"',
      '??: ""',
      '"fallback"',
    ],
  },
  reactPatterns: {
    label: "React Patterns",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Short-circuit evaluation is widely used in React for conditional rendering with &&, providing default props with ||, and safe fallbacks with ??.",
    codeSnippet: `// Conditional rendering with &&
const isLoggedIn = true;
const greeting = isLoggedIn && <Welcome />;

// Default values with ||
const theme = props.theme || "light";

// Nullish coalescing for props
const count = props.count ?? 0;

// Combined patterns
const label = user?.name ?? "Guest";
const display = isAdmin && (role || "viewer");

console.log("theme:", theme);
console.log("count:", count);
console.log("label:", label);`,
    codeOutput: [
      'theme: "light"',
      "count: 0",
      'label: "Guest"',
    ],
  },
};

const order: SCTab[] = ["or", "and", "nullish", "reactPatterns"];

// ─── evaluation flow data for || (OR) visual ─────────────────────────────────
interface EvalValue {
  value: string;
  truthy: boolean;
}

const orEvalValues: EvalValue[] = [
  { value: '""', truthy: false },
  { value: "0", truthy: false },
  { value: "null", truthy: false },
  { value: '"found!"', truthy: true },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    operator: "||",
    returns: "First truthy value (or last)",
    stopsAt: "First truthy",
    commonUse: "Default values",
  },
  {
    operator: "&&",
    returns: "First falsy value (or last)",
    stopsAt: "First falsy",
    commonUse: "Conditional execution",
  },
  {
    operator: "??",
    returns: "First non-nullish value (or last)",
    stopsAt: "First non-nullish",
    commonUse: "Nullish fallbacks",
  },
  {
    operator: "||=",
    returns: "Assigns if current is falsy",
    stopsAt: "Already truthy",
    commonUse: "Lazy initialization",
  },
  {
    operator: "&&=",
    returns: "Assigns if current is truthy",
    stopsAt: "Already falsy",
    commonUse: "Conditional update",
  },
  {
    operator: "??=",
    returns: "Assigns if current is nullish",
    stopsAt: "Already non-nullish",
    commonUse: "Nullish initialization",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ShortCircuitingVisualization() {
  const [selected, setSelected] = useState<SCTab>("or");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeEvalIdx, setActiveEvalIdx] = useState<number | null>(null);
  const [stoppedAtIdx, setStoppedAtIdx] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: SCTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveEvalIdx(null);
    setStoppedAtIdx(null);
    setAnimating(false);
  };

  const runEvalAnimation = async () => {
    setAnimating(true);
    setStoppedAtIdx(null);

    for (let i = 0; i < orEvalValues.length; i++) {
      setActiveEvalIdx(i);
      await new Promise((r) => setTimeout(r, 800));

      if (orEvalValues[i].truthy) {
        setStoppedAtIdx(i);
        await new Promise((r) => setTimeout(r, 600));
        break;
      }
    }

    setActiveEvalIdx(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Short Circuiting</CardTitle>
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
                  operator
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

            {/* Interactive visual for || (OR) tab */}
            {selected === "or" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Evaluation Flow
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <p className="text-xs text-muted-foreground text-center mb-4 font-mono">
                    {`"" || 0 || null || "found!"`}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {orEvalValues.map((ev, idx) => {
                      const isActive = activeEvalIdx === idx;
                      const isStopped = stoppedAtIdx === idx;
                      const wasChecked =
                        (activeEvalIdx !== null && idx < activeEvalIdx) ||
                        (stoppedAtIdx !== null && idx <= stoppedAtIdx);

                      let bgClass = "bg-muted border border-border text-muted-foreground";
                      if (isStopped) {
                        bgClass = "bg-emerald-500 text-white ring-2 ring-offset-2 ring-offset-background ring-emerald-400";
                      } else if (isActive) {
                        bgClass = ev.truthy
                          ? "bg-emerald-500 text-white ring-2 ring-offset-2 ring-offset-background ring-emerald-400"
                          : "bg-red-500 text-white ring-2 ring-offset-2 ring-offset-background ring-red-400";
                      } else if (wasChecked) {
                        bgClass = ev.truthy
                          ? "bg-emerald-500/60 text-white"
                          : "bg-red-500/60 text-white";
                      }

                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <motion.div
                            animate={{
                              scale: isActive ? 1.15 : 1,
                              boxShadow: isActive
                                ? "0 0 16px rgba(59,130,246,0.5)"
                                : "0 0 0px transparent",
                            }}
                            transition={{ duration: 0.25 }}
                            className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${bgClass}`}
                          >
                            <span className="font-bold text-sm">{ev.value}</span>
                            <span
                              className={`text-[10px] mt-0.5 ${
                                isActive || wasChecked ? "opacity-90" : "opacity-60"
                              }`}
                            >
                              {ev.truthy ? "truthy" : "falsy"}
                            </span>
                          </motion.div>
                          {idx < orEvalValues.length - 1 && (
                            <motion.span
                              animate={{
                                color:
                                  isActive
                                    ? "rgb(59,130,246)"
                                    : "rgb(161,161,170)",
                              }}
                              className="text-lg font-bold select-none"
                            >
                              →
                            </motion.span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {stoppedAtIdx !== null && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-center mt-3 text-emerald-600 dark:text-emerald-400 font-semibold"
                    >
                      Stopped at {orEvalValues[stoppedAtIdx].value} (first truthy value)
                    </motion.p>
                  )}
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runEvalAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Evaluating..." : "Animate Evaluation"}
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
            Short Circuit Operators
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Operator</span>
              <span>Returns</span>
              <span>Stops At</span>
              <span>Common Use</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.operator}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.operator}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.returns}</span>
                <span className="text-[11px] text-muted-foreground">{row.stopsAt}</span>
                <code className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  {row.commonUse}
                </code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
