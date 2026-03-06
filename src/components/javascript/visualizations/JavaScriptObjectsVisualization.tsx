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
type ObjectTab = "creating" | "dotBracket" | "keysValuesEntries" | "charFreq";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<ObjectTab, TabInfo> = {
  creating: {
    label: "Creating Objects",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Objects can be created using literal syntax {}. ES6 adds shorthand properties (when variable name matches key) and computed property names using [expression] as the key.",
    codeSnippet: `const name = "Alice";
const age = 25;

// Shorthand properties
const user = { name, age };

// Computed keys
const field = "email";
const contact = {
  [field]: "alice@example.com",
  ["is" + "Active"]: true,
};

console.log(user);
console.log(contact);`,
    codeOutput: [
      '{ name: "Alice", age: 25 }',
      '{ email: "alice@example.com", isActive: true }',
    ],
  },
  dotBracket: {
    label: "Dot vs Bracket",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Dot notation (obj.key) is concise but requires a valid identifier. Bracket notation (obj[expr]) works with any string, variables, and expressions -- essential for dynamic key access.",
    codeSnippet: `const car = { brand: "Toyota", year: 2023, "top-speed": 180 };

// Dot notation
console.log(car.brand);        // "Toyota"

// Bracket notation
console.log(car["year"]);      // 2023
console.log(car["top-speed"]); // 180 (dot won't work here)

// Dynamic key
const prop = "brand";
console.log(car[prop]);        // "Toyota"`,
    codeOutput: [
      '"Toyota"',
      "2023",
      "180",
      '"Toyota"  // via dynamic key',
    ],
  },
  keysValuesEntries: {
    label: "keys/values/entries",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Object.keys() returns an array of keys, Object.values() returns values, and Object.entries() returns [key, value] pairs. These are essential for iterating over objects.",
    codeSnippet: `const scores = { math: 95, science: 88, english: 92 };

console.log(Object.keys(scores));
console.log(Object.values(scores));
console.log(Object.entries(scores));

// Iterate with entries
for (const [subject, score] of Object.entries(scores)) {
  console.log(subject + ": " + score);
}`,
    codeOutput: [
      '["math", "science", "english"]',
      "[95, 88, 92]",
      '[["math",95], ["science",88], ["english",92]]',
      "math: 95",
      "science: 88",
      "english: 92",
    ],
  },
  charFreq: {
    label: "Interview: charFreq",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "A classic interview question: count the frequency of each character in a string using an object as a hash map. This pattern appears in anagram checks, first unique char, and more.",
    codeSnippet: `function charFreq(str) {
  const freq = {};
  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }
  return freq;
}

console.log(charFreq("banana"));
console.log(charFreq("hello"));`,
    codeOutput: [
      '{ b: 1, a: 3, n: 2 }',
      '{ h: 1, e: 1, l: 2, o: 1 }',
    ],
  },
};

const order: ObjectTab[] = ["creating", "dotBracket", "keysValuesEntries", "charFreq"];

