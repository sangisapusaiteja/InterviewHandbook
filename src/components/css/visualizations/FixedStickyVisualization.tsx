"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViewTab = "comparison" | "fixed-uses" | "sticky-uses" | "gotchas";

export function FixedStickyVisualization() {
  const [activeTab, setActiveTab] = useState<ViewTab>("comparison");

  return (
    <div className="space-y-6">
      {/* Main interactive card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fixed vs Sticky Positioning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Both <code className="text-primary font-mono text-xs">fixed</code> and <code className="text-primary font-mono text-xs">sticky</code> keep elements visible during scroll, but they behave very differently.
          </p>

          <div className="flex flex-wrap gap-2">
            {([
              { id: "comparison" as const, label: "Comparison" },
              { id: "fixed-uses" as const, label: "Fixed Uses" },
              { id: "sticky-uses" as const, label: "Sticky Uses" },
              { id: "gotchas" as const, label: "Gotchas" },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
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
          >
            {activeTab === "comparison" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fixed */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-red-500 text-[10px]">position: fixed</Badge>
                  <p className="text-xs text-muted-foreground">Always relative to the viewport. Removed from flow. Stays pinned regardless of scroll position.</p>

                  <div className="bg-muted/30 rounded-lg p-2 h-[180px] overflow-y-auto relative border-2 border-dashed border-red-300 dark:border-red-700">
                    <div className="sticky top-0 bg-red-500/20 border border-red-500 p-1.5 rounded text-[9px] font-mono text-red-600 dark:text-red-400 text-center z-10">Fixed navbar (always at top of viewport)</div>
                    <div className="mt-2 space-y-1.5">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="bg-zinc-500/10 p-1.5 rounded text-[9px] text-muted-foreground">Content row {i + 1} - scroll to test</div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2 space-y-1">
                    <p className="text-[10px] text-muted-foreground">- Removed from document flow</p>
                    <p className="text-[10px] text-muted-foreground">- Relative to viewport (browser window)</p>
                    <p className="text-[10px] text-muted-foreground">- Stays in same spot during all scrolling</p>
                    <p className="text-[10px] text-muted-foreground">- Needs z-index to stay above content</p>
                  </div>
                </div>

                {/* Sticky */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-purple-500 text-[10px]">position: sticky</Badge>
                  <p className="text-xs text-muted-foreground">Hybrid: acts as relative until scroll threshold, then sticks. Stays within its parent container.</p>

                  <div className="bg-muted/30 rounded-lg p-2 h-[180px] overflow-y-auto border-2 border-dashed border-purple-300 dark:border-purple-700">
                    <div className="space-y-1">
                      <div className="bg-zinc-500/10 p-1.5 rounded text-[9px] text-muted-foreground">Content above header</div>
                      <div className="sticky top-0 bg-purple-500/20 border border-purple-500 p-1.5 rounded text-[9px] font-mono text-purple-600 dark:text-purple-400 text-center z-10">Sticky header (sticks at top: 0)</div>
                      {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="bg-zinc-500/10 p-1.5 rounded text-[9px] text-muted-foreground">Content row {i + 1} - scroll to see sticky</div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2 space-y-1">
                    <p className="text-[10px] text-muted-foreground">- Stays in document flow</p>
                    <p className="text-[10px] text-muted-foreground">- Relative to scroll container</p>
                    <p className="text-[10px] text-muted-foreground">- Sticks only within its parent bounds</p>
                    <p className="text-[10px] text-muted-foreground">- Requires a threshold (top, bottom, etc.)</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fixed-uses" && (
              <div className="space-y-4">
                {[
                  {
                    title: "Fixed Navbar",
                    desc: "Navigation that stays at the top of the page regardless of scroll position",
                    code: `.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;        /* or width: 100% */\n  height: 64px;\n  background: white;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  z-index: 1000;\n}\n\n/* Important: add padding-top to body\n   to prevent content from hiding\n   behind the fixed navbar */\nbody {\n  padding-top: 64px;\n}`,
                  },
                  {
                    title: "Fixed Modal / Overlay",
                    desc: "Full-screen overlay that covers the viewport",
                    code: `.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;       /* covers entire viewport */\n  background: rgba(0, 0, 0, 0.5);\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal-content {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  max-width: 500px;\n  width: 90%;\n}`,
                  },
                  {
                    title: "Floating Action Button (FAB)",
                    desc: "Button fixed at bottom-right corner",
                    code: `.fab {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  background: #3b82f6;\n  color: white;\n  z-index: 1000;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n}`,
                  },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border p-4 space-y-2">
                      <p className="text-xs font-bold text-primary">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "sticky-uses" && (
              <div className="space-y-4">
                {[
                  {
                    title: "Sticky Table Headers",
                    desc: "Table column headers that stay visible while scrolling through rows",
                    code: `.table-container {\n  max-height: 400px;\n  overflow-y: auto;\n}\n\ntable thead th {\n  position: sticky;\n  top: 0;\n  background: white;\n  z-index: 10;\n  box-shadow: 0 1px 0 #e5e7eb;\n}\n\n/* Sticky headers only stick within\n   their scroll container */`,
                  },
                  {
                    title: "Sticky Sidebar",
                    desc: "Sidebar that sticks when scrolling but stops at its container boundary",
                    code: `.layout {\n  display: flex;\n}\n\n.sidebar {\n  position: sticky;\n  top: 80px;        /* below navbar */\n  height: fit-content;\n  align-self: flex-start;\n}\n\n.main-content {\n  flex: 1;\n}\n\n/* Sidebar sticks when user scrolls,\n   but stays within .layout bounds */`,
                  },
                  {
                    title: "Sticky Section Headers (iOS-style)",
                    desc: "Section headers that stick as you scroll through a list, replacing each other",
                    code: `.section-header {\n  position: sticky;\n  top: 0;\n  background: #f3f4f6;\n  padding: 8px 16px;\n  font-weight: bold;\n  z-index: 5;\n}\n\n/* Each header sticks until the next\n   section header pushes it away.\n   This is the iOS contacts-style\n   scroll behavior. */`,
                  },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border p-4 space-y-2">
                      <p className="text-xs font-bold text-primary">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "gotchas" && (
              <div className="space-y-4">
                {[
                  {
                    title: "Fixed broken by transform",
                    badge: "bg-red-500",
                    desc: "If any ancestor has transform, perspective, or filter, position: fixed behaves like position: absolute relative to that ancestor instead of the viewport.",
                    code: `/* This BREAKS fixed positioning! */\n.parent {\n  transform: translateZ(0);\n  /* or: filter: blur(0); */\n  /* or: perspective: 1000px; */\n}\n\n.child {\n  position: fixed;  /* now acts like absolute! */\n  top: 0;\n}\n\n/* The fixed child positions relative\n   to .parent instead of viewport. */`,
                  },
                  {
                    title: "Sticky needs a threshold",
                    badge: "bg-yellow-500",
                    desc: "position: sticky does nothing without at least one of: top, bottom, left, or right. This is the most common reason sticky appears broken.",
                    code: `/* BROKEN: no threshold */\n.header {\n  position: sticky;\n  /* Missing top/bottom! Does nothing. */\n}\n\n/* FIXED: add threshold */\n.header {\n  position: sticky;\n  top: 0;  /* sticks when reaching top */\n}`,
                  },
                  {
                    title: "Sticky + overflow: hidden",
                    badge: "bg-red-500",
                    desc: "If any ancestor between the sticky element and its scroll container has overflow: hidden, auto, or scroll, sticky will not work as expected.",
                    code: `/* BROKEN: overflow on ancestor */\n.wrapper {\n  overflow: hidden; /* kills sticky! */\n}\n\n.wrapper .header {\n  position: sticky;\n  top: 0;\n  /* Sticky confined to .wrapper,\n     which is not the scroll container */\n}\n\n/* FIX: remove overflow from ancestors\n   between sticky element and scroll\n   container */`,
                  },
                  {
                    title: "Fixed needs width",
                    badge: "bg-yellow-500",
                    desc: "Fixed elements are taken out of flow and lose their inherited width. You must explicitly set width.",
                    code: `/* BROKEN: no width */\n.navbar {\n  position: fixed;\n  top: 0;\n  /* No width — shrinks to content! */\n}\n\n/* FIXED: set explicit width */\n.navbar {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;  /* stretches full width */\n  /* or: width: 100%; */\n}`,
                  },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border p-4 space-y-2">
                      <Badge className={`${item.badge} text-[10px]`}>{item.title}</Badge>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fixed vs Sticky Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Fixed</th>
                  <th className="text-left p-2">Sticky</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "In document flow?", fixed: "No", sticky: "Yes" },
                  { feature: "Relative to", fixed: "Viewport", sticky: "Scroll container" },
                  { feature: "Scroll behavior", fixed: "Always pinned", sticky: "Pins after threshold" },
                  { feature: "Stays within parent?", fixed: "No (viewport only)", sticky: "Yes (parent bounds)" },
                  { feature: "Needs threshold?", fixed: "No (just offsets)", sticky: "Yes (top/bottom required)" },
                  { feature: "Needs z-index?", fixed: "Usually yes", sticky: "Often yes" },
                  { feature: "Affected by transform?", fixed: "Yes (breaks it)", sticky: "No" },
                  { feature: "Browser support", fixed: "All browsers", sticky: "All modern browsers" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2">{row.fixed}</td>
                    <td className="p-2 text-muted-foreground">{row.sticky}</td>
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
                q: "What is the difference between position: fixed and position: sticky?",
                answer: "Fixed is always relative to the viewport and removed from flow. Sticky is a hybrid: it acts like relative positioning until a scroll threshold is reached, then sticks like fixed, but only within its parent container. Sticky stays in the document flow.",
              },
              {
                q: "Why is my position: sticky not working?",
                answer: "Common causes: (1) Missing threshold - you need top, bottom, left, or right. (2) An ancestor has overflow: hidden/auto/scroll. (3) The parent container has no scrollable height. (4) The sticky element is the only child (nothing to scroll past).",
              },
              {
                q: "When would you choose fixed over sticky?",
                answer: "Use fixed for elements that must always be visible regardless of scroll position (modals, floating buttons, cookie banners). Use sticky for elements that should stick within a section (table headers, sidebar nav, section headers in a list).",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-bold text-primary">{item.q}</p>
                <p className="text-[10px] text-muted-foreground"><strong>Answer:</strong> {item.answer}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
