"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Code2, Zap, GitCompareArrows } from "lucide-react";
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
              <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
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
type TopicKey = "what-is-python" | "why-python" | "python-vs-others";

interface TopicDemo {
  label: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  highlights: string[];
  example: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<TopicKey, TopicDemo> = {
  "what-is-python": {
    label: "What is Python?",
    icon: <Code2 className="h-4 w-4" />,
    category: "Overview",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It emphasizes code readability with its clean syntax and uses indentation to define code blocks.",
    highlights: [
      "Interpreted — no compilation step needed",
      "Dynamically typed — no need to declare variable types",
      "Garbage collected — automatic memory management",
      "Supports multiple paradigms: OOP, functional, procedural",
    ],
    example: `# Python is simple and readable\nname = "Python"\nversion = 3.12\nis_awesome = True\n\nprint(f"Language: {name}")\nprint(f"Version: {version}")\nprint(f"Is awesome? {is_awesome}")\nprint(type(name), type(version), type(is_awesome))`,
    output: [
      "Language: Python",
      "Version: 3.12",
      "Is awesome? True",
      "<class 'str'> <class 'float'> <class 'bool'>",
    ],
  },
  "why-python": {
    label: "Why Python?",
    icon: <Zap className="h-4 w-4" />,
    category: "Benefits",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Python is one of the most popular languages in the world, used across web development, data science, AI/ML, automation, and more. Its gentle learning curve and massive ecosystem make it ideal for beginners and experts alike.",
    highlights: [
      "Beginner-friendly — reads almost like English",
      "Massive ecosystem — 400,000+ packages on PyPI",
      "Top choice for AI/ML, data science, and automation",
      "Huge community — easy to find help and resources",
    ],
    example: `# Python makes complex tasks simple\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Filter even numbers in one line\nevens = [n for n in numbers if n % 2 == 0]\nprint(f"Evens: {evens}")\n\n# Sum and average\ntotal = sum(numbers)\navg = total / len(numbers)\nprint(f"Sum: {total}, Average: {avg}")\n\n# String operations\nwords = ["Python", "is", "powerful"]\nprint(" ".join(words))`,
    output: [
      "Evens: [2, 4, 6, 8, 10]",
      "Sum: 55, Average: 5.5",
      "Python is powerful",
    ],
  },
  "python-vs-others": {
    label: "Python vs Other Languages",
    icon: <GitCompareArrows className="h-4 w-4" />,
    category: "Comparison",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      'Python\'s philosophy is "there should be one obvious way to do it." Compared to Java or C++, Python code is dramatically shorter and more readable, letting you focus on solving problems rather than fighting syntax.',
    highlights: [
      "~3-5x fewer lines of code than Java/C++",
      "No semicolons, braces, or type declarations needed",
      "Built-in high-level data structures (lists, dicts, sets)",
      "Interactive REPL for quick experimentation",
    ],
    example: `# Python — Hello World\nprint("Hello, World!")\n\n# Java equivalent:\n# public class Main {\n#     public static void main(String[] args) {\n#         System.out.println("Hello, World!");\n#     }\n# }\n\n# C++ equivalent:\n# #include <iostream>\n# int main() {\n#     std::cout << "Hello, World!" << std::endl;\n#     return 0;\n# }\n\nprint("Python: 1 line")\nprint("Java:   5 lines")\nprint("C++:    5 lines")`,
    output: [
      "Hello, World!",
      "Python: 1 line",
      "Java:   5 lines",
      "C++:    5 lines",
    ],
  },
};

const order: TopicKey[] = ["what-is-python", "why-python", "python-vs-others"];

// ─── Comparison table data ───────────────────────────────────────────────────
interface ComparisonRow {
  feature: string;
  python: string;
  java: string;
  cpp: string;
}

const comparisonRows: ComparisonRow[] = [
  { feature: "Typing", python: "Dynamic", java: "Static", cpp: "Static" },
  { feature: "Compilation", python: "Interpreted", java: "Compiled (JVM)", cpp: "Compiled (native)" },
  { feature: "Syntax", python: "Clean, minimal", java: "Verbose", cpp: "Complex" },
  { feature: "Memory Mgmt", python: "Automatic (GC)", java: "Automatic (GC)", cpp: "Manual" },
  { feature: "Hello World", python: "1 line", java: "5 lines", cpp: "5 lines" },
  { feature: "Learning Curve", python: "Easy", java: "Moderate", cpp: "Steep" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function IntroductionVisualization() {
  const [selected, setSelected] = useState<TopicKey>("what-is-python");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Introduction to Python</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.icon}
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
            className={`rounded-xl border p-4 space-y-3 ${demo.color}`}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-bold">{demo.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                {demo.category}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>
            <ul className="space-y-1">
              {demo.highlights.map((h) => (
                <li key={h} className="text-xs flex items-start gap-2">
                  <span className="mt-0.5 text-current opacity-60">&#x2022;</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
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

        {/* Python vs Others Comparison Table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Python vs Java vs C++ — Quick Comparison
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Feature</span>
              <span className="text-blue-600 dark:text-blue-400">Python</span>
              <span className="text-orange-600 dark:text-orange-400">Java</span>
              <span className="text-violet-600 dark:text-violet-400">C++</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <span className="font-medium">{row.feature}</span>
                <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400">
                  {row.python}
                </span>
                <span className="font-mono text-[11px] text-orange-600 dark:text-orange-400">
                  {row.java}
                </span>
                <span className="font-mono text-[11px] text-violet-600 dark:text-violet-400">
                  {row.cpp}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Python trades raw execution speed for developer productivity and code clarity.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
