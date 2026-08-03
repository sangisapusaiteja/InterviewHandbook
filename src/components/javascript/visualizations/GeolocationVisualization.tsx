"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type GeoTab = "getCurrentPosition" | "watchPosition" | "errorHandling" | "options";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<GeoTab, GroupInfo> = {
  getCurrentPosition: {
    label: "getCurrentPosition",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "Requests the device&apos;s current position once. The browser prompts the user for permission, then returns a Position object with latitude, longitude, and accuracy.",
    codeSnippet: `navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);
    console.log("Accuracy:", position.coords.accuracy, "m");
  },
  (error) => {
    console.log("Error:", error.message);
  }
);`,
    codeOutput: [
      "Latitude: 40.7128",
      "Longitude: -74.006",
      "Accuracy: 25 m",
    ],
  },
  watchPosition: {
    label: "watchPosition",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Continuously monitors the device&apos;s position. Returns a watchId that can be passed to clearWatch() to stop tracking. The callback fires whenever the position changes.",
    codeSnippet: `const watchId = navigator.geolocation.watchPosition(
  (position) => {
    console.log("Lat:", position.coords.latitude);
    console.log("Lng:", position.coords.longitude);
    console.log("Update received!");
  },
  (error) => {
    console.log("Watch error:", error.message);
  }
);

// Stop watching later
// navigator.geolocation.clearWatch(watchId);
console.log("Watch ID:", watchId);`,
    codeOutput: [
      "Lat: 40.7128",
      "Lng: -74.006",
      "Update received!",
      "Watch ID: 1",
    ],
  },
  errorHandling: {
    label: "Error Handling",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "The error callback receives a GeolocationPositionError with a code property: PERMISSION_DENIED (1), POSITION_UNAVAILABLE (2), or TIMEOUT (3).",
    codeSnippet: `navigator.geolocation.getCurrentPosition(
  (pos) => console.log("Success:", pos.coords.latitude),
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("Error: Permission denied by user");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Error: Position unavailable");
        break;
      case error.TIMEOUT:
        console.log("Error: Request timed out");
        break;
    }
    console.log("Code:", error.code);
    console.log("Message:", error.message);
  }
);`,
    codeOutput: [
      "Error: Permission denied by user",
      "Code: 1",
      "Message: User denied Geolocation",
    ],
  },
  options: {
    label: "Options",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The optional third argument is a PositionOptions object with enableHighAccuracy (GPS vs Wi-Fi), timeout (max wait in ms), and maximumAge (cache duration in ms).",
    codeSnippet: `const options = {
  enableHighAccuracy: true, // Use GPS if available
  timeout: 5000,           // Wait max 5 seconds
  maximumAge: 0,           // No cached positions
};

navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log("Lat:", position.coords.latitude);
    console.log("Lng:", position.coords.longitude);
    console.log("Accuracy:", position.coords.accuracy, "m");
    console.log("High accuracy enabled");
  },
  (error) => console.log("Error:", error.message),
  options
);`,
    codeOutput: [
      "Lat: 40.71284",
      "Lng: -74.00597",
      "Accuracy: 5 m",
      "High accuracy enabled",
    ],
  },
};

const order: GeoTab[] = ["getCurrentPosition", "watchPosition", "errorHandling", "options"];

// ─── simulated location flow states ─────────────────────────────────────────
type FlowState = "idle" | "requesting" | "permission" | "locating" | "done";

// ─── grid coordinates for visual ────────────────────────────────────────────
const gridSize = 7;

