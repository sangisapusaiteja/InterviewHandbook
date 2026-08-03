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
            <p key={`${i}-${line}`} className="text-emerald-400">
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
type ObjMethodTab = "definingMethods" | "objectAssign" | "freezeVsSeal" | "fromEntries";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<ObjMethodTab, TabInfo> = {
  definingMethods: {
    label: "Defining Methods",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Object methods are functions stored as object properties. Use method shorthand syntax for cleaner code. The 'this' keyword refers to the object the method belongs to, and returning 'this' enables method chaining.",
    codeSnippet: `const counter = {
  count: 0,
  increment() {
    this.count++;
    return this; // enables chaining
  },
  decrement() {
    this.count--;
    return this;
  },
  getCount() {
    return this.count;
  }
};

counter.increment().increment().increment().decrement();
console.log(counter.getCount()); // 2`,
    codeOutput: [
      "counter.increment() => { count: 1 }",
      "counter.increment() => { count: 2 }",
      "counter.increment() => { count: 3 }",
      "counter.decrement() => { count: 2 }",
      "counter.getCount() => 2",
    ],
  },
  objectAssign: {
    label: "Object.assign",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Object.assign() copies enumerable own properties from one or more source objects to a target object. It can be used to merge objects or create shallow copies. Later sources overwrite earlier ones for duplicate keys.",
    codeSnippet: `const defaults = { theme: "light", lang: "en" };
const userPrefs = { theme: "dark", fontSize: 14 };

// Merge into new object
const config = Object.assign({}, defaults, userPrefs);
console.log(config);

// Shallow copy
const copy = Object.assign({}, config);
copy.fontSize = 18;
console.log("original:", config.fontSize);
console.log("copy:", copy.fontSize);`,
    codeOutput: [
      '{ theme: "dark", lang: "en", fontSize: 14 }',
      "original fontSize: 14",
      "copy fontSize: 18",
    ],
  },
  freezeVsSeal: {
    label: "freeze vs seal",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Object.freeze() makes an object fully immutable -- no adding, removing, or modifying properties. Object.seal() prevents adding or removing properties but allows modifying existing ones.",
    codeSnippet: `const frozen = Object.freeze({ x: 1, y: 2 });
frozen.x = 99;        // silently fails
frozen.z = 3;         // silently fails
console.log(frozen);  // { x: 1, y: 2 }

const sealed = Object.seal({ x: 1, y: 2 });
sealed.x = 99;        // allowed!
sealed.z = 3;         // silently fails
delete sealed.y;      // silently fails
console.log(sealed);  // { x: 99, y: 2 }`,
    codeOutput: [
      "frozen => { x: 1, y: 2 }  (unchanged)",
      "sealed => { x: 99, y: 2 } (value changed)",
      "Object.isFrozen(frozen) => true",
      "Object.isSealed(sealed) => true",
    ],
  },
  fromEntries: {
    label: "fromEntries",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Object.fromEntries() transforms a list of key-value pairs into an object. It is the inverse of Object.entries(). Useful for converting Maps to objects, filtering object properties, and transforming data structures.",
    codeSnippet: `// From entries array
const entries = [["name", "Alice"], ["age", 30]];
const obj = Object.fromEntries(entries);
console.log(obj);

// Filter object properties
const scores = { math: 90, art: 60, science: 85 };
const high = Object.fromEntries(
  Object.entries(scores).filter(([, v]) => v >= 80)
);
console.log(high);

// From a Map
const map = new Map([["a", 1], ["b", 2]]);
console.log(Object.fromEntries(map));`,
    codeOutput: [
      '{ name: "Alice", age: 30 }',
      "{ math: 90, science: 85 }",
      "{ a: 1, b: 2 }",
    ],
  },
};

const order: ObjMethodTab[] = ["definingMethods", "objectAssign", "freezeVsSeal", "fromEntries"];

