"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ImportantRuleVisualization() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">How !important Works</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <code className="text-sm text-primary font-bold">color: red !important;</code>
              <p className="text-xs text-muted-foreground">!important overrides ALL other declarations for that property — regardless of specificity or source order.</p>
              <div className="rounded-lg bg-muted/50 p-3 text-[10px] space-y-1">
                <p className="font-bold">Priority order (highest → lowest):</p>
                <div className="space-y-1 mt-2">
                  {[
                    { level: "1", label: "!important + inline style", color: "text-red-500" },
                    { level: "2", label: "!important + ID selector", color: "text-red-400" },
                    { level: "3", label: "!important + class selector", color: "text-orange-400" },
                    { level: "4", label: "Inline style (no !important)", color: "text-yellow-500" },
                    { level: "5", label: "ID selector", color: "text-blue-400" },
                    { level: "6", label: "Class selector", color: "text-zinc-400" },
                  ].map((item) => (
                    <div key={item.level} className="flex items-center gap-2">
                      <span className={`font-bold ${item.color}`}>{item.level}.</span>
                      <span className={item.color}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">{`/* Without !important */\n#header { color: blue; }   /* 1-0-0 */\n.title  { color: red; }   /* 0-1-0 */\n/* Result: blue (ID wins) */\n\n/* With !important */\n#header { color: blue; }         /* 1-0-0 */\n.title  { color: red !important; }\n/* Result: red (!important wins) */\n\n/* !important vs !important */\n#header { color: blue !important; }\n.title  { color: red !important; }\n/* Result: blue (both !important,\n   so specificity breaks the tie) */`}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">When !important is Acceptable</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Acceptable Uses</Badge>
              <div className="space-y-1.5 text-xs">
                {[
                  "Utility classes (.hidden { display: none !important; })",
                  "Overriding third-party library styles",
                  "Accessibility overrides (e.g., forced high contrast)",
                  "Email HTML (inline styles dominate, !important is needed)",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span className="text-emerald-500 shrink-0 mt-0.5">✓</span><span>{item}</span></div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Bad Practices</Badge>
              <div className="space-y-1.5 text-xs">
                {[
                  "Using it to fix specificity wars (fix the root cause instead)",
                  "Adding !important everywhere (creates unmaintainable CSS)",
                  "Overriding !important with more !important (escalation)",
                  "Using it in component-scoped styles (defeats encapsulation)",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2"><span className="text-red-500 shrink-0 mt-0.5">✕</span><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Interview Scenarios</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                q: "Which color wins?",
                code: `p { color: red !important; }\n#text { color: blue; }\n<p id="text">Hello</p>`,
                answer: "Red — !important beats any specificity.",
              },
              {
                q: "Both have !important — who wins?",
                code: `.title { color: red !important; }    /* 0-1-0 */\n#heading { color: blue !important; }  /* 1-0-0 */\n<h1 id="heading" class="title">?</h1>`,
                answer: "Blue — when both are !important, higher specificity wins (#heading > .title).",
              },
              {
                q: "Can you override !important?",
                code: `/* Only these can beat !important: */\n1. Another !important with higher specificity\n2. Another !important later in source order\n   (if same specificity)\n3. Inline style with !important`,
                answer: "Yes, but only with another !important + higher specificity or later source order.",
              },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border p-4 space-y-2">
                <p className="text-xs font-bold text-primary">{item.q}</p>
                <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{item.code}</div>
                <p className="text-[10px] text-muted-foreground"><strong>Answer:</strong> {item.answer}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
