"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AlignValue = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

const alignValues: {
  value: AlignValue;
  label: string;
  desc: string;
}[] = [
  {
    value: "stretch",
    label: "stretch",
    desc: "Default. Items stretch to fill the container's cross axis. Items without a set height will expand to match the tallest item.",
  },
  {
    value: "flex-start",
    label: "flex-start",
    desc: "Items are aligned to the start of the cross axis (top in row direction).",
  },
  {
    value: "flex-end",
    label: "flex-end",
    desc: "Items are aligned to the end of the cross axis (bottom in row direction).",
  },
  {
    value: "center",
    label: "center",
    desc: "Items are centered along the cross axis. The most popular way to vertically center content.",
  },
  {
    value: "baseline",
    label: "baseline",
    desc: "Items are aligned so that their text baselines line up, regardless of font size or padding.",
  },
];

const tailwindAlignMap: Record<AlignValue, string> = {
  stretch: "items-stretch",
  "flex-start": "items-start",
  "flex-end": "items-end",
  center: "items-center",
  baseline: "items-baseline",
};

const codeExamples: Record<AlignValue, string> = {
  stretch: `.container {
  display: flex;
  align-items: stretch; /* default */
  height: 120px;
}

/* Items stretch to fill height.
   Works when items DON'T have
   an explicit height set.

   Use: equal-height columns,
   card layouts */`,
  "flex-start": `.container {
  display: flex;
  align-items: flex-start;
  height: 120px;
}

/* Items align to the top.
   Each item keeps its own height.

   |[A][BB][CCC]           |
   |                        |

   Use: top-aligned layouts,
   tag lists, icon + text */`,
  "flex-end": `.container {
  display: flex;
  align-items: flex-end;
  height: 120px;
}

/* Items align to the bottom.

   |                        |
   |[A][BB][CCC]           |

   Use: bottom-aligned content,
   message timestamps */`,
  center: `.container {
  display: flex;
  align-items: center;
  height: 120px;
}

/* Items centered vertically.

   |                        |
   |[A][BB][CCC]           |
   |                        |

   Use: centering content,
   icon + text alignment */`,
  baseline: `.container {
  display: flex;
  align-items: baseline;
}

/* Aligns text baselines.
   Useful when items have
   different font sizes or
   padding but text should
   line up.

   Use: mixed-size headings,
   form labels + inputs */`,
};

