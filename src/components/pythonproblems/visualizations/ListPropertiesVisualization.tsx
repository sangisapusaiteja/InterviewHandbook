"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const properties = [
  {
    name: "Ordered",
    color: "border-blue-400 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    demo: ["🍎 apple", "🍌 banana", "🍒 cherry"],
    note: "Items stay in the order you insert them.",
    code: `my_list = ["apple", "banana", "cherry"]\nprint(my_list)  # ['apple', 'banana', 'cherry']`,
  },
  {
    name: "Indexed",
    color: "border-violet-400 bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300",
    badge: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    demo: ["[0] 10", "[1] 20", "[2] 30", "[-1] 30"],
    note: "Access any element by its numeric position.",
    code: `lst = [10, 20, 30]\nprint(lst[0])   # 10\nprint(lst[-1])  # 30`,
  },
  {
    name: "Mutable",
    color: "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300",
    badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    demo: ["Before: [1, 2, 3]", "lst[0] = 99", "append(4)", "After:  [99, 2, 3, 4]"],
    note: "Elements can be changed, added, or removed after creation.",
    code: `lst = [1, 2, 3]\nlst[0] = 99\nlst.append(4)\nprint(lst)  # [99, 2, 3, 4]`,
  },
  {
    name: "Nested",
    color: "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
    badge: "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
    demo: ["[1, [2, 3], [4, 5]]", "Access [1][0] → 2", "Access [2][1] → 5"],
    note: "A list can contain other lists as elements.",
    code: `nested = [1, [2, 3], [4, 5]]\nprint(nested[1][0])  # 2\nprint(nested[2][1])  # 5`,
  },
];

export function ListPropertiesVisualization() {
  const [active, setActive] = useState(0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">List Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selector */}
        <div className="flex flex-wrap gap-2">
          {properties.map((p, i) => (
            <button key={p.name} onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all ${
                active === i ? p.color + " scale-105 shadow-sm" : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
              }`}>
              {p.name}
            </button>
          ))}
        </div>

        {/* Detail */}
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
          className="space-y-3">
          <div className={`rounded-xl border-2 px-4 py-3 ${properties[active].color}`}>
            <div className="flex items-center gap-2 mb-1">
              <Check className="h-4 w-4" />
              <span className="font-bold">Lists are {properties[active].name}</span>
              <Badge className={`text-[10px] ${properties[active].badge}`}>✓ Yes</Badge>
            </div>
            <p className="text-sm opacity-90">{properties[active].note}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Demo */}
            <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3">
              <p className="text-[10px] text-zinc-500 mb-2 font-mono">DEMO</p>
              {properties[active].demo.map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }} className="text-emerald-400 font-mono text-sm leading-6">
                  <span className="text-zinc-600 mr-2">›</span>{line}
                </motion.p>
              ))}
            </div>
            {/* Code */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
              <pre className="rounded-xl border bg-muted/40 px-3 py-2 text-xs font-mono whitespace-pre">{properties[active].code}</pre>
            </div>
          </div>
        </motion.div>

        {/* Summary table */}
        <div className="rounded-xl border overflow-hidden">
          <div className="px-3 py-2 bg-muted/40 text-xs font-semibold text-muted-foreground">Summary</div>
          {properties.map((p) => (
            <div key={p.name} className="flex items-center gap-3 px-4 py-2 border-t text-sm">
              <span className={`w-20 font-semibold text-xs px-2 py-0.5 rounded-full ${p.badge}`}>{p.name}</span>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-muted-foreground text-xs">{p.note}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
