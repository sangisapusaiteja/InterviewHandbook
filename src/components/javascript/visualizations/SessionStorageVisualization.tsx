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
type TopicKey = "basicUsage" | "formDrafts" | "tabIsolation" | "iteration";

interface TopicDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TopicKey, TopicDemo> = {
  basicUsage: {
    label: "Basic Usage",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "sessionStorage.setItem() stores a key-value pair, getItem() retrieves it, and removeItem() deletes it. All values are stored as strings. Data persists only for the duration of the page session.",
    codeSnippet: `// Store a value
sessionStorage.setItem("username", "Alice");

// Retrieve the value
const name = sessionStorage.getItem("username");
console.log(name);

// Check a non-existent key
const missing = sessionStorage.getItem("email");
console.log(missing);

// Remove the item
sessionStorage.removeItem("username");
console.log(sessionStorage.getItem("username"));`,
    codeOutput: [
      '"Alice"',
      "null",
      "null  // removed",
    ],
  },
  formDrafts: {
    label: "Form Drafts",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "sessionStorage is ideal for saving form state across page reloads within a single session. The draft is automatically discarded when the tab is closed, so sensitive data does not linger.",
    codeSnippet: `// Save form draft on every keystroke
function saveDraft() {
  const form = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
  };
  sessionStorage.setItem("draft", JSON.stringify(form));
}

// Restore draft on page load
function restoreDraft() {
  const saved = sessionStorage.getItem("draft");
  if (saved) {
    const form = JSON.parse(saved);
    console.log("Restored title:", form.title);
    console.log("Restored body:", form.body);
  }
}

restoreDraft();`,
    codeOutput: [
      'Restored title: "My Blog Post"',
      'Restored body: "This is a draft saved in sessionStorage..."',
      "// Draft survives refresh but not tab close",
    ],
  },
  tabIsolation: {
    label: "Tab Isolation",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Each browser tab gets its own isolated sessionStorage, even for the same origin. This is a key difference from localStorage, which is shared across all tabs.",
    codeSnippet: `// In Tab 1:
sessionStorage.setItem("tab", "Tab 1");
console.log(sessionStorage.getItem("tab"));

// In Tab 2 (same URL, opened separately):
sessionStorage.setItem("tab", "Tab 2");
console.log(sessionStorage.getItem("tab"));

// Each tab has its own storage!
// Tab 1 still shows "Tab 1"
// Tab 2 still shows "Tab 2"
// They do NOT interfere with each other.`,
    codeOutput: [
      'Tab 1 sees: "Tab 1"',
      'Tab 2 sees: "Tab 2"',
      "// Each tab has its own isolated sessionStorage",
      "// Unlike localStorage which is shared across tabs",
    ],
  },
  iteration: {
    label: "Iteration",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "You can loop through all sessionStorage entries using the .length property and .key(index) method. This is useful for debugging or exporting all stored data.",
    codeSnippet: `sessionStorage.setItem("color", "blue");
sessionStorage.setItem("font", "monospace");
sessionStorage.setItem("theme", "dark");

// Loop with key() and length
console.log("Total items:", sessionStorage.length);

for (let i = 0; i < sessionStorage.length; i++) {
  const key = sessionStorage.key(i);
  const value = sessionStorage.getItem(key);
  console.log(key + " = " + value);
}

// Clear all items
sessionStorage.clear();
console.log("After clear:", sessionStorage.length);`,
    codeOutput: [
      "Total items: 3",
      'color = "blue"',
      'font = "monospace"',
      'theme = "dark"',
      "After clear: 0",
    ],
  },
};

const order: TopicKey[] = ["basicUsage", "formDrafts", "tabIsolation", "iteration"];

// ─── Tab storage entry type ──────────────────────────────────────────────────
interface StorageEntry {
  key: string;
  value: string;
}

// ─── Reference table data ────────────────────────────────────────────────────
interface MethodRow {
  method: string;
  description: string;
  returns: string;
}

