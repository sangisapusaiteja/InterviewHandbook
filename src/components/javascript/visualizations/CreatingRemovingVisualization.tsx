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
type DomTab = "createElement" | "appendVsAppendChild" | "insertRemove" | "documentFragment";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<DomTab, TabInfo> = {
  createElement: {
    label: "createElement",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "document.createElement() creates a new HTML element in memory. You can set its content with textContent or innerHTML, add attributes, then insert it into the DOM with appendChild or append.",
    codeSnippet: `const div = document.createElement("div");
div.textContent = "Hello, World!";
div.className = "greeting";
div.id = "welcome";

document.body.appendChild(div);

console.log(div.tagName);
console.log(div.textContent);
console.log(div.className);
console.log(document.getElementById("welcome") !== null);`,
    codeOutput: [
      "DIV",
      "Hello, World!",
      "greeting",
      "true",
    ],
  },
  appendVsAppendChild: {
    label: "append vs appendChild",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "append() and appendChild() both add nodes to the DOM, but they differ in key ways: append() accepts multiple arguments and plain strings, returns undefined. appendChild() accepts only one Node, and returns the appended node.",
    codeSnippet: `const list = document.createElement("ul");

// appendChild: single Node, returns it
const li1 = document.createElement("li");
li1.textContent = "Item 1";
const returned = list.appendChild(li1);
console.log("appendChild returns node:", returned === li1);

// append: multiple args + strings
const li2 = document.createElement("li");
li2.textContent = "Item 2";
list.append(li2, " (extra text)");
console.log("Children count:", list.childNodes.length);

// append returns undefined
const result = list.append(document.createElement("li"));
console.log("append returns:", result);`,
    codeOutput: [
      "appendChild returns node: true",
      "Children count: 3",
      "append returns: undefined",
    ],
  },
  insertRemove: {
    label: "insert & remove",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Modern DOM offers flexible insertion: prepend() adds to the start, before()/after() insert relative to a sibling, insertAdjacentHTML() parses HTML at specific positions, and remove() detaches an element from the DOM.",
    codeSnippet: `const container = document.createElement("div");
const middle = document.createElement("span");
middle.textContent = "Middle";
container.append(middle);

// prepend: insert at start
container.prepend("Start ");

// after: insert after a node
middle.after(" End");

console.log(container.textContent);

// insertAdjacentHTML
middle.insertAdjacentHTML("beforebegin", "<b>Bold</b>");
console.log(container.childNodes.length);

// remove: detach from DOM
middle.remove();
console.log(container.textContent);`,
    codeOutput: [
      "Start Middle End",
      "5",
      "Start Bold End",
    ],
  },
  documentFragment: {
    label: "DocumentFragment",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "A DocumentFragment is a lightweight container that lives outside the DOM. Build up multiple elements inside it, then insert them all at once with a single reflow -- much better for performance than appending elements one by one.",
    codeSnippet: `const fragment = document.createDocumentFragment();

for (let i = 1; i <= 4; i++) {
  const li = document.createElement("li");
  li.textContent = \`Item \${i}\`;
  fragment.appendChild(li);
}

console.log("Fragment children:", fragment.childNodes.length);
console.log("Fragment is node:", fragment.nodeType === 11);

const ul = document.createElement("ul");
ul.appendChild(fragment);

// Fragment is now empty (nodes moved)
console.log("Fragment after append:", fragment.childNodes.length);
console.log("UL children:", ul.children.length);`,
    codeOutput: [
      "Fragment children: 4",
      "Fragment is node: true",
      "Fragment after append: 0",
      "UL children: 4",
    ],
  },
};

const order: DomTab[] = ["createElement", "appendVsAppendChild", "insertRemove", "documentFragment"];

