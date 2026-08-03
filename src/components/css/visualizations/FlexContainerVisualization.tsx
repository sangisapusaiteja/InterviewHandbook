"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerProps = [
  { prop: "flex-direction", values: "row | row-reverse | column | column-reverse", desc: "Sets the main axis direction" },
  { prop: "flex-wrap", values: "nowrap | wrap | wrap-reverse", desc: "Controls whether items wrap to new lines" },
  { prop: "justify-content", values: "flex-start | center | space-between | ...", desc: "Distributes items along the main axis" },
  { prop: "align-items", values: "stretch | flex-start | center | ...", desc: "Aligns items along the cross axis" },
  { prop: "align-content", values: "stretch | flex-start | center | ...", desc: "Aligns wrapped lines (multi-line only)" },
  { prop: "gap", values: "<length>", desc: "Sets spacing between flex items" },
];

export function FlexContainerVisualization() {
  const [displayType, setDisplayType] = useState<"flex" | "inline-flex">("flex");

  return (
    <div className="space-y-6">
      {/* display: flex vs inline-flex */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">display: flex vs inline-flex</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["flex", "inline-flex"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDisplayType(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  displayType === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                display: {mode}
              </button>
            ))}
          </div>

          <motion.div
            key={displayType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className={displayType === "flex" ? "bg-blue-500 text-[10px]" : "bg-purple-500 text-[10px]"}>
                {displayType === "flex" ? "Block-level container" : "Inline-level container"}
              </Badge>
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground">
                  Some text before the container.
                </p>
                <div
                  className={`border-2 border-dashed border-blue-400 rounded-lg p-2 gap-2 ${
                    displayType === "flex" ? "flex" : "inline-flex"
                  }`}
                >
                  {[1, 2, 3].map((n) => (
                    <motion.div
                      key={n}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded px-3 py-1.5 text-[10px] font-bold"
                    >
                      Item {n}
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Some text after the container.
                </p>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {displayType === "flex"
                  ? "The container takes full width (block-level). Text before/after is on separate lines."
                  : "The container only takes as much width as needed. It sits inline with surrounding text."}
              </p>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {displayType === "flex"
                ? `/* Block-level flex container */
.container {
  display: flex;
  gap: 8px;
}

/* Takes full width of parent.
   Starts on a new line.
   Like a block element that
   lays out children with flex. */

/* Use when: container should
   fill available width (most
   common use case) */`
                : `/* Inline-level flex container */
.container {
  display: inline-flex;
  gap: 8px;
}

/* Only as wide as its content.
   Sits inline with text.
   Like an inline element that
   lays out children with flex. */

/* Use when: container should
   flow with inline content
   (e.g., button groups) */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Container properties overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Container Properties Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            These properties are set on the flex container (the parent) and control how its children are laid out.
          </p>
          <div className="space-y-2">
            {containerProps.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-3 flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <code className="text-[11px] text-primary font-bold shrink-0 w-36">{p.prop}</code>
                <div className="flex-1 min-w-0">
                  <code className="text-[10px] text-emerald-500 block">{p.values}</code>
                  <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How flex container changes child behavior */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Flex Containers Change Children</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When an element becomes a flex container, its direct children (flex items) behave differently from normal flow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Normal flow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-zinc-500 text-[10px]">Normal Flow (no flex)</Badge>
              <div className="border-2 border-dashed border-zinc-400 rounded-lg p-2 space-y-1">
                {["Block A", "Block B", "Block C"].map((label, i) => (
                  <div
                    key={i}
                    className="bg-zinc-500/20 border border-zinc-500/40 rounded px-3 py-2 text-[10px] font-bold"
                  >
                    {label}
                  </div>
                ))}
              </div>
              <div className="space-y-1">
                {[
                  "Block elements stack vertically",
                  "Each takes full width",
                  "Height based on content",
                  "margin auto doesn't center vertically",
                ].map((note, i) => (
                  <p key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                    <span className="text-red-400">✗</span> {note}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Flex */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <Badge className="bg-emerald-500 text-[10px]">With display: flex</Badge>
              <div className="border-2 border-dashed border-emerald-400 rounded-lg p-2 flex gap-1">
                {["Flex A", "Flex B", "Flex C"].map((label, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="bg-emerald-500/20 border border-emerald-500/40 rounded px-3 py-2 text-[10px] font-bold"
                  >
                    {label}
                  </motion.div>
                ))}
              </div>
              <div className="space-y-1">
                {[
                  "Items flow along main axis (row)",
                  "Items size to content width",
                  "Items stretch to equal height",
                  "margin: auto works on both axes!",
                ].map((note, i) => (
                  <p key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                    <span className="text-emerald-400">✓</span> {note}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Additional behavior changes */}
          <div className="rounded-xl border p-4 space-y-3">
            <p className="text-xs font-bold">Other Behavior Changes:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { label: "float is ignored", desc: "Flex items ignore float property" },
                { label: "vertical-align is ignored", desc: "No effect on flex items" },
                { label: "Inline items become blockified", desc: "Spans act like block elements" },
                { label: "Margins don't collapse", desc: "Adjacent margins remain separate" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="bg-muted/50 rounded-lg p-2.5 space-y-0.5"
                >
                  <p className="text-[11px] font-bold">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Container Setups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Horizontal nav */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Centered card */
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Card grid that wraps */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

/* Vertical stack */
.stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Inline button group */
.btn-group {
  display: inline-flex;
  gap: 4px;
}`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
