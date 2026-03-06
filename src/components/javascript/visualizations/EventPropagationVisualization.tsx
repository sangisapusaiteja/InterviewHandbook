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
type PropagationTab = "bubbling" | "capturing" | "stopPropagation" | "allPhases";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<PropagationTab, TabInfo> = {
  bubbling: {
    label: "Bubbling",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "When an event occurs on an element, it first runs the handler on that element, then on its parent, then all the way up on other ancestors. The event travels UP from the target to the root -- this is called bubbling.",
    codeSnippet: `// Click on the inner <button>
outer.addEventListener("click", () => {
  console.log("Outer clicked");
});

middle.addEventListener("click", () => {
  console.log("Middle clicked");
});

inner.addEventListener("click", () => {
  console.log("Inner clicked");
});

// Click inner -> fires inner, then middle, then outer`,
    codeOutput: [
      "Inner clicked",
      "Middle clicked",
      "Outer clicked",
    ],
  },
  capturing: {
    label: "Capturing",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "The capturing phase is the opposite of bubbling. The event travels DOWN from the window/document through ancestors to the target element. Use { capture: true } as the third argument to addEventListener to listen during this phase.",
    codeSnippet: `// All listeners use { capture: true }
outer.addEventListener("click", () => {
  console.log("Outer captured");
}, { capture: true });

middle.addEventListener("click", () => {
  console.log("Middle captured");
}, { capture: true });

inner.addEventListener("click", () => {
  console.log("Inner captured");
}, { capture: true });

// Click inner -> fires outer, then middle, then inner`,
    codeOutput: [
      "Outer captured",
      "Middle captured",
      "Inner captured",
    ],
  },
  stopPropagation: {
    label: "stopPropagation",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "event.stopPropagation() prevents the event from continuing to propagate through the DOM tree. The current handler still runs, but no further ancestors (bubbling) or descendants (capturing) will receive the event.",
    codeSnippet: `outer.addEventListener("click", () => {
  console.log("Outer clicked");
});

middle.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Middle clicked (stopped!)");
});

inner.addEventListener("click", () => {
  console.log("Inner clicked");
});

// Click inner -> inner fires, middle fires & stops
// Outer never receives the event`,
    codeOutput: [
      "Inner clicked",
      "Middle clicked (stopped!)",
      "// Outer never fires -- propagation stopped",
    ],
  },
  allPhases: {
    label: "All 3 Phases",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Every DOM event goes through 3 phases: (1) Capture phase -- event travels down from window to target, (2) Target phase -- event reaches the target element, (3) Bubble phase -- event travels back up from target to window.",
    codeSnippet: `// Capture listeners (phase 1)
outer.addEventListener("click", () => {
  console.log("1. Outer (capture)");
}, true);
middle.addEventListener("click", () => {
  console.log("2. Middle (capture)");
}, true);

// Target listener (phase 2)
inner.addEventListener("click", () => {
  console.log("3. Inner (target)");
});

// Bubble listeners (phase 3)
middle.addEventListener("click", () => {
  console.log("4. Middle (bubble)");
});
outer.addEventListener("click", () => {
  console.log("5. Outer (bubble)");
});`,
    codeOutput: [
      "1. Outer (capture)",
      "2. Middle (capture)",
      "3. Inner (target)",
      "4. Middle (bubble)",
      "5. Outer (bubble)",
    ],
  },
};

const order: PropagationTab[] = ["bubbling", "capturing", "stopPropagation", "allPhases"];

type BoxId = "outer" | "middle" | "inner";

interface AnimStep {
  activeBox: BoxId;
  arrow: "down" | "up" | "hit" | "stop";
  phaseLabel: string;
}

