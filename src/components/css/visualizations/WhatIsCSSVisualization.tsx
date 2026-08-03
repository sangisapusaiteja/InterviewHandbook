"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CSSMethod = "inline" | "internal" | "external";

const methods: { id: CSSMethod; label: string }[] = [
  { id: "inline", label: "Inline" },
  { id: "internal", label: "Internal" },
  { id: "external", label: "External" },
];

const methodDetails: Record<CSSMethod, { desc: string; pros: string; cons: string; code: string }> = {
  inline: {
    desc: "CSS applied directly to an element via the style attribute.",
    pros: "Quick overrides, email HTML, dynamic styles via JS",
    cons: "No reusability, high specificity, hard to maintain",
    code: `<p style="color: blue; font-size: 18px;">
  Styled inline
</p>`,
  },
  internal: {
    desc: "CSS placed inside a <style> tag in the document <head>.",
    pros: "No extra HTTP request, good for single-page demos",
    cons: "Styles only apply to that page, can't be cached separately",
    code: `<head>
  <style>
    p {
      color: blue;
      font-size: 18px;
    }
  </style>
</head>`,
  },
  external: {
    desc: "CSS in a separate .css file linked via <link> tag. The preferred method.",
    pros: "Reusable across pages, cached by browser, separation of concerns",
    cons: "Extra HTTP request on first load",
    code: `<!-- In HTML -->
<head>
  <link rel="stylesheet"
        href="styles.css">
</head>

/* In styles.css */
p {
  color: blue;
  font-size: 18px;
}`,
  },
};

export function WhatIsCSSVisualization() {
  const [activeMethod, setActiveMethod] = useState<CSSMethod>("external");
  const active = methodDetails[activeMethod];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Three Ways to Add CSS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMethod(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMethod === m.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeMethod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs text-muted-foreground">{active.desc}</p>
              <div className="space-y-2 text-xs">
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5">
                  <Badge className="bg-emerald-500 text-[9px] mb-1">Pros</Badge>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">{active.pros}</p>
                </div>
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5">
                  <Badge className="bg-red-500 text-[9px] mb-1">Cons</Badge>
                  <p className="text-[10px] text-red-600 dark:text-red-400">{active.cons}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* HTML vs CSS vs JS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The Three Pillars of the Web</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "HTML", role: "Structure", color: "bg-orange-500", desc: "What content appears on the page", emoji: "🏗️" },
              { name: "CSS", role: "Presentation", color: "bg-blue-500", desc: "How the content looks and is laid out", emoji: "🎨" },
              { name: "JavaScript", role: "Behaviour", color: "bg-yellow-500", desc: "How the page responds to user actions", emoji: "⚡" },
            ].map((pillar, i) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border p-4 text-center space-y-2"
              >
                <span className="text-2xl">{pillar.emoji}</span>
                <Badge className={`${pillar.color} text-[10px]`}>{pillar.name}</Badge>
                <p className="text-xs font-bold">{pillar.role}</p>
                <p className="text-[10px] text-muted-foreground">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
