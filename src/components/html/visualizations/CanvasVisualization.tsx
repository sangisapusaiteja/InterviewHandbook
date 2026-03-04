"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ShapeType = "rect" | "circle" | "path" | "text" | "gradient";

const shapes: { id: ShapeType; label: string; desc: string }[] = [
  { id: "rect", label: "Rectangles", desc: "fillRect(), strokeRect(), clearRect()" },
  { id: "circle", label: "Circles/Arcs", desc: "arc(), beginPath(), fill()" },
  { id: "path", label: "Paths/Lines", desc: "moveTo(), lineTo(), closePath()" },
  { id: "text", label: "Text", desc: "fillText(), strokeText(), font" },
  { id: "gradient", label: "Gradients", desc: "createLinearGradient(), addColorStop()" },
];

const codeMap: Record<ShapeType, string> = {
  rect: `const ctx = canvas.getContext('2d');\n\n// Filled rectangle\nctx.fillStyle = '#3b82f6';\nctx.fillRect(20, 20, 100, 60);\n\n// Stroked rectangle\nctx.strokeStyle = '#e11d48';\nctx.lineWidth = 3;\nctx.strokeRect(140, 20, 100, 60);\n\n// Clear a region\nctx.clearRect(50, 35, 40, 30);`,
  circle: `const ctx = canvas.getContext('2d');\n\n// Full circle\nctx.beginPath();\nctx.arc(80, 50, 35, 0, Math.PI * 2);\nctx.fillStyle = '#10b981';\nctx.fill();\n\n// Semi-circle\nctx.beginPath();\nctx.arc(200, 50, 35, 0, Math.PI);\nctx.fillStyle = '#f59e0b';\nctx.fill();`,
  path: `const ctx = canvas.getContext('2d');\n\n// Triangle\nctx.beginPath();\nctx.moveTo(50, 80);\nctx.lineTo(100, 10);\nctx.lineTo(150, 80);\nctx.closePath();\nctx.fillStyle = '#8b5cf6';\nctx.fill();\nctx.strokeStyle = '#6d28d9';\nctx.stroke();`,
  text: `const ctx = canvas.getContext('2d');\n\nctx.font = 'bold 20px sans-serif';\nctx.fillStyle = '#1e293b';\nctx.fillText('Hello Canvas!', 20, 40);\n\nctx.font = '16px monospace';\nctx.strokeStyle = '#e11d48';\nctx.strokeText('Outlined Text', 20, 75);`,
  gradient: `const ctx = canvas.getContext('2d');\n\nconst grad = ctx.createLinearGradient(\n  0, 0, 300, 0\n);\ngrad.addColorStop(0, '#3b82f6');\ngrad.addColorStop(0.5, '#8b5cf6');\ngrad.addColorStop(1, '#ec4899');\n\nctx.fillStyle = grad;\nctx.fillRect(10, 10, 280, 70);`,
};

export function CanvasVisualization() {
  const [activeShape, setActiveShape] = useState<ShapeType>("rect");

  return (
    <div className="space-y-6">
      {/* Shape explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canvas 2D Drawing Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {shapes.map((s) => (
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
              {/* Visual preview */}
              <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-2">
                <p className="text-xs font-semibold">Visual Preview:</p>
                <div className="flex items-center justify-center rounded-lg border bg-white p-4 min-h-[120px]">
                  {activeShape === "rect" && (
                    <svg width="260" height="90" viewBox="0 0 260 90">
                      <rect x="0" y="5" width="100" height="60" fill="#3b82f6" rx="2" />
                      <rect x="0" y="5" width="100" height="60" fill="#3b82f6" rx="2" />
                      <rect x="30" y="20" width="40" height="30" fill="white" />
                      <rect x="120" y="5" width="100" height="60" fill="none" stroke="#e11d48" strokeWidth="3" rx="2" />
                      <text x="30" y="82" fontSize="10" fill="#666">fillRect</text>
                      <text x="140" y="82" fontSize="10" fill="#666">strokeRect</text>
                    </svg>
                  )}
                  {activeShape === "circle" && (
                    <svg width="260" height="100" viewBox="0 0 260 100">
                      <circle cx="60" cy="45" r="35" fill="#10b981" />
                      <path d="M 165 45 A 35 35 0 0 1 235 45" fill="#f59e0b" />
                      <text x="35" y="95" fontSize="10" fill="#666">Full circle</text>
                      <text x="170" y="95" fontSize="10" fill="#666">Semi-circle</text>
                    </svg>
                  )}
                  {activeShape === "path" && (
                    <svg width="200" height="100" viewBox="0 0 200 100">
                      <polygon points="50,80 100,10 150,80" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" />
                      <text x="70" y="98" fontSize="10" fill="#666">Triangle path</text>
                    </svg>
                  )}
                  {activeShape === "text" && (
                    <div className="text-center space-y-2">
                      <p className="text-xl font-bold text-slate-800">Hello Canvas!</p>
                      <p className="text-base font-mono" style={{ WebkitTextStroke: "1px #e11d48", color: "transparent" }}>Outlined Text</p>
                    </div>
                  )}
                  {activeShape === "gradient" && (
                    <div className="w-full h-16 rounded-lg" style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)" }} />
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground text-center">
                  {shapes.find((s) => s.id === activeShape)?.desc}
                </p>
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeMap[activeShape]}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Canvas vs SVG comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Canvas vs SVG</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">
                    <Badge variant="outline" className="text-[9px]">Canvas</Badge>
                  </th>
                  <th className="text-left p-2">
                    <Badge variant="outline" className="text-[9px]">SVG</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Type", canvas: "Raster (pixels)", svg: "Vector (math)" },
                  { feature: "DOM nodes", canvas: "Single <canvas>", svg: "One per shape" },
                  { feature: "Scaling", canvas: "Pixelates on zoom", svg: "Always crisp" },
                  { feature: "Event handling", canvas: "Manual hit detection", svg: "Per-element events" },
                  { feature: "Performance", canvas: "Fast for many objects", svg: "Slows with many nodes" },
                  { feature: "Accessibility", canvas: "Not inherent", svg: "Screen-readable" },
                  { feature: "Best for", canvas: "Games, charts, pixels", svg: "Icons, logos, UI" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2 text-muted-foreground">{row.canvas}</td>
                    <td className="p-2 text-muted-foreground">{row.svg}</td>
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
