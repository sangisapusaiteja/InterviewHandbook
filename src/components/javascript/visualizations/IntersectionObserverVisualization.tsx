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
type ObserverTab = "basicObserver" | "lazyLoading" | "infiniteScroll" | "options";

interface TabInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const tabs: Record<ObserverTab, TabInfo> = {
  basicObserver: {
    label: "Basic Observer",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The Intersection Observer API lets you asynchronously observe changes in the intersection of a target element with an ancestor element or the viewport. Create an observer, define a callback, and start observing elements.",
    codeSnippet: `// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("Element visible:", entry.target.id);
        console.log("Ratio:", entry.intersectionRatio);
      } else {
        console.log("Element hidden:", entry.target.id);
      }
    });
  }
);

// Start observing an element
const target = document.querySelector("#myElement");
observer.observe(target);

// Stop observing
// observer.unobserve(target);
// observer.disconnect();`,
    codeOutput: [
      "Element visible: myElement",
      "Ratio: 1",
      "Element hidden: myElement",
      "Ratio: 0",
    ],
  },
  lazyLoading: {
    label: "Lazy Loading",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Lazy loading defers loading of images until they enter the viewport. The observer watches placeholder images and swaps in the real src when they become visible, improving initial page load performance.",
    codeSnippet: `// Lazy load images with Intersection Observer
const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Swap data-src to src
        img.src = img.dataset.src;
        img.classList.add("loaded");
        console.log("Loaded:", img.alt);

        // Stop watching this image
        observer.unobserve(img);
      }
    });
  },
  { rootMargin: "50px" } // Load 50px before visible
);

// Observe all lazy images
document.querySelectorAll("img[data-src]")
  .forEach((img) => imageObserver.observe(img));`,
    codeOutput: [
      "Loaded: Hero banner",
      "Loaded: Product image 1",
      "Loaded: Product image 2",
      "// Images load only when scrolled into view",
    ],
  },
  infiniteScroll: {
    label: "Infinite Scroll",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Infinite scroll uses a sentinel element at the bottom of content. When the sentinel enters the viewport, more content is fetched and appended. This replaces scroll event listeners with a more performant approach.",
    codeSnippet: `// Infinite scroll with a sentinel element
const sentinel = document.querySelector("#sentinel");
let page = 1;
let loading = false;

const scrollObserver = new IntersectionObserver(
  async (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !loading) {
      loading = true;
      console.log("Loading page", page + 1);

      const newItems = await fetchItems(++page);
      appendItems(newItems);

      console.log("Loaded", newItems.length, "items");
      loading = false;
    }
  },
  { threshold: 0.1 }
);

scrollObserver.observe(sentinel);`,
    codeOutput: [
      "Loading page 2",
      "Loaded 10 items",
      "Loading page 3",
      "Loaded 10 items",
      "// Content loads as user scrolls down",
    ],
  },
  options: {
    label: "Options",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The IntersectionObserver constructor accepts an options object to configure when the callback fires. Use root to set the scrollable ancestor, rootMargin to grow/shrink the detection area, and threshold to control visibility percentage triggers.",
    codeSnippet: `// IntersectionObserver options
const observer = new IntersectionObserver(callback, {

  // root: the element used as the viewport
  // null = browser viewport (default)
  root: document.querySelector("#scrollContainer"),

  // rootMargin: offsets applied to the root
  // Positive = trigger before visible
  // Negative = trigger after partially visible
  rootMargin: "0px 0px -50px 0px",

  // threshold: visibility ratio(s) that trigger callback
  // 0   = any pixel enters (default)
  // 1.0 = fully visible
  // [0, 0.25, 0.5, 0.75, 1] = multiple steps
  threshold: [0, 0.25, 0.5, 0.75, 1.0],
});

console.log("root:", observer.root);
console.log("rootMargin:", observer.rootMargin);
console.log("thresholds:", observer.thresholds);`,
    codeOutput: [
      "root: <div#scrollContainer>",
      "rootMargin: 0px 0px -50px 0px",
      "thresholds: [0, 0.25, 0.5, 0.75, 1]",
      "// Callback fires at each threshold crossing",
    ],
  },
};

