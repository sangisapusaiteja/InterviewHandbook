"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type QueryType = "width" | "orientation" | "color-scheme" | "print";

const queryTabs: { id: QueryType; label: string }[] = [
  { id: "width", label: "Width-Based" },
  { id: "orientation", label: "Orientation" },
  { id: "color-scheme", label: "Color Scheme" },
  { id: "print", label: "Print" },
];

const queryDetails: Record<QueryType, { desc: string; examples: { label: string; code: string }[]; fullCode: string }> = {
  width: {
    desc: "The most common media queries target viewport width to adapt layouts across devices.",
    examples: [
      { label: "min-width", code: "@media (min-width: 768px)" },
      { label: "max-width", code: "@media (max-width: 767px)" },
      { label: "range (Level 4)", code: "@media (768px <= width <= 1024px)" },
    ],
    fullCode: `/* Min-width: styles apply 768px+ */
@media (min-width: 768px) {
  .sidebar { display: block; }
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Max-width: styles apply below 768px */
@media (max-width: 767px) {
  .nav { flex-direction: column; }
}

/* Modern range syntax (Level 4) */
@media (768px <= width <= 1024px) {
  .container { padding: 24px; }
}`,
  },
  orientation: {
    desc: "Detect whether the device is in portrait or landscape mode.",
    examples: [
      { label: "portrait", code: "@media (orientation: portrait)" },
      { label: "landscape", code: "@media (orientation: landscape)" },
    ],
    fullCode: `/* Portrait — taller than wide */
@media (orientation: portrait) {
  .gallery {
    grid-template-columns: 1fr;
  }
}

/* Landscape — wider than tall */
@media (orientation: landscape) {
  .gallery {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .hero {
    height: 100vh;
  }
}`,
  },
  "color-scheme": {
    desc: "Respond to the user's OS-level dark/light mode preference.",
    examples: [
      { label: "dark mode", code: "@media (prefers-color-scheme: dark)" },
      { label: "light mode", code: "@media (prefers-color-scheme: light)" },
      { label: "reduced motion", code: "@media (prefers-reduced-motion: reduce)" },
    ],
    fullCode: `/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a;
    --text: #ededed;
  }
}

/* Light mode */
@media (prefers-color-scheme: light) {
  :root {
    --bg: #ffffff;
    --text: #171717;
  }
}

/* Respect motion preferences */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}`,
  },
  print: {
    desc: "Style pages specifically for printing. Hides navigation, adjusts colors for paper.",
    examples: [
      { label: "print", code: "@media print" },
      { label: "screen only", code: "@media screen" },
    ],
    fullCode: `/* Print styles */
@media print {
  nav, footer, .no-print {
    display: none;
  }

  body {
    font-size: 12pt;
    color: #000;
    background: #fff;
  }

  a::after {
    content: " (" attr(href) ")";
    font-size: 10pt;
  }
}`,
  },
};

const combiningExamples = [
  { label: "AND", code: "@media (min-width: 768px) and (orientation: landscape)", desc: "Both conditions must be true" },
  { label: "OR (comma)", code: "@media (max-width: 480px), (orientation: portrait)", desc: "Either condition can be true" },
  { label: "NOT", code: "@media not print", desc: "Negates the entire query" },
  { label: "Combined", code: "@media screen and (min-width: 768px) and (max-width: 1024px)", desc: "Screens between 768px and 1024px" },
];

export function MediaQueriesVisualization() {
  const [activeTab, setActiveTab] = useState<QueryType>("width");
  const active = queryDetails[activeTab];

  return (
    <div className="space-y-6">
      {/* Syntax overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Media Query Syntax</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`@media (condition) {
  /* CSS rules applied when
     condition is true */
  selector {
    property: value;
  }
}`}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Media queries let you apply CSS rules conditionally based on the device or viewport characteristics. They are the backbone of responsive design.
          </p>
        </CardContent>
      </Card>

      {/* Interactive query types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Media Query Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {queryTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-xs text-muted-foreground">{active.desc}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4 space-y-3">
                <p className="text-xs font-semibold">Common Patterns</p>
                {active.examples.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2"
                  >
                    <Badge variant="outline" className="text-[10px] shrink-0">{ex.label}</Badge>
                    <code className="text-[10px] text-primary font-mono">{ex.code}</code>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {active.fullCode}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Combining conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Combining Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {combiningExamples.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-lg border p-3 space-y-1"
            >
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500 text-[10px]">{item.label}</Badge>
                <code className="text-[10px] text-primary font-mono">{item.code}</code>
              </div>
              <p className="text-[10px] text-muted-foreground ml-1">{item.desc}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Common patterns quick reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Media Query Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Responsive navigation */
@media (max-width: 768px) {
  .nav { display: none; }
  .hamburger { display: block; }
}

/* High-DPI / Retina displays */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .logo { background-image: url(logo@2x.png); }
}

/* Hover-capable devices only */
@media (hover: hover) {
  .card:hover { transform: scale(1.02); }
}

/* Touch devices (no hover) */
@media (hover: none) {
  .tooltip { display: none; }
}`}
          </div>
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
                  { q: "What is a media query?", a: "A CSS rule that conditionally applies styles based on device/viewport characteristics" },
                  { q: "How do you combine conditions?", a: "and (both true), comma/or (either true), not (negate)" },
                  { q: "min-width vs max-width?", a: "min-width = mobile-first (styles apply above), max-width = desktop-first (styles apply below)" },
                  { q: "What is @media (hover: hover)?", a: "Targets devices with a hover-capable pointer (mouse), not touch screens" },
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
