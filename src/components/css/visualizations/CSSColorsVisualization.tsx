"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ColorFormat = "named" | "hex" | "rgb" | "hsl";

const formats: { id: ColorFormat; label: string }[] = [
  { id: "named", label: "Named" },
  { id: "hex", label: "Hex" },
  { id: "rgb", label: "RGB" },
  { id: "hsl", label: "HSL" },
];

const formatDetails: Record<ColorFormat, { syntax: string; desc: string; alpha: string; code: string }> = {
  named: {
    syntax: "color: coral;",
    desc: "~147 predefined color keywords. Easy to read but limited selection.",
    alpha: "No alpha support — use other formats for transparency.",
    code: `p { color: red; }\ndiv { background: coral; }\nspan { border-color: steelblue; }\n\n/* Popular named colors:\n   white, black, red, blue,\n   coral, teal, salmon,\n   rebeccapurple, hotpink */`,
  },
  hex: {
    syntax: "color: #3182ce;",
    desc: "6-digit hex: #RRGGBB — each pair 00-FF. Shorthand: #RGB → #RRGGBB.",
    alpha: "#RRGGBBAA — 8-digit hex for alpha (e.g., #3182ce80 = 50% opacity).",
    code: `/* Full hex */\np { color: #3182ce; }\n\n/* Shorthand: #RGB → #RRGGBB */\np { color: #f00; } /* = #ff0000 */\n\n/* With alpha (8-digit) */\np { color: #3182ce80; } /* 50% */`,
  },
  rgb: {
    syntax: "color: rgb(49, 130, 206);",
    desc: "Three channels: Red, Green, Blue — each 0 to 255.",
    alpha: "rgba(49, 130, 206, 0.5) or modern rgb(49 130 206 / 0.5).",
    code: `/* Classic syntax */\np { color: rgb(49, 130, 206); }\n\n/* With alpha */\np { color: rgba(49, 130, 206, 0.5); }\n\n/* Modern syntax (no commas) */\np { color: rgb(49 130 206 / 50%); }`,
  },
  hsl: {
    syntax: "color: hsl(210, 65%, 50%);",
    desc: "Hue (0-360°), Saturation (0-100%), Lightness (0-100%). Most intuitive for design.",
    alpha: "hsla(210, 65%, 50%, 0.5) or modern hsl(210 65% 50% / 0.5).",
    code: `/* H: 210° (blue), S: 65%, L: 50% */\np { color: hsl(210, 65%, 50%); }\n\n/* Easy to create variations: */\n.light { color: hsl(210, 65%, 80%); }\n.dark  { color: hsl(210, 65%, 30%); }\n\n/* With alpha */\np { color: hsl(210 65% 50% / 50%); }`,
  },
};

export function CSSColorsVisualization() {
  const [activeFormat, setActiveFormat] = useState<ColorFormat>("hex");
  const active = formatDetails[activeFormat];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Color Formats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formats.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFormat(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFormat === f.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeFormat}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <code className="text-xs text-primary font-bold">{active.syntax}</code>
              <p className="text-xs text-muted-foreground">{active.desc}</p>
              <div className="bg-muted/50 rounded-lg p-3 text-[10px]">
                <strong>Transparency:</strong> {active.alpha}
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Color swatches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Same Color, Four Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { format: "Named", value: "coral", bg: "#FF7F50" },
              { format: "Hex", value: "#FF7F50", bg: "#FF7F50" },
              { format: "RGB", value: "rgb(255,127,80)", bg: "#FF7F50" },
              { format: "HSL", value: "hsl(16,100%,66%)", bg: "#FF7F50" },
            ].map((swatch, i) => (
              <motion.div
                key={swatch.format}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border overflow-hidden"
              >
                <div className="h-16" style={{ backgroundColor: swatch.bg }} />
                <div className="p-2.5">
                  <Badge className="bg-zinc-700 text-[8px] mb-1">{swatch.format}</Badge>
                  <code className="text-[10px] text-muted-foreground block">{swatch.value}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
