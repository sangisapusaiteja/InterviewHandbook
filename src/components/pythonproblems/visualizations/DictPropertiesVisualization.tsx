"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const properties = [
  {
    name: "Ordered",
    supported: true,
    color: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    demo: ['d = {"b":2,"a":1,"c":3}', 'Keys: ["b","a","c"]', "Insertion order preserved ✓"],
    note: "Python 3.7+ — dicts maintain insertion order.",
    code: `d = {"b": 2, "a": 1, "c": 3}\nprint(list(d.keys()))  # ['b','a','c']`,
  },
  {
    name: "Keyed (not indexed)",
    supported: false,
    color: "border-amber-400 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300",
    badge: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    demo: ['d["name"]  → "Alice"', 'd["age"]   → 25', "d[0] → KeyError! ✗"],
    note: "Access by KEY, not by numeric position.",
    code: `d = {"name": "Alice", "age": 25}\nprint(d["name"])  # Alice\n# d[0] → KeyError`,
  },
  {
    name: "Mutable",
    supported: true,
    color: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    demo: ['d["age"] = 26  (update)', 'd["email"] = "…"  (add)', 'del d["city"]  (delete)'],
    note: "Key-value pairs can be added, changed, or deleted.",
    code: `d = {"name": "Alice", "age": 25}\nd["age"] = 26\nd["city"] = "NYC"\ndel d["age"]\nprint(d)`,
  },
  {
    name: "Nested",
    supported: true,
    color: "border-violet-400 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300",
    badge: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    demo: ['{"person": {"name":"Bob"}}', 'd["person"]["name"] → "Bob"', "Values can be dicts, lists, etc."],
    note: "Values can be any type — including other dicts or lists.",
    code: `d = {"person": {"name": "Bob", "scores": [90, 85]}}\nprint(d["person"]["name"])     # Bob\nprint(d["person"]["scores"][0]) # 90`,
  },
];

export function DictPropertiesVisualization() {
  const [active, setActive] = useState(0);
  const p = properties[active];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Dictionary Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {properties.map((prop, i) => (
            <button key={prop.name} onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                active === i ? prop.color + " scale-105 shadow-sm" : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}>
              {prop.name}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="space-y-3">
          <div className={`rounded-xl border-2 px-4 py-3 ${p.color}`}>
            <div className="flex items-center gap-2 mb-1">
              {p.supported ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              <span className="font-bold">Dicts are {p.name}</span>
              <Badge className={`text-[10px] ${p.badge}`}>{p.supported ? "✓ Yes" : "⚠ Special"}</Badge>
            </div>
            <p className="text-sm opacity-90">{p.note}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3">
              <p className="text-[10px] text-zinc-500 mb-2 font-mono">DEMO</p>
              {p.demo.map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`font-mono text-sm leading-6 ${line.includes("✗") ? "text-red-400" : "text-emerald-400"}`}>
                  <span className="text-zinc-600 mr-2">›</span>{line}
                </motion.p>
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
              <pre className="rounded-xl border bg-muted/40 px-3 py-2 text-xs font-mono whitespace-pre overflow-x-auto">{p.code}</pre>
            </div>
          </div>
        </motion.div>

        <div className="rounded-xl border overflow-hidden">
          <div className="px-3 py-2 bg-muted/40 text-xs font-semibold text-muted-foreground">Summary</div>
          {properties.map((prop) => (
            <div key={prop.name} className="flex items-center gap-3 px-4 py-2 border-t text-sm">
              <span className={`w-28 font-semibold text-xs px-2 py-0.5 rounded-full shrink-0 ${prop.badge}`}>{prop.name}</span>
              {prop.supported ? <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> : <span className="text-amber-500 text-xs shrink-0">⚠</span>}
              <span className="text-muted-foreground text-xs">{prop.note}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
