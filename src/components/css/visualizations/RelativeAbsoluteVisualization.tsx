"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViewTab = "comparison" | "ancestor" | "centering" | "patterns";

export function RelativeAbsoluteVisualization() {
  const [activeTab, setActiveTab] = useState<ViewTab>("comparison");

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Relative vs Absolute Positioning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([
              { id: "comparison" as const, label: "Side-by-Side" },
              { id: "ancestor" as const, label: "Positioned Ancestor" },
              { id: "centering" as const, label: "Centering Pattern" },
              { id: "patterns" as const, label: "Common Patterns" },
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
                {/* Relative */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-blue-500 text-[10px]">position: relative</Badge>
                  <p className="text-xs text-muted-foreground">Moves from its original position. The original space is preserved in the document flow.</p>

                  <div className="bg-muted/30 rounded-lg p-4 min-h-[160px]">
                    <div className="space-y-2">
                      <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element A</div>
                      <div className="relative h-12">
                        <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 p-2 rounded text-[10px] font-mono text-blue-300 dark:text-blue-700 opacity-40 absolute inset-0">Original spot (preserved)</div>
                        <div className="bg-blue-500/20 border-2 border-blue-500 p-2 rounded text-[10px] font-mono text-blue-600 dark:text-blue-400 absolute top-2 left-4">Shifted (top: 8px, left: 16px)</div>
                      </div>
                      <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element C (not affected)</div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2 space-y-1">
                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">Key points:</p>
                    <p className="text-[10px] text-muted-foreground">- Stays in document flow</p>
                    <p className="text-[10px] text-muted-foreground">- Original space is preserved</p>
                    <p className="text-[10px] text-muted-foreground">- Siblings are not affected</p>
                    <p className="text-[10px] text-muted-foreground">- Creates positioning context</p>
                  </div>
                </div>

                {/* Absolute */}
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-orange-500 text-[10px]">position: absolute</Badge>
                  <p className="text-xs text-muted-foreground">Removed from flow entirely. Positioned relative to the nearest positioned ancestor.</p>

                  <div className="bg-muted/30 rounded-lg p-4 min-h-[160px] relative">
                    <span className="text-[9px] text-muted-foreground absolute top-1 left-2">parent (position: relative)</span>
                    <div className="mt-4 space-y-2">
                      <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element A</div>
                      <div className="bg-zinc-500/20 border border-zinc-500 p-2 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Element C (moved up, no gap)</div>
                    </div>
                    <div className="absolute top-6 right-2 bg-orange-500/20 border-2 border-orange-500 p-2 rounded text-[10px] font-mono text-orange-600 dark:text-orange-400">Absolute (top:0, right:0)</div>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2 space-y-1">
                    <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400">Key points:</p>
                    <p className="text-[10px] text-muted-foreground">- Removed from document flow</p>
                    <p className="text-[10px] text-muted-foreground">- Siblings collapse into its space</p>
                    <p className="text-[10px] text-muted-foreground">- Needs a positioned parent</p>
                    <p className="text-[10px] text-muted-foreground">- Falls back to viewport if none</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ancestor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-red-500 text-[10px]">Bug: No Positioned Ancestor</Badge>
                  <p className="text-xs text-muted-foreground">Without a positioned ancestor, absolute elements position relative to the viewport.</p>

                  <div className="bg-muted/30 rounded-lg p-4 min-h-[140px] relative border-2 border-dashed border-red-300 dark:border-red-700">
                    <span className="text-[9px] text-red-400">viewport / html (fallback)</span>
                    <div className="mt-3 rounded-lg border border-zinc-300 dark:border-zinc-600 p-3">
                      <span className="text-[9px] text-muted-foreground">div (static - not a context!)</span>
                      <div className="mt-2 rounded border border-zinc-300 dark:border-zinc-600 p-2">
                        <span className="text-[9px] text-muted-foreground">inner div (also static)</span>
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 bg-red-500/20 border-2 border-red-500 px-2 py-1 rounded text-[9px] font-mono text-red-500">absolute child (goes to viewport!)</div>
                  </div>

                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* BUG: no positioned ancestor */
<div>                <!-- static -->
  <div>              <!-- static -->
    <span class="badge">  <!-- absolute -->
      Goes to viewport!
    </span>
  </div>
</div>`}
                  </div>
                </div>

                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-emerald-500 text-[10px]">Fix: Add position: relative</Badge>
                  <p className="text-xs text-muted-foreground">Adding position: relative to an ancestor creates the positioning context.</p>

                  <div className="bg-muted/30 rounded-lg p-4 min-h-[140px]">
                    <div className="rounded-lg border-2 border-emerald-500 p-3 relative">
                      <span className="text-[9px] text-emerald-500">div (position: relative) - context!</span>
                      <div className="mt-3 rounded border border-zinc-300 dark:border-zinc-600 p-2">
                        <span className="text-[9px] text-muted-foreground">inner div (static, irrelevant)</span>
                      </div>
                      <div className="absolute top-1 right-1 bg-emerald-500/20 border-2 border-emerald-500 px-2 py-1 rounded text-[9px] font-mono text-emerald-600 dark:text-emerald-400">badge (correct!)</div>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* FIX: add position: relative */
<div style="position: relative">
  <div>
    <span class="badge">
      Now relative to outer div!
    </span>
  </div>
</div>

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
}`}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "centering" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 space-y-3">
                  <Badge className="bg-purple-500 text-[10px]">Centering with Absolute + Transform</Badge>
                  <p className="text-xs text-muted-foreground">A classic interview pattern: center an element both horizontally and vertically using absolute positioning and transform.</p>

                  <div className="bg-muted/30 rounded-lg p-4 relative h-[160px] border-2 border-dashed border-purple-300 dark:border-purple-700">
                    <span className="text-[9px] text-purple-400 absolute top-1 left-2">parent (position: relative)</span>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500/20 border-2 border-purple-500 px-4 py-3 rounded-lg text-center">
                      <p className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">Perfectly Centered</p>
                      <p className="text-[9px] text-muted-foreground mt-1">top: 50% + left: 50%</p>
                      <p className="text-[9px] text-muted-foreground">transform: translate(-50%, -50%)</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      { step: "1", desc: "top: 50% moves the top edge to the center" },
                      { step: "2", desc: "left: 50% moves the left edge to the center" },
                      { step: "3", desc: "translate(-50%, -50%) shifts back by half its own size" },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-purple-500 text-white flex items-center justify-center text-[8px] font-bold shrink-0 mt-0.5">{item.step}</span>
                        <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Classic centering pattern */
.parent {
  position: relative;
  height: 400px;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Why this works:
   top/left: 50% positions the element's
   TOP-LEFT corner at the center.

   translate(-50%, -50%) shifts the
   element back by half its OWN
   width and height. */`}
                  </div>

                  <div className="rounded-xl border p-3 space-y-2">
                    <Badge className="bg-emerald-500 text-[10px]">Modern Alternative</Badge>
                    <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Modern: use flexbox instead */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

/* Or grid: */
.parent {
  display: grid;
  place-items: center;
  height: 400px;
}`}
                    </div>
                    <p className="text-[10px] text-muted-foreground">Flexbox/grid centering is simpler and preferred in modern CSS, but the absolute + transform pattern is essential interview knowledge.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "patterns" && (
              <div className="space-y-4">
                {[
                  {
                    title: "Notification Badge",
                    desc: "Badge on top-right corner of an icon or avatar",
                    code: `.avatar-wrapper {\n  position: relative;\n  display: inline-block;\n}\n\n.notification-badge {\n  position: absolute;\n  top: -4px;\n  right: -4px;\n  background: red;\n  color: white;\n  border-radius: 50%;\n  width: 18px;\n  height: 18px;\n  font-size: 11px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}`,
                  },
                  {
                    title: "Overlay / Image Caption",
                    desc: "Text overlay at the bottom of an image card",
                    code: `.card {\n  position: relative;\n  overflow: hidden;\n}\n\n.card img {\n  width: 100%;\n  display: block;\n}\n\n.card .overlay {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 16px;\n  background: linear-gradient(\n    transparent, rgba(0,0,0,0.8)\n  );\n  color: white;\n}`,
                  },
                  {
                    title: "Dropdown Menu",
                    desc: "Menu positioned below a trigger button",
                    code: `.dropdown {\n  position: relative;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;      /* below the trigger */\n  left: 0;\n  min-width: 200px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n  z-index: 1000;\n}`,
                  },
                ].map((pattern, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border p-4 space-y-2">
                      <p className="text-xs font-bold text-primary">{pattern.title}</p>
                      <p className="text-[10px] text-muted-foreground">{pattern.desc}</p>
                    </div>
                    <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{pattern.code}</div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Interview Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                q: "An absolutely positioned element is in the wrong place. What is likely wrong?",
                answer: "The most common cause is a missing positioned ancestor. When no ancestor has position: relative/absolute/fixed, the element positions relative to the viewport. Fix: add position: relative to the intended parent container.",
              },
              {
                q: "What happens to surrounding elements when you use position: absolute?",
                answer: "The absolutely positioned element is removed from the document flow. Surrounding elements collapse as if it does not exist, potentially causing layout overlap. This is unlike position: relative which preserves the original space.",
              },
              {
                q: "How do you center a div of unknown width and height?",
                answer: "Classic: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) on the child, with position: relative on the parent. Modern: display: flex; justify-content: center; align-items: center on the parent, or display: grid; place-items: center.",
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
