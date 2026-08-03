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
          {lines.map((line) => (
            <p key={line} className="text-emerald-400">
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
type FeatureKey =
  | "undeclared-vars"
  | "readonly-props"
  | "duplicate-params"
  | "this-behavior"
  | "how-to-enable";

interface FeatureDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  withoutCode: string;
  withoutOutput: string[];
  withCode: string;
  withOutput: string[];
  note?: string;
  enableMethods?: { method: string; code: string }[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<FeatureKey, FeatureDemo> = {
  "undeclared-vars": {
    label: "Undeclared Vars",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
    badgeColor: "bg-red-500/20 text-red-700 dark:text-red-300",
    description:
      "In sloppy mode, assigning to an undeclared variable silently creates a global variable. Strict mode throws a ReferenceError instead, catching typos and accidental globals early.",
    withoutCode: `// Without "use strict"
function setName() {
  userName = "Alice"; // no error!
}
setName();
console.log(userName); // "Alice" (global)`,
    withoutOutput: ['"Alice"  // leaked as global variable'],
    withCode: `"use strict";

function setName() {
  userName = "Alice"; // ReferenceError!
}
setName();`,
    withOutput: ["ReferenceError: userName is not defined"],
    note: "Always declare variables with let, const, or var to avoid accidental globals.",
  },
  "readonly-props": {
    label: "Read-only Props",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Writing to a read-only property (e.g. one defined with Object.defineProperty writable: false) silently fails in sloppy mode. Strict mode throws a TypeError.",
    withoutCode: `// Without "use strict"
const obj = {};
Object.defineProperty(obj, "x", {
  value: 42,
  writable: false
});
obj.x = 99; // silent fail
console.log(obj.x);`,
    withoutOutput: ["42  // assignment silently ignored"],
    withCode: `"use strict";

const obj = {};
Object.defineProperty(obj, "x", {
  value: 42,
  writable: false
});
obj.x = 99; // TypeError!`,
    withOutput: ['TypeError: Cannot assign to read-only property "x"'],
    note: "Strict mode surfaces silent failures so bugs are caught immediately.",
  },
  "duplicate-params": {
    label: "Duplicate Params",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Sloppy mode allows duplicate parameter names in functions, with the last one winning. Strict mode throws a SyntaxError to prevent this confusing behavior.",
    withoutCode: `// Without "use strict"
function sum(a, a, b) {
  return a + b; // first "a" is lost
}
console.log(sum(1, 2, 3));`,
    withoutOutput: ["5  // first a=1 is overwritten by a=2"],
    withCode: `"use strict";

function sum(a, a, b) {
  return a + b;
}
// ^^^ SyntaxError before execution`,
    withOutput: ["SyntaxError: Duplicate parameter name not allowed"],
    note: "Duplicate parameter names are always an error in arrow functions and class methods, even without strict mode.",
  },
  "this-behavior": {
    label: "'this' Behavior",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "In sloppy mode, calling a function without an explicit receiver sets 'this' to the global object (window/globalThis). In strict mode, 'this' is undefined, preventing accidental global mutations.",
    withoutCode: `// Without "use strict"
function showThis() {
  console.log(typeof this);
  console.log(this === globalThis);
}
showThis();`,
    withoutOutput: ['"object"', "true  // this === globalThis"],
    withCode: `"use strict";

function showThis() {
  console.log(typeof this);
  console.log(this === undefined);
}
showThis();`,
    withOutput: ['"undefined"', "true  // this is undefined"],
    note: "Arrow functions are not affected -- they inherit 'this' from the enclosing scope regardless of strict mode.",
  },
  "how-to-enable": {
    label: "How to Enable",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      'Strict mode can be enabled at different scopes. Place "use strict" at the top of a script for the whole file, or at the top of a function for that function only. ES6 modules and classes are always in strict mode automatically.',
    enableMethods: [
      {
        method: "Script-level",
        code: `"use strict";

// Entire script runs in strict mode
let x = 10;
console.log(x);`,
      },
      {
        method: "Function-level",
        code: `function strictFunc() {
  "use strict";
  // Only this function is strict
  let y = 20;
  console.log(y);
}
strictFunc();`,
      },
      {
        method: "ES6 Modules (automatic)",
        code: `// In .mjs files or <script type="module">
// strict mode is enabled automatically

export const name = "Alice";
// No need for "use strict" directive`,
      },
    ],
    withoutCode: `// Sloppy mode (default)
x = 10;           // creates global
console.log(x);   // works fine`,
    withoutOutput: ["10  // no error, global created"],
    withCode: `"use strict";

x = 10; // ReferenceError!
console.log(x);`,
    withOutput: ["ReferenceError: x is not defined"],
    note: 'ES6 classes, modules, and code inside import() are always strict -- no need for "use strict".',
  },
};

const order: FeatureKey[] = [
  "undeclared-vars",
  "readonly-props",
  "duplicate-params",
  "this-behavior",
  "how-to-enable",
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function StrictModeVisualization() {
  const [selected, setSelected] = useState<FeatureKey>("undeclared-vars");
  const [withoutOutput, setWithoutOutput] = useState<string[] | null>(null);
  const [withOutput, setWithOutput] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: FeatureKey) => {
    setSelected(key);
    setWithoutOutput(null);
    setWithOutput(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Strict Mode</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Feature selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-2 ${demo.color}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  Strict Mode
                </Badge>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            {demo.note && <p className="text-xs opacity-80 italic">{demo.note}</p>}
          </motion.div>
        </AnimatePresence>

        {/* How to Enable: show enable methods */}
        {selected === "how-to-enable" && demo.enableMethods && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Ways to Enable Strict Mode
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {demo.enableMethods.map((em) => (
                <div key={em.method} className="space-y-1.5">
                  <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                    {em.method}
                  </Badge>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[80px]">
                    {em.code}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Side-by-side comparison: Without vs With Strict Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Without Strict Mode */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Without Strict Mode</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={`without-${selected}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.withoutCode}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setWithoutOutput(demo.withoutOutput)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
            <ConsoleOutput lines={withoutOutput} />
          </div>

          {/* With Strict Mode */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">With Strict Mode</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={`with-${selected}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.withCode}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setWithOutput(demo.withOutput)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
            <ConsoleOutput lines={withOutput} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
