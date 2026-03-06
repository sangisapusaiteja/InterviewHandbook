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
type SelectorKey =
  | "getElementById"
  | "querySelector"
  | "querySelectorAll"
  | "liveVsStatic";

interface SelectorDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<SelectorKey, SelectorDemo> = {
  getElementById: {
    label: "getElementById",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The fastest DOM selection method. Returns a single element matching the given id attribute, or null if no match is found. Since ids should be unique per page, this always returns at most one element.",
    codeSnippet: `// HTML: <div id="app">Hello</div>

const el = document.getElementById("app");
console.log(el);              // <div id="app">Hello</div>
console.log(el.textContent);  // "Hello"
console.log(el.id);           // "app"`,
    codeOutput: [
      'el: <div id="app">Hello</div>',
      'el.textContent: "Hello"',
      'el.id: "app"',
    ],
  },
  querySelector: {
    label: "querySelector",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Uses any valid CSS selector to find the first matching element. The most flexible single-element selector — supports classes, attributes, pseudo-selectors, and combinators. Returns null if nothing matches.",
    codeSnippet: `// HTML: <p class="intro">First</p>
//       <p class="intro">Second</p>

const el = document.querySelector(".intro");
console.log(el);              // <p class="intro">First</p>
console.log(el.textContent);  // "First"

const nested = document.querySelector("div > .intro");
console.log(nested);          // first .intro inside a div`,
    codeOutput: [
      'el: <p class="intro">First</p>',
      'el.textContent: "First"',
      "nested: first .intro inside a div",
    ],
  },
  querySelectorAll: {
    label: "querySelectorAll",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Returns a static NodeList of all elements matching the CSS selector. The list does not update when the DOM changes. Supports forEach natively but is not a true Array — use Array.from() for map/filter.",
    codeSnippet: `// HTML: <li class="item">A</li>
//       <li class="item">B</li>
//       <li class="item">C</li>

const items = document.querySelectorAll(".item");
console.log(items.length);    // 3
items.forEach(el => console.log(el.textContent));
// "A", "B", "C"

const arr = Array.from(items);
console.log(Array.isArray(arr)); // true`,
    codeOutput: [
      "items.length: 3",
      'forEach: "A", "B", "C"',
      "Array.isArray(arr): true",
    ],
  },
  liveVsStatic: {
    label: "Live vs Static",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "getElementsByClassName returns a live HTMLCollection that updates automatically when the DOM changes. querySelectorAll returns a static NodeList that is a snapshot at call time. This difference can cause subtle bugs if you modify the DOM while iterating a live collection.",
    codeSnippet: `// HTML: <div class="box">1</div>
//       <div class="box">2</div>

const live   = document.getElementsByClassName("box");
const static_ = document.querySelectorAll(".box");
console.log(live.length);     // 2
console.log(static_.length);  // 2

// Add a new .box to the DOM
const newDiv = document.createElement("div");
newDiv.className = "box";
document.body.appendChild(newDiv);

console.log(live.length);     // 3 (auto-updated!)
console.log(static_.length);  // 2 (snapshot, unchanged)`,
    codeOutput: [
      "live.length (before): 2",
      "static.length (before): 2",
      "// After adding a new .box element:",
      "live.length (after): 3  (auto-updated!)",
      "static.length (after): 2  (snapshot, unchanged)",
    ],
  },
};

const order: SelectorKey[] = [
  "getElementById",
  "querySelector",
  "querySelectorAll",
  "liveVsStatic",
];

// ─── Comparison table data ────────────────────────────────────────────────────
const comparisonRows = [
  {
    method: "getElementById()",
    returns: "Element | null",
    live: "N/A",
    accepts: "ID string",
  },
  {
    method: "querySelector()",
    returns: "Element | null",
    live: "N/A",
    accepts: "CSS selector",
  },
  {
    method: "querySelectorAll()",
    returns: "Static NodeList",
    live: "No",
    accepts: "CSS selector",
  },
  {
    method: "getElementsByClassName()",
    returns: "Live HTMLCollection",
    live: "Yes",
    accepts: "Class name(s)",
  },
  {
    method: "getElementsByTagName()",
    returns: "Live HTMLCollection",
    live: "Yes",
    accepts: "Tag name",
  },
  {
    method: "getElementsByName()",
    returns: "Live NodeList",
    live: "Yes",
    accepts: "name attribute",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SelectingElementsVisualization() {
  const [selected, setSelected] = useState<SelectorKey>("getElementById");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: SelectorKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Selecting Elements</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Section 1: Selector chips ──────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            DOM Selection Methods
          </p>

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
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  DOM API
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
                  {demo.codeSnippet}
                </motion.pre>
              </AnimatePresence>
              <Button size="sm" onClick={() => setOutputLines(demo.codeOutput)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Run
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Output</p>
              <ConsoleOutput lines={outputLines} />
            </div>
          </div>
        </div>

        {/* ── Section 2: Comparison Table ─────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Selection Methods
          </p>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Method</th>
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Returns</th>
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Live?</th>
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Accepts</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-2 font-mono font-semibold">{row.method}</td>
                    <td className="px-4 py-2">{row.returns}</td>
                    <td className="px-4 py-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          row.live === "Yes"
                            ? "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                            : row.live === "No"
                            ? "bg-violet-500/20 text-violet-700 dark:text-violet-300"
                            : "bg-zinc-500/20 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {row.live}
                      </Badge>
                    </td>
                    <td className="px-4 py-2">{row.accepts}</td>
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
