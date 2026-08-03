"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type DisplayType = "block" | "inline";

interface ElementInfo {
  tag: string;
  type: DisplayType;
  description: string;
}

const elements: ElementInfo[] = [
  { tag: "<div>", type: "block", description: "Generic block container — takes full width, stacks vertically" },
  { tag: "<p>", type: "block", description: "Paragraph — block element with spacing above and below" },
  { tag: "<h1>–<h6>", type: "block", description: "Headings — block elements with varying sizes" },
  { tag: "<section>", type: "block", description: "Semantic section — block container with meaning" },
  { tag: "<span>", type: "inline", description: "Generic inline container — flows within text" },
  { tag: "<a>", type: "inline", description: "Anchor — inline link within text" },
  { tag: "<strong>", type: "inline", description: "Bold text — inline with semantic importance" },
  { tag: "<em>", type: "inline", description: "Emphasis — inline italic text" },
];

export function DivVsSpanVisualization() {
  const [showType, setShowType] = useState<"all" | DisplayType>("all");

  const filtered = showType === "all" ? elements : elements.filter((e) => e.type === showType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Block vs Inline Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filter */}
          <div className="flex gap-2">
            {(["all", "block", "inline"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setShowType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  showType === t ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Visual demo */}
          <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-2">
            <p className="text-xs text-muted-foreground mb-3">
              Block elements (blue) take full width. Inline elements (green) sit side by side.
            </p>
            <div
              style={{
                border: "2px dashed #3b82f6",
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
                background: "#eff6ff",
              }}
            >
              <code className="text-xs text-blue-600">&lt;div&gt;</code> — I take the full width
            </div>
            <div
              style={{
                border: "2px dashed #3b82f6",
                padding: 12,
                borderRadius: 8,
                marginBottom: 8,
                background: "#eff6ff",
              }}
            >
              <code className="text-xs text-blue-600">&lt;div&gt;</code> — I start on a new line
            </div>
            <p style={{ marginBottom: 8 }}>
              This is text with a{" "}
              <span
                style={{
                  border: "2px dashed #10b981",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "#ecfdf5",
                }}
              >
                <code className="text-xs text-emerald-600">&lt;span&gt;</code>
              </span>{" "}
              and another{" "}
              <span
                style={{
                  border: "2px dashed #10b981",
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "#ecfdf5",
                }}
              >
                <code className="text-xs text-emerald-600">&lt;span&gt;</code>
              </span>{" "}
              flowing inline.
            </p>
          </div>

          {/* Element table */}
          <div className="space-y-1.5">
            {filtered.map((el, i) => (
              <motion.div
                key={el.tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-lg border p-2.5"
              >
                <Badge
                  variant={el.type === "block" ? "default" : "secondary"}
                  className={`text-[10px] w-14 justify-center ${
                    el.type === "block" ? "bg-blue-500" : "bg-emerald-500 text-white"
                  }`}
                >
                  {el.type}
                </Badge>
                <code className="text-xs font-bold w-20 shrink-0">{el.tag}</code>
                <span className="text-xs text-muted-foreground">{el.description}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nesting rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Nesting Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { rule: "<div> inside <div>", valid: true },
              { rule: "<span> inside <div>", valid: true },
              { rule: "<span> inside <p>", valid: true },
              { rule: "<div> inside <span>", valid: false },
              { rule: "<div> inside <p>", valid: false },
              { rule: "<p> inside <p>", valid: false },
            ].map((item) => (
              <div key={item.rule} className="flex items-center gap-2 text-xs">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold ${
                  item.valid ? "bg-emerald-500" : "bg-red-500"
                }`}>
                  {item.valid ? "✓" : "✗"}
                </span>
                <code className="font-mono">{item.rule}</code>
                <span className="text-muted-foreground">
                  — {item.valid ? "Valid" : "Invalid HTML"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
