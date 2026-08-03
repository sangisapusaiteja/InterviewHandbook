"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const webPillars = [
  {
    id: "html",
    label: "HTML",
    role: "Structure",
    color: "bg-orange-500",
    description: "Defines what content appears and how it is organized — headings, paragraphs, images, links.",
    analogy: "The skeleton and walls of a building",
    example: '<h1>Hello</h1>\n<p>Welcome to my site.</p>',
  },
  {
    id: "css",
    label: "CSS",
    role: "Style",
    color: "bg-blue-500",
    description: "Controls the visual appearance — colors, fonts, spacing, layouts, and animations.",
    analogy: "The paint, wallpaper, and interior design",
    example: "h1 {\n  color: blue;\n  font-size: 32px;\n}",
  },
  {
    id: "js",
    label: "JavaScript",
    role: "Behaviour",
    color: "bg-yellow-500",
    description: "Adds interactivity — click handlers, form validation, dynamic content updates.",
    analogy: "The electricity, plumbing, and smart systems",
    example: 'document.querySelector("h1")\n  .addEventListener("click", () => {\n    alert("Clicked!");\n  });',
  },
];

const htmlTimeline = [
  { year: "1991", version: "HTML 1.0", note: "Created by Tim Berners-Lee" },
  { year: "1995", version: "HTML 2.0", note: "First standard specification" },
  { year: "1997", version: "HTML 3.2", note: "Tables, applets, text flow" },
  { year: "1999", version: "HTML 4.01", note: "Stylesheets, scripting" },
  { year: "2014", version: "HTML5", note: "Semantic tags, video, canvas, APIs" },
];

export function HTMLIntroductionVisualization() {
  const [activePillar, setActivePillar] = useState("html");
  const pillar = webPillars.find((p) => p.id === activePillar)!;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The Three Pillars of the Web</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pillar selector */}
          <div className="flex gap-3 justify-center">
            {webPillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activePillar === p.id
                    ? `${p.color} text-white shadow-lg scale-105`
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Badge className={pillar.color}>{pillar.label}</Badge>
                <span className="text-sm font-medium text-muted-foreground">
                  — {pillar.role}
                </span>
              </div>
              <p className="text-sm">{pillar.description}</p>
              <p className="text-xs text-muted-foreground italic">
                Analogy: {pillar.analogy}
              </p>
              <pre className="bg-zinc-950 text-emerald-400 rounded-lg p-3 text-xs font-mono overflow-x-auto">
                {pillar.example}
              </pre>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">HTML Evolution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-2 overflow-x-auto pb-2">
            {htmlTimeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center min-w-[120px] text-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                  {item.year}
                </div>
                {i < htmlTimeline.length - 1 && (
                  <div className="w-full h-px bg-border my-1" />
                )}
                <p className="text-xs font-semibold mt-1">{item.version}</p>
                <p className="text-[10px] text-muted-foreground">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
