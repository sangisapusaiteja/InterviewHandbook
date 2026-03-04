"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SVGShape = "rect" | "circle" | "ellipse" | "line" | "polygon" | "path";

const shapeData: { id: SVGShape; label: string; code: string }[] = [
  { id: "rect", label: "Rectangle", code: `<rect x="10" y="10" width="80" height="50"\n      rx="8" fill="#3b82f6" />` },
  { id: "circle", label: "Circle", code: `<circle cx="50" cy="50" r="35"\n        fill="#10b981" />` },
  { id: "ellipse", label: "Ellipse", code: `<ellipse cx="50" cy="50" rx="45" ry="25"\n         fill="#f59e0b" />` },
  { id: "line", label: "Line", code: `<line x1="10" y1="10" x2="90" y2="90"\n      stroke="#e11d48" stroke-width="3" />` },
  { id: "polygon", label: "Polygon", code: `<polygon points="50,5 95,40 80,95 20,95 5,40"\n         fill="#8b5cf6" stroke="#6d28d9"\n         stroke-width="2" />` },
  { id: "path", label: "Path", code: `<path d="M10 80 Q 50 10, 90 80 T 170 80"\n      fill="none" stroke="#ec4899"\n      stroke-width="3" />` },
];

export function SVGVisualization() {
  const [activeShape, setActiveShape] = useState<SVGShape>("rect");

  return (
    <div className="space-y-6">
      {/* Shape explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SVG Shape Explorer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click each shape to see the SVG code. Every shape is a DOM element you can style with CSS.
          </p>

          <div className="flex flex-wrap gap-2">
            {shapeData.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveShape(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeShape === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeShape}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Live SVG */}
              <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 flex items-center justify-center min-h-[150px]">
                <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-md">
                  {activeShape === "rect" && (
                    <rect x="10" y="20" width="80" height="50" rx="8" fill="#3b82f6" />
                  )}
                  {activeShape === "circle" && (
                    <circle cx="50" cy="50" r="35" fill="#10b981" />
                  )}
                  {activeShape === "ellipse" && (
                    <ellipse cx="50" cy="50" rx="45" ry="25" fill="#f59e0b" />
                  )}
                  {activeShape === "line" && (
                    <line x1="10" y1="10" x2="90" y2="90" stroke="#e11d48" strokeWidth="3" />
                  )}
                  {activeShape === "polygon" && (
                    <polygon points="50,5 95,40 80,95 20,95 5,40" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" />
                  )}
                  {activeShape === "path" && (
                    <path d="M10 80 Q 50 10, 90 80" fill="none" stroke="#ec4899" strokeWidth="3" />
                  )}
                </svg>
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {shapeData.find((s) => s.id === activeShape)?.code}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* viewBox explained */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Understanding viewBox</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-xs space-y-1">
            <span className="text-zinc-500">&lt;svg</span>
            <span className="text-purple-400"> viewBox</span>
            <span className="text-zinc-500">=&quot;</span>
            <span className="text-amber-400">min-x</span>
            <span className="text-zinc-500"> </span>
            <span className="text-amber-400">min-y</span>
            <span className="text-zinc-500"> </span>
            <span className="text-emerald-400">width</span>
            <span className="text-zinc-500"> </span>
            <span className="text-emerald-400">height</span>
            <span className="text-zinc-500">&quot;&gt;</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { vb: "0 0 100 100", size: "100x100", desc: "Standard — 1:1 coordinate space" },
              { vb: "0 0 200 100", size: "100x50", desc: "Wide — stretches horizontally" },
              { vb: "25 25 50 50", size: "100x100", desc: "Zoomed — crops to center" },
            ].map((example) => (
              <div key={example.vb} className="rounded-lg border p-3 space-y-2 text-center">
                <svg width="100" height="100" viewBox={example.vb} className="border rounded mx-auto bg-white">
                  <circle cx="50" cy="50" r="30" fill="#6366f1" opacity="0.8" />
                  <rect x="10" y="10" width="20" height="20" fill="#f59e0b" />
                </svg>
                <code className="text-[10px] text-primary block">viewBox=&quot;{example.vb}&quot;</code>
                <p className="text-[10px] text-muted-foreground">{example.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Inclusion methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ways to Include SVG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { method: "Inline SVG", code: "<svg>...</svg>", css: true, js: true, best: "Full control, best for interactive" },
              { method: "<img> tag", code: '<img src="icon.svg">', css: false, js: false, best: "Simple display, cached" },
              { method: "CSS background", code: "background-image: url(icon.svg)", css: false, js: false, best: "Decorative only" },
              { method: "<object> tag", code: '<object data="icon.svg">', css: true, js: true, best: "External file with scripting" },
            ].map((item, i) => (
              <motion.div
                key={item.method}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-center gap-3 flex-wrap"
              >
                <span className="text-xs font-semibold w-24 shrink-0">{item.method}</span>
                <code className="text-[10px] text-primary">{item.code}</code>
                <div className="flex gap-1 ml-auto">
                  <Badge variant={item.css ? "default" : "secondary"} className="text-[8px]">CSS {item.css ? "Yes" : "No"}</Badge>
                  <Badge variant={item.js ? "default" : "secondary"} className="text-[8px]">JS {item.js ? "Yes" : "No"}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
