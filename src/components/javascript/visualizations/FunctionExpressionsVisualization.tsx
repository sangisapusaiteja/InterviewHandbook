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
          <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types & data ─────────────────────────────────────────────────────────────
type Tab = "named" | "anonymous" | "iife" | "argument";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  named:     "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  anonymous: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  iife:      "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  argument:  "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColor: Record<Tab, string> = {
  named:     "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  anonymous: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  iife:      "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  argument:  "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "named",     label: "Named Expression" },
  { key: "anonymous", label: "Anonymous Expression" },
  { key: "iife",      label: "IIFE" },
  { key: "argument",  label: "As Argument" },
];

const tabData: Record<Tab, TabInfo> = {
  named: {
    label: "Named Expression",
    color: tabColor.named,
    badgeColor: tabBadgeColor.named,
    description:
      "A named function expression assigns a function with an explicit name to a variable. The function name is only accessible inside the function body itself, which is useful for recursion and debugging stack traces.",
    codeSnippet:
`const greet = function greetUser(name) {
  console.log("Hello, " + name + "!");
  console.log("Function name:", greetUser.name);
};

greet("Alice");
// greetUser("Alice"); // ReferenceError - name not accessible outside`,
    codeOutput: ['"Hello, Alice!"', '"Function name: greetUser"'],
  },
  anonymous: {
    label: "Anonymous Expression",
    color: tabColor.anonymous,
    badgeColor: tabBadgeColor.anonymous,
    description:
      "An anonymous function expression assigns a function without an explicit name to a variable. The variable name serves as the identifier. The function's .name property is inferred from the variable name.",
    codeSnippet:
`const greet = function(name) {
  console.log("Hello, " + name + "!");
};

greet("Bob");
console.log("Function name:", greet.name);`,
    codeOutput: ['"Hello, Bob!"', '"Function name: greet"'],
  },
  iife: {
    label: "IIFE",
    color: tabColor.iife,
    badgeColor: tabBadgeColor.iife,
    description:
      "An Immediately Invoked Function Expression (IIFE) is a function that runs as soon as it is defined. It creates a private scope, preventing variables from leaking into the global scope. Common in module patterns and initialization code.",
    codeSnippet:
`(function() {
  const secret = "hidden";
  console.log("IIFE executed!");
  console.log("secret:", secret);
})();

// console.log(secret); // ReferenceError
console.log("Global scope is clean");`,
    codeOutput: ['"IIFE executed!"', '"secret: hidden"', '"Global scope is clean"'],
  },
  argument: {
    label: "As Argument",
    color: tabColor.argument,
    badgeColor: tabBadgeColor.argument,
    description:
      "Function expressions are often passed directly as arguments to other functions. This is extremely common with array methods, event handlers, and callbacks. The function is defined inline right where it is needed.",
    codeSnippet:
`const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log("Original:", numbers);
console.log("Doubled:", doubled);

setTimeout(function() {
  console.log("Delayed by 0ms");
}, 0);`,
    codeOutput: ['"Original: [1, 2, 3, 4, 5]"', '"Doubled: [2, 4, 6, 8, 10]"', '"Delayed by 0ms"'],
  },
};

// ─── Comparison table ─────────────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Hoisting",
    declaration: "Fully hoisted - can be called before the declaration line",
    expression: "Not hoisted - calling before assignment throws an error",
  },
  {
    feature: "Naming",
    declaration: "Must have a name",
    expression: "Name is optional (named or anonymous)",
  },
  {
    feature: "Use cases",
    declaration: "Utility functions, top-level helpers",
    expression: "Callbacks, closures, conditional assignment",
  },
  {
    feature: "Syntax",
    declaration: "function name() { }",
    expression: "const name = function() { }",
  },
  {
    feature: "As argument",
    declaration: "Cannot be declared inline as an argument",
    expression: "Can be passed directly as an argument",
  },
];

function ComparisonTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Feature</span>
        <span className="text-blue-600 dark:text-blue-400">Declaration</span>
        <span className="text-emerald-600 dark:text-emerald-400">Expression</span>
      </div>
      {comparisonRows.map((row) => (
        <div
          key={row.feature}
          className="grid grid-cols-3 px-3 py-2 border-t items-start gap-2"
        >
          <span className="font-semibold">{row.feature}</span>
          <span className="text-[11px] text-muted-foreground">{row.declaration}</span>
          <span className="text-[11px] text-muted-foreground">{row.expression}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Real-world application ───────────────────────────────────────────────────
function RealWorldExample() {
  const [output, setOutput] = useState<string[] | null>(null);

  const code = `// Event handler assignment using function expression
const handleClick = function(event) {
  console.log("Button clicked!");
  console.log("Target:", event.target.id);
  console.log("Type:", event.type);
};

// Simulating a click event
const fakeEvent = { target: { id: "submit-btn" }, type: "click" };
handleClick(fakeEvent);`;

  const expectedOutput = [
    '"Button clicked!"',
    '"Target: submit-btn"',
    '"Type: click"',
  ];

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">Real Application: Event Handler Assignment</p>
      <div className="rounded-xl border bg-orange-500/5 px-4 py-3">
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          Function expressions are the standard pattern for assigning event handlers. The function is stored in a variable that can be referenced later to remove the listener if needed.
        </p>
        <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
          {code}
        </pre>
      </div>
      <Button size="sm" onClick={() => setOutput(expectedOutput)}>
        <Play className="h-3.5 w-3.5 mr-1" /> Run
      </Button>
      <ConsoleOutput lines={output} />
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function FunctionExpressionsVisualization() {
  const [selected, setSelected] = useState<Tab>("named");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const info = tabData[selected];

  const handleSelect = (key: Tab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const handleRun = () => {
    setOutputLines(info.codeOutput);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Function Expressions Visualizer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Selector chips */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selected === key
                  ? tabColor[key] + " scale-105 shadow-sm"
                  : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${info.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{info.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${info.badgeColor}`}>
                  function expression
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{info.description}</p>
            </div>

            {/* Code + Output */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {info.codeSnippet}
                </pre>
              </div>
              <Button size="sm" onClick={handleRun}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Declaration vs Expression comparison table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Declaration vs Expression</p>
          <ComparisonTable />
        </div>

        {/* Real-world application */}
        <RealWorldExample />
      </CardContent>
    </Card>
  );
}