const tabKeys: ObserverTab[] = ["basicObserver", "lazyLoading", "infiniteScroll", "options"];

// ─── simulated viewport elements ──────────────────────────────────────────────
interface ViewportElement {
  id: string;
  label: string;
  color: string;
  top: number; // position in the scrollable area (px)
}

const viewportElements: ViewportElement[] = [
  { id: "el-1", label: "Header", color: "bg-blue-500", top: 20 },
  { id: "el-2", label: "Hero Section", color: "bg-emerald-500", top: 120 },
  { id: "el-3", label: "Content Block", color: "bg-violet-500", top: 240 },
  { id: "el-4", label: "Image Gallery", color: "bg-orange-500", top: 360 },
  { id: "el-5", label: "Footer", color: "bg-pink-500", top: 480 },
];

// ─── reference table ──────────────────────────────────────────────────────────
const entryProperties = [
  {
    property: "boundingClientRect",
    type: "DOMRectReadOnly",
    description: "The target element&apos;s bounding rectangle, same as calling getBoundingClientRect().",
  },
  {
    property: "intersectionRatio",
    type: "number",
    description: "The ratio (0.0 to 1.0) of the target element that is currently visible within the root.",
  },
  {
    property: "intersectionRect",
    type: "DOMRectReadOnly",
    description: "The rectangle describing the area where the target and root intersect.",
  },
  {
    property: "isIntersecting",
    type: "boolean",
    description: "True if the target is intersecting the root element or viewport.",
  },
  {
    property: "rootBounds",
    type: "DOMRectReadOnly | null",
    description: "The bounding rectangle of the root element (or viewport if root is null).",
  },
  {
    property: "target",
    type: "Element",
    description: "The DOM element being observed by the IntersectionObserver.",
  },
  {
    property: "time",
    type: "number",
    description: "A timestamp (in ms) indicating when the intersection change was recorded.",
  },
];

