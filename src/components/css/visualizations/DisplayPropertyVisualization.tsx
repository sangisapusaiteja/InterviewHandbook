"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DisplayType = "block" | "inline" | "inline-block" | "none" | "flex" | "grid" | "contents";

const displayTypes: { id: DisplayType; label: string; description: string; color: string }[] = [
  { id: "block", label: "block", description: "Takes full width, starts on new line", color: "bg-blue-500" },
  { id: "inline", label: "inline", description: "Only as wide as content, no line break", color: "bg-emerald-500" },
  { id: "inline-block", label: "inline-block", description: "Inline flow + block sizing", color: "bg-purple-500" },
  { id: "none", label: "none", description: "Completely removed from layout", color: "bg-red-500" },
  { id: "flex", label: "flex", description: "1D layout — row or column", color: "bg-orange-500" },
  { id: "grid", label: "grid", description: "2D layout — rows and columns", color: "bg-pink-500" },
  { id: "contents", label: "contents", description: "Box disappears, children move up", color: "bg-cyan-500" },
];

const codeExamples: Record<DisplayType, string> = {
  block: `/* Block elements */
div, p, h1-h6, section, article,
header, footer, form, ul, ol

.box {
  display: block;
  width: 300px;      /* width works */
  height: 100px;     /* height works */
  margin: 20px;      /* all margins work */
  padding: 10px;     /* all paddings work */
}
/* Takes full available width by default
   Starts on a new line */`,
  inline: `/* Inline elements */
span, a, strong, em, img, input,
label, code, br, small

.text {
  display: inline;
  width: 200px;      /* IGNORED */
  height: 50px;      /* IGNORED */
  margin-top: 10px;  /* IGNORED */
  margin-left: 10px; /* works */
  padding: 10px;     /* applies but doesn't
                        affect layout flow */
}
/* Only takes as much width as content */`,
  "inline-block": `/* Inline-block: best of both worlds */
.badge {
  display: inline-block;
  width: 120px;      /* works! */
  height: 40px;      /* works! */
  margin: 10px;      /* all margins work */
  padding: 8px 12px; /* all paddings work */
  vertical-align: middle;
}
/* Sits inline with text
   BUT respects width/height/margin */`,
  none: `/* display: none */
.hidden {
  display: none;
}
/* Element is completely removed from
   the document flow. Takes no space.
   Screen readers cannot see it. */

/* vs visibility: hidden */
.invisible {
  visibility: hidden;
}
/* Element is invisible but STILL
   takes up space in the layout.
   Screen readers may still read it. */`,
  flex: `/* Flexbox — 1D layout */
.container {
  display: flex;
  flex-direction: row;    /* or column */
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.item {
  flex: 1;  /* grow to fill space */
}
/* Great for navbars, card rows,
   centering, equal-height columns */`,
  grid: `/* Grid — 2D layout */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}

.item {
  grid-column: 1 / 3; /* span 2 cols */
}
/* Great for page layouts, dashboards,
   image galleries, complex UIs */`,
  contents: `/* display: contents */
.wrapper {
  display: contents;
}
/* The wrapper box itself disappears
   from the layout. Its children are
   promoted to the parent container. */

/* Useful with CSS Grid/Flex: */
<div class="grid grid-cols-3">
  <div style="display: contents">
    <div>A</div>  <!-- now grid items -->
    <div>B</div>
  </div>
  <div>C</div>
</div>`,
};

