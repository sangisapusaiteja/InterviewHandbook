"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TransformType = "translate" | "rotate" | "scale" | "skew" | "combined";
type OriginPosition = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

const transformTypes: { id: TransformType; label: string; desc: string }[] = [
  { id: "translate", label: "translate()", desc: "Moves the element" },
  { id: "rotate", label: "rotate()", desc: "Rotates the element" },
  { id: "scale", label: "scale()", desc: "Resizes the element" },
  { id: "skew", label: "skew()", desc: "Tilts/distorts the element" },
  { id: "combined", label: "Combined", desc: "Multiple transforms together" },
];

const originPositions: { id: OriginPosition; label: string; css: string }[] = [
  { id: "center", label: "center", css: "50% 50%" },
  { id: "top-left", label: "top left", css: "0% 0%" },
  { id: "top-right", label: "top right", css: "100% 0%" },
  { id: "bottom-left", label: "bottom left", css: "0% 100%" },
  { id: "bottom-right", label: "bottom right", css: "100% 100%" },
];

export function CSSTransformVisualization() {
  const [activeTransform, setActiveTransform] = useState<TransformType>("translate");
  const [activeOrigin, setActiveOrigin] = useState<OriginPosition>("center");
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(false);
    requestAnimationFrame(() => setIsAnimating(true));
  };

  const getTransformAnimation = () => {
    switch (activeTransform) {
      case "translate":
        return { x: isAnimating ? 60 : 0, y: isAnimating ? -20 : 0 };
      case "rotate":
        return { rotate: isAnimating ? 45 : 0 };
      case "scale":
        return { scale: isAnimating ? 1.5 : 1 };
      case "skew":
        return { skewX: isAnimating ? 20 : 0, skewY: isAnimating ? 10 : 0 };
      case "combined":
        return {
          x: isAnimating ? 40 : 0,
          rotate: isAnimating ? 30 : 0,
          scale: isAnimating ? 1.2 : 1,
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Transform Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The transform property applies 2D or 3D transformations to an element. It lets you rotate, scale,
            skew, or translate an element without affecting surrounding layout.
          </p>

          <div className="flex flex-wrap gap-2">
            {transformTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTransform(t.id);
                  triggerAnimation();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTransform === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTransform}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 gap-3 min-h-[180px]">
              <p className="text-[10px] text-muted-foreground">
                {transformTypes.find((t) => t.id === activeTransform)?.desc}
              </p>
              <div className="relative">
                {/* Ghost showing original position */}
                <div className="w-20 h-14 rounded-lg border-2 border-dashed border-muted-foreground/30 absolute" />
                <motion.div
                  className="w-20 h-14 rounded-lg bg-blue-500 flex items-center justify-center text-[10px] font-semibold text-white"
                  animate={getTransformAnimation()}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {activeTransform}
                </motion.div>
              </div>
              <button
                onClick={triggerAnimation}
                className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[10px] font-semibold"
              >
                Toggle Transform
              </button>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeTransform === "translate" &&
`.box {
  transform: translate(60px, -20px);
}

/* Individual axes */
transform: translateX(60px);
transform: translateY(-20px);

/* 3D */
transform: translate3d(x, y, z);`}
              {activeTransform === "rotate" &&
`.box {
  transform: rotate(45deg);
}

/* Units: deg, rad, turn */
transform: rotate(0.785rad);
transform: rotate(0.125turn);

/* 3D rotation */
transform: rotateX(45deg);
transform: rotateY(45deg);`}
              {activeTransform === "scale" &&
`.box {
  transform: scale(1.5);
}

/* Individual axes */
transform: scaleX(1.5);
transform: scaleY(0.8);

/* Two values: scaleX, scaleY */
transform: scale(1.5, 0.8);`}
              {activeTransform === "skew" &&
`.box {
  transform: skew(20deg, 10deg);
}

/* Individual axes */
transform: skewX(20deg);
transform: skewY(10deg);`}
              {activeTransform === "combined" &&
`/* Multiple transforms in one line */
.box {
  transform:
    translateX(40px)
    rotate(30deg)
    scale(1.2);
}

/* Order matters!
   Transforms apply right to left:
   1. scale(1.2)
   2. rotate(30deg)
   3. translateX(40px) */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Transform Origin */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">transform-origin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Sets the point around which transforms are applied. Default is the center of the element.
          </p>

          <div className="flex flex-wrap gap-2">
            {originPositions.map((pos) => (
              <button
                key={pos.id}
                onClick={() => setActiveOrigin(pos.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeOrigin === pos.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {pos.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center p-8 rounded-xl bg-muted/30 min-h-[180px]">
              <div className="relative">
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-muted-foreground/30 absolute" />
                <motion.div
                  className="w-24 h-24 rounded-lg bg-purple-500/80 flex items-center justify-center relative"
                  animate={{ rotate: 30 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{
                    transformOrigin: originPositions.find((p) => p.id === activeOrigin)?.css,
                  }}
                >
                  <span className="text-[10px] font-semibold text-white">rotate(30deg)</span>
                  {/* Origin indicator dot */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-yellow-400 border-2 border-white"
                    style={{
                      top: activeOrigin.includes("top") ? "-6px" : activeOrigin.includes("bottom") ? "calc(100% - 6px)" : "calc(50% - 6px)",
                      left: activeOrigin.includes("left") ? "-6px" : activeOrigin.includes("right") ? "calc(100% - 6px)" : "calc(50% - 6px)",
                    }}
                  />
                </motion.div>
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.box {
  transform: rotate(30deg);
  transform-origin: ${originPositions.find((p) => p.id === activeOrigin)?.label};
}

/* Keyword values */
transform-origin: center;       /* 50% 50% */
transform-origin: top left;     /* 0% 0% */
transform-origin: bottom right; /* 100% 100% */

/* Percentage or length values */
transform-origin: 25% 75%;
transform-origin: 10px 20px;`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transforms don't affect layout */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transforms Do Not Affect Layout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            A key concept: transforms are applied visually only. The element still occupies its original space
            in the document flow. Siblings are not pushed or displaced.
          </p>

          <div className="rounded-xl border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 rounded bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-[10px] font-mono">A</div>
              <motion.div
                className="w-16 h-12 rounded bg-blue-500 flex items-center justify-center text-[10px] font-mono text-white z-10"
                animate={{ x: 30, scale: 1.3 }}
                transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
              >
                B
              </motion.div>
              <div className="w-16 h-12 rounded bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-[10px] font-mono">C</div>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Element B is transformed but A and C stay in their original positions. The layout is unchanged.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-3 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">transform (GPU)</Badge>
              <p className="text-[10px] text-muted-foreground">
                Does not trigger layout recalculation. Handled by the GPU compositor.
                Extremely performant for animations.
              </p>
            </div>
            <div className="rounded-xl border p-3 space-y-2">
              <Badge variant="outline" className="text-[10px]">top/left/margin (CPU)</Badge>
              <p className="text-[10px] text-muted-foreground">
                Triggers layout recalculation for the element and all siblings.
                Expensive for animations, causes jank.
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* GOOD: transform doesn't affect layout */
.move-good {
  transform: translateX(100px);
  /* No reflow, GPU-accelerated */
}

/* AVOID: top/left triggers layout */
.move-bad {
  position: relative;
  left: 100px;
  /* Triggers reflow for every frame! */
}

/* Interview tip:
   "transform and opacity are the only
    properties that can be animated on the
    compositor thread (GPU), avoiding
    main thread layout/paint." */`}
          </div>
        </CardContent>
      </Card>

      {/* Combining transforms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Combining Multiple Transforms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Multiple transform functions can be combined in a single transform property. Order matters
            because transforms are applied from right to left.
          </p>

          <div className="rounded-xl border p-4 space-y-4">
            <p className="text-xs font-semibold">Order matters: translate then rotate vs rotate then translate</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-mono text-muted-foreground">translate() rotate()</p>
                <div className="relative w-full h-32 rounded-lg bg-muted/30 flex items-center justify-center">
                  <div className="w-12 h-8 rounded border-2 border-dashed border-muted-foreground/30 absolute" />
                  <motion.div
                    className="w-12 h-8 rounded bg-blue-500 absolute"
                    animate={{ x: 50, rotate: 45 }}
                    transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-mono text-muted-foreground">rotate() translate()</p>
                <div className="relative w-full h-32 rounded-lg bg-muted/30 flex items-center justify-center">
                  <div className="w-12 h-8 rounded border-2 border-dashed border-muted-foreground/30 absolute" />
                  <motion.div
                    className="w-12 h-8 rounded bg-purple-500 absolute"
                    animate={{ rotate: 45, x: 50 }}
                    transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                    style={{ transformOrigin: "center" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Multiple transforms in one property */
.element {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}

/* WRONG: second transform overwrites first! */
.broken {
  transform: translateX(50px);
  transform: rotate(45deg);  /* This replaces! */
}

/* Applied right-to-left:
   1. scale(1.2) first
   2. rotate(45deg) second
   3. translateX(50px) third */`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
