"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RowTab = "explicit" | "implicit" | "auto-rows" | "mixed";

const rowTabs: { key: RowTab; label: string }[] = [
  { key: "explicit", label: "Explicit Rows" },
  { key: "implicit", label: "Implicit Rows" },
  { key: "auto-rows", label: "grid-auto-rows" },
  { key: "mixed", label: "Mixed Sizing" },
];

export function GridTemplateRowsVisualization() {
  const [activeTab, setActiveTab] = useState<RowTab>("explicit");

  return (
    <div className="space-y-6">
      {/* Explicit vs Implicit Rows */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">grid-template-rows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Defines the height of rows in the grid. Rows you define are explicit; rows created automatically are implicit.
          </p>

          <div className="flex gap-1.5 flex-wrap">
            {rowTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual */}
            <div className="rounded-xl border p-4 space-y-3">
              {activeTab === "explicit" && (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Explicit Rows</Badge>
                  <p className="text-xs text-muted-foreground">
                    Explicitly defined rows have precise sizes you control. Items placed within these rows follow the sizing you set.
                  </p>
                  <div className="space-y-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      <div className="h-[40px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-blue-400 font-bold">60px</span>
                      </div>
                      <div className="h-[40px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-blue-400 font-bold">60px</span>
                      </div>
                      <div className="h-[40px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-blue-400 font-bold">60px</span>
                      </div>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      <div className="h-[80px] bg-emerald-500/20 border border-emerald-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-emerald-400 font-bold">100px</span>
                      </div>
                      <div className="h-[80px] bg-emerald-500/20 border border-emerald-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-emerald-400 font-bold">100px</span>
                      </div>
                      <div className="h-[80px] bg-emerald-500/20 border border-emerald-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-emerald-400 font-bold">100px</span>
                      </div>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      <div className="h-[40px] bg-purple-500/20 border border-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-purple-400 font-bold">60px</span>
                      </div>
                      <div className="h-[40px] bg-purple-500/20 border border-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-purple-400 font-bold">60px</span>
                      </div>
                      <div className="h-[40px] bg-purple-500/20 border border-purple-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-purple-400 font-bold">60px</span>
                      </div>
                    </motion.div>
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono pt-1">
                      <span>Row 1: 60px</span>
                      <span>Row 2: 100px</span>
                      <span>Row 3: 60px</span>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "implicit" && (
                <>
                  <Badge className="bg-orange-500 text-[10px]">Implicit Rows</Badge>
                  <p className="text-xs text-muted-foreground">
                    When more items exist than explicit rows can hold, the browser creates implicit rows automatically. Their size defaults to auto (content height).
                  </p>
                  <div className="space-y-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      <div className="h-[50px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-blue-400 font-bold">Explicit</span>
                      </div>
                      <div className="h-[50px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-blue-400 font-bold">Explicit</span>
                      </div>
                      <div className="h-[50px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-blue-400 font-bold">Explicit</span>
                      </div>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      <div className="h-auto bg-orange-500/20 border border-dashed border-orange-500 rounded-md p-2 flex items-center justify-center">
                        <span className="text-[10px] text-orange-400 font-bold">Implicit (auto)</span>
                      </div>
                      <div className="h-auto bg-orange-500/20 border border-dashed border-orange-500 rounded-md p-2 flex items-center justify-center">
                        <span className="text-[10px] text-orange-400 font-bold">Implicit (auto)</span>
                      </div>
                      <div className="h-auto bg-orange-500/20 border border-dashed border-orange-500 rounded-md p-2 flex items-center justify-center">
                        <span className="text-[10px] text-orange-400 font-bold">Implicit (auto)</span>
                      </div>
                    </motion.div>
                    <p className="text-[10px] text-muted-foreground">Dashed borders = implicit rows (auto-created by the browser)</p>
                  </div>
                </>
              )}

              {activeTab === "auto-rows" && (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">grid-auto-rows</Badge>
                  <p className="text-xs text-muted-foreground">
                    Controls the size of implicitly created rows. Without it, implicit rows are auto-sized (fit content). With it, you set a minimum height.
                  </p>
                  <div className="space-y-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      {[1, 2, 3].map((n, i) => (
                        <div key={i} className="h-[50px] bg-blue-500/20 border border-blue-500 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-blue-400 font-bold">Explicit</span>
                        </div>
                      ))}
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      {[4, 5, 6].map((n, i) => (
                        <div key={i} className="h-[50px] bg-emerald-500/20 border border-emerald-500 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-emerald-400 font-bold">100px min</span>
                        </div>
                      ))}
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-3 gap-1.5 origin-top">
                      {[7, 8, 9].map((n, i) => (
                        <div key={i} className="h-[50px] bg-emerald-500/20 border border-emerald-500 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-emerald-400 font-bold">100px min</span>
                        </div>
                      ))}
                    </motion.div>
                    <p className="text-[10px] text-muted-foreground">All implicit rows get the grid-auto-rows sizing</p>
                  </div>
                </>
              )}

              {activeTab === "mixed" && (
                <>
                  <Badge className="bg-cyan-500 text-[10px]">Mixed Sizing</Badge>
                  <p className="text-xs text-muted-foreground">
                    Combine fixed, auto, fr units, and minmax() for flexible row sizing. This is common in real layouts (fixed header, flexible content, fixed footer).
                  </p>
                  <div className="space-y-1.5 border-2 border-dashed border-muted rounded-lg overflow-hidden">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className="h-[35px] bg-purple-500/20 border-b border-purple-500 flex items-center justify-center origin-top">
                      <span className="text-[10px] text-purple-400 font-bold">auto (header fits content)</span>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.1 }} className="h-[80px] bg-blue-500/20 border-b border-blue-500 flex items-center justify-center origin-top">
                      <span className="text-[10px] text-blue-400 font-bold">1fr (main takes remaining space)</span>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2 }} className="h-[35px] bg-orange-500/20 flex items-center justify-center origin-top">
                      <span className="text-[10px] text-orange-400 font-bold">60px (fixed footer)</span>
                    </motion.div>
                  </div>
                </>
              )}
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeTab === "explicit"
                ? `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 60px 100px 60px;
  gap: 6px;
}

/* Explicit rows:
   Row 1: 60px tall
   Row 2: 100px tall
   Row 3: 60px tall

   Each row is precisely sized.
   Items stretch to fill. */`
                : activeTab === "implicit"
                ? `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px;
  /* Only 1 explicit row defined */
}

/* With 6 items in a 3-col grid:
   Row 1: 50px (explicit)
   Row 2: auto (implicit)

   Implicit rows default to auto
   = just tall enough for content */`
                : activeTab === "auto-rows"
                ? `.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px;
  grid-auto-rows: minmax(100px, auto);
  gap: 6px;
}

/* grid-auto-rows sets the size of
   rows NOT in grid-template-rows.

   minmax(100px, auto):
   - At least 100px tall
   - Grows if content is taller

   Common patterns:
   grid-auto-rows: 100px;
   grid-auto-rows: min-content;
   grid-auto-rows: minmax(80px, auto); */`
                : `.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr 60px;
  height: 100vh;
}

/* Classic full-page layout:
   Row 1: auto  (header)
   Row 2: 1fr   (main content)
   Row 3: 60px  (footer)

   The 1fr row expands to fill
   remaining vertical space.

   height: 100vh ensures the
   grid fills the viewport. */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Sizing keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Row Sizing Keywords</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {[
              { keyword: "auto", desc: "Sizes to fit the content. Expands as needed. This is the default for implicit rows.", color: "bg-blue-500" },
              { keyword: "min-content", desc: "Shrinks to the smallest size the content can be without overflow.", color: "bg-emerald-500" },
              { keyword: "max-content", desc: "Grows to the largest size the content needs (no wrapping).", color: "bg-purple-500" },
              { keyword: "fit-content(value)", desc: "Acts like max-content but clamps at the given value. fit-content(200px) means max 200px.", color: "bg-orange-500" },
              { keyword: "minmax(min, max)", desc: "Sets a range. The track is at least min and at most max. Most useful for responsive rows.", color: "bg-rose-500" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <span className={`w-2 h-2 rounded-full ${item.color} mt-1.5 shrink-0`} />
                <div>
                  <code className="text-[11px] text-primary font-bold font-mono">{item.keyword}</code>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Common row sizing patterns */

/* Fixed header + flexible content */
grid-template-rows: 64px 1fr;

/* Header + content + footer */
grid-template-rows: auto 1fr auto;

/* All rows at least 100px */
grid-auto-rows: minmax(100px, auto);

/* Repeating pattern */
grid-template-rows: repeat(3, 1fr);

/* Fit content with max */
grid-template-rows: fit-content(200px) 1fr;`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
