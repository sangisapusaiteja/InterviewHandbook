"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RotateUnit = "deg" | "rad" | "turn";
type RotateAxis = "2d" | "x" | "y" | "z";
type OriginDemo = "center" | "top-left" | "top-right" | "bottom-center";

const rotateUnits: { id: RotateUnit; label: string; example: string; degrees: number }[] = [
  { id: "deg", label: "Degrees (deg)", example: "rotate(45deg)", degrees: 45 },
  { id: "rad", label: "Radians (rad)", example: "rotate(0.785rad)", degrees: 45 },
  { id: "turn", label: "Turns (turn)", example: "rotate(0.125turn)", degrees: 45 },
];

const rotateAxes: { id: RotateAxis; label: string; desc: string }[] = [
  { id: "2d", label: "rotate()", desc: "Rotates around Z-axis (2D plane)" },
  { id: "x", label: "rotateX()", desc: "Rotates around horizontal X-axis (3D)" },
  { id: "y", label: "rotateY()", desc: "Rotates around vertical Y-axis (3D)" },
  { id: "z", label: "rotateZ()", desc: "Same as rotate() - around Z-axis" },
];

export function RotateVisualization() {
  const [activeUnit, setActiveUnit] = useState<RotateUnit>("deg");
  const [activeAxis, setActiveAxis] = useState<RotateAxis>("2d");
  const [activeOrigin, setActiveOrigin] = useState<OriginDemo>("center");
  const [rotationDeg, setRotationDeg] = useState(45);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="space-y-6">
      {/* Rotation units */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rotation Units</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            CSS supports three units for rotation. All describe the same thing: how far to turn an element.
          </p>

          <div className="flex flex-wrap gap-2">
            {rotateUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(unit.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeUnit === unit.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {unit.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rotateUnits.map((unit, i) => (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border p-4 space-y-3 ${
                  activeUnit === unit.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <p className="text-xs font-semibold">{unit.label}</p>
                <div className="flex items-center justify-center h-24">
                  <motion.div
                    className="w-16 h-16 rounded-lg bg-blue-500 flex items-center justify-center relative"
                    animate={{ rotate: unit.degrees }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <span className="text-[9px] text-white font-bold">{unit.id}</span>
                    {/* Arrow indicator */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-yellow-400 rounded-full" />
                  </motion.div>
                </div>
                <code className="text-[10px] font-mono bg-muted px-2 py-1 rounded block text-center">
                  {unit.example}
                </code>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* All equivalent: 45 degree rotation */
transform: rotate(45deg);     /* degrees */
transform: rotate(0.785rad);  /* radians (pi/4) */
transform: rotate(0.125turn); /* turns (1/8) */

/* Full rotation equivalents */
360deg = 6.283rad = 1turn

/* Negative = counter-clockwise */
transform: rotate(-90deg);`}
          </div>
        </CardContent>
      </Card>

      {/* Interactive rotation slider */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Rotation Playground</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold">Rotation: {rotationDeg}deg</label>
            <input
              type="range"
              min={-360}
              max={360}
              value={rotationDeg}
              onChange={(e) => setRotationDeg(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-center h-40 rounded-xl bg-muted/30">
            <div className="relative">
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />
              <motion.div
                className="w-20 h-20 rounded-lg bg-blue-500 flex items-center justify-center relative"
                animate={{ rotate: rotationDeg }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <span className="text-[10px] text-white font-bold">{rotationDeg}deg</span>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-400 rounded-full" />
              </motion.div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.box {
  transform: rotate(${rotationDeg}deg);
}`}
          </div>
        </CardContent>
      </Card>

      {/* 3D rotation axes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">3D Rotation Axes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            For 3D rotations, you can rotate around the X, Y, or Z axis. The parent needs a perspective
            value for the 3D effect to be visible.
          </p>

          <div className="flex flex-wrap gap-2">
            {rotateAxes.map((axis) => (
              <button
                key={axis.id}
                onClick={() => setActiveAxis(axis.id)}
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
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 gap-3" style={{ perspective: "500px" }}>
              <p className="text-[10px] text-muted-foreground">
                {rotateAxes.find((a) => a.id === activeAxis)?.desc}
              </p>
              <motion.div
                className="w-24 h-24 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white"
                animate={{
                  rotateX: activeAxis === "x" ? 45 : 0,
                  rotateY: activeAxis === "y" ? 45 : 0,
                  rotateZ: activeAxis === "z" || activeAxis === "2d" ? 45 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {activeAxis === "2d" ? "Z (2D)" : activeAxis.toUpperCase()} axis
              </motion.div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeAxis === "2d" &&
`/* 2D rotation (around Z axis) */
.box {
  transform: rotate(45deg);
}

/* Same as rotateZ */
transform: rotateZ(45deg);`}
              {activeAxis === "x" &&
`/* Rotate around X axis (horizontal) */
.parent {
  perspective: 500px;
}

.box {
  transform: rotateX(45deg);
}

/* Tilts forward/backward like
   opening a laptop lid */`}
              {activeAxis === "y" &&
`/* Rotate around Y axis (vertical) */
.parent {
  perspective: 500px;
}

.box {
  transform: rotateY(45deg);
}

/* Spins like a door on hinges */`}
              {activeAxis === "z" &&
`/* Rotate around Z axis */
.box {
  transform: rotateZ(45deg);
}

/* Identical to rotate()
   Z axis points toward viewer */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Transform-origin effect */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">transform-origin on Rotation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Changing transform-origin changes the pivot point of rotation. This dramatically alters
            how the element rotates.
          </p>

          <div className="flex flex-wrap gap-2">
            {([
              { id: "center" as OriginDemo, label: "center", css: "center" },
              { id: "top-left" as OriginDemo, label: "top left", css: "top left" },
              { id: "top-right" as OriginDemo, label: "top right", css: "top right" },
              { id: "bottom-center" as OriginDemo, label: "bottom center", css: "bottom center" },
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

          <div className="flex items-center justify-center h-48 rounded-xl bg-muted/30 relative">
            <div className="relative">
              <div className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/20 absolute" />
              <motion.div
                className="w-20 h-20 rounded-lg bg-purple-500/80 flex items-center justify-center relative"
                animate={{ rotate: 60 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  transformOrigin:
                    activeOrigin === "center" ? "center" :
                    activeOrigin === "top-left" ? "top left" :
                    activeOrigin === "top-right" ? "top right" :
                    "bottom center",
                }}
              >
                <span className="text-[9px] text-white font-bold">60deg</span>
                {/* Pivot point indicator */}
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-yellow-400 border-2 border-white z-10"
                  style={{
                    top: activeOrigin === "center" ? "calc(50% - 6px)" :
                         activeOrigin.startsWith("top") ? "-6px" : "calc(100% - 6px)",
                    left: activeOrigin === "center" ? "calc(50% - 6px)" :
                          activeOrigin === "top-left" ? "-6px" :
                          activeOrigin === "top-right" ? "calc(100% - 6px)" : "calc(50% - 6px)",
                  }}
                />
              </motion.div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.box {
  transform: rotate(60deg);
  transform-origin: ${
    activeOrigin === "center" ? "center" :
    activeOrigin === "top-left" ? "top left" :
    activeOrigin === "top-right" ? "top right" : "bottom center"
  };
}

/* The pivot point changes where
   the rotation "swings" from.
   Like pinning a card at different
   corners and spinning it. */`}
          </div>
        </CardContent>
      </Card>

      {/* Common uses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Rotation Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Loading spinner */}
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-blue-500 text-[10px]">Loading Spinner</Badge>
              <div className="flex items-center justify-center h-24">
                <motion.div
                  className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full"
                  style={{ borderWidth: "3px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "linear", repeat: Infinity }}
                />
              </div>
              <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.spinner {
  border: 3px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}`}
              </div>
            </div>

            {/* Card flip */}
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-purple-500 text-[10px]">Card Flip</Badge>
              <div className="flex items-center justify-center h-24" style={{ perspective: "600px" }}>
                <motion.div
                  className="w-20 h-14 rounded-lg cursor-pointer relative"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => setIsFlipped(!isFlipped)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-lg flex items-center justify-center backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                    <span className="text-[10px] text-white font-bold">Front</span>
                  </div>
                  <div className="absolute inset-0 bg-purple-500 rounded-lg flex items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <span className="text-[10px] text-white font-bold">Back</span>
                  </div>
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Click to flip</p>
              <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
}
.card.flipped {
  transform: rotateY(180deg);
}
.card .back {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}`}
              </div>
            </div>

            {/* Hamburger menu */}
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-emerald-500 text-[10px]">Hamburger to X</Badge>
              <div className="flex items-center justify-center h-24">
                <motion.button
                  className="flex flex-col gap-1.5 p-2 cursor-pointer"
                  onClick={() => setIsSpinning(!isSpinning)}
                >
                  <motion.div
                    className="w-6 h-0.5 bg-foreground rounded"
                    animate={{
                      rotate: isSpinning ? 45 : 0,
                      y: isSpinning ? 8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-foreground rounded"
                    animate={{ opacity: isSpinning ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-foreground rounded"
                    animate={{
                      rotate: isSpinning ? -45 : 0,
                      y: isSpinning ? -8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Click to toggle</p>
              <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.line1.active {
  transform: rotate(45deg)
    translateY(8px);
}
.line2.active { opacity: 0; }
.line3.active {
  transform: rotate(-45deg)
    translateY(-8px);
}`}
              </div>
            </div>

            {/* Hover rotate */}
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-orange-500 text-[10px]">Hover Rotate</Badge>
              <div className="flex items-center justify-center h-24">
                <motion.div
                  className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer text-2xl"
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-white">+</span>
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Hover for 180deg rotation</p>
              <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">
{`.icon {
  transition: transform 0.4s;
}
.icon:hover {
  transform: rotate(180deg)
    scale(1.1);
}`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
