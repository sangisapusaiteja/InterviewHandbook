"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type OverflowType = "visible" | "hidden" | "scroll" | "auto" | "clip";

const overflowData: { id: OverflowType; label: string; description: string; color: string }[] = [
  { id: "visible", label: "visible", description: "Default. Content overflows the box and is visible outside its bounds.", color: "bg-blue-500" },
  { id: "hidden", label: "hidden", description: "Content is clipped at the box edge. No scrollbar. Programmatic scroll still works.", color: "bg-red-500" },
  { id: "scroll", label: "scroll", description: "Always shows scrollbars, even if content fits. Content is scrollable.", color: "bg-emerald-500" },
  { id: "auto", label: "auto", description: "Scrollbars appear only when content overflows. Most common choice.", color: "bg-purple-500" },
  { id: "clip", label: "clip", description: "Like hidden, but also prevents programmatic scrolling. Truly clips content.", color: "bg-orange-500" },
];

const codeExamples: Record<OverflowType, string> = {
  visible: `/* overflow: visible (default) */
.box {
  width: 200px;
  height: 100px;
  overflow: visible;
}

/* Content spills outside the box.
   This is the default behavior.
   The overflowing content is still
   visible and interactive. */

/* Careful: overflowing content can
   overlap with other elements! */`,
  hidden: `/* overflow: hidden */
.box {
  width: 200px;
  height: 100px;
  overflow: hidden;
}

/* Content is clipped at the boundary.
   No scrollbar is provided.

   But you CAN still scroll via JS:
   element.scrollTop = 50;

   Common uses:
   - Text truncation
   - Clearing floats (legacy)
   - Preventing content bleed */`,
  scroll: `/* overflow: scroll */
.box {
  width: 200px;
  height: 100px;
  overflow: scroll;
}

/* Always shows scrollbars, even if
   content fits inside the box.

   On macOS, scrollbars may be hidden
   by default (system setting).

   Use overflow-x/overflow-y to
   control each axis separately:
   overflow-x: scroll;
   overflow-y: hidden; */`,
  auto: `/* overflow: auto (recommended) */
.box {
  width: 200px;
  height: 100px;
  overflow: auto;
}

/* Scrollbars appear ONLY when needed.
   This is usually the best choice.

   Behaves like 'visible' when content
   fits, and like 'scroll' when it
   overflows.

   Most common for scrollable containers,
   code blocks, and chat windows. */`,
  clip: `/* overflow: clip (newer) */
.box {
  width: 200px;
  height: 100px;
  overflow: clip;
}

/* Like hidden, but stricter:
   - No programmatic scrolling
   - Can use overflow-clip-margin
     to extend the clip area

   Does NOT create a scroll container
   (unlike hidden/scroll/auto).

   Browser support: all modern browsers
   (Chrome 90+, Firefox 81+, Safari 16+) */`,
};

