"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type SelectorType = "element" | "class" | "id" | "universal";

const selectors: { id: SelectorType; label: string }[] = [
  { id: "element", label: "Element" },
  { id: "class", label: "Class" },
  { id: "id", label: "ID" },
  { id: "universal", label: "Universal" },
];

const selectorDetails: Record<SelectorType, { syntax: string; desc: string; specificity: string; code: string }> = {
  element: {
    syntax: "p { }",
    desc: "Targets ALL elements of that type on the page.",
    specificity: "0-0-1",
    code: `/* Targets every <p> on the page */\np {\n  color: #333;\n  line-height: 1.6;\n}\n\n/* Targets every <h1> */\nh1 {\n  font-size: 32px;\n}`,
  },
  class: {
    syntax: ".card { }",
    desc: "Targets all elements with a specific class. Most commonly used selector.",
    specificity: "0-1-0",
    code: `/* Any element with class="card" */\n.card {\n  padding: 16px;\n  border-radius: 8px;\n}\n\n/* Only <div> with class="card" */\ndiv.card {\n  background: white;\n}`,
  },
  id: {
    syntax: "#header { }",
    desc: "Targets the single element with that ID. High specificity — use sparingly.",
    specificity: "1-0-0",
    code: `/* The one element with id="header" */\n#header {\n  position: sticky;\n  top: 0;\n}\n\n/* IDs must be unique per page! */`,
  },
  universal: {
    syntax: "* { }",
    desc: "Targets every single element. Commonly used in CSS resets.",
    specificity: "0-0-0",
    code: `/* Reset all elements */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}`,
  },
};

export function SelectorsBasicsVisualization() {
  const [activeSelector, setActiveSelector] = useState<SelectorType>("class");
  const active = selectorDetails[activeSelector];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic CSS Selectors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {selectors.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSelector(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSelector === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSelector}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <code className="text-sm text-primary font-bold">{active.syntax}</code>
              <p className="text-xs text-muted-foreground">{active.desc}</p>
              <div className="bg-muted/50 rounded-lg p-3 text-xs">
                <strong>Specificity:</strong> <code className="text-primary">{active.specificity}</code>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Specificity ranking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Specificity Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { level: 1, selector: "Inline styles", example: "style=\"...\"", spec: "1-0-0-0", color: "bg-red-500" },
              { level: 2, selector: "ID selector", example: "#header", spec: "0-1-0-0", color: "bg-orange-500" },
              { level: 3, selector: "Class selector", example: ".card", spec: "0-0-1-0", color: "bg-amber-500" },
              { level: 4, selector: "Element selector", example: "div", spec: "0-0-0-1", color: "bg-blue-500" },
              { level: 5, selector: "Universal selector", example: "*", spec: "0-0-0-0", color: "bg-zinc-500" },
            ].map((item, i) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-center gap-3"
              >
                <div className={`w-6 h-6 rounded-full ${item.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                  {item.level}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold">{item.selector}</span>
                  <code className="text-[10px] text-muted-foreground ml-2">{item.example}</code>
                </div>
                <code className="text-[10px] text-primary font-mono">{item.spec}</code>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