// ─── Visual: createElement ────────────────────────────────────────────────────
function CreateElementVisual() {
  const [stage, setStage] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async () => {
    setIsAnimating(true);
    setStage(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    for (let i = 0; i <= 3; i++) {
      setStage(i);
      await new Promise<void>((r) => setTimeout(r, 700));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Create Element
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            step {Math.max(1, stage + 1)} / 4
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[200px]">
        {/* Stage 0: createElement */}
        {stage >= 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2"
          >
            <span className="text-xs font-mono text-muted-foreground">createElement(&quot;div&quot;)</span>
            <motion.div
              className="px-4 py-2 rounded-lg border-2 border-dashed border-blue-400/60 bg-blue-500/10 text-xs font-mono text-blue-700 dark:text-blue-300"
            >
              &lt;div&gt;&lt;/div&gt;
            </motion.div>
          </motion.div>
        )}

        {/* Stage 1: set textContent */}
        {stage >= 1 && (
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
            <div className="text-center text-muted-foreground">
              ↓ <span className="text-xs font-mono">.textContent = &quot;Hello, World!&quot;</span>
            </div>
            <motion.div className="px-4 py-2 rounded-lg border border-blue-400/40 bg-blue-500/15 text-xs font-mono text-blue-700 dark:text-blue-300">
              &lt;div&gt;Hello, World!&lt;/div&gt;
            </motion.div>
          </motion.div>
        )}

        {/* Stage 2: add attributes */}
        {stage >= 2 && (
          <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
            <div className="text-center text-muted-foreground">
              ↓ <span className="text-xs font-mono">.className & .id</span>
            </div>
            <motion.div className="px-4 py-2 rounded-lg border border-blue-400/40 bg-blue-500/15 text-xs font-mono text-blue-700 dark:text-blue-300">
              &lt;div class=&quot;greeting&quot; id=&quot;welcome&quot;&gt;Hello, World!&lt;/div&gt;
            </motion.div>
          </motion.div>
        )}

        {/* Stage 3: appendChild into DOM */}
        {stage >= 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
            <div className="text-center text-muted-foreground">
              ↓ <span className="text-xs font-mono">document.body.appendChild(div)</span>
            </div>
            <div className="rounded-lg border-2 border-blue-500 bg-blue-500/10 p-3">
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">document.body</p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-mono font-bold shadow-md"
              >
                &lt;div class=&quot;greeting&quot; id=&quot;welcome&quot;&gt;Hello, World!&lt;/div&gt;
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage < 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Create Element</strong> to see the step-by-step process
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: append vs appendChild ────────────────────────────────────────────
function AppendComparisonVisual() {
  const [animated, setAnimated] = useState(false);

  return (
    <div className="space-y-3">
      <Button size="sm" onClick={() => setAnimated(true)}>
        <Play className="h-3.5 w-3.5 mr-1" /> Compare
      </Button>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-4 min-h-[200px]">
        {animated ? (
          <>
            {/* appendChild side */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground">appendChild()</p>
              <div className="flex flex-wrap gap-2 items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-3 py-2 rounded-lg border bg-emerald-500/15 border-emerald-400/40 text-xs font-mono text-emerald-700 dark:text-emerald-300"
                >
                  Node only
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-2 rounded-lg border bg-emerald-500/15 border-emerald-400/40 text-xs font-mono text-emerald-700 dark:text-emerald-300"
                >
                  1 arg
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-3 py-2 rounded-lg border bg-emerald-500 text-white text-xs font-mono font-bold shadow-md"
                >
                  returns Node
                </motion.div>
              </div>
            </motion.div>

            {/* append side */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
              <p className="text-[10px] font-semibold text-muted-foreground">append()</p>
              <div className="flex flex-wrap gap-2 items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="px-3 py-2 rounded-lg border bg-blue-500/15 border-blue-400/40 text-xs font-mono text-blue-700 dark:text-blue-300"
                >
                  Nodes + Strings
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="px-3 py-2 rounded-lg border bg-blue-500/15 border-blue-400/40 text-xs font-mono text-blue-700 dark:text-blue-300"
                >
                  Multiple args
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="px-3 py-2 rounded-lg border bg-blue-500 text-white text-xs font-mono font-bold shadow-md"
                >
                  returns undefined
                </motion.div>
              </div>
            </motion.div>
          </>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Compare</strong> to see the differences side by side
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: insert & remove ──────────────────────────────────────────────────
function InsertRemoveVisual() {
  const [step, setStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = async () => {
    setIsAnimating(true);
    setStep(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    for (let i = 0; i <= 4; i++) {
      setStep(i);
      await new Promise<void>((r) => setTimeout(r, 800));
    }
    setIsAnimating(false);
  };

  const getNodes = () => {
    const nodes: { text: string; color: string }[] = [];
    if (step >= 1) nodes.push({ text: "Start", color: "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300" });
    if (step >= 3) nodes.push({ text: "<b>Bold</b>", color: "bg-amber-500/15 border-amber-400/40 text-amber-700 dark:text-amber-300" });
    if (step < 4) nodes.push({ text: "Middle", color: "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300" });
    if (step >= 2) nodes.push({ text: "End", color: "bg-violet-500/15 border-violet-400/40 text-violet-700 dark:text-violet-300" });
    return nodes;
  };

  const labels = [
    "Initial: append(middle)",
    "prepend(\"Start\")",
    "middle.after(\"End\")",
    "insertAdjacentHTML(\"beforebegin\", ...)",
    "middle.remove()",
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Animate Steps
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            step {Math.max(1, step + 1)} / 5
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[160px]">
        {step >= 0 ? (
          <>
            <motion.p
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-mono text-muted-foreground"
            >
              {labels[step]}
            </motion.p>
            <div className="rounded-lg border-2 border-violet-400/40 bg-violet-500/5 p-3">
              <p className="text-[10px] font-semibold text-muted-foreground mb-2">container</p>
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence>
                  {getNodes().map((node) => (
                    <motion.div
                      key={node.text}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`px-3 py-2 rounded-lg border text-xs font-mono font-bold ${node.color}`}
                    >
                      {node.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Animate Steps</strong> to see insertion and removal in action
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Visual: DocumentFragment ─────────────────────────────────────────────────
function FragmentVisual() {
  const [stage, setStage] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

  const animate = async () => {
    setIsAnimating(true);
    setStage(-1);
    await new Promise<void>((r) => setTimeout(r, 100));
    for (let i = 0; i <= 2; i++) {
      setStage(i);
      await new Promise<void>((r) => setTimeout(r, 900));
    }
    setIsAnimating(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={animate} disabled={isAnimating}>
          <Play className="h-3.5 w-3.5 mr-1" /> Build Fragment
        </Button>
        {isAnimating && (
          <Badge variant="secondary" className="animate-pulse text-[10px]">
            stage {Math.max(1, stage + 1)} / 3
          </Badge>
        )}
      </div>

      <div className="rounded-xl border bg-muted/20 p-4 space-y-3 min-h-[200px]">
        {/* Stage 0: Fragment being built */}
        {stage >= 0 && stage < 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground">DocumentFragment (off-DOM)</p>
            <div className="rounded-lg border-2 border-dashed border-orange-400/60 bg-orange-500/5 p-3">
              <div className="flex flex-wrap gap-1.5">
                {items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className="px-3 py-2 rounded-lg border bg-orange-500/15 border-orange-400/40 text-xs font-mono font-bold text-orange-700 dark:text-orange-300"
                  >
                    &lt;li&gt;{item}&lt;/li&gt;
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Stage 1: Single reflow arrow */}
        {stage >= 1 && stage < 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-muted-foreground text-lg">
            ↓ <span className="text-xs font-mono">ul.appendChild(fragment) -- single reflow</span>
          </motion.div>
        )}

        {/* Stage 2: Nodes in DOM, fragment empty */}
        {stage >= 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {/* Fragment now empty */}
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground">Fragment (now empty)</p>
              <div className="rounded-lg border-2 border-dashed border-orange-400/30 bg-muted/10 p-3 text-center">
                <span className="text-xs text-muted-foreground italic">0 children -- nodes moved</span>
              </div>
            </div>

            {/* UL in DOM */}
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground">&lt;ul&gt; in DOM</p>
              <div className="rounded-lg border-2 border-orange-500 bg-orange-500/10 p-3">
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item, i) => (
                    <motion.div
                      key={`dom-${item}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="px-3 py-2 rounded-lg bg-orange-500 text-white text-xs font-mono font-bold shadow-md"
                    >
                      &lt;li&gt;{item}&lt;/li&gt;
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {stage < 0 && !isAnimating && (
          <p className="text-xs text-muted-foreground text-center py-8">
            Click <strong>Build Fragment</strong> to see batch DOM insertion
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
const comparisonData = [
  {
    method: "append()",
    position: "End of parent",
    accepts: "Nodes & strings",
    returns: "undefined",
  },
  {
    method: "appendChild()",
    position: "End of parent",
    accepts: "Single Node only",
    returns: "The appended Node",
  },
  {
    method: "prepend()",
    position: "Start of parent",
    accepts: "Nodes & strings",
    returns: "undefined",
  },
  {
    method: "before()",
    position: "Before the element",
    accepts: "Nodes & strings",
    returns: "undefined",
  },
  {
    method: "after()",
    position: "After the element",
    accepts: "Nodes & strings",
    returns: "undefined",
  },
  {
    method: "insertAdjacentHTML()",
    position: "beforebegin / afterbegin / beforeend / afterend",
    accepts: "HTML string",
    returns: "undefined",
  },
  {
    method: "remove()",
    position: "Detaches from parent",
    accepts: "No arguments",
    returns: "undefined",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function CreatingRemovingVisualization() {
  const [selected, setSelected] = useState<DomTab>("createElement");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: DomTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Creating and Removing Elements</CardTitle>
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
                  DOM method
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Two-column: visual | code + output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Visual */}
              <div>
                {selected === "createElement" && <CreateElementVisual />}
                {selected === "appendVsAppendChild" && <AppendComparisonVisual />}
                {selected === "insertRemove" && <InsertRemoveVisual />}
                {selected === "documentFragment" && <FragmentVisual />}
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
          <h3 className="text-sm font-bold">Insertion Methods</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="px-3 py-2 text-left font-semibold">Method</th>
                  <th className="px-3 py-2 text-left font-semibold">Position</th>
                  <th className="px-3 py-2 text-left font-semibold">Accepts</th>
                  <th className="px-3 py-2 text-left font-semibold">Returns</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row) => (
                  <tr key={row.method} className="border-b last:border-b-0 hover:bg-muted/20 transition-colors">
                    <td className="px-3 py-2 font-mono font-bold text-violet-700 dark:text-violet-300">
                      {row.method}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{row.position}</td>
                    <td className="px-3 py-2">{row.accepts}</td>
                    <td className="px-3 py-2 text-muted-foreground">{row.returns}</td>
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
