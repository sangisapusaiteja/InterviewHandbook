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
type DelegationTab = "theProblem" | "theSolution" | "dynamicElements" | "matchesClosest";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<DelegationTab, TabInfo> = {
  theProblem: {
    label: "The Problem",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Without event delegation, you attach a separate event listener to every single element. If you have 100 items, that means 100 listeners consuming memory and requiring manual cleanup. Adding new items means manually attaching new listeners.",
    codeSnippet: `// Attaching a listener to EVERY item
const items = document.querySelectorAll(".todo-item");

items.forEach(item => {
  item.addEventListener("click", function() {
    this.classList.toggle("done");
    console.log("Toggled:", this.textContent);
  });
});

// Problem: 100 items = 100 listeners!
// New items added later? No listener attached.`,
    codeOutput: [
      "Toggled: Buy groceries",
      "// 100 items = 100 event listeners",
      "// New items won't have listeners!",
    ],
  },
  theSolution: {
    label: "The Solution",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "With event delegation, you attach ONE listener to the parent element. Events bubble up from children to the parent, where you check e.target to determine which child was clicked. One listener handles all items.",
    codeSnippet: `// ONE listener on the parent
const list = document.querySelector("#todo-list");

list.addEventListener("click", function(e) {
  const item = e.target;
  if (item.classList.contains("todo-item")) {
    item.classList.toggle("done");
    console.log("Toggled:", item.textContent);
  }
});

// 1 listener handles ALL items!
// Works for current AND future items.`,
    codeOutput: [
      "Toggled: Buy groceries",
      "// Only 1 event listener total!",
      "// New items work automatically.",
    ],
  },
  dynamicElements: {
    label: "Dynamic Elements",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "When new elements are added to the DOM dynamically, event delegation handles them automatically. Since the listener is on the parent, any new child element's events will bubble up and be caught -- no extra setup needed.",
    codeSnippet: `const list = document.querySelector("#todo-list");

// Delegate clicks on the parent
list.addEventListener("click", function(e) {
  if (e.target.classList.contains("todo-item")) {
    e.target.classList.toggle("done");
  }
});

// Add a new item dynamically
const newItem = document.createElement("li");
newItem.className = "todo-item";
newItem.textContent = "New task added!";
list.appendChild(newItem);

// Clicking "New task added!" works instantly
// -- no need to attach a new listener!`,
    codeOutput: [
      "Added: New task added!",
      "// Click it -- delegation handles it!",
      "// No extra addEventListener needed.",
    ],
  },
  matchesClosest: {
    label: "matches & closest",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Use e.target.matches(selector) to check if the clicked element matches a CSS selector. Use e.target.closest(selector) to find the nearest ancestor (or self) matching a selector -- essential when child elements are nested inside the target.",
    codeSnippet: `const list = document.querySelector("#todo-list");

list.addEventListener("click", function(e) {
  // matches: exact element check
  if (e.target.matches(".delete-btn")) {
    e.target.parentElement.remove();
    console.log("Deleted item");
    return;
  }

  // closest: find nearest matching ancestor
  const item = e.target.closest(".todo-item");
  if (item) {
    item.classList.toggle("done");
    console.log("Toggled:", item.textContent);
  }
});`,
    codeOutput: [
      'e.target.matches(".delete-btn") // true',
      'e.target.closest(".todo-item") // <li>',
      "// closest() walks up the DOM tree",
      "// matches() checks the element itself",
    ],
  },
};

const order: DelegationTab[] = ["theProblem", "theSolution", "dynamicElements", "matchesClosest"];

// ─── Todo List Interactive Visual ─────────────────────────────────────────────
const initialTodos = [
  { id: 1, text: "Buy groceries" },
  { id: 2, text: "Walk the dog" },
  { id: 3, text: "Read a book" },
  { id: 4, text: "Write code" },
];

