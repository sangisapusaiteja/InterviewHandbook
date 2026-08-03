"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TranslateAxis = "x" | "y" | "xy" | "3d";

const translateAxes: { id: TranslateAxis; label: string; desc: string }[] = [
  { id: "x", label: "translateX()", desc: "Moves element horizontally" },
  { id: "y", label: "translateY()", desc: "Moves element vertically" },
  { id: "xy", label: "translate(x, y)", desc: "Moves in both directions" },
  { id: "3d", label: "translate3d()", desc: "Moves in 3D space (x, y, z)" },
];

export function TranslateVisualization() {
  const [activeAxis, setActiveAxis] = useState<TranslateAxis>("x");
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const triggerAnimation = () => {
    setIsAnimating(false);
    requestAnimationFrame(() => setIsAnimating(true));
  };

  const getTranslateAnimation = () => {
    switch (activeAxis) {
      case "x":
        return { x: isAnimating ? 80 : 0 };
      case "y":
        return { y: isAnimating ? 40 : 0 };
      case "xy":
        return { x: isAnimating ? 60 : 0, y: isAnimating ? 30 : 0 };
      case "3d":
        return {
          x: isAnimating ? 40 : 0,
          y: isAnimating ? -20 : 0,
          scale: isAnimating ? 1.1 : 1,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Translate axes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">translate() Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            translate() moves an element from its current position without affecting surrounding layout.
            It is the most performant way to move elements for animations.
          </p>

          <div className="flex flex-wrap gap-2">
            {translateAxes.map((axis) => (
              <button
                key={axis.id}
                onClick={() => {
                  setActiveAxis(axis.id);
                  triggerAnimation();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeAxis === axis.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {axis.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeAxis}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 gap-3 min-h-[200px]">
              <p className="text-[10px] text-muted-foreground">{translateAxes.find((a) => a.id === activeAxis)?.desc}</p>
              <div className="relative w-full flex items-center justify-center">
                {/* Grid lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-full bg-muted-foreground/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-muted-foreground/10" />
                </div>

                {/* Ghost */}
                <div className="w-16 h-12 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />

                {/* Moving element */}
                <motion.div
                  className="w-16 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-[9px] font-semibold text-white"
                  animate={getTranslateAnimation()}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {activeAxis === "x" && "X: 80px"}
                  {activeAxis === "y" && "Y: 40px"}
                  {activeAxis === "xy" && "60, 30"}
                  {activeAxis === "3d" && "3D"}
                </motion.div>

                {/* Direction arrow */}
                {activeAxis === "x" && (
                  <motion.div
                    className="absolute text-blue-400 text-[10px]"
                    style={{ right: "20%", top: "50%", transform: "translateY(-50%)" }}
                    animate={{ opacity: isAnimating ? 1 : 0.3 }}
                  >
                    {"\u2192"}
                  </motion.div>
                )}
              </div>
              <button
                onClick={triggerAnimation}
                className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[10px] font-semibold"
              >
                Toggle Translate
              </button>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeAxis === "x" &&
`.box {
  transform: translateX(80px);
}

/* Negative values go left */
transform: translateX(-80px);

/* Units: px, rem, em, % */
transform: translateX(5rem);`}
              {activeAxis === "y" &&
`.box {
  transform: translateY(40px);
}

/* Negative values go up */
transform: translateY(-40px);

/* Positive Y = downward
   (opposite to math coords) */`}
              {activeAxis === "xy" &&
`.box {
  transform: translate(60px, 30px);
}

/* Same as: */
transform: translateX(60px)
           translateY(30px);

/* Single value = X only, Y defaults to 0 */
transform: translate(60px);
/* equals translate(60px, 0) */`}
              {activeAxis === "3d" &&
`.box {
  transform: translate3d(40px, -20px, 10px);
}

/* Z-axis requires perspective on parent */
.parent {
  perspective: 500px;
}

/* translate3d triggers GPU acceleration
   even if z = 0 */
.gpu-hack {
  transform: translate3d(0, 0, 0);
  /* or: will-change: transform; */
}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Interactive translate playground */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Translate Playground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold">translateX: {translateX}px</label>
              <input
                type="range"
                min={-100}
                max={100}
                value={translateX}
                onChange={(e) => setTranslateX(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold">translateY: {translateY}px</label>
              <input
                type="range"
                min={-100}
                max={100}
                value={translateY}
                onChange={(e) => setTranslateY(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-center h-48 rounded-xl bg-muted/30 relative">
            {/* Crosshair */}
            <div className="absolute w-full h-0.5 bg-muted-foreground/10 top-1/2" />
            <div className="absolute h-full w-0.5 bg-muted-foreground/10 left-1/2" />

            {/* Ghost */}
            <div className="w-16 h-12 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />

            <motion.div
              className="w-16 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-[9px] font-mono text-white"
              animate={{ x: translateX, y: translateY }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {translateX},{translateY}
            </motion.div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.box {
  transform: translate(${translateX}px, ${translateY}px);
}`}
          </div>
        </CardContent>
      </Card>

      {/* Percentage values */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Percentage Values</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When using percentages with translate, they are relative to the element&apos;s own size, not the parent.
            This is extremely useful for centering.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-blue-500 text-[10px]">Percentage = Self Size</Badge>
              <div className="flex items-center justify-center h-32 rounded-lg bg-muted/30 relative">
                <div className="w-24 h-16 border-2 border-dashed border-muted-foreground/20 absolute rounded-lg" />
                <motion.div
                  className="w-24 h-16 rounded-lg bg-blue-500/80 flex flex-col items-center justify-center gap-0.5"
                  animate={{ x: "50%" }}
                  transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                >
                  <span className="text-[9px] text-white font-bold">width: 96px</span>
                  <span className="text-[9px] text-white/80">50% = 48px</span>
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                translate(50%) moves by half of the element&apos;s own width
              </p>
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-emerald-500 text-[10px]">Centering Pattern</Badge>
              <div className="flex items-center justify-center h-32 rounded-lg bg-muted/30 relative border-2 border-dashed border-muted-foreground/20">
                <motion.div
                  className="absolute bg-purple-500 rounded-lg flex items-center justify-center px-3 py-2"
                  style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                >
                  <span className="text-[9px] text-white font-bold">Centered!</span>
                </motion.div>
                <span className="absolute top-1 left-1 text-[9px] text-muted-foreground">parent</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Classic centering: top: 50% + left: 50% + translate(-50%, -50%)
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Classic centering with translate */
.parent {
  position: relative;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* How it works:
   1. top/left 50% → top-left corner at center
   2. translate(-50%, -50%) → shifts back by
      half its own width and height
   3. Result: perfectly centered!

   Modern alternative: place-items in grid
   .parent { display: grid; place-items: center; }
*/`}
          </div>
        </CardContent>
      </Card>

      {/* Performance comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance: translate vs top/left</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Using transform: translate() for movement animations is significantly more performant
            than animating top/left/margin properties.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Aspect</th>
                  <th className="text-left p-2">transform: translate()</th>
                  <th className="text-left p-2">top / left</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: "Layout trigger", translate: "No reflow", topLeft: "Triggers reflow" },
                  { aspect: "Paint trigger", translate: "No repaint", topLeft: "Triggers repaint" },
                  { aspect: "Thread", translate: "Compositor (GPU)", topLeft: "Main thread (CPU)" },
                  { aspect: "FPS impact", translate: "Smooth 60fps", topLeft: "Can drop frames" },
                  { aspect: "Affects siblings", translate: "No", topLeft: "Yes (reflow)" },
                  { aspect: "Sub-pixel rendering", translate: "Yes (smoother)", topLeft: "No (snaps to pixels)" },
                ].map((row) => (
                  <tr key={row.aspect} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.aspect}</td>
                    <td className="p-2 text-emerald-600 dark:text-emerald-400">{row.translate}</td>
                    <td className="p-2 text-red-600 dark:text-red-400">{row.topLeft}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* GOOD: GPU-composited animation */
.slide-in {
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}
.slide-in.active {
  transform: translateX(0);
}

/* BAD: triggers layout on every frame */
.slide-in-bad {
  position: relative;
  left: -100%;
  transition: left 0.3s ease-out;
}
.slide-in-bad.active {
  left: 0;
}

/* Interview tip:
   Always use transform for movement
   animations. It's one of only two
   properties (with opacity) that
   the GPU can animate. */`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
