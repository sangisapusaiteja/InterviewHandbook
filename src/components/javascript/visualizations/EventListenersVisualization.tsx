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
type EventTab = "addEventListener" | "eventObject" | "preventDefault" | "removeEventListener";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<EventTab, TabInfo> = {
  addEventListener: {
    label: "addEventListener",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "addEventListener attaches an event handler to an element without overwriting existing handlers. You specify the event type (e.g. 'click', 'input') and a callback function that runs when the event fires.",
    codeSnippet: `const btn = document.querySelector("#myBtn");

btn.addEventListener("click", function () {
  console.log("Button clicked!");
});

const input = document.querySelector("#nameInput");

input.addEventListener("input", function (e) {
  console.log("Typed:", e.target.value);
});

// Multiple listeners on the same element
btn.addEventListener("click", function () {
  console.log("Second listener also fires!");
});`,
    codeOutput: [
      "Button clicked!",
      'Typed: "Hello"',
      "Second listener also fires!",
    ],
  },
  eventObject: {
    label: "Event Object",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "When an event fires, the browser passes an Event object to the handler. It contains useful properties like e.target (the element that triggered it), e.type (the event name), and e.currentTarget (the element the listener is attached to).",
    codeSnippet: `document.querySelector("#myBtn")
  .addEventListener("click", function (e) {

  console.log("type:", e.type);
  console.log("target:", e.target.tagName);
  console.log("currentTarget:", e.currentTarget.id);
  console.log("target === currentTarget:",
    e.target === e.currentTarget);
});

// If a <span> inside #myBtn is clicked:
// target = SPAN (actual clicked element)
// currentTarget = #myBtn (listener host)`,
    codeOutput: [
      "type: click",
      "target: BUTTON",
      "currentTarget: myBtn",
      "target === currentTarget: true",
    ],
  },
  preventDefault: {
    label: "preventDefault",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "e.preventDefault() stops the browser's default behavior for an event. Common uses include preventing a form from submitting (and reloading the page) or stopping a link from navigating. The event still propagates unless you also call stopPropagation.",
    codeSnippet: `// Prevent form submission
const form = document.querySelector("#myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Form submit prevented!");
  console.log("Handle data with JS instead.");
});

// Prevent link navigation
const link = document.querySelector("a#myLink");

link.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Link click prevented!");
  console.log("href was:", e.target.href);
});`,
    codeOutput: [
      "Form submit prevented!",
      "Handle data with JS instead.",
      "Link click prevented!",
      "href was: https://example.com",
    ],
  },
  removeEventListener: {
    label: "removeEventListener",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "removeEventListener detaches a previously added handler. You must pass the exact same function reference -- anonymous functions cannot be removed because each declaration creates a new reference. Always use named functions or store the reference in a variable.",
    codeSnippet: `// Named function - CAN be removed
function handleClick() {
  console.log("Clicked!");
}
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick);
console.log("Named listener removed.");

// Anonymous function - CANNOT be removed
btn.addEventListener("click", function () {
  console.log("I can never be removed!");
});
// This does NOT work:
btn.removeEventListener("click", function () {
  console.log("I can never be removed!");
});
console.log("Anonymous listener NOT removed.");`,
    codeOutput: [
      "Named listener removed.",
      "Anonymous listener NOT removed.",
      "// Different function references!",
    ],
  },
};

const order: EventTab[] = ["addEventListener", "eventObject", "preventDefault", "removeEventListener"];

// ─── Event Flow Visual ────────────────────────────────────────────────────────
const flowSteps = [
  { label: "User action", sublabel: "click / keypress" },
  { label: "Event created", sublabel: "browser builds Event" },
  { label: "Listener matched", sublabel: "finds handler" },
  { label: "Callback runs", sublabel: "handler(event)" },
];

function EventFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async () => {
    setIsAnimating(true);
    setActiveStep(null);

    for (let i = 0; i < flowSteps.length; i++) {
      setActiveStep(i);
      await new Promise<void>((r) => setTimeout(r, 800));
    }

    await new Promise<void>((r) => setTimeout(r, 600));
    setActiveStep(null);
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Animate Flow
        </Button>
        {isAnimating && activeStep !== null && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            Step {activeStep + 1}: {flowSteps[activeStep].label}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: activeStep === i ? 1.1 : 1,
                  backgroundColor:
                    activeStep === i
                      ? "rgb(59 130 246)"
                      : activeStep !== null && i < activeStep
                        ? "rgb(59 130 246 / 0.2)"
                        : "rgb(128 128 128 / 0.08)",
                }}
                transition={{ duration: 0.25 }}
                className={`px-4 py-3 rounded-xl border min-w-[120px] text-center ${
                  activeStep === i
                    ? "border-blue-500 text-white shadow-lg"
                    : activeStep !== null && i < activeStep
                      ? "border-blue-400/40 text-blue-700 dark:text-blue-300"
                      : "border-border text-foreground"
                }`}
              >
                <p className="text-xs font-semibold">{step.label}</p>
                <p
                  className={`text-[10px] font-mono mt-0.5 ${
                    activeStep === i
                      ? "text-blue-100"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.sublabel}
                </p>
              </motion.div>

              {i < flowSteps.length - 1 && (
                <motion.span
                  animate={{
                    opacity: activeStep !== null && i < activeStep ? 1 : 0.3,
                    color:
                      activeStep !== null && i < activeStep
                        ? "rgb(59 130 246)"
                        : "rgb(128 128 128)",
                  }}
                  className="text-lg font-bold select-none"
                >
                  &rarr;
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground">
        A user action triggers an event. The browser creates an Event object, finds matching listeners, and invokes the callback.
      </p>
    </div>
  );
}

// ─── Event Object Properties Visual ──────────────────────────────────────────
function EventObjectVisual() {
  const [clickedElement, setClickedElement] = useState<"button" | "span" | null>(null);

  const props = clickedElement
    ? {
        "e.type": "click",
        "e.target": clickedElement === "span" ? "<span>" : "<button>",
        "e.currentTarget": "<button id='myBtn'>",
        "target === currentTarget": clickedElement === "span" ? "false" : "true",
      }
    : null;

  return (
    <div className="space-y-3">
      <p className="text-[11px] text-muted-foreground">Click an element to inspect the Event object:</p>

      <div className="rounded-xl border bg-muted/20 p-4 flex items-center justify-center gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setClickedElement("button")}
          className="px-4 py-2 rounded-lg border-2 border-emerald-400/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold cursor-pointer"
        >
          &lt;button id=&quot;myBtn&quot;&gt;
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setClickedElement("span")}
          className="px-3 py-1.5 rounded-md border border-amber-400/50 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-semibold cursor-pointer"
        >
          &lt;span&gt; inside button
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {props ? (
          <motion.div
            key={clickedElement}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="rounded-xl border bg-muted/20 p-3 space-y-1.5"
          >
            {Object.entries(props).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 text-xs font-mono">
                <span className="text-muted-foreground min-w-[160px]">{key}:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{val}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[80px] flex items-center justify-center"
          >
            <p className="text-xs text-muted-foreground italic">Click an element above to see event properties</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground">
        e.target is the actual clicked element. e.currentTarget is the element the listener is attached to.
      </p>
    </div>
  );
}

// ─── preventDefault Visual ───────────────────────────────────────────────────
function PreventDefaultVisual() {
  const [scenario, setScenario] = useState<"form" | "link">("form");
  const [prevented, setPrevented] = useState(false);

  const handleToggle = (s: "form" | "link") => {
    setScenario(s);
    setPrevented(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["form", "link"] as const).map((s) => (
          <button
            key={s}
            onClick={() => handleToggle(s)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
              scenario === s
                ? "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 scale-105"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {s === "form" ? "Form Submit" : "Link Click"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scenario}-${prevented}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 rounded-lg border bg-violet-500/10 border-violet-400/30 text-xs font-mono text-violet-700 dark:text-violet-300">
                {scenario === "form" ? '<form onsubmit="...">' : '<a href="https://example.com">'}
              </div>
              <motion.span className="text-lg select-none text-muted-foreground">&rarr;</motion.span>
              <div className="px-3 py-2 rounded-lg border bg-amber-500/10 border-amber-400/30 text-xs font-mono text-amber-700 dark:text-amber-300">
                Event fires
              </div>
            </div>

            {!prevented ? (
              <Button size="sm" onClick={() => setPrevented(true)}>
                <Play className="h-3.5 w-3.5 mr-1" /> Call e.preventDefault()
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2"
              >
                <div className="px-3 py-2 rounded-lg border bg-emerald-500/10 border-emerald-400/30 text-xs font-mono text-emerald-700 dark:text-emerald-300">
                  e.preventDefault() called
                </div>
                <div className="px-3 py-2 rounded-lg border bg-red-500/10 border-red-400/30 text-xs font-mono text-red-700 dark:text-red-300 line-through opacity-60">
                  {scenario === "form" ? "Page reload / form submit" : "Navigate to https://example.com"}
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Default behavior blocked! JS handles it instead.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-[11px] text-muted-foreground">
        preventDefault stops the browser default. The event still fires and propagates normally.
      </p>
    </div>
  );
}

// ─── removeEventListener Visual ──────────────────────────────────────────────
function RemoveListenerVisual() {
  const [scenario, setScenario] = useState<"named" | "anonymous">("named");

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["named", "anonymous"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScenario(s)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
              scenario === s
                ? s === "named"
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105"
                  : "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 scale-105"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {s === "named" ? "Named function" : "Anonymous function"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-muted-foreground">addEventListener(</span>
              <span className="text-blue-600 dark:text-blue-400">&quot;click&quot;</span>
              <span className="text-muted-foreground">,</span>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`px-2 py-1 rounded-md border ${
                  scenario === "named"
                    ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-orange-500/15 border-orange-400/40 text-orange-700 dark:text-orange-300"
                }`}
              >
                {scenario === "named" ? "handleClick" : "function() { ... }"}
              </motion.div>
              <span className="text-muted-foreground">)</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-lg select-none text-muted-foreground">&darr;</span>
              <span className="text-[10px] font-mono text-muted-foreground">removeEventListener</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-muted-foreground">removeEventListener(</span>
              <span className="text-blue-600 dark:text-blue-400">&quot;click&quot;</span>
              <span className="text-muted-foreground">,</span>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`px-2 py-1 rounded-md border ${
                  scenario === "named"
                    ? "bg-emerald-500/15 border-emerald-400/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-500/15 border-red-400/40 text-red-700 dark:text-red-300"
                }`}
              >
                {scenario === "named" ? "handleClick" : "function() { ... }"}
              </motion.div>
              <span className="text-muted-foreground">)</span>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={`px-3 py-2 rounded-lg border text-xs font-semibold ${
                scenario === "named"
                  ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-700 dark:text-emerald-300"
                  : "bg-red-500/10 border-red-400/30 text-red-700 dark:text-red-300"
              }`}
            >
              {scenario === "named"
                ? "Same reference -- listener removed successfully!"
                : "Different references -- listener NOT removed!"}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="text-[11px] text-muted-foreground">
        {scenario === "named"
          ? "Named functions share the same reference, so removeEventListener can find and detach the handler."
          : "Each anonymous function() { ... } creates a new object in memory. The two are not === equal, so removal fails."}
      </p>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const commonEvents = [
  { event: "click", firesWhen: "Element is clicked", target: "Clicked element", bubbles: "Yes" },
  { event: "dblclick", firesWhen: "Element is double-clicked", target: "Clicked element", bubbles: "Yes" },
  { event: "input", firesWhen: "Value changes (live)", target: "Input / textarea", bubbles: "Yes" },
  { event: "change", firesWhen: "Value committed (blur)", target: "Input / select", bubbles: "Yes" },
  { event: "submit", firesWhen: "Form is submitted", target: "<form>", bubbles: "Yes" },
  { event: "keydown", firesWhen: "Key is pressed down", target: "Focused element", bubbles: "Yes" },
  { event: "keyup", firesWhen: "Key is released", target: "Focused element", bubbles: "Yes" },
  { event: "mouseover", firesWhen: "Pointer enters element", target: "Hovered element", bubbles: "Yes" },
  { event: "mouseout", firesWhen: "Pointer leaves element", target: "Left element", bubbles: "Yes" },
  { event: "focus", firesWhen: "Element gains focus", target: "Focused element", bubbles: "No" },
  { event: "blur", firesWhen: "Element loses focus", target: "Blurred element", bubbles: "No" },
  { event: "scroll", firesWhen: "Element is scrolled", target: "Scrolled element", bubbles: "No" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function EventListenersVisualization() {
  const [selected, setSelected] = useState<EventTab>("addEventListener");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: EventTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Event Listeners</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Event flow diagram ── */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Event Flow</p>
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {flowSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.3 }}
                    className="px-3 py-2 rounded-xl border bg-blue-500/10 border-blue-400/30 text-center min-w-[110px]"
                  >
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">{step.label}</p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5">{step.sublabel}</p>
                  </motion.div>
                  {i < flowSteps.length - 1 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ delay: i * 0.12 + 0.1 }}
                      className="text-lg font-bold text-muted-foreground select-none"
                    >
                      &rarr;
                    </motion.span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

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
                  event
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "addEventListener" && <EventFlowDiagram />}
                {selected === "eventObject" && <EventObjectVisual />}
                {selected === "preventDefault" && <PreventDefaultVisual />}
                {selected === "removeEventListener" && <RemoveListenerVisual />}
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

        {/* ── Comparison Table ── */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Common Events</p>
          <div className="rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Event</th>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Fires When</th>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Target</th>
                    <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Bubbles?</th>
                  </tr>
                </thead>
                <tbody>
                  {commonEvents.map((row, i) => (
                    <tr
                      key={row.event}
                      className={`border-b last:border-b-0 ${i % 2 === 0 ? "bg-transparent" : "bg-muted/20"}`}
                    >
                      <td className="px-3 py-2 font-mono font-semibold text-blue-600 dark:text-blue-400">
                        {row.event}
                      </td>
                      <td className="px-3 py-2 text-foreground">{row.firesWhen}</td>
                      <td className="px-3 py-2 text-muted-foreground font-mono">{row.target}</td>
                      <td className="px-3 py-2">
                        <Badge
                          variant="secondary"
                          className={`text-[10px] ${
                            row.bubbles === "Yes"
                              ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                              : "bg-orange-500/20 text-orange-700 dark:text-orange-300"
                          }`}
                        >
                          {row.bubbles}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