// ─── reference table data ───────────────────────────────────────────────────
const propertyRows = [
  { property: "coords.latitude", type: "number", description: "Latitude in decimal degrees" },
  { property: "coords.longitude", type: "number", description: "Longitude in decimal degrees" },
  { property: "coords.accuracy", type: "number", description: "Accuracy of position in meters" },
  { property: "coords.altitude", type: "number | null", description: "Altitude in meters above sea level" },
  { property: "coords.altitudeAccuracy", type: "number | null", description: "Accuracy of altitude in meters" },
  { property: "coords.heading", type: "number | null", description: "Direction of travel in degrees (0-360)" },
  { property: "coords.speed", type: "number | null", description: "Speed in meters per second" },
  { property: "timestamp", type: "number", description: "Time the position was acquired (ms since epoch)" },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function GeolocationVisualization() {
  const [selected, setSelected] = useState<GeoTab>("getCurrentPosition");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [flowState, setFlowState] = useState<FlowState>("idle");
  const [pinPosition, setPinPosition] = useState<{ row: number; col: number } | null>(null);
  const [simCoords, setSimCoords] = useState<{ lat: string; lng: string } | null>(null);

  const group = groups[selected];

  const handleSelect = (key: GeoTab) => {
    setSelected(key);
    setOutputLines(null);
  };

  const runLocationFlow = async () => {
    setFlowState("requesting");
    setPinPosition(null);
    setSimCoords(null);
    await new Promise((r) => setTimeout(r, 800));

    setFlowState("permission");
    await new Promise((r) => setTimeout(r, 1200));

    setFlowState("locating");
    await new Promise((r) => setTimeout(r, 1000));

    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    const lat = (40.7 + (row / gridSize) * 0.05).toFixed(4);
    const lng = (-74.0 + (col / gridSize) * 0.05).toFixed(4);

    setPinPosition({ row, col });
    setSimCoords({ lat, lng });
    setFlowState("done");
  };

  const resetFlow = () => {
    setFlowState("idle");
    setPinPosition(null);
    setSimCoords(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Geolocation API</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  geolocation
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive location request visual */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Simulated Location Request
          </p>
          <div className="rounded-xl border bg-muted/20 px-4 py-5 space-y-4">
            {/* Flow status indicators */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { key: "requesting", label: "Requesting...", desc: "Calling API" },
                { key: "permission", label: "Permission Prompt", desc: "Allow location?" },
                { key: "locating", label: "Locating...", desc: "Acquiring GPS" },
                { key: "done", label: "Position Found", desc: "Coordinates ready" },
              ].map((step, idx, arr) => (
                <div key={step.key} className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: flowState === step.key ? 1.15 : 1,
                      boxShadow:
                        flowState === step.key
                          ? "0 0 16px rgba(59,130,246,0.5)"
                          : "0 0 0px transparent",
                    }}
                    transition={{ duration: 0.25 }}
                    className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                      flowState === step.key
                        ? "bg-blue-500 text-white ring-2 ring-offset-2 ring-offset-background ring-blue-400"
                        : flowState === "done" &&
                          arr.findIndex((s) => s.key === step.key) < arr.length
                        ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                        : "bg-muted border border-border text-muted-foreground"
                    }`}
                  >
                    <span className="font-bold text-sm">{step.label}</span>
                    <span className="text-[10px] mt-0.5 opacity-75">{step.desc}</span>
                  </motion.div>
                  {idx < arr.length - 1 && (
                    <motion.span
                      animate={{
                        color:
                          flowState === step.key
                            ? "rgb(59,130,246)"
                            : "rgb(161,161,170)",
                      }}
                      className="text-lg font-bold select-none"
                    >
                      →
                    </motion.span>
                  )}
                </div>
              ))}
            </div>

            {/* Permission prompt simulation */}
            <AnimatePresence>
              {flowState === "permission" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mx-auto max-w-xs rounded-xl border-2 border-blue-500/50 bg-blue-500/10 px-5 py-4 text-center"
                >
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                    🌐 example.com wants to know your location
                  </p>
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 rounded-lg bg-blue-500 text-white text-xs font-semibold">
                      Allow
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-muted border text-xs text-muted-foreground font-semibold">
                      Block
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Map-like grid */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="inline-grid gap-[2px] rounded-lg overflow-hidden border"
                style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                  const row = Math.floor(idx / gridSize);
                  const col = idx % gridSize;
                  const isPin = pinPosition?.row === row && pinPosition?.col === col;
                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        backgroundColor: isPin
                          ? "rgb(239, 68, 68)"
                          : flowState === "locating"
                          ? "rgb(191, 219, 254)"
                          : "rgb(228, 228, 231)",
                        scale: isPin ? 1.3 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm flex items-center justify-center"
                    >
                      {isPin && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-white text-xs font-bold"
                        >
                          ●
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Coordinates display */}
              <AnimatePresence>
                {simCoords && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-lg border bg-zinc-900 dark:bg-zinc-950 px-4 py-2 font-mono text-xs text-emerald-400 space-y-0.5"
                  >
                    <p>latitude: {simCoords.lat}</p>
                    <p>longitude: {simCoords.lng}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action button */}
            <div className="flex justify-center">
              {flowState === "done" ? (
                <Button size="sm" variant="outline" onClick={resetFlow}>
                  Reset
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={flowState !== "idle"}
                  onClick={runLocationFlow}
                >
                  <Play className="h-3.5 w-3.5 mr-1" />
                  {flowState === "idle" ? "Get Location" : "Loading..."}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reference table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Geolocation Properties
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Property</span>
              <span>Type</span>
              <span>Description</span>
            </div>
            {propertyRows.map((row) => (
              <div
                key={row.property}
                className="grid grid-cols-3 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.property}
                </code>
                <code className="font-mono text-[11px] text-orange-700 dark:text-orange-300">
                  {row.type}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
