"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AttrType = "has" | "exact" | "starts" | "ends" | "contains";

const types: { id: AttrType; label: string; syntax: string; desc: string; example: string }[] = [
  { id: "has", label: "[attr]", syntax: "[disabled]", desc: "Has the attribute (any value)", example: `[required] {\n  border-color: red;\n}\n<input required>` },
  { id: "exact", label: "[attr=val]", syntax: "[type=\"email\"]", desc: "Attribute value is exactly 'val'", example: `[type="email"] {\n  border: 2px solid blue;\n}\n<input type="email">` },
  { id: "starts", label: "[attr^=val]", syntax: "[href^=\"https\"]", desc: "Attribute value starts with 'val'", example: `a[href^="https"] {\n  color: green;\n}\n<a href="https://...">Secure</a>` },
  { id: "ends", label: "[attr$=val]", syntax: "[href$=\".pdf\"]", desc: "Attribute value ends with 'val'", example: `a[href$=".pdf"]::after {\n  content: " (PDF)";\n}\n<a href="doc.pdf">Download</a>` },
  { id: "contains", label: "[attr*=val]", syntax: "[class*=\"btn\"]", desc: "Attribute value contains 'val' anywhere", example: `[class*="btn"] {\n  cursor: pointer;\n}\n<div class="btn-primary">...</div>` },
];

export function AttributeSelectorsVisualization() {
  const [active, setActive] = useState<AttrType>("exact");
  const item = types.find((t) => t.id === active)!;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Attribute Selector Types</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button key={t.id} onClick={() => setActive(t.id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${active === t.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>{t.label}</button>
            ))}
          </div>
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <code className="text-sm text-primary font-bold">{item.syntax}</code>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <p className="text-[10px] bg-muted/50 rounded-lg p-2"><strong>Specificity:</strong> 0-1-0 (same as a class)</p>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{item.example}</div>
          </motion.div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Real-World Uses</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { use: "Style external links", code: "a[href^=\"http\"]" },
              { use: "Style file type icons", code: "a[href$=\".pdf\"], a[href$=\".zip\"]" },
              { use: "Style disabled form elements", code: "[disabled], [aria-disabled=\"true\"]" },
              { use: "Style by data attributes", code: "[data-theme=\"dark\"]" },
              { use: "Style required inputs", code: "input[required]" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="rounded-lg border p-2.5 flex items-center gap-3">
                <span className="text-xs flex-1">{item.use}</span>
                <code className="text-[10px] text-primary font-bold bg-muted px-2 py-1 rounded">{item.code}</code>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