export function OverflowVisualization() {
  const [activeOverflow, setActiveOverflow] = useState<OverflowType>("visible");

  return (
    <div className="space-y-6">
      {/* Main interactive card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overflow Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code className="text-primary font-mono text-xs">overflow</code> property controls what happens when content is too large for its container.
          </p>

          <div className="flex flex-wrap gap-2">
            {overflowData.map((ov) => (
              <button
                key={ov.id}
                onClick={() => setActiveOverflow(ov.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeOverflow === ov.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {ov.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeOverflow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual demo */}
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={`${overflowData.find((o) => o.id === activeOverflow)?.color} text-[10px]`}>
                  overflow: {activeOverflow}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {overflowData.find((o) => o.id === activeOverflow)?.description}
              </p>

              <div className="bg-muted/30 rounded-lg p-6 min-h-[180px]">
                <div className="relative">
                  <div
                    className="w-full max-w-[200px] h-[100px] border-2 border-primary rounded-lg p-2 mx-auto bg-background"
                    style={{
                      overflow: activeOverflow === "clip" ? "hidden" : activeOverflow,
                    }}
                  >
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      This is a long paragraph of text that deliberately overflows the container boundary. It keeps going and going to demonstrate exactly how the overflow property affects content that does not fit within its container box. More text follows here to ensure we have enough content to overflow in all cases for this demonstration.
                    </p>
                  </div>
                  {activeOverflow === "visible" && (
                    <p className="text-[9px] text-red-400 text-center mt-12">Content overflows past the box boundary</p>
                  )}
                  {activeOverflow === "hidden" && (
                    <p className="text-[9px] text-red-400 text-center mt-2">Content is clipped (but JS can still scroll)</p>
                  )}
                  {activeOverflow === "scroll" && (
                    <p className="text-[9px] text-emerald-400 text-center mt-2">Scrollbar always visible</p>
                  )}
                  {activeOverflow === "auto" && (
                    <p className="text-[9px] text-purple-400 text-center mt-2">Scrollbar appears only when needed</p>
                  )}
                  {activeOverflow === "clip" && (
                    <p className="text-[9px] text-orange-400 text-center mt-2">Strictly clipped, no scroll at all</p>
                  )}
                </div>
              </div>
            </div>

            {/* Code example */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {codeExamples[activeOverflow]}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* overflow-x vs overflow-y */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">overflow-x vs overflow-y</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-blue-500 text-[10px]">Independent Axis Control</Badge>
              <p className="text-xs text-muted-foreground">You can control horizontal and vertical overflow separately.</p>

              <div className="space-y-3">
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="text-[10px] font-bold mb-2">Horizontal scroll only:</p>
                  <div className="w-full h-[60px] border-2 border-blue-400 rounded overflow-x-auto overflow-y-hidden bg-background p-2">
                    <div className="whitespace-nowrap">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        This is a very long line of text that will cause horizontal scrolling. It just keeps going and going and going without wrapping.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="text-[10px] font-bold mb-2">Vertical scroll only:</p>
                  <div className="w-full h-[60px] border-2 border-emerald-400 rounded overflow-x-hidden overflow-y-auto bg-background p-2">
                    <p className="text-[10px] font-mono text-muted-foreground">Line 1: vertical overflow</p>
                    <p className="text-[10px] font-mono text-muted-foreground">Line 2: content keeps going</p>
                    <p className="text-[10px] font-mono text-muted-foreground">Line 3: scrollable vertically</p>
                    <p className="text-[10px] font-mono text-muted-foreground">Line 4: but not horizontally</p>
                    <p className="text-[10px] font-mono text-muted-foreground">Line 5: more content here</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Horizontal scroll only */
.horizontal-scroll {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;  /* prevent wrap */
}

/* Vertical scroll only */
.vertical-scroll {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 300px;
}

/* Shorthand: overflow: x y */
.box {
  overflow: hidden auto;
  /* overflow-x: hidden
     overflow-y: auto */
}

/* Common gotcha:
   Setting one axis to hidden and
   the other to visible actually
   makes 'visible' behave as 'auto'.
   This is per the CSS spec. */`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text truncation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Text Truncation with Overflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-purple-500 text-[10px]">Single-Line Ellipsis</Badge>
              <div className="space-y-2">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-[10px] font-bold mb-1">Without truncation:</p>
                  <div className="border border-zinc-300 dark:border-zinc-600 rounded p-2 w-48">
                    <p className="text-[10px] text-muted-foreground">This is a very long text that overflows the container and wraps to multiple lines</p>
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-[10px] font-bold mb-1">With truncation:</p>
                  <div className="border border-purple-400 rounded p-2 w-48">
                    <p className="text-[10px] text-muted-foreground truncate">This is a very long text that overflows the container and should be truncated with an ellipsis</p>
                  </div>
                </div>
              </div>

              <Badge className="bg-orange-500 text-[10px]">Multi-Line Clamp</Badge>
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-[10px] font-bold mb-1">Clamped to 2 lines:</p>
                <div className="border border-orange-400 rounded p-2 w-48">
                  <p className="text-[10px] text-muted-foreground line-clamp-2">This is a long paragraph that will be clamped to exactly two lines with an ellipsis at the end. Any content beyond two lines is hidden.</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Single-line truncation (3 properties) */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* All THREE are required:
   overflow: hidden  → clips the text
   text-overflow: ellipsis → adds "..."
   white-space: nowrap → prevents wrap */

/* Multi-line clamp */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tailwind shorthand: */
/* truncate → single line */
/* line-clamp-2 → multi-line */

/* Interview tip: text-overflow only
   works with overflow: hidden.
   It does nothing on its own! */`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overflow Values Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Content Clipped?</th>
                  <th className="text-left p-2">Scrollbar?</th>
                  <th className="text-left p-2">JS Scroll?</th>
                  <th className="text-left p-2">Creates BFC?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { value: "visible", clipped: "No", scrollbar: "No", js: "N/A", bfc: "No" },
                  { value: "hidden", clipped: "Yes", scrollbar: "No", js: "Yes", bfc: "Yes" },
                  { value: "scroll", clipped: "Yes", scrollbar: "Always", js: "Yes", bfc: "Yes" },
                  { value: "auto", clipped: "When needed", scrollbar: "When needed", js: "Yes", bfc: "Yes" },
                  { value: "clip", clipped: "Yes", scrollbar: "No", js: "No", bfc: "No" },
                ].map((row) => (
                  <tr key={row.value} className="border-b last:border-0">
                    <td className="p-2 font-mono font-bold text-primary">{row.value}</td>
                    <td className="p-2">{row.clipped}</td>
                    <td className="p-2">{row.scrollbar}</td>
                    <td className="p-2">{row.js}</td>
                    <td className="p-2 text-muted-foreground">{row.bfc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[9px] text-muted-foreground mt-2">BFC = Block Formatting Context. overflow: hidden/scroll/auto create a new BFC, which affects margin collapsing and float containment.</p>
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
                q: "How do you create a single-line text truncation with ellipsis?",
                code: `.truncate {\n  overflow: hidden;         /* clip the text */\n  text-overflow: ellipsis;  /* show ... */\n  white-space: nowrap;      /* prevent wrapping */\n}\n/* All three properties are required. */`,
                answer: "You need three properties working together: overflow: hidden to clip, text-overflow: ellipsis to show the '...' indicator, and white-space: nowrap to keep text on a single line.",
              },
              {
                q: "What is the difference between overflow: hidden and overflow: clip?",
                answer: "Both clip content at the container boundary. The difference is that overflow: hidden still allows programmatic scrolling (via JavaScript scrollTop/scrollLeft), while overflow: clip prevents scrolling entirely. Also, hidden creates a Block Formatting Context (BFC) while clip does not.",
              },
              {
                q: "When should you use overflow: auto vs overflow: scroll?",
                answer: "Use auto when you want scrollbars to appear only when content actually overflows (the most common case). Use scroll when you always want scrollbars visible, even if content fits, to prevent layout shift when content changes size.",
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
