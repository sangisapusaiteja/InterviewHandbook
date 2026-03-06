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
type StorageTab = "setGetItem" | "jsonData" | "removeClear" | "storageEvent";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<StorageTab, GroupInfo> = {
  setGetItem: {
    label: "setItem/getItem",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "localStorage.setItem(key, value) stores a string value under a key. localStorage.getItem(key) retrieves it. All values are stored as strings.",
    codeSnippet: `// Store a value
localStorage.setItem("username", "Alice");
localStorage.setItem("theme", "dark");

// Retrieve values
const user = localStorage.getItem("username");
console.log(user);

const theme = localStorage.getItem("theme");
console.log(theme);

// Non-existent key returns null
const missing = localStorage.getItem("age");
console.log(missing);`,
    codeOutput: [
      "Alice",
      "dark",
      "null",
    ],
  },
  jsonData: {
    label: "JSON Data",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Since localStorage only stores strings, use JSON.stringify() to save objects/arrays and JSON.parse() to read them back.",
    codeSnippet: `// Storing an object
const user = { name: "Alice", age: 30, admin: true };
localStorage.setItem("user", JSON.stringify(user));

// Reading it back
const raw = localStorage.getItem("user");
const parsed = JSON.parse(raw);
console.log(parsed.name);
console.log(parsed.age);
console.log(typeof parsed);

// Storing an array
const tags = ["js", "react", "node"];
localStorage.setItem("tags", JSON.stringify(tags));
const savedTags = JSON.parse(localStorage.getItem("tags"));
console.log(savedTags);`,
    codeOutput: [
      "Alice",
      "30",
      "object",
      '["js", "react", "node"]',
    ],
  },
  removeClear: {
    label: "Remove/Clear",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "removeItem(key) deletes a single entry. clear() wipes all entries. localStorage.length tells you how many keys are stored.",
    codeSnippet: `localStorage.setItem("a", "1");
localStorage.setItem("b", "2");
localStorage.setItem("c", "3");
console.log("Length:", localStorage.length);

// Remove one item
localStorage.removeItem("b");
console.log("After removeItem('b'):", localStorage.length);
console.log("getItem('b'):", localStorage.getItem("b"));

// Clear everything
localStorage.clear();
console.log("After clear():", localStorage.length);`,
    codeOutput: [
      "Length: 3",
      "After removeItem('b'): 2",
      "getItem('b'): null",
      "After clear(): 0",
    ],
  },
  storageEvent: {
    label: "Storage Event",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The &quot;storage&quot; event fires in OTHER tabs/windows when localStorage changes. It does NOT fire in the tab that made the change. Great for cross-tab sync.",
    codeSnippet: `// Tab A — listen for changes from other tabs
window.addEventListener("storage", (event) => {
  console.log("Key changed:", event.key);
  console.log("Old value:", event.oldValue);
  console.log("New value:", event.newValue);
  console.log("URL:", event.url);
});

// Tab B — make a change (triggers event in Tab A)
localStorage.setItem("theme", "light");`,
    codeOutput: [
      "Key changed: theme",
      "Old value: dark",
      "New value: light",
      "URL: https://example.com",
    ],
  },
};

const order: StorageTab[] = ["setGetItem", "jsonData", "removeClear", "storageEvent"];

// ─── interactive store items ──────────────────────────────────────────────────
interface StoreEntry {
  key: string;
  value: string;
}

const defaultEntries: StoreEntry[] = [
  { key: "username", value: "Alice" },
  { key: "theme", value: "dark" },
];

