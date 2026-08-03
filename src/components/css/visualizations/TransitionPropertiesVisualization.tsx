"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TimingFunction = "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier";

const timingFunctions: { id: TimingFunction; label: string; description: string; css: string }[] = [
  { id: "linear", label: "linear", description: "Constant speed from start to finish", css: "linear" },
  { id: "ease", label: "ease", description: "Starts slow, speeds up, then slows down (default)", css: "ease" },
  { id: "ease-in", label: "ease-in", description: "Starts slow, accelerates to the end", css: "ease-in" },
  { id: "ease-out", label: "ease-out", description: "Starts fast, decelerates to the end", css: "ease-out" },
  { id: "ease-in-out", label: "ease-in-out", description: "Slow start, fast middle, slow end", css: "ease-in-out" },
  { id: "cubic-bezier", label: "cubic-bezier", description: "Custom curve with four control points", css: "cubic-bezier(0.68, -0.55, 0.27, 1.55)" },
];

const easingMap: Record<TimingFunction, [number, number, number, number]> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1],
  "cubic-bezier": [0.68, -0.55, 0.27, 1.55],
};

export function TransitionPropertiesVisualization() {
  const [activeTiming, setActiveTiming] = useState<TimingFunction>("ease");
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<"timing" | "duration" | "delay" | "multiple">("timing");

  const triggerAnimation = () => {
    setIsAnimating(false);
    requestAnimationFrame(() => setIsAnimating(true));
  };

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transition Sub-Properties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["timing", "duration", "delay", "multiple"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {tab === "timing" && "Timing Functions"}
                {tab === "duration" && "Duration"}
                {tab === "delay" && "Delay"}
                {tab === "multiple" && "Multiple Transitions"}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timing Functions */}
      {activeTab === "timing" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">transition-timing-function</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Controls the acceleration curve of the transition. Determines how intermediate values are calculated.
            </p>

            <div className="flex flex-wrap gap-2">
              {timingFunctions.map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => {
                    setActiveTiming(tf.id);
                    triggerAnimation();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTiming === tf.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTiming}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="rounded-xl border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 text-[10px]">{activeTiming}</Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {timingFunctions.find((t) => t.id === activeTiming)?.description}
                  </span>
                </div>

                {/* Animation track */}
                <div className="relative h-12 rounded-lg bg-muted/30 overflow-hidden">
                  <div className="absolute inset-0 flex items-center px-2">
                    <div className="w-full h-0.5 bg-muted-foreground/20 rounded" />
                  </div>
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                    initial={{ left: "4px" }}
                    animate={{ left: isAnimating ? "calc(100% - 44px)" : "4px" }}
                    transition={{
                      duration: 1.5,
                      ease: easingMap[activeTiming],
                    }}
                  >
                    <span className="text-[9px] text-white font-bold">GO</span>
                  </motion.div>
                </div>

                <button
                  onClick={triggerAnimation}
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors"
                >
                  Play Animation
                </button>
              </div>

              {/* All timing functions racing */}
              <div className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-semibold mb-3">Compare All Timing Functions</p>
                {timingFunctions.map((tf) => (
                  <div key={tf.id} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono w-24 text-right text-muted-foreground">{tf.label}</span>
                    <div className="flex-1 relative h-6 rounded bg-muted/30">
                      <motion.div
                        className={`absolute top-0.5 w-5 h-5 rounded-full ${
                          tf.id === activeTiming ? "bg-blue-500" : "bg-muted-foreground/40"
                        }`}
                        initial={{ left: "2px" }}
                        animate={{ left: isAnimating ? "calc(100% - 22px)" : "2px" }}
                        transition={{
                          duration: 1.5,
                          ease: easingMap[tf.id],
                        }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={triggerAnimation}
                  className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Race All
                </button>
              </div>
            </motion.div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Timing function examples */
.ease      { transition-timing-function: ease; }
.linear    { transition-timing-function: linear; }
.ease-in   { transition-timing-function: ease-in; }
.ease-out  { transition-timing-function: ease-out; }
.ease-both { transition-timing-function: ease-in-out; }

/* Custom cubic-bezier curve */
.bounce {
  transition-timing-function:
    cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Each cubic-bezier has 4 control points:
   cubic-bezier(x1, y1, x2, y2)
   x values: 0-1, y values: any number */`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Duration */}
      {activeTab === "duration" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">transition-duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Sets how long the transition takes to complete. Can be specified in seconds (s) or milliseconds (ms).
            </p>

            <div className="rounded-xl border p-4 space-y-3">
              {[
                { duration: 0.1, label: "0.1s (100ms)", desc: "Very fast - micro-interactions" },
                { duration: 0.3, label: "0.3s (300ms)", desc: "Sweet spot for most UI" },
                { duration: 0.5, label: "0.5s (500ms)", desc: "Noticeable but smooth" },
                { duration: 1.0, label: "1.0s (1000ms)", desc: "Slow - dramatic effect" },
                { duration: 2.0, label: "2.0s (2000ms)", desc: "Very slow - background animations" },
              ].map((item) => (
                <div key={item.duration} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono w-28 text-right text-muted-foreground">{item.label}</span>
                  <div className="flex-1 relative h-8 rounded bg-muted/30 overflow-hidden">
                    <motion.div
                      className="absolute top-1 left-1 w-6 h-6 rounded bg-blue-500"
                      initial={{ x: 0 }}
                      animate={{ x: isAnimating ? 200 : 0 }}
                      transition={{ duration: item.duration, ease: "easeInOut" }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-40">{item.desc}</span>
                </div>
              ))}
              <button
                onClick={triggerAnimation}
                className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
              >
                Play All
              </button>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Duration values */
.fast   { transition-duration: 0.1s; }
.normal { transition-duration: 0.3s; }    /* ← recommended */
.slow   { transition-duration: 1s; }

/* Milliseconds also work */
.element { transition-duration: 300ms; }

/* Default is 0s (no transition) */
/* 0.2s - 0.5s is the sweet spot
   for most UI interactions */`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delay */}
      {activeTab === "delay" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">transition-delay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Specifies a waiting period before the transition starts. Useful for staggered or sequential effects.
            </p>

            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-semibold">Staggered delay effect</p>
              <div className="flex flex-col gap-2">
                {[0, 0.1, 0.2, 0.3, 0.4].map((delay) => (
                  <div key={delay} className="flex items-center gap-3">
                    <span className="text-[10px] font-mono w-20 text-right text-muted-foreground">
                      delay: {delay}s
                    </span>
                    <div className="flex-1 relative h-8 rounded bg-muted/30 overflow-hidden">
                      <motion.div
                        className="absolute top-1 left-1 w-6 h-6 rounded bg-purple-500"
                        initial={{ x: 0 }}
                        animate={{ x: isAnimating ? 200 : 0 }}
                        transition={{ duration: 0.5, delay, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={triggerAnimation}
                className="mt-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
              >
                Play Staggered
              </button>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Staggered menu items */
.menu-item:nth-child(1) { transition-delay: 0s; }
.menu-item:nth-child(2) { transition-delay: 0.1s; }
.menu-item:nth-child(3) { transition-delay: 0.2s; }
.menu-item:nth-child(4) { transition-delay: 0.3s; }

/* Common pattern for dropdown menus
   and list reveals */
.menu-item {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s, transform 0.3s;
}

.menu:hover .menu-item {
  opacity: 1;
  transform: translateY(0);
}`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Multiple transitions */}
      {activeTab === "multiple" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Multiple Transitions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You can transition multiple properties with different durations, timing functions, and delays
              by comma-separating them.
            </p>

            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-semibold">Hover to see multiple transitions</p>
              <div className="flex items-center justify-center h-32 rounded-lg bg-muted/30">
                <motion.div
                  className="w-24 h-16 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white cursor-pointer"
                  animate={{
                    backgroundColor: "#3b82f6",
                    scale: 1,
                    borderRadius: "8px",
                    rotate: 0,
                  }}
                  whileHover={{
                    backgroundColor: "#8b5cf6",
                    scale: 1.2,
                    borderRadius: "24px",
                    rotate: 5,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  Hover me
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border p-3 space-y-2">
                <Badge className="bg-emerald-500 text-[10px]">transition-property: specific</Badge>
                <p className="text-[10px] text-muted-foreground">
                  List specific properties for fine-grained control. Each can have its own duration and timing.
                </p>
              </div>
              <div className="rounded-xl border p-3 space-y-2">
                <Badge variant="outline" className="text-[10px]">transition-property: all</Badge>
                <p className="text-[10px] text-muted-foreground">
                  Transitions every changeable property. Convenient but less performant and can cause unexpected animations.
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Multiple transitions with different settings */
.card {
  background-color: white;
  transform: scale(1);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  transition:
    background-color 0.3s ease,
    transform 0.2s ease-out,
    border-radius 0.4s ease-in-out,
    box-shadow 0.3s ease;
}

.card:hover {
  background-color: #f0f0ff;
  transform: scale(1.05);
  border-radius: 16px;
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

/* vs "all" shorthand */
.simple {
  transition: all 0.3s ease;  /* less control */
}`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interview tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property</th>
                  <th className="text-left p-2">Values</th>
                  <th className="text-left p-2">Default</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: "transition-property", values: "none | all | specific props", def: "all" },
                  { prop: "transition-duration", values: "time in s or ms", def: "0s" },
                  { prop: "transition-timing-function", values: "ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier()", def: "ease" },
                  { prop: "transition-delay", values: "time in s or ms", def: "0s" },
                ].map((row) => (
                  <tr key={row.prop} className="border-b last:border-0">
                    <td className="p-2 font-mono font-semibold text-primary">{row.prop}</td>
                    <td className="p-2 text-muted-foreground">{row.values}</td>
                    <td className="p-2">
                      <code className="bg-muted px-1.5 py-0.5 rounded text-[10px]">{row.def}</code>
                    </td>
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
