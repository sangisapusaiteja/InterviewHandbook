"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type AnimationProp = "iteration" | "direction" | "fill-mode" | "play-state";
type Direction = "normal" | "reverse" | "alternate" | "alternate-reverse";
type FillMode = "none" | "forwards" | "backwards" | "both";

const animationProps: { id: AnimationProp; label: string }[] = [
  { id: "iteration", label: "iteration-count" },
  { id: "direction", label: "direction" },
  { id: "fill-mode", label: "fill-mode" },
  { id: "play-state", label: "play-state" },
];

const directions: { id: Direction; label: string; desc: string }[] = [
  { id: "normal", label: "normal", desc: "Plays forwards each time (default)" },
  { id: "reverse", label: "reverse", desc: "Plays backwards each time" },
  { id: "alternate", label: "alternate", desc: "Plays forwards, then backwards" },
  { id: "alternate-reverse", label: "alternate-reverse", desc: "Plays backwards, then forwards" },
];

const fillModes: { id: FillMode; label: string; desc: string }[] = [
  { id: "none", label: "none", desc: "Returns to initial state after animation (default)" },
  { id: "forwards", label: "forwards", desc: "Keeps the final keyframe state" },
  { id: "backwards", label: "backwards", desc: "Applies first keyframe during delay" },
  { id: "both", label: "both", desc: "Combines forwards and backwards" },
];

