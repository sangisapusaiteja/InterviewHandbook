"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function IDSelectorVisualization() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">ID Selector Specificity</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">An ID selector has specificity 1-0-0 — it beats any number of classes.</p>
          <div className="space-y-2">
            {[
              { selector: ".card .title .text", spec: "0-3-0", wins: false },
              { selector: "#header", spec: "1-0-0", wins: true },
              { selector: ".a.b.c.d.e.f.g.h.i.j", spec: "0-10-0", wins: false },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="rounded-lg border p-2.5 flex items-center gap-3">
                <code className="text-[10px] text-primary font-bold flex-1">{item.selector}</code>
                <code className="text-[10px] font-mono text-muted-foreground">{item.spec}</code>
                <Badge className={`text-[8px] ${item.wins ? "bg-emerald-500" : "bg-red-500"}`}>{item.wins ? "Wins" : "Loses"}</Badge>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-amber-500 italic">1 ID always beats any combination of classes — specificity categories don&apos;t overflow.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">When to Use IDs</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Good Uses for IDs</Badge>
              <div className="space-y-1.5 text-xs">
                {["JavaScript: document.getElementById()", "Anchor links: <a href=\"#section\">", "Form label association: <label for=\"email\">", "ARIA references: aria-labelledby"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span className="text-emerald-500 shrink-0 mt-0.5">✓</span><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Avoid for Styling</Badge>
              <div className="space-y-1.5 text-xs">
                {["High specificity is hard to override", "Not reusable — only one element", "Creates specificity wars", "Use classes instead for all styling"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span className="text-red-500 shrink-0 mt-0.5">✕</span><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
