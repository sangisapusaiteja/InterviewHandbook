"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ImageType = "informative" | "decorative" | "functional" | "complex";

const imageTypes: { id: ImageType; label: string }[] = [
  { id: "informative", label: "Informative" },
  { id: "decorative", label: "Decorative" },
  { id: "functional", label: "Functional" },
  { id: "complex", label: "Complex" },
];

const examples: Record<ImageType, { good: string; bad: string; code: string; rule: string }> = {
  informative: {
    good: `alt="Bar chart: revenue grew from $2M to $4.5M in 2025"`,
    bad: `alt="A colorful chart with bars"`,
    code: `<!-- ✅ Describes meaning -->\n<img src="chart.png"\n     alt="Bar chart: revenue grew from\n          $2M to $4.5M in 2025">`,
    rule: "Describe the MEANING, not the appearance. What information does the image convey?",
  },
  decorative: {
    good: `alt=""  (empty — screen reader skips it)`,
    bad: `(no alt attribute — reader says "divider dot SVG")`,
    code: `<!-- ✅ Empty alt for decorative -->\n<img src="divider.svg" alt="">\n\n<!-- ❌ Missing alt entirely -->\n<img src="divider.svg">\n<!-- Reader: "divider dot SVG, image" -->`,
    rule: "Use alt='' (empty string) so screen readers skip it. Never OMIT the alt attribute.",
  },
  functional: {
    good: `alt="Go to homepage"  (describes the action)`,
    bad: `alt="Company logo"  (describes the image, not the action)`,
    code: `<!-- ✅ Describes the link action -->\n<a href="/home">\n  <img src="logo.png"\n       alt="Go to homepage">\n</a>\n\n<!-- ❌ Describes the image -->\n<a href="/home">\n  <img src="logo.png"\n       alt="Company logo">\n</a>`,
    rule: "When an image IS a link or button, describe where it goes or what it does.",
  },
  complex: {
    good: `Brief alt + detailed figcaption or nearby text`,
    bad: `alt="Infographic" or a 500-character alt attribute`,
    code: `<!-- ✅ Brief alt + figcaption detail -->\n<figure>\n  <img src="infographic.png"\n       alt="2025 market share by region">\n  <figcaption>\n    North America: 42%, Europe: 28%,\n    Asia-Pacific: 22%, Other: 8%.\n  </figcaption>\n</figure>`,
    rule: "Keep alt brief. Provide the full description in figcaption, a table, or nearby text.",
  },
};

export function AltTextVisualization() {
  const [activeType, setActiveType] = useState<ImageType>("informative");
  const active = examples[activeType];

  return (
    <div className="space-y-6">
      {/* Image type explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alt Text by Image Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The right alt text depends on the image&apos;s PURPOSE, not its appearance.
          </p>

          <div className="flex flex-wrap gap-2">
            {imageTypes.map((it) => (
              <button
                key={it.id}
                onClick={() => setActiveType(it.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === it.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Good vs bad */}
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground">{active.rule}</p>

              <div className="space-y-2">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5">
                  <Badge className="bg-emerald-500 text-[9px] mb-1">Good</Badge>
                  <code className="text-[10px] text-emerald-600 dark:text-emerald-400 block">{active.good}</code>
                </div>
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5">
                  <Badge className="bg-red-500 text-[9px] mb-1">Bad</Badge>
                  <code className="text-[10px] text-red-600 dark:text-red-400 block">{active.bad}</code>
                </div>
              </div>
            </div>

            {/* Code */}
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Common mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Alt Text Mistakes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { mistake: `Starting with "Image of" or "Picture of"`, fix: "Screen readers already announce 'image' — just describe the content directly" },
              { mistake: "Omitting alt attribute entirely", fix: "Reader announces the filename (DSC_0042.jpg) — always include alt, even if empty" },
              { mistake: "Using alt on decorative images", fix: 'Use alt="" (empty) so screen readers skip decorative images' },
              { mistake: "Writing alt text that is too long (500+ chars)", fix: "Keep under 125 chars. Use figcaption or nearby text for complex descriptions" },
              { mistake: "Same alt text for all images", fix: "Context matters — the same photo needs different alt text depending on its purpose" },
              { mistake: `Using "click here" for linked images`, fix: "Describe where the link goes, not the interaction (e.g., 'View product details')" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 space-y-1"
              >
                <div className="flex items-start gap-2">
                  <Badge className="bg-red-500 text-[8px] shrink-0">Mistake</Badge>
                  <span className="text-xs">{item.mistake}</span>
                </div>
                <div className="flex items-start gap-2 ml-[52px]">
                  <span className="text-[10px] text-emerald-500">{item.fix}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
