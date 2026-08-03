"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ShorthandMode = "1" | "2" | "3" | "4";

const shorthandModes: { id: ShorthandMode; label: string; values: string; meaning: string }[] = [
  { id: "1", label: "1 value", values: "margin: 10px", meaning: "All sides = 10px" },
  { id: "2", label: "2 values", values: "margin: 10px 20px", meaning: "Top/Bottom = 10px, Left/Right = 20px" },
  { id: "3", label: "3 values", values: "margin: 10px 20px 30px", meaning: "Top = 10px, Left/Right = 20px, Bottom = 30px" },
  { id: "4", label: "4 values", values: "margin: 10px 20px 30px 40px", meaning: "Top=10, Right=20, Bottom=30, Left=40 (clockwise)" },
];

export function CSSMarginVisualization() {
  const [activeMode, setActiveMode] = useState<ShorthandMode>("2");

  return (
    <div className="space-y-6">
      {/* Shorthand explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Margin Shorthand</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {shorthandModes.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === m.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {(() => {
            const active = shorthandModes.find((m) => m.id === activeMode)!;
            return (
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border p-4 space-y-2"
              >
                <code className="text-sm text-primary font-bold block">{active.values}</code>
                <p className="text-xs text-muted-foreground">{active.meaning}</p>
              </motion.div>
            );
          })()}
        </CardContent>
      </Card>

      {/* margin: auto centering */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Centering with margin: auto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">How It Works</Badge>
              <p className="text-xs text-muted-foreground">
                Set a width on the block element, then <code className="text-primary">margin: 0 auto</code>. The browser distributes remaining horizontal space equally to left and right margins.
              </p>
              <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                <p><strong>Requirements:</strong></p>
                <p>1. Must be a block-level element</p>
                <p>2. Must have a defined width</p>
                <p>3. Cannot be position: absolute/fixed</p>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {`.centered {\n  width: 400px;\n  margin: 0 auto;\n  /* top/bottom: 0\n     left/right: auto (equal) */\n}\n\n/* Short form — just auto on sides */\n.centered {\n  width: 80%;\n  margin-inline: auto;\n}`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Margin collapsing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Margin Collapsing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              When two vertical margins touch, they collapse into one — the larger margin wins.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4 space-y-2">
                <Badge className="bg-amber-500 text-[10px]">Expected</Badge>
                <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono">
                  <p>Box A: margin-bottom: 20px</p>
                  <p>Box B: margin-top: 30px</p>
                  <p className="mt-1 border-t pt-1">Expected gap: 50px</p>
                </div>
              </div>
              <div className="rounded-xl border p-4 space-y-2">
                <Badge className="bg-red-500 text-[10px]">Actual (Collapsed)</Badge>
                <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono">
                  <p>Box A: margin-bottom: 20px</p>
                  <p>Box B: margin-top: 30px</p>
                  <p className="mt-1 border-t pt-1 font-bold text-primary">Actual gap: 30px (larger wins)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
