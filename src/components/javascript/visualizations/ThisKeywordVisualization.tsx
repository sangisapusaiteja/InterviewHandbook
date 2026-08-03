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
type ThisGroup = "globalThis" | "objectMethod" | "callApplyBind" | "arrowVsRegular";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<ThisGroup, GroupInfo> = {
  globalThis: {
    label: "Global this",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "In the global execution context (outside any function), &quot;this&quot; refers to the global object. In browsers it is &quot;window&quot;, in Node.js it is &quot;global&quot;, and the universal &quot;globalThis&quot; works everywhere.",
    codeSnippet:
`// In a browser environment
console.log(this === window);

// globalThis works everywhere
console.log(globalThis === window);

// Variables declared with var become
// properties of the global object
var greeting = "Hello";
console.log(window.greeting);

// let and const do NOT attach to global
let name = "Alice";
console.log(window.name);

// In a regular function (non-strict mode)
function showThis() {
  return this === window;
}
console.log(showThis());`,
    codeOutput: ["true", "true", '"Hello"', '""', "true"],
  },
  objectMethod: {
    label: "Object Method",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When a function is called as a method of an object, &quot;this&quot; refers to the object the method is called on. The binding depends on HOW the function is invoked, not where it is defined.",
    codeSnippet:
`const user = {
  name: "Alice",
  greet() {
    return "Hi, I am " + this.name;
  },
};
console.log(user.greet());

// Method reference loses 'this'
const greetFn = user.greet;
console.log(greetFn());

// Nested object methods
const company = {
  name: "Acme",
  dept: {
    name: "Engineering",
    getName() {
      return this.name;
    },
  },
};
console.log(company.dept.getName());

// 'this' is the CALLING object
const other = { name: "Bob", greet: user.greet };
console.log(other.greet());`,
    codeOutput: ['"Hi, I am Alice"', '"Hi, I am undefined"', '"Engineering"', '"Hi, I am Bob"'],
  },
  callApplyBind: {
    label: "call/apply/bind",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "JavaScript provides call(), apply(), and bind() to explicitly set the value of &quot;this&quot;. call and apply invoke the function immediately, while bind returns a new function with &quot;this&quot; permanently set.",
    codeSnippet:
`function introduce(greeting, punctuation) {
  return greeting + ", I am " + this.name + punctuation;
}

const alice = { name: "Alice" };
const bob   = { name: "Bob" };

// call: pass args individually
console.log(introduce.call(alice, "Hi", "!"));

// apply: pass args as an array
console.log(introduce.apply(bob, ["Hello", "."]));

// bind: returns a NEW function
const aliceIntro = introduce.bind(alice);
console.log(aliceIntro("Hey", "?"));

// bind is permanent — cannot be overridden
const rebind = aliceIntro.bind(bob);
console.log(rebind("Yo", "!"));`,
    codeOutput: ['"Hi, I am Alice!"', '"Hello, I am Bob."', '"Hey, I am Alice?"', '"Yo, I am Alice!"'],
  },
  arrowVsRegular: {
    label: "Arrow vs Regular",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Arrow functions do NOT have their own &quot;this&quot;. They inherit &quot;this&quot; from the enclosing lexical scope at the time they are defined. This makes them ideal for callbacks but unsuitable as object methods.",
    codeSnippet:
`const timer = {
  name: "Timer",
  startRegular() {
    // Regular function: 'this' is undefined in callback
    const cb = function () {
      return "Regular: " + (this?.name ?? "undefined");
    };
    return cb();
  },
  startArrow() {
    // Arrow: inherits 'this' from startArrow()
    const cb = () => {
      return "Arrow: " + this.name;
    };
    return cb();
  },
};
console.log(timer.startRegular());
console.log(timer.startArrow());

// Arrow as method — BAD practice
const obj = {
  name: "Obj",
  greet: () => "Hi from " + (typeof this === "undefined" ? "undefined" : "window"),
};
console.log(obj.greet());`,
    codeOutput: ['"Regular: undefined"', '"Arrow: Timer"', '"Hi from window"'],
  },
};

const order: ThisGroup[] = ["globalThis", "objectMethod", "callApplyBind", "arrowVsRegular"];

// ─── Calling context visual data ──────────────────────────────────────────────
interface ContextRow {
  id: string;
  callSite: string;
  thisValue: string;
  color: string;
}

