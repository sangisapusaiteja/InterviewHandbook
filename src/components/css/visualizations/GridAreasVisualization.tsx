"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LayoutTab = "basic" | "sidebar" | "holy-grail" | "responsive";

const layoutTabs: { key: LayoutTab; label: string }[] = [
  { key: "basic", label: "Basic Layout" },
  { key: "sidebar", label: "With Sidebar" },
  { key: "holy-grail", label: "Holy Grail" },
  { key: "responsive", label: "Responsive" },
];

const areaColors: Record<string, { bg: string; border: string; text: string }> = {
  header: { bg: "bg-blue-500/20", border: "border-blue-500", text: "text-blue-400" },
  sidebar: { bg: "bg-purple-500/20", border: "border-purple-500", text: "text-purple-400" },
  main: { bg: "bg-emerald-500/20", border: "border-emerald-500", text: "text-emerald-400" },
  footer: { bg: "bg-orange-500/20", border: "border-orange-500", text: "text-orange-400" },
  nav: { bg: "bg-cyan-500/20", border: "border-cyan-500", text: "text-cyan-400" },
  aside: { bg: "bg-rose-500/20", border: "border-rose-500", text: "text-rose-400" },
};

export function GridAreasVisualization() {
  const [layoutTab, setLayoutTab] = useState<LayoutTab>("basic");

  return (
    <div className="space-y-6">
      {/* Named grid areas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">grid-template-areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Name regions of your grid with ASCII-art-like syntax. Then assign items to areas using grid-area. This creates readable, maintainable layouts.
          </p>

          <div className="flex gap-1.5 flex-wrap">
            {layoutTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setLayoutTab(tab.key)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                  layoutTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={layoutTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual layout */}
            <div className="rounded-xl border p-4 space-y-3">
              {layoutTab === "basic" && (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Header / Main / Footer</Badge>
                  <p className="text-xs text-muted-foreground">
                    Simplest named-area layout. Header spans full width, main fills the center, footer at bottom.
                  </p>
                  <div className="space-y-1.5 border-2 border-dashed border-muted-foreground/20 rounded-lg overflow-hidden p-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className={`${areaColors.header.bg} border ${areaColors.header.border} rounded-md p-3 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.header.text}`}>header</span>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.1 }} className={`${areaColors.main.bg} border ${areaColors.main.border} rounded-md p-8 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.main.text}`}>main</span>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2 }} className={`${areaColors.footer.bg} border ${areaColors.footer.border} rounded-md p-3 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.footer.text}`}>footer</span>
                    </motion.div>
                  </div>
                </>
              )}

              {layoutTab === "sidebar" && (
                <>
                  <Badge className="bg-purple-500 text-[10px]">Sidebar Layout</Badge>
                  <p className="text-xs text-muted-foreground">
                    Header spans all columns. Sidebar sits left, main content right. Footer spans full width.
                  </p>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg overflow-hidden p-1.5 space-y-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className={`${areaColors.header.bg} border ${areaColors.header.border} rounded-md p-2.5 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.header.text}`}>header</span>
                    </motion.div>
                    <div className="flex gap-1.5">
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 }} className={`w-[30%] ${areaColors.sidebar.bg} border ${areaColors.sidebar.border} rounded-md p-6 text-center origin-left`}>
                        <span className={`text-[10px] font-bold ${areaColors.sidebar.text}`}>sidebar</span>
                      </motion.div>
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.15 }} className={`flex-1 ${areaColors.main.bg} border ${areaColors.main.border} rounded-md p-6 text-center origin-left`}>
                        <span className={`text-[10px] font-bold ${areaColors.main.text}`}>main</span>
                      </motion.div>
                    </div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.25 }} className={`${areaColors.footer.bg} border ${areaColors.footer.border} rounded-md p-2.5 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.footer.text}`}>footer</span>
                    </motion.div>
                  </div>
                </>
              )}

              {layoutTab === "holy-grail" && (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">Holy Grail Layout</Badge>
                  <p className="text-xs text-muted-foreground">
                    The classic &quot;holy grail&quot; layout: header, footer, sidebar left, aside right, main content center.
                  </p>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg overflow-hidden p-1.5 space-y-1.5">
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className={`${areaColors.header.bg} border ${areaColors.header.border} rounded-md p-2 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.header.text}`}>header</span>
                    </motion.div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.05 }} className={`${areaColors.nav.bg} border ${areaColors.nav.border} rounded-md p-1.5 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.nav.text}`}>nav</span>
                    </motion.div>
                    <div className="flex gap-1.5">
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 }} className={`w-[22%] ${areaColors.sidebar.bg} border ${areaColors.sidebar.border} rounded-md p-4 text-center origin-left`}>
                        <span className={`text-[10px] font-bold ${areaColors.sidebar.text}`}>sidebar</span>
                      </motion.div>
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.15 }} className={`flex-1 ${areaColors.main.bg} border ${areaColors.main.border} rounded-md p-4 text-center origin-left`}>
                        <span className={`text-[10px] font-bold ${areaColors.main.text}`}>main</span>
                      </motion.div>
                      <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }} className={`w-[22%] ${areaColors.aside.bg} border ${areaColors.aside.border} rounded-md p-4 text-center origin-left`}>
                        <span className={`text-[10px] font-bold ${areaColors.aside.text}`}>aside</span>
                      </motion.div>
                    </div>
                    <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 }} className={`${areaColors.footer.bg} border ${areaColors.footer.border} rounded-md p-2 text-center origin-top`}>
                      <span className={`text-[10px] font-bold ${areaColors.footer.text}`}>footer</span>
                    </motion.div>
                  </div>
                </>
              )}

              {layoutTab === "responsive" && (
                <>
                  <Badge className="bg-rose-500 text-[10px]">Responsive Areas</Badge>
                  <p className="text-xs text-muted-foreground">
                    Change grid-template-areas at different breakpoints. On mobile, stack everything. On desktop, use sidebar layout.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground text-center">Mobile</p>
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-1 space-y-1">
                        {["header", "sidebar", "main", "footer"].map((area, i) => (
                          <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: i * 0.08 }} className={`${areaColors[area].bg} border ${areaColors[area].border} rounded p-1.5 text-center origin-top`}>
                            <span className={`text-[10px] font-bold ${areaColors[area].text}`}>{area}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground text-center">Desktop</p>
                      <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-1 space-y-1">
                        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} className={`${areaColors.header.bg} border ${areaColors.header.border} rounded p-1.5 text-center origin-top`}>
                          <span className={`text-[10px] font-bold ${areaColors.header.text}`}>header</span>
                        </motion.div>
                        <div className="flex gap-1">
                          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 }} className={`w-[35%] ${areaColors.sidebar.bg} border ${areaColors.sidebar.border} rounded p-3 text-center origin-left`}>
                            <span className={`text-[10px] font-bold ${areaColors.sidebar.text}`}>side</span>
                          </motion.div>
                          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.15 }} className={`flex-1 ${areaColors.main.bg} border ${areaColors.main.border} rounded p-3 text-center origin-left`}>
                            <span className={`text-[10px] font-bold ${areaColors.main.text}`}>main</span>
                          </motion.div>
                        </div>
                        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.25 }} className={`${areaColors.footer.bg} border ${areaColors.footer.border} rounded p-1.5 text-center origin-top`}>
                          <span className={`text-[10px] font-bold ${areaColors.footer.text}`}>footer</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {layoutTab === "basic"
                ? `.container {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

header  { grid-area: header; }
main    { grid-area: main; }
footer  { grid-area: footer; }

/* Each string = one row.
   Each word = a named area.
   Items use grid-area to
   place themselves. */`
                : layoutTab === "sidebar"
                ? `.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
  gap: 8px;
}

header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }

/* "header header" spans 2 cols
   "sidebar main" = side-by-side
   "footer footer" spans 2 cols */`
                : layoutTab === "holy-grail"
                ? `.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows:
    auto auto 1fr auto;
  grid-template-areas:
    "header  header  header"
    "nav     nav     nav"
    "sidebar main    aside"
    "footer  footer  footer";
  min-height: 100vh;
  gap: 8px;
}

header   { grid-area: header; }
nav      { grid-area: nav; }
.sidebar { grid-area: sidebar; }
main     { grid-area: main; }
aside    { grid-area: aside; }
footer   { grid-area: footer; }`
                : `/* Mobile: single column */
.container {
  display: grid;
  grid-template-areas:
    "header"
    "sidebar"
    "main"
    "footer";
  grid-template-rows:
    auto auto 1fr auto;
}

/* Desktop: sidebar layout */
@media (min-width: 768px) {
  .container {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
    grid-template-rows:
      auto 1fr auto;
  }
}

/* Same HTML, different layouts!
   Only CSS changes per breakpoint. */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* grid-area property */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The grid-area Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            grid-area can be used in two ways: as a name reference for template areas, or as a shorthand for grid-row and grid-column.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-blue-500 text-[10px]">Named Reference</Badge>
              <p className="text-[10px] text-muted-foreground">
                When grid-template-areas is defined on the container, use grid-area to place an item into a named region.
              </p>
              <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Name-based placement */
.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}`}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-purple-500 text-[10px]">Line-Based Shorthand</Badge>
              <p className="text-[10px] text-muted-foreground">
                grid-area can also specify exact line positions: row-start / column-start / row-end / column-end.
              </p>
              <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Line-based placement */
.item {
  grid-area: 1 / 1 / 3 / 4;
  /* row-start / col-start /
     row-end   / col-end   */
}`}
              </div>
            </motion.div>
          </div>

          {/* Dot syntax for empty cells */}
          <div className="rounded-xl border p-4 space-y-3">
            <Badge variant="outline" className="text-[10px]">Tip: Empty Cells</Badge>
            <p className="text-xs text-muted-foreground">
              Use a dot (<code className="text-primary font-mono">.</code>) in grid-template-areas to leave a cell empty.
            </p>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`grid-template-areas:
  "header header header"
  "sidebar main  ."
  "footer  footer footer";

/* The dot (.) leaves the cell
   at row 2, column 3 empty.

   Multiple dots also work:
   "sidebar main ..."
   All dots in a row = one empty cell */`}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
