"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DeviceType = "mobile" | "tablet" | "desktop";

const devices: { id: DeviceType; label: string; width: string; range: string; icon: string }[] = [
  { id: "mobile", label: "Mobile", width: "320-480px", range: "< 768px", icon: "[ ]" },
  { id: "tablet", label: "Tablet", width: "768-1024px", range: "768px - 1024px", icon: "[    ]" },
  { id: "desktop", label: "Desktop", width: "1024px+", range: "> 1024px", icon: "[        ]" },
];

const principles = [
  { title: "Fluid Grids", desc: "Use relative units (%, fr, vw) instead of fixed px widths so layouts stretch and shrink" },
  { title: "Flexible Images", desc: "Images scale within their containers using max-width: 100% to prevent overflow" },
  { title: "Media Queries", desc: "Apply different CSS rules at specific viewport widths to adapt the layout" },
  { title: "Mobile-First", desc: "Start designing for the smallest screen, then add complexity for larger screens" },
];

export function ResponsiveBasicsVisualization() {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("mobile");

  return (
    <div className="space-y-6">
      {/* What is responsive design */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What Is Responsive Design?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Responsive design makes web pages render well on all screen sizes. One codebase adapts to mobile phones, tablets, and desktops using fluid grids, flexible images, and media queries.
          </p>

          {/* Device switcher */}
          <div className="flex flex-wrap gap-2">
            {devices.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDevice(d.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDevice === d.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeDevice}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Device preview */}
            <div className="rounded-xl border p-4 space-y-3 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`border-2 border-primary/50 rounded-lg bg-muted/30 flex flex-col items-center justify-center p-4 transition-all ${
                  activeDevice === "mobile"
                    ? "w-24 h-40"
                    : activeDevice === "tablet"
                    ? "w-40 h-32"
                    : "w-full h-28"
                }`}
              >
                <span className="text-xs font-bold text-primary">{devices.find((d) => d.id === activeDevice)?.label}</span>
                <span className="text-[10px] text-muted-foreground mt-1">{devices.find((d) => d.id === activeDevice)?.width}</span>
                {activeDevice === "mobile" && (
                  <div className="mt-2 space-y-1 w-full px-2">
                    <div className="h-1.5 bg-primary/30 rounded w-full" />
                    <div className="h-1.5 bg-primary/20 rounded w-3/4" />
                    <div className="h-1.5 bg-primary/20 rounded w-full" />
                  </div>
                )}
                {activeDevice === "tablet" && (
                  <div className="mt-2 flex gap-1 w-full px-2">
                    <div className="h-6 bg-primary/20 rounded flex-1" />
                    <div className="h-6 bg-primary/30 rounded flex-[2]" />
                  </div>
                )}
                {activeDevice === "desktop" && (
                  <div className="mt-2 flex gap-1 w-full px-2">
                    <div className="h-6 bg-primary/20 rounded w-1/5" />
                    <div className="h-6 bg-primary/30 rounded flex-1" />
                    <div className="h-6 bg-primary/20 rounded w-1/5" />
                  </div>
                )}
              </motion.div>
              <div className="text-center">
                <p className="text-xs font-semibold">Breakpoint Range</p>
                <code className="text-[10px] text-primary">{devices.find((d) => d.id === activeDevice)?.range}</code>
              </div>
            </div>

            {/* Code block */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeDevice === "mobile"
                ? `/* Mobile (default styles) */\n.container {\n  width: 100%;\n  padding: 16px;\n}\n\n.nav {\n  flex-direction: column;\n}\n\n.sidebar {\n  display: none;\n}`
                : activeDevice === "tablet"
                ? `/* Tablet (768px and up) */\n@media (min-width: 768px) {\n  .container {\n    max-width: 720px;\n    margin: 0 auto;\n  }\n\n  .nav {\n    flex-direction: row;\n  }\n\n  .grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}`
                : `/* Desktop (1024px and up) */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1200px;\n  }\n\n  .sidebar {\n    display: block;\n    width: 250px;\n  }\n\n  .grid {\n    grid-template-columns:\n      repeat(3, 1fr);\n  }\n}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Viewport Meta Tag */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The Viewport Meta Tag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Without this tag, mobile browsers render pages at a desktop width (~980px) and zoom out. The viewport meta tag tells the browser to match the screen width.
          </p>
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`<!-- Required in every responsive page -->
<meta
  name="viewport"
  content="width=device-width,
           initial-scale=1.0"
/>

<!-- What each part means: -->
<!-- width=device-width
     Layout width = screen width -->
<!-- initial-scale=1.0
     No zoom on first load -->`}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Without viewport meta</Badge>
              <p className="text-[10px] text-muted-foreground">Page renders at ~980px wide, then zooms to fit. Text is tiny, user must pinch-to-zoom. Media queries based on viewport width will not work correctly.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">With viewport meta</Badge>
              <p className="text-[10px] text-muted-foreground">Page renders at the device's actual width (e.g., 375px on iPhone). Text is readable, media queries fire at the correct widths.</p>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Design Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Core Principles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {principles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-bold">{p.title}</p>
                  <p className="text-[10px] text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview tip */}
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
                  { q: "What is responsive design?", a: "One codebase adapts to all screen sizes using fluid grids, flexible images, and media queries" },
                  { q: "Why is the viewport meta tag needed?", a: "Without it, mobile browsers render at ~980px width and zoom out, breaking responsive layouts" },
                  { q: "Name the 3 ingredients", a: "Fluid grids (%, fr), flexible images (max-width: 100%), media queries (@media)" },
                  { q: "Mobile-first or desktop-first?", a: "Mobile-first (min-width) is preferred -- progressive enhancement, smaller default CSS" },
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
