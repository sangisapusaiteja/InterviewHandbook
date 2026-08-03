"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Approach = "mobile-first" | "desktop-first";

const approaches: { id: Approach; label: string }[] = [
  { id: "mobile-first", label: "Mobile-First (min-width)" },
  { id: "desktop-first", label: "Desktop-First (max-width)" },
];

const comparisonPoints = [
  { aspect: "Direction", mobile: "Small screen -> Large screen", desktop: "Large screen -> Small screen" },
  { aspect: "Query type", mobile: "min-width (adds styles up)", desktop: "max-width (removes styles down)" },
  { aspect: "Default CSS", mobile: "Minimal, mobile styles", desktop: "Full desktop styles" },
  { aspect: "Performance", mobile: "Mobile loads less CSS", desktop: "Mobile loads all CSS, then overrides" },
  { aspect: "Philosophy", mobile: "Progressive enhancement", desktop: "Graceful degradation" },
];

const reasons = [
  { title: "Smaller default payload", desc: "Mobile devices download only base styles. Larger breakpoints add complexity progressively." },
  { title: "Progressive enhancement", desc: "Start with essential content and enhance for larger screens rather than stripping features away." },
  { title: "Majority of web traffic is mobile", desc: "Over 55% of global traffic is mobile. Designing for mobile first prioritizes the majority." },
  { title: "Forces content prioritization", desc: "Small screens force you to decide what truly matters, leading to cleaner design at every size." },
  { title: "Easier to scale up than down", desc: "Adding a sidebar or extra columns is simpler than hiding/rearranging complex desktop layouts." },
];

export function MobileFirstVisualization() {
  const [activeApproach, setActiveApproach] = useState<Approach>("mobile-first");

  return (
    <div className="space-y-6">
      {/* Approach comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mobile-First vs Desktop-First</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {approaches.map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveApproach(a.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeApproach === a.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeApproach}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {activeApproach === "mobile-first" ? (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">Recommended</Badge>
                  <p className="text-xs text-muted-foreground">
                    Write base styles for mobile, then use <code className="text-primary">min-width</code> queries to add complexity for larger screens.
                  </p>
                  {/* Visual flow */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {["Mobile (base)", "Tablet (768px+)", "Desktop (1024px+)"].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className={`rounded-lg p-2 text-[10px] font-semibold ${
                          i === 0 ? "bg-blue-500/10 border border-blue-500 text-blue-700 dark:text-blue-400" :
                          i === 1 ? "bg-purple-500/10 border border-purple-500 text-purple-700 dark:text-purple-400" :
                          "bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        }`}>
                          {step}
                        </div>
                        {i < 2 && <span className="text-muted-foreground text-xs">+</span>}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Each breakpoint adds styles on top of the previous ones.</p>
                </>
              ) : (
                <>
                  <Badge className="bg-orange-500 text-[10px]">Legacy Approach</Badge>
                  <p className="text-xs text-muted-foreground">
                    Write full desktop styles first, then use <code className="text-primary">max-width</code> queries to remove or simplify for smaller screens.
                  </p>
                  {/* Visual flow */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {["Desktop (base)", "Tablet (< 1024px)", "Mobile (< 768px)"].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className={`rounded-lg p-2 text-[10px] font-semibold ${
                          i === 0 ? "bg-emerald-500/10 border border-emerald-500 text-emerald-700 dark:text-emerald-400" :
                          i === 1 ? "bg-purple-500/10 border border-purple-500 text-purple-700 dark:text-purple-400" :
                          "bg-blue-500/10 border border-blue-500 text-blue-700 dark:text-blue-400"
                        }`}>
                          {step}
                        </div>
                        {i < 2 && <span className="text-muted-foreground text-xs">-</span>}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">Each breakpoint overrides and removes desktop styles.</p>
                </>
              )}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeApproach === "mobile-first"
                ? `/* Mobile-First: min-width */

/* Base: mobile styles (no query) */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.sidebar {
  display: none;
}

/* Tablet and up */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .sidebar {
    display: block;
  }
}`
                : `/* Desktop-First: max-width */

/* Base: full desktop styles */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;
}

.sidebar {
  display: block;
  width: 280px;
}

/* Tablet and below */
@media (max-width: 1023px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .sidebar {
    width: 200px;
  }
}

/* Mobile and below */
@media (max-width: 767px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Side-by-side comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Head-to-Head Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Aspect</th>
                  <th className="text-left p-2">
                    <span className="text-emerald-500">Mobile-First</span>
                  </th>
                  <th className="text-left p-2">
                    <span className="text-orange-500">Desktop-First</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonPoints.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b last:border-0"
                  >
                    <td className="p-2 font-semibold">{row.aspect}</td>
                    <td className="p-2 text-muted-foreground">{row.mobile}</td>
                    <td className="p-2 text-muted-foreground">{row.desktop}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Why mobile-first is preferred */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Mobile-First Is Preferred</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {reasons.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold">{r.title}</p>
                  <p className="text-[10px] text-muted-foreground">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progressive enhancement concept */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progressive Enhancement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Mobile-first embodies progressive enhancement: start with a baseline experience that works everywhere, then layer on richer features for more capable devices.
          </p>
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Layer 1: Base (all devices) */
.card {
  padding: 16px;
  border: 1px solid #ddd;
}

/* Layer 2: Enhanced (tablet+) */
@media (min-width: 768px) {
  .card {
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
}

/* Layer 3: Full experience (desktop+) */
@media (min-width: 1024px) {
  .card {
    padding: 32px;
    transition: transform 0.2s;
  }
  .card:hover {
    transform: translateY(-4px);
  }
}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
