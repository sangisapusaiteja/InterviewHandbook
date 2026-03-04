"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type JustifyValue = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

const justifyValues: {
  value: JustifyValue;
  label: string;
  desc: string;
  spaceDesc: string;
}[] = [
  {
    value: "flex-start",
    label: "flex-start",
    desc: "Items are packed toward the start of the main axis.",
    spaceDesc: "All extra space is after the last item.",
  },
  {
    value: "flex-end",
    label: "flex-end",
    desc: "Items are packed toward the end of the main axis.",
    spaceDesc: "All extra space is before the first item.",
  },
  {
    value: "center",
    label: "center",
    desc: "Items are centered along the main axis.",
    spaceDesc: "Equal space on both sides of the group.",
  },
  {
    value: "space-between",
    label: "space-between",
    desc: "First item at start, last item at end, equal space between.",
    spaceDesc: "No space before first or after last item.",
  },
  {
    value: "space-around",
    label: "space-around",
    desc: "Equal space around each item. Edges get half the space.",
    spaceDesc: "Edge gaps are half the size of gaps between items.",
  },
  {
    value: "space-evenly",
    label: "space-evenly",
    desc: "Truly equal space between all items and edges.",
    spaceDesc: "Every gap is exactly the same size.",
  },
];

const tailwindMap: Record<JustifyValue, string> = {
  "flex-start": "justify-start",
  "flex-end": "justify-end",
  center: "justify-center",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly",
};

const codeExamples: Record<JustifyValue, string> = {
  "flex-start": `.container {
  display: flex;
  justify-content: flex-start;
}

/* Default value.
   Items pack to the left (in row).

   [A][B][C]                    |

   Use: most content layouts */`,
  "flex-end": `.container {
  display: flex;
  justify-content: flex-end;
}

/* Items pack to the right.

   |                    [A][B][C]

   Use: right-aligned actions,
   buttons at end of dialogs */`,
  center: `.container {
  display: flex;
  justify-content: center;
}

/* Items centered on main axis.

   |        [A][B][C]        |

   Use: centering content,
   modal dialogs, hero sections */`,
  "space-between": `.container {
  display: flex;
  justify-content: space-between;
}

/* First & last items at edges.
   Equal gaps between items.

   [A]      [B]      [C]

   Use: navbars, header layouts,
   footer links */`,
  "space-around": `.container {
  display: flex;
  justify-content: space-around;
}

/* Equal space around each item.
   Edge space = half inner space.

    [A]    [B]    [C]

   Use: evenly distributed items
   with some edge padding */`,
  "space-evenly": `.container {
  display: flex;
  justify-content: space-evenly;
}

/* Truly equal spacing everywhere.
   Edge space = inner space.

     [A]     [B]     [C]

   Use: perfectly balanced
   distribution of items */`,
};

export function JustifyContentVisualization() {
  const [justify, setJustify] = useState<JustifyValue>("flex-start");

  const current = justifyValues.find((j) => j.value === justify)!;

  return (
    <div className="space-y-6">
      {/* Interactive justify-content demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">justify-content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Controls how flex items are distributed along the <strong>main axis</strong>. Determines what happens to extra space.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {justifyValues.map((j) => (
              <button
                key={j.value}
                onClick={() => setJustify(j.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  justify === j.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {j.label}
              </button>
            ))}
          </div>

          <motion.div
            key={justify}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-[10px] text-muted-foreground">{current.desc}</p>

              {/* Main demo */}
              <div className="relative">
                <div className={`flex ${tailwindMap[justify]} gap-0 border-2 border-dashed border-blue-400 rounded-lg p-3 min-h-[60px]`}>
                  {["A", "B", "C"].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-5 py-3 text-xs font-bold text-center mx-0"
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-2">
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-bold text-primary">Space:</span> {current.spaceDesc}
                </p>
              </div>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[justify]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Space distribution comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Space Distribution Compared</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            The three space-* values differ in how they distribute extra space. Here they are side by side:
          </p>

          <div className="space-y-3">
            {(["space-between", "space-around", "space-evenly"] as const).map((val, idx) => {
              const info = justifyValues.find((j) => j.value === val)!;
              return (
                <motion.div
                  key={val}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-xl border p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <code className="text-[11px] text-primary font-bold">{val}</code>
                    <span className="text-[10px] text-muted-foreground">{info.spaceDesc}</span>
                  </div>

                  <div className={`flex ${tailwindMap[val]} border border-dashed border-zinc-400 rounded-lg p-2`}>
                    {["1", "2", "3"].map((n) => (
                      <div
                        key={n}
                        className="bg-primary/15 border border-primary/30 rounded px-4 py-1.5 text-[10px] font-bold text-center"
                      >
                        {n}
                      </div>
                    ))}
                  </div>

                  {/* Space visualization */}
                  <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                    {val === "space-between" && (
                      <>
                        <span className="text-red-400">|</span>
                        <span>no gap</span>
                        <span>[1]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">equal gap</span>
                        <span>[2]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">equal gap</span>
                        <span>[3]</span>
                        <span>no gap</span>
                        <span className="text-red-400">|</span>
                      </>
                    )}
                    {val === "space-around" && (
                      <>
                        <span className="text-orange-400 flex-1 text-center border-b border-dashed border-orange-400">half</span>
                        <span>[1]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">full</span>
                        <span>[2]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">full</span>
                        <span>[3]</span>
                        <span className="text-orange-400 flex-1 text-center border-b border-dashed border-orange-400">half</span>
                      </>
                    )}
                    {val === "space-evenly" && (
                      <>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">equal</span>
                        <span>[1]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">equal</span>
                        <span>[2]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">equal</span>
                        <span>[3]</span>
                        <span className="text-emerald-400 flex-1 text-center border-b border-dashed border-emerald-400">equal</span>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All values at a glance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Values at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {justifyValues.map((j, i) => (
              <motion.div
                key={j.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border p-3 space-y-2"
              >
                <code className="text-[10px] text-primary font-bold block">{j.value}</code>
                <div className={`flex ${tailwindMap[j.value]} border border-dashed border-zinc-400 rounded p-1.5 min-h-[32px]`}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-primary/15 border border-primary/30 rounded px-1.5 py-0.5 text-[8px] font-bold">
                      {n}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview tip */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tip: "justify-content only affects extra space", desc: "If items fill the container, this property has no visible effect." },
              { tip: "It works on the main axis", desc: "For row direction that's horizontal, for column it's vertical." },
              { tip: "gap works alongside justify-content", desc: "gap adds minimum spacing; justify-content distributes remaining space." },
              { tip: "space-between is most common in navbars", desc: "Logo on left, links on right with a single property." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold">{item.tip}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
