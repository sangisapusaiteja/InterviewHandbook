"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TransitionDemo = "color" | "size" | "position" | "opacity" | "shadow";

const transitionDemos: { id: TransitionDemo; label: string; description: string }[] = [
  { id: "color", label: "Background Color", description: "Smoothly changes from one color to another" },
  { id: "size", label: "Width / Height", description: "Animates dimensional changes" },
  { id: "position", label: "Transform", description: "Moves element smoothly" },
  { id: "opacity", label: "Opacity", description: "Fades element in or out" },
  { id: "shadow", label: "Box Shadow", description: "Transitions shadow on hover" },
];

const transitionableProps = [
  { property: "color", canTransition: true },
  { property: "background-color", canTransition: true },
  { property: "opacity", canTransition: true },
  { property: "width / height", canTransition: true },
  { property: "transform", canTransition: true },
  { property: "box-shadow", canTransition: true },
  { property: "border-radius", canTransition: true },
  { property: "margin / padding", canTransition: true },
  { property: "display", canTransition: false },
  { property: "font-family", canTransition: false },
  { property: "position", canTransition: false },
  { property: "background-image", canTransition: false },
];

export function CSSTransitionsVisualization() {
  const [activeDemo, setActiveDemo] = useState<TransitionDemo>("color");
  const [hovered, setHovered] = useState(false);

  return (
    <div className="space-y-6">
      {/* What are transitions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">What Are CSS Transitions?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            CSS transitions allow property values to change smoothly over a specified duration,
            instead of switching instantly. They create polished, professional UI interactions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <Badge variant="outline" className="text-[10px]">Without Transition</Badge>
              <div className="flex items-center justify-center h-24 rounded-lg bg-muted/30">
                <motion.div
                  className="w-20 h-12 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  animate={{ backgroundColor: hovered ? "#3b82f6" : "#ef4444" }}
                  transition={{ duration: 0 }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Hover me
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Instant change - feels jarring</p>
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-emerald-500 text-[10px]">With Transition</Badge>
              <div className="flex items-center justify-center h-24 rounded-lg bg-muted/30">
                <motion.div
                  className="w-20 h-12 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  animate={{ backgroundColor: hovered ? "#3b82f6" : "#ef4444" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Hover me
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">Smooth 0.4s transition - polished</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transition shorthand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transition Shorthand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The transition shorthand combines four sub-properties into a single declaration.
          </p>

          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Shorthand syntax */
transition: property duration timing-function delay;

/* Example */
.button {
  background-color: #3b82f6;
  transition: background-color 0.3s ease-in-out 0s;
}

.button:hover {
  background-color: #1d4ed8;
}`}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "property", value: "background-color", desc: "Which CSS property to animate" },
              { name: "duration", value: "0.3s", desc: "How long the transition takes" },
              { name: "timing-function", value: "ease-in-out", desc: "Acceleration curve" },
              { name: "delay", value: "0s", desc: "Wait before starting" },
            ].map((part, i) => (
              <motion.div
                key={part.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border p-3 space-y-1"
              >
                <p className="text-xs font-semibold text-primary">{part.name}</p>
                <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">{part.value}</code>
                <p className="text-[10px] text-muted-foreground">{part.desc}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive property demos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transition in Action</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {transitionDemos.map((demo) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDemo === demo.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {demo.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeDemo}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 gap-3">
              <p className="text-[10px] text-muted-foreground">
                {transitionDemos.find((d) => d.id === activeDemo)?.description}
              </p>
              {activeDemo === "color" && (
                <motion.div
                  className="w-24 h-16 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  whileHover={{ backgroundColor: "#8b5cf6" }}
                  animate={{ backgroundColor: "#3b82f6" }}
                  transition={{ duration: 0.5 }}
                >
                  Hover me
                </motion.div>
              )}
              {activeDemo === "size" && (
                <motion.div
                  className="h-16 rounded-lg bg-blue-500 flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  whileHover={{ width: 160 }}
                  animate={{ width: 96 }}
                  transition={{ duration: 0.5 }}
                >
                  Hover me
                </motion.div>
              )}
              {activeDemo === "position" && (
                <motion.div
                  className="w-16 h-16 rounded-lg bg-blue-500 flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  whileHover={{ x: 60 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Hover
                </motion.div>
              )}
              {activeDemo === "opacity" && (
                <motion.div
                  className="w-24 h-16 rounded-lg bg-blue-500 flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  whileHover={{ opacity: 0.3 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Hover me
                </motion.div>
              )}
              {activeDemo === "shadow" && (
                <motion.div
                  className="w-24 h-16 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center text-[10px] font-semibold cursor-pointer border"
                  whileHover={{ boxShadow: "0 20px 40px rgba(59,130,246,0.4)" }}
                  animate={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.4 }}
                >
                  Hover me
                </motion.div>
              )}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeDemo === "color" &&
`.box {
  background-color: #3b82f6;
  transition: background-color 0.5s;
}

.box:hover {
  background-color: #8b5cf6;
}`}
              {activeDemo === "size" &&
`.box {
  width: 96px;
  transition: width 0.5s ease;
}

.box:hover {
  width: 160px;
}`}
              {activeDemo === "position" &&
`.box {
  transform: translateX(0);
  transition: transform 0.5s ease;
}

.box:hover {
  transform: translateX(60px);
}`}
              {activeDemo === "opacity" &&
`.box {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.box:hover {
  opacity: 0.3;
}`}
              {activeDemo === "shadow" &&
`.box {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.4s ease;
}

.box:hover {
  box-shadow: 0 20px 40px
    rgba(59,130,246,0.4);
}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Transitionable properties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Which Properties Can Be Transitioned?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Only properties with interpolatable values (numeric, color) can be transitioned.
            Discrete properties like display or font-family cannot.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {transitionableProps.map((prop, i) => (
              <motion.div
                key={prop.property}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-lg border p-2 text-center ${
                  prop.canTransition
                    ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800"
                    : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                }`}
              >
                <code className="text-[10px] font-mono font-semibold">{prop.property}</code>
                <p className="text-[10px] mt-1">
                  {prop.canTransition ? (
                    <span className="text-emerald-600 dark:text-emerald-400">Transitionable</span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">Not transitionable</span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Rule of thumb:
   If a property has a midpoint value,
   it can be transitioned.

   color: red -> blue  (midpoint: purple) ✓
   display: none -> block  (no midpoint) ✗
*/

/* Transition multiple properties */
.element {
  transition: background-color 0.3s,
              transform 0.3s,
              opacity 0.3s;
}`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