export function CSSAnimationsVisualization() {
  const [activeProp, setActiveProp] = useState<AnimationProp>("iteration");
  const [activeDirection, setActiveDirection] = useState<Direction>("normal");
  const [activeFillMode, setActiveFillMode] = useState<FillMode>("none");
  const [isPaused, setIsPaused] = useState(false);
  const [iterCount, setIterCount] = useState<number | "infinite">(3);

  return (
    <div className="space-y-6">
      {/* Animations vs Transitions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Animations vs Transitions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            CSS animations and transitions both animate properties, but they serve different purposes
            and have different capabilities.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Transitions</th>
                  <th className="text-left p-2">Animations</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Trigger", transition: "Requires state change (:hover, class toggle)", animation: "Runs automatically or on class add" },
                  { feature: "Keyframes", transition: "Only start and end states", animation: "Multiple intermediate steps" },
                  { feature: "Looping", transition: "Cannot loop", animation: "Can loop infinitely" },
                  { feature: "Direction", transition: "Reverses when state reverts", animation: "Can alternate, reverse, etc." },
                  { feature: "Pause/Resume", transition: "Not possible", animation: "animation-play-state" },
                  { feature: "Complexity", transition: "Simple A → B changes", animation: "Complex multi-step sequences" },
                  { feature: "Use case", transition: "Hover effects, toggles", animation: "Loading spinners, attention seekers" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2 text-muted-foreground">{row.transition}</td>
                    <td className="p-2 text-muted-foreground">{row.animation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-3">
              <Badge variant="outline" className="text-[10px]">Transition</Badge>
              <div className="flex items-center justify-center h-20 rounded-lg bg-muted/30">
                <motion.div
                  className="w-16 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold cursor-pointer"
                  whileHover={{ scale: 1.2, backgroundColor: "#8b5cf6" }}
                  transition={{ duration: 0.3 }}
                >
                  Hover
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Needs a trigger (hover). Simple A to B.
              </p>
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <Badge className="bg-blue-500 text-[10px]">Animation</Badge>
              <div className="flex items-center justify-center h-20 rounded-lg bg-muted/30">
                <motion.div
                  className="w-16 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold"
                  animate={{
                    scale: [1, 1.2, 1],
                    backgroundColor: ["#3b82f6", "#8b5cf6", "#3b82f6"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Auto
                </motion.div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center">
                Runs automatically. Multi-step, loops.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animation shorthand */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Animation Shorthand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The animation shorthand combines up to 8 sub-properties in a single declaration.
          </p>

          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Animation shorthand syntax */
animation: name duration timing delay
           iteration direction fill-mode play-state;

/* Example */
.element {
  animation: slideIn 0.5s ease-out 0.2s
             1 normal forwards running;
}

/* Minimum required: name + duration */
.simple {
  animation: fadeIn 0.3s;
}`}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "name", value: "slideIn", desc: "References @keyframes name" },
              { name: "duration", value: "0.5s", desc: "How long one cycle takes" },
              { name: "timing-function", value: "ease-out", desc: "Acceleration curve" },
              { name: "delay", value: "0.2s", desc: "Wait before starting" },
              { name: "iteration-count", value: "1", desc: "How many times to play" },
              { name: "direction", value: "normal", desc: "Forward, reverse, alternate" },
              { name: "fill-mode", value: "forwards", desc: "State before/after animation" },
              { name: "play-state", value: "running", desc: "Running or paused" },
            ].map((prop, i) => (
              <motion.div
                key={prop.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border p-2.5 space-y-1"
              >
                <p className="text-[10px] font-semibold text-primary">{prop.name}</p>
                <code className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">{prop.value}</code>
                <p className="text-[10px] text-muted-foreground">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive sub-property demos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Animation Properties in Detail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {animationProps.map((prop) => (
              <button
                key={prop.id}
                onClick={() => setActiveProp(prop.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeProp === prop.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {prop.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Iteration Count */}
      {activeProp === "iteration" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">animation-iteration-count</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Controls how many times the animation plays. Can be a number or the keyword infinite.
            </p>

            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, "infinite" as const].map((count) => (
                <button
                  key={String(count)}
                  onClick={() => setIterCount(count)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    iterCount === count
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {String(count)}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center h-24 rounded-xl bg-muted/30">
              <motion.div
                key={String(iterCount)}
                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold"
                animate={{ x: [0, 120, 0] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: iterCount === "infinite" ? Infinity : (iterCount as number) - 1,
                }}
              >
                {String(iterCount)}
              </motion.div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Iteration count */
.once     { animation-iteration-count: 1; }
.twice    { animation-iteration-count: 2; }
.forever  { animation-iteration-count: infinite; }

/* Decimal values play partial cycles */
.half     { animation-iteration-count: 0.5; }
/* Plays only the first half */`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Direction */}
      {activeProp === "direction" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">animation-direction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Determines whether the animation plays forwards, backwards, or alternates between the two.
            </p>

            <div className="flex flex-wrap gap-2">
              {directions.map((dir) => (
                <button
                  key={dir.id}
                  onClick={() => setActiveDirection(dir.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeDirection === dir.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {dir.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeDirection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-xl border p-4 space-y-2">
                <Badge className="bg-blue-500 text-[10px]">{activeDirection}</Badge>
                <p className="text-[10px] text-muted-foreground">
                  {directions.find((d) => d.id === activeDirection)?.desc}
                </p>

                <div className="relative h-12 rounded-lg bg-muted/30 overflow-hidden">
                  <motion.div
                    key={activeDirection}
                    className="absolute top-1 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center"
                    animate={{
                      left: activeDirection === "reverse" || activeDirection === "alternate-reverse"
                        ? ["calc(100% - 44px)", "4px"]
                        : ["4px", "calc(100% - 44px)"],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: activeDirection.includes("alternate") ? "reverse" : "loop",
                    }}
                  >
                    <span className="text-[8px] text-white font-bold">
                      {activeDirection === "normal" && "→"}
                      {activeDirection === "reverse" && "←"}
                      {activeDirection === "alternate" && "↔"}
                      {activeDirection === "alternate-reverse" && "↔"}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Direction values */
.normal    { animation-direction: normal; }
.reverse   { animation-direction: reverse; }
.alternate { animation-direction: alternate; }
.alt-rev   { animation-direction: alternate-reverse; }

/* "alternate" is great for ping-pong
   effects like a pulsing heart icon:
   grows → shrinks → grows → shrinks */`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fill Mode */}
      {activeProp === "fill-mode" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">animation-fill-mode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Determines what styles are applied before the animation starts and after it ends.
              This is one of the most commonly misunderstood animation properties.
            </p>

            <div className="flex flex-wrap gap-2">
              {fillModes.map((fm) => (
                <button
                  key={fm.id}
                  onClick={() => setActiveFillMode(fm.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeFillMode === fm.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {fm.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeFillMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-xl border p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500 text-[10px]">{activeFillMode}</Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {fillModes.find((f) => f.id === activeFillMode)?.desc}
                  </span>
                </div>

                <div className="relative h-16 rounded-lg bg-muted/30 flex items-center px-4">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-[9px] text-muted-foreground w-10">Start</span>
                    <div className="flex-1 h-1 bg-muted-foreground/20 rounded relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-foreground/40" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-foreground/40" />
                    </div>
                    <span className="text-[9px] text-muted-foreground w-10 text-right">End</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[10px]">
                  <div className="rounded-lg bg-muted/50 p-2 text-center">
                    <p className="font-semibold">Before</p>
                    <p className="text-muted-foreground">
                      {activeFillMode === "backwards" || activeFillMode === "both"
                        ? "First keyframe"
                        : "Original styles"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-500/20 p-2 text-center border border-blue-500/30">
                    <p className="font-semibold text-blue-600 dark:text-blue-400">During</p>
                    <p className="text-muted-foreground">Keyframes play</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2 text-center">
                    <p className="font-semibold">After</p>
                    <p className="text-muted-foreground">
                      {activeFillMode === "forwards" || activeFillMode === "both"
                        ? "Last keyframe"
                        : "Original styles"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* fill-mode values */
.none {
  animation-fill-mode: none;
  /* Snaps back to original after animation */
}

.forwards {
  animation-fill-mode: forwards;
  /* Keeps the LAST keyframe styles */
  /* Most commonly used! */
}

.backwards {
  animation-fill-mode: backwards;
  /* Applies FIRST keyframe during delay */
}

.both {
  animation-fill-mode: both;
  /* forwards + backwards combined */
}

/* Interview tip:
   "forwards" is the most commonly needed.
   Without it, elements snap back to their
   original state after animating. */`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Play State */}
      {activeProp === "play-state" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">animation-play-state</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Allows pausing and resuming animations. The animation picks up exactly where it left off.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPaused(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !isPaused
                    ? "bg-emerald-500 text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                running
              </button>
              <button
                onClick={() => setIsPaused(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isPaused
                    ? "bg-red-500 text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                paused
              </button>
            </div>

            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={isPaused ? "bg-red-500 text-[10px]" : "bg-emerald-500 text-[10px]"}>
                  {isPaused ? "paused" : "running"}
                </Badge>
              </div>

              <div className="flex items-center justify-center h-24 rounded-lg bg-muted/30">
                <motion.div
                  className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center"
                  animate={isPaused ? {} : { rotate: 360 }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  <div className="w-1.5 h-4 bg-white rounded-full" />
                </motion.div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <motion.div
                  className="w-8 h-8 rounded bg-purple-500"
                  animate={isPaused ? {} : {
                    x: [0, 100, 100, 0, 0],
                    y: [0, 0, 50, 50, 0],
                  }}
                  transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Pause/resume animation */
.spinner {
  animation: spin 2s linear infinite;
  animation-play-state: running;
}

.spinner.paused {
  animation-play-state: paused;
}

/* Common pattern: pause on hover */
.marquee {
  animation: scroll 10s linear infinite;
}

.marquee:hover {
  animation-play-state: paused;
}

/* JavaScript control */
element.style.animationPlayState =
  isPaused ? 'paused' : 'running';`}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full example */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Complete Animation Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Define the keyframes */
@keyframes slideInBounce {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  60% {
    transform: translateX(10%);
    opacity: 1;
  }
  80% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Apply the animation */
.notification {
  animation: slideInBounce 0.6s ease-out forwards;
}

/* Shorthand breakdown:
   name:       slideInBounce
   duration:   0.6s
   timing:     ease-out
   fill-mode:  forwards (keeps final state) */`}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
