"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FitMode = "fill" | "contain" | "cover" | "none" | "scale-down";

const fitModes: { id: FitMode; label: string }[] = [
  { id: "fill", label: "fill" },
  { id: "contain", label: "contain" },
  { id: "cover", label: "cover" },
  { id: "none", label: "none" },
  { id: "scale-down", label: "scale-down" },
];

const fitDetails: Record<
  FitMode,
  { description: string; behavior: string; useCase: string; code: string }
> = {
  fill: {
    description: "The image is stretched to fill the container, ignoring its aspect ratio.",
    behavior: "Image may appear distorted. Width and height fill the container exactly.",
    useCase: "Rarely used intentionally. It is the browser default for replaced elements.",
    code: `.image-fill {\n  width: 300px;\n  height: 200px;\n  object-fit: fill;\n\n  /* Image stretches to 300x200\n     regardless of original ratio.\n     Usually causes distortion. */\n}`,
  },
  contain: {
    description: "The image scales to fit entirely inside the container while keeping its aspect ratio.",
    behavior: "Entire image is visible. Letterboxing (empty space) may appear on the sides or top/bottom.",
    useCase: "Product images, logos, thumbnails where the full image must be visible.",
    code: `.image-contain {\n  width: 300px;\n  height: 200px;\n  object-fit: contain;\n\n  /* Image fits entirely within 300x200.\n     Aspect ratio preserved.\n     May have empty space (letterbox). */\n\n  background: #f1f5f9;\n  /* Fill letterbox area */\n}`,
  },
  cover: {
    description: "The image scales to cover the entire container while keeping its aspect ratio.",
    behavior: "Container is fully filled. Parts of the image may be cropped.",
    useCase: "Hero images, avatars, card thumbnails, background-like image fills.",
    code: `.image-cover {\n  width: 300px;\n  height: 200px;\n  object-fit: cover;\n\n  /* Image covers the full 300x200 area.\n     Aspect ratio preserved.\n     Overflow is clipped. */\n}\n\n/* Common avatar pattern */\n.avatar {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n}`,
  },
  none: {
    description: "The image is not resized at all. It displays at its natural (intrinsic) size.",
    behavior: "If the image is larger than the container, it overflows and is clipped.",
    useCase: "Pixel-perfect icons, sprite sheets, or when you want natural sizing.",
    code: `.image-none {\n  width: 300px;\n  height: 200px;\n  object-fit: none;\n\n  /* Image stays at its natural size.\n     If 800x600, it overflows the 300x200\n     container and is clipped. */\n\n  /* Control which part is visible */\n  object-position: center;\n}`,
  },
  "scale-down": {
    description: "Behaves as 'contain' if the image is larger than the container, or 'none' if smaller.",
    behavior: "Image is never upscaled. It only shrinks to fit if needed.",
    useCase: "Icons and small images that should not be blown up beyond natural size.",
    code: `.image-scale-down {\n  width: 300px;\n  height: 200px;\n  object-fit: scale-down;\n\n  /* If image > container → contain\n     If image < container → none\n     Never upscales the image. */\n}\n\n/* Good for mixed-size thumbnails */\n.thumbnail {\n  width: 120px;\n  height: 120px;\n  object-fit: scale-down;\n  /* Small icons stay sharp,\n     large photos shrink to fit */\n}`,
  },
};

type PositionPreset = "center" | "top" | "bottom" | "left" | "right" | "top left" | "bottom right";

const positionPresets: PositionPreset[] = [
  "center",
  "top",
  "bottom",
  "left",
  "right",
  "top left",
  "bottom right",
];

