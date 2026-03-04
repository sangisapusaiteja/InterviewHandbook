"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ClassSelectorVisualization() {
  const [mode, setMode] = useState<"single" | "multiple" | "chained">("single");

  const codeMap = {
    single: `/* Single class — reusable */\n.card {\n  padding: 16px;\n  border-radius: 8px;\n  background: white;\n}\n\n<div class="card">...</div>\n<div class="card">...</div>`,
    multiple: `/* Multiple classes on one element */\n.bold   { font-weight: bold; }\n.blue   { color: #3182ce; }\n.large  { font-size: 20px; }\n\n<p class="bold blue large">\n  Three classes combined\n</p>`,
    chained: `/* Chained — element must have BOTH */\n.card.featured {\n  border-left: 4px solid blue;\n}\n\n<div class="card featured">Match</div>\n<div class="card">No match</div>\n<div class="featured">No match</div>`,
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Class Selector Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {([["single", "Single .class"], ["multiple", "Multiple Classes"], ["chained", "Chained .a.b"]] as const).map(([id, label]) => (
              <button key={id} onClick={() => setMode(id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>{label}</button>
            ))}
          </div>
          <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
            {codeMap[mode]}
          </motion.div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Class vs ID — Quick Comparison</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b"><th className="text-left p-2">Feature</th><th className="text-left p-2">.class</th><th className="text-left p-2">#id</th></tr></thead>
              <tbody>
                {[
                  { f: "Syntax", c: ".name { }", i: "#name { }" },
                  { f: "Reusable?", c: "Yes — many elements", i: "No — one per page" },
                  { f: "Multiple per element?", c: "Yes", i: "No (one ID only)" },
                  { f: "Specificity", c: "0-1-0", i: "1-0-0" },
                  { f: "Best for", c: "Styling", i: "JS hooks, anchors" },
                ].map((r) => (
                  <tr key={r.f} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{r.f}</td>
                    <td className="p-2">{r.c}</td>
                    <td className="p-2 text-muted-foreground">{r.i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