// ─── Visual: Defining Methods ─────────────────────────────────────────────────
function DefiningMethodsVisual() {
  const [count, setCount] = useState(0);
  const [chain, setChain] = useState<string[]>([]);

  const increment = () => {
    setCount((c) => c + 1);
    setChain((ch) => [...ch, "increment()"]);
  };

  const decrement = () => {
    setCount((c) => c - 1);
    setChain((ch) => [...ch, "decrement()"]);
  };

  const reset = () => {
    setCount(0);
    setChain([]);
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Try method chaining interactively:
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={increment}
          className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 hover:bg-blue-500/25 transition-all"
        >
          .increment()
        </button>
        <button
          onClick={decrement}
          className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 hover:bg-blue-500/25 transition-all"
        >
          .decrement()
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 rounded-full text-xs font-semibold border bg-muted/50 border-border text-muted-foreground hover:bg-muted transition-all"
        >
          Reset
        </button>
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px] space-y-3">
        {chain.length > 0 ? (
          <>
            <p className="text-xs font-mono text-muted-foreground">
              counter{chain.map((c) => `.${c}`).join("")}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {chain.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className={`px-3 py-2 rounded-lg border text-xs font-mono font-semibold ${
                    c === "increment()"
                      ? "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300"
                      : "bg-red-500/15 border-red-400/40 text-red-700 dark:text-red-300"
                  }`}
                >
                  .{c}
                </motion.div>
              ))}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground text-lg"
              >
                =
              </motion.span>
              <motion.div
                key={count}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-4 py-2 rounded-lg border bg-blue-500 text-white text-sm font-mono font-bold shadow-md"
              >
                {count}
              </motion.div>
            </div>
          </>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click the methods above to build a chain
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Object.assign ────────────────────────────────────────────────────
function ObjectAssignVisual() {
  const [merged, setMerged] = useState(false);

  const defaults = { theme: "light", lang: "en" };
  const userPrefs = { theme: "dark", fontSize: 14 };
  const result = { theme: "dark", lang: "en", fontSize: 14 };

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={() => setMerged(!merged)}>
        <Play className="h-3.5 w-3.5 mr-1" /> {merged ? "Reset" : "Merge Objects"}
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[160px] space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* defaults */}
          <motion.div
            animate={{ opacity: merged ? 0.5 : 1, scale: merged ? 0.95 : 1 }}
            className="rounded-lg border bg-emerald-500/10 border-emerald-400/30 p-3"
          >
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">defaults</p>
            {Object.entries(defaults).map(([k, v]) => (
              <p key={k} className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                {k}: <span className="font-bold">&quot;{v}&quot;</span>
              </p>
            ))}
          </motion.div>

          {/* userPrefs */}
          <motion.div
            animate={{ opacity: merged ? 0.5 : 1, scale: merged ? 0.95 : 1 }}
            className="rounded-lg border bg-emerald-500/10 border-emerald-400/30 p-3"
          >
            <p className="text-[10px] font-semibold text-muted-foreground mb-1">userPrefs</p>
            {Object.entries(userPrefs).map(([k, v]) => (
              <p key={k} className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                {k}: <span className="font-bold">{typeof v === "string" ? `"${v}"` : v}</span>
              </p>
            ))}
          </motion.div>
        </div>

        {merged && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-lg"
            >
              ↓ <span className="text-xs font-mono">Object.assign({"{}"}, defaults, userPrefs)</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-lg border bg-emerald-500/20 border-emerald-400/40 p-3"
            >
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">config (merged)</p>
              {Object.entries(result).map(([k, v]) => {
                const overridden = k === "theme";
                return (
                  <p key={k} className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                    {k}: <span className="font-bold">{typeof v === "string" ? `"${v}"` : v}</span>
                    {overridden && (
                      <span className="text-[10px] text-orange-500 ml-2">(overridden)</span>
                    )}
                  </p>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Visual: freeze vs seal ───────────────────────────────────────────────────
function FreezeVsSealVisual() {
  const [action, setAction] = useState<"modify" | "add" | "delete" | null>(null);

  const actions = [
    { key: "modify" as const, label: "Modify x = 99" },
    { key: "add" as const, label: "Add z = 3" },
    { key: "delete" as const, label: "Delete y" },
  ];

  const getResult = (type: "freeze" | "seal") => {
    if (!action) return { x: 1, y: 2 };
    if (type === "freeze") return { x: 1, y: 2 };
    if (type === "seal") {
      if (action === "modify") return { x: 99, y: 2 };
      return { x: 1, y: 2 };
    }
    return { x: 1, y: 2 };
  };

  const getStatus = (type: "freeze" | "seal") => {
    if (!action) return null;
    if (type === "freeze") return "blocked";
    if (action === "modify") return "allowed";
    return "blocked";
  };

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Try an operation on both frozen and sealed objects:
      </p>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <button
            key={a.key}
            onClick={() => setAction(a.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              action === a.key
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        <div className="grid grid-cols-2 gap-3">
          {(["freeze", "seal"] as const).map((type) => {
            const result = getResult(type);
            const status = getStatus(type);
            return (
              <motion.div
                key={`${type}-${action}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                className={`rounded-lg border p-3 ${
                  status === "blocked"
                    ? "bg-red-500/10 border-red-400/30"
                    : status === "allowed"
                    ? "bg-green-500/10 border-green-400/30"
                    : "bg-violet-500/10 border-violet-400/30"
                }`}
              >
                <p className="text-[10px] font-semibold text-muted-foreground mb-1">
                  Object.{type}()
                </p>
                {Object.entries(result).map(([k, v]) => (
                  <p key={k} className="text-xs font-mono text-violet-700 dark:text-violet-300">
                    {k}: <span className="font-bold">{v}</span>
                  </p>
                ))}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Badge
                      variant="secondary"
                      className={`mt-2 text-[10px] ${
                        status === "blocked"
                          ? "bg-red-500/20 text-red-700 dark:text-red-300"
                          : "bg-green-500/20 text-green-700 dark:text-green-300"
                      }`}
                    >
                      {status === "blocked" ? "Blocked" : "Allowed"}
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Visual: fromEntries ──────────────────────────────────────────────────────
function FromEntriesVisual() {
  const [selectedSource, setSelectedSource] = useState<"array" | "filter" | "map" | null>(null);

  const sources = [
    { key: "array" as const, label: "From Array" },
    { key: "filter" as const, label: "Filter Props" },
    { key: "map" as const, label: "From Map" },
  ];

  const getData = () => {
    if (selectedSource === "array") {
      return {
        input: '[["name", "Alice"], ["age", 30]]',
        entries: [["name", "Alice"], ["age", 30]] as [string, string | number][],
        result: { name: "Alice", age: 30 },
      };
    }
    if (selectedSource === "filter") {
      return {
        input: "{ math: 90, art: 60, science: 85 }",
        entries: [["math", 90], ["science", 85]] as [string, string | number][],
        result: { math: 90, science: 85 },
      };
    }
    if (selectedSource === "map") {
      return {
        input: 'new Map([["a", 1], ["b", 2]])',
        entries: [["a", 1], ["b", 2]] as [string, string | number][],
        result: { a: 1, b: 2 },
      };
    }
    return null;
  };

  const data = getData();

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Pick a data source to transform with Object.fromEntries():
      </p>
      <div className="flex gap-2">
        {sources.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelectedSource(s.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              selectedSource === s.key
                ? "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[140px]">
        {data ? (
          <div className="space-y-3">
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Input</p>
              <p className="text-xs font-mono text-muted-foreground">{data.input}</p>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Entries (key-value pairs)</p>
              <div className="flex flex-wrap gap-1.5">
                {data.entries.map(([k, v], i) => (
                  <motion.div
                    key={String(k)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.2 }}
                    className="px-3 py-1.5 rounded-lg border bg-orange-500/15 border-orange-400/40 text-xs font-mono text-orange-700 dark:text-orange-300"
                  >
                    [{String(k)}, {typeof v === "string" ? `"${v}"` : v}]
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground text-lg">
              ↓ <span className="text-xs font-mono">Object.fromEntries()</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg border bg-orange-500/20 border-orange-400/40 p-3"
            >
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">Result Object</p>
              {Object.entries(data.result).map(([k, v]) => (
                <p key={k} className="text-xs font-mono text-orange-700 dark:text-orange-300">
                  {k}: <span className="font-bold">{typeof v === "string" ? `"${v}"` : v}</span>
                </p>
              ))}
            </motion.div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a data source above to see the transformation
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  {
    feature: "Reassign variable",
    constResult: "No",
    sealResult: "Yes",
    freezeResult: "Yes",
  },
  {
    feature: "Modify existing properties",
    constResult: "Yes",
    sealResult: "Yes",
    freezeResult: "No",
  },
  {
    feature: "Add new properties",
    constResult: "Yes",
    sealResult: "No",
    freezeResult: "No",
  },
  {
    feature: "Delete properties",
    constResult: "Yes",
    sealResult: "No",
    freezeResult: "No",
  },
  {
    feature: "Reconfigure properties",
    constResult: "Yes",
    sealResult: "No",
    freezeResult: "No",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ObjectMethodsVisualization() {
  const [selected, setSelected] = useState<ObjMethodTab>("definingMethods");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: ObjMethodTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Object Methods</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = tabs[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? t.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${tab.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{tab.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${tab.badgeColor}`}>
                  object method
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "definingMethods" && <DefiningMethodsVisual />}
                {selected === "objectAssign" && <ObjectAssignVisual />}
                {selected === "freezeVsSeal" && <FreezeVsSealVisual />}
                {selected === "fromEntries" && <FromEntriesVisual />}
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {tab.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(tab.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison Table: freeze vs seal vs const */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold">freeze vs seal vs const</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Feature</th>
                  <th className="px-3 py-2 text-left font-semibold">const</th>
                  <th className="px-3 py-2 text-left font-semibold">Object.seal()</th>
                  <th className="px-3 py-2 text-left font-semibold">Object.freeze()</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-semibold">{row.feature}</td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          row.constResult === "Yes"
                            ? "bg-green-500/20 text-green-700 dark:text-green-300"
                            : "bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {row.constResult}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          row.sealResult === "Yes"
                            ? "bg-green-500/20 text-green-700 dark:text-green-300"
                            : "bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {row.sealResult}
                      </Badge>
                    </td>
                    <td className="px-3 py-2">
                      <Badge
                        variant="secondary"
                        className={`text-[10px] ${
                          row.freezeResult === "Yes"
                            ? "bg-green-500/20 text-green-700 dark:text-green-300"
                            : "bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {row.freezeResult}
                      </Badge>
                    </td>
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
