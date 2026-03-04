"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function GroupSelectorsVisualization() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Grouping Eliminates Repetition</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Without Grouping</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-red-400 whitespace-pre">{`h1 {\n  font-family: Georgia;\n  color: #2d3748;\n}\nh2 {\n  font-family: Georgia;\n  color: #2d3748;\n}\nh3 {\n  font-family: Georgia;\n  color: #2d3748;\n}\n/* 12 lines — 3× repetition */`}</div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">With Grouping</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">{`h1, h2, h3 {\n  font-family: Georgia;\n  color: #2d3748;\n}\n/* 4 lines — DRY! */`}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Grouping Rules</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { rule: "Comma separates independent selectors", code: "h1, .title, #main { }", detail: "Each selector gets the declarations independently" },
              { rule: "Specificity is calculated per selector", code: "h1 = 0-0-1, .title = 0-1-0", detail: "Grouping doesn't combine specificity" },
              { rule: "Mix any selector types", code: "p, .note, [type='text'] { }", detail: "Elements, classes, attributes — all valid" },
              { rule: "Invalid selector doesn't break others", code: "h1, :invalid-pseudo, .ok { }", detail: "In modern browsers, h1 and .ok still work" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="rounded-lg border p-3 space-y-1">
                <p className="text-xs font-bold text-primary">{item.rule}</p>
                <code className="text-[10px] text-muted-foreground block">{item.code}</code>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
