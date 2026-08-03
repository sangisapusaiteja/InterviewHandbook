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
type TraversalTab = "parentChildren" | "siblings" | "closest" | "contains";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<TraversalTab, TabInfo> = {
  parentChildren: {
    label: "Parent & Children",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Navigate vertically in the DOM tree. parentElement moves up to the parent node. children returns an HTMLCollection of direct child elements. firstElementChild and lastElementChild give quick access to the first and last child elements.",
    codeSnippet: `const list = document.querySelector("ul");

// Move UP to parent
console.log(list.parentElement);
// <div class="container">

// Get all direct children
console.log(list.children);
// HTMLCollection [<li>, <li>, <li>]

// First & last child element
console.log(list.firstElementChild);
// <li>Item 1</li>
console.log(list.lastElementChild);
// <li>Item 3</li>`,
    codeOutput: [
      '<div class="container">',
      "HTMLCollection [<li>, <li>, <li>]",
      "<li>Item 1</li>",
      "<li>Item 3</li>",
    ],
  },
  siblings: {
    label: "Siblings",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Navigate horizontally between sibling elements. nextElementSibling moves to the next sibling element, while previousElementSibling moves to the previous one. These skip text nodes and only return element nodes.",
    codeSnippet: `const items = document.querySelectorAll("li");
const second = items[1]; // <li>Item 2</li>

// Move to next sibling element
console.log(second.nextElementSibling);
// <li>Item 3</li>

// Move to previous sibling element
console.log(second.previousElementSibling);
// <li>Item 1</li>

// First item has no previous sibling
console.log(items[0].previousElementSibling);
// null`,
    codeOutput: [
      "<li>Item 3</li>",
      "<li>Item 1</li>",
      "null",
    ],
  },
  closest: {
    label: "closest()",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      'Walks UP the DOM tree from the current element to find the nearest ancestor (or itself) matching a CSS selector. Essential for event delegation -- when a click lands on a nested element, closest() finds the meaningful parent.',
    codeSnippet: `// HTML: <div class="card">
//         <ul class="list">
//           <li><button id="btn">Click</button></li>
//         </ul>
//       </div>

const btn = document.getElementById("btn");

// Walk UP to find nearest .list
console.log(btn.closest(".list"));
// <ul class="list">

// Walk UP to find nearest .card
console.log(btn.closest(".card"));
// <div class="card">

// No match returns null
console.log(btn.closest(".sidebar"));
// null`,
    codeOutput: [
      '<ul class="list">',
      '<div class="card">',
      "null",
    ],
  },
  contains: {
    label: "contains()",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Checks whether a node is a descendant of another node (or is the same node). Returns true or false. Useful for checking if a click happened inside a specific container, e.g. closing a dropdown when clicking outside.",
    codeSnippet: `const container = document.querySelector(".card");
const btn = document.getElementById("btn");
const sidebar = document.querySelector(".sidebar");

// btn is inside container
console.log(container.contains(btn));
// true

// sidebar is NOT inside container
console.log(container.contains(sidebar));
// false

// A node contains itself
console.log(container.contains(container));
// true`,
    codeOutput: [
      "true",
      "false",
      "true",
    ],
  },
};

const order: TraversalTab[] = ["parentChildren", "siblings", "closest", "contains"];

// ─── DOM Tree Node Data ───────────────────────────────────────────────────────
interface TreeNode {
  id: string;
  tag: string;
  label?: string;
  children?: TreeNode[];
}

const domTree: TreeNode = {
  id: "card",
  tag: "div",
  label: ".card",
  children: [
    {
      id: "heading",
      tag: "h2",
      label: "Title",
    },
    {
      id: "list",
      tag: "ul",
      label: ".list",
      children: [
        { id: "li1", tag: "li", label: "Item 1" },
        { id: "li2", tag: "li", label: "Item 2" },
        { id: "li3", tag: "li", label: "Item 3" },
      ],
    },
  ],
};

// ─── Highlight sets per tab ───────────────────────────────────────────────────
type HighlightStyle = "selected" | "result" | "path";

const highlightSets: Record<TraversalTab, Record<string, HighlightStyle>> = {
  parentChildren: {
    list: "selected",
    card: "result",
    li1: "result",
    li2: "result",
    li3: "result",
  },
  siblings: {
    li2: "selected",
    li1: "result",
    li3: "result",
  },
  closest: {
    li1: "selected",
    list: "path",
    card: "result",
  },
  contains: {
    card: "selected",
    list: "path",
    li1: "result",
    li2: "result",
    li3: "result",
    heading: "result",
  },
};

const styleMap: Record<HighlightStyle, string> = {
  selected: "bg-yellow-400/30 border-yellow-500 text-yellow-800 dark:text-yellow-200 ring-2 ring-yellow-400/50",
  result: "bg-emerald-400/20 border-emerald-500 text-emerald-800 dark:text-emerald-200",
  path: "bg-violet-400/20 border-violet-500 text-violet-800 dark:text-violet-200",
};