// ─── component ────────────────────────────────────────────────────────────────
export function IntersectionObserverVisualization() {
  const [activeTab, setActiveTab] = useState<ObserverTab>("basicObserver");
  const [output, setOutput] = useState<string[] | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [threshold, setThreshold] = useState(0.5);

  const current = tabs[activeTab];

  // Simulated viewport height
  const viewportHeight = 180;

  function isElementVisible(elTop: number, elHeight: number) {
    const elBottom = elTop + elHeight;
    const viewBottom = scrollTop + viewportHeight;
    const overlapStart = Math.max(elTop, scrollTop);
    const overlapEnd = Math.min(elBottom, viewBottom);
    const visiblePortion = Math.max(0, overlapEnd - overlapStart);
    return visiblePortion / elHeight;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">Intersection Observer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Tab chips ── */}
        <div className="flex flex-wrap gap-2">
          {tabKeys.map((key) => {
            const t = tabs[key];
            const isActive = activeTab === key;
            return (
              <Badge
                key={key}
                variant="outline"
                className={`cursor-pointer px-3 py-1 transition-all text-xs ${
                  isActive ? t.color : "hover:bg-muted/40"
                }`}
                onClick={() => {
                  setActiveTab(key);
                  setOutput(null);
                }}
              >
                {t.label}
              </Badge>
            );
          })}
        </div>

        {/* ── Description banner ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${current.color}`}
          >
            {current.description}
          </motion.div>
        </AnimatePresence>

        {/* ── Code snippet ── */}
        <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 overflow-x-auto">
          <pre className="text-xs font-mono text-zinc-300 whitespace-pre">{current.codeSnippet}</pre>
        </div>

        {/* ── Run button + console ── */}
        <div className="space-y-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setOutput(current.codeOutput)}
          >
            <Play className="h-3.5 w-3.5" />
            Run
          </Button>
          <ConsoleOutput lines={output} />
        </div>

        {/* ── Interactive visual ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Interactive Viewport Simulation</h3>

          {/* Threshold slider */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-muted-foreground">Threshold:</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              className="w-40 accent-blue-500"
            />
            <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
              {threshold.toFixed(2)}
            </span>
          </div>

          <div className="relative rounded-xl border bg-muted/10 p-4">
            {/* Viewport label */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Scroll the container below to simulate viewport intersection
              </span>
              <Badge variant="outline" className="text-[10px]">
                scrollTop: {scrollTop}px
              </Badge>
            </div>

            <div className="flex gap-4">
              {/* Scrollable content area */}
              <div className="relative flex-1">
                {/* Viewport indicator overlay */}
                <div
                  className="relative rounded-lg border-2 border-dashed border-blue-400/50 overflow-hidden"
                  style={{ height: `${viewportHeight}px` }}
                >
                  <div
                    className="absolute top-0 left-0 right-0"
                    style={{
                      height: 560,
                      transform: `translateY(-${scrollTop}px)`,
                      transition: "transform 0.15s ease-out",
                    }}
                  >
                    {viewportElements.map((el) => {
                      const elHeight = 60;
                      const ratio = isElementVisible(el.top, elHeight);
                      const isVisible = ratio >= threshold;
                      return (
                        <motion.div
                          key={el.id}
                          className={`absolute left-2 right-2 rounded-lg border-2 px-3 py-2 transition-all duration-300 ${
                            isVisible
                              ? `${el.color} border-white/40 text-white shadow-lg`
                              : "bg-zinc-700/40 border-zinc-600/30 text-zinc-500"
                          }`}
                          style={{ top: el.top, height: elHeight }}
                          animate={{
                            scale: isVisible ? 1 : 0.95,
                            opacity: isVisible ? 1 : 0.4,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-xs font-semibold">{el.label}</p>
                          <div className="flex gap-3 mt-1">
                            <span className="text-[10px] font-mono">
                              isIntersecting: {isVisible ? "true" : "false"}
                            </span>
                            <span className="text-[10px] font-mono">
                              ratio: {ratio.toFixed(2)}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Viewport label */}
                  <div className="absolute top-1 right-1 z-10">
                    <Badge variant="outline" className="text-[9px] bg-blue-500/20 border-blue-500/40 text-blue-300">
                      Viewport
                    </Badge>
                  </div>
                </div>

                {/* Scroll slider */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">Scroll:</span>
                  <input
                    type="range"
                    min={0}
                    max={380}
                    step={5}
                    value={scrollTop}
                    onChange={(e) => setScrollTop(parseInt(e.target.value))}
                    className="flex-1 accent-blue-500"
                  />
                </div>
              </div>

              {/* Status panel */}
              <div className="w-48 space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Element Status</p>
                {viewportElements.map((el) => {
                  const elHeight = 60;
                  const ratio = isElementVisible(el.top, elHeight);
                  const isVisible = ratio >= threshold;
                  return (
                    <div
                      key={el.id}
                      className={`rounded-md border px-2 py-1.5 text-[10px] font-mono transition-all duration-200 ${
                        isVisible
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : "border-zinc-500/20 bg-muted/20 text-muted-foreground"
                      }`}
                    >
                      <span className="font-semibold">{el.label}</span>
                      <span className="ml-1">{isVisible ? "visible" : "hidden"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Reference table ── */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">IntersectionObserverEntry Properties</h3>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-2 font-semibold">Property</th>
                  <th className="text-left px-4 py-2 font-semibold">Type</th>
                  <th className="text-left px-4 py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {entryProperties.map((row) => (
                  <tr key={row.property} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-mono text-blue-700 dark:text-blue-300 whitespace-nowrap">
                      {row.property}
                    </td>
                    <td className="px-4 py-2 font-mono text-orange-700 dark:text-orange-300 whitespace-nowrap">
                      {row.type}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{row.description}</td>
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
