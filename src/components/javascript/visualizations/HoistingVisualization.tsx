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
type TabKey = "var-hoisting" | "let-const-tdz" | "function-hoisting" | "interview-traps";

interface TabDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  example: string;
  output: string[];
  beforeCode: string;
  afterCode: string;
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TabKey, TabDemo> = {
  "var-hoisting": {
    label: "var Hoisting",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Variables declared with var are hoisted to the top of their function scope. The declaration is moved up, but the assignment stays in place. Before the assignment line, the variable exists but holds undefined.",
    example: `console.log(name); // undefined
var name = "Alice";
console.log(name); // "Alice"

console.log(age);  // undefined
if (true) {
  var age = 25;
}
console.log(age);  // 25`,
    output: ["undefined", '"Alice"', "undefined", "25"],
    beforeCode: `console.log(name);
var name = "Alice";
console.log(name);`,
    afterCode: `var name;           // declaration hoisted
console.log(name);  // undefined
name = "Alice";     // assignment stays
console.log(name);  // "Alice"`,
  },
  "let-const-tdz": {
    label: "let/const TDZ",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Variables declared with let and const are hoisted but NOT initialized. Accessing them before the declaration causes a ReferenceError. The zone between the start of the scope and the declaration is called the Temporal Dead Zone (TDZ).",
    example: `// console.log(x); // ReferenceError!
// ^^^ Temporal Dead Zone ^^^
let x = 10;
console.log(x); // 10

// const behaves the same:
// console.log(y); // ReferenceError!
const y = 20;
console.log(y); // 20`,
    output: ["10", "20"],
    beforeCode: `// --- TDZ starts ---
console.log(x); // Error!
let x = 10;
console.log(x);`,
    afterCode: `// let x is hoisted (no init)
// --- TDZ starts ---
console.log(x); // ReferenceError
// --- TDZ ends ---
let x = 10;     // initialized here
console.log(x); // 10`,
  },
  "function-hoisting": {
    label: "Function Hoisting",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Function declarations are fully hoisted - both the name and the function body are moved to the top. Function expressions (including arrow functions) follow the hoisting rules of their variable keyword (var, let, or const).",
    example: `// Function declaration - works!
greet(); // "Hello!"

function greet() {
  console.log("Hello!");
}

// Function expression - fails!
// sayBye(); // TypeError: not a function
var sayBye = function() {
  console.log("Bye!");
};
sayBye(); // "Bye!"`,
    output: ['"Hello!"', '"Bye!"'],
    beforeCode: `greet(); // works?

function greet() {
  console.log("Hello!");
}

sayBye(); // works?

var sayBye = function() {
  console.log("Bye!");
};`,
    afterCode: `function greet() {       // fully hoisted
  console.log("Hello!");
}
var sayBye;              // only name hoisted

greet();    // "Hello!"
sayBye();   // TypeError: undefined
            // is not a function
sayBye = function() {
  console.log("Bye!");
};`,
  },
  "interview-traps": {
    label: "Interview Traps",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Hoisting is a favorite interview topic. Watch out for var in loops, function declaration ordering, and the difference between TypeError and ReferenceError when accessing uninitialized bindings.",
    example: `// Trap 1: var in a loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Prints: 3, 3, 3 (not 0, 1, 2)

// Trap 2: same-name function + var
var foo = 1;
function foo() {}
console.log(typeof foo); // "number"

// Trap 3: let fixes the loop
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
// Prints: 0, 1, 2`,
    output: ["3", "3", "3", '"number"', "0", "1", "2"],
    beforeCode: `var foo = 1;
function foo() {}
console.log(typeof foo);`,
    afterCode: `function foo() {}   // function hoisted first
var foo;            // var re-declaration (no-op)
foo = 1;            // assignment overrides
console.log(typeof foo); // "number"`,
  },
};

const order: TabKey[] = ["var-hoisting", "let-const-tdz", "function-hoisting", "interview-traps"];

// ─── comparison table data ───────────────────────────────────────────────────
interface ComparisonRow {
  declaration: string;
  hoisted: string;
  initialValue: string;
  tdz: string;
}

