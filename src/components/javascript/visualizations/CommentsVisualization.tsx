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
type CommentKey = "single-line" | "multi-line" | "jsdoc" | "best-practices";

interface CommentDemo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  note?: string;
  output: string[];
}

// ─── code line helpers ────────────────────────────────────────────────────────
interface CodeLine {
  text: string;
  isComment: boolean;
}

const singleLineCode: CodeLine[] = [
  { text: "// This is a single-line comment", isComment: true },
  { text: 'let name = "Alice";', isComment: false },
  { text: "", isComment: false },
  { text: 'let greeting = "Hello"; // inline comment', isComment: false },
  { text: "", isComment: false },
  { text: "// console.log(greeting); ← disabled by comment", isComment: true },
  { text: "", isComment: false },
  { text: "console.log(name);", isComment: false },
  { text: "console.log(greeting);", isComment: false },
];

const multiLineCode: CodeLine[] = [
  { text: "/*", isComment: true },
  { text: "  This is a multi-line comment.", isComment: true },
  { text: "  It can span several lines.", isComment: true },
  { text: "  Useful for longer explanations.", isComment: true },
  { text: "*/", isComment: true },
  { text: "", isComment: false },
  { text: "let x = 10;", isComment: false },
  { text: "let y = 20;", isComment: false },
  { text: "", isComment: false },
  { text: "/* let z = 30; ← temporarily disabled */", isComment: true },
  { text: "", isComment: false },
  { text: "console.log(x + y);", isComment: false },
];

const jsdocCode: CodeLine[] = [
  { text: "/**", isComment: true },
  { text: " * Calculates the area of a rectangle.", isComment: true },
  { text: " * @param {number} width - The width.", isComment: true },
  { text: " * @param {number} height - The height.", isComment: true },
  { text: " * @returns {number} The area.", isComment: true },
  { text: " */", isComment: true },
  { text: "function area(width, height) {", isComment: false },
  { text: "  return width * height;", isComment: false },
  { text: "}", isComment: false },
  { text: "", isComment: false },
  { text: "console.log(area(5, 3));", isComment: false },
  { text: "console.log(area(10, 4));", isComment: false },
];

// ─── best practices data ─────────────────────────────────────────────────────
interface PracticeExample {
  label: string;
  bad: string;
  good: string;
}

const practices: PracticeExample[] = [
  {
    label: "Explain WHY, not WHAT",
    bad: "// Set x to 5\nlet x = 5;",
    good: "// Default retry count per API spec\nlet x = 5;",
  },
  {
    label: "Avoid obvious comments",
    bad: "// Increment counter by 1\ncounter++;",
    good: "// Retry failed request\ncounter++;",
  },
  {
    label: "Use JSDoc for functions",
    bad: "// This function adds two numbers\nfunction add(a, b) {\n  return a + b;\n}",
    good: "/**\n * @param {number} a\n * @param {number} b\n * @returns {number} Sum of a and b\n */\nfunction add(a, b) {\n  return a + b;\n}",
  },
];

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<CommentKey, CommentDemo> = {
  "single-line": {
    label: "Single-Line",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Single-line comments start with // and extend to the end of the line. They are ignored by the JavaScript engine at runtime.",
    note: "Use single-line comments for brief notes or to temporarily disable a line of code.",
    output: ["Alice", "Hello"],
  },
  "multi-line": {
    label: "Multi-Line",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Multi-line comments start with /* and end with */. Everything between the delimiters is ignored, even across multiple lines.",
    note: "Great for temporarily disabling blocks of code or adding detailed explanations.",
    output: ["30"],
  },
  jsdoc: {
    label: "JSDoc",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "JSDoc comments start with /** and use special tags like @param, @returns, and @example. They are used by editors for IntelliSense and can generate documentation automatically.",
    note: "JSDoc is the standard for documenting functions, classes, and modules in JavaScript.",
    output: ["15", "40"],
  },
  "best-practices": {
    label: "Best Practices",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Good comments explain WHY something is done, not WHAT the code does. Avoid redundant comments that merely restate the code. Use JSDoc for public APIs.",
    note: "The best code is self-documenting — but when intent is unclear, a good comment saves hours.",
    output: ["Well-commented code is easier to maintain!"],
  },
};

const order: CommentKey[] = ["single-line", "multi-line", "jsdoc", "best-practices"];

const codeMap: Record<Exclude<CommentKey, "best-practices">, CodeLine[]> = {
  "single-line": singleLineCode,
  "multi-line": multiLineCode,
  jsdoc: jsdocCode,
};

// ─── color helpers ────────────────────────────────────────────────────────────
const commentColors: Record<CommentKey, string> = {
  "single-line": "text-blue-500 dark:text-blue-400",
  "multi-line": "text-violet-500 dark:text-violet-400",
  jsdoc: "text-emerald-500 dark:text-emerald-400",
  "best-practices": "text-orange-500 dark:text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function CommentsVisualization() {
  const [selected, setSelected] = useState<CommentKey>("single-line");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: CommentKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">JavaScript Comments</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Type selector chips */}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${demo.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  comment
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{demo.description}</p>
              {demo.note && <p className="text-xs opacity-80 italic mt-1">{demo.note}</p>}
            </div>

            {/* Code + Output  OR  Best-Practices comparison */}
            {selected === "best-practices" ? (
              <div className="space-y-4">
                {/* Good vs Bad side-by-side examples */}
                {practices.map((p) => (
                  <div key={p.label} className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground">{p.label}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Bad */}
                      <div className="space-y-1">
                        <Badge variant="secondary" className="bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px]">
                          Bad
                        </Badge>
                        <pre className="text-xs font-mono rounded-xl border bg-rose-500/5 border-rose-500/20 px-4 py-3 whitespace-pre overflow-x-auto">
                          {p.bad}
                        </pre>
                      </div>
                      {/* Good */}
                      <div className="space-y-1">
                        <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px]">
                          Good
                        </Badge>
                        <pre className="text-xs font-mono rounded-xl border bg-emerald-500/5 border-emerald-500/20 px-4 py-3 whitespace-pre overflow-x-auto">
                          {p.good}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Run button + output for best-practices */}
                <div className="space-y-2">
                  <Button size="sm" onClick={() => setOutputLines(demo.output)}>
                    <Play className="h-3.5 w-3.5 mr-1" /> Run
                  </Button>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Code with highlighted comments */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Code</p>
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={selected}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]"
                    >
                      {codeMap[selected].map((line, i) => (
                        <span
                          key={i}
                          className={
                            line.isComment
                              ? `${commentColors[selected]} italic`
                              : "text-foreground"
                          }
                        >
                          {line.text}
                          {"\n"}
                        </span>
                      ))}
                    </motion.pre>
                  </AnimatePresence>
                  <Button size="sm" onClick={() => setOutputLines(demo.output)}>
                    <Play className="h-3.5 w-3.5 mr-1" /> Run
                  </Button>
                </div>

                {/* Right: Output */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Output</p>
                  <ConsoleOutput lines={outputLines} />
                  <p className="text-[11px] text-muted-foreground italic">
                    Comments are stripped at parse time and never appear in the output.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
