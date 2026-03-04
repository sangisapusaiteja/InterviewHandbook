"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SyntaxType = "from-to" | "percentage";
type AnimExample = "bounce" | "fade" | "slide" | "pulse" | "shake" | "spin";

const syntaxTypes: { id: SyntaxType; label: string; desc: string }[] = [
  { id: "from-to", label: "from / to", desc: "Simple two-state animation (start and end)" },
  { id: "percentage", label: "Percentage Stops", desc: "Multi-step animation with precise timing control" },
];

const animExamples: { id: AnimExample; label: string; desc: string }[] = [
  { id: "bounce", label: "Bounce", desc: "Bouncing entrance effect" },
  { id: "fade", label: "Fade In", desc: "Smooth opacity fade" },
  { id: "slide", label: "Slide In", desc: "Slides from the left" },
  { id: "pulse", label: "Pulse", desc: "Attention-seeking pulse" },
  { id: "shake", label: "Shake", desc: "Error/validation shake" },
  { id: "spin", label: "Spin", desc: "Loading spinner rotation" },
];

export function KeyframesVisualization() {
  const [activeSyntax, setActiveSyntax] = useState<SyntaxType>("from-to");
  const [activeAnim, setActiveAnim] = useState<AnimExample>("bounce");
  const [replayKey, setReplayKey] = useState(0);

  const replay = () => setReplayKey((k) => k + 1);

  const getAnimationProps = (anim: AnimExample) => {
    switch (anim) {
      case "bounce":
        return {
          animate: { y: [80, -20, 10, -5, 0], opacity: [0, 1, 1, 1, 1] },
          transition: { duration: 1, ease: "easeOut" as const, times: [0, 0.4, 0.65, 0.82, 1] },
        };
      case "fade":
        return {
          animate: { opacity: [0, 1] },
          transition: { duration: 1, ease: "easeInOut" as const },
        };
      case "slide":
        return {
          animate: { x: [-200, 0], opacity: [0, 1] },
          transition: { duration: 0.6, ease: "easeOut" as const },
        };
      case "pulse":
        return {
          animate: { scale: [1, 1.15, 1], boxShadow: ["0 0 0 0 rgba(59,130,246,0.4)", "0 0 0 15px rgba(59,130,246,0)", "0 0 0 0 rgba(59,130,246,0)"] },
          transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
        };
      case "shake":
        return {
          animate: { x: [0, -10, 10, -10, 10, -5, 5, 0] },
          transition: { duration: 0.5, ease: "easeInOut" as const },
        };
      case "spin":
        return {
          animate: { rotate: 360 },
          transition: { duration: 1, ease: "linear" as const, repeat: Infinity },
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* @keyframes syntax */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">@keyframes Syntax</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The @keyframes rule defines the steps of an animation. You can use simple from/to keywords
            or percentage-based stops for fine-grained control.
          </p>

          <div className="flex flex-wrap gap-2">
            {syntaxTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveSyntax(type.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSyntax === type.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSyntax}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-blue-500 text-[10px]">
                {syntaxTypes.find((t) => t.id === activeSyntax)?.label}
              </Badge>
              <p className="text-[10px] text-muted-foreground">
                {syntaxTypes.find((t) => t.id === activeSyntax)?.desc}
              </p>

              {activeSyntax === "from-to" && (
                <div className="space-y-3">
                  {/* Timeline visualization */}
                  <div className="relative h-16 rounded-lg bg-muted/30 px-4 flex items-center">
                    <div className="w-full flex items-center justify-between relative">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded bg-blue-500/30 border-2 border-blue-500 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400">from</span>
                        </div>
                        <span className="text-[9px] text-muted-foreground">0%</span>
                      </div>
                      <div className="flex-1 h-0.5 bg-blue-500/30 mx-2 relative">
                        <motion.div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"
                          animate={{ left: ["0%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-8 h-8 rounded bg-purple-500/30 border-2 border-purple-500 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-purple-600 dark:text-purple-400">to</span>
                        </div>
                        <span className="text-[9px] text-muted-foreground">100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSyntax === "percentage" && (
                <div className="space-y-3">
                  <div className="relative h-16 rounded-lg bg-muted/30 px-3 flex items-center">
                    <div className="w-full flex items-center justify-between relative">
                      {[
                        { pct: "0%", color: "blue" },
                        { pct: "25%", color: "cyan" },
                        { pct: "50%", color: "emerald" },
                        { pct: "75%", color: "amber" },
                        { pct: "100%", color: "purple" },
                      ].map((stop, i) => (
                        <div key={stop.pct} className="flex flex-col items-center gap-1 z-10">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              stop.color === "blue" ? "border-blue-500 bg-blue-500/30" :
                              stop.color === "cyan" ? "border-cyan-500 bg-cyan-500/30" :
                              stop.color === "emerald" ? "border-emerald-500 bg-emerald-500/30" :
                              stop.color === "amber" ? "border-amber-500 bg-amber-500/30" :
                              "border-purple-500 bg-purple-500/30"
                            }`}
                          />
                          <span className="text-[8px] text-muted-foreground">{stop.pct}</span>
                        </div>
                      ))}
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-0.5 bg-muted-foreground/20" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeSyntax === "from-to" &&
`/* from/to syntax (simple) */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* "from" = 0%,  "to" = 100% */
/* Use when you only need
   start and end states */

.element {
  animation: fadeIn 0.5s ease-out;
}`}
              {activeSyntax === "percentage" &&
`/* Percentage stops (multi-step) */
@keyframes colorShift {
  0%   { background: #3b82f6; }
  25%  { background: #06b6d4; }
  50%  { background: #10b981; }
  75%  { background: #f59e0b; }
  100% { background: #8b5cf6; }
}

/* You can use any percentage 0-100 */
/* Stops don't need to be evenly spaced */

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  40%      { transform: translateY(-30px); }
  60%      { transform: translateY(-15px); }
}

/* 0% and 100% can share a rule
   using comma-separated selectors */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Multi-step animation visual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Multi-Step Animation Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Each percentage stop defines a snapshot of the element&apos;s state. The browser smoothly
            interpolates between stops.
          </p>

          <div className="rounded-xl border p-4 space-y-4">
            <div className="flex items-center justify-between">
              {[
                { pct: "0%", props: "opacity: 0\nscale: 0.5", bg: "bg-blue-500/20" },
                { pct: "30%", props: "opacity: 1\nscale: 1.1", bg: "bg-blue-500/50" },
                { pct: "60%", props: "opacity: 1\nscale: 0.95", bg: "bg-blue-500/70" },
                { pct: "100%", props: "opacity: 1\nscale: 1", bg: "bg-blue-500" },
              ].map((stop, i) => (
                <motion.div
                  key={stop.pct}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-14 h-14 rounded-lg ${stop.bg} flex items-center justify-center border border-blue-500/30`}>
                    <span className="text-[9px] font-bold text-blue-700 dark:text-blue-300">{stop.pct}</span>
                  </div>
                  <div className="text-[8px] text-muted-foreground text-center font-mono whitespace-pre">
                    {stop.props}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="h-0.5 bg-gradient-to-r from-blue-500/20 via-blue-500/60 to-blue-500 rounded-full" />

            <div className="flex items-center justify-center h-20">
              <motion.div
                key={replayKey}
                className="w-14 h-14 rounded-lg bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 1],
                  scale: [0.5, 1.1, 0.95, 1],
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.3, 0.6, 1],
                  ease: "easeOut",
                }}
              >
                Hi!
              </motion.div>
            </div>
            <button
              onClick={replay}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
            >
              Replay Animation
            </button>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  30% {
    opacity: 1;
    transform: scale(1.1);
  }
  60% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.element {
  animation: popIn 1.2s ease-out forwards;
}`}
          </div>
        </CardContent>
      </Card>

      {/* Common animation examples */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Animation Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {animExamples.map((anim) => (
              <button
                key={anim.id}
                onClick={() => {
                  setActiveAnim(anim.id);
                  replay();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeAnim === anim.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {anim.label}
              </button>
            ))}
          </div>

          <motion.div
            key={`${activeAnim}-${replayKey}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-muted/30 gap-3 min-h-[180px]">
              <p className="text-[10px] text-muted-foreground">
                {animExamples.find((a) => a.id === activeAnim)?.desc}
              </p>

              {activeAnim === "spin" ? (
                <motion.div
                  className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full"
                  style={{ borderWidth: "3px" }}
                  {...getAnimationProps(activeAnim)}
                />
              ) : (
                <motion.div
                  key={`anim-${replayKey}`}
                  className="w-20 h-14 rounded-lg bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white"
                  {...getAnimationProps(activeAnim)}
                >
                  {animExamples.find((a) => a.id === activeAnim)?.label}
                </motion.div>
              )}

              {activeAnim !== "pulse" && activeAnim !== "spin" && (
                <button
                  onClick={replay}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-[10px] font-semibold"
                >
                  Replay
                </button>
              )}
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {activeAnim === "bounce" &&
`@keyframes bounce {
  0% {
    transform: translateY(80px);
    opacity: 0;
  }
  40% {
    transform: translateY(-20px);
    opacity: 1;
  }
  65% {
    transform: translateY(10px);
  }
  82% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.element {
  animation: bounce 1s ease-out;
}`}
              {activeAnim === "fade" &&
`@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 1s ease-in-out;
}

/* Fade out variation */
@keyframes fadeOut {
  from { opacity: 1; }
  to   { opacity: 0; }
}`}
              {activeAnim === "slide" &&
`@keyframes slideIn {
  from {
    transform: translateX(-200px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation: slideIn 0.6s ease-out;
}

/* Slide from different directions */
/* Right: translateX(200px)
   Top:   translateY(-200px)
   Bottom: translateY(200px) */`}
              {activeAnim === "pulse" &&
`@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0
      rgba(59, 130, 246, 0.4);
  }
  70% {
    transform: scale(1.15);
    box-shadow: 0 0 0 15px
      rgba(59, 130, 246, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0
      rgba(59, 130, 246, 0);
  }
}

.notification {
  animation: pulse 1.5s ease-in-out
    infinite;
}`}
              {activeAnim === "shake" &&
`@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%      { transform: translateX(-10px); }
  30%      { transform: translateX(10px); }
  50%      { transform: translateX(-10px); }
  70%      { transform: translateX(10px); }
  80%      { transform: translateX(-5px); }
  90%      { transform: translateX(5px); }
}

.error-input {
  animation: shake 0.5s ease-in-out;
}

/* Great for form validation errors */`}
              {activeAnim === "spin" &&
`@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #3b82f6;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* "linear" for constant speed
   "infinite" for continuous loop */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Performance tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Not all CSS properties are equal when it comes to animation performance. Knowing which
            properties to animate is a key interview topic.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-emerald-500 text-[10px]">Cheap to Animate (GPU)</Badge>
              <div className="space-y-2">
                {[
                  { prop: "transform", desc: "translate, rotate, scale - compositor thread" },
                  { prop: "opacity", desc: "Fade effects - compositor thread" },
                ].map((item) => (
                  <div key={item.prop} className="flex items-start gap-2">
                    <code className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded text-emerald-700 dark:text-emerald-400 shrink-0">
                      {item.prop}
                    </code>
                    <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground border-t pt-2">
                These two properties are handled by the GPU compositor, bypassing the main thread entirely.
                They never trigger layout or paint.
              </p>
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <Badge variant="outline" className="text-[10px] border-red-500 text-red-500">Expensive to Animate (CPU)</Badge>
              <div className="space-y-2">
                {[
                  { prop: "width / height", desc: "Triggers layout recalculation" },
                  { prop: "top / left", desc: "Triggers layout recalculation" },
                  { prop: "margin / padding", desc: "Triggers layout recalculation" },
                  { prop: "border-width", desc: "Triggers layout + paint" },
                  { prop: "font-size", desc: "Triggers layout + paint" },
                  { prop: "box-shadow", desc: "Triggers paint (no layout)" },
                ].map((item) => (
                  <div key={item.prop} className="flex items-start gap-2">
                    <code className="text-[10px] font-mono bg-red-100 dark:bg-red-950/50 px-1.5 py-0.5 rounded text-red-700 dark:text-red-400 shrink-0">
                      {item.prop}
                    </code>
                    <span className="text-[10px] text-muted-foreground">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4 space-y-3">
            <p className="text-xs font-semibold">The Rendering Pipeline</p>
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { label: "JavaScript", color: "bg-yellow-500" },
                { label: "Style", color: "bg-purple-500" },
                { label: "Layout", color: "bg-red-500" },
                { label: "Paint", color: "bg-orange-500" },
                { label: "Composite", color: "bg-emerald-500" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  {i > 0 && <span className="text-muted-foreground text-xs">{"\u2192"}</span>}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${step.color} px-3 py-1.5 rounded-lg text-white text-[10px] font-semibold whitespace-nowrap`}
                  >
                    {step.label}
                  </motion.div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">
              transform and opacity skip Layout and Paint, going straight to Composite. This is why they are so fast.
            </p>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* GOOD: Only animate transform + opacity */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* BAD: Animating layout properties */
@keyframes slideInBad {
  from {
    left: -100%;     /* triggers layout! */
    margin-top: 20px; /* triggers layout! */
  }
  to {
    left: 0;
    margin-top: 0;
  }
}

/* Promote to own layer for best perf */
.animated-element {
  will-change: transform, opacity;
  /* or: transform: translateZ(0); */
}

/* Interview answer:
   "For 60fps animations, only animate
    transform and opacity. They're the
    only properties composited on the
    GPU, avoiding layout and paint." */`}
          </div>
        </CardContent>
      </Card>

      {/* Interview tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Question</th>
                  <th className="text-left p-2">Key Points</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    q: "Difference between from/to and %?",
                    a: "from/to is for simple 2-state animations. Percentages allow multi-step with precise control.",
                  },
                  {
                    q: "Why use transform for animations?",
                    a: "transform and opacity are composited on the GPU, skipping layout and paint. Gives smooth 60fps.",
                  },
                  {
                    q: "What is will-change?",
                    a: "Hints the browser to prepare GPU layer. Use sparingly on elements about to animate.",
                  },
                  {
                    q: "animation vs transition?",
                    a: "Transitions need triggers and are A→B. Animations run automatically, loop, and have keyframes.",
                  },
                  {
                    q: "What does forwards fill-mode do?",
                    a: "Keeps the element styled as the last keyframe after the animation ends (instead of snapping back).",
                  },
                ].map((row) => (
                  <tr key={row.q} className="border-b last:border-0">
                    <td className="p-2 font-semibold text-primary">{row.q}</td>
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
