"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

// ─── Types ────────────────────────────────────────────────────────────────────
type MethodTab  = "length" | "toLowerCase" | "split" | "replace" | "includes";
type PracticeTab = "palindrome" | "countVowels" | "reverse";

interface PracticeStep { label: string; value: string; highlight?: boolean }

// ─── Colors ───────────────────────────────────────────────────────────────────
const methodColor: Record<MethodTab, string> = {
  length:      "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  toLowerCase: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  split:       "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  replace:     "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
  includes:    "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
};

const methodLabel: Record<MethodTab, string> = {
  length:      ".length",
  toLowerCase: ".toLowerCase()",
  split:       ".split()",
  replace:     ".replace()",
  includes:    ".includes()",
};

const methodDesc: Record<MethodTab, string> = {
  length:      "A property (no parentheses) — returns the number of UTF-16 characters. O(1).",
  toLowerCase: "Returns a new lowercase string. Original is unchanged. Great for case-insensitive comparisons.",
  split:       "Splits the string by the separator and returns an array of substrings.",
  replace:     "Replaces only the FIRST match. Use a regex with /g flag (or .replaceAll) to replace all.",
  includes:    "Returns true if the substring exists anywhere in the string; false otherwise. O(n).",
};

const practiceColor: Record<PracticeTab, string> = {
  palindrome:  "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  countVowels: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  reverse:     "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};

const practiceLabel: Record<PracticeTab, string> = {
  palindrome:  "Palindrome",
  countVowels: "Count Vowels",
  reverse:     "Reverse String",
};

// ─── Build method code + output ───────────────────────────────────────────────
function buildMethodResult(
  method: MethodTab,
  str: string,
  extra: string,
): { code: string; output: string[] } {
  switch (method) {
    case "length":
      return {
        code: `const str = ${JSON.stringify(str)};\nconsole.log(str.length);`,
        output: [String(str.length)],
      };
    case "toLowerCase":
      return {
        code: `const str = ${JSON.stringify(str)};\nconsole.log(str.toLowerCase());`,
        output: [JSON.stringify(str.toLowerCase())],
      };
    case "split": {
      const parts = str.split(extra);
      return {
        code: `const str = ${JSON.stringify(str)};\nconsole.log(str.split(${JSON.stringify(extra)}));`,
        output: [JSON.stringify(parts)],
      };
    }
    case "replace": {
      const pipeIdx = extra.indexOf("|");
      const search = pipeIdx < 0 ? (extra || "o") : (extra.slice(0, pipeIdx) || "o");
      const rep = pipeIdx < 0 ? "*" : extra.slice(pipeIdx + 1);
      const result = str.replace(search, rep);
      return {
        code: `const str = ${JSON.stringify(str)};\nconsole.log(str.replace(${JSON.stringify(search)}, ${JSON.stringify(rep)}));`,
        output: [JSON.stringify(result)],
      };
    }
    case "includes": {
      const found = str.includes(extra);
      return {
        code: `const str = ${JSON.stringify(str)};\nconsole.log(str.includes(${JSON.stringify(extra)}));`,
        output: [String(found)],
      };
    }
  }
}

