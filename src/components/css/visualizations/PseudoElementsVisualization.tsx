"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PseudoEl = "before-after" | "first-line-letter" | "marker" | "selection";

const tabs: { id: PseudoEl; label: string }[] = [
  { id: "before-after", label: "::before / ::after" },
  { id: "first-line-letter", label: "::first-line / ::first-letter" },
  { id: "marker", label: "::marker" },
  { id: "selection", label: "::selection" },
];

const examples: Record<PseudoEl, { desc: string; code: string; notes: string }> = {
  "before-after": {
    desc: "Insert generated content before or after an element's content. Requires the content property.",
    code: `.quote::before {\n  content: "\\201C"; /* " */\n  font-size: 2em;\n  color: #3182ce;\n}\n\n.external-link::after {\n  content: " ↗";\n  font-size: 0.8em;\n}\n\n.required-label::after {\n  content: " *";\n  color: red;\n}`,
    notes: "::before and ::after are inline by default. They won't render without the content property (even if empty: content: \"\").",
  },
  "first-line-letter": {
    desc: "Style the first rendered line or first letter of a block element.",
    code: `p::first-letter {\n  font-size: 3em;\n  float: left;\n  line-height: 1;\n  margin-right: 0.1em;\n  color: #2d3748;\n}\n\np::first-line {\n  font-weight: bold;\n  color: #3182ce;\n}`,
    notes: "::first-line is recalculated on resize. Only certain properties work (font, color, background — no margin/padding).",
  },
  marker: {
    desc: "Style the bullet or number of a list item.",
    code: `li::marker {\n  color: #3182ce;\n  font-weight: bold;\n  font-size: 1.2em;\n}\n\n/* Custom emoji markers */\nli::marker {\n  content: "👉 ";\n}`,
    notes: "Limited properties: color, font-*, content, direction, unicode-bidi, animation, transition.",
  },
  selection: {
    desc: "Style the portion of text selected/highlighted by the user.",
    code: `::selection {\n  background: #3182ce;\n  color: white;\n}\n\np.special::selection {\n  background: #e53e3e;\n  color: #fff;\n}`,
    notes: "Only works with color, background-color, cursor, caret-color, outline, text-decoration, text-shadow.",
  },
};

export function PseudoElementsVisualization() {
  const [active, setActive] = useState<PseudoEl>("before-after");
  const item = examples[active];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Pseudo-Element Types</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${active === t.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>{t.label}</button>
            ))}
          </div>
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-xs text-muted-foreground">{item.desc}</p>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
            <p className="text-[10px] bg-muted/50 rounded-lg p-2 text-muted-foreground">{item.notes}</p>
          </motion.div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Pseudo-Class vs Pseudo-Element</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b"><th className="text-left p-2">Feature</th><th className="text-left p-2">Pseudo-Class (:)</th><th className="text-left p-2">Pseudo-Element (::)</th></tr></thead>
              <tbody>
                {[
                  { f: "Colons", pc: "Single : (:hover)", pe: "Double :: (::before)" },
                  { f: "What it does", pc: "Selects existing elements in a state", pe: "Creates/targets a virtual sub-element" },
                  { f: "Creates DOM?", pc: "No", pe: "No (but acts like it)" },
                  { f: "Multiple per rule?", pc: "Yes — a:hover:focus", pe: "Only one per selector" },
                  { f: "Example", pc: ":hover, :nth-child(2)", pe: "::before, ::first-line" },
                ].map((r) => (
                  <tr key={r.f} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{r.f}</td>
                    <td className="p-2">{r.pc}</td>
                    <td className="p-2 text-muted-foreground">{r.pe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Interview Tips</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tip: ":: is the modern syntax, : is legacy", detail: "::before and :before both work, but :: is correct per spec. Interviewers expect you to know the difference." },
              { tip: "::before/::after need content property", detail: "Without content (even content: \"\"), the pseudo-element won't render at all." },
              { tip: "Only one pseudo-element per selector", detail: "p::before::after is invalid. Use separate rules for each." },
              { tip: "Pseudo-elements aren't in the DOM", detail: "You can't select them with JavaScript (querySelector won't find them). Use getComputedStyle() instead." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="rounded-lg border p-3 space-y-1">
                <p className="text-xs font-bold text-primary">{item.tip}</p>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
