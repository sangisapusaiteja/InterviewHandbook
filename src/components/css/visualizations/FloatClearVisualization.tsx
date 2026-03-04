"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ViewTab = "float" | "clear" | "clearfix" | "modern";

export function FloatClearVisualization() {
  const [activeTab, setActiveTab] = useState<ViewTab>("float");

  return (
    <div className="space-y-6">
      {/* Main interactive card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Float and Clear</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code className="text-primary font-mono text-xs">float</code> property was originally designed for text wrapping around images. It was later adopted for page layouts, but has largely been replaced by Flexbox and Grid.
          </p>

          <div className="flex flex-wrap gap-2">
            {([
              { id: "float" as const, label: "Float Basics" },
              { id: "clear" as const, label: "Clear Property" },
              { id: "clearfix" as const, label: "Clearfix Hack" },
              { id: "modern" as const, label: "Legacy vs Modern" },
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
            {activeTab === "float" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 space-y-4">
                  <Badge className="bg-blue-500 text-[10px]">float: left</Badge>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="float-left w-16 h-16 bg-blue-500/20 border-2 border-blue-500 rounded-lg mr-3 mb-1 flex items-center justify-center">
                      <span className="text-[9px] font-mono text-blue-600 dark:text-blue-400 font-bold">float: left</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      This text wraps around the floated element. The floated box is taken out of normal flow but still affects inline content. Text and inline elements flow around it, creating the classic magazine-style layout. This is what float was originally designed for.
                    </p>
                  </div>

                  <Badge className="bg-orange-500 text-[10px]">float: right</Badge>
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="float-right w-16 h-16 bg-orange-500/20 border-2 border-orange-500 rounded-lg ml-3 mb-1 flex items-center justify-center">
                      <span className="text-[9px] font-mono text-orange-600 dark:text-orange-400 font-bold">float: right</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Same behavior but the element floats to the right side. Text wraps on the left. Floated elements are removed from the normal block flow, which means the parent container may collapse if it only contains floated children.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-2 space-y-1">
                    <p className="text-[10px] font-bold">Float behavior:</p>
                    <p className="text-[10px] text-muted-foreground">- Removed from normal block flow</p>
                    <p className="text-[10px] text-muted-foreground">- Inline content wraps around it</p>
                    <p className="text-[10px] text-muted-foreground">- Becomes a block-level box</p>
                    <p className="text-[10px] text-muted-foreground">- Parent may collapse (no height)</p>
                  </div>
                </div>

                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Float basics */
.image {
  float: left;     /* or right */
  margin-right: 16px;
  margin-bottom: 8px;
}

/* Text wraps around the floated image */
.text {
  /* No special CSS needed — text
     naturally flows around floats */
}

/* Float values: */
float: left;    /* float to the left */
float: right;   /* float to the right */
float: none;    /* default, no float */
float: inline-start; /* logical left */
float: inline-end;   /* logical right */

/* Important: floated elements become
   block-level boxes. Setting float on
   an inline element (like <span>)
   makes it behave as block. */`}
                </div>
              </div>
            )}

            {activeTab === "clear" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 space-y-4">
                  <Badge className="bg-emerald-500 text-[10px]">The Problem: Parent Collapse</Badge>
                  <div className="bg-muted/30 rounded-lg p-3 space-y-3">
                    <p className="text-[10px] font-bold text-red-500">Without clear:</p>
                    <div className="border-2 border-dashed border-red-300 dark:border-red-700 rounded-lg p-2 min-h-[20px]">
                      <div className="float-left w-14 h-14 bg-red-500/20 border border-red-500 rounded flex items-center justify-center mr-2">
                        <span className="text-[8px] font-mono text-red-500">float</span>
                      </div>
                      <div className="float-left w-14 h-14 bg-red-500/20 border border-red-500 rounded flex items-center justify-center">
                        <span className="text-[8px] font-mono text-red-500">float</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-red-400">Parent has 0 height! Children are floated out of flow.</p>
                  </div>

                  <div className="bg-muted/30 rounded-lg p-3 space-y-3">
                    <p className="text-[10px] font-bold text-emerald-500">With clear:</p>
                    <div className="border-2 border-emerald-500 rounded-lg p-2 overflow-hidden">
                      <div className="float-left w-14 h-14 bg-emerald-500/20 border border-emerald-500 rounded flex items-center justify-center mr-2">
                        <span className="text-[8px] font-mono text-emerald-500">float</span>
                      </div>
                      <div className="float-left w-14 h-14 bg-emerald-500/20 border border-emerald-500 rounded flex items-center justify-center">
                        <span className="text-[8px] font-mono text-emerald-500">float</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-emerald-400">Parent wraps around floated children correctly.</p>
                  </div>

                  <Badge className="bg-purple-500 text-[10px]">clear property values</Badge>
                  <div className="space-y-1">
                    {[
                      { value: "clear: left", desc: "Clears left floats only" },
                      { value: "clear: right", desc: "Clears right floats only" },
                      { value: "clear: both", desc: "Clears both left and right floats" },
                      { value: "clear: none", desc: "Default, no clearing" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <code className="text-[9px] font-mono text-primary font-bold w-24 shrink-0">{item.value}</code>
                        <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* The clear property */
.element-after-float {
  clear: both;
}
/* Forces element to start below
   any floated elements above it. */

/* Example: */
<div class="container">
  <div class="float-left">A</div>
  <div class="float-left">B</div>
  <div class="clear-both">
    I appear below the floats
  </div>
</div>

/* The "clearing div" pattern: */
<div class="container">
  <div class="float-left">A</div>
  <div class="float-left">B</div>
  <div style="clear: both"></div>
</div>
/* Empty div just to clear floats.
   This is considered bad practice
   (extra markup). Use clearfix or
   overflow: hidden instead. */`}
                </div>
              </div>
            )}

            {activeTab === "clearfix" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Method 1: Clearfix Hack",
                      badge: "bg-blue-500",
                      desc: "The classic clearfix using ::after pseudo-element. Most widely used method.",
                      code: `/* The clearfix hack */\n.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}\n\n/* Usage: */\n<div class="clearfix">\n  <div class="float-left">A</div>\n  <div class="float-left">B</div>\n</div>\n/* Parent now wraps floats */`,
                    },
                    {
                      title: "Method 2: overflow: hidden",
                      badge: "bg-emerald-500",
                      desc: "Creates a Block Formatting Context (BFC), which contains floats. Simpler but clips overflow.",
                      code: `/* overflow: hidden */\n.container {\n  overflow: hidden;\n}\n\n/* Creates a BFC, which\n   automatically contains\n   floated children.\n\n   Downside: clips any content\n   that overflows the container\n   (dropdowns, tooltips, etc.) */`,
                    },
                    {
                      title: "Method 3: display: flow-root",
                      badge: "bg-purple-500",
                      desc: "Modern solution. Creates a BFC specifically for containing floats. No side effects.",
                      code: `/* display: flow-root (modern) */\n.container {\n  display: flow-root;\n}\n\n/* Creates a BFC like overflow: hidden\n   but without clipping content.\n   This is the cleanest solution.\n\n   Browser support: all modern\n   browsers (IE not supported).\n\n   This is the RECOMMENDED method. */`,
                    },
                  ].map((method, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                      <Badge className={`${method.badge} text-[10px]`}>{method.title}</Badge>
                      <p className="text-[10px] text-muted-foreground">{method.desc}</p>
                      <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{method.code}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-xl border p-4">
                  <p className="text-xs font-bold text-primary mb-2">Clearing Methods Comparison</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Method</th>
                          <th className="text-left p-2">Extra HTML?</th>
                          <th className="text-left p-2">Side Effects?</th>
                          <th className="text-left p-2">Modern?</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { method: "Empty div clear:both", html: "Yes (bad)", side: "Extra markup", modern: "No" },
                          { method: "Clearfix ::after", html: "No", side: "None", modern: "Legacy" },
                          { method: "overflow: hidden", html: "No", side: "Clips overflow", modern: "OK" },
                          { method: "overflow: auto", html: "No", side: "May show scrollbar", modern: "OK" },
                          { method: "display: flow-root", html: "No", side: "None", modern: "Yes" },
                        ].map((row) => (
                          <tr key={row.method} className="border-b last:border-0">
                            <td className="p-2 font-semibold">{row.method}</td>
                            <td className="p-2">{row.html}</td>
                            <td className="p-2">{row.side}</td>
                            <td className="p-2 text-muted-foreground">{row.modern}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "modern" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border p-4 space-y-3">
                    <Badge className="bg-red-500 text-[10px]">Legacy: Float Layouts</Badge>
                    <p className="text-xs text-muted-foreground">Before Flexbox/Grid, developers used floats for multi-column layouts. This was fragile and hack-heavy.</p>

                    <div className="bg-muted/30 rounded-lg p-3 overflow-hidden">
                      <div className="float-left w-[30%] bg-red-500/10 border border-red-500/30 rounded p-2 mr-[2%]">
                        <p className="text-[9px] font-mono text-red-400">sidebar</p>
                        <p className="text-[9px] font-mono text-red-400">float: left</p>
                        <p className="text-[9px] font-mono text-red-400">width: 30%</p>
                      </div>
                      <div className="float-left w-[68%] bg-red-500/10 border border-red-500/30 rounded p-2">
                        <p className="text-[9px] font-mono text-red-400">main content</p>
                        <p className="text-[9px] font-mono text-red-400">float: left</p>
                        <p className="text-[9px] font-mono text-red-400">width: 68%</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {[
                        "Requires clearfix hacks",
                        "Fragile percentage calculations",
                        "No vertical centering",
                        "Source order = visual order",
                        "Equal-height columns are difficult",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-red-500 shrink-0 mt-0.5 text-[10px]">-</span>
                          <span className="text-[10px] text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border p-4 space-y-3">
                    <Badge className="bg-emerald-500 text-[10px]">Modern: Flexbox / Grid</Badge>
                    <p className="text-xs text-muted-foreground">Flexbox and Grid were designed specifically for layout. They solve all the problems floats had.</p>

                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="flex gap-2">
                        <div className="w-[30%] bg-emerald-500/10 border border-emerald-500/30 rounded p-2">
                          <p className="text-[9px] font-mono text-emerald-400">sidebar</p>
                          <p className="text-[9px] font-mono text-emerald-400">flex child</p>
                        </div>
                        <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded p-2">
                          <p className="text-[9px] font-mono text-emerald-400">main content</p>
                          <p className="text-[9px] font-mono text-emerald-400">flex: 1</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {[
                        "No clearfix needed",
                        "Automatic equal-height columns",
                        "Easy vertical/horizontal centering",
                        "Reorder with order property",
                        "Gap property for spacing",
                        "Responsive without media queries (fr units)",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 shrink-0 mt-0.5 text-[10px]">+</span>
                          <span className="text-[10px] text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Legacy: float layout */
.sidebar {
  float: left;
  width: 250px;
}
.main {
  margin-left: 270px; /* sidebar + gap */
}
.container::after {
  content: "";
  display: table;
  clear: both;
}`}
                  </div>
                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Modern: flexbox layout */
.container {
  display: flex;
  gap: 20px;
}
.sidebar {
  width: 250px;
  flex-shrink: 0;
}
.main {
  flex: 1;
}
/* That's it. No hacks needed. */`}
                  </div>
                </div>

                <div className="rounded-xl border p-4 space-y-2">
                  <Badge className="bg-blue-500 text-[10px]">When floats are still appropriate</Badge>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { use: "Text wrapping around images", desc: "The original purpose of float. Still the best tool for this." },
                      { use: "Drop caps", desc: "First letter of a paragraph, large and floated left." },
                      { use: "Pull quotes", desc: "Styled quotes floated to the side within article text." },
                      { use: "Legacy browser support", desc: "If you must support very old browsers without Flexbox." },
                    ].map((item, i) => (
                      <div key={i} className="rounded-lg bg-muted/30 p-2">
                        <p className="text-[10px] font-bold">{item.use}</p>
                        <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Interview questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                q: "What is a clearfix and why is it needed?",
                code: `.clearfix::after {\n  content: "";\n  display: table;\n  clear: both;\n}`,
                answer: "A clearfix is a CSS technique to make a parent container expand to contain its floated children. Without it, the parent collapses to zero height when all children are floated. The clearfix hack uses ::after to insert a clearing element. The modern alternative is display: flow-root.",
              },
              {
                q: "Why did developers stop using floats for layouts?",
                answer: "Floats were never designed for layouts — they were for text wrapping around images. Using them for layouts required hacks (clearfix, percentage calculations, negative margins). Flexbox and Grid are purpose-built for layout, offering alignment, equal heights, gap spacing, and reordering without hacks.",
              },
              {
                q: "What is a Block Formatting Context (BFC) and how does it relate to floats?",
                answer: "A BFC is an isolated rendering region where floats are contained. Elements like overflow: hidden, display: flow-root, and float itself create a BFC. A BFC contains floated children (preventing parent collapse), prevents margin collapsing with children, and does not overlap adjacent floats.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-bold text-primary">{item.q}</p>
                {"code" in item && item.code && (
                  <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                )}
                <p className="text-[10px] text-muted-foreground"><strong>Answer:</strong> {item.answer}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