const animSequences: Record<PropagationTab, AnimStep[]> = {
  bubbling: [
    { activeBox: "inner", arrow: "hit", phaseLabel: "Target: Inner" },
    { activeBox: "middle", arrow: "up", phaseLabel: "Bubble: Middle" },
    { activeBox: "outer", arrow: "up", phaseLabel: "Bubble: Outer" },
  ],
  capturing: [
    { activeBox: "outer", arrow: "down", phaseLabel: "Capture: Outer" },
    { activeBox: "middle", arrow: "down", phaseLabel: "Capture: Middle" },
    { activeBox: "inner", arrow: "hit", phaseLabel: "Capture: Inner" },
  ],
  stopPropagation: [
    { activeBox: "inner", arrow: "hit", phaseLabel: "Target: Inner" },
    { activeBox: "middle", arrow: "stop", phaseLabel: "Stopped at Middle!" },
  ],
  allPhases: [
    { activeBox: "outer", arrow: "down", phaseLabel: "Phase 1: Capture Outer" },
    { activeBox: "middle", arrow: "down", phaseLabel: "Phase 1: Capture Middle" },
    { activeBox: "inner", arrow: "hit", phaseLabel: "Phase 2: Target Inner" },
    { activeBox: "middle", arrow: "up", phaseLabel: "Phase 3: Bubble Middle" },
    { activeBox: "outer", arrow: "up", phaseLabel: "Phase 3: Bubble Outer" },
  ],
};

const boxColors: Record<string, { active: string; idle: string; border: string }> = {
  outer: {
    active: "bg-blue-500/25",
    idle: "bg-blue-500/5",
    border: "border-blue-400/50",
  },
  middle: {
    active: "bg-emerald-500/25",
    idle: "bg-emerald-500/5",
    border: "border-emerald-400/50",
  },
  inner: {
    active: "bg-violet-500/25",
    idle: "bg-violet-500/5",
    border: "border-violet-400/50",
  },
};

const arrowSymbols: Record<string, { symbol: string; color: string }> = {
  down: { symbol: "\u2193", color: "text-emerald-500" },
  up: { symbol: "\u2191", color: "text-blue-500" },
  hit: { symbol: "\u25CE", color: "text-amber-500" },
  stop: { symbol: "\u2716", color: "text-red-500" },
};

