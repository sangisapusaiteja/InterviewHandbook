"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type GrowTab = "grow" | "shrink" | "basis" | "shorthand";

const growScenarios = [
  {
    label: "All flex-grow: 0 (default)",
    items: [
      { grow: 0, content: "A", width: "auto" },
      { grow: 0, content: "B", width: "auto" },
      { grow: 0, content: "C", width: "auto" },
    ],
    desc: "Items keep their natural size. Extra space is unused.",
  },
  {
    label: "All flex-grow: 1",
    items: [
      { grow: 1, content: "A", width: "1" },
      { grow: 1, content: "B", width: "1" },
      { grow: 1, content: "C", width: "1" },
    ],
    desc: "All items share extra space equally. Each gets 1/3 of extra space.",
  },
  {
    label: "Item B: flex-grow: 2",
    items: [
      { grow: 1, content: "A", width: "1" },
      { grow: 2, content: "B", width: "2" },
      { grow: 1, content: "C", width: "1" },
    ],
    desc: "Item B gets 2/4 of extra space. A and C each get 1/4.",
  },
  {
    label: "Only Item A: flex-grow: 1",
    items: [
      { grow: 1, content: "A", width: "1" },
      { grow: 0, content: "B", width: "auto" },
      { grow: 0, content: "C", width: "auto" },
    ],
    desc: "Only A grows to fill all extra space. B and C stay at natural size.",
  },
];

const shorthandExamples = [
  {
    shorthand: "flex: 0 1 auto",
    label: "Default",
    grow: "0",
    shrink: "1",
    basis: "auto",
    desc: "Don't grow, can shrink, basis is content width. The initial value.",
  },
  {
    shorthand: "flex: 1",
    label: "flex: 1",
    grow: "1",
    shrink: "1",
    basis: "0",
    desc: "Grow to fill space, can shrink, basis is 0. Items share space equally.",
  },
  {
    shorthand: "flex: auto",
    label: "flex: auto",
    grow: "1",
    shrink: "1",
    basis: "auto",
    desc: "Grow and shrink, basis is content. Like flex: 1 but respects content size.",
  },
  {
    shorthand: "flex: none",
    label: "flex: none",
    grow: "0",
    shrink: "0",
    basis: "auto",
    desc: "Cannot grow or shrink. Rigid item at its content size.",
  },
  {
    shorthand: "flex: 0 0 200px",
    label: "Fixed width",
    grow: "0",
    shrink: "0",
    basis: "200px",
    desc: "Fixed at 200px. Won't grow or shrink. Like a fixed-width column.",
  },
  {
    shorthand: "flex: 1 1 0",
    label: "Equal columns",
    grow: "1",
    shrink: "1",
    basis: "0",
    desc: "Same as flex: 1. Best for equal-width columns regardless of content.",
  },
];

