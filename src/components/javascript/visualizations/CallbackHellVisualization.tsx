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
type CallbackTab = "problem" | "namedFunctions" | "promises" | "asyncAwait";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<CallbackTab, GroupInfo> = {
  problem: {
    label: "The Problem",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Callback Hell (Pyramid of Doom) happens when asynchronous operations are nested inside each other, creating deeply indented code that is hard to read, maintain, and debug.",
    codeSnippet: `getUser(1, function(user) {
  getOrders(user.id, function(orders) {
    getOrderDetails(orders[0], function(details) {
      getShipping(details.id, function(shipping) {
        console.log("User:", user.name);
        console.log("Order:", orders[0].id);
        console.log("Item:", details.item);
        console.log("Status:", shipping.status);
        // Even deeper nesting possible...
      });
    });
  });
});`,
    codeOutput: [
      "User: Alice",
      "Order: ORD-1001",
      "Item: Mechanical Keyboard",
      "Status: Shipped",
    ],
  },
  namedFunctions: {
    label: "Named Functions",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Extract each callback into a named function. The nesting disappears and each step is self-documenting. Error handling can be added per function.",
    codeSnippet: `function handleShipping(shipping) {
  console.log("Status:", shipping.status);
}

function handleDetails(details) {
  console.log("Item:", details.item);
  getShipping(details.id, handleShipping);
}

function handleOrders(orders) {
  console.log("Order:", orders[0].id);
  getOrderDetails(orders[0], handleDetails);
}

function handleUser(user) {
  console.log("User:", user.name);
  getOrders(user.id, handleOrders);
}

getUser(1, handleUser);`,
    codeOutput: [
      "User: Alice",
      "Order: ORD-1001",
      "Item: Mechanical Keyboard",
      "Status: Shipped",
    ],
  },
  promises: {
    label: "Promises",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Promises flatten the pyramid into a .then() chain. Each step returns a value to the next, and errors are caught in one place with .catch().",
    codeSnippet: `getUser(1)
  .then(user => {
    console.log("User:", user.name);
    return getOrders(user.id);
  })
  .then(orders => {
    console.log("Order:", orders[0].id);
    return getOrderDetails(orders[0]);
  })
  .then(details => {
    console.log("Item:", details.item);
    return getShipping(details.id);
  })
  .then(shipping => {
    console.log("Status:", shipping.status);
  })
  .catch(err => console.error(err));`,
    codeOutput: [
      "User: Alice",
      "Order: ORD-1001",
      "Item: Mechanical Keyboard",
      "Status: Shipped",
    ],
  },
  asyncAwait: {
    label: "async/await",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "async/await makes asynchronous code look synchronous. Each await pauses until the promise resolves, and try/catch handles errors naturally.",
    codeSnippet: `async function fetchShippingStatus() {
  try {
    const user    = await getUser(1);
    console.log("User:", user.name);

    const orders  = await getOrders(user.id);
    console.log("Order:", orders[0].id);

    const details = await getOrderDetails(orders[0]);
    console.log("Item:", details.item);

    const shipping = await getShipping(details.id);
    console.log("Status:", shipping.status);
  } catch (err) {
    console.error(err);
  }
}

fetchShippingStatus();`,
    codeOutput: [
      "User: Alice",
      "Order: ORD-1001",
      "Item: Mechanical Keyboard",
      "Status: Shipped",
    ],
  },
};

const order: CallbackTab[] = ["problem", "namedFunctions", "promises", "asyncAwait"];

// ─── pyramid levels for visual diagram ────────────────────────────────────────
const pyramidLevels = [
  { label: "getUser()", color: "bg-blue-500/25 border-blue-500/50", depth: 0 },
  { label: "getOrders()", color: "bg-emerald-500/25 border-emerald-500/50", depth: 1 },
  { label: "getOrderDetails()", color: "bg-violet-500/25 border-violet-500/50", depth: 2 },
  { label: "getShipping()", color: "bg-orange-500/25 border-orange-500/50", depth: 3 },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    approach: "Callbacks (nested)",
    readability: "Poor",
    errorHandling: "Per-callback",
    complexity: "High",
  },
  {
    approach: "Named Functions",
    readability: "Good",
    errorHandling: "Per-function",
    complexity: "Medium",
  },
  {
    approach: "Promises (.then)",
    readability: "Good",
    errorHandling: "Single .catch()",
    complexity: "Low",
  },
  {
    approach: "async/await",
    readability: "Excellent",
    errorHandling: "try/catch",
    complexity: "Low",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CallbackHellVisualization() {
  const [selected, setSelected] = useState<CallbackTab>("problem");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const group = groups[selected];

  const handleSelect = (key: CallbackTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const isSolution = selected !== "problem";

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Callback Hell (Pyramid of Doom)</CardTitle>
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
                  {isSolution ? "solution" : "anti-pattern"}
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

            {/* Visual pyramid / flat diagram */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                {isSolution ? "Flat Structure" : "Nesting Visualization"}
              </p>
              <div className="rounded-xl border bg-muted/20 px-4 py-5">
                {!isSolution ? (
                  /* Pyramid diagram -- shows rightward drift */
                  <div className="space-y-2">
                    {pyramidLevels.map((level, idx) => (
                      <motion.div
                        key={level.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ marginLeft: `${level.depth * 32}px` }}
                      >
                        <div
                          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-mono ${level.color}`}
                        >
                          <span className="text-muted-foreground select-none">
                            {"  ".repeat(level.depth)}{"=>"}
                          </span>
                          <span className="font-semibold">{level.label}</span>
                        </div>
                      </motion.div>
                    ))}
                    <div
                      className="mt-3 text-[10px] text-muted-foreground italic text-center"
                    >
                      Each level nests deeper, forming the &quot;pyramid of doom&quot;
                    </div>
                  </div>
                ) : (
                  /* Flat diagram -- all blocks at same indentation */
                  <div className="space-y-2">
                    {pyramidLevels.map((level, idx) => (
                      <motion.div
                        key={level.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div
                          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-mono ${level.color}`}
                        >
                          <span className="text-muted-foreground select-none">
                            {selected === "promises" ? ".then" : selected === "asyncAwait" ? "await" : `fn${idx + 1}`}
                          </span>
                          <span className="font-semibold">{level.label}</span>
                        </div>
                      </motion.div>
                    ))}
                    <div
                      className="mt-3 text-[10px] text-muted-foreground italic text-center"
                    >
                      All steps at the same indentation level -- no nesting
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Solutions to Callback Hell
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Approach</span>
              <span>Readability</span>
              <span>Error Handling</span>
              <span>Complexity</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.approach}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.approach}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.readability}</span>
                <span className="text-[11px] text-muted-foreground">{row.errorHandling}</span>
                <span className="text-[11px] text-muted-foreground">{row.complexity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