export function DisplayPropertyVisualization() {
  const [activeDisplay, setActiveDisplay] = useState<DisplayType>("block");

  return (
    <div className="space-y-6">
      {/* Display type selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Display Property Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code className="text-primary font-mono text-xs">display</code> property controls how an element generates boxes and participates in layout.
          </p>

          <div className="flex flex-wrap gap-2">
            {displayTypes.map((dt) => (
              <button
                key={dt.id}
                onClick={() => setActiveDisplay(dt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDisplay === dt.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {dt.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeDisplay}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual demo */}
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={`${displayTypes.find((d) => d.id === activeDisplay)?.color} text-[10px]`}>
                  display: {activeDisplay}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {displayTypes.find((d) => d.id === activeDisplay)?.description}
              </p>

              {/* Visual rendering */}
              <div className="rounded-lg bg-muted/30 p-4 min-h-[120px]">
                {activeDisplay === "block" && (
                  <div className="space-y-2">
                    <div className="bg-blue-500/20 border border-blue-500 p-2 rounded text-[10px] text-blue-600 dark:text-blue-400 font-mono w-full">Block A (full width)</div>
                    <div className="bg-blue-500/20 border border-blue-500 p-2 rounded text-[10px] text-blue-600 dark:text-blue-400 font-mono w-3/4">Block B (width: 75%)</div>
                    <div className="bg-blue-500/20 border border-blue-500 p-2 rounded text-[10px] text-blue-600 dark:text-blue-400 font-mono w-1/2">Block C (width: 50%)</div>
                  </div>
                )}
                {activeDisplay === "inline" && (
                  <p className="text-xs">
                    Text with{" "}
                    <span className="bg-emerald-500/20 border border-emerald-500 px-1 rounded text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">inline A</span>{" "}
                    and{" "}
                    <span className="bg-emerald-500/20 border border-emerald-500 px-1 rounded text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">inline B</span>{" "}
                    flowing with text, no line break.
                  </p>
                )}
                {activeDisplay === "inline-block" && (
                  <div className="text-xs">
                    Text{" "}
                    <span className="bg-purple-500/20 border border-purple-500 px-3 py-2 rounded text-[10px] text-purple-600 dark:text-purple-400 font-mono inline-block w-24 text-center">Box A</span>{" "}
                    <span className="bg-purple-500/20 border border-purple-500 px-3 py-2 rounded text-[10px] text-purple-600 dark:text-purple-400 font-mono inline-block w-20 text-center">Box B</span>{" "}
                    inline with width/height.
                  </div>
                )}
                {activeDisplay === "none" && (
                  <div className="space-y-2">
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">Visible element</div>
                    <div className="border-2 border-dashed border-red-300 dark:border-red-800 p-2 rounded text-[10px] text-red-400 font-mono opacity-30">display: none (removed)</div>
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-mono">Visible element (moves up)</div>
                  </div>
                )}
                {activeDisplay === "flex" && (
                  <div className="flex gap-2 items-center">
                    <div className="bg-orange-500/20 border border-orange-500 p-2 rounded text-[10px] text-orange-600 dark:text-orange-400 font-mono flex-1 text-center">flex: 1</div>
                    <div className="bg-orange-500/20 border border-orange-500 p-2 rounded text-[10px] text-orange-600 dark:text-orange-400 font-mono flex-1 text-center">flex: 1</div>
                    <div className="bg-orange-500/20 border border-orange-500 p-2 rounded text-[10px] text-orange-600 dark:text-orange-400 font-mono flex-1 text-center">flex: 1</div>
                  </div>
                )}
                {activeDisplay === "grid" && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-pink-500/20 border border-pink-500 p-2 rounded text-[10px] text-pink-600 dark:text-pink-400 font-mono text-center">1</div>
                    <div className="bg-pink-500/20 border border-pink-500 p-2 rounded text-[10px] text-pink-600 dark:text-pink-400 font-mono text-center">2</div>
                    <div className="bg-pink-500/20 border border-pink-500 p-2 rounded text-[10px] text-pink-600 dark:text-pink-400 font-mono text-center">3</div>
                    <div className="bg-pink-500/20 border border-pink-500 p-2 rounded text-[10px] text-pink-600 dark:text-pink-400 font-mono text-center col-span-2">span 2</div>
                    <div className="bg-pink-500/20 border border-pink-500 p-2 rounded text-[10px] text-pink-600 dark:text-pink-400 font-mono text-center">5</div>
                  </div>
                )}
                {activeDisplay === "contents" && (
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-cyan-500/20 border border-cyan-500 p-2 rounded text-[10px] text-cyan-600 dark:text-cyan-400 font-mono text-center">Child A</div>
                    <div className="bg-cyan-500/20 border border-cyan-500 p-2 rounded text-[10px] text-cyan-600 dark:text-cyan-400 font-mono text-center">Child B</div>
                    <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] text-zinc-600 dark:text-zinc-400 font-mono text-center">Sibling</div>
                    <p className="col-span-3 text-[10px] text-muted-foreground mt-1">Wrapper box removed, children promoted to grid items</p>
                  </div>
                )}
              </div>
            </div>

            {/* Code example */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[activeDisplay]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Quick reference table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Display Values at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">New Line?</th>
                  <th className="text-left p-2">Width/Height?</th>
                  <th className="text-left p-2">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { value: "block", newLine: "Yes", wh: "Yes", use: "Sections, divs, paragraphs" },
                  { value: "inline", newLine: "No", wh: "No", use: "Text styling, spans, links" },
                  { value: "inline-block", newLine: "No", wh: "Yes", use: "Buttons, badges, nav items" },
                  { value: "none", newLine: "N/A", wh: "N/A", use: "Hiding elements completely" },
                  { value: "flex", newLine: "Yes", wh: "Yes", use: "1D layouts, alignment" },
                  { value: "grid", newLine: "Yes", wh: "Yes", use: "2D layouts, complex grids" },
                  { value: "contents", newLine: "No box", wh: "No box", use: "Unwrapping containers" },
                ].map((row) => (
                  <tr key={row.value} className="border-b last:border-0">
                    <td className="p-2 font-mono font-bold text-primary">{row.value}</td>
                    <td className="p-2">{row.newLine}</td>
                    <td className="p-2">{row.wh}</td>
                    <td className="p-2 text-muted-foreground">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interview tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                q: "What is the difference between display: none and visibility: hidden?",
                code: `.gone  { display: none; }      /* removed from flow, no space */\n.ghost { visibility: hidden; }  /* invisible, but takes space */`,
                answer: "display: none removes the element from the document flow entirely (no space reserved). visibility: hidden makes it invisible but it still occupies space.",
              },
              {
                q: "What is display: inline-block used for?",
                code: `.nav-item {\n  display: inline-block;\n  width: 100px;\n  padding: 8px;\n  text-align: center;\n}\n/* Flows inline like text but respects\n   width, height, margin, padding */`,
                answer: "inline-block combines inline flow (no forced line break) with block-level box properties (width, height, vertical margin/padding). Common for navigation items and badges.",
              },
              {
                q: "When should you use flex vs grid?",
                code: `/* Flex = 1 dimension (row OR column) */\n.navbar { display: flex; }\n\n/* Grid = 2 dimensions (rows AND columns) */\n.dashboard { display: grid; }`,
                answer: "Use flexbox for one-dimensional layouts (a row of buttons, a column of cards). Use grid for two-dimensional layouts (dashboards, page layouts). They can be combined.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-bold text-primary">{item.q}</p>
                <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                <p className="text-[10px] text-muted-foreground"><strong>Answer:</strong> {item.answer}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
