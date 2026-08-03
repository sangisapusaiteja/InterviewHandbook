"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ClampSection = "syntax" | "typography" | "spacing" | "comparison";

const sections: { id: ClampSection; label: string }[] = [
  { id: "syntax", label: "Syntax" },
  { id: "typography", label: "Fluid Typography" },
  { id: "spacing", label: "Fluid Spacing" },
  { id: "comparison", label: "min() / max()" },
];

const sectionDetails: Record<
  ClampSection,
  { points: { title: string; desc: string }[]; code: string }
> = {
  syntax: {
    points: [
      {
        title: "clamp(MIN, PREFERRED, MAX)",
        desc: "Three arguments: the minimum value, the preferred/ideal value, and the maximum value.",
      },
      {
        title: "Equivalent Logic",
        desc: "clamp(min, val, max) equals max(MIN, min(VAL, MAX)). The value stays within bounds.",
      },
      {
        title: "Mixed Units Allowed",
        desc: "Each argument can use a different unit: rem, vw, px, %, etc.",
      },
      {
        title: "No JavaScript Needed",
        desc: "The browser evaluates clamp() in real-time as the viewport changes.",
      },
    ],
    code: `/* clamp(MIN, PREFERRED, MAX) */
.element {
  /* Never smaller than 1rem,
     never larger than 3rem,
     ideally 5vw */
  font-size: clamp(1rem, 5vw, 3rem);
}

/* Equivalent long-form */
.element {
  font-size: max(1rem, min(5vw, 3rem));
}

/* The preferred value is fluid */
/* When viewport is narrow → MIN wins */
/* When viewport is wide   → MAX wins */
/* In between              → PREFERRED */

/* Works with calc() too */
.box {
  width: clamp(
    200px,
    calc(50% - 2rem),
    800px
  );
}`,
  },
  typography: {
    points: [
      {
        title: "Fluid Font Sizes",
        desc: "Font scales smoothly from small screens to large, no media queries needed.",
      },
      {
        title: "The Formula",
        desc: "clamp(minSize, base + scaleFactor * vw, maxSize) provides a linear scale.",
      },
      {
        title: "Accessibility",
        desc: "Using rem for min/max respects user's browser font-size preferences.",
      },
      {
        title: "Heading Scale",
        desc: "Apply different clamp() values for h1-h6 to create a responsive type scale.",
      },
    ],
    code: `/* Fluid typography system */
:root {
  --fs-sm:  clamp(0.8rem, 0.17vw + 0.76rem, 0.9rem);
  --fs-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
  --fs-lg:  clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
  --fs-xl:  clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
  --fs-2xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
  --fs-3xl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
}

body { font-size: var(--fs-base); }
h1   { font-size: var(--fs-3xl); }
h2   { font-size: var(--fs-2xl); }
h3   { font-size: var(--fs-xl); }
h4   { font-size: var(--fs-lg); }

/* Simple approach */
h1 { font-size: clamp(1.5rem, 2.5vw + 1rem, 3rem); }
p  { font-size: clamp(1rem, 1vw + 0.75rem, 1.25rem); }`,
  },
  spacing: {
    points: [
      {
        title: "Fluid Padding / Margin",
        desc: "Spacing grows on larger screens without abrupt media-query jumps.",
      },
      {
        title: "Fluid Widths",
        desc: "clamp(minWidth, preferred, maxWidth) creates naturally responsive containers.",
      },
      {
        title: "Gap in Grid/Flex",
        desc: "Use clamp() in gap property for fluid spacing between items.",
      },
      {
        title: "Section Spacing",
        desc: "Vertical rhythm that adapts: clamp(2rem, 5vw, 6rem) between page sections.",
      },
    ],
    code: `/* Fluid container */
.container {
  width: clamp(320px, 90%, 1200px);
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 3rem);
}

/* Fluid section spacing */
section {
  padding-block: clamp(2rem, 5vw, 6rem);
}

/* Fluid grid gaps */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.5rem, 2vw, 2rem);
}

/* Fluid margin for readability */
.article {
  max-width: clamp(45ch, 60%, 75ch);
  margin-inline: auto;
}`,
  },
  comparison: {
    points: [
      {
        title: "min(a, b)",
        desc: "Returns the smaller value. Use when you want a maximum cap: min(100%, 800px).",
      },
      {
        title: "max(a, b)",
        desc: "Returns the larger value. Use when you want a minimum floor: max(50%, 300px).",
      },
      {
        title: "clamp() = max + min",
        desc: "clamp(a, b, c) is shorthand for max(a, min(b, c)). Use when you need both bounds.",
      },
      {
        title: "Multiple Arguments",
        desc: "min() and max() accept more than 2 arguments: min(100%, 80vw, 1200px).",
      },
    ],
    code: `/* min() — picks the smallest */
.card {
  width: min(100%, 600px);
  /* 100% on small screens,
     600px cap on large */
}

/* max() — picks the largest */
.sidebar {
  width: max(250px, 25%);
  /* At least 250px,
     grows with viewport */
}

/* clamp() — both bounds */
.container {
  width: clamp(320px, 80%, 1200px);
  /* min: 320px
     preferred: 80%
     max: 1200px */
}

/* Multiple args in min/max */
.hero {
  height: min(100vh, 800px, 50vw);
}

/* Combining functions */
.box {
  padding: max(1rem, min(3vw, 2rem));
}`,
  },
};

