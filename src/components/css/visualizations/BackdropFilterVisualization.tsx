"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FilterEffect = "blur" | "brightness" | "contrast" | "grayscale" | "saturate";

const effects: { id: FilterEffect; label: string; range: [number, number]; unit: string; default: number }[] = [
  { id: "blur", label: "blur()", range: [0, 20], unit: "px", default: 8 },
  { id: "brightness", label: "brightness()", range: [0, 200], unit: "%", default: 120 },
  { id: "contrast", label: "contrast()", range: [0, 200], unit: "%", default: 80 },
  { id: "grayscale", label: "grayscale()", range: [0, 100], unit: "%", default: 50 },
  { id: "saturate", label: "saturate()", range: [0, 300], unit: "%", default: 180 },
];

export function BackdropFilterVisualization() {
  const [activeEffect, setActiveEffect] = useState<FilterEffect>("blur");
  const [effectValue, setEffectValue] = useState(8);
  const [showComparison, setShowComparison] = useState(false);

  const currentEffect = effects.find((e) => e.id === activeEffect)!;

  const getFilterString = (effect: FilterEffect, value: number) => {
    switch (effect) {
      case "blur":
        return `blur(${value}px)`;
      case "brightness":
        return `brightness(${value}%)`;
      case "contrast":
        return `contrast(${value}%)`;
      case "grayscale":
        return `grayscale(${value}%)`;
      case "saturate":
        return `saturate(${value}%)`;
    }
  };

  const handleEffectChange = (effect: FilterEffect) => {
    setActiveEffect(effect);
    const e = effects.find((ef) => ef.id === effect)!;
    setEffectValue(e.default);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">backdrop-filter Effects</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {effects.map((e) => (
              <button
                key={e.id}
                onClick={() => handleEffectChange(e.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeEffect === e.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold">Value:</label>
            <input
              type="range"
              min={currentEffect.range[0]}
              max={currentEffect.range[1]}
              value={effectValue}
              onChange={(e) => setEffectValue(Number(e.target.value))}
              className="flex-1"
            />
            <Badge variant="outline" className="text-[10px] font-mono">
              {effectValue}{currentEffect.unit}
            </Badge>
          </div>

          <motion.div
            key={activeEffect}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border overflow-hidden"
          >
            {/* Background pattern to see through */}
            <div
              className="relative h-56"
              style={{
                background:
                  "linear-gradient(135deg, #6366f1 0%, #ec4899 30%, #f59e0b 60%, #10b981 100%)",
              }}
            >
              {/* Floating shapes behind the overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 left-8 w-16 h-16 rounded-full bg-white/40" />
                <div className="absolute top-12 right-16 w-20 h-12 rounded-lg bg-white/30 rotate-12" />
                <div className="absolute bottom-6 left-1/3 w-24 h-8 rounded-full bg-black/20" />
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold opacity-50">
                  Background Content
                </p>
              </div>

              {/* Backdrop filter overlay */}
              <div
                className="absolute bottom-4 left-4 right-4 rounded-xl p-4 border border-white/20"
                style={{
                  backdropFilter: getFilterString(activeEffect, effectValue),
                  WebkitBackdropFilter: getFilterString(activeEffect, effectValue),
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              >
                <p className="text-white text-xs font-bold">Glass Overlay</p>
                <p className="text-white/80 text-[10px]">
                  backdrop-filter: {getFilterString(activeEffect, effectValue)}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
            {`.overlay {\n  backdrop-filter: ${getFilterString(activeEffect, effectValue)};\n  -webkit-backdrop-filter: ${getFilterString(activeEffect, effectValue)};\n  background: rgba(255, 255, 255, 0.1);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 12px;\n}`}
          </div>
        </CardContent>
      </Card>

      {/* backdrop-filter vs filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">backdrop-filter vs filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground"
          >
            {showComparison ? "Hide" : "Show"} Side-by-Side
          </button>

          {showComparison && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* filter example */}
              <div className="rounded-xl border overflow-hidden">
                <div
                  className="relative h-40"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-lg font-bold opacity-50">
                      Background
                    </p>
                  </div>
                  <div
                    className="absolute bottom-3 left-3 right-3 rounded-lg p-3 bg-white/80"
                    style={{ filter: "blur(2px)" }}
                  >
                    <p className="text-xs font-bold">filter: blur(2px)</p>
                    <p className="text-[10px] text-muted-foreground">
                      Blurs the element itself and its content
                    </p>
                  </div>
                </div>
              </div>

              {/* backdrop-filter example */}
              <div className="rounded-xl border overflow-hidden">
                <div
                  className="relative h-40"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #ec4899)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-lg font-bold opacity-50">
                      Background
                    </p>
                  </div>
                  <div
                    className="absolute bottom-3 left-3 right-3 rounded-lg p-3 border border-white/20"
                    style={{
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      backgroundColor: "rgba(255,255,255,0.15)",
                    }}
                  >
                    <p className="text-xs font-bold text-white">
                      backdrop-filter: blur(8px)
                    </p>
                    <p className="text-[10px] text-white/80">
                      Blurs what is behind the element
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property</th>
                  <th className="text-left p-2">filter</th>
                  <th className="text-left p-2">backdrop-filter</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    prop: "What it affects",
                    filter: "The element itself and its children",
                    backdrop: "The area behind the element",
                  },
                  {
                    prop: "Content readable?",
                    filter: "No - content is also blurred",
                    backdrop: "Yes - only background is affected",
                  },
                  {
                    prop: "Common use",
                    filter: "Image effects, dimming overlays",
                    backdrop: "Glass morphism, frosted glass UI",
                  },
                  {
                    prop: "Background needed?",
                    filter: "Works on any element",
                    backdrop: "Needs semi-transparent background",
                  },
                ].map((row) => (
                  <tr key={row.prop} className="border-b last:border-0">
                    <td className="p-2 font-bold">{row.prop}</td>
                    <td className="p-2 text-muted-foreground">{row.filter}</td>
                    <td className="p-2 text-muted-foreground">{row.backdrop}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Glassmorphism recipe */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Glass Morphism Recipe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border overflow-hidden">
            <div
              className="relative h-48 p-6 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <div
                className="rounded-2xl p-6 border border-white/20 shadow-xl max-w-xs w-full"
                style={{
                  backdropFilter: "blur(16px) saturate(180%)",
                  WebkitBackdropFilter: "blur(16px) saturate(180%)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <p className="text-white text-sm font-bold">Glass Card</p>
                <p className="text-white/70 text-[10px] mt-1">
                  Frosted glass effect using backdrop-filter with blur and saturate combined.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
            {`.glass-card {
  /* The glass effect */
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);

  /* Semi-transparent background */
  background: rgba(255, 255, 255, 0.15);

  /* Subtle border for depth */
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;

  /* Optional shadow */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark glass variant */
.glass-dark {
  backdrop-filter: blur(16px) saturate(180%);
  background: rgba(17, 25, 40, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.125);
}`}
          </div>
        </CardContent>
      </Card>

      {/* Browser support */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browser Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {[
              { browser: "Chrome", version: "76+", status: "Full support" },
              { browser: "Firefox", version: "103+", status: "Full support" },
              { browser: "Safari", version: "9+ (with -webkit- prefix)", status: "Full support" },
              { browser: "Edge", version: "79+", status: "Full support" },
              { browser: "iOS Safari", version: "9+", status: "Full support (-webkit-)" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{item.browser}</span>
                  <code className="text-[10px] text-muted-foreground">{item.version}</code>
                </div>
                <Badge variant="outline" className="text-[9px]">
                  {item.status}
                </Badge>
              </motion.div>
            ))}
            <p className="text-[10px] text-muted-foreground mt-2">
              Always include the -webkit- prefix for Safari compatibility. Combined global support is approximately 95%+.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
