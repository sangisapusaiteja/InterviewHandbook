"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViewMode = "visual" | "behavior" | "elements";

export function BlockInlineVisualization() {
  const [viewMode, setViewMode] = useState<ViewMode>("visual");

  return (
    <div className="space-y-6">
      {/* Side-by-side comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Block vs Inline vs Inline-Block</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Every HTML element has a default display value that determines how it flows in the document.
          </p>

          <div className="flex gap-2">
            {(["visual", "behavior", "elements"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {mode === "visual" ? "Visual Demo" : mode === "behavior" ? "Box Behavior" : "Common Elements"}
              </button>
            ))}
          </div>

          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {viewMode === "visual" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Block */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-blue-500 text-[10px]">display: block</Badge>
                  <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                    <div className="bg-blue-500/20 border border-blue-500 p-2 rounded text-[10px] text-blue-600 dark:text-blue-400 font-mono">Block A (full width)</div>
                    <div className="bg-blue-500/20 border border-blue-500 p-2 rounded text-[10px] text-blue-600 dark:text-blue-400 font-mono">Block B (full width)</div>
                    <div className="bg-blue-500/20 border border-blue-500 p-2 rounded text-[10px] text-blue-600 dark:text-blue-400 font-mono w-2/3">Block C (width: 66%)</div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Each block starts on a new line and stretches full width by default.</p>
                </div>

                {/* Inline */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-emerald-500 text-[10px]">display: inline</Badge>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-[11px] leading-relaxed">
                      Text with{" "}
                      <span className="bg-emerald-500/20 border border-emerald-500 px-1 rounded text-emerald-600 dark:text-emerald-400 font-mono">inline A</span>{" "}
                      and{" "}
                      <span className="bg-emerald-500/20 border border-emerald-500 px-1 rounded text-emerald-600 dark:text-emerald-400 font-mono">inline B</span>{" "}
                      flowing naturally with surrounding content.
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Inline elements flow with text. No line breaks before or after.</p>
                </div>

                {/* Inline-block */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-purple-500 text-[10px]">display: inline-block</Badge>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <span className="bg-purple-500/20 border border-purple-500 px-3 py-2 rounded text-[10px] text-purple-600 dark:text-purple-400 font-mono inline-block w-16 text-center mr-1">A</span>
                    <span className="bg-purple-500/20 border border-purple-500 px-3 py-2 rounded text-[10px] text-purple-600 dark:text-purple-400 font-mono inline-block w-20 text-center mr-1">B</span>
                    <span className="bg-purple-500/20 border border-purple-500 px-3 py-2 rounded text-[10px] text-purple-600 dark:text-purple-400 font-mono inline-block w-14 text-center">C</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Flows inline but respects width, height, and vertical margins.</p>
                </div>
              </div>
            )}

            {viewMode === "behavior" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Block behavior */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-blue-500 text-[10px]">block</Badge>
                  <div className="space-y-2">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="bg-blue-500/20 border border-blue-500 p-3 rounded">
                        <div className="text-[9px] font-mono text-blue-600 dark:text-blue-400 space-y-0.5">
                          <p>width: 200px <span className="text-emerald-500">works</span></p>
                          <p>height: 100px <span className="text-emerald-500">works</span></p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 p-2 rounded">
                        <div className="bg-blue-500/20 border border-blue-500 p-2 rounded">
                          <div className="text-[9px] font-mono text-blue-600 dark:text-blue-400 space-y-0.5">
                            <p>margin-top <span className="text-emerald-500">works</span></p>
                            <p>margin-bottom <span className="text-emerald-500">works</span></p>
                            <p>padding (all) <span className="text-emerald-500">works</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline behavior */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-emerald-500 text-[10px]">inline</Badge>
                  <div className="space-y-2">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="bg-emerald-500/20 border border-emerald-500 px-2 py-1 rounded inline">
                        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400">
                          width <span className="text-red-500">ignored</span>
                        </span>
                      </span>
                      <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 ml-1">
                        height <span className="text-red-500">ignored</span>
                      </span>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 space-y-0.5">
                        <p>margin-top <span className="text-red-500">ignored</span></p>
                        <p>margin-bottom <span className="text-red-500">ignored</span></p>
                        <p>margin-left/right <span className="text-emerald-500">works</span></p>
                        <p>padding <span className="text-yellow-500">applies visually, does not push other lines</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline-block behavior */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-purple-500 text-[10px]">inline-block</Badge>
                  <div className="space-y-2">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <span className="bg-purple-500/20 border border-purple-500 px-3 py-2 rounded inline-block w-full">
                        <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400">
                          width <span className="text-emerald-500">works</span> | height <span className="text-emerald-500">works</span>
                        </span>
                      </span>
                    </div>
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-[9px] font-mono text-purple-600 dark:text-purple-400 space-y-0.5">
                        <p>margin (all) <span className="text-emerald-500">works</span></p>
                        <p>padding (all) <span className="text-emerald-500">works</span></p>
                        <p>line break <span className="text-red-500">no</span></p>
                        <p>vertical-align <span className="text-emerald-500">works</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {viewMode === "elements" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border p-4 space-y-2">
                  <Badge className="bg-blue-500 text-[10px]">Block Elements</Badge>
                  <div className="space-y-1">
                    {["<div>", "<p>", "<h1>-<h6>", "<section>", "<article>", "<header>", "<footer>", "<form>", "<ul>, <ol>", "<li>", "<table>", "<blockquote>"].map((el, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                        <code className="text-[10px] font-mono text-blue-600 dark:text-blue-400">{el}</code>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border p-4 space-y-2">
                  <Badge className="bg-emerald-500 text-[10px]">Inline Elements</Badge>
                  <div className="space-y-1">
                    {["<span>", "<a>", "<strong>", "<em>", "<code>", "<small>", "<br>", "<img>*", "<input>*", "<label>", "<abbr>", "<cite>"].map((el, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                        <code className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{el}</code>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground">* img and input are replaced inline elements (inline-block behavior)</p>
                </div>
                <div className="rounded-xl border p-4 space-y-2">
                  <Badge className="bg-purple-500 text-[10px]">Inline-Block Elements</Badge>
                  <div className="space-y-1">
                    {["<img> (replaced)", "<input> (replaced)", "<button>", "<select>", "<textarea>", "Any element with", "display: inline-block"].map((el, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                        <code className="text-[10px] font-mono text-purple-600 dark:text-purple-400">{el}</code>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[9px] text-muted-foreground">Replaced elements naturally behave as inline-block</p>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comparison Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Block</th>
                  <th className="text-left p-2">Inline</th>
                  <th className="text-left p-2">Inline-Block</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Starts on new line?", block: "Yes", inline: "No", ib: "No" },
                  { feature: "Takes full width?", block: "Yes (by default)", inline: "No (content only)", ib: "No (content only)" },
                  { feature: "Accepts width/height?", block: "Yes", inline: "No", ib: "Yes" },
                  { feature: "Horizontal margin?", block: "Yes", inline: "Yes", ib: "Yes" },
                  { feature: "Vertical margin?", block: "Yes", inline: "No", ib: "Yes" },
                  { feature: "Padding?", block: "Yes (all sides)", inline: "Visual only*", ib: "Yes (all sides)" },
                  { feature: "Can contain blocks?", block: "Yes", inline: "No", ib: "Yes" },
                  { feature: "vertical-align?", block: "No", inline: "Yes", ib: "Yes" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2">{row.block}</td>
                    <td className="p-2">{row.inline}</td>
                    <td className="p-2 text-muted-foreground">{row.ib}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-muted-foreground mt-2">* Inline padding applies visually but does not affect vertical spacing of surrounding lines.</p>
        </CardContent>
      </Card>

      {/* Code examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Code Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Block: nav links stacked vertically */
.sidebar-nav a {
  display: block;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

/* Inline: styling text within a paragraph */
.highlight {
  display: inline;
  background: yellow;
  font-weight: bold;
}`}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Inline-block: horizontal nav items
   with padding and dimensions */
.nav-item {
  display: inline-block;
  width: 120px;
  padding: 8px 16px;
  text-align: center;
  vertical-align: middle;
}

/* Common gotcha: whitespace gap
   between inline-block elements */
/* Fix: font-size: 0 on parent, or
   use flexbox instead */`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview tip */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Tip</CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border p-4 space-y-2">
            <p className="text-xs font-bold text-primary">Why does my inline element ignore width and height?</p>
            <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{`span {\n  width: 200px;   /* This does NOTHING */\n  height: 50px;   /* This does NOTHING */\n}\n\n/* Fix: change to inline-block or block */\nspan {\n  display: inline-block;\n  width: 200px;   /* Now it works! */\n  height: 50px;   /* Now it works! */\n}`}</div>
            <p className="text-[10px] text-muted-foreground">
              <strong>Key insight:</strong> Inline elements are designed for text flow. Their size is determined entirely by their content. To control dimensions, use <code className="text-primary">display: inline-block</code> or <code className="text-primary">display: block</code>.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