// ─── Build practice code + steps ─────────────────────────────────────────────
function buildPracticeResult(
  tab: PracticeTab,
  str: string,
): { code: string; output: string; steps: PracticeStep[] } {
  switch (tab) {
    case "palindrome": {
      const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
      let l = 0, r = cleaned.length - 1;
      let isPalin = true;
      const steps: PracticeStep[] = [
        { label: "Input",   value: JSON.stringify(str) },
        { label: "Cleaned", value: JSON.stringify(cleaned) },
      ];
      while (l < r) {
        if (cleaned[l] !== cleaned[r]) {
          steps.push({ label: `[${l}]'${cleaned[l]}' != [${r}]'${cleaned[r]}'`, value: "❌ Mismatch", highlight: true });
          isPalin = false;
          break;
        }
        steps.push({ label: `[${l}]'${cleaned[l]}' == [${r}]'${cleaned[r]}'`, value: "✅ Match" });
        l++; r--;
      }
      steps.push({ label: "Result", value: isPalin ? "✅ Palindrome" : "❌ Not palindrome", highlight: true });
      return {
        code: `function isPalindrome(s) {\n  const clean = s.toLowerCase()\n    .replace(/[^a-z0-9]/g, "");\n  let l = 0, r = clean.length - 1;\n  while (l < r) {\n    if (clean[l] !== clean[r]) return false;\n    l++; r--;\n  }\n  return true;\n}\nconsole.log(isPalindrome(${JSON.stringify(str)}));`,
        output: String(isPalin),
        steps,
      };
    }
    case "countVowels": {
      const vowels = "aeiouAEIOU";
      const steps: PracticeStep[] = [{ label: "Input", value: JSON.stringify(str) }];
      let count = 0;
      for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (vowels.includes(ch)) {
          count++;
          steps.push({ label: `[${i}] '${ch}'`, value: `vowel ✅ → count=${count}` });
        }
      }
      const suffix = count !== 1 ? "s" : "";
      steps.push({ label: "Result", value: `${count} vowel${suffix}`, highlight: true });
      return {
        code: `function countVowels(s) {\n  let count = 0;\n  for (const ch of s) {\n    if ("aeiouAEIOU".includes(ch)) count++;\n  }\n  return count;\n}\nconsole.log(countVowels(${JSON.stringify(str)}));`,
        output: String(count),
        steps,
      };
    }
    case "reverse": {
      const chars = str.split("");
      let l = 0, r = chars.length - 1;
      const steps: PracticeStep[] = [{ label: "Input", value: JSON.stringify(str) }];
      while (l < r) {
        steps.push({ label: `Swap [${l}]↔[${r}]`, value: `'${chars[l]}' ↔ '${chars[r]}'` });
        [chars[l], chars[r]] = [chars[r], chars[l]];
        l++; r--;
      }
      const reversed = chars.join("");
      steps.push({ label: "Result", value: JSON.stringify(reversed), highlight: true });
      return {
        code: `function reverseString(s) {\n  const chars = s.split("");\n  let l = 0, r = chars.length - 1;\n  while (l < r) {\n    [chars[l], chars[r]] = [chars[r], chars[l]];\n    l++; r--;\n  }\n  return chars.join("");\n}\nconsole.log(reverseString(${JSON.stringify(str)}));`,
        output: JSON.stringify(reversed),
        steps,
      };
    }
  }
}