// ─── Visual: Creating Objects ─────────────────────────────────────────────────
function CreatingObjectsVisual() {
  const [mode, setMode] = useState<"literal" | "shorthand" | "computed">("literal");

  const modes = [
    { key: "literal" as const, label: "Literal" },
    { key: "shorthand" as const, label: "Shorthand" },
    { key: "computed" as const, label: "Computed Keys" },
  ];

  const examples: Record<string, { input: string; result: { key: string; value: string }[] }> = {
    literal: {
      input: '{ name: "Alice", age: 25 }',
      result: [
        { key: "name", value: '"Alice"' },
        { key: "age", value: "25" },
      ],
    },
    shorthand: {
      input: "{ name, age }  // variables in scope",
      result: [
        { key: "name", value: '"Alice"' },
        { key: "age", value: "25" },
      ],
    },
    computed: {
      input: '{ [field]: "alice@example.com" }',
      result: [
        { key: "email", value: '"alice@example.com"' },
        { key: "isActive", value: "true" },
      ],
    },
  };

  const current = examples[mode];

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              mode === m.key
                ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[140px] space-y-3">
        <p className="text-xs font-mono text-muted-foreground">{current.input}</p>
        <div className="space-y-1.5">
          {current.result.map((pair, i) => (
            <motion.div
              key={`${mode}-${i}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
              className="flex items-center gap-2 rounded-lg border bg-blue-500/15 border-blue-400/40 px-3 py-2 text-xs font-mono"
            >
              <span className="font-bold text-blue-700 dark:text-blue-300">{pair.key}</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-blue-600 dark:text-blue-200">{pair.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Visual: Dot vs Bracket ───────────────────────────────────────────────────
function DotBracketVisual() {
  const obj = { brand: "Toyota", year: "2023", "top-speed": "180" };
  const [accessKey, setAccessKey] = useState<string | null>(null);

  const keys = Object.keys(obj);

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Click a key to access the value:
      </p>
      <div className="flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => setAccessKey(k)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
              accessKey === k
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[120px]">
        {accessKey ? (
          <div className="space-y-2">
            <motion.div
              key={accessKey}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1.5"
            >
              {accessKey.includes("-") ? (
                <p className="text-xs font-mono text-red-500 dark:text-red-400 line-through">
                  car.{accessKey} {"//"} SyntaxError
                </p>
              ) : (
                <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                  car.{accessKey} = {obj[accessKey as keyof typeof obj]}
                </p>
              )}
              <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300">
                car[&quot;{accessKey}&quot;] = {obj[accessKey as keyof typeof obj]}
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-3 px-3 py-2 rounded-lg border bg-emerald-500 text-white text-sm font-mono font-bold shadow-md inline-block"
            >
              {obj[accessKey as keyof typeof obj]}
            </motion.div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a key above to see dot vs bracket notation in action
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: keys / values / entries ──────────────────────────────────────────
function KeysValuesEntriesVisual() {
  const scores: Record<string, number> = { math: 95, science: 88, english: 92 };
  const [activeMethod, setActiveMethod] = useState<"keys" | "values" | "entries" | null>(null);

  const methods = [
    { key: "keys" as const, label: "Object.keys()" },
    { key: "values" as const, label: "Object.values()" },
    { key: "entries" as const, label: "Object.entries()" },
  ];

  const getResult = (): string[] => {
    if (activeMethod === "keys") return Object.keys(scores);
    if (activeMethod === "values") return Object.values(scores).map(String);
    if (activeMethod === "entries") return Object.entries(scores).map(([k, v]) => `[${k}, ${v}]`);
    return [];
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {methods.map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveMethod(m.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
              activeMethod === m.key
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            .{m.key}()
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[140px] space-y-3">
        {/* Source object */}
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Source Object</p>
          <div className="flex gap-1.5 flex-wrap">
            {Object.entries(scores).map(([k, v]) => (
              <div
                key={k}
                className="px-2.5 py-1.5 rounded-lg border bg-violet-500/10 border-violet-400/30 text-xs font-mono text-violet-700 dark:text-violet-300"
              >
                <span className="font-bold">{k}</span>
                <span className="text-muted-foreground">:</span> {v}
              </div>
            ))}
          </div>
        </div>

        {/* Arrow + Result */}
        {activeMethod && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-lg"
            >
              ↓ <span className="text-xs font-mono">Object.{activeMethod}()</span>
            </motion.div>

            <div>
              <p className="text-[10px] font-semibold text-muted-foreground mb-1.5">Result</p>
              <div className="flex gap-1.5 flex-wrap">
                {getResult().map((item, i) => (
                  <motion.div
                    key={`${activeMethod}-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.2 }}
                    className="px-3 py-2 rounded-lg border bg-violet-500 text-white text-xs font-mono font-bold shadow-md"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}

        {!activeMethod && (
          <p className="text-xs text-muted-foreground text-center py-6">
            Select a method above to see what it extracts from the object
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: charFreq ─────────────────────────────────────────────────────────
function CharFreqVisual() {
  const [inputStr, setInputStr] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const examples = ["banana", "hello", "abracadabra"];

  const computeFreq = (str: string): Record<string, number> => {
    const freq: Record<string, number> = {};
    for (const ch of str) {
      freq[ch] = (freq[ch] || 0) + 1;
    }
    return freq;
  };

  const animate = async (str: string) => {
    setInputStr(str);
    setIsAnimating(true);
    setStep(0);
    for (let i = 0; i <= str.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 300));
    }
    setIsAnimating(false);
  };

  const partialFreq = inputStr
    ? (() => {
        const freq: Record<string, number> = {};
        for (let i = 0; i < step && i < inputStr.length; i++) {
          const ch = inputStr[i];
          freq[ch] = (freq[ch] || 0) + 1;
        }
        return freq;
      })()
    : {};

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">
        Pick a string to animate character counting:
      </p>
      <div className="flex gap-2">
        {examples.map((str) => (
          <button
            key={str}
            onClick={() => animate(str)}
            disabled={isAnimating}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all font-mono ${
              inputStr === str
                ? "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300 scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            &quot;{str}&quot;
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[140px] space-y-3">
        {inputStr ? (
          <>
            {/* Character strip */}
            <div className="flex gap-1 flex-wrap">
              {inputStr.split("").map((ch, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: i < step ? 1 : 0.3,
                    scale: i === step - 1 && isAnimating ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.15 }}
                  className={`w-8 h-8 rounded-md border flex items-center justify-center text-xs font-mono font-bold ${
                    i < step
                      ? "bg-orange-500/15 border-orange-400/40 text-orange-700 dark:text-orange-300"
                      : "bg-muted/30 border-border text-muted-foreground"
                  }`}
                >
                  {ch}
                </motion.div>
              ))}
            </div>

            {/* Frequency map */}
            <div className="flex gap-1.5 flex-wrap">
              {Object.entries(partialFreq).map(([ch, count]) => (
                <motion.div
                  key={ch}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="px-3 py-2 rounded-lg border bg-orange-500/15 border-orange-400/40 text-xs font-mono font-semibold text-orange-700 dark:text-orange-300"
                >
                  {ch}: {count}
                </motion.div>
              ))}
            </div>

            {!isAnimating && step >= inputStr.length && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground"
              >
                Final: {JSON.stringify(computeFreq(inputStr))}
              </motion.p>
            )}
          </>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Select a string above to watch the frequency map build character by character
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  { operation: "Access property",      syntax: "obj.key / obj[key]",           example: 'person.name // "Alice"' },
  { operation: "Add / update",         syntax: "obj.key = value",              example: "person.age = 26" },
  { operation: "Delete property",      syntax: "delete obj.key",              example: "delete person.temp" },
  { operation: "Check existence",      syntax: '"key" in obj',                example: '"name" in person // true' },
  { operation: "Get keys",             syntax: "Object.keys(obj)",            example: '["name", "age"]' },
  { operation: "Get values",           syntax: "Object.values(obj)",          example: '["Alice", 25]' },
  { operation: "Get entries",          syntax: "Object.entries(obj)",         example: '[["name","Alice"],["age",25]]' },
  { operation: "Shallow copy",         syntax: "{ ...obj } / Object.assign", example: "const clone = { ...obj }" },
  { operation: "Freeze (immutable)",   syntax: "Object.freeze(obj)",         example: "Prevents all modifications" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function JavaScriptObjectsVisualization() {
  const [selected, setSelected] = useState<ObjectTab>("creating");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: ObjectTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Objects</CardTitle>
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
                  objects
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "creating" && <CreatingObjectsVisual />}
                {selected === "dotBracket" && <DotBracketVisual />}
                {selected === "keysValuesEntries" && <KeysValuesEntriesVisual />}
                {selected === "charFreq" && <CharFreqVisual />}
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

        {/* Comparison Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold">Object Operations</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Operation</th>
                  <th className="px-3 py-2 text-left font-semibold">Syntax</th>
                  <th className="px-3 py-2 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.operation} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-semibold text-blue-700 dark:text-blue-300">
                      {row.operation}
                    </td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.syntax}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{row.example}</td>
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
