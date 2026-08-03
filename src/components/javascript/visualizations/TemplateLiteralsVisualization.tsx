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
type TemplateTab = "interpolation" | "multiLine" | "tagged" | "realWorld";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<TemplateTab, GroupInfo> = {
  interpolation: {
    label: "Interpolation",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Embed expressions directly inside backtick strings using ${expression}. Any valid JavaScript expression works -- variables, arithmetic, function calls, and ternaries.",
    codeSnippet: `const name = "Alice";
const age = 28;

console.log(\`Hello, \${name}!\`);
console.log(\`Age next year: \${age + 1}\`);
console.log(\`Uppercase: \${name.toUpperCase()}\`);
console.log(\`Status: \${age >= 18 ? "adult" : "minor"}\`);`,
    codeOutput: [
      "Hello, Alice!",
      "Age next year: 29",
      "Uppercase: ALICE",
      'Status: adult',
    ],
  },
  multiLine: {
    label: "Multi-line",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Template literals preserve line breaks naturally -- no need for \\n or string concatenation. Great for HTML templates, messages, and any multi-line text.",
    codeSnippet: `const user = { name: "Bob", role: "Dev" };

const message = \`
  Welcome, \${user.name}!
  Your role: \${user.role}
  Date: \${new Date().getFullYear()}
\`;

console.log(message.trim());`,
    codeOutput: [
      "Welcome, Bob!",
      "  Your role: Dev",
      "  Date: 2026",
    ],
  },
  tagged: {
    label: "Tagged Templates",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "A tagged template is a function call where the function receives the string parts and interpolated values as separate arguments. Used for escaping, i18n, styling, and DSLs.",
    codeSnippet: `function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const val = values[i] !== undefined
      ? \`**\${values[i]}**\` : "";
    return result + str + val;
  }, "");
}

const item = "laptop";
const price = 999;
console.log(highlight\`Item: \${item}, Price: $\${price}\`);

// strings = ["Item: ", ", Price: $", ""]
// values  = ["laptop", 999]`,
    codeOutput: [
      "Item: **laptop**, Price: $**999**",
    ],
  },
  realWorld: {
    label: "Real-world",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Template literals power CSS-in-JS (styled-components), HTML generation, SQL queries, and URL building in real-world codebases.",
    codeSnippet: `// CSS-in-JS pattern
const color = "tomato";
const css = \`
  .card {
    background: \${color};
    padding: \${8 * 2}px;
  }
\`;
console.log(css.trim());

// HTML generation
const items = ["React", "Vue"];
const html = \`<ul>\${items.map(i =>
  \`<li>\${i}</li>\`).join("")}</ul>\`;
console.log(html);

// SQL-style (parameterized)
const id = 42;
const sql = \`SELECT * FROM users WHERE id = \${id}\`;
console.log(sql);`,
    codeOutput: [
      ".card {",
      "    background: tomato;",
      "    padding: 16px;",
      "  }",
      "<ul><li>React</li><li>Vue</li></ul>",
      "SELECT * FROM users WHERE id = 42",
    ],
  },
};

const order: TemplateTab[] = ["interpolation", "multiLine", "tagged", "realWorld"];

// ─── interpolation comparison steps ───────────────────────────────────────────
const concatParts = [
  { text: '"Hello, "', highlight: false },
  { text: " + ", highlight: true },
  { text: "name", highlight: true },
  { text: " + ", highlight: true },
  { text: '"! Age: "', highlight: false },
  { text: " + ", highlight: true },
  { text: "age", highlight: true },
];

const templateParts = [
  { text: "`Hello, ", highlight: false },
  { text: "${name}", highlight: true },
  { text: "! Age: ", highlight: false },
  { text: "${age}", highlight: true },
  { text: "`", highlight: false },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    syntax: "' '",
    multiLine: "No",
    interpolation: "No",
    useCase: "Simple strings",
  },
  {
    syntax: '" "',
    multiLine: "No",
    interpolation: "No",
    useCase: "Simple strings",
  },
  {
    syntax: "` `",
    multiLine: "Yes",
    interpolation: "Yes (${...})",
    useCase: "Dynamic strings, templates",
  },
  {
    syntax: "tag` `",
    multiLine: "Yes",
    interpolation: "Custom processing",
    useCase: "CSS-in-JS, i18n, escaping",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function TemplateLiteralsVisualization() {
  const [selected, setSelected] = useState<TemplateTab>("interpolation");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: TemplateTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveHighlight(null);
    setAnimating(false);
  };

  const runHighlightAnimation = async () => {
    setAnimating(true);
    // Animate through each ${} expression in the template literal
    const highlightIndices = templateParts
      .map((p, i) => (p.highlight ? i : -1))
      .filter((i) => i !== -1);

    for (const idx of highlightIndices) {
      setActiveHighlight(idx);
      await new Promise((r) => setTimeout(r, 900));
    }
    setActiveHighlight(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Template Literals</CardTitle>
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
                  template
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

            {/* Interactive visual for Interpolation */}
            {selected === "interpolation" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Concatenation vs Template Literal
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Old way: concatenation */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        Old way (concatenation)
                      </p>
                      <div className="rounded-lg border bg-muted/40 px-3 py-2.5 font-mono text-xs flex flex-wrap items-center gap-0.5">
                        {concatParts.map((part, idx) => (
                          <span
                            key={idx}
                            className={
                              part.highlight
                                ? "text-orange-600 dark:text-orange-400 font-bold"
                                : "text-muted-foreground"
                            }
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* New way: template literal */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        New way (template literal)
                      </p>
                      <div className="rounded-lg border bg-muted/40 px-3 py-2.5 font-mono text-xs flex flex-wrap items-center gap-0.5">
                        {templateParts.map((part, idx) => (
                          <motion.span
                            key={idx}
                            animate={{
                              scale: activeHighlight === idx ? 1.15 : 1,
                              backgroundColor:
                                activeHighlight === idx
                                  ? "rgba(59,130,246,0.2)"
                                  : "rgba(0,0,0,0)",
                            }}
                            transition={{ duration: 0.25 }}
                            className={`rounded px-0.5 ${
                              part.highlight
                                ? "text-blue-600 dark:text-blue-400 font-bold"
                                : "text-muted-foreground"
                            } ${activeHighlight === idx ? "ring-2 ring-blue-400 ring-offset-1 ring-offset-background" : ""}`}
                          >
                            {part.text}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runHighlightAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Highlight Expressions"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            String Methods
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Syntax</span>
              <span>Multi-line</span>
              <span>Interpolation</span>
              <span>Use Case</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.syntax}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.syntax}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.multiLine}</span>
                <span className="text-[11px] text-muted-foreground">{row.interpolation}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  {row.useCase}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
