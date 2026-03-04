"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UnitCategory = "absolute" | "font-relative" | "viewport";

const categories: { id: UnitCategory; label: string }[] = [
  { id: "absolute", label: "Absolute (px)" },
  { id: "font-relative", label: "Font Relative (em, rem)" },
  { id: "viewport", label: "Viewport (vw, vh, %)" },
];

const unitDetails: Record<UnitCategory, { units: { name: string; relative: string; use: string }[]; code: string }> = {
  absolute: {
    units: [
      { name: "px", relative: "Fixed — 1px = 1 device pixel (at 1x)", use: "Borders, shadows, small precise details" },
    ],
    code: `/* px — always the same size */\nborder: 1px solid #ccc;\nbox-shadow: 0 2px 4px rgba(0,0,0,0.1);\nfont-size: 16px;\n\n/* Precise, predictable, but\n   doesn't scale with user settings */`,
  },
  "font-relative": {
    units: [
      { name: "em", relative: "Parent element's font-size", use: "Component-scoped spacing (compounds when nested)" },
      { name: "rem", relative: "Root (<html>) font-size (default 16px)", use: "Typography, global spacing (no compounding)" },
    ],
    code: `/* rem — relative to root (16px) */\nh1 { font-size: 2rem; }    /* 32px */\np  { font-size: 1rem; }    /* 16px */\n\n/* em — relative to parent */\n.parent { font-size: 20px; }\n.child  { font-size: 1.5em; } /* 30px */\n\n/* ⚠️ em compounds when nested:\n   .child of .child = 1.5 × 30 = 45px */`,
  },
  viewport: {
    units: [
      { name: "vw", relative: "1% of viewport width", use: "Full-width sections, fluid typography" },
      { name: "vh", relative: "1% of viewport height", use: "Hero sections, full-screen layouts" },
      { name: "%", relative: "Parent element's dimension", use: "Fluid widths, responsive containers" },
    ],
    code: `/* vw/vh — relative to viewport */\n.hero {\n  height: 100vh;\n  width: 100vw;\n}\n\n/* % — relative to parent */\n.sidebar { width: 25%; }\n.main    { width: 75%; }\n\n/* Fluid font size */\nh1 { font-size: clamp(1.5rem, 4vw, 3rem); }`,
  },
};

export function CSSUnitsVisualization() {
  const [activeCategory, setActiveCategory] = useState<UnitCategory>("font-relative");
  const active = unitDetails[activeCategory];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Unit Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === c.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {active.units.map((u) => (
                <div key={u.name} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-primary font-bold">{u.name}</code>
                    <span className="text-[10px] text-muted-foreground">→ {u.relative}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-2"><strong>Use:</strong> {u.use}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Quick reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use Which Unit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Use Case</th>
                  <th className="text-left p-2">Recommended Unit</th>
                  <th className="text-left p-2">Why</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { use: "Font sizes", unit: "rem", why: "Scales with user preferences, no compounding" },
                  { use: "Spacing (padding, margin)", unit: "rem or px", why: "rem for scalable, px for precise" },
                  { use: "Borders & shadows", unit: "px", why: "Thin lines need exact pixel control" },
                  { use: "Container widths", unit: "% or max-width", why: "Fluid and responsive" },
                  { use: "Full-screen sections", unit: "vh / vw", why: "Always fills the viewport" },
                  { use: "Media queries", unit: "em or px", why: "em handles zoom better" },
                ].map((row) => (
                  <tr key={row.use} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.use}</td>
                    <td className="p-2"><code className="text-primary">{row.unit}</code></td>
                    <td className="p-2 text-muted-foreground">{row.why}</td>
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