const callingContexts: ContextRow[] = [
  { id: "direct", callSite: "greet()", thisValue: "window / undefined", color: "blue" },
  { id: "method", callSite: "user.greet()", thisValue: "user", color: "emerald" },
  { id: "call", callSite: "greet.call(bob)", thisValue: "bob", color: "violet" },
  { id: "arrow", callSite: "() => this.name", thisValue: "enclosing scope", color: "orange" },
  { id: "new", callSite: "new Person()", thisValue: "new instance", color: "blue" },
];

// ─── Reference table data ─────────────────────────────────────────────────────
const referenceRows = [
  {
    context: "Global (non-strict)",
    thisValue: "window / globalThis",
    example: "console.log(this)",
    priority: "4 (lowest)",
  },
  {
    context: "Object method",
    thisValue: "The calling object",
    example: "obj.method()",
    priority: "3",
  },
  {
    context: "call / apply",
    thisValue: "Explicit first arg",
    example: "fn.call(ctx)",
    priority: "2",
  },
  {
    context: "bind",
    thisValue: "Permanently bound",
    example: "fn.bind(ctx)()",
    priority: "2",
  },
  {
    context: "new keyword",
    thisValue: "New instance",
    example: "new Ctor()",
    priority: "1 (highest)",
  },
  {
    context: "Arrow function",
    thisValue: "Enclosing lexical scope",
    example: "() => this.x",
    priority: "N/A (inherits)",
  },
];

// ─── color helpers ────────────────────────────────────────────────────────────
function ctxBg(color: string) {
  return `bg-${color}-500/15 border-${color}-500/40`;
}
function ctxText(color: string) {
  return `text-${color}-700 dark:text-${color}-300`;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ThisKeywordVisualization() {
  const [selected, setSelected] = useState<ThisGroup>("globalThis");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeCtx, setActiveCtx] = useState<string>("method");

  const group = groups[selected];

  const handleSelect = (key: ThisGroup) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">The &quot;this&quot; Keyword</CardTitle>
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
                  this
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
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
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive visual: Calling context */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Interactive: How Calling Context Changes &quot;this&quot;</p>
          <div className="rounded-xl border bg-muted/30 px-4 py-4 space-y-4">
            <p className="text-xs text-muted-foreground">
              Click a calling style to see what &quot;this&quot; resolves to:
            </p>

            {/* Function box */}
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-lg border-2 border-dashed border-zinc-400 dark:border-zinc-600 px-5 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">Function Definition</p>
                <code className="text-sm font-mono font-semibold">
                  function greet() &#123; return this.name; &#125;
                </code>
              </div>

              {/* Arrow pointing down */}
              <div className="flex flex-col items-center">
                <div className="w-px h-6 bg-zinc-400 dark:bg-zinc-600" />
                <span className="text-xs text-muted-foreground font-semibold">called as</span>
                <div className="w-px h-3 bg-zinc-400 dark:bg-zinc-600" />
                <svg width="12" height="8" viewBox="0 0 12 8" className="text-zinc-400 dark:text-zinc-600">
                  <path d="M6 8L0 0h12z" fill="currentColor" />
                </svg>
              </div>

              {/* Calling context selector buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {callingContexts.map((ctx) => (
                  <button
                    key={ctx.id}
                    onClick={() => setActiveCtx(ctx.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                      activeCtx === ctx.id
                        ? `${ctxBg(ctx.color)} ${ctxText(ctx.color)} scale-105 shadow-sm`
                        : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {ctx.callSite}
                  </button>
                ))}
              </div>

              {/* Arrow pointing down to result */}
              <AnimatePresence mode="wait">
                {callingContexts.filter((c) => c.id === activeCtx).map((ctx) => (
                  <motion.div
                    key={ctx.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <svg width="12" height="8" viewBox="0 0 12 8" className={ctxText(ctx.color)}>
                      <path d="M6 8L0 0h12z" fill="currentColor" />
                    </svg>
                    <div className={`rounded-xl border-2 px-5 py-3 text-center ${ctxBg(ctx.color)}`}>
                      <p className="text-[10px] text-muted-foreground mb-0.5">this =</p>
                      <p className={`text-sm font-bold font-mono ${ctxText(ctx.color)}`}>
                        {ctx.thisValue}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Reference table: this binding rules */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">this Binding Rules Reference</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40 border-b">
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Context</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">this Value</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Example</th>
                  <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                {referenceRows.map((row) => (
                  <tr key={row.context} className="border-b last:border-b-0">
                    <td className="px-3 py-2 font-semibold">{row.context}</td>
                    <td className="px-3 py-2 font-mono text-blue-600 dark:text-blue-400">{row.thisValue}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.example}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
