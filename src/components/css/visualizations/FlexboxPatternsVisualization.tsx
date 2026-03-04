"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PatternTab = "navbar" | "holy-grail" | "card-grid" | "footer-bottom";

const patterns: {
  value: PatternTab;
  label: string;
  desc: string;
}[] = [
  { value: "navbar", label: "Navbar", desc: "Logo on the left, navigation links on the right with centered title." },
  { value: "holy-grail", label: "Holy Grail", desc: "Classic layout: header, footer, and three columns (sidebar, main, aside)." },
  { value: "card-grid", label: "Card Grid", desc: "Responsive card grid that wraps and adapts to screen width." },
  { value: "footer-bottom", label: "Sticky Footer", desc: "Footer always at the bottom, even when content is short." },
];

const codeExamples: Record<PatternTab, string> = {
  navbar: `/* Flexbox Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
}

.logo {
  flex: none; /* don't grow/shrink */
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 16px;
  list-style: none;
}

/* Variant: logo left, links center,
   actions right */
.navbar-v2 {
  display: flex;
  align-items: center;
}
.navbar-v2 .logo { flex: 1; }
.navbar-v2 .links { flex: 1;
  justify-content: center; }
.navbar-v2 .actions { flex: 1;
  justify-content: flex-end; }`,
  "holy-grail": `/* Holy Grail Layout */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header, .footer {
  flex: none; /* fixed height */
}

.body {
  display: flex;
  flex: 1; /* fill remaining */
}

.sidebar {
  flex: 0 0 200px; /* fixed width */
  order: -1; /* move to left */
}

.main {
  flex: 1; /* fill remaining */
}

.aside {
  flex: 0 0 150px; /* fixed width */
}

/* Responsive: stack on mobile */
@media (max-width: 768px) {
  .body { flex-direction: column; }
  .sidebar, .aside {
    flex-basis: auto;
  }
}`,
  "card-grid": `/* Responsive Card Grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 300px;
  /* Grow, shrink, min 300px.
     Cards wrap when they can't
     fit at 300px wide. */
}

/* Equal-width last row fix */
.card-grid::after {
  content: "";
  flex: 1 1 300px;
  /* Empty pseudo-element fills
     space so last row cards
     don't stretch too wide. */
}

/* Alternative: fixed columns */
.card-fixed {
  flex: 0 0 calc(33.333% - 16px);
  /* Exactly 3 columns with gap */
}`,
  "footer-bottom": `/* Sticky Footer */
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  flex: none;
  /* Fixed at top */
}

.main {
  flex: 1;
  /* Takes all available space.
     Pushes footer down even if
     content is short. */
}

.footer {
  flex: none;
  /* Stays at bottom */
}

/* That's it! The key is:
   - Column direction
   - min-height: 100vh on wrapper
   - flex: 1 on main content

   No absolute positioning,
   no calc(), no JS needed. */`,
};