export function ClampFunctionVisualization() {
  const [activeSection, setActiveSection] = useState<ClampSection>("syntax");
  const [viewportWidth, setViewportWidth] = useState(800);
  const active = sectionDetails[activeSection];

  // Simulate clamp behavior for the demo
  const minFont = 16;
  const maxFont = 48;
  const preferredFont = viewportWidth * 0.04;
  const clampedFont = Math.max(minFont, Math.min(preferredFont, maxFont));

  const activeLabel =
    clampedFont <= minFont ? "MIN" : clampedFont >= maxFont ? "MAX" : "PREFERRED";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The clamp() Function</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSection === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {active.points.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-1"
                >
                  <code className="text-sm text-primary font-bold">{p.title}</code>
                  <p className="text-[10px] text-muted-foreground ml-2">{p.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Interactive clamp demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Interactive: clamp(1rem, 4vw, 3rem)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold">Simulated Viewport:</label>
            <input
              type="range"
              min={300}
              max={1600}
              value={viewportWidth}
              onChange={(e) => setViewportWidth(Number(e.target.value))}
              className="flex-1"
            />
            <Badge variant="outline" className="text-[10px] font-mono">
              {viewportWidth}px
            </Badge>
          </div>

          <div className="rounded-xl border p-5 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={activeLabel === "MIN" ? "default" : "outline"}
                className="text-[10px]"
              >
                MIN: {minFont}px
              </Badge>
              <Badge
                variant={activeLabel === "PREFERRED" ? "default" : "outline"}
                className="text-[10px]"
              >
                PREFERRED: 4vw = {Math.round(preferredFont)}px
              </Badge>
              <Badge
                variant={activeLabel === "MAX" ? "default" : "outline"}
                className="text-[10px]"
              >
                MAX: {maxFont}px
              </Badge>
            </div>

            <motion.p
              animate={{ fontSize: clampedFont }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="font-bold leading-tight"
            >
              {Math.round(clampedFont)}px &mdash; {activeLabel} wins
            </motion.p>

            {/* Visual bar showing clamp range */}
            <div className="relative h-6 rounded-full bg-muted overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-red-500/20 border-r border-red-500"
                style={{ width: `${(minFont / maxFont) * 100}%` }}
              />
              <div
                className="absolute right-0 top-0 h-full bg-blue-500/20 border-l border-blue-500"
                style={{
                  width: `${((maxFont - maxFont) / maxFont) * 100 + 1}%`,
                }}
              />
              <motion.div
                animate={{
                  left: `${((clampedFont - minFont) / (maxFont - minFont)) * 100}%`,
                }}
                className="absolute top-0 h-full w-1 bg-emerald-500 rounded"
              />
            </div>
            <div className="flex justify-between text-[9px] text-muted-foreground font-mono">
              <span>{minFont}px (min)</span>
              <span>{maxFont}px (max)</span>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
            {`/* Viewport: ${viewportWidth}px */\nfont-size: clamp(1rem, 4vw, 3rem);\n/* 4vw = ${Math.round(preferredFont)}px */\n/* Result: ${Math.round(clampedFont)}px (${activeLabel}) */`}
          </div>
        </CardContent>
      </Card>

      {/* Quick reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use Which</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Function</th>
                  <th className="text-left p-2">Use Case</th>
                  <th className="text-left p-2">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    fn: "clamp()",
                    use: "Value with both lower and upper bounds",
                    ex: "clamp(1rem, 3vw, 2rem)",
                  },
                  {
                    fn: "min()",
                    use: "Value that should not exceed a maximum",
                    ex: "min(100%, 800px)",
                  },
                  {
                    fn: "max()",
                    use: "Value that should not go below a minimum",
                    ex: "max(300px, 50%)",
                  },
                  {
                    fn: "calc()",
                    use: "Mixed-unit arithmetic without bounds",
                    ex: "calc(100% - 2rem)",
                  },
                ].map((row) => (
                  <tr key={row.fn} className="border-b last:border-0">
                    <td className="p-2 font-bold font-mono text-primary">{row.fn}</td>
                    <td className="p-2 text-muted-foreground">{row.use}</td>
                    <td className="p-2">
                      <code className="text-[11px] text-primary">{row.ex}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