export function ObjectFitVisualization() {
  const [activeFit, setActiveFit] = useState<FitMode>("cover");
  const [objectPosition, setObjectPosition] = useState<PositionPreset>("center");
  const active = fitDetails[activeFit];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">object-fit Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {fitModes.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveFit(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFit === m.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeFit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="rounded-xl border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <code className="text-sm text-primary font-bold">
                  object-fit: {activeFit}
                </code>
                <Badge variant="outline" className="text-[9px]">
                  {activeFit === "fill" ? "Default" : ""}
                  {activeFit === "cover" ? "Most common" : ""}
                  {activeFit === "contain" ? "Full visibility" : ""}
                  {activeFit === "none" ? "No resize" : ""}
                  {activeFit === "scale-down" ? "Never upscale" : ""}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">{active.description}</p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Behavior:</strong> {active.behavior}
              </p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Use case:</strong> {active.useCase}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Visual demo */}
              <div className="rounded-xl border p-4 space-y-3">
                <p className="text-xs font-bold">Preview (300 x 180 container)</p>
                <div className="relative border-2 border-dashed border-primary/30 rounded-lg overflow-hidden mx-auto" style={{ width: 300, height: 180 }}>
                  {/* Using a CSS gradient as a mock image since we can't reference real images */}
                  <div
                    className="w-full h-full"
                    style={{
                      objectFit: activeFit,
                      objectPosition,
                      background: "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #f59e0b 100%)",
                      backgroundSize: activeFit === "none" ? "400px 300px" : activeFit === "contain" ? "contain" : activeFit === "cover" ? "cover" : activeFit === "fill" ? "100% 100%" : "auto",
                      backgroundPosition: objectPosition,
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="text-white/70 text-[10px] font-mono bg-black/30 px-2 py-1 rounded">
                        object-fit: {activeFit}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-[9px] text-muted-foreground text-center">
                  Dashed border = container boundary
                </p>
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {active.code}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* object-position */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">object-position Property</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[11px] text-muted-foreground">
            Controls which part of the image is visible when cropped by object-fit. Works like background-position.
          </p>

          <div className="flex flex-wrap gap-2">
            {positionPresets.map((pos) => (
              <button
                key={pos}
                onClick={() => setObjectPosition(pos)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  objectPosition === pos
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {pos}
              </button>
            ))}
          </div>

          <motion.div
            key={objectPosition}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4">
              {/* 3x3 position grid */}
              <p className="text-xs font-bold mb-3">Position Grid</p>
              <div className="grid grid-cols-3 gap-1 w-48 mx-auto">
                {[
                  "top left",
                  "top",
                  "top right",
                  "left",
                  "center",
                  "right",
                  "bottom left",
                  "bottom",
                  "bottom right",
                ].map((pos) => (
                  <motion.button
                    key={pos}
                    onClick={() => setObjectPosition(pos as PositionPreset)}
                    whileHover={{ scale: 1.05 }}
                    className={`h-12 rounded-lg text-[8px] font-mono transition-all ${
                      objectPosition === pos
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {pos}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {`img {\n  width: 300px;\n  height: 200px;\n  object-fit: cover;\n  object-position: ${objectPosition};\n}\n\n/* Keyword values */\nobject-position: center;       /* default */\nobject-position: top left;\nobject-position: bottom right;\n\n/* Length values */\nobject-position: 50px 100px;\nobject-position: 25% 75%;\n\n/* Mix keywords and lengths */\nobject-position: right 20px bottom 10px;`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* All modes comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Modes at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Aspect Ratio</th>
                  <th className="text-left p-2">Fills Container</th>
                  <th className="text-left p-2">Cropped?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { val: "fill", ratio: "Ignored", fills: "Yes", cropped: "No (stretched)" },
                  { val: "contain", ratio: "Preserved", fills: "No (letterboxed)", cropped: "No" },
                  { val: "cover", ratio: "Preserved", fills: "Yes", cropped: "Yes (overflow clipped)" },
                  { val: "none", ratio: "Preserved", fills: "Only if same size", cropped: "If larger than container" },
                  { val: "scale-down", ratio: "Preserved", fills: "Only if same size", cropped: "No (shrinks or stays)" },
                ].map((row) => (
                  <tr key={row.val} className="border-b last:border-0">
                    <td className="p-2 font-bold font-mono text-primary">{row.val}</td>
                    <td className="p-2 text-muted-foreground">{row.ratio}</td>
                    <td className="p-2 text-muted-foreground">{row.fills}</td>
                    <td className="p-2 text-muted-foreground">{row.cropped}</td>
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
