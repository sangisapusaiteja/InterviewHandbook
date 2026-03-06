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
type ModifyKey = "textContentVsInnerHTML" | "classList" | "attributes" | "xssWarning";

interface ModifyDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<ModifyKey, ModifyDemo> = {
  textContentVsInnerHTML: {
    label: "textContent vs innerHTML",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "textContent sets or reads the plain text of an element (safe, no HTML parsing). innerHTML sets or reads the HTML markup and parses any tags inside the string.",
    codeSnippet: `const el = document.getElementById("demo");

// textContent: treats everything as plain text
el.textContent = "<b>Hello</b>";
console.log(el.textContent);   // "<b>Hello</b>"
// Renders as literal text: <b>Hello</b>

// innerHTML: parses HTML tags
el.innerHTML = "<b>Hello</b>";
console.log(el.innerHTML);     // "<b>Hello</b>"
// Renders as bold: Hello`,
    codeOutput: [
      'textContent = "<b>Hello</b>"',
      "Renders as literal text: <b>Hello</b>",
      "",
      'innerHTML = "<b>Hello</b>"',
      "Renders as bold: Hello",
      "",
      "textContent is safe - no HTML parsing",
      "innerHTML parses and renders HTML tags",
    ],
  },
  classList: {
    label: "classList",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "classList provides methods to add, remove, toggle, and check CSS classes on an element without manually parsing the className string.",
    codeSnippet: `const box = document.getElementById("box");

// Add one or more classes
box.classList.add("active", "visible");
console.log(box.className);

// Remove a class
box.classList.remove("visible");
console.log(box.className);

// Toggle: add if missing, remove if present
box.classList.toggle("active");
console.log(box.className);

// Check if class exists
console.log(box.classList.contains("active"));`,
    codeOutput: [
      'add("active", "visible") -> "active visible"',
      'remove("visible")        -> "active"',
      'toggle("active")         -> ""  (removed)',
      "contains(\"active\")      -> false",
      "",
      "classList avoids manual string splitting",
    ],
  },
  attributes: {
    label: "Attributes",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "getAttribute and setAttribute read and write any HTML attribute. The dataset property gives convenient access to data-* custom attributes as camelCase properties.",
    codeSnippet: `const card = document.getElementById("card");

// Standard attributes
card.setAttribute("id", "main-card");
console.log(card.getAttribute("id"));

// data-* attributes via dataset
card.setAttribute("data-user-id", "42");
console.log(card.dataset.userId);

// Set via dataset directly
card.dataset.role = "admin";
console.log(card.getAttribute("data-role"));

// Check existence
console.log(card.hasAttribute("data-role"));`,
    codeOutput: [
      'getAttribute("id"): "main-card"',
      'dataset.userId: "42"',
      'getAttribute("data-role"): "admin"',
      "hasAttribute(\"data-role\"): true",
      "",
      "dataset maps data-user-id to userId (camelCase)",
    ],
  },
  xssWarning: {
    label: "XSS Warning",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Using innerHTML with user-supplied input is dangerous because it parses and executes embedded scripts or event handlers. Always use textContent for untrusted data.",
    codeSnippet: `// DANGEROUS: innerHTML with user input
const userInput = '<img src=x onerror="alert(\'hacked!\')">';

el.innerHTML = userInput;
// The browser parses the <img> tag and fires onerror
// -> XSS attack: arbitrary JS executes!

// SAFE: textContent with user input
el.textContent = userInput;
// Renders as harmless plain text:
// <img src=x onerror="alert('hacked!')">
// No HTML parsing, no script execution`,
    codeOutput: [
      "innerHTML + user input:",
      '  <img> tag is parsed, onerror fires alert("hacked!")',
      "  XSS vulnerability! Arbitrary JS runs.",
      "",
      "textContent + user input:",
      "  Displayed as plain text, no parsing",
      "  Safe from XSS attacks",
      "",
      "Rule: NEVER use innerHTML with untrusted data",
    ],
  },
};

const order: ModifyKey[] = ["textContentVsInnerHTML", "classList", "attributes", "xssWarning"];

// ─── Comparison table data ────────────────────────────────────────────────────
interface PropertyRow {
  property: string;
  readsHTML: boolean;
  setsHTML: boolean;
  safeFromXSS: boolean;
}

const propertyRows: PropertyRow[] = [
  { property: "textContent",  readsHTML: false, setsHTML: false, safeFromXSS: true },
  { property: "innerText",    readsHTML: false, setsHTML: false, safeFromXSS: true },
  { property: "innerHTML",    readsHTML: true,  setsHTML: true,  safeFromXSS: false },
  { property: "outerHTML",    readsHTML: true,  setsHTML: true,  safeFromXSS: false },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ModifyingHTMLVisualization() {
  const [selected, setSelected] = useState<ModifyKey>("textContentVsInnerHTML");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: ModifyKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Modifying HTML Content</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Section 1: Concept selector chips ──────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Core Concepts
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
                  DOM
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

        {/* ── Section 2: Comparison table ─────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Content Properties
          </p>

          <div className="rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Property</th>
                    <th className="text-center px-4 py-2.5 font-semibold text-muted-foreground">Reads HTML?</th>
                    <th className="text-center px-4 py-2.5 font-semibold text-muted-foreground">Sets HTML?</th>
                    <th className="text-center px-4 py-2.5 font-semibold text-muted-foreground">Safe from XSS?</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyRows.map((row) => (
                    <tr key={row.property} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 font-mono font-semibold">{row.property}</td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            row.readsHTML
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-red-500/15 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {row.readsHTML ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            row.setsHTML
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-red-500/15 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {row.setsHTML ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            row.safeFromXSS
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-red-500/15 text-red-700 dark:text-red-300"
                          }`}
                        >
                          {row.safeFromXSS ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
