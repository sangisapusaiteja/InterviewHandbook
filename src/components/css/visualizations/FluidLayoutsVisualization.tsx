"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FluidConcept = "percentage" | "clamp" | "spacing" | "container";

const concepts: { id: FluidConcept; label: string }[] = [
  { id: "percentage", label: "Percentage Widths" },
  { id: "clamp", label: "Fluid Typography" },
  { id: "spacing", label: "Fluid Spacing" },
  { id: "container", label: "Max-Width Container" },
];

const clampExamples = [
  { property: "Font size (heading)", code: "font-size: clamp(1.5rem, 4vw, 3rem);", min: "24px", preferred: "4% of viewport", max: "48px" },
  { property: "Font size (body)", code: "font-size: clamp(1rem, 2.5vw, 1.25rem);", min: "16px", preferred: "2.5% of viewport", max: "20px" },
  { property: "Line height", code: "line-height: clamp(1.4, 1.2 + 0.5vw, 1.8);", min: "1.4", preferred: "scales with vw", max: "1.8" },
];

export function FluidLayoutsVisualization() {
  const [activeConcept, setActiveConcept] = useState<FluidConcept>("percentage");

  return (
    <div className="space-y-6">
      {/* Concept selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Fluid Layout Techniques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Fluid layouts scale smoothly between breakpoints instead of jumping. No media queries needed for basic scaling.
          </p>

          <div className="flex flex-wrap gap-2">
            {concepts.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveConcept(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeConcept === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeConcept}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Explanation panel */}
            <div className="rounded-xl border p-4 space-y-3">
              {activeConcept === "percentage" && (
                <>
                  <Badge className="bg-blue-500 text-[10px]">Classic Fluid</Badge>
                  <p className="text-xs text-muted-foreground">
                    Percentage-based widths create layouts that stretch and shrink with the viewport. The parent container determines the reference size.
                  </p>
                  {/* Visual demo */}
                  <div className="space-y-2 rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] font-semibold">Parent container (100%)</p>
                    <div className="border border-dashed border-primary/40 rounded p-2 space-y-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "25%" }}
                        transition={{ duration: 0.5 }}
                        className="h-5 bg-blue-500/30 border border-blue-500 rounded flex items-center px-1"
                      >
                        <span className="text-[9px] text-blue-700 dark:text-blue-400 font-bold whitespace-nowrap">25%</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "50%" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-5 bg-emerald-500/30 border border-emerald-500 rounded flex items-center px-1"
                      >
                        <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">50%</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-5 bg-purple-500/30 border border-purple-500 rounded flex items-center px-1"
                      >
                        <span className="text-[9px] text-purple-700 dark:text-purple-400 font-bold whitespace-nowrap">75%</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-5 bg-orange-500/30 border border-orange-500 rounded flex items-center px-1"
                      >
                        <span className="text-[9px] text-orange-700 dark:text-orange-400 font-bold whitespace-nowrap">100%</span>
                      </motion.div>
                    </div>
                  </div>
                </>
              )}
              {activeConcept === "clamp" && (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">Modern Fluid</Badge>
                  <p className="text-xs text-muted-foreground">
                    <code className="text-primary">clamp(min, preferred, max)</code> creates fluid values that scale smoothly between a minimum and maximum.
                  </p>
                  <div className="space-y-2">
                    {clampExamples.map((ex, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="rounded-lg bg-muted/50 p-2 space-y-1"
                      >
                        <p className="text-[10px] font-semibold">{ex.property}</p>
                        <code className="text-[10px] text-primary block">{ex.code}</code>
                        <div className="flex gap-3 text-[9px] text-muted-foreground">
                          <span>Min: {ex.min}</span>
                          <span>Preferred: {ex.preferred}</span>
                          <span>Max: {ex.max}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
              {activeConcept === "spacing" && (
                <>
                  <Badge className="bg-purple-500 text-[10px]">Fluid Spacing</Badge>
                  <p className="text-xs text-muted-foreground">
                    Apply clamp() to padding, margin, and gap for spacing that scales proportionally without breakpoints.
                  </p>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <p className="text-[10px] font-semibold">Common fluid spacing pattern:</p>
                      <p className="text-[10px] text-muted-foreground">1. Use clamp() for padding and gap</p>
                      <p className="text-[10px] text-muted-foreground">2. Define a spacing scale with CSS custom properties</p>
                      <p className="text-[10px] text-muted-foreground">3. Space increases smoothly from mobile to desktop</p>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <p className="text-[10px] font-semibold">Benefits:</p>
                      <p className="text-[10px] text-muted-foreground">-- No media queries for spacing</p>
                      <p className="text-[10px] text-muted-foreground">-- Consistent proportions at every viewport</p>
                      <p className="text-[10px] text-muted-foreground">-- Less CSS to maintain</p>
                    </div>
                  </div>
                </>
              )}
              {activeConcept === "container" && (
                <>
                  <Badge className="bg-orange-500 text-[10px]">Layout Pattern</Badge>
                  <p className="text-xs text-muted-foreground">
                    The max-width container pattern creates a centered content area that is fluid on small screens and constrained on large screens.
                  </p>
                  {/* Visual demo */}
                  <div className="space-y-2 rounded-lg bg-muted/50 p-3">
                    <p className="text-[10px] font-semibold">Viewport (full width)</p>
                    <div className="border border-dashed border-muted-foreground/30 rounded p-2">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mx-auto bg-primary/10 border border-primary/40 rounded p-2 max-w-[75%]"
                      >
                        <p className="text-[9px] text-primary font-bold text-center">max-width container</p>
                        <p className="text-[8px] text-muted-foreground text-center">Centered with auto margins</p>
                      </motion.div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">On narrow screens: 100% width. On wide screens: max-width kicks in, content stays centered.</p>
                  </div>
                </>
              )}
            </div>

            {/* Code block */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeConcept === "percentage"
                ? `/* Percentage-based fluid grid */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.col-quarter { width: 25%; }
.col-half    { width: 50%; }
.col-third   { width: 33.333%; }
.col-full    { width: 100%; }

/* Account for gap with calc() */
.col-half {
  width: calc(50% - 8px);
}

/* Modern: use flexbox or grid */
.grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}
/* Auto-fit + minmax = fluid grid
   that wraps without media queries */`
                : activeConcept === "clamp"
                ? `/* Fluid typography with clamp() */
/* clamp(minimum, preferred, maximum) */

:root {
  --fs-sm: clamp(0.875rem, 1.5vw, 1rem);
  --fs-base: clamp(1rem, 2.5vw, 1.25rem);
  --fs-lg: clamp(1.25rem, 3vw, 1.75rem);
  --fs-xl: clamp(1.5rem, 4vw, 2.5rem);
  --fs-2xl: clamp(2rem, 5vw, 3.5rem);
}

h1 { font-size: var(--fs-2xl); }
h2 { font-size: var(--fs-xl); }
h3 { font-size: var(--fs-lg); }
p  { font-size: var(--fs-base); }
small { font-size: var(--fs-sm); }

/* No media queries needed!
   Font scales smoothly between
   min and max values */`
                : activeConcept === "spacing"
                ? `/* Fluid spacing scale */
:root {
  --space-xs: clamp(0.25rem, 0.5vw, 0.5rem);
  --space-sm: clamp(0.5rem, 1vw, 0.75rem);
  --space-md: clamp(1rem, 2vw, 1.5rem);
  --space-lg: clamp(1.5rem, 3vw, 2.5rem);
  --space-xl: clamp(2rem, 5vw, 4rem);
}

/* Usage */
.section {
  padding: var(--space-xl) var(--space-md);
}

.card {
  padding: var(--space-md);
  gap: var(--space-sm);
}

.stack > * + * {
  margin-top: var(--space-md);
}

/* Fluid gap in grid */
.grid {
  display: grid;
  gap: clamp(12px, 2vw, 24px);
}`
                : `/* Max-width container pattern */
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: clamp(16px, 4vw, 48px);
  padding-right: clamp(16px, 4vw, 48px);
}

/* Multiple container sizes */
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1200px; }

/* Full-bleed inside container */
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

/* Tailwind equivalent */
<div class="max-w-5xl mx-auto px-4
            md:px-8 lg:px-12">
  ...
</div>`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* auto-fit vs auto-fill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">auto-fit vs auto-fill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">auto-fit</Badge>
              <p className="text-[10px] text-muted-foreground">
                Collapses empty tracks and stretches items to fill available space. Items expand when there is room.
              </p>
              <code className="text-[10px] text-primary block">grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));</code>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-blue-500 text-[10px]">auto-fill</Badge>
              <p className="text-[10px] text-muted-foreground">
                Keeps empty tracks, items stay at min size even if space is available. Empty columns remain as placeholders.
              </p>
              <code className="text-[10px] text-primary block">grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));</code>
            </motion.div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">Use <strong>auto-fit</strong> when you want items to stretch. Use <strong>auto-fill</strong> when you want consistent column sizes.</p>
        </CardContent>
      </Card>

      {/* Interview reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Question</th>
                  <th className="text-left p-2">Key Answer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { q: "What is clamp()?", a: "clamp(min, preferred, max) -- value scales with preferred but never goes below min or above max" },
                  { q: "Fluid layout without media queries?", a: "Use grid with auto-fit + minmax(), clamp() for typography/spacing, percentages for widths" },
                  { q: "auto-fit vs auto-fill?", a: "auto-fit stretches items to fill space; auto-fill keeps empty tracks at min size" },
                  { q: "What is the container pattern?", a: "width: 100%; max-width: 1200px; margin: 0 auto; with fluid padding via clamp()" },
                ].map((row) => (
                  <tr key={row.q} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.q}</td>
                    <td className="p-2 text-muted-foreground">{row.a}</td>
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
