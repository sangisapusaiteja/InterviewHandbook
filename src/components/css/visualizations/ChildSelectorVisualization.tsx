"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ChildSelectorVisualization() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Child Selector — Direct Children Only</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <code className="text-sm text-primary font-bold">.card &gt; p</code>
              <p className="text-xs text-muted-foreground">Matches only &lt;p&gt; elements that are <strong>direct children</strong> of .card — not deeper descendants.</p>
              <div className="rounded-lg bg-muted/50 p-3 text-[10px] space-y-1">
                <p className="font-bold">DOM tree:</p>
                <div className="font-mono ml-2 space-y-0.5">
                  <p>.card</p>
                  <p className="ml-4 text-emerald-500">├── p ✓ (direct child)</p>
                  <p className="ml-4">├── div</p>
                  <p className="ml-8 text-red-400">│   └── p ✕ (grandchild)</p>
                  <p className="ml-4 text-emerald-500">└── p ✓ (direct child)</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{`.card > p {\n  color: blue;\n}\n\n<div class="card">\n  <p>Direct child ✓</p>\n  <div>\n    <p>Grandchild ✕</p>\n  </div>\n  <p>Direct child ✓</p>\n</div>`}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Descendant vs Child Selector</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-blue-500 text-[10px]">Descendant (space)</Badge>
              <code className="block text-xs text-primary font-bold mt-1">ul li</code>
              <p className="text-xs text-muted-foreground">Matches all &lt;li&gt; at any depth inside &lt;ul&gt; — including nested lists.</p>
              <div className="rounded-lg bg-muted/50 p-2 font-mono text-[10px] space-y-0.5">
                <p>ul</p>
                <p className="ml-4 text-emerald-500">├── li ✓</p>
                <p className="ml-4">├── ul</p>
                <p className="ml-8 text-emerald-500">│   └── li ✓</p>
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-purple-500 text-[10px]">Child (&gt;)</Badge>
              <code className="block text-xs text-primary font-bold mt-1">ul &gt; li</code>
              <p className="text-xs text-muted-foreground">Matches only &lt;li&gt; that are direct children — skips nested list items.</p>
              <div className="rounded-lg bg-muted/50 p-2 font-mono text-[10px] space-y-0.5">
                <p>ul</p>
                <p className="ml-4 text-emerald-500">├── li ✓</p>
                <p className="ml-4">├── ul</p>
                <p className="ml-8 text-red-400">│   └── li ✕</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Common Use Cases</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { use: "Style only top-level nav links", code: "nav > a { }", detail: "Avoids styling links in dropdown submenus" },
              { use: "Style direct list items", code: "ul > li { }", detail: "Prevents styles leaking into nested lists" },
              { use: "Target immediate card content", code: ".card > .title { }", detail: "Won't match .title inside nested cards" },
              { use: "Reset margin on direct children", code: ".stack > * { margin-top: 1rem; }", detail: "Lobotomized owl variant — only direct children" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="rounded-lg border p-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{item.use}</span>
                  <code className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded ml-auto">{item.code}</code>
                </div>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
