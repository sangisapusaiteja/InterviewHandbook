"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DescendantSelectorVisualization() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Descendant Selector — Any Depth</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <code className="text-sm text-primary font-bold">.card p</code>
              <p className="text-xs text-muted-foreground">Matches any &lt;p&gt; inside .card — children, grandchildren, any depth.</p>
              <div className="rounded-lg bg-muted/50 p-3 text-[10px] space-y-1">
                <p className="font-bold">DOM tree:</p>
                <div className="font-mono ml-2 space-y-0.5">
                  <p>.card</p>
                  <p className="ml-4 text-emerald-500">├── p ✓ (direct child)</p>
                  <p className="ml-4">├── div</p>
                  <p className="ml-8 text-emerald-500">│   └── p ✓ (grandchild)</p>
                  <p className="ml-4">└── section</p>
                  <p className="ml-8">    └── div</p>
                  <p className="ml-12 text-emerald-500">        └── p ✓ (deep)</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{`.card p {\n  color: blue;\n}\n\n/* Matches ALL of these: */\n<div class="card">\n  <p>Direct child ✓</p>\n  <div>\n    <p>Grandchild ✓</p>\n    <div>\n      <p>Deep nested ✓</p>\n    </div>\n  </div>\n</div>`}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Descendant vs Child vs Sibling</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead><tr className="border-b"><th className="text-left p-2">Combinator</th><th className="text-left p-2">Syntax</th><th className="text-left p-2">Matches</th></tr></thead>
              <tbody>
                {[
                  { comb: "Descendant", syntax: "A B", matches: "B anywhere inside A (any depth)" },
                  { comb: "Child", syntax: "A > B", matches: "B that is a direct child of A only" },
                  { comb: "Adjacent sibling", syntax: "A + B", matches: "B immediately after A (same parent)" },
                  { comb: "General sibling", syntax: "A ~ B", matches: "All B siblings after A (same parent)" },
                ].map((r) => (
                  <tr key={r.comb} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{r.comb}</td>
                    <td className="p-2"><code className="text-primary font-bold">{r.syntax}</code></td>
                    <td className="p-2 text-muted-foreground">{r.matches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
