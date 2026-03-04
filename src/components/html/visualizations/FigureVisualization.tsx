"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FigureType = "image" | "code" | "quote" | "table";

interface FigureExample {
  id: FigureType;
  label: string;
  description: string;
}

const examples: FigureExample[] = [
  { id: "image", label: "Image", description: "Photo, diagram, illustration with caption" },
  { id: "code", label: "Code Snippet", description: "Code block referenced in the text" },
  { id: "quote", label: "Blockquote", description: "Pull quote or cited quotation" },
  { id: "table", label: "Data Table", description: "Data table referenced in the text" },
];

export function FigureVisualization() {
  const [activeType, setActiveType] = useState<FigureType>("image");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">&lt;figure&gt; + &lt;figcaption&gt;</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            &lt;figure&gt; wraps self-contained content referenced in the main text.
            &lt;figcaption&gt; provides a semantic caption. Not limited to images!
          </p>

          {/* Type selector */}
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setActiveType(ex.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === ex.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {ex.label}
              </button>
            ))}
          </div>

          {/* Live preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Rendered */}
              <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900">
                <p className="text-xs font-semibold mb-3">Rendered Output:</p>
                {activeType === "image" && (
                  <figure className="text-center">
                    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-8 flex items-center justify-center">
                      <span className="text-3xl">🌅</span>
                      <span className="ml-2 text-sm text-muted-foreground">600 × 300</span>
                    </div>
                    <figcaption className="text-xs text-muted-foreground mt-2 italic">
                      Figure 1: A beautiful sunset over the mountains.
                    </figcaption>
                  </figure>
                )}
                {activeType === "code" && (
                  <figure>
                    <pre className="bg-zinc-950 text-emerald-400 rounded-lg p-3 text-xs overflow-x-auto">
{`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
                    </pre>
                    <figcaption className="text-xs text-muted-foreground mt-2 italic">
                      Figure 2: A simple greeting function in JavaScript.
                    </figcaption>
                  </figure>
                )}
                {activeType === "quote" && (
                  <figure className="border-l-4 border-primary pl-4">
                    <blockquote className="italic text-sm">
                      &ldquo;The web is for everyone, and collectively we hold the power to change it.&rdquo;
                    </blockquote>
                    <figcaption className="text-xs text-muted-foreground mt-2">
                      — Tim Berners-Lee, inventor of the World Wide Web
                    </figcaption>
                  </figure>
                )}
                {activeType === "table" && (
                  <figure>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-1.5">Browser</th>
                          <th className="text-left p-1.5">Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b"><td className="p-1.5">Chrome</td><td className="p-1.5">65%</td></tr>
                        <tr className="border-b"><td className="p-1.5">Safari</td><td className="p-1.5">19%</td></tr>
                        <tr><td className="p-1.5">Firefox</td><td className="p-1.5">3%</td></tr>
                      </tbody>
                    </table>
                    <figcaption className="text-xs text-muted-foreground mt-2 italic">
                      Figure 3: Browser market share as of 2026.
                    </figcaption>
                  </figure>
                )}
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {activeType === "image" && `<figure>\n  <img\n    src="sunset.jpg"\n    alt="Sunset over mountains"\n  >\n  <figcaption>\n    Figure 1: A beautiful sunset.\n  </figcaption>\n</figure>`}
                {activeType === "code" && `<figure>\n  <pre><code>\nfunction greet(name) {\n  return \\\`Hello, \\\${name}!\\\`;\n}\n  </code></pre>\n  <figcaption>\n    Figure 2: A greeting function.\n  </figcaption>\n</figure>`}
                {activeType === "quote" && `<figure>\n  <blockquote>\n    "The web is for everyone..."\n  </blockquote>\n  <figcaption>\n    — Tim Berners-Lee\n  </figcaption>\n</figure>`}
                {activeType === "table" && `<figure>\n  <table>\n    <thead>...</thead>\n    <tbody>...</tbody>\n  </table>\n  <figcaption>\n    Figure 3: Browser market share.\n  </figcaption>\n</figure>`}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Use &lt;figure&gt; + &lt;figcaption&gt;?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { cat: "Accessibility", icon: "♿", benefit: "Screen readers announce 'figure' and read figcaption as the accessible name" },
              { cat: "Accessibility", icon: "♿", benefit: "Creates a semantic bond between media and its description" },
              { cat: "SEO", icon: "🔍", benefit: "Google associates caption text with images for better image search ranking" },
              { cat: "SEO", icon: "🔍", benefit: "Figcaption text provides context that alt text alone cannot" },
              { cat: "Code Quality", icon: "📖", benefit: "Semantically links caption to content — unlike a loose <p> below an <img>" },
              { cat: "Code Quality", icon: "📖", benefit: "Not just for images — works with code, tables, quotes, diagrams, videos" },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className={`text-[9px] shrink-0 ${
                  b.cat === "Accessibility" ? "bg-blue-500" : b.cat === "SEO" ? "bg-emerald-500" : "bg-purple-500"
                }`}>
                  {b.icon} {b.cat}
                </Badge>
                <span className="text-xs text-muted-foreground">{b.benefit}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
