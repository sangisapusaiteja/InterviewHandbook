"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// ─── shared helpers ───────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

interface Row { label: string; col1: string; col2: string; col3?: string }
interface RunnerState { rows: Row[]; running: boolean; result: string | null }

function useRunner() {
  const [state, setState] = useState<RunnerState>({ rows: [], running: false, result: null });
  const stopRef = useRef(false);

  const reset = () => { stopRef.current = true; setState({ rows: [], running: false, result: null }); };

  const start = async (gen: (push: (r: Row) => Promise<void>) => Promise<string>) => {
    stopRef.current = false;
    setState({ rows: [], running: true, result: null });
    const push = async (r: Row) => {
      if (stopRef.current) throw new Error("stopped");
      setState((p) => ({ ...p, rows: [...p.rows, r] }));
      await sleep(420);
    };
    try { const result = await gen(push); setState((p) => ({ ...p, running: false, result })); }
    catch { setState((p) => ({ ...p, running: false })); }
  };

  return { state, reset, start, stopRef };
}

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

// ─── colours ─────────────────────────────────────────────────────────────────
const loopColor: Record<string, string> = {
  for:     "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  while:   "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  dowhile: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  forof:   "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
  forin:   "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300",
};
const practiceColor = "bg-primary/15 border-primary/40 text-primary";

// ─── sub-components ───────────────────────────────────────────────────────────
function IterTable({ headers, rows, running }: {
  headers: [string, string, string?];
  rows: Row[];
  running: boolean;
}) {
  const cols = headers[2] ? 4 : 3;
  const grid = cols === 4 ? "grid-cols-4" : "grid-cols-3";
  return (
    <div className="rounded-xl border overflow-hidden min-h-[140px]">
      <div className={`grid ${grid} bg-muted/60 px-3 py-2 text-[10px] font-semibold text-muted-foreground`}>
        <span>step</span><span>{headers[0]}</span><span>{headers[1]}</span>
        {headers[2] && <span>{headers[2]}</span>}
      </div>
      <AnimatePresence>
        {rows.map((r, i) => (
          <motion.div
            key={`${r.label}-${r.col1}`}
            initial={{ opacity: 0, x: -14, height: 0 }}
            animate={{ opacity: 1, x: 0, height: "auto" }}
            transition={{ duration: 0.17 }}
            className={`grid ${grid} border-t px-3 py-2 text-xs font-mono items-center ${i === rows.length - 1 ? "bg-primary/5" : ""}`}
          >
            <span className="text-muted-foreground">{r.label}</span>
            <span className="text-foreground">{r.col1}</span>
            <span className={i === rows.length - 1 ? "text-primary font-bold" : "text-emerald-600 dark:text-emerald-400"}>{r.col2}</span>
            {headers[2] && <span className="text-amber-600 dark:text-amber-400 font-bold">{r.col3}</span>}
          </motion.div>
        ))}
      </AnimatePresence>
      {rows.length === 0 && !running && (
        <p className="text-xs text-muted-foreground text-center py-8">
          Click <strong>Run</strong> to watch step by step
        </p>
      )}
    </div>
  );
}

