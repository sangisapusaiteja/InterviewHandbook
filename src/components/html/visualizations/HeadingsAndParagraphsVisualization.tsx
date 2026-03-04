"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const headings = [
  { level: 1, tag: "h1", size: "text-3xl", usage: "Page title — only one per page" },
  { level: 2, tag: "h2", size: "text-2xl", usage: "Section headings" },
  { level: 3, tag: "h3", size: "text-xl", usage: "Sub-section headings" },
  { level: 4, tag: "h4", size: "text-lg", usage: "Minor headings" },
  { level: 5, tag: "h5", size: "text-base", usage: "Rarely used headings" },
  { level: 6, tag: "h6", size: "text-sm", usage: "Smallest heading level" },
];

export function HeadingsAndParagraphsVisualization() {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Heading Hierarchy (h1 — h6)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click a heading level to highlight it. Headings create a content hierarchy
            that helps browsers, search engines, and screen readers understand your page structure.
          </p>

          <div className="rounded-xl border p-4 space-y-3">
            {headings.map((h) => (
              <motion.button
                key={h.level}
                onClick={() => setActiveLevel(h.level)}
                whileHover={{ x: 4 }}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeLevel === h.level
                    ? "bg-primary/10 ring-1 ring-primary"
                    : "hover:bg-accent/50"
                }`}
              >
                <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded shrink-0 w-10 text-center">
                  {`<${h.tag}>`}
                </code>
                <span className={`${h.size} font-bold flex-1 truncate`}>
                  Heading Level {h.level}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Active heading details */}
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-muted/50 p-3 text-sm space-y-1"
          >
            <code className="text-primary font-mono font-bold">
              {`<h${activeLevel}>`}
            </code>
            <p className="text-muted-foreground">
              {headings[activeLevel - 1].usage}
            </p>
          </motion.div>
        </CardContent>
      </Card>

      {/* Paragraph demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Paragraphs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-xs text-zinc-300 space-y-1">
            <div className="text-orange-400">&lt;p&gt;</div>
            <div className="pl-4 text-emerald-400">This is a paragraph of text. The browser adds space above and below.</div>
            <div className="text-red-400">&lt;/p&gt;</div>
            <div className="mt-2 text-orange-400">&lt;p&gt;</div>
            <div className="pl-4 text-emerald-400">This is another paragraph. Each &lt;p&gt; starts on a new line.</div>
            <div className="text-red-400">&lt;/p&gt;</div>
          </div>
          <div className="rounded-xl border p-4 space-y-4 bg-white text-black dark:bg-zinc-900 dark:text-white">
            <p>This is a paragraph of text. The browser adds space above and below.</p>
            <p>This is another paragraph. Each &lt;p&gt; starts on a new line.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
