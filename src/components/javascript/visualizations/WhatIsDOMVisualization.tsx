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

// ─── types ────────────────────────────────────────────────────────────────────
type DOMKey = "dom-tree" | "node-types" | "dom-vs-html" | "document-object";

interface DOMDemo {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  note?: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<DOMKey, DOMDemo> = {
  "dom-tree": {
    label: "DOM Tree",
    category: "Structure",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The DOM (Document Object Model) represents an HTML document as a tree of nodes. Every element, attribute, and piece of text becomes a node in this tree. The browser builds this tree when it parses your HTML.",
    note: "The root of the tree is the document node. document.documentElement points to <html>, and document.body points to <body>.",
    codeSnippet: `// Access the root element
console.log(document.documentElement.tagName);

// Access the body
console.log(document.body.tagName);

// Check children of body
console.log(document.body.children.length);

// Navigate the tree
const firstChild = document.body.firstElementChild;
console.log("First child:", firstChild.tagName);`,
    codeOutput: ["HTML", "BODY", "1", "First child: DIV"],
  },
  "node-types": {
    label: "Node Types",
    category: "Classification",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Every node in the DOM has a nodeType property -- a numeric constant that tells you what kind of node it is. The most common types are Element (1), Text (3), Comment (8), and Document (9).",
    note: "Text nodes include whitespace between tags. Use element.children (not childNodes) to skip text nodes.",
    codeSnippet: `// Element node
const div = document.createElement("div");
console.log("Element nodeType:", div.nodeType);

// Text node
const text = document.createTextNode("Hello");
console.log("Text nodeType:", text.nodeType);

// Comment node
const comment = document.createComment("note");
console.log("Comment nodeType:", comment.nodeType);

// Document node
console.log("Document nodeType:", document.nodeType);`,
    codeOutput: [
      "Element nodeType: 1",
      "Text nodeType: 3",
      "Comment nodeType: 8",
      "Document nodeType: 9",
    ],
  },
  "dom-vs-html": {
    label: "DOM vs HTML",
    category: "Comparison",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The DOM is a live, in-memory representation of the page -- it is NOT the same as the HTML source code. JavaScript can modify the DOM at any time, making the live page differ from the original HTML file.",
    note: "The browser also auto-corrects malformed HTML when building the DOM (e.g., adding missing <tbody> in tables).",
    codeSnippet: `// Original HTML has an empty <ul>
// <ul id="list"></ul>

// JavaScript modifies the DOM
const ul = document.getElementById("list");
const li = document.createElement("li");
li.textContent = "Added by JS";
ul.appendChild(li);

console.log("Children:", ul.children.length);
console.log("Content:", ul.innerHTML);

// DOM is live -- source HTML is unchanged
console.log("DOM is live: true");`,
    codeOutput: [
      "Children: 1",
      'Content: <li>Added by JS</li>',
      "DOM is live: true",
    ],
  },
  "document-object": {
    label: "document Object",
    category: "Entry Point",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The global document object is the main entry point to the DOM. It provides properties like title, URL, and methods like querySelector() to find and manipulate elements on the page.",
    note: "document is available in any browser script. It represents the entire HTML document loaded in the current tab.",
    codeSnippet: `// Page metadata
console.log("Title:", document.title);
console.log("URL:", document.URL);

// Query elements
const heading = document.querySelector("h1");
console.log("Heading:", heading.textContent);

// Get all paragraphs
const paras = document.querySelectorAll("p");
console.log("Paragraphs found:", paras.length);

// Check ready state
console.log("State:", document.readyState);`,
    codeOutput: [
      "Title: My Page",
      "URL: https://example.com",
      "Heading: Welcome",
      "Paragraphs found: 3",
      "State: complete",
    ],
  },
};

const order: DOMKey[] = ["dom-tree", "node-types", "dom-vs-html", "document-object"];

// ─── Node Types reference table data ──────────────────────────────────────────
interface NodeTypeRow {
  type: string;
  nodeType: number;
  nodeName: string;
  example: string;
}

const nodeTypeRows: NodeTypeRow[] = [
  { type: "Element",  nodeType: 1, nodeName: "Tag name (DIV, P...)", example: '<div class="box">' },
  { type: "Text",     nodeType: 3, nodeName: "#text",                example: "Hello World" },
  { type: "Comment",  nodeType: 8, nodeName: "#comment",             example: "<!-- note -->" },
  { type: "Document", nodeType: 9, nodeName: "#document",            example: "document" },
];

// ─── Visual DOM Tree ──────────────────────────────────────────────────────────
function DOMTreeDiagram() {
  const nodeStyle =
    "px-3 py-1.5 rounded-lg text-xs font-mono font-bold border shadow-sm";

  return (
    <div className="flex flex-col items-center gap-0 py-4">
      {/* html */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className={`${nodeStyle} bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300`}
      >
        &lt;html&gt;
      </motion.div>

      {/* connector line down */}
      <div className="w-px h-5 bg-border" />

      {/* head + body row */}
      <div className="flex items-start gap-10 relative">
        {/* horizontal line connecting head and body */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] h-px bg-border" />

        {/* head branch */}
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-5 bg-border" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className={`${nodeStyle} bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300`}
          >
            &lt;head&gt;
          </motion.div>
          <div className="w-px h-4 bg-border" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className={`${nodeStyle} bg-zinc-500/15 border-zinc-500/40 text-zinc-600 dark:text-zinc-400`}
          >
            &lt;title&gt;
          </motion.div>
        </div>

        {/* body branch */}
        <div className="flex flex-col items-center gap-0">
          <div className="w-px h-5 bg-border" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className={`${nodeStyle} bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300`}
          >
            &lt;body&gt;
          </motion.div>
          <div className="w-px h-4 bg-border" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className={`${nodeStyle} bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300`}
          >
            &lt;div&gt;
          </motion.div>
          <div className="w-px h-4 bg-border" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className={`${nodeStyle} bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300`}
          >
            &lt;p&gt;
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function WhatIsDOMVisualization() {
  const [selected, setSelected] = useState<DOMKey>("dom-tree");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];

  const handleSelect = (key: DOMKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">What is the DOM?</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Concept selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.label}
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
            <div className={`rounded-xl border px-4 py-3 text-sm ${demo.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.category}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{demo.description}</p>
              {demo.note && <p className="text-xs opacity-80 italic mt-1">{demo.note}</p>}
            </div>

            {/* Visual DOM tree diagram (only for "DOM Tree" tab) */}
            {selected === "dom-tree" && (
              <div className="rounded-xl border bg-muted/20 px-4 py-2">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  Visual DOM Tree
                </p>
                <DOMTreeDiagram />
              </div>
            )}

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Code</p>
                <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                  {demo.codeSnippet}
                </pre>
                <Button size="sm" onClick={() => setOutputLines(demo.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Node Types comparison table */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Node Types Quick Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Type</span>
              <span>nodeType</span>
              <span>nodeName</span>
              <span>Example</span>
            </div>
            {nodeTypeRows.map((row) => (
              <motion.div
                key={row.type}
                className="grid grid-cols-4 px-3 py-2.5 border-t items-center gap-1 hover:bg-muted/40 transition-colors"
              >
                <span className="font-bold">{row.type}</span>
                <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {row.nodeType}
                </code>
                <code className="font-mono text-muted-foreground">{row.nodeName}</code>
                <code className="font-mono text-violet-600 dark:text-violet-400">{row.example}</code>
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Tip: Use <code className="font-mono">node.nodeType === 1</code> to check if a node is an element, or use{" "}
            <code className="font-mono">node instanceof HTMLElement</code> for a more readable check.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
