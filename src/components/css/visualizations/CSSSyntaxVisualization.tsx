"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CSSSyntaxVisualization() {
  return (
    <div className="space-y-6">
      {/* Anatomy of a CSS rule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Anatomy of a CSS Rule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border bg-zinc-950 p-5 font-mono text-sm overflow-x-auto">
            <div className="space-y-1">
              <span className="text-amber-400">h1</span>
              <span className="text-zinc-400"> {"{"}</span>
              <div className="ml-4">
                <span className="text-sky-400">color</span>
                <span className="text-zinc-400">: </span>
                <span className="text-emerald-400">blue</span>
                <span className="text-zinc-400">;</span>
              </div>
              <div className="ml-4">
                <span className="text-sky-400">font-size</span>
                <span className="text-zinc-400">: </span>
                <span className="text-emerald-400">24px</span>
                <span className="text-zinc-400">;</span>
              </div>
              <span className="text-zinc-400">{"}"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { part: "Selector", example: "h1", desc: "Targets which elements to style", color: "bg-amber-500" },
              { part: "Property", example: "color, font-size", desc: "What aspect to change", color: "bg-sky-500" },
              { part: "Value", example: "blue, 24px", desc: "The new setting to apply", color: "bg-emerald-500" },
            ].map((item, i) => (
              <motion.div
                key={item.part}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-lg border p-3 space-y-1"
              >
                <Badge className={`${item.color} text-[10px]`}>{item.part}</Badge>
                <code className="text-xs text-primary font-bold block">{item.example}</code>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Syntax Pitfalls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Wrong</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-red-400 whitespace-pre">
                {`h1 {\n  color: blue\n  font-size: 24px;\n}\n/* Missing semicolon after blue\n   → font-size is ignored */`}
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Correct</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {`h1 {\n  color: blue;\n  font-size: 24px;\n}\n/* Semicolons separate each\n   declaration properly */`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