// ─── DOMTreeVisual ────────────────────────────────────────────────────────────
function DOMTreeVisual({ activeTab }: { activeTab: TraversalTab }) {
  const highlights = highlightSets[activeTab];

  function renderNode(node: TreeNode, depth: number = 0): React.ReactNode {
    const style = highlights[node.id];
    const nodeClass = style
      ? styleMap[style]
      : "bg-zinc-500/10 border-border text-muted-foreground";

    return (
      <div key={node.id} className="flex flex-col items-center">
        <motion.div
          layout
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: depth * 0.06, duration: 0.2 }}
          className={`px-3 py-1.5 rounded-lg border text-[11px] font-mono font-semibold transition-all duration-300 ${nodeClass}`}
        >
          &lt;{node.tag}&gt;
          {node.label && (
            <span className="ml-1 text-[10px] opacity-70">{node.label}</span>
          )}
          {style === "selected" && (
            <Badge variant="secondary" className="ml-1.5 text-[8px] bg-yellow-500/30 text-yellow-800 dark:text-yellow-200">
              start
            </Badge>
          )}
        </motion.div>

        {node.children && node.children.length > 0 && (
          <>
            <div className="w-px h-4 bg-border" />
            <div className="flex gap-3 items-start">
              {node.children.map((child, i) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-px h-3 bg-border" />
                  {renderNode(child, depth + 1)}
                  {i < (node.children?.length ?? 0) - 1 && i === 0 && (
                    <div className="hidden" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-muted-foreground">Visual DOM Tree</p>
      <div className="rounded-xl border bg-muted/20 p-4 flex justify-center overflow-x-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {renderNode(domTree)}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-wrap gap-3 text-[10px]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-yellow-400/40 border border-yellow-500" />
          Starting node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-400/30 border border-emerald-500" />
          Returned / matched
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-violet-400/30 border border-violet-500" />
          Traversal path
        </span>
      </div>
    </div>
  );
}

// ─── Traversal Properties Table ───────────────────────────────────────────────
const traversalProperties = [
  { property: "parentElement", direction: "Up", returns: "Element | null", skipsText: "Yes" },
  { property: "children", direction: "Down", returns: "HTMLCollection", skipsText: "Yes" },
  { property: "firstElementChild", direction: "Down", returns: "Element | null", skipsText: "Yes" },
  { property: "lastElementChild", direction: "Down", returns: "Element | null", skipsText: "Yes" },
  { property: "nextElementSibling", direction: "Right", returns: "Element | null", skipsText: "Yes" },
  { property: "previousElementSibling", direction: "Left", returns: "Element | null", skipsText: "Yes" },
  { property: "closest(selector)", direction: "Up", returns: "Element | null", skipsText: "Yes" },
  { property: "contains(node)", direction: "Down (check)", returns: "boolean", skipsText: "N/A" },
  { property: "parentNode", direction: "Up", returns: "Node | null", skipsText: "No" },
  { property: "childNodes", direction: "Down", returns: "NodeList", skipsText: "No" },
  { property: "nextSibling", direction: "Right", returns: "Node | null", skipsText: "No" },
  { property: "previousSibling", direction: "Left", returns: "Node | null", skipsText: "No" },
];

function TraversalTable() {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-muted-foreground">Traversal Properties</p>
      <div className="rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted/40 border-b">
                <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Property</th>
                <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Direction</th>
                <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Returns</th>
                <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Skips Text Nodes?</th>
              </tr>
            </thead>
            <tbody>
              {traversalProperties.map((row, i) => (
                <motion.tr
                  key={row.property}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className={`border-b last:border-0 ${i < 8 ? "" : "bg-muted/10"}`}
                >
                  <td className="px-3 py-2 font-mono font-semibold text-foreground">{row.property}</td>
                  <td className="px-3 py-2">
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${
                        row.direction === "Up"
                          ? "bg-violet-500/15 text-violet-700 dark:text-violet-300"
                          : row.direction === "Down" || row.direction === "Down (check)"
                            ? "bg-blue-500/15 text-blue-700 dark:text-blue-300"
                            : row.direction === "Right"
                              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                              : "bg-orange-500/15 text-orange-700 dark:text-orange-300"
                      }`}
                    >
                      {row.direction}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{row.returns}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`font-semibold ${
                        row.skipsText === "Yes"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : row.skipsText === "No"
                            ? "text-red-600 dark:text-red-400"
                            : "text-muted-foreground"
                      }`}
                    >
                      {row.skipsText}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Element-based properties (top 8) skip over text and comment nodes. Node-based properties (bottom 4) include all node types.
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function DOMTraversalVisualization() {
  const [selected, setSelected] = useState<TraversalTab>("parentChildren");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TraversalTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">DOM Traversal</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ── Visual DOM tree ── */}
        <DOMTreeVisual activeTab={selected} />

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
                  traversal
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{tab.description}</p>
            </div>

            {/* Code + Output */}
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
          </motion.div>
        </AnimatePresence>

        {/* ── Comparison table ── */}
        <TraversalTable />
      </CardContent>
    </Card>
  );
}
