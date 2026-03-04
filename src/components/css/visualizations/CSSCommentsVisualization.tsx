"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CSSCommentsVisualization() {
  return (
    <div className="space-y-6">
      {/* Comment syntax */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Comment Syntax</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Valid CSS Comment</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {`/* Single line comment */\n\n/*\n  Multi-line\n  comment\n*/\n\np {\n  color: blue; /* inline */\n}`}
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Invalid in CSS</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-red-400 whitespace-pre">
                {`// This is NOT valid CSS!\n// Single-line comments\n// only work in JS/SCSS\n\n<!-- HTML comments -->\n<!-- don't work in CSS -->\n\n/* /* nested */ */ ← BREAKS`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comment Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tip: "Section dividers", detail: "Use comments to organize large stylesheets into logical sections", code: "/* ===== Header ===== */" },
              { tip: "Explain why, not what", detail: "The code shows what — comments should explain reasoning", code: "/* Override lib default */\n.nav { z-index: 100; }" },
              { tip: "TODO markers", detail: "Mark incomplete work so it's easy to search for later", code: "/* TODO: add dark mode */\n/* FIXME: breaks on Safari */" },
              { tip: "Disable code", detail: "Comment out rules temporarily instead of deleting them", code: "/* color: red; */" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-3 space-y-2"
              >
                <p className="text-xs font-bold text-primary">{item.tip}</p>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                <div className="rounded bg-zinc-950 px-2 py-1.5 font-mono text-[10px] text-emerald-400 whitespace-pre">
                  {item.code}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
