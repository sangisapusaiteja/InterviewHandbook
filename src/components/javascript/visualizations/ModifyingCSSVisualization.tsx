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
type CSSTab = "inline" | "computed" | "classToggle" | "cssVars";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<CSSTab, TabInfo> = {
  inline: {
    label: "Inline Styles",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Use element.style.property to set inline styles directly. CSS property names must be written in camelCase — e.g. backgroundColor instead of background-color. Inline styles have high specificity and override most stylesheet rules.",
    codeSnippet: `const box = document.getElementById("box");

// camelCase for multi-word properties
box.style.backgroundColor = "tomato";
box.style.fontSize = "18px";
box.style.borderRadius = "8px";

console.log(box.style.backgroundColor);
console.log(box.style.fontSize);
console.log(box.style.borderRadius);`,
    codeOutput: [
      "tomato",
      "18px",
      "8px",
    ],
  },
  computed: {
    label: "getComputedStyle",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "getComputedStyle() reads the actual computed styles applied to an element — including styles from stylesheets, inherited values, and browser defaults — not just inline styles. It returns a read-only CSSStyleDeclaration.",
    codeSnippet: `const box = document.getElementById("box");

// Inline style only sees what's set inline
console.log("inline color:", box.style.color);

// getComputedStyle reads the ACTUAL rendered value
const computed = getComputedStyle(box);
console.log("computed color:", computed.color);
console.log("computed width:", computed.width);
console.log("computed display:", computed.display);`,
    codeOutput: [
      'inline color: ""',
      "computed color: rgb(51, 51, 51)",
      "computed width: 200px",
      "computed display: block",
    ],
  },
  classToggle: {
    label: "Class Toggling",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "classList.toggle() is the preferred approach for managing visual states. It keeps styling in CSS where it belongs, and JavaScript only controls when classes are applied or removed — leading to cleaner, more maintainable code.",
    codeSnippet: `const btn = document.getElementById("theme-btn");
const body = document.body;

btn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  console.log("has dark-mode?",
    body.classList.contains("dark-mode"));
  console.log("all classes:",
    [...body.classList].join(", "));
});

// After first click:`,
    codeOutput: [
      "has dark-mode? true",
      "all classes: app, dark-mode",
    ],
  },
  cssVars: {
    label: "CSS Variables",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Use setProperty() and getPropertyValue() on element.style to read and write CSS custom properties (--variables) from JavaScript. This enables powerful theme switching by updating a few root-level variables.",
    codeSnippet: `const root = document.documentElement;

// Set theme variables
root.style.setProperty("--primary", "#6366f1");
root.style.setProperty("--bg", "#0f172a");
root.style.setProperty("--text", "#e2e8f0");

// Read them back
const primary = getComputedStyle(root)
  .getPropertyValue("--primary").trim();
const bg = getComputedStyle(root)
  .getPropertyValue("--bg").trim();

console.log("--primary:", primary);
console.log("--bg:", bg);
console.log("Theme applied!");`,
    codeOutput: [
      "--primary: #6366f1",
      "--bg: #0f172a",
      "Theme applied!",
    ],
  },
};

const order: CSSTab[] = ["inline", "computed", "classToggle", "cssVars"];