export function FlexGrowShrinkVisualization() {
  const [activeTab, setActiveTab] = useState<GrowTab>("grow");
  const [growScenario, setGrowScenario] = useState(0);

  return (
    <div className="space-y-6">
      {/* Tab navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Flex Item Sizing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([
              { value: "grow", label: "flex-grow" },
              { value: "shrink", label: "flex-shrink" },
              { value: "basis", label: "flex-basis" },
              { value: "shorthand", label: "flex shorthand" },
            ] as { value: GrowTab; label: string }[]).map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* flex-grow */}
      {activeTab === "grow" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">flex-grow: Distributing Extra Space</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                flex-grow determines how much of the <strong>extra space</strong> an item should take up. Default is 0 (don't grow).
              </p>

              {/* Scenario buttons */}
              <div className="flex flex-wrap gap-2">
                {growScenarios.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setGrowScenario(i)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      growScenario === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <motion.div
                key={growScenario}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="rounded-xl border p-4 space-y-3">
                  <p className="text-[10px] text-muted-foreground">{growScenarios[growScenario].desc}</p>

                  <div className="flex gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3">
                    {growScenarios[growScenario].items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className={`bg-blue-500/20 border border-blue-500/40 rounded-lg py-3 text-center ${
                          item.grow > 0 ? `flex-[${item.grow}]` : "px-4"
                        }`}
                        style={{ flex: item.grow > 0 ? item.grow : "0 1 auto" }}
                      >
                        <span className="text-[10px] font-bold block">{item.content}</span>
                        <span className="text-[8px] text-muted-foreground">grow: {item.grow}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Visual ratio bar */}
                  {growScenarios[growScenario].items.some((i) => i.grow > 0) && (
                    <div className="space-y-1">
                      <p className="text-[9px] text-muted-foreground font-bold">Extra space distribution:</p>
                      <div className="flex gap-0.5 h-4 rounded overflow-hidden">
                        {growScenarios[growScenario].items.map((item, i) => {
                          const total = growScenarios[growScenario].items.reduce((a, b) => a + b.grow, 0);
                          const pct = total > 0 ? (item.grow / total) * 100 : 0;
                          return item.grow > 0 ? (
                            <motion.div
                              key={i}
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              className={`${
                                i === 0 ? "bg-blue-500" : i === 1 ? "bg-purple-500" : "bg-emerald-500"
                              } flex items-center justify-center text-[7px] text-white font-bold`}
                            >
                              {Math.round(pct)}%
                            </motion.div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{growScenario === 0
  ? `/* flex-grow: 0 (default) */
.item { flex-grow: 0; }

/* Items stay at natural size.
   Extra space is NOT distributed.

   [A] [B] [C] ........empty.....

   The remaining space is unused.
   This is the default behavior. */`
  : growScenario === 1
  ? `/* All items flex-grow: 1 */
.item { flex-grow: 1; }

/* Extra space split equally.
   Each item gets 1/3 of extra.

   [===A===] [===B===] [===C===]

   Note: items aren't necessarily
   equal width unless flex-basis
   is also 0 (or use flex: 1). */`
  : growScenario === 2
  ? `/* Mixed grow values */
.item-a { flex-grow: 1; }
.item-b { flex-grow: 2; }
.item-c { flex-grow: 1; }

/* Total grow = 4
   A gets 1/4 of extra space
   B gets 2/4 of extra space
   C gets 1/4 of extra space

   [==A==] [====B====] [==C==] */`
  : `/* Only one item grows */
.item-a { flex-grow: 1; }
.item-b { flex-grow: 0; }
.item-c { flex-grow: 0; }

/* Only A absorbs extra space.
   B and C stay at their size.

   [========A========] [B] [C]

   Common pattern: search bar
   that fills remaining space. */`}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </>
      )}

      {/* flex-shrink */}
      {activeTab === "shrink" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">flex-shrink: Handling Tight Space</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              flex-shrink determines how much an item should shrink when there isn't enough space. Default is 1 (can shrink).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Can shrink */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-4 space-y-3"
              >
                <Badge className="bg-blue-500 text-[10px]">flex-shrink: 1 (default)</Badge>
                <div className="flex gap-1 border-2 border-dashed border-blue-400 rounded-lg p-2 w-full">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className="bg-blue-500/20 border border-blue-500/40 rounded px-2 py-2 text-[9px] font-bold text-center flex-shrink"
                      style={{ flexBasis: "80px" }}
                    >
                      Item {n}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Items shrink proportionally to fit. Each has flex-basis: 80px but shrinks to fit the container.
                </p>
              </motion.div>

              {/* Cannot shrink */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border p-4 space-y-3"
              >
                <Badge className="bg-red-500 text-[10px]">flex-shrink: 0 (no shrink)</Badge>
                <div className="flex gap-1 border-2 border-dashed border-red-400 rounded-lg p-2 w-full overflow-x-auto">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div
                      key={n}
                      className="bg-red-500/20 border border-red-500/40 rounded px-2 py-2 text-[9px] font-bold text-center shrink-0"
                      style={{ flexBasis: "80px" }}
                    >
                      Item {n}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Items refuse to shrink below 80px. They overflow the container instead.
                </p>
              </motion.div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* flex-shrink controls how items
   lose space when container
   is too small */

/* Default: items CAN shrink */
.item {
  flex-shrink: 1; /* default */
  flex-basis: 200px;
}

/* Prevent shrinking */
.fixed-item {
  flex-shrink: 0; /* rigid! */
  flex-basis: 200px;
}

/* Shrink more than others */
.flexible-item {
  flex-shrink: 2; /* shrinks 2x */
  flex-basis: 200px;
}

/* Common pattern: fixed sidebar */
.sidebar  { flex: 0 0 250px; }
.content  { flex: 1 1 auto; }`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* flex-basis */}
      {activeTab === "basis" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">flex-basis vs width</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              flex-basis sets the initial size of a flex item before growing or shrinking. It can replace width in flex layouts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {/* Comparison */}
                <div className="rounded-xl border p-4 space-y-3">
                  <p className="text-xs font-bold">flex-basis vs width:</p>
                  <div className="space-y-2">
                    {[
                      { prop: "width: 200px", note: "Ignored if flex-basis is set (in main axis)", color: "text-orange-400" },
                      { prop: "flex-basis: 200px", note: "The flex-aware starting size. Preferred over width.", color: "text-emerald-400" },
                      { prop: "flex-basis: auto", note: "Default. Falls back to width or content size.", color: "text-blue-400" },
                      { prop: "flex-basis: 0", note: "Start from zero, distribute all space via flex-grow.", color: "text-purple-400" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-muted/30 rounded-lg p-2.5"
                      >
                        <code className={`text-[10px] font-bold ${item.color}`}>{item.prop}</code>
                        <p className="text-[10px] text-muted-foreground">{item.note}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* flex-basis: auto vs 0 */}
                <div className="rounded-xl border p-4 space-y-3">
                  <p className="text-xs font-bold">flex-basis: auto vs 0</p>

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[9px]">flex: 1 1 auto (flex-basis: auto)</Badge>
                      <div className="flex gap-1 border border-dashed border-zinc-400 rounded p-1.5">
                        <div className="bg-blue-500/20 border border-blue-500/40 rounded px-1 py-1 text-[8px] font-bold flex-auto">
                          Short
                        </div>
                        <div className="bg-purple-500/20 border border-purple-500/40 rounded px-1 py-1 text-[8px] font-bold flex-auto">
                          Much longer content here
                        </div>
                      </div>
                      <p className="text-[9px] text-muted-foreground">Wider item gets more space (content-aware)</p>
                    </div>

                    <div className="space-y-1">
                      <Badge variant="outline" className="text-[9px]">flex: 1 1 0 (flex-basis: 0)</Badge>
                      <div className="flex gap-1 border border-dashed border-zinc-400 rounded p-1.5">
                        <div className="bg-blue-500/20 border border-blue-500/40 rounded px-1 py-1 text-[8px] font-bold" style={{ flex: "1 1 0" }}>
                          Short
                        </div>
                        <div className="bg-purple-500/20 border border-purple-500/40 rounded px-1 py-1 text-[8px] font-bold" style={{ flex: "1 1 0" }}>
                          Much longer content here
                        </div>
                      </div>
                      <p className="text-[9px] text-muted-foreground">Equal width regardless of content</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* flex-basis: initial size before
   grow/shrink is applied */

/* auto: use width or content */
.item {
  flex-basis: auto; /* default */
}

/* Fixed size */
.sidebar {
  flex-basis: 250px;
}

/* Percentage */
.half {
  flex-basis: 50%;
}

/* Zero: ignore content size */
.equal {
  flex-basis: 0;
  flex-grow: 1;
  /* = flex: 1 */
}

/* Priority order:
   1. flex-basis (if not auto)
   2. width
   3. content size

   In column direction:
   flex-basis overrides height
   instead of width. */`}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* flex shorthand */}
      {activeTab === "shorthand" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">The flex Shorthand</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              The <code className="text-[11px] bg-muted px-1 rounded">flex</code> shorthand sets flex-grow, flex-shrink, and flex-basis in one declaration.
            </p>

            <div className="rounded-xl border p-4 space-y-2">
              <p className="text-xs font-bold">Syntax:</p>
              <div className="bg-muted/50 rounded-lg p-3">
                <code className="text-[11px] font-bold">
                  flex: <span className="text-blue-500">grow</span>{" "}
                  <span className="text-purple-500">shrink</span>{" "}
                  <span className="text-emerald-500">basis</span>
                </code>
              </div>
            </div>

            <div className="space-y-2">
              {shorthandExamples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border p-3 space-y-2"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-[11px] text-primary font-bold">{ex.shorthand}</code>
                    <Badge variant="outline" className="text-[8px]">{ex.label}</Badge>
                  </div>
                  <div className="flex gap-3 text-[10px]">
                    <span>
                      <span className="text-blue-500 font-bold">grow:</span>{" "}
                      <span className="text-muted-foreground">{ex.grow}</span>
                    </span>
                    <span>
                      <span className="text-purple-500 font-bold">shrink:</span>{" "}
                      <span className="text-muted-foreground">{ex.shrink}</span>
                    </span>
                    <span>
                      <span className="text-emerald-500 font-bold">basis:</span>{" "}
                      <span className="text-muted-foreground">{ex.basis}</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{ex.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Recommended: always use the
   flex shorthand over individual
   properties */

/* Equal columns */
.col { flex: 1; }
/* = flex: 1 1 0 */

/* Fixed + flexible */
.sidebar { flex: 0 0 250px; }
.main    { flex: 1; }

/* Rigid item */
.logo { flex: none; }
/* = flex: 0 0 auto */

/* Auto-sizing */
.tab { flex: auto; }
/* = flex: 1 1 auto */

/* Common responsive pattern */
.card {
  flex: 1 1 300px;
  /* Grow, shrink, but at
     least 300px before shrink */
}`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Common patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Sizing Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: "Fixed sidebar + fluid content",
                code: ".sidebar { flex: 0 0 250px; }\n.content { flex: 1; }",
              },
              {
                label: "Equal-width columns",
                code: ".col { flex: 1; }\n/* or flex: 1 1 0 */",
              },
              {
                label: "Content-aware columns",
                code: ".col { flex: auto; }\n/* or flex: 1 1 auto */",
              },
              {
                label: "Responsive cards (min 300px)",
                code: ".card { flex: 1 1 300px; }\n/* wrap + gap on container */",
              },
            ].map((pattern, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border p-3 space-y-2"
              >
                <p className="text-xs font-bold">{pattern.label}</p>
                <div className="bg-zinc-950 rounded-lg p-2 font-mono text-[10px] text-emerald-400 whitespace-pre">
                  {pattern.code}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
