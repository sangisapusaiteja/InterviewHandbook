"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CalcSection = "basics" | "patterns" | "nesting" | "variables";

const sections: { id: CalcSection; label: string }[] = [
  { id: "basics", label: "Syntax & Basics" },
  { id: "patterns", label: "Common Patterns" },
  { id: "nesting", label: "Nesting calc()" },
  { id: "variables", label: "With Variables" },
];

const sectionDetails: Record<
  CalcSection,
  { points: { title: string; desc: string }[]; code: string }
> = {
  basics: {
    points: [
      {
        title: "Mixed Units",
        desc: "calc() lets you combine different units: px, %, rem, vw, vh, em, etc.",
      },
      {
        title: "Four Operators",
        desc: "Supports +, -, *, /. Multiplication and division need at least one unitless number.",
      },
      {
        title: "Whitespace Rule",
        desc: "Spaces are required around + and - operators. calc(100%-20px) is invalid.",
      },
      {
        title: "Where to Use",
        desc: "Works in any CSS property that accepts a numeric value: width, height, margin, font-size, etc.",
      },
    ],
    code: `/* Mix different units */
.container {
  width: calc(100% - 2rem);
  padding: calc(1rem + 4px);
}

/* Operators */
.half   { width: calc(100% / 2); }
.double { width: calc(50px * 2); }

/* IMPORTANT: spaces around + - */
.valid   { width: calc(100% - 20px); }
.invalid { width: calc(100%-20px); } /* ERROR */

/* Works in many properties */
.element {
  font-size: calc(1rem + 0.5vw);
  margin-top: calc(var(--header) + 1rem);
  transform: rotate(calc(45deg / 2));
}`,
  },
  patterns: {
    points: [
      {
        title: "Full Width Minus Fixed",
        desc: "calc(100% - 250px) for a main content area next to a fixed sidebar.",
      },
      {
        title: "Full Height Minus Navbar",
        desc: "calc(100vh - 64px) for content below a fixed header.",
      },
      {
        title: "Equal Column Gaps",
        desc: "calc((100% - gap * (n-1)) / n) to divide space evenly with gaps.",
      },
      {
        title: "Centering Offset",
        desc: "calc(50% - width/2) for manual centering when flexbox isn't an option.",
      },
    ],
    code: `/* Content next to fixed sidebar */
.sidebar { width: 250px; }
.main    { width: calc(100% - 250px); }

/* Below fixed header */
.content {
  height: calc(100vh - 64px);
  margin-top: 64px;
}

/* 3 equal columns with gaps */
.col {
  width: calc((100% - 2 * 16px) / 3);
  margin-right: 16px;
}
.col:last-child { margin-right: 0; }

/* Centering without flexbox */
.modal {
  width: 400px;
  left: calc(50% - 200px);
}

/* Responsive font size */
h1 { font-size: calc(1.5rem + 1vw); }`,
  },
  nesting: {
    points: [
      {
        title: "Nested calc()",
        desc: "You can nest calc() inside another calc() for complex expressions.",
      },
      {
        title: "Browser Simplification",
        desc: "Browsers flatten nested calc() internally; nesting is mainly for readability.",
      },
      {
        title: "Complex Layouts",
        desc: "Useful when computing intermediate values that depend on other computed values.",
      },
      {
        title: "With min() / max()",
        desc: "calc() can be nested inside min(), max(), and clamp() functions.",
      },
    ],
    code: `/* Nested calc for clarity */
.element {
  width: calc(
    calc(100% - 2 * var(--gutter)) / 3
  );
}

/* Same result, flattened */
.element {
  width: calc(
    (100% - 2 * var(--gutter)) / 3
  );
}

/* Inside min() / max() */
.container {
  width: min(
    calc(100% - 2rem),
    800px
  );
}

/* Complex spacing */
.grid-item {
  height: calc(
    100vh
    - var(--header-h)
    - var(--footer-h)
    - calc(2 * var(--padding))
  );
}`,
  },
  variables: {
    points: [
      {
        title: "Variable + calc()",
        desc: "Combine CSS variables with calc() for highly dynamic layouts.",
      },
      {
        title: "Unitless Variables",
        desc: "Store unitless numbers in variables and multiply by a unit inside calc().",
      },
      {
        title: "Spacing Scale",
        desc: "Use a base variable and calc() multipliers for consistent spacing.",
      },
      {
        title: "Responsive Systems",
        desc: "Change one variable and calc() recalculates all dependent values.",
      },
    ],
    code: `:root {
  --columns: 12;
  --gutter: 16px;
  --base-size: 4px;
}

/* Column width from variable */
.col-4 {
  width: calc(4 / var(--columns) * 100%);
}

/* Spacing scale */
.space-2 { margin: calc(var(--base-size) * 2); }
.space-4 { margin: calc(var(--base-size) * 4); }
.space-8 { margin: calc(var(--base-size) * 8); }

/* Unitless variable trick */
:root { --cols: 3; }
.item {
  width: calc(
    (100% - (var(--cols) - 1) * var(--gutter))
    / var(--cols)
  );
}

/* Change one variable = new layout */
@media (max-width: 768px) {
  :root { --cols: 1; --gutter: 8px; }
}`,
  },
};