// ─── Visual: Inline Styles ────────────────────────────────────────────────────
function InlineStylesVisual() {
  const properties = [
    { css: "background-color", camel: "backgroundColor", value: "tomato" },
    { css: "font-size", camel: "fontSize", value: "18px" },
    { css: "border-radius", camel: "borderRadius", value: "8px" },
  ];
  const [step, setStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async () => {
    setIsAnimating(true);
    setStep(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    for (let i = 0; i < properties.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 700));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={animate} disabled={isAnimating}>
        <Play className="h-3.5 w-3.5 mr-1" /> Apply Styles
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[180px]">
        {/* Preview box */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{
              backgroundColor: step >= 0 ? "tomato" : "#a1a1aa",
              fontSize: step >= 1 ? "18px" : "14px",
              borderRadius: step >= 2 ? "8px" : "0px",
            }}
            transition={{ duration: 0.4 }}
            className="w-32 h-20 flex items-center justify-center text-white font-bold shadow-md"
          >
            Box
          </motion.div>
        </div>

        {/* Property steps */}
        <AnimatePresence>
          {properties.slice(0, step + 1).map((prop, i) => (
            <motion.div
              key={prop.camel}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-mono ${
                i === step
                  ? "bg-blue-500/15 border-blue-400/40 text-blue-700 dark:text-blue-300"
                  : "bg-muted/30 border-border text-muted-foreground"
              }`}
            >
              <span className="text-muted-foreground line-through text-[10px]">{prop.css}</span>
              <span className="mx-1">→</span>
              <span className="font-bold">{prop.camel}</span>
              <span className="ml-auto opacity-70">= &quot;{prop.value}&quot;</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {step < 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-4">
            Click <strong>Apply Styles</strong> to see camelCase property naming
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: getComputedStyle ─────────────────────────────────────────────────
function ComputedStyleVisual() {
  const [animated, setAnimated] = useState(false);

  const rows = [
    { property: "color", inline: '""', computed: "rgb(51, 51, 51)", source: "Stylesheet" },
    { property: "width", inline: '""', computed: "200px", source: "Stylesheet" },
    { property: "display", inline: '""', computed: "block", source: "Browser default" },
  ];

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={() => setAnimated(true)}>
        <Play className="h-3.5 w-3.5 mr-1" /> Compare
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 min-h-[180px]">
        {animated ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="grid grid-cols-4 gap-1 text-[10px] font-semibold text-muted-foreground mb-1">
              <span>Property</span>
              <span>element.style</span>
              <span>getComputedStyle</span>
              <span>Source</span>
            </div>
            {rows.map((row, i) => (
              <motion.div
                key={row.property}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="grid grid-cols-4 gap-1 items-center rounded-lg border px-3 py-2 text-xs font-mono"
              >
                <span className="font-bold text-emerald-700 dark:text-emerald-300">{row.property}</span>
                <span className="text-red-500/80">{row.inline}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{row.computed}</span>
                <Badge variant="secondary" className="text-[9px] w-fit">{row.source}</Badge>
              </motion.div>
            ))}
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              Inline reads only what is set via JS — computed reads the actual rendered value
            </p>
          </motion.div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Compare</strong> to see inline vs computed styles
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: Class Toggling ───────────────────────────────────────────────────
function ClassToggleVisual() {
  const [darkMode, setDarkMode] = useState(false);
  const [classList, setClassList] = useState(["app"]);

  const toggle = () => {
    setDarkMode((prev) => {
      const next = !prev;
      setClassList(next ? ["app", "dark-mode"] : ["app"]);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={toggle}>
        <Play className="h-3.5 w-3.5 mr-1" /> Toggle Dark Mode
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[180px]">
        {/* Simulated page preview */}
        <motion.div
          animate={{
            backgroundColor: darkMode ? "#1e293b" : "#f8fafc",
            color: darkMode ? "#e2e8f0" : "#334155",
          }}
          transition={{ duration: 0.4 }}
          className="rounded-lg border px-4 py-6 text-center text-sm font-semibold"
        >
          <p>{darkMode ? "Dark Mode Active" : "Light Mode Active"}</p>
          <p className="text-xs mt-1 opacity-60">body.classList.toggle(&quot;dark-mode&quot;)</p>
        </motion.div>

        {/* classList state */}
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold text-muted-foreground">Current classList:</p>
          <div className="flex gap-1.5">
            {classList.map((cls) => (
              <motion.span
                key={cls}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${
                  cls === "dark-mode"
                    ? "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300"
                    : "bg-muted/30 border-border text-muted-foreground"
                }`}
              >
                .{cls}
              </motion.span>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            contains(&quot;dark-mode&quot;): <span className="font-bold">{String(darkMode)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Visual: CSS Variables ────────────────────────────────────────────────────
function CSSVariablesVisual() {
  const themes = [
    { name: "Indigo", primary: "#6366f1", bg: "#0f172a", text: "#e2e8f0" },
    { name: "Emerald", primary: "#10b981", bg: "#022c22", text: "#d1fae5" },
    { name: "Rose", primary: "#f43f5e", bg: "#1c0b10", text: "#ffe4e6" },
  ];

  const [activeTheme, setActiveTheme] = useState(0);

  const theme = themes[activeTheme];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <p className="text-xs font-semibold text-muted-foreground">Theme Switcher:</p>
        {themes.map((t, i) => (
          <Button
            key={t.name}
            size="sm"
            variant={activeTheme === i ? "default" : "outline"}
            onClick={() => setActiveTheme(i)}
            className="text-xs"
          >
            {t.name}
          </Button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[180px]">
        {/* Theme preview */}
        <motion.div
          animate={{ backgroundColor: theme.bg, color: theme.text }}
          transition={{ duration: 0.4 }}
          className="rounded-lg border px-4 py-5 space-y-2"
        >
          <motion.div
            animate={{ backgroundColor: theme.primary }}
            transition={{ duration: 0.4 }}
            className="w-full h-2 rounded-full"
          />
          <p className="text-sm font-bold">Theme Preview</p>
          <p className="text-xs opacity-70">Styled via CSS custom properties</p>
          <motion.button
            animate={{ backgroundColor: theme.primary }}
            transition={{ duration: 0.4 }}
            className="px-3 py-1 rounded text-xs font-bold text-white"
          >
            Primary Button
          </motion.button>
        </motion.div>

        {/* Variable values */}
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-muted-foreground">Active CSS Variables:</p>
          {[
            { name: "--primary", value: theme.primary },
            { name: "--bg", value: theme.bg },
            { name: "--text", value: theme.text },
          ].map((v) => (
            <div key={v.name} className="flex items-center gap-2 text-xs font-mono">
              <span className="text-orange-600 dark:text-orange-400 font-bold">{v.name}</span>
              <span className="text-muted-foreground">:</span>
              <motion.div
                animate={{ backgroundColor: v.value }}
                className="w-3 h-3 rounded-sm border"
              />
              <span>{v.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  {
    method: "element.style",
    reads: "Inline only",
    writes: "Yes (inline)",
    scope: "Single element",
  },
  {
    method: "getComputedStyle()",
    reads: "All sources (final)",
    writes: "No (read-only)",
    scope: "Single element",
  },
  {
    method: "classList.toggle()",
    reads: "N/A (class-based)",
    writes: "Yes (add/remove classes)",
    scope: "Single element",
  },
  {
    method: "setProperty()",
    reads: "Via getPropertyValue()",
    writes: "Yes (custom props)",
    scope: "Element + descendants",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function ModifyingCSSVisualization() {
  const [selected, setSelected] = useState<CSSTab>("inline");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: CSSTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Modifying CSS Styles</CardTitle>
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
                  css styling
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "inline" && <InlineStylesVisual />}
                {selected === "computed" && <ComputedStyleVisual />}
                {selected === "classToggle" && <ClassToggleVisual />}
                {selected === "cssVars" && <CSSVariablesVisual />}
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
          <h3 className="text-sm font-bold">Style Methods</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Method</th>
                  <th className="px-3 py-2 text-left font-semibold">Reads</th>
                  <th className="px-3 py-2 text-left font-semibold">Writes</th>
                  <th className="px-3 py-2 text-left font-semibold">Scope</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-bold text-violet-700 dark:text-violet-300">
                      {row.method}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{row.reads}</td>
                    <td className="px-3 py-2">{row.writes}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.scope}</td>
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