export function FlexboxPatternsVisualization() {
  const [pattern, setPattern] = useState<PatternTab>("navbar");

  return (
    <div className="space-y-6">
      {/* Pattern selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Flexbox Layout Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            These are real-world layout patterns you will encounter in interviews and production code. Each uses flexbox to solve common layout challenges.
          </p>

          <div className="flex flex-wrap gap-2">
            {patterns.map((p) => (
              <button
                key={p.value}
                onClick={() => setPattern(p.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  pattern === p.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navbar pattern */}
      {pattern === "navbar" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Navbar Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{patterns[0].desc}</p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="rounded-xl border p-4 space-y-4">
                {/* Basic navbar */}
                <div className="space-y-2">
                  <Badge className="bg-blue-500 text-[10px]">Basic: space-between</Badge>
                  <div className="flex items-center justify-between border-2 border-dashed border-blue-400 rounded-lg px-3 py-2">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded px-3 py-1 text-[10px] font-bold"
                    >
                      Logo
                    </motion.div>
                    <div className="flex gap-2">
                      {["Home", "About", "Contact"].map((link, i) => (
                        <motion.div
                          key={link}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="bg-purple-500/20 border border-purple-500/40 rounded px-2 py-1 text-[9px] font-bold"
                        >
                          {link}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Three-section navbar */}
                <div className="space-y-2">
                  <Badge className="bg-emerald-500 text-[10px]">Three sections: flex: 1</Badge>
                  <div className="flex items-center border-2 border-dashed border-emerald-400 rounded-lg px-3 py-2">
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-emerald-500/20 border border-emerald-500/40 rounded px-2 py-1 text-[9px] font-bold w-fit"
                      >
                        Logo
                      </motion.div>
                    </div>
                    <div className="flex-1 flex justify-center gap-1">
                      {["Home", "Blog", "Docs"].map((link, i) => (
                        <motion.div
                          key={link}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="bg-emerald-500/20 border border-emerald-500/40 rounded px-2 py-1 text-[8px] font-bold"
                        >
                          {link}
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex-1 flex justify-end">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-emerald-500/20 border border-emerald-500/40 rounded px-2 py-1 text-[9px] font-bold"
                      >
                        Sign In
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Search bar navbar */}
                <div className="space-y-2">
                  <Badge className="bg-orange-500 text-[10px]">Search: flex-grow on input</Badge>
                  <div className="flex items-center gap-2 border-2 border-dashed border-orange-400 rounded-lg px-3 py-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-orange-500/20 border border-orange-500/40 rounded px-2 py-1 text-[9px] font-bold shrink-0"
                    >
                      Logo
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-orange-500/10 border border-orange-500/30 rounded px-2 py-1 text-[9px] text-muted-foreground flex-1"
                    >
                      Search...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-orange-500/20 border border-orange-500/40 rounded px-2 py-1 text-[9px] font-bold shrink-0"
                    >
                      Profile
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeExamples.navbar}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Holy Grail pattern */}
      {pattern === "holy-grail" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Holy Grail Layout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{patterns[1].desc}</p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="rounded-xl border p-4 space-y-3">
                {/* Holy grail visual */}
                <div className="flex flex-col border-2 border-dashed border-blue-400 rounded-lg overflow-hidden h-64">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-500/20 border-b border-blue-500/40 px-3 py-2 text-[10px] font-bold text-center"
                  >
                    Header (flex: none)
                  </motion.div>

                  {/* Body */}
                  <div className="flex flex-1 min-h-0">
                    {/* Sidebar */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-purple-500/20 border-r border-purple-500/40 px-2 py-2 text-[9px] font-bold w-20 flex items-center justify-center"
                    >
                      Sidebar
                    </motion.div>

                    {/* Main */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-emerald-500/10 flex-1 flex items-center justify-center px-2 py-2"
                    >
                      <span className="text-[10px] font-bold text-emerald-500">Main Content (flex: 1)</span>
                    </motion.div>

                    {/* Aside */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-orange-500/20 border-l border-orange-500/40 px-2 py-2 text-[9px] font-bold w-16 flex items-center justify-center"
                    >
                      Aside
                    </motion.div>
                  </div>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-500/20 border-t border-blue-500/40 px-3 py-2 text-[10px] font-bold text-center"
                  >
                    Footer (flex: none)
                  </motion.div>
                </div>

                <div className="space-y-1.5 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-blue-500/30 shrink-0" />
                    <span className="text-muted-foreground">Header/Footer: <code className="text-primary">flex: none</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-purple-500/30 shrink-0" />
                    <span className="text-muted-foreground">Sidebar: <code className="text-primary">flex: 0 0 200px</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-emerald-500/30 shrink-0" />
                    <span className="text-muted-foreground">Main: <code className="text-primary">flex: 1</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-orange-500/30 shrink-0" />
                    <span className="text-muted-foreground">Aside: <code className="text-primary">flex: 0 0 150px</code></span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeExamples["holy-grail"]}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Card Grid pattern */}
      {pattern === "card-grid" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Responsive Card Grid</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{patterns[2].desc}</p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="rounded-xl border p-4 space-y-3">
                <Badge className="bg-blue-500 text-[10px]">flex: 1 1 calc(33% - 16px)</Badge>

                <div className="flex flex-wrap gap-2 border-2 border-dashed border-blue-400 rounded-lg p-3">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <motion.div
                      key={n}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: n * 0.06 }}
                      className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-3 text-center"
                      style={{ flex: "1 1 calc(33% - 16px)", minWidth: "80px" }}
                    >
                      <div className="text-[10px] font-bold">Card {n}</div>
                      <div className="text-[8px] text-muted-foreground mt-1">Content here</div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-muted-foreground">
                    Cards automatically wrap to new rows. Each card has a minimum width but can grow to fill space.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-2">
                    <p className="text-[10px] text-muted-foreground">
                      <span className="font-bold text-primary">Tip:</span> Use <code className="text-[10px]">flex: 1 1 300px</code> for cards that wrap at a minimum of 300px.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeExamples["card-grid"]}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Footer at bottom pattern */}
      {pattern === "footer-bottom" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sticky Footer (Footer at Bottom)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{patterns[3].desc}</p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="rounded-xl border p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Short content */}
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[8px]">Short content</Badge>
                    <div className="flex flex-col border-2 border-dashed border-emerald-400 rounded-lg overflow-hidden h-48">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-blue-500/20 border-b border-blue-500/40 px-2 py-1.5 text-[8px] font-bold text-center"
                      >
                        Header
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 flex items-start justify-center px-2 pt-2"
                      >
                        <span className="text-[8px] text-muted-foreground">Short content</span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-emerald-500/20 border-t border-emerald-500/40 px-2 py-1.5 text-[8px] font-bold text-center"
                      >
                        Footer (stays at bottom)
                      </motion.div>
                    </div>
                  </div>

                  {/* Long content */}
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[8px]">Long content</Badge>
                    <div className="flex flex-col border-2 border-dashed border-emerald-400 rounded-lg overflow-hidden h-48">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-blue-500/20 border-b border-blue-500/40 px-2 py-1.5 text-[8px] font-bold text-center"
                      >
                        Header
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 px-2 py-2 overflow-hidden"
                      >
                        <span className="text-[7px] text-muted-foreground leading-tight block">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-emerald-500/20 border-t border-emerald-500/40 px-2 py-1.5 text-[8px] font-bold text-center"
                      >
                        Footer (pushed down)
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-2 space-y-1">
                  <p className="text-[10px] font-bold text-primary">The trick:</p>
                  <p className="text-[10px] text-muted-foreground">
                    flex-direction: column + min-height: 100vh on wrapper, and flex: 1 on the main content area. Footer stays at bottom no matter what.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeExamples["footer-bottom"]}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      )}

      {/* Interview Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Tips: Flexbox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[
              {
                q: "How do you center a div?",
                a: "display: flex; justify-content: center; align-items: center; on the parent. This is the modern, clean solution.",
              },
              {
                q: "Flexbox vs Grid: when to use which?",
                a: "Flexbox is one-dimensional (row OR column). Grid is two-dimensional (rows AND columns). Use flexbox for components (navbars, cards). Use grid for page layouts.",
              },
              {
                q: "How do you make equal-width columns?",
                a: "flex: 1 on each child (shorthand for flex: 1 1 0). This gives each item equal share of space regardless of content.",
              },
              {
                q: "How to make a sticky footer?",
                a: "Wrap page in a flex column with min-height: 100vh. Give main content flex: 1. Footer stays at bottom naturally.",
              },
              {
                q: "What's the difference between justify-content and align-items?",
                a: "justify-content works on the main axis; align-items works on the cross axis. The axes depend on flex-direction.",
              },
              {
                q: "How does flex-shrink work?",
                a: "When items overflow the container, flex-shrink determines how much each item should shrink. Default is 1 (can shrink). Set to 0 to prevent shrinking.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border p-3 space-y-1.5"
              >
                <p className="text-xs font-bold">{item.q}</p>
                <p className="text-[10px] text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick reference cheat sheet */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Flexbox Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-bold">Container Properties</p>
              <div className="space-y-1.5">
                {[
                  { prop: "display", vals: "flex | inline-flex" },
                  { prop: "flex-direction", vals: "row | column | *-reverse" },
                  { prop: "flex-wrap", vals: "nowrap | wrap | wrap-reverse" },
                  { prop: "justify-content", vals: "start | end | center | space-*" },
                  { prop: "align-items", vals: "stretch | start | end | center | baseline" },
                  { prop: "align-content", vals: "stretch | start | end | center | space-*" },
                  { prop: "gap", vals: "<length>" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <code className="text-primary font-bold w-28 shrink-0">{item.prop}</code>
                    <code className="text-muted-foreground">{item.vals}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-bold">Item Properties</p>
              <div className="space-y-1.5">
                {[
                  { prop: "flex-grow", vals: "0 (default) | <number>" },
                  { prop: "flex-shrink", vals: "1 (default) | <number>" },
                  { prop: "flex-basis", vals: "auto | <length> | 0" },
                  { prop: "flex", vals: "shorthand for grow shrink basis" },
                  { prop: "align-self", vals: "auto | stretch | start | end | center" },
                  { prop: "order", vals: "0 (default) | <integer>" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px]">
                    <code className="text-primary font-bold w-28 shrink-0">{item.prop}</code>
                    <code className="text-muted-foreground">{item.vals}</code>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 rounded-lg p-2 mt-3">
                <p className="text-[10px] text-muted-foreground">
                  <span className="font-bold text-primary">Pro tip:</span> Always use the <code className="text-[10px]">flex</code> shorthand instead of individual grow/shrink/basis properties.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