// ─── Section 1: String Methods ────────────────────────────────────────────────
function MethodsSection() {
  const [tab, setTab]             = useState<MethodTab>("length");
  const [str, setStr]             = useState("Hello, World!");
  const [extra, setExtra]         = useState<Record<MethodTab, string>>({
    length:      "",
    toLowerCase: "",
    split:       " ",
    replace:     "l|*",
    includes:    "World",
  });
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const clearOutput = () => setOutputLines(null);
  const currentExtra = extra[tab];
  const { code } = buildMethodResult(tab, str, currentExtra);

  const handleRun = () => {
    const { output } = buildMethodResult(tab, str, currentExtra);
    setOutputLines(output);
  };

  const extraConfig: Partial<Record<MethodTab, { label: string; placeholder: string }>> = {
    split:    { label: "separator",     placeholder: 'e.g. " " or ","' },
    replace:  { label: "search|replace", placeholder: "e.g. l|*" },
    includes: { label: "search",         placeholder: "substring to find" },
  };

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        String Methods
      </p>

      {/* Method tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(methodLabel) as MethodTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); clearOutput(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? methodColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {methodLabel[key]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: inputs + description */}
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">String</p>
            <input
              value={str}
              onChange={(e) => { setStr(e.target.value); clearOutput(); }}
              className={`w-full rounded-lg border px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 ${methodColor[tab]}`}
              placeholder="Enter a string"
            />
          </div>

          {extraConfig[tab] && (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">{extraConfig[tab]!.label}</p>
              <input
                value={currentExtra}
                onChange={(e) => { setExtra((p) => ({ ...p, [tab]: e.target.value })); clearOutput(); }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder={extraConfig[tab]!.placeholder}
              />
            </div>
          )}

          <Button size="sm" onClick={handleRun} className="w-full">
            <Play className="h-3.5 w-3.5 mr-1" /> Run {methodLabel[tab]}
          </Button>

          <div className={`rounded-lg border px-3 py-2 text-xs ${methodColor[tab]}`}>
            {methodDesc[tab]}
          </div>
        </div>

        {/* Right: Code + Output */}
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={code}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[72px]"
              >
                {code}
              </motion.pre>
            </AnimatePresence>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 2: Practice Problems ────────────────────────────────────────────
function PracticeSection() {
  const [tab, setTab]             = useState<PracticeTab>("palindrome");
  const [str, setStr]             = useState<Record<PracticeTab, string>>({
    palindrome:  "racecar",
    countVowels: "Hello World",
    reverse:     "hello",
  });
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [steps, setSteps]         = useState<PracticeStep[]>([]);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [running, setRunning]     = useState(false);

  const currentStr = str[tab];

  const clearOutput = () => {
    setOutputLines(null);
    setSteps([]);
    setVisibleSteps(0);
    setRunning(false);
  };

  const handleRun = async () => {
    if (running) return;
    const { output, steps: newSteps } = buildPracticeResult(tab, currentStr);
    setOutputLines([output]);
    setSteps(newSteps);
    setVisibleSteps(0);
    setRunning(true);
    for (let i = 1; i <= newSteps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 260));
      setVisibleSteps(i);
    }
    setRunning(false);
  };

  const { code } = buildPracticeResult(tab, currentStr);

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
        Practice Problems
      </p>

      {/* Practice tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(practiceLabel) as PracticeTab[]).map((key) => (
          <button
            key={key}
            onClick={() => { setTab(key); clearOutput(); }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? practiceColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {practiceLabel[key]}
          </button>
        ))}
      </div>

      {/* Input + controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <input
          value={currentStr}
          onChange={(e) => { setStr((p) => ({ ...p, [tab]: e.target.value })); clearOutput(); }}
          className={`rounded-lg border px-3 py-2 text-xs font-mono flex-1 min-w-[160px] focus:outline-none ${practiceColor[tab]}`}
          placeholder="Enter a string"
          disabled={running}
        />
        <Button size="sm" onClick={handleRun} disabled={running || !currentStr}>
          <Play className="h-3.5 w-3.5 mr-1" />{running ? "Running…" : "Run"}
        </Button>
        <Button size="sm" variant="outline" onClick={clearOutput} disabled={running}>
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
      </div>

      {/* Code + Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
          <AnimatePresence mode="wait">
            <motion.pre
              key={code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[160px]"
            >
              {code}
            </motion.pre>
          </AnimatePresence>
        </div>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
          <ConsoleOutput lines={outputLines} />
        </div>
      </div>

      {/* Step-by-step table */}
      {steps.length > 0 && (
        <div className="rounded-xl border overflow-hidden text-xs">
          <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
            <span>Step</span>
            <span>Value</span>
          </div>
          {steps.slice(0, visibleSteps).map((step) => (
            <motion.div
              key={`${step.label}-${step.value}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`grid grid-cols-2 border-t px-3 py-2 ${
                step.highlight ? `font-semibold ${practiceColor[tab]}` : ""
              }`}
            >
              <span className="font-mono">{step.label}</span>
              <span className="font-mono">{step.value}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function StringVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Strings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <MethodsSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
