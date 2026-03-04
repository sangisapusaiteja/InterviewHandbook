"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Principle = "perceivable" | "operable" | "understandable" | "robust";

const pourPrinciples: { id: Principle; label: string; icon: string; color: string; desc: string; examples: string[] }[] = [
  {
    id: "perceivable",
    label: "Perceivable",
    icon: "👁️",
    color: "bg-blue-500",
    desc: "Content must be presentable to all senses — users must be able to perceive the information.",
    examples: [
      "Alt text on images for screen readers",
      "Captions and transcripts for audio/video",
      "Sufficient color contrast (4.5:1 minimum)",
      "Content doesn't rely on color alone to convey meaning",
    ],
  },
  {
    id: "operable",
    label: "Operable",
    icon: "⌨️",
    color: "bg-emerald-500",
    desc: "UI must be usable via keyboard, voice, and other input methods — not just mouse.",
    examples: [
      "All interactive elements reachable via Tab key",
      "No keyboard traps (can always Tab away)",
      "Skip navigation links for repetitive menus",
      "Enough time to read and use content",
    ],
  },
  {
    id: "understandable",
    label: "Understandable",
    icon: "🧠",
    color: "bg-purple-500",
    desc: "Content and navigation must be clear, predictable, and help users avoid mistakes.",
    examples: [
      "lang attribute on <html> for correct pronunciation",
      "Clear error messages with suggestions to fix",
      "Consistent navigation across pages",
      "Labels and instructions for form inputs",
    ],
  },
  {
    id: "robust",
    label: "Robust",
    icon: "🔧",
    color: "bg-amber-500",
    desc: "Content must work with current and future assistive technologies.",
    examples: [
      "Valid, well-structured HTML",
      "ARIA attributes used correctly (not conflicting with native semantics)",
      "Name, role, and value exposed for all UI components",
      "Works across different browsers and screen readers",
    ],
  },
];

export function AccessibilityBasicsVisualization() {
  const [activePrinciple, setActivePrinciple] = useState<Principle>("perceivable");
  const active = pourPrinciples.find((p) => p.id === activePrinciple)!;

  return (
    <div className="space-y-6">
      {/* POUR principles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">POUR Principles (WCAG)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            WCAG is organized around four principles. Click each to explore.
          </p>

          <div className="flex flex-wrap gap-2">
            {pourPrinciples.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePrinciple(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activePrinciple === p.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {p.icon} {p.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activePrinciple}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Badge className={`${active.color} text-[10px]`}>
                {active.icon} {active.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{active.desc}</p>
            <div className="space-y-1.5">
              {active.examples.map((ex, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-xs"
                >
                  <span className="text-emerald-500 shrink-0">✓</span>
                  <span>{ex}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* WCAG levels */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WCAG Conformance Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { level: "A", desc: "Minimum baseline — removes the biggest barriers", target: "Bare minimum", color: "bg-amber-500" },
              { level: "AA", desc: "Standard target — required by most laws (ADA, EAA, Section 508)", target: "Industry standard", color: "bg-emerald-500" },
              { level: "AAA", desc: "Enhanced — aspirational for full sites, target for critical pages", target: "Aspirational", color: "bg-blue-500" },
            ].map((item, i) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 flex items-start gap-3"
              >
                <Badge className={`${item.color} text-sm font-bold shrink-0 w-10 justify-center`}>
                  {item.level}
                </Badge>
                <div>
                  <p className="text-xs font-semibold">{item.target}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testing tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Testing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tool: "Screen reader", desc: "NVDA (Windows, free), VoiceOver (macOS/iOS, built-in), TalkBack (Android)", cat: "Assistive Tech" },
              { tool: "Keyboard-only", desc: "Tab through the entire page — can you reach and activate everything?", cat: "Manual Test" },
              { tool: "Lighthouse", desc: "Chrome DevTools → Lighthouse → Accessibility audit", cat: "Automated" },
              { tool: "axe DevTools", desc: "Browser extension — catches WCAG violations in real-time", cat: "Automated" },
              { tool: "Color contrast checker", desc: "Verify text meets 4.5:1 (AA) or 7:1 (AAA) contrast ratio", cat: "Manual Test" },
            ].map((item, i) => (
              <motion.div
                key={item.tool}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge variant="outline" className="text-[9px] shrink-0">{item.cat}</Badge>
                <div>
                  <p className="text-xs font-semibold">{item.tool}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