function NumInput({ label, value, min, max, disabled, onChange }: {
  label: string; value: number; min: number; max: number;
  disabled: boolean; onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">{label} =</span>
      <input
        type="number" min={min} max={max} value={value} disabled={disabled}
        onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
        className="rounded-md border bg-background px-2 py-1 text-sm w-16"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — Loop Types
// ═══════════════════════════════════════════════════════════════════════════════
type LoopTab = "for" | "while" | "dowhile" | "forof" | "forin";

function LoopTypesSection() {
  const [tab, setTab]                   = useState<LoopTab>("for");
  const [forN, setForN]                 = useState(6);
  const [whileStart, setWhileStart]     = useState(5);
  const [doN, setDoN]                   = useState(0);
  const [forOfItems, setForOfItems]     = useState("Apple,Banana,Cherry,Mango");
  const [forInItems, setForInItems]     = useState("name:Alice,age:25,role:Dev,city:NYC");
  const [outputLines, setOutputLines]   = useState<string[] | null>(null);
  const runner                          = useRunner();

  const parseForInObj = (raw: string): Record<string, string> =>
    Object.fromEntries(
      raw.split(",").map((s) => s.trim()).filter((s) => s.includes(":"))
        .map((s) => { const idx = s.indexOf(":"); return [s.slice(0, idx).trim(), s.slice(idx + 1).trim()]; })
    );

  const switchTab = (t: LoopTab) => { runner.reset(); setTab(t); setOutputLines(null); };
  const clearOutput = () => { setOutputLines(null); runner.reset(); };

  // ── pre-computed output per tab ───────────────────────────────────────────
  const computeOutput = (currentTab: LoopTab): string[] => {
    switch (currentTab) {
      case "for":     return [`Completed ${forN} iterations (i = 1 to ${forN})`];
      case "while": {
        const steps = Array.from({ length: whileStart }, (_, i) => whileStart - i).join(" → ");
        return [`${steps} → 0`, `Done in ${whileStart} steps`];
      }
      case "dowhile": {
        let count = 0;
        do { count++; } while (count < doN);
        return [`Body ran ${count} time(s)${doN === 0 ? "  — ran once even though condition was false!" : ""}`];
      }
      case "forof": {
        const items = forOfItems.split(",").map((s) => s.trim()).filter(Boolean);
        return items.map((item, i) => `[${i}] ${item}`);
      }
      case "forin": {
        const obj = parseForInObj(forInItems);
        return Object.entries(obj).map(([k, v]) => `${k}: "${v}"`);
      }
    }
  };

  // ── runners ───────────────────────────────────────────────────────────────
  const runFor = () => runner.start(async (push) => {
    for (let i = 1; i <= forN; i++)
      await push({ label: `i = ${i}`, col1: String(i), col2: `i <= ${forN} ✅` });
    return `Loop completed ${forN} iterations (i = 1 to ${forN})`;
  });

  const runWhile = () => runner.start(async (push) => {
    let n = whileStart, step = 0;
    while (n > 0) {
      const before = n; n--; step++;
      await push({ label: `step ${step}`, col1: `n was ${before}`, col2: `n-- → ${n}`, col3: n > 0 ? "continue" : "stop ✋" });
    }
    return `Countdown from ${whileStart} finished in ${step} steps`;
  });

  const runDoWhile = () => runner.start(async (push) => {
    let count = 0;
    do {
      await push({ label: `exec ${count + 1}`, col1: `count = ${count}`, col2: `count < ${doN} → ${count < doN}`, col3: count < doN ? "loop again" : "stop ✋" });
      count++;
    } while (count < doN);
    return `Body ran ${count} time(s)`;
  });

  const runForOf = () => {
    const items = forOfItems.split(",").map((s) => s.trim()).filter(Boolean);
    return runner.start(async (push) => {
      for (let i = 0; i < items.length; i++)
        await push({ label: `index ${i}`, col1: items[i], col2: "✅ visited" });
      return `Iterated ${items.length} values with for...of`;
    });
  };

  const runForIn = () => {
    const obj = parseForInObj(forInItems);
    const keys = Object.keys(obj);
    return runner.start(async (push) => {
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        await push({ label: `key ${i + 1}`, col1: k, col2: String(obj[k]), col3: typeof obj[k] });
      }
      return `Enumerated ${keys.length} keys with for...in`;
    });
  };

  const handleRun = () => {
    setOutputLines(computeOutput(tab));
    if (tab === "for")     runFor();
    else if (tab === "while")   runWhile();
    else if (tab === "dowhile") runDoWhile();
    else if (tab === "forof")   runForOf();
    else                        runForIn();
  };

  const tabLabels: { key: LoopTab; label: string }[] = [
    { key: "for",     label: "for" },
    { key: "while",   label: "while" },
    { key: "dowhile", label: "do...while" },
    { key: "forof",   label: "for...of" },
    { key: "forin",   label: "for...in" },
  ];

  const syntaxMap: Record<LoopTab, string> = {
    for:     `for (let i = 1; i <= ${forN}; i++) {\n  // body runs ${forN} times\n}`,
    while:   `let n = ${whileStart};\nwhile (n > 0) {\n  n--; // body runs while condition is true\n}`,
    dowhile: `let count = 0;\ndo {\n  count++; // always runs at least once!\n} while (count < ${doN});`,
    forof:   `const items = [${forOfItems.split(",").map((s) => `"${s.trim()}"`).join(", ")}];\nfor (const item of items) {\n  console.log(item); // iterates values\n}`,
    forin: (() => {
      const entries = Object.entries(parseForInObj(forInItems)).map(([k, v]) => `${k}:"${v}"`).join(", ");
      return `const obj = { ${entries} };\nfor (const key in obj) {\n  console.log(key, obj[key]); // iterates keys\n}`;
    })(),
  };

  const headersMap: Record<LoopTab, [string, string, string?]> = {
    for:     ["i",      "condition",  undefined],
    while:   ["before", "after n--",  "status"],
    dowhile: ["count",  "condition",  "action"],
    forof:   ["value",  "status",     undefined],
    forin:   ["key",    "value",      "typeof"],
  };

  const { rows, running } = runner.state;

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Loop Types</p>

      {/* tabs */}
      <div className="flex flex-wrap gap-2">
        {tabLabels.map(({ key, label }) => (
          <button
            key={key}
            disabled={running}
            onClick={() => switchTab(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              tab === key
                ? loopColor[key] + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Code + Output side by side */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <pre className={`text-xs font-mono rounded-xl border px-4 py-3 whitespace-pre overflow-x-auto min-h-[80px] ${loopColor[tab]}`}>
              {syntaxMap[tab]}
            </pre>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* inputs + controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {tab === "for" && (
          <NumInput label="n" value={forN} min={1} max={12} disabled={running}
            onChange={(v) => { clearOutput(); setForN(v); }} />
        )}
        {tab === "while" && (
          <NumInput label="start" value={whileStart} min={0} max={12} disabled={running}
            onChange={(v) => { clearOutput(); setWhileStart(v); }} />
        )}
        {tab === "dowhile" && (
          <NumInput label="n" value={doN} min={0} max={8} disabled={running}
            onChange={(v) => { clearOutput(); setDoN(v); }} />
        )}
        {tab === "forof" && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">items =</span>
            <input type="text" value={forOfItems} disabled={running}
              onChange={(e) => { clearOutput(); setForOfItems(e.target.value); }}
              placeholder="Apple,Banana,Cherry"
              className="rounded-md border bg-background px-2 py-1 text-xs w-44" />
          </div>
        )}
        {tab === "forin" && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-muted-foreground">object =</span>
            <input type="text" value={forInItems} disabled={running}
              onChange={(e) => { clearOutput(); setForInItems(e.target.value); }}
              placeholder="key:value,key:value"
              className="rounded-md border bg-background px-2 py-1 text-xs w-52" />
            <span className="text-[10px] text-muted-foreground italic">key:value,key:value</span>
          </div>
        )}
        <Button onClick={handleRun} size="sm" disabled={running}>
          <Play className="h-3.5 w-3.5 mr-1" /> Run
        </Button>
        <Button onClick={() => { runner.reset(); setOutputLines(null); }} variant="outline" size="sm">
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
        {running && <Badge variant="secondary" className="animate-pulse text-[10px]">running…</Badge>}
      </div>

      <IterTable headers={headersMap[tab]} rows={rows} running={running} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — Practice Problems
// ═══════════════════════════════════════════════════════════════════════════════
type PracticeTab = "sum" | "fibonacci" | "reverse";

function PracticeSection() {
  const [tab, setTab]               = useState<PracticeTab>("sum");
  const [sumN, setSumN]             = useState(10);
  const [fibCount, setFibCount]     = useState(8);
  const [revNum, setRevNum]         = useState(1234);
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const runner                      = useRunner();

  const switchTab = (t: PracticeTab) => { runner.reset(); setTab(t); setOutputLines(null); };
  const clearOutput = () => { setOutputLines(null); runner.reset(); };

  // ── pre-computed output ────────────────────────────────────────────────────
  const computeOutput = (currentTab: PracticeTab): string[] => {
    switch (currentTab) {
      case "sum":       return [`${(sumN * (sumN + 1)) / 2}`];
      case "fibonacci": {
        let a = 0, b = 1; const seq: number[] = [];
        for (let i = 0; i < fibCount; i++) { seq.push(a); const next = a + b; a = b; b = next; }
        return [seq.join(", ")];
      }
      case "reverse": {
        let n = Math.abs(revNum), reversed = 0;
        while (n > 0) { reversed = reversed * 10 + (n % 10); n = Math.floor(n / 10); }
        return [`${revNum < 0 ? -reversed : reversed}`];
      }
    }
  };

  // ── runners ───────────────────────────────────────────────────────────────
  const runSum = () => runner.start(async (push) => {
    let sum = 0;
    for (let i = 1; i <= sumN; i++) { sum += i; await push({ label: `i = ${i}`, col1: `+${i}`, col2: `sum = ${sum}` }); }
    return `Sum(1…${sumN}) = ${sum}`;
  });

  const runFib = () => runner.start(async (push) => {
    let a = 0, b = 1; const seq: number[] = []; let i = 0;
    do {
      seq.push(a);
      await push({ label: `step ${i}`, col1: String(a), col2: `next = ${a + b}`, col3: `[${seq.join(", ")}]` });
      const next = a + b; a = b; b = next; i++;
    } while (i < fibCount);
    return `Fibonacci(${fibCount}): ${seq.join(", ")}`;
  });

  const runReverse = () => runner.start(async (push) => {
    let n = Math.abs(revNum), reversed = 0, step = 0; const original = n;
    while (n > 0) {
      const digit = n % 10; reversed = reversed * 10 + digit; step++;
      await push({ label: `step ${step}`, col1: `digit = ${digit}`, col2: `reversed = ${reversed}`, col3: `n left = ${Math.floor(n / 10)}` });
      n = Math.floor(n / 10);
    }
    return `reverse(${revNum}) = ${revNum < 0 ? -reversed : reversed}${original === reversed ? "  — palindrome! 🎉" : ""}`;
  });

  const handleRun = () => {
    setOutputLines(computeOutput(tab));
    if (tab === "sum")            runSum();
    else if (tab === "fibonacci") runFib();
    else                          runReverse();
  };

  const tabLabels: { key: PracticeTab; label: string; loop: string }[] = [
    { key: "sum",       label: "Sum of natural numbers", loop: "for loop" },
    { key: "fibonacci", label: "Print Fibonacci",         loop: "do...while" },
    { key: "reverse",   label: "Reverse a number",        loop: "while loop" },
  ];

  const syntaxMap: Record<PracticeTab, string> = {
    sum:       `// for loop — Sum 1 to ${sumN}\nlet sum = 0;\nfor (let i = 1; i <= ${sumN}; i++) {\n  sum += i;\n}\nconsole.log(sum); // ${(sumN * (sumN + 1)) / 2}`,
    fibonacci: `// do...while — first ${fibCount} Fibonacci numbers\nlet a = 0, b = 1, i = 0;\ndo {\n  console.log(a);\n  [a, b] = [b, a + b];\n} while (++i < ${fibCount});`,
    reverse:   `// while loop — Reverse ${revNum}\nlet n = ${Math.abs(revNum)}, reversed = 0;\nwhile (n > 0) {\n  reversed = reversed * 10 + (n % 10);\n  n = Math.floor(n / 10);\n}\nconsole.log(reversed);`,
  };

  const headersMap: Record<PracticeTab, [string, string, string?]> = {
    sum:       ["added",   "running sum",     undefined],
    fibonacci: ["fib(i)",  "next term",       "sequence so far"],
    reverse:   ["digit",   "reversed",        "n remaining"],
  };

  const { rows, running } = runner.state;

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Practice Problems</p>

      {/* tabs */}
      <div className="flex flex-wrap gap-2">
        {tabLabels.map(({ key, label, loop }) => (
          <button
            key={key}
            disabled={running}
            onClick={() => switchTab(key)}
            className={`flex flex-col items-start px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left ${
              tab === key
                ? practiceColor + " scale-105 shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <span>{label}</span>
            <span className="text-[9px] font-normal opacity-60 mt-0.5">uses {loop}</span>
          </button>
        ))}
      </div>

      {/* Code + Output */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Code</p>
            <pre className={`text-xs font-mono rounded-xl border px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px] ${practiceColor}`}>
              {syntaxMap[tab]}
            </pre>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* inputs + controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {tab === "sum" && (
          <NumInput label="n" value={sumN} min={1} max={20} disabled={running}
            onChange={(v) => { clearOutput(); setSumN(v); }} />
        )}
        {tab === "fibonacci" && (
          <NumInput label="count" value={fibCount} min={1} max={12} disabled={running}
            onChange={(v) => { clearOutput(); setFibCount(v); }} />
        )}
        {tab === "reverse" && (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">number =</span>
            <input type="number" value={revNum} disabled={running}
              onChange={(e) => { clearOutput(); setRevNum(Number(e.target.value)); }}
              className="rounded-md border bg-background px-2 py-1 text-sm w-24" />
          </div>
        )}
        <Button onClick={handleRun} size="sm" disabled={running}>
          <Play className="h-3.5 w-3.5 mr-1" /> Run
        </Button>
        <Button onClick={() => { runner.reset(); setOutputLines(null); }} variant="outline" size="sm">
          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
        </Button>
        {running && <Badge variant="secondary" className="animate-pulse text-[10px]">running…</Badge>}
      </div>

      <IterTable headers={headersMap[tab]} rows={rows} running={running} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export function LoopsVisualization() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Loops Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <LoopTypesSection />
        <Separator />
        <PracticeSection />
      </CardContent>
    </Card>
  );
}
