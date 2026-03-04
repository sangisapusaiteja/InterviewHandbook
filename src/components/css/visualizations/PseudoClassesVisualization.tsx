"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PseudoCategory = "user-action" | "structural" | "form-state" | "negation";

const categories: { id: PseudoCategory; label: string; items: { selector: string; desc: string; example: string }[] }[] = [
  {
    id: "user-action", label: "User Action",
    items: [
      { selector: ":hover", desc: "Mouse is over the element", example: `a:hover {\n  color: red;\n  text-decoration: underline;\n}` },
      { selector: ":focus", desc: "Element has keyboard focus", example: `input:focus {\n  outline: 2px solid blue;\n  border-color: blue;\n}` },
      { selector: ":active", desc: "Element is being clicked/pressed", example: `button:active {\n  transform: scale(0.95);\n}` },
      { selector: ":visited", desc: "Link has been visited", example: `a:visited {\n  color: purple;\n}` },
    ],
  },
  {
    id: "structural", label: "Structural",
    items: [
      { selector: ":first-child", desc: "First child of its parent", example: `li:first-child {\n  font-weight: bold;\n}` },
      { selector: ":last-child", desc: "Last child of its parent", example: `li:last-child {\n  border-bottom: none;\n}` },
      { selector: ":nth-child(n)", desc: "Matches by position formula", example: `tr:nth-child(even) {\n  background: #f9f9f9;\n}\ntr:nth-child(3n+1) {\n  color: blue;\n}` },
      { selector: ":only-child", desc: "Only child of its parent", example: `p:only-child {\n  font-size: 1.2em;\n}` },
    ],
  },
  {
    id: "form-state", label: "Form State",
    items: [
      { selector: ":disabled", desc: "Disabled form element", example: `input:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}` },
      { selector: ":checked", desc: "Checked checkbox/radio", example: `input:checked + label {\n  color: green;\n  font-weight: bold;\n}` },
      { selector: ":required", desc: "Required form field", example: `input:required {\n  border-left: 3px solid red;\n}` },
      { selector: ":valid / :invalid", desc: "Validation state", example: `input:valid {\n  border-color: green;\n}\ninput:invalid {\n  border-color: red;\n}` },
    ],
  },
  {
    id: "negation", label: "Negation",
    items: [
      { selector: ":not(selector)", desc: "Matches elements NOT matching selector", example: `/* Every p except .intro */\np:not(.intro) {\n  font-size: 14px;\n}` },
      { selector: ":is(selector)", desc: "Matches any of the selectors", example: `:is(h1, h2, h3) {\n  font-family: serif;\n}` },
      { selector: ":where(selector)", desc: "Like :is() but zero specificity", example: `:where(h1, h2, h3) {\n  margin-top: 1em;\n}\n/* Specificity: 0-0-0 */` },
      { selector: ":has(selector)", desc: "Parent has matching child", example: `/* Card that contains an img */\n.card:has(img) {\n  padding: 0;\n}` },
    ],
  },
];

export function PseudoClassesVisualization() {
  const [active, setActive] = useState<PseudoCategory>("user-action");
  const cat = categories.find((c) => c.id === active)!;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Pseudo-Class Categories</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${active === c.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"}`}>{c.label}</button>
            ))}
          </div>
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            {cat.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-lg border p-3">
                <div className="space-y-1">
                  <code className="text-sm text-primary font-bold">{item.selector}</code>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className="rounded-lg bg-zinc-950 p-2 font-mono text-[10px] text-emerald-400 whitespace-pre overflow-x-auto">{item.example}</div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Key Interview Points</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { point: "Pseudo-classes select existing elements in a particular state", detail: "They don't create new elements — they match based on state, position, or user interaction." },
              { point: ":hover triggers on mouse, :focus on keyboard", detail: "Use :focus-visible for keyboard-only focus styles (avoids focus ring on mouse click)." },
              { point: ":nth-child uses An+B formula", detail: "even = 2n, odd = 2n+1, every 3rd = 3n, first 5 = -n+5." },
              { point: ":not() increases specificity", detail: ":not(.foo) has specificity 0-1-0 (from .foo), while :where(.foo) has 0-0-0." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="rounded-lg border p-3 space-y-1">
                <p className="text-xs font-bold text-primary">{item.point}</p>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