const sampleEntries: StoreEntry[] = [
  { key: "language", value: "en" },
  { key: "fontSize", value: "16px" },
  { key: "token", value: "abc123" },
  { key: "sidebar", value: "collapsed" },
  { key: "notifications", value: "true" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    feature: "Capacity",
    localStorage: "~5–10 MB",
    sessionStorage: "~5–10 MB",
    cookies: "~4 KB",
  },
  {
    feature: "Lifetime",
    localStorage: "Until deleted",
    sessionStorage: "Until tab closes",
    cookies: "Set by expiry date",
  },
  {
    feature: "Sent to Server",
    localStorage: "No",
    sessionStorage: "No",
    cookies: "Yes (every request)",
  },
  {
    feature: "Accessible From",
    localStorage: "Same origin",
    sessionStorage: "Same tab + origin",
    cookies: "Same origin (+ path)",
  },
  {
    feature: "API",
    localStorage: "setItem / getItem",
    sessionStorage: "setItem / getItem",
    cookies: "document.cookie",
  },
  {
    feature: "Storage Event",
    localStorage: "Yes (cross-tab)",
    sessionStorage: "No",
    cookies: "No",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function LocalStorageVisualization() {
  const [selected, setSelected] = useState<StorageTab>("setGetItem");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  // Interactive store state
  const [entries, setEntries] = useState<StoreEntry[]>(defaultEntries);
  const [sampleIdx, setSampleIdx] = useState(0);

  const group = groups[selected];

  const handleSelect = (key: StorageTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const addItem = () => {
    const entry = sampleEntries[sampleIdx % sampleEntries.length];
    // Avoid duplicates
    if (entries.some((e) => e.key === entry.key)) {
      setSampleIdx((i) => i + 1);
      const next = sampleEntries[(sampleIdx + 1) % sampleEntries.length];
      if (!entries.some((e) => e.key === next.key)) {
        setEntries((prev) => [...prev, next]);
      }
      setSampleIdx((i) => i + 1);
      return;
    }
    setEntries((prev) => [...prev, entry]);
    setSampleIdx((i) => i + 1);
  };

  const removeItem = (key: string) => {
    setEntries((prev) => prev.filter((e) => e.key !== key));
  };

  const clearAll = () => {
    setEntries([]);
  };

  const resetStore = () => {
    setEntries(defaultEntries);
    setSampleIdx(0);
  };

  const storageSize = entries.reduce((acc, e) => acc + e.key.length + e.value.length, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Local Storage</CardTitle>
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
                  localStorage
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
          </motion.div>
        </AnimatePresence>

        {/* Interactive localStorage panel */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Interactive localStorage
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-4 space-y-3">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-foreground">localStorage</span>
                <Badge variant="secondary" className="text-[10px] bg-blue-500/20 text-blue-700 dark:text-blue-300">
                  {entries.length} {entries.length === 1 ? "item" : "items"}
                </Badge>
                <Badge variant="secondary" className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  {storageSize} bytes
                </Badge>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="outline" onClick={addItem} className="text-xs h-7 px-2">
                  + Add Item
                </Button>
                <Button size="sm" variant="outline" onClick={clearAll} className="text-xs h-7 px-2 text-red-600 dark:text-red-400">
                  Clear All
                </Button>
                <Button size="sm" variant="outline" onClick={resetStore} className="text-xs h-7 px-2">
                  Reset
                </Button>
              </div>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1fr_auto] gap-2 px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <span>Key</span>
              <span>Value</span>
              <span className="w-16 text-center">Action</span>
            </div>

            {/* Entries */}
            <div className="space-y-1">
              <AnimatePresence>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.key}
                    initial={{ opacity: 0, height: 0, x: -20 }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    exit={{ opacity: 0, height: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center rounded-lg border bg-background px-3 py-2"
                  >
                    <code className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 truncate">
                      {entry.key}
                    </code>
                    <code className="text-xs font-mono text-emerald-700 dark:text-emerald-300 truncate">
                      &quot;{entry.value}&quot;
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(entry.key)}
                      className="text-[10px] h-6 w-16 text-red-600 dark:text-red-400 hover:text-red-700 hover:bg-red-500/10"
                    >
                      Remove
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>

              {entries.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 text-xs text-muted-foreground italic"
                >
                  localStorage is empty
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            localStorage vs sessionStorage vs Cookies
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span>localStorage</span>
              <span>sessionStorage</span>
              <span>Cookies</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <span className="font-semibold text-foreground">{row.feature}</span>
                <span className="text-[11px] text-muted-foreground">{row.localStorage}</span>
                <span className="text-[11px] text-muted-foreground">{row.sessionStorage}</span>
                <span className="text-[11px] text-muted-foreground">{row.cookies}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
