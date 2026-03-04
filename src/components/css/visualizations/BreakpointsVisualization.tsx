"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BreakpointSystem = "common" | "tailwind" | "bootstrap";

const systems: { id: BreakpointSystem; label: string }[] = [
  { id: "common", label: "Common Breakpoints" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "bootstrap", label: "Bootstrap" },
];

const breakpointData: Record<BreakpointSystem, { name: string; value: string; target: string; color: string }[]> = {
  common: [
    { name: "xs", value: "320px", target: "Small phones", color: "bg-rose-500" },
    { name: "sm", value: "480px", target: "Large phones", color: "bg-orange-500" },
    { name: "md", value: "768px", target: "Tablets", color: "bg-yellow-500" },
    { name: "lg", value: "1024px", target: "Small desktops / landscape tablets", color: "bg-emerald-500" },
    { name: "xl", value: "1200px", target: "Desktops", color: "bg-blue-500" },
    { name: "2xl", value: "1440px", target: "Large desktops", color: "bg-purple-500" },
  ],
  tailwind: [
    { name: "sm", value: "640px", target: "Small devices", color: "bg-orange-500" },
    { name: "md", value: "768px", target: "Tablets", color: "bg-yellow-500" },
    { name: "lg", value: "1024px", target: "Laptops", color: "bg-emerald-500" },
    { name: "xl", value: "1280px", target: "Desktops", color: "bg-blue-500" },
    { name: "2xl", value: "1536px", target: "Large desktops", color: "bg-purple-500" },
  ],
  bootstrap: [
    { name: "sm", value: "576px", target: "Landscape phones", color: "bg-orange-500" },
    { name: "md", value: "768px", target: "Tablets", color: "bg-yellow-500" },
    { name: "lg", value: "992px", target: "Desktops", color: "bg-emerald-500" },
    { name: "xl", value: "1200px", target: "Large desktops", color: "bg-blue-500" },
    { name: "xxl", value: "1400px", target: "Extra large desktops", color: "bg-purple-500" },
  ],
};

const choosingTips = [
  { title: "Content-driven, not device-driven", desc: "Set breakpoints where your layout breaks, not at specific device widths. Devices change, content needs don't." },
  { title: "Start with framework defaults", desc: "Tailwind's 640/768/1024/1280/1536 or Bootstrap's breakpoints cover most use cases well." },
  { title: "Use as few as possible", desc: "3-4 breakpoints is usually sufficient. Every breakpoint adds maintenance cost." },
  { title: "Test with real content", desc: "Resize the browser and add a breakpoint where the layout looks awkward, not at a magic number." },
];

export function BreakpointsVisualization() {
  const [activeSystem, setActiveSystem] = useState<BreakpointSystem>("common");
  const activeBreakpoints = breakpointData[activeSystem];

  return (
    <div className="space-y-6">
      {/* Visual breakpoint spectrum */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Breakpoint Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {systems.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSystem(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSystem === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSystem}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Visual bar representation */}
            <div className="rounded-xl border p-4 space-y-2">
              {activeBreakpoints.map((bp, i) => {
                const pxValue = parseInt(bp.value);
                const maxWidth = activeSystem === "common" ? 1440 : activeSystem === "tailwind" ? 1536 : 1400;
                const widthPercent = Math.min((pxValue / maxWidth) * 100, 100);
                return (
                  <motion.div
                    key={bp.name}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: `${widthPercent}%` }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="space-y-0.5"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-5 rounded-md ${bp.color} flex items-center px-2 min-w-fit`}>
                        <span className="text-[10px] text-white font-bold whitespace-nowrap">{bp.name}: {bp.value}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground pl-1">{bp.target}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Code example */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeSystem === "common"
                ? `/* Common breakpoints (mobile-first) */
/* xs: 320px — small phones */
/* No query needed, base styles */

/* sm: 480px — large phones */
@media (min-width: 480px) { ... }

/* md: 768px — tablets */
@media (min-width: 768px) { ... }

/* lg: 1024px — small desktops */
@media (min-width: 1024px) { ... }

/* xl: 1200px — desktops */
@media (min-width: 1200px) { ... }

/* 2xl: 1440px — large desktops */
@media (min-width: 1440px) { ... }`
                : activeSystem === "tailwind"
                ? `/* Tailwind CSS breakpoints */
/* Usage: prefix classes with bp */

/* sm:  640px  -> @media (min-width: 640px) */
/* md:  768px  -> @media (min-width: 768px) */
/* lg:  1024px -> @media (min-width: 1024px) */
/* xl:  1280px -> @media (min-width: 1280px) */
/* 2xl: 1536px -> @media (min-width: 1536px) */

<div class="
  grid grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
">

/* Custom breakpoints in tailwind.config */
module.exports = {
  theme: {
    screens: {
      'tablet': '768px',
      'desktop': '1024px',
    },
  },
}`
                : `/* Bootstrap breakpoints */
/* sm:  576px  -> @media (min-width: 576px) */
/* md:  768px  -> @media (min-width: 768px) */
/* lg:  992px  -> @media (min-width: 992px) */
/* xl:  1200px -> @media (min-width: 1200px) */
/* xxl: 1400px -> @media (min-width: 1400px) */

<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Full on mobile, half on tablet,
           third on desktop -->
    </div>
  </div>
</div>`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* How to choose breakpoints */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How to Choose Breakpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {choosingTips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold">{tip.title}</p>
                  <p className="text-[10px] text-muted-foreground">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Multi-breakpoint code example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Full Breakpoint Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Complete responsive layout */
.container {
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
}

/* 480px+ : slightly wider padding */
@media (min-width: 480px) {
  .container { padding: 0 24px; }
}

/* 768px+ : max-width container */
@media (min-width: 768px) {
  .container { max-width: 720px; }
  .grid { grid-template-columns: 1fr 1fr; }
  .nav { flex-direction: row; }
}

/* 1024px+ : show sidebar */
@media (min-width: 1024px) {
  .container { max-width: 960px; }
  .grid { grid-template-columns: 1fr 1fr 1fr; }
  .sidebar { display: block; }
}

/* 1200px+ : full desktop */
@media (min-width: 1200px) {
  .container { max-width: 1140px; }
  .grid { grid-template-columns: repeat(4, 1fr); }
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
                  { q: "What are common breakpoints?", a: "480px (phone), 768px (tablet), 1024px (laptop), 1200px (desktop), 1440px (large desktop)" },
                  { q: "Should breakpoints match devices?", a: "No -- set breakpoints where your content/layout breaks, not at specific device widths" },
                  { q: "How many breakpoints is ideal?", a: "3-4 is usually sufficient. Every breakpoint adds complexity and maintenance cost" },
                  { q: "Tailwind default breakpoints?", a: "sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px (all min-width)" },
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