const methodRows: MethodRow[] = [
  { method: "setItem(key, value)", description: "Stores a key-value pair in sessionStorage", returns: "undefined" },
  { method: "getItem(key)", description: "Retrieves the value associated with the given key", returns: "string | null" },
  { method: "removeItem(key)", description: "Removes the item with the specified key", returns: "undefined" },
  { method: "clear()", description: "Removes all key-value pairs from sessionStorage", returns: "undefined" },
  { method: "key(index)", description: "Returns the key name at the given index position", returns: "string | null" },
  { method: "length", description: "Returns the number of stored key-value pairs (property, not method)", returns: "number" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function SessionStorageVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basicUsage");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  // Interactive tab isolation state
  const [tab1Storage, setTab1Storage] = useState<StorageEntry[]>([]);
  const [tab2Storage, setTab2Storage] = useState<StorageEntry[]>([]);
  const [tab1Counter, setTab1Counter] = useState(1);
  const [tab2Counter, setTab2Counter] = useState(1);

  const demo = demos[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  const addToTab1 = () => {
    setTab1Storage((prev) => [
      ...prev,
      { key: `item-${tab1Counter}`, value: `Tab1-Value-${tab1Counter}` },
    ]);
    setTab1Counter((c) => c + 1);
  };

  const addToTab2 = () => {
    setTab2Storage((prev) => [
      ...prev,
      { key: `item-${tab2Counter}`, value: `Tab2-Value-${tab2Counter}` },
    ]);
    setTab2Counter((c) => c + 1);
  };

  const clearTab1 = () => {
    setTab1Storage([]);
    setTab1Counter(1);
  };

  const clearTab2 = () => {
    setTab2Storage([]);
    setTab2Counter(1);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Session Storage</CardTitle>
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
                  sessionStorage
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

        {/* ── Section 2: Interactive Tab Isolation Visual ─────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Interactive: Tab Isolation Demo
          </p>
          <p className="text-sm text-muted-foreground">
            Each browser tab gets its own sessionStorage. Add items to each &quot;tab&quot; below and notice they remain completely independent.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tab 1 */}
            <div className="rounded-xl border overflow-hidden">
              <div className="bg-violet-500/15 border-b border-violet-500/40 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-violet-700 dark:text-violet-300">
                  Browser Tab 1
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={addToTab1}>
                    Add to Tab 1
                  </Button>
                  <Button size="sm" variant="ghost" onClick={clearTab1}>
                    Clear
                  </Button>
                </div>
                <div className="rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-3 py-2 min-h-[80px] font-mono text-xs space-y-1">
                  <p className="text-zinc-500 text-[10px] mb-1">sessionStorage (Tab 1)</p>
                  <AnimatePresence>
                    {tab1Storage.length === 0 ? (
                      <p className="text-zinc-600 italic">Empty</p>
                    ) : (
                      tab1Storage.map((entry) => (
                        <motion.p
                          key={entry.key}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          className="text-blue-400"
                        >
                          <span className="text-zinc-500">{entry.key}:</span> &quot;{entry.value}&quot;
                        </motion.p>
                      ))
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Items: {tab1Storage.length}
                </p>
              </div>
            </div>

            {/* Tab 2 */}
            <div className="rounded-xl border overflow-hidden">
              <div className="bg-orange-500/15 border-b border-orange-500/40 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">
                  Browser Tab 2
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={addToTab2}>
                    Add to Tab 2
                  </Button>
                  <Button size="sm" variant="ghost" onClick={clearTab2}>
                    Clear
                  </Button>
                </div>
                <div className="rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-3 py-2 min-h-[80px] font-mono text-xs space-y-1">
                  <p className="text-zinc-500 text-[10px] mb-1">sessionStorage (Tab 2)</p>
                  <AnimatePresence>
                    {tab2Storage.length === 0 ? (
                      <p className="text-zinc-600 italic">Empty</p>
                    ) : (
                      tab2Storage.map((entry) => (
                        <motion.p
                          key={entry.key}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          className="text-emerald-400"
                        >
                          <span className="text-zinc-500">{entry.key}:</span> &quot;{entry.value}&quot;
                        </motion.p>
                      ))
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Items: {tab2Storage.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Reference table ──────────────────────────────────── */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            sessionStorage Methods Reference
          </p>

          <div className="rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Method</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Description</th>
                    <th className="text-left px-4 py-2.5 font-semibold text-muted-foreground">Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {methodRows.map((row) => (
                    <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2 font-mono font-semibold">{row.method}</td>
                      <td className="px-4 py-2 text-muted-foreground">{row.description}</td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">{row.returns}</td>
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
