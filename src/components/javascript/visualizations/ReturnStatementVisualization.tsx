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

// ─── types & data ─────────────────────────────────────────────────────────────
type Tab = "basic" | "noReturn" | "earlyReturn" | "returnObject";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

const tabColor: Record<Tab, string> = {
  basic:        "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  noReturn:     "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  earlyReturn:  "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  returnObject: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const tabBadgeColor: Record<Tab, string> = {
  basic:        "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  noReturn:     "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  earlyReturn:  "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  returnObject: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

const tabs: { key: Tab; label: string }[] = [
  { key: "basic",        label: "Basic Return" },
  { key: "noReturn",     label: "No Return" },
  { key: "earlyReturn",  label: "Early Return" },
  { key: "returnObject", label: "Return Object" },
];

const tabData: Record<Tab, TabInfo> = {
  basic: {
    label: "Basic Return",
    color: tabColor.basic,
    badgeColor: tabBadgeColor.basic,
    description:
      "The return statement ends function execution and specifies a value to be returned to the caller. The expression after return is evaluated and sent back as the function's result.",
    codeSnippet:
`function add(a, b) {
  return a + b;
}

const result = add(3, 5);
console.log("result:", result);`,
    codeOutput: ['"result: 8"'],
  },
  noReturn: {
    label: "No Return",
    color: tabColor.noReturn,
    badgeColor: tabBadgeColor.noReturn,
    description:
      "When a function has no return statement (or uses return with no value), it implicitly returns undefined. This is a common source of bugs for beginners who forget to return a computed value.",
    codeSnippet:
`function greet(name) {
  const msg = "Hello, " + name + "!";
  console.log(msg);
  // no return statement
}

const result = greet("Alice");
console.log("result:", result);`,
    codeOutput: ['"Hello, Alice!"', '"result: undefined"'],
  },
  earlyReturn: {
    label: "Early Return",
    color: tabColor.earlyReturn,
    badgeColor: tabBadgeColor.earlyReturn,
    description:
      "An early return exits a function before reaching the end. This pattern is commonly used for guard clauses — checking invalid inputs at the top and returning immediately, keeping the main logic un-nested and readable.",
    codeSnippet:
`function divide(a, b) {
  if (b === 0) {
    console.log("Cannot divide by zero!");
    return null; // early exit
  }
  return a / b;
}

console.log("10 / 2 =", divide(10, 2));
console.log("10 / 0 =", divide(10, 0));`,
    codeOutput: ['"10 / 2 = 5"', '"Cannot divide by zero!"', '"10 / 0 = null"'],
  },
  returnObject: {
    label: "Return Object",
    color: tabColor.returnObject,
    badgeColor: tabBadgeColor.returnObject,
    description:
      "Functions can return objects, arrays, or any complex data structure. This is a very common pattern for packaging multiple values into a single return. Note: when returning an object literal with an arrow function, wrap it in parentheses.",
    codeSnippet:
`function getUser(id) {
  return {
    id: id,
    name: "Alice",
    roles: ["admin", "editor"],
  };
}

const user = getUser(42);
console.log("user:", JSON.stringify(user));
console.log("roles:", user.roles.join(", "));`,
    codeOutput: [
      '"user: {\\"id\\":42,\\"name\\":\\"Alice\\",\\"roles\\":[\\"admin\\",\\"editor\\"]}"',
      '"roles: admin, editor"',
    ],
  },
};

// ─── Comparison table ─────────────────────────────────────────────────────────
const comparisonRows = [
  {
    pattern: "Basic return",
    code: "return a + b;",
    returns: "Computed value (number, string, etc.)",
  },
  {
    pattern: "No return",
    code: "function fn() { /* ... */ }",
    returns: "undefined (implicit)",
  },
  {
    pattern: "Empty return",
    code: "return;",
    returns: "undefined (explicit early exit)",
  },
  {
    pattern: "Return object",
    code: "return { key: val };",
    returns: "Object / Array reference",
  },
  {
    pattern: "Arrow (implicit)",
    code: "const fn = (x) => x * 2;",
    returns: "Expression value (no braces needed)",
  },
];

function ComparisonTable() {
  return (
    <div className="rounded-xl border overflow-hidden text-xs">
      <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
        <span>Pattern</span>
        <span>Code</span>
        <span>Returns</span>
      </div>
      {comparisonRows.map((row) => (
        <div
          key={row.pattern}
          className="grid grid-cols-3 px-3 py-2 border-t items-start gap-2"
        >
          <span className="font-semibold">{row.pattern}</span>
          <code className="text-[11px] font-mono text-muted-foreground">{row.code}</code>
          <span className="text-[11px] text-muted-foreground">{row.returns}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function ReturnStatementVisualization() {
  const [selected, setSelected]       = useState<Tab>("basic");
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
        <CardTitle className="text-lg">Return Statement Visualizer</CardTitle>
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
                  return pattern
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

            {/* Comparison table (always visible below) */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Return Patterns Comparison</p>
              <ComparisonTable />
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
