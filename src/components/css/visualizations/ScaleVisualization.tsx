"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ScaleType = "uniform" | "x" | "y" | "both";

const scaleTypes: { id: ScaleType; label: string; desc: string }[] = [
  { id: "uniform", label: "scale(n)", desc: "Scales uniformly in both directions" },
  { id: "x", label: "scaleX(n)", desc: "Scales only horizontally" },
  { id: "y", label: "scaleY(n)", desc: "Scales only vertically" },
  { id: "both", label: "scale(x, y)", desc: "Scales each axis independently" },
];

const commonScales = [
  { value: 0, label: "0", desc: "Invisible (collapsed)" },
  { value: 0.5, label: "0.5", desc: "Half size" },
  { value: 0.75, label: "0.75", desc: "75% size" },
  { value: 1, label: "1", desc: "Normal (default)" },
  { value: 1.25, label: "1.25", desc: "125% size" },
  { value: 1.5, label: "1.5", desc: "150% size" },
  { value: 2, label: "2", desc: "Double size" },
];

type OriginScale = "center" | "top-left" | "top" | "bottom";

export function ScaleVisualization() {
  const [activeType, setActiveType] = useState<ScaleType>("uniform");
  const [scaleValue, setScaleValue] = useState(1.5);
  const [activeOrigin, setActiveOrigin] = useState<OriginScale>("center");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const getScaleAnimation = () => {
    switch (activeType) {
      case "uniform":
        return { scale: 1.5 };
      case "x":
        return { scaleX: 1.5 };
      case "y":
        return { scaleY: 1.5 };
      case "both":
        return { scaleX: 1.5, scaleY: 0.7 };
    }
  };

  return (
    <div className="space-y-6">
      {/* Scale types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">scale() Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            scale() resizes an element visually without changing its actual layout size.
            A value of 1 is the original size, less than 1 shrinks, greater than 1 enlarges.
          </p>

          <div className="flex flex-wrap gap-2">
            {scaleTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center justify-center p-10 rounded-xl bg-muted/30 gap-3 min-h-[200px]">
              <p className="text-[10px] text-muted-foreground">
                {scaleTypes.find((t) => t.id === activeType)?.desc}
              </p>
              <div className="relative">
                {/* Ghost outline showing original size */}
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />
                <motion.div
                  className="w-16 h-16 rounded-lg bg-blue-500/80 flex items-center justify-center"
                  animate={getScaleAnimation()}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <span className="text-[9px] text-white font-bold">
                    {activeType === "uniform" && "1.5x"}
                    {activeType === "x" && "X: 1.5"}
                    {activeType === "y" && "Y: 1.5"}
                    {activeType === "both" && "1.5, 0.7"}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeType === "uniform" &&
`.box {
  transform: scale(1.5);
}

/* Single value scales both axes
   equally. Same as scale(1.5, 1.5) */

/* Negative values flip the element */
transform: scale(-1);  /* mirror */`}
              {activeType === "x" &&
`.box {
  transform: scaleX(1.5);
}

/* Stretches only horizontally
   Height stays the same */

/* scaleX(-1) = horizontal mirror */
.mirror-h { transform: scaleX(-1); }`}
              {activeType === "y" &&
`.box {
  transform: scaleY(1.5);
}

/* Stretches only vertically
   Width stays the same */

/* scaleY(-1) = vertical mirror */
.mirror-v { transform: scaleY(-1); }`}
              {activeType === "both" &&
`.box {
  transform: scale(1.5, 0.7);
}

/* First value = X, Second = Y
   Creates a squished/stretched look */

/* Equivalent to: */
transform: scaleX(1.5) scaleY(0.7);`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Common scale values */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Scale Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {commonScales.map((item, i) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border"
              >
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="w-10 h-10 rounded border-2 border-dashed border-muted-foreground/20 absolute" />
                  <motion.div
                    className="w-10 h-10 rounded bg-blue-500/70 flex items-center justify-center absolute"
                    animate={{ scale: item.value }}
                  >
                    {item.value > 0.3 && (
                      <span className="text-[8px] text-white font-bold">{item.label}</span>
                    )}
                  </motion.div>
                </div>
                <div className="text-center">
                  <code className="text-[10px] font-mono font-semibold">{item.label}</code>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scale playground */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scale Playground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold">scale({scaleValue.toFixed(2)})</label>
            <input
              type="range"
              min={0}
              max={3}
              step={0.05}
              value={scaleValue}
              onChange={(e) => setScaleValue(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>0 (invisible)</span>
              <span>1 (normal)</span>
              <span>2 (double)</span>
              <span>3 (triple)</span>
            </div>
          </div>

          <div className="flex items-center justify-center h-48 rounded-xl bg-muted/30">
            <div className="relative">
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />
              <motion.div
                className="w-16 h-16 rounded-lg bg-purple-500 flex items-center justify-center"
                animate={{ scale: scaleValue }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <span className="text-[9px] text-white font-bold">{scaleValue.toFixed(2)}</span>
              </motion.div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.box {
  transform: scale(${scaleValue.toFixed(2)});
}`}
          </div>
        </CardContent>
      </Card>

      {/* Transform-origin with scale */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scale from Different Origins</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            By default, elements scale from the center. Changing transform-origin changes the anchor
            point from which scaling expands or contracts.
          </p>

          <div className="flex flex-wrap gap-2">
            {([
              { id: "center" as OriginScale, label: "center" },
              { id: "top-left" as OriginScale, label: "top left" },
              { id: "top" as OriginScale, label: "top center" },
              { id: "bottom" as OriginScale, label: "bottom center" },
            ]).map((origin) => (
              <button
                key={origin.id}
                onClick={() => setActiveOrigin(origin.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeOrigin === origin.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {origin.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center h-48 rounded-xl bg-muted/30">
            <div className="relative">
              <div className="w-20 h-16 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />
              <motion.div
                className="w-20 h-16 rounded-lg bg-emerald-500/80 flex items-center justify-center"
                animate={{ scale: 1.5 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  transformOrigin:
                    activeOrigin === "center" ? "center" :
                    activeOrigin === "top-left" ? "top left" :
                    activeOrigin === "top" ? "top center" : "bottom center",
                }}
              >
                <span className="text-[9px] text-white font-bold">scale(1.5)</span>
              </motion.div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.box {
  transform: scale(1.5);
  transform-origin: ${
    activeOrigin === "center" ? "center" :
    activeOrigin === "top-left" ? "top left" :
    activeOrigin === "top" ? "top center" : "bottom center"
  };
}

/* Use cases:
   center      → zoom effect
   top left    → tooltip expand
   top center  → dropdown appear
   bottom      → progress bar */`}
          </div>
        </CardContent>
      </Card>

      {/* Hover zoom effects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hover Zoom Effects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            scale() is commonly used for hover effects on cards, images, and buttons. Always use
            overflow: hidden on the container to prevent the scaled element from breaking layout.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { scale: 1.05, label: "Subtle (1.05)", desc: "Cards, buttons" },
              { scale: 1.1, label: "Medium (1.1)", desc: "Image gallery" },
              { scale: 1.2, label: "Strong (1.2)", desc: "Feature cards" },
              { scale: 1.5, label: "Dramatic (1.5)", desc: "Special emphasis" },
            ].map((item, i) => (
              <motion.div
                key={item.scale}
                className="rounded-xl border overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="h-24 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
                  animate={{ scale: hoveredCard === i ? item.scale : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-[10px] text-white font-bold">{item.label}</span>
                </motion.div>
                <div className="p-2">
                  <p className="text-[10px] text-muted-foreground text-center">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Image hover zoom */
.image-container {
  overflow: hidden;  /* Clips scaled image */
  border-radius: 12px;
}

.image-container img {
  transition: transform 0.3s ease;
}

.image-container:hover img {
  transform: scale(1.1);
}

/* Button press effect */
.button:active {
  transform: scale(0.95);  /* Shrink on click */
}

/* Tooltip appear animation */
.tooltip {
  transform: scale(0);
  transform-origin: bottom center;
  transition: transform 0.2s ease;
}
.trigger:hover .tooltip {
  transform: scale(1);
}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
