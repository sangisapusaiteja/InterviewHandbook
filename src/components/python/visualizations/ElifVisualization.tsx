"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";
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
          {lines.map((line, idx) => (
            <p key={`${idx}-${line}`} className="text-emerald-400">
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
type ElifExample = "grade" | "temperature" | "day" | "bmi";

interface ConditionStep {
  condition: string;
  result: string;
  matches: boolean;
}

interface ExampleInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  inputLabel: string;
  inputValue: string;
  conditions: ConditionStep[];
  codeSnippet: string;
  codeOutput: string[];
  visualValue?: number;
  visualMax?: number;
  visualLabel?: string;
}

// ─── data ─────────────────────────────────────────────────────────────────────
const examples: Record<ElifExample, ExampleInfo> = {
  grade: {
    label: "Grade Calculator",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Map a numeric score to a letter grade. Conditions are evaluated top-to-bottom — the first True condition wins, and all remaining branches are skipped.",
    inputLabel: "score",
    inputValue: "78",
    conditions: [
      { condition: "score >= 90", result: 'grade = "A"', matches: false },
      { condition: "score >= 80", result: 'grade = "B"', matches: false },
      { condition: "score >= 70", result: 'grade = "C"', matches: true },
      { condition: "score >= 60", result: 'grade = "D"', matches: false },
      { condition: "else", result: 'grade = "F"', matches: false },
    ],
    codeSnippet: `score = 78

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Score: {score} -> Grade: {grade}")`,
    codeOutput: ["Score: 78 -> Grade: C"],
    visualValue: 78,
    visualMax: 100,
    visualLabel: "Score: 78 / 100",
  },
  temperature: {
    label: "Temperature Ranges",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Classify a temperature into categories. Each elif narrows the range — because earlier conditions already filtered out higher values, the logic stays clean.",
    inputLabel: "temp",
    inputValue: "15",
    conditions: [
      { condition: "temp <= 0", result: 'category = "Freezing"', matches: false },
      { condition: "temp <= 10", result: 'category = "Cold"', matches: false },
      { condition: "temp <= 20", result: 'category = "Cool"', matches: true },
      { condition: "temp <= 30", result: 'category = "Warm"', matches: false },
      { condition: "else", result: 'category = "Hot"', matches: false },
    ],
    codeSnippet: `temp = 15  # Celsius

if temp <= 0:
    category = "Freezing"
elif temp <= 10:
    category = "Cold"
elif temp <= 20:
    category = "Cool"
elif temp <= 30:
    category = "Warm"
else:
    category = "Hot"

print(f"{temp}°C -> {category}")`,
    codeOutput: ["15°C -> Cool"],
    visualValue: 15,
    visualMax: 50,
    visualLabel: "15°C",
  },
  day: {
    label: "Day of Week",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      'Classify a day as weekday or weekend, with a special message for specific days. The elif chain lets you handle multiple distinct cases — like a switch/case in other languages.',
    inputLabel: "day",
    inputValue: '"Wednesday"',
    conditions: [
      { condition: 'day == "Monday"', result: '"Start of work week"', matches: false },
      { condition: 'day == "Friday"', result: '"TGIF!"', matches: false },
      { condition: 'day == "Saturday" or day == "Sunday"', result: '"Weekend!"', matches: false },
      { condition: "else", result: '"Regular weekday"', matches: true },
    ],
    codeSnippet: `day = "Wednesday"

if day == "Monday":
    msg = "Start of work week"
elif day == "Friday":
    msg = "TGIF!"
elif day == "Saturday" or day == "Sunday":
    msg = "Weekend!"
else:
    msg = "Regular weekday"

print(f"{day}: {msg}")`,
    codeOutput: ["Wednesday: Regular weekday"],
  },
  bmi: {
    label: "BMI Calculator",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Categorize Body Mass Index into health ranges. This is a classic elif use case — mutually exclusive numeric ranges checked in order.",
    inputLabel: "bmi",
    inputValue: "24.5",
    conditions: [
      { condition: "bmi < 18.5", result: 'category = "Underweight"', matches: false },
      { condition: "bmi < 25", result: 'category = "Normal weight"', matches: true },
      { condition: "bmi < 30", result: 'category = "Overweight"', matches: false },
      { condition: "else", result: 'category = "Obese"', matches: false },
    ],
    codeSnippet: `weight = 75  # kg
height = 1.75  # meters
bmi = weight / height ** 2

if bmi < 18.5:
    category = "Underweight"
elif bmi < 25:
    category = "Normal weight"
elif bmi < 30:
    category = "Overweight"
else:
    category = "Obese"

print(f"BMI: {bmi:.1f} -> {category}")`,
    codeOutput: ["BMI: 24.5 -> Normal weight"],
    visualValue: 24.5,
    visualMax: 40,
    visualLabel: "BMI: 24.5",
  },
};

const order: ElifExample[] = ["grade", "temperature", "day", "bmi"];

const chipColors: Record<ElifExample, string> = {
  grade: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  temperature: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  day: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  bmi: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ElifVisualization() {
  const [selected, setSelected] = useState<ElifExample>("grade");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const example = examples[selected];

  const handleSelect = (key: ElifExample) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python elif Statements</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Example selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const chipColor = chipColors[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? chipColor + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {examples[key].label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${example.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{example.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${example.badgeColor}`}>
                  elif chain
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{example.description}</p>
            </div>

            {/* Two-column: condition flow | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Condition evaluation flow */}
              <div className="space-y-3">
                {/* Input value */}
                <div className="rounded-xl border bg-muted/40 px-4 py-2.5 text-xs">
                  <span className="text-muted-foreground">Input: </span>
                  <code className="font-mono font-bold">
                    {example.inputLabel} = {example.inputValue}
                  </code>
                </div>

                {/* Visual score bar (if applicable) */}
                {example.visualValue !== undefined && example.visualMax !== undefined && (
                  <div className="rounded-xl border bg-muted/20 px-4 py-3">
                    <p className="text-[10px] text-muted-foreground mb-1.5 font-semibold">
                      {example.visualLabel}
                    </p>
                    <div className="h-3 rounded-full bg-muted/60 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(example.visualValue / example.visualMax) * 100}%`,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                {/* Condition steps — top-to-bottom evaluation */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Evaluation Order (first True wins)
                  </p>
                  {example.conditions.map((step, idx) => {
                    const isFirst = idx === 0;
                    const keyword =
                      step.condition === "else"
                        ? "else"
                        : isFirst
                        ? "if"
                        : "elif";

                    return (
                      <motion.div
                        key={`${selected}-cond-${idx}`}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-mono transition-colors ${
                          step.matches
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30"
                            : "bg-muted/30 border-border text-muted-foreground"
                        }`}
                      >
                        <ChevronRight
                          className={`h-3 w-3 shrink-0 ${
                            step.matches
                              ? "text-emerald-500"
                              : "text-muted-foreground/40"
                          }`}
                        />
                        <span
                          className={`font-bold ${
                            step.matches
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {keyword}
                        </span>
                        {step.condition !== "else" && (
                          <span className="opacity-80">{step.condition}:</span>
                        )}
                        <span className="ml-auto text-[10px]">
                          {step.matches ? (
                            <Badge
                              variant="secondary"
                              className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px]"
                            >
                              TRUE
                            </Badge>
                          ) : step.condition === "else" ? (
                            <span className="text-muted-foreground/50">skipped</span>
                          ) : (
                            <span className="text-red-400/70">False</span>
                          )}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Matched result */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs">
                  <span className="text-muted-foreground">Executes: </span>
                  <code className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    {example.conditions.find((c) => c.matches)?.result}
                  </code>
                </div>
              </div>

              {/* Right: Code + Output */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {example.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(example.codeOutput)}>
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
      </CardContent>
    </Card>
  );
}