export function AlignItemsVisualization() {
  const [align, setAlign] = useState<AlignValue>("stretch");
  const [selfDemo, setSelfDemo] = useState(false);

  const current = alignValues.find((a) => a.value === align)!;

  return (
    <div className="space-y-6">
      {/* Interactive align-items demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">align-items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Controls how flex items are aligned along the <strong>cross axis</strong> (vertical axis in row direction).
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {alignValues.map((a) => (
              <button
                key={a.value}
                onClick={() => setAlign(a.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  align === a.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <motion.div
            key={align}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-[10px] text-muted-foreground">{current.desc}</p>

              <div
                className={`flex ${tailwindAlignMap[align]} gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3 h-32`}
              >
                {align === "baseline" ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-2"
                    >
                      <span className="text-[10px] font-bold">Small</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 }}
                      className="bg-purple-500/20 border border-purple-500/40 rounded-lg px-3 pt-4 pb-2"
                    >
                      <span className="text-lg font-bold">BIG</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.16 }}
                      className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-3 py-1"
                    >
                      <span className="text-[8px] font-bold">Tiny</span>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 flex items-center justify-center ${
                        align === "stretch" ? "" : "h-8"
                      }`}
                    >
                      <span className="text-[10px] font-bold">A</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.08 }}
                      className={`bg-purple-500/20 border border-purple-500/40 rounded-lg px-3 flex items-center justify-center ${
                        align === "stretch" ? "" : "h-14"
                      }`}
                    >
                      <span className="text-[10px] font-bold">B (tall)</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.16 }}
                      className={`bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-3 flex items-center justify-center ${
                        align === "stretch" ? "" : "h-6"
                      }`}
                    >
                      <span className="text-[10px] font-bold">C</span>
                    </motion.div>
                  </>
                )}
              </div>

              <div className="bg-muted/30 rounded-lg p-2">
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-bold text-orange-500">Cross axis:</span> Vertical (top to bottom) in row direction.
                </p>
              </div>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[align]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* align-self override */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">align-self: Override Individual Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            While <code className="text-[11px] bg-muted px-1 rounded">align-items</code> sets the default for all items,{" "}
            <code className="text-[11px] bg-muted px-1 rounded">align-self</code> overrides alignment for a specific item.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setSelfDemo(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !selfDemo ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              align-items only
            </button>
            <button
              onClick={() => setSelfDemo(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selfDemo ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              + align-self on Item B
            </button>
          </div>

          <motion.div
            key={String(selfDemo)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-start gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3 h-28">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-blue-500/20 border border-blue-500/40 rounded-lg px-3 py-2 text-[10px] font-bold"
                >
                  A
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className={`bg-purple-500/20 border-2 border-purple-500 rounded-lg px-3 py-2 text-[10px] font-bold ${
                    selfDemo ? "self-end" : ""
                  }`}
                >
                  B {selfDemo && "(self-end)"}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-emerald-500/20 border border-emerald-500/40 rounded-lg px-3 py-2 text-[10px] font-bold"
                >
                  C
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {selfDemo
                  ? "Container: align-items: flex-start. Item B overrides with align-self: flex-end."
                  : "All items follow container's align-items: flex-start."}
              </p>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {selfDemo
                ? `.container {
  display: flex;
  align-items: flex-start;
  height: 120px;
}

/* Override just Item B */
.item-b {
  align-self: flex-end;
}

/* align-self values:
   auto (inherit from container)
   flex-start | flex-end
   center | baseline | stretch */`
                : `.container {
  display: flex;
  align-items: flex-start;
  height: 120px;
}

/* All items follow the
   container's align-items.

   To override a single item,
   use align-self on that item.

   align-self accepts the same
   values as align-items. */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* All values comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Values Compared</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {alignValues.map((a, i) => (
              <motion.div
                key={a.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border p-2 space-y-1.5"
              >
                <code className="text-[9px] text-primary font-bold block text-center">{a.value}</code>
                <div
                  className={`flex ${tailwindAlignMap[a.value]} gap-1 border border-dashed border-zinc-400 rounded p-1 h-16`}
                >
                  {a.value === "baseline" ? (
                    <>
                      <div className="bg-primary/10 border border-primary/20 rounded px-1 py-0.5 text-[7px] font-bold">sm</div>
                      <div className="bg-primary/10 border border-primary/20 rounded px-1 pt-1.5 pb-0.5 text-[9px] font-bold">LG</div>
                      <div className="bg-primary/10 border border-primary/20 rounded px-1 py-0.5 text-[6px] font-bold">xs</div>
                    </>
                  ) : (
                    <>
                      <div className={`bg-primary/10 border border-primary/20 rounded px-1 text-[7px] font-bold flex items-center ${a.value === "stretch" ? "" : "h-4"}`}>A</div>
                      <div className={`bg-primary/10 border border-primary/20 rounded px-1 text-[7px] font-bold flex items-center ${a.value === "stretch" ? "" : "h-8"}`}>B</div>
                      <div className={`bg-primary/10 border border-primary/20 rounded px-1 text-[7px] font-bold flex items-center ${a.value === "stretch" ? "" : "h-3"}`}>C</div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tip: "stretch is the default", desc: "That's why flex items have equal height by default (when height is not explicitly set)." },
              { tip: "align-items works on the cross axis", desc: "In row direction, that's vertical. In column direction, that's horizontal." },
              { tip: "align-self overrides for one item", desc: "Set on the flex item, not the container. Accepts the same values." },
              { tip: "baseline is great for mixed sizes", desc: "Aligns text baselines even with different font sizes or padding amounts." },
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
