"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CSSPaddingVisualization() {
  return (
    <div className="space-y-6">
      {/* Padding vs Margin */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Padding vs Margin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-green-500 text-[10px]">Padding (Inside)</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {`.card {\n  padding: 20px;\n  background: lightblue;\n}\n/* Padding shows the\n   background colour */`}
              </div>
              <p className="text-[10px] text-muted-foreground">Space between content and border. Shows background color. Cannot be negative.</p>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-orange-500 text-[10px]">Margin (Outside)</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {`.card {\n  margin: 20px;\n  background: lightblue;\n}\n/* Margin is always\n   transparent */`}
              </div>
              <p className="text-[10px] text-muted-foreground">Space outside the border. Always transparent. Can be negative. Collapses vertically.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shorthand reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Padding Shorthand</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Shorthand</th>
                  <th className="text-left p-2">Equivalent</th>
                  <th className="text-left p-2">Mnemonic</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { short: "padding: 10px", equiv: "All sides: 10px", mnemonic: "One value = all" },
                  { short: "padding: 10px 20px", equiv: "Top/Bottom: 10px, Left/Right: 20px", mnemonic: "Vertical | Horizontal" },
                  { short: "padding: 10px 20px 30px", equiv: "Top: 10, Left/Right: 20, Bottom: 30", mnemonic: "Top | Horizontal | Bottom" },
                  { short: "padding: 10px 20px 30px 40px", equiv: "Top: 10, Right: 20, Bottom: 30, Left: 40", mnemonic: "Clockwise: T R B L" },
                ].map((row) => (
                  <tr key={row.short} className="border-b last:border-0">
                    <td className="p-2"><code className="text-primary font-bold text-[10px]">{row.short}</code></td>
                    <td className="p-2">{row.equiv}</td>
                    <td className="p-2 text-muted-foreground">{row.mnemonic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Common use cases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Padding Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { pattern: "Button padding", code: "padding: 10px 24px", desc: "More horizontal than vertical creates a natural button shape" },
              { pattern: "Card padding", code: "padding: 20px", desc: "Equal padding on all sides for uniform spacing inside cards" },
              { pattern: "Section padding", code: "padding: 60px 20px", desc: "Large vertical padding for page sections, smaller horizontal" },
              { pattern: "Input padding", code: "padding: 8px 12px", desc: "Comfortable clickable area with room for text" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <code className="text-[10px] text-primary font-bold bg-muted px-2 py-1 rounded shrink-0">{item.code}</code>
                <div>
                  <p className="text-xs font-bold">{item.pattern}</p>
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