function PropagationBoxes({ selected }: { selected: PropagationTab }) {
  const [step, setStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const sequence = animSequences[selected];

  const animate = async () => {
    setIsAnimating(true);
    setStep(null);

    for (let i = 0; i < sequence.length; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 900));
    }

    await new Promise<void>((r) => setTimeout(r, 600));
    setStep(null);
    setIsAnimating(false);
  };

  const currentStep = step !== null ? sequence[step] : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Animate
        </Button>
        {isAnimating && currentStep && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            {currentStep.phaseLabel}
          </Badge>
        )}
      </div>

      {/* Nested boxes visual */}
      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="relative flex items-center justify-center min-h-[220px]">
          {/* Outer box */}
          <motion.div
            animate={{
              scale: currentStep?.activeBox === "outer" ? 1.02 : 1,
              borderWidth: currentStep?.activeBox === "outer" ? 2 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute w-[92%] h-[92%] rounded-2xl border flex items-center justify-center transition-colors duration-300 ${
              currentStep?.activeBox === "outer"
                ? `${boxColors.outer.active} ${boxColors.outer.border} shadow-lg`
                : `${boxColors.outer.idle} border-border`
            }`}
          >
            <span className="absolute top-2 left-3 text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400">
              Outer
            </span>
            {currentStep?.activeBox === "outer" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute top-2 right-3 text-lg ${arrowSymbols[currentStep.arrow].color}`}
              >
                {arrowSymbols[currentStep.arrow].symbol}
              </motion.span>
            )}

            {/* Middle box */}
            <motion.div
              animate={{
                scale: currentStep?.activeBox === "middle" ? 1.03 : 1,
                borderWidth: currentStep?.activeBox === "middle" ? 2 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`absolute w-[68%] h-[68%] rounded-xl border flex items-center justify-center transition-colors duration-300 ${
                currentStep?.activeBox === "middle"
                  ? `${boxColors.middle.active} ${boxColors.middle.border} shadow-lg`
                  : `${boxColors.middle.idle} border-border`
              }`}
            >
              <span className="absolute top-2 left-3 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                Middle
              </span>
              {currentStep?.activeBox === "middle" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute top-2 right-3 text-lg ${arrowSymbols[currentStep.arrow].color}`}
                >
                  {arrowSymbols[currentStep.arrow].symbol}
                </motion.span>
              )}

              {/* Inner box */}
              <motion.div
                animate={{
                  scale: currentStep?.activeBox === "inner" ? 1.05 : 1,
                  borderWidth: currentStep?.activeBox === "inner" ? 2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute w-[55%] h-[55%] rounded-lg border flex items-center justify-center transition-colors duration-300 ${
                  currentStep?.activeBox === "inner"
                    ? `${boxColors.inner.active} ${boxColors.inner.border} shadow-lg`
                    : `${boxColors.inner.idle} border-border`
                }`}
              >
                <span className="text-[10px] font-mono font-semibold text-violet-600 dark:text-violet-400">
                  Inner
                </span>
                {currentStep?.activeBox === "inner" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`absolute top-1 right-2 text-lg ${arrowSymbols[currentStep.arrow].color}`}
                  >
                    {arrowSymbols[currentStep.arrow].symbol}
                  </motion.span>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Arrow path indicators below the boxes */}
        <div className="mt-3 flex items-center justify-center gap-1 min-h-[28px]">
          <AnimatePresence mode="wait">
            {step !== null && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                {sequence.map((s, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <motion.div
                      animate={{
                        scale: i === step ? 1.15 : 1,
                        opacity: i <= step! ? 1 : 0.3,
                      }}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${
                        i === step
                          ? `${boxColors[s.activeBox].active} ${boxColors[s.activeBox].border}`
                          : i < step!
                            ? "bg-muted/40 border-border text-muted-foreground"
                            : "bg-muted/20 border-border text-muted-foreground/50"
                      }`}
                    >
                      {s.activeBox}
                    </motion.div>
                    {i < sequence.length - 1 && (
                      <span className={`text-xs font-bold select-none ${
                        i < step! ? "text-muted-foreground" : "text-muted-foreground/30"
                      }`}>
                        {s.arrow === "down" || s.arrow === "hit" ? "\u2192" : "\u2192"}
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {step === null && !isAnimating && (
            <p className="text-[10px] text-muted-foreground">
              Click <strong>Animate</strong> to see event propagation
            </p>
          )}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        {selected === "bubbling" && "The event fires at the target (inner) and bubbles UP through each ancestor."}
        {selected === "capturing" && "The event travels DOWN from the outermost ancestor to the target element."}
        {selected === "stopPropagation" && "Propagation is halted at middle -- the outer element never receives the event."}
        {selected === "allPhases" && "Full lifecycle: capture phase down, target phase at element, bubble phase back up."}
      </p>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const propagationMethods = [
  {
    method: "e.stopPropagation()",
    stops: "Further propagation (up or down)",
    scope: "Current handler runs; same-element handlers still fire",
  },
  {
    method: "e.stopImmediatePropagation()",
    stops: "All propagation + remaining handlers",
    scope: "Current handler runs; no other handlers fire at all",
  },
  {
    method: "e.preventDefault()",
    stops: "Default browser action only",
    scope: "Event still propagates; only native behavior is cancelled",
  },
  {
    method: "return false (jQuery)",
    stops: "Propagation + default action",
    scope: "jQuery only -- calls both stopPropagation and preventDefault",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function EventPropagationVisualization() {
  const [selected, setSelected] = useState<PropagationTab>("bubbling");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: PropagationTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Event Propagation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Selector chips ── */}
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

        {/* ── Animated detail area ── */}
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
                  propagation
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Nested boxes visual */}
              <div>
                <PropagationBoxes selected={selected} />
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

        {/* ── Comparison table ── */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Propagation Control</p>
          <div className="rounded-xl border bg-muted/20 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Method</th>
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Stops</th>
                  <th className="text-left px-4 py-2 font-semibold text-muted-foreground">Scope</th>
                </tr>
              </thead>
              <tbody>
                {propagationMethods.map((row, i) => (
                  <tr key={i} className={i < propagationMethods.length - 1 ? "border-b" : ""}>
                    <td className="px-4 py-2 font-mono font-semibold text-foreground whitespace-nowrap">
                      {row.method}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{row.stops}</td>
                    <td className="px-4 py-2 text-muted-foreground">{row.scope}</td>
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
