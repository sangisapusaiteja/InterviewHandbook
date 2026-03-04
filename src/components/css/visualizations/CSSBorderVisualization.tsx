"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BorderStyle = "solid" | "dashed" | "dotted" | "double" | "groove" | "none";

const styles: { id: BorderStyle; label: string }[] = [
  { id: "solid", label: "solid" },
  { id: "dashed", label: "dashed" },
  { id: "dotted", label: "dotted" },
  { id: "double", label: "double" },
  { id: "groove", label: "groove" },
  { id: "none", label: "none" },
];

export function CSSBorderVisualization() {
  const [activeStyle, setActiveStyle] = useState<BorderStyle>("solid");

  return (
    <div className="space-y-6">
      {/* Border style explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Border Styles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveStyle(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeStyle === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-center justify-center p-8 rounded-xl bg-muted/30">
              <div
                className="w-40 h-24 flex items-center justify-center bg-white dark:bg-zinc-900 rounded text-xs font-mono text-muted-foreground"
                style={{
                  border: activeStyle === "none" ? "none" : `4px ${activeStyle} #3182ce`,
                }}
              >
                border: {activeStyle}
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {`.box {\n  border: 4px ${activeStyle} #3182ce;\n}\n\n/* Shorthand = width style color */\n/* All three are required for\n   the border to show */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Border radius */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Border Radius</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { radius: "0", label: "0 (sharp)" },
              { radius: "8px", label: "8px" },
              { radius: "16px", label: "16px" },
              { radius: "50%", label: "50% (circle)" },
            ].map((item, i) => (
              <motion.div
                key={item.radius}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-20 h-20 bg-primary/20 border-2 border-primary flex items-center justify-center"
                  style={{ borderRadius: item.radius }}
                >
                  <code className="text-[9px] text-primary font-bold">{item.radius}</code>
                </div>
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Border vs Outline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Border vs Outline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Border</th>
                  <th className="text-left p-2">Outline</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Part of box model?", border: "Yes — affects total size", outline: "No — drawn outside" },
                  { feature: "Individual sides?", border: "Yes (border-top, etc.)", outline: "No — all sides only" },
                  { feature: "Border radius?", border: "Yes", outline: "Depends on browser" },
                  { feature: "Overlaps content?", border: "No — pushes content", outline: "Yes — can overlap" },
                  { feature: "Common use", border: "Visual design, cards", outline: "Focus indicators (a11y)" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2">{row.border}</td>
                    <td className="p-2 text-muted-foreground">{row.outline}</td>
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
