"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RatioPreset = "16/9" | "4/3" | "1/1" | "21/9" | "9/16" | "3/2";

const ratioPresets: { id: RatioPreset; label: string; desc: string; numeric: number }[] = [
  { id: "16/9", label: "16 / 9", desc: "Widescreen video, YouTube", numeric: 16 / 9 },
  { id: "4/3", label: "4 / 3", desc: "Classic TV, old photos", numeric: 4 / 3 },
  { id: "1/1", label: "1 / 1", desc: "Square, Instagram posts", numeric: 1 },
  { id: "21/9", label: "21 / 9", desc: "Ultra-wide, cinema", numeric: 21 / 9 },
  { id: "9/16", label: "9 / 16", desc: "Portrait video, Stories", numeric: 9 / 16 },
  { id: "3/2", label: "3 / 2", desc: "DSLR photos, print", numeric: 3 / 2 },
];

type ApproachTab = "modern" | "legacy";

export function AspectRatioVisualization() {
  const [activeRatio, setActiveRatio] = useState<RatioPreset>("16/9");
  const [approachTab, setApproachTab] = useState<ApproachTab>("modern");
  const currentRatio = ratioPresets.find((r) => r.id === activeRatio)!;

  const containerWidth = 320;
  const containerHeight = containerWidth / currentRatio.numeric;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">aspect-ratio Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {ratioPresets.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRatio(r.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeRatio === r.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeRatio}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Visual demo */}
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <code className="text-sm text-primary font-bold">
                  aspect-ratio: {activeRatio}
                </code>
                <Badge variant="outline" className="text-[9px]">
                  {currentRatio.desc}
                </Badge>
              </div>

              <div className="flex justify-center">
                <motion.div
                  animate={{
                    width: Math.min(containerWidth, 300),
                    height: Math.min(containerHeight, 250),
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="border-2 border-dashed border-primary/40 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6366f1/10, #ec4899/10)",
                  }}
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-primary">{activeRatio}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {Math.round(Math.min(containerWidth, 300))} x{" "}
                      {Math.round(Math.min(containerHeight, 250))}
                    </p>
                  </div>
                </motion.div>
              </div>
              <p className="text-[9px] text-muted-foreground text-center">
                Dashed border shows the aspect ratio container
              </p>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {`.box {\n  width: 100%;\n  aspect-ratio: ${activeRatio};\n}\n\n/* The browser calculates height\n   automatically from the width\n   and the given ratio. */\n\n/* With max constraints */\n.video {\n  width: 100%;\n  max-width: 800px;\n  aspect-ratio: ${activeRatio};\n}\n\n/* On an <img> tag */\nimg {\n  width: 100%;\n  aspect-ratio: ${activeRatio};\n  object-fit: cover;\n}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Modern vs Legacy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modern vs Legacy Approach</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["modern", "legacy"] as ApproachTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setApproachTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  approachTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab === "modern" ? "Modern (aspect-ratio)" : "Legacy (padding-bottom)"}
              </button>
            ))}
          </div>

          <motion.div
            key={approachTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {approachTab === "modern" ? (
                <>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                    <code className="text-sm text-primary font-bold">aspect-ratio</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      Single property. Clean, readable, and works on any element.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="space-y-1">
                    <code className="text-[11px] text-primary font-bold">Content-aware</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      If content overflows, the element grows to fit. The ratio is a preferred size, not forced.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-1">
                    <code className="text-[11px] text-primary font-bold">Works with min/max</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      Combine with min-height, max-height for bounded ratios.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-1">
                    <code className="text-[11px] text-primary font-bold">Browser support: 95%+</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      Supported in all modern browsers. Safe to use in production.
                    </p>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                    <code className="text-sm text-primary font-bold">padding-bottom hack</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      Uses the fact that padding-bottom % is relative to the element&apos;s width.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }} className="space-y-1">
                    <code className="text-[11px] text-primary font-bold">Extra wrapper needed</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      Requires a wrapper div with padding and an absolutely positioned child.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-1">
                    <code className="text-[11px] text-primary font-bold">Formula: (h/w) x 100%</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      16:9 = (9/16) x 100% = 56.25% padding-bottom.
                    </p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="space-y-1">
                    <code className="text-[11px] text-primary font-bold">Still useful for legacy</code>
                    <p className="text-[10px] text-muted-foreground ml-2">
                      Needed only if you must support very old browsers.
                    </p>
                  </motion.div>
                </>
              )}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {approachTab === "modern"
                ? `/* Modern: clean and simple */\n.video-wrapper {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n}\n\n.video-wrapper iframe {\n  width: 100%;\n  height: 100%;\n}\n\n/* With constraints */\n.card-image {\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  max-height: 400px;\n  object-fit: cover;\n}\n\n/* auto — uses intrinsic ratio */\nimg {\n  aspect-ratio: auto;\n}`
                : `/* Legacy: padding-bottom trick */\n.video-wrapper {\n  position: relative;\n  width: 100%;\n  padding-bottom: 56.25%; /* 9/16 */\n  height: 0;\n  overflow: hidden;\n}\n\n.video-wrapper iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n/* 4:3 ratio */\n.ratio-4-3 {\n  padding-bottom: 75%; /* 3/4 */\n}\n\n/* 1:1 square */\n.ratio-1-1 {\n  padding-bottom: 100%;\n}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Responsive video embed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Responsive Video Embed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border overflow-hidden">
            <div
              className="w-full bg-zinc-900 flex items-center justify-center"
              style={{ aspectRatio: "16 / 9" }}
            >
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-14 border-l-white ml-1" style={{ borderLeftWidth: 14 }} />
                </div>
                <p className="text-white/50 text-xs">16:9 Video Container</p>
                <p className="text-white/30 text-[10px]">aspect-ratio: 16 / 9</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
            {`/* Modern responsive video embed */\n.video-container {\n  width: 100%;\n  max-width: 800px;\n  aspect-ratio: 16 / 9;\n  background: #000;\n  border-radius: 12px;\n  overflow: hidden;\n}\n\n.video-container iframe,\n.video-container video {\n  width: 100%;\n  height: 100%;\n  border: none;\n}\n\n/* Responsive thumbnail grid */\n.thumbnail-grid {\n  display: grid;\n  grid-template-columns: repeat(\n    auto-fill, minmax(200px, 1fr)\n  );\n  gap: 1rem;\n}\n\n.thumbnail {\n  aspect-ratio: 16 / 9;\n  object-fit: cover;\n  border-radius: 8px;\n}`}
          </div>
        </CardContent>
      </Card>

      {/* Common ratios reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Aspect Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Ratio</th>
                  <th className="text-left p-2">Decimal</th>
                  <th className="text-left p-2">padding-bottom</th>
                  <th className="text-left p-2">Use Case</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ratio: "1 / 1", dec: "1.0", pad: "100%", use: "Square avatars, thumbnails" },
                  { ratio: "4 / 3", dec: "1.33", pad: "75%", use: "Classic photos, slides" },
                  { ratio: "3 / 2", dec: "1.5", pad: "66.67%", use: "DSLR photos" },
                  { ratio: "16 / 9", dec: "1.78", pad: "56.25%", use: "HD video, YouTube" },
                  { ratio: "21 / 9", dec: "2.33", pad: "42.86%", use: "Ultrawide, cinema" },
                  { ratio: "9 / 16", dec: "0.56", pad: "177.78%", use: "Mobile stories, reels" },
                ].map((row) => (
                  <tr key={row.ratio} className="border-b last:border-0">
                    <td className="p-2 font-bold font-mono text-primary">{row.ratio}</td>
                    <td className="p-2 text-muted-foreground">{row.dec}</td>
                    <td className="p-2">
                      <code className="text-[10px] text-primary">{row.pad}</code>
                    </td>
                    <td className="p-2 text-muted-foreground">{row.use}</td>
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
