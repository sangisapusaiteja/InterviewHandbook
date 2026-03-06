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
type MilestoneKey = "1995" | "1997" | "2009" | "2015" | "2020";

interface Milestone {
  year: string;
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  highlights: string[];
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const milestones: Record<MilestoneKey, Milestone> = {
  "1995": {
    year: "1995",
    label: "Created by Brendan Eich",
    category: "Origin",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Brendan Eich created JavaScript in just 10 days at Netscape. Originally named Mocha, then LiveScript, it was finally renamed JavaScript to ride the popularity of Java.",
    highlights: [
      "Built in 10 days",
      "First browser scripting language",
      "Dynamic typing from the start",
    ],
    example: `// The very first JS-style code (1995)\nvar greeting = "Hello, World!";\nalert(greeting);\ndocument.write(greeting);\nconsole.log(greeting);`,
    output: ["Hello, World!"],
  },
  "1997": {
    year: "1997",
    label: "ECMAScript 1",
    category: "Standardization",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "ECMA International published the first ECMAScript specification (ECMA-262), giving JavaScript a formal standard. This ensured consistency across different browser implementations.",
    highlights: [
      "Formal language specification",
      "Cross-browser consistency goal",
      "Foundation for all future versions",
    ],
    example: `// ECMAScript 1 basics\nvar name = "ECMAScript";\nvar version = 1;\nvar isStandard = true;\n\nconsole.log("Language: " + name);\nconsole.log("Version: " + version);\nconsole.log("Is standard: " + isStandard);`,
    output: ["Language: ECMAScript", "Version: 1", "Is standard: true"],
  },
  "2009": {
    year: "2009",
    label: "ES5 / Node.js",
    category: "Expansion",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "ES5 added strict mode, JSON support, and array methods like forEach, map, and filter. The same year, Ryan Dahl released Node.js, bringing JavaScript to the server side.",
    highlights: [
      "Array methods (map, filter, forEach)",
      "JSON.parse / JSON.stringify",
      "Node.js: JS on the server",
    ],
    example: `// ES5 features\n"use strict";\nvar numbers = [1, 2, 3, 4, 5];\n\nvar doubled = numbers.map(function(n) {\n  return n * 2;\n});\nconsole.log("doubled: " + doubled);\n\nvar evens = numbers.filter(function(n) {\n  return n % 2 === 0;\n});\nconsole.log("evens: " + evens);\n\nvar obj = { name: "Node.js", year: 2009 };\nconsole.log(JSON.stringify(obj));`,
    output: [
      "doubled: 2,4,6,8,10",
      "evens: 2,4",
      '{"name":"Node.js","year":2009}',
    ],
  },
  "2015": {
    year: "2015",
    label: "ES6 (Major Update)",
    category: "Revolution",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "ES6 (ES2015) was the biggest update in JavaScript history. It introduced let/const, arrow functions, classes, template literals, destructuring, Promises, modules, and much more.",
    highlights: [
      "let & const declarations",
      "Arrow functions & classes",
      "Promises, modules, destructuring",
    ],
    example: `// ES6 features\nconst name = "JavaScript";\nlet year = 2015;\n\nconst greet = (lang) => \`Welcome to \${lang}!\`;\nconsole.log(greet(name));\n\nconst [a, b, ...rest] = [1, 2, 3, 4, 5];\nconsole.log("a:", a, "b:", b, "rest:", rest);\n\nclass Language {\n  constructor(name) { this.name = name; }\n  toString() { return this.name; }\n}\nconsole.log(new Language("ES6").toString());`,
    output: [
      "Welcome to JavaScript!",
      "a: 1 b: 2 rest: 3,4,5",
      "ES6",
    ],
  },
  "2020": {
    year: "2020+",
    label: "Modern JS",
    category: "Yearly Releases",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    description:
      "Since 2016, ECMAScript follows a yearly release cycle. Modern JS includes optional chaining, nullish coalescing, top-level await, private class fields, and more quality-of-life improvements.",
    highlights: [
      "Optional chaining (?.) & nullish coalescing (??)",
      "Private class fields (#)",
      "Top-level await, at(), structuredClone",
    ],
    example: `// Modern JS (ES2020+)\nconst user = {\n  name: "Alice",\n  address: { city: "Wonderland" },\n};\n\n// Optional chaining\nconsole.log(user?.address?.city);\nconsole.log(user?.phone?.number ?? "No phone");\n\n// Nullish coalescing\nconst score = 0;\nconsole.log(score ?? 100);  // 0 (not nullish)\nconsole.log(null ?? 100);   // 100\n\n// Array.at()\nconsole.log([10, 20, 30].at(-1));`,
    output: [
      "Wonderland",
      "No phone",
      "0",
      "100",
      "30",
    ],
  },
};

const order: MilestoneKey[] = ["1995", "1997", "2009", "2015", "2020"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function IntroductionVisualization() {
  const [selected, setSelected] = useState<MilestoneKey>("1995");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const milestone = milestones[selected];

  const handleSelect = (key: MilestoneKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Introduction to JavaScript</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Interactive Timeline */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            JavaScript Timeline
          </p>
          <div className="relative flex items-center justify-between gap-1">
            {/* Connecting line */}
            <div className="absolute inset-x-0 top-1/2 h-0.5 bg-border -translate-y-1/2 z-0" />

            {order.map((key) => {
              const m = milestones[key];
              const isActive = selected === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => handleSelect(key)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative z-10 flex flex-col items-center gap-1.5 px-2 py-1.5 rounded-xl border transition-all ${
                    isActive
                      ? m.color + " shadow-sm scale-105"
                      : "bg-background border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-xs font-bold font-mono">{m.year}</span>
                  <span className="text-[10px] leading-tight text-center max-w-[80px] hidden sm:block">
                    {m.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Milestone detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-3 ${milestone.color}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold font-mono">{milestone.year}</span>
                <Badge variant="secondary" className={`text-[10px] ${milestone.badgeColor}`}>
                  {milestone.category}
                </Badge>
              </div>
              <span className="text-sm font-semibold">{milestone.label}</span>
            </div>
            <p className="text-sm leading-relaxed">{milestone.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {milestone.highlights.map((h) => (
                <Badge
                  key={h}
                  variant="outline"
                  className="text-[10px] font-normal"
                >
                  {h}
                </Badge>
              ))}
            </div>
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
                {milestone.example}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(milestone.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>

        {/* Quick reference table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Version Quick Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Year</span>
              <span>Version</span>
              <span>Key Addition</span>
            </div>
            {order.map((key) => {
              const m = milestones[key];
              const isSelected = selected === key;
              return (
                <motion.div
                  key={key}
                  onClick={() => handleSelect(key)}
                  animate={{
                    backgroundColor: isSelected
                      ? "hsl(var(--primary) / 0.08)"
                      : "transparent",
                  }}
                  transition={{ duration: 0.15 }}
                  className={`grid grid-cols-3 px-3 py-2.5 border-t cursor-pointer hover:bg-muted/40 transition-colors ${
                    isSelected ? "font-semibold" : ""
                  }`}
                >
                  <span className={`font-mono ${isSelected ? "text-primary" : ""}`}>
                    {m.year}
                    {isSelected && (
                      <span className="ml-1 text-[9px] text-primary">◀</span>
                    )}
                  </span>
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="text-muted-foreground">{m.highlights[0]}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
