"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const specificityExamples = [
  { selector: "*", spec: [0, 0, 0, 0], label: "Universal" },
  { selector: "p", spec: [0, 0, 0, 1], label: "Element" },
  { selector: "p.intro", spec: [0, 0, 1, 1], label: "Element + class" },
  { selector: ".nav .link", spec: [0, 0, 2, 0], label: "Two classes" },
  { selector: "#header", spec: [0, 1, 0, 0], label: "ID" },
  { selector: "#header .nav li.active", spec: [0, 1, 2, 1], label: "Mixed" },
  { selector: "style=\"...\"", spec: [1, 0, 0, 0], label: "Inline style" },
];

const battles = [
  { a: ".nav a.active", specA: "0-1-1", b: "nav a", specB: "0-0-2", winner: "A", reason: "1 class beats 2 elements" },
  { a: "#logo", specA: "1-0-0", b: ".header .logo.main", specB: "0-3-0", winner: "A", reason: "1 ID beats any number of classes" },
  { a: "div p span", specA: "0-0-3", b: "p.text", specB: "0-1-1", winner: "B", reason: "1 class beats 3 elements" },
  { a: "a:hover", specA: "0-1-1", b: ".link:focus", specB: "0-2-0", winner: "B", reason: ":focus adds a class-level weight" },
];

export function SpecificityVisualization() {

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Specificity Hierarchy</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {[
              { label: "Inline", color: "bg-red-500", weight: "1,0,0,0" },
              { label: "IDs", color: "bg-orange-500", weight: "0,1,0,0" },
              { label: "Classes", color: "bg-blue-500", weight: "0,0,1,0" },
              { label: "Elements", color: "bg-zinc-500", weight: "0,0,0,1" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="space-y-1">
                <div className={`${item.color} text-white rounded-lg py-3 font-bold`}>{item.label}</div>
                <code className="text-[10px] text-muted-foreground">{item.weight}</code>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground text-center">Classes also include pseudo-classes (:hover) and attribute selectors ([type]). Elements include pseudo-elements (::before).</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Specificity Calculator</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            {specificityExamples.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="rounded-lg border p-2.5 flex items-center gap-3">
                <code className="text-[11px] text-primary font-bold flex-1 min-w-0">{item.selector}</code>
                <div className="flex gap-1 shrink-0">
                  {item.spec.map((v, j) => (
                    <span key={j} className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold text-white ${j === 0 ? "bg-red-500" : j === 1 ? "bg-orange-500" : j === 2 ? "bg-blue-500" : "bg-zinc-500"}`}>{v}</span>
                  ))}
                </div>
                <Badge variant="outline" className="text-[8px] shrink-0">{item.label}</Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Specificity Battles</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {battles.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-xl border p-3 space-y-2">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center text-center">
                  <div className={`rounded-lg p-2 ${b.winner === "A" ? "bg-emerald-500/10 border border-emerald-500" : "bg-muted/50"}`}>
                    <code className="text-[10px] text-primary font-bold block">{b.a}</code>
                    <code className="text-[9px] text-muted-foreground">{b.specA}</code>
                  </div>
                  <span className="text-xs font-bold text-muted-foreground">vs</span>
                  <div className={`rounded-lg p-2 ${b.winner === "B" ? "bg-emerald-500/10 border border-emerald-500" : "bg-muted/50"}`}>
                    <code className="text-[10px] text-primary font-bold block">{b.b}</code>
                    <code className="text-[9px] text-muted-foreground">{b.specB}</code>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground text-center">{b.reason}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Cascade Resolution Order</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {[
              { step: "1", label: "Origin & Importance", desc: "!important > normal; user-agent < author < user" },
              { step: "2", label: "Specificity", desc: "Inline > ID > Class/Attr/Pseudo-class > Element/Pseudo-element" },
              { step: "3", label: "Source Order", desc: "Last rule declared wins when specificity is equal" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="rounded-lg border p-3 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">{item.step}</span>
                <div>
                  <p className="text-xs font-bold">{item.label}</p>
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