const comparisonRows: ComparisonRow[] = [
  { declaration: "var", hoisted: "Yes", initialValue: "undefined", tdz: "No" },
  { declaration: "let", hoisted: "Yes", initialValue: "Uninitialized", tdz: "Yes" },
  { declaration: "const", hoisted: "Yes", initialValue: "Uninitialized", tdz: "Yes" },
  { declaration: "function declaration", hoisted: "Yes (fully)", initialValue: "Function body", tdz: "No" },
  { declaration: "function expression (var)", hoisted: "Yes (name only)", initialValue: "undefined", tdz: "No" },
  { declaration: "function expression (let/const)", hoisted: "Yes (name only)", initialValue: "Uninitialized", tdz: "Yes" },
  { declaration: "class", hoisted: "Yes", initialValue: "Uninitialized", tdz: "Yes" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function HoistingVisualization() {
  const [selected, setSelected] = useState<TabKey>("var-hoisting");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [showAfter, setShowAfter] = useState(false);

  const demo = demos[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
    setShowAfter(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Hoisting in JavaScript</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Tab selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? d.color + " shadow-sm ring-1 ring-current/20"
                    : "bg-muted/30 border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {d.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 ${demo.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                Hoisting
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Code + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.example}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(demo.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>

        {/* Interactive visual: Before vs After hoisting */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              How the Engine Sees It
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAfter((prev) => !prev)}
              className="text-xs"
            >
              {showAfter ? "Show Original" : "Show Hoisted"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Before hoisting */}
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-muted-foreground">
                What You Write
              </p>
              <div className="relative rounded-xl border bg-muted/30 px-4 py-3 font-mono text-xs whitespace-pre overflow-x-auto min-h-[120px]">
                {demo.beforeCode}
              </div>
            </div>

            {/* After hoisting */}
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-muted-foreground">
                What the Engine Sees
              </p>
              <AnimatePresence mode="wait">
                {showAfter ? (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-xl border bg-muted/30 px-4 py-3 font-mono text-xs whitespace-pre overflow-x-auto min-h-[120px]"
                  >
                    {/* Animated arrow indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="absolute -left-3 top-3"
                    >
                      <span className="text-emerald-500 text-sm">&#x2191;</span>
                    </motion.div>
                    {demo.afterCode.split("\n").map((line, i) => {
                      const isHoisted = line.includes("hoisted") || line.includes("Hoisted") || line.includes("TDZ starts");
                      return (
                        <motion.div
                          key={`line-${i}`}
                          initial={{ opacity: 0, x: 6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i, duration: 0.2 }}
                          className={isHoisted ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""}
                        >
                          {line}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[120px] flex items-center justify-center"
                  >
                    <p className="text-xs text-muted-foreground italic">
                      Click &ldquo;Show Hoisted&rdquo; to see how declarations move &#x2191;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Comparison / Reference Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Hoisting Behavior Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Declaration</span>
              <span className="text-center">Hoisted?</span>
              <span className="text-center">Initial Value</span>
              <span className="text-center">TDZ?</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.declaration}
                className="grid grid-cols-4 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <span className="font-semibold font-mono text-[11px]">{row.declaration}</span>
                <span className="text-center text-[11px]">
                  {row.hoisted.includes("fully") ? (
                    <span className="text-emerald-600 dark:text-emerald-400">{row.hoisted}</span>
                  ) : row.hoisted === "Yes" ? (
                    <span className="text-blue-600 dark:text-blue-400">{row.hoisted}</span>
                  ) : (
                    <span className="text-orange-600 dark:text-orange-400">{row.hoisted}</span>
                  )}
                </span>
                <span className="text-center font-mono text-[11px]">
                  {row.initialValue === "undefined" ? (
                    <span className="text-yellow-600 dark:text-yellow-400">{row.initialValue}</span>
                  ) : row.initialValue === "Uninitialized" ? (
                    <span className="text-red-600 dark:text-red-400">{row.initialValue}</span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">{row.initialValue}</span>
                  )}
                </span>
                <span className="text-center text-[11px]">
                  {row.tdz === "Yes" ? (
                    <span className="text-red-600 dark:text-red-400 font-semibold">{row.tdz}</span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400">{row.tdz}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Function declarations are the only type that is fully hoisted with its body.
            All other declarations are hoisted but either initialized to{" "}
            <code className="font-mono font-semibold">undefined</code> (var) or left uninitialized
            in the Temporal Dead Zone (let, const, class).
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