export function CalcFunctionVisualization() {
  const [activeSection, setActiveSection] = useState<CalcSection>("basics");
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const active = sectionDetails[activeSection];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The calc() Function</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSection === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {active.points.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-1"
                >
                  <code className="text-sm text-primary font-bold">{p.title}</code>
                  <p className="text-[10px] text-muted-foreground ml-2">{p.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Interactive sidebar + main demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interactive: calc(100% - sidebar)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold">Sidebar Width:</label>
            <input
              type="range"
              min={100}
              max={400}
              value={sidebarWidth}
              onChange={(e) => setSidebarWidth(Number(e.target.value))}
              className="flex-1"
            />
            <Badge variant="outline" className="text-[10px] font-mono">
              {sidebarWidth}px
            </Badge>
          </div>

          <div className="rounded-xl border overflow-hidden">
            <div className="flex h-32">
              <motion.div
                animate={{ width: sidebarWidth }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-indigo-500/20 border-r flex items-center justify-center shrink-0"
              >
                <div className="text-center">
                  <p className="text-[10px] font-bold text-indigo-400">.sidebar</p>
                  <code className="text-[9px] text-muted-foreground">{sidebarWidth}px</code>
                </div>
              </motion.div>
              <div className="flex-1 bg-emerald-500/10 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-emerald-400">.main</p>
                  <code className="text-[9px] text-muted-foreground">
                    calc(100% - {sidebarWidth}px)
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
            {`.sidebar { width: ${sidebarWidth}px; }\n.main    { width: calc(100% - ${sidebarWidth}px); }`}
          </div>
        </CardContent>
      </Card>

      {/* Operator reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Operator Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Operator</th>
                  <th className="text-left p-2">Rule</th>
                  <th className="text-left p-2">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { op: "+", rule: "Both operands can have units. Spaces required.", ex: "calc(100% + 20px)" },
                  { op: "-", rule: "Both operands can have units. Spaces required.", ex: "calc(100vh - 64px)" },
                  { op: "*", rule: "At least one operand must be unitless.", ex: "calc(2 * 1rem)" },
                  { op: "/", rule: "Right operand must be unitless and non-zero.", ex: "calc(100% / 3)" },
                ].map((row) => (
                  <tr key={row.op} className="border-b last:border-0">
                    <td className="p-2 font-bold font-mono text-primary">{row.op}</td>
                    <td className="p-2 text-muted-foreground">{row.rule}</td>
                    <td className="p-2"><code className="text-[11px] text-primary">{row.ex}</code></td>
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