function TodoListVisual() {
  const [todos, setTodos] = useState(
    initialTodos.map((t) => ({ ...t, done: false }))
  );
  const [mode, setMode] = useState<"individual" | "delegated">("individual");
  const [lastEvent, setLastEvent] = useState<string | null>(null);
  const [dynamicId, setDynamicId] = useState(5);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
    const item = todos.find((t) => t.id === id);
    if (item) {
      setLastEvent(`Clicked: "${item.text}" -- handled by ${mode === "individual" ? `listener on item #${id}` : "parent listener"}`);
    }
  };

  const addTodo = () => {
    const newTodo = { id: dynamicId, text: `New task #${dynamicId}`, done: false };
    setTodos((prev) => [...prev, newTodo]);
    setDynamicId((prev) => prev + 1);
    setLastEvent(
      mode === "individual"
        ? `Added "New task #${dynamicId}" -- needs a NEW listener!`
        : `Added "New task #${dynamicId}" -- delegation handles it!`
    );
  };

  const reset = () => {
    setTodos(initialTodos.map((t) => ({ ...t, done: false })));
    setDynamicId(5);
    setLastEvent(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["individual", "delegated"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setLastEvent(null); }}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-all ${
              mode === m
                ? m === "individual"
                  ? "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300 scale-105"
                  : "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 scale-105"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            {m === "individual" ? "Individual Listeners" : "Event Delegation"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        {/* Parent container */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono font-semibold text-muted-foreground">
              #todo-list
            </span>
            {mode === "delegated" && (
              <Badge variant="secondary" className="text-[9px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 animate-pulse">
                1 listener
              </Badge>
            )}
          </div>

          <div className="rounded-lg border border-dashed border-zinc-400/40 p-3 space-y-2">
            <AnimatePresence>
              {todos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  onClick={() => toggleTodo(todo.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                    todo.done
                      ? "bg-emerald-500/10 border-emerald-400/30 line-through text-muted-foreground"
                      : "bg-muted/40 border-border"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center transition-all ${
                      todo.done
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-zinc-400"
                    }`}
                  >
                    {todo.done && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-white text-[10px]"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                  <span className="text-xs font-mono flex-1">{todo.text}</span>
                  {mode === "individual" && (
                    <Badge variant="outline" className="text-[8px] bg-red-500/10 text-red-600 dark:text-red-400 border-red-400/30">
                      listener
                    </Badge>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Listener count summary */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground">Total listeners:</span>
            <Badge
              variant="secondary"
              className={`text-[10px] font-bold ${
                mode === "individual"
                  ? "bg-red-500/20 text-red-700 dark:text-red-300"
                  : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {mode === "individual" ? `${todos.length} listeners` : "1 listener"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={addTodo} className="text-[10px] h-7">
              + Add Item
            </Button>
            <Button size="sm" variant="outline" onClick={reset} className="text-[10px] h-7">
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Last event log */}
      <AnimatePresence mode="wait">
        {lastEvent && (
          <motion.div
            key={lastEvent}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-3 py-2 font-mono text-[11px] text-emerald-400"
          >
            <span className="text-zinc-500 select-none mr-2">&gt;</span>
            {lastEvent}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] text-muted-foreground">
        Click items to toggle them. Switch modes to compare individual listeners vs delegation. Add items to see how dynamic elements are handled.
      </p>
    </div>
  );
}

// ─── Bubbling Diagram ─────────────────────────────────────────────────────────
function BubblingDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { label: "Click", sublabel: '<li class="todo-item">', level: "child" },
    { label: "Bubbles up", sublabel: "event propagates", level: "arrow" },
    { label: "Parent catches", sublabel: "e.target = <li>", level: "parent" },
    { label: "Handle", sublabel: "toggle .done class", level: "action" },
  ];

  const animate = async () => {
    setIsAnimating(true);
    setActiveStep(null);

    for (let i = 0; i < steps.length; i++) {
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
          <Play className="h-3.5 w-3.5 mr-1" /> Animate Bubbling
        </Button>
        {isAnimating && activeStep !== null && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            Step {activeStep + 1}: {steps[activeStep].label}
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: activeStep === i ? 1.1 : 1,
                  backgroundColor:
                    activeStep === i
                      ? "rgb(16 185 129)"
                      : activeStep !== null && i < activeStep
                        ? "rgb(16 185 129 / 0.2)"
                        : "rgb(128 128 128 / 0.08)",
                }}
                transition={{ duration: 0.25 }}
                className={`px-4 py-3 rounded-xl border min-w-[120px] text-center ${
                  activeStep === i
                    ? "border-emerald-500 text-white shadow-lg"
                    : activeStep !== null && i < activeStep
                      ? "border-emerald-400/40 text-emerald-700 dark:text-emerald-300"
                      : "border-border text-foreground"
                }`}
              >
                <p className="text-xs font-semibold">{step.label}</p>
                <p
                  className={`text-[10px] font-mono mt-0.5 ${
                    activeStep === i
                      ? "text-emerald-100"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.sublabel}
                </p>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.span
                  animate={{
                    opacity: activeStep !== null && i < activeStep ? 1 : 0.3,
                    color:
                      activeStep !== null && i < activeStep
                        ? "rgb(16 185 129)"
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
        Events bubble from child to parent. The parent listener uses e.target to identify which child was clicked.
      </p>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonRows = [
  {
    aspect: "Number of Listeners",
    individual: "N listeners (one per element)",
    delegated: "1 listener (on parent)",
  },
  {
    aspect: "Memory Usage",
    individual: "Higher (scales with elements)",
    delegated: "Constant (single listener)",
  },
  {
    aspect: "Dynamic Elements",
    individual: "Must attach listener manually",
    delegated: "Handled automatically",
  },
  {
    aspect: "Setup Complexity",
    individual: "Simple per element",
    delegated: "Requires e.target checks",
  },
  {
    aspect: "Performance (many items)",
    individual: "Degrades with count",
    delegated: "Stays efficient",
  },
  {
    aspect: "Cleanup",
    individual: "Must remove each listener",
    delegated: "Remove one listener",
  },
];

function ComparisonTable() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">Without vs With Delegation</p>
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-muted/40">
              <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Aspect</th>
              <th className="text-left px-3 py-2 font-semibold text-red-600 dark:text-red-400">Individual Listeners</th>
              <th className="text-left px-3 py-2 font-semibold text-emerald-600 dark:text-emerald-400">Event Delegation</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <motion.tr
                key={row.aspect}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-t border-border/50"
              >
                <td className="px-3 py-2 font-medium">{row.aspect}</td>
                <td className="px-3 py-2 text-red-600 dark:text-red-400">{row.individual}</td>
                <td className="px-3 py-2 text-emerald-600 dark:text-emerald-400">{row.delegated}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function EventDelegationVisualization() {
  const [selected, setSelected] = useState<DelegationTab>("theProblem");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: DelegationTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Event Delegation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Todo List Interactive Visual ── */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Interactive Todo List</p>
          <TodoListVisual />
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
                  delegation
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                <BubblingDiagram />
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
        <ComparisonTable />
      </CardContent>
    </Card>
  );
}
