"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type VarSection = "syntax" | "scope" | "theming" | "javascript";

const sections: { id: VarSection; label: string }[] = [
  { id: "syntax", label: "Syntax & var()" },
  { id: "scope", label: "Scope" },
  { id: "theming", label: "Theming" },
  { id: "javascript", label: "JS Interaction" },
];

const sectionDetails: Record<
  VarSection,
  { points: { title: string; desc: string }[]; code: string }
> = {
  syntax: {
    points: [
      {
        title: "--variable-name",
        desc: "Custom properties always start with two dashes. Names are case-sensitive.",
      },
      {
        title: "var(--name)",
        desc: "The var() function reads the value of a custom property at runtime.",
      },
      {
        title: "var(--name, fallback)",
        desc: "Second argument is used when the variable is not defined or is invalid.",
      },
      {
        title: "Nested fallbacks",
        desc: "var(--a, var(--b, #000)) chains fallbacks for resilient styles.",
      },
    ],
    code: `:root {
  --primary: #6366f1;
  --radius: 8px;
  --spacing-sm: 0.5rem;
}

.button {
  background: var(--primary);
  border-radius: var(--radius);
  padding: var(--spacing-sm);
}

/* Fallback if --accent is undefined */
.card {
  color: var(--accent, #333);
}

/* Nested fallback */
.badge {
  bg: var(--theme, var(--primary, blue));
}`,
  },
  scope: {
    points: [
      {
        title: ":root (Global)",
        desc: "Variables on :root are available everywhere in the document.",
      },
      {
        title: "Selector (Local)",
        desc: "Variables scoped to a selector are only available inside that subtree.",
      },
      {
        title: "Inheritance",
        desc: "Custom properties inherit down the DOM tree, just like color or font.",
      },
      {
        title: "Overriding",
        desc: "A child can re-declare a variable to override the inherited value.",
      },
    ],
    code: `/* Global — available everywhere */
:root {
  --color: #6366f1;
  --font: 'Inter', sans-serif;
}

/* Local — only inside .sidebar */
.sidebar {
  --color: #10b981;
  --sidebar-width: 280px;
}

/* Inheritance: child inherits --color */
.sidebar .link {
  color: var(--color);  /* #10b981 */
}

/* Outside sidebar uses root value */
.header .link {
  color: var(--color);  /* #6366f1 */
}`,
  },
  theming: {
    points: [
      {
        title: "Light / Dark Toggle",
        desc: "Swap theme by re-declaring the same variable names under a different selector.",
      },
      {
        title: "data-theme attribute",
        desc: 'Use [data-theme="dark"] on <html> for easy JS-driven toggling.',
      },
      {
        title: "prefers-color-scheme",
        desc: "Media query sets theme automatically based on OS preference.",
      },
      {
        title: "Component Variants",
        desc: "Override variables on a component class for different visual styles.",
      },
    ],
    code: `/* Default (light) theme */
:root {
  --bg: #ffffff;
  --text: #111827;
  --surface: #f3f4f6;
}

/* Dark theme via attribute */
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --surface: #1e293b;
}

/* Or via media query */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f172a;
    --text: #f1f5f9;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}`,
  },
  javascript: {
    points: [
      {
        title: "setProperty()",
        desc: "element.style.setProperty('--name', value) sets a custom property from JS.",
      },
      {
        title: "getPropertyValue()",
        desc: "getComputedStyle(el).getPropertyValue('--name') reads the resolved value.",
      },
      {
        title: "Dynamic Theming",
        desc: "Let users pick colors at runtime — no CSS reload needed.",
      },
      {
        title: "Animation Driven",
        desc: "Update variables on mousemove/scroll for real-time interactive effects.",
      },
    ],
    code: `// Set a variable on :root
document.documentElement.style
  .setProperty('--primary', '#ef4444');

// Read a computed variable
const root = document.documentElement;
const val = getComputedStyle(root)
  .getPropertyValue('--primary');
// val → '#ef4444'

// Dynamic: update on slider change
slider.addEventListener('input', (e) => {
  root.style.setProperty(
    '--radius',
    e.target.value + 'px'
  );
});

// Mousemove effect
el.addEventListener('mousemove', (e) => {
  el.style.setProperty('--x', e.offsetX + 'px');
  el.style.setProperty('--y', e.offsetY + 'px');
});`,
  },
};

export function CSSVariablesVisualization() {
  const [activeSection, setActiveSection] = useState<VarSection>("syntax");
  const [isDark, setIsDark] = useState(false);
  const active = sectionDetails[activeSection];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Custom Properties (Variables)</CardTitle>
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
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-primary font-bold">{p.title}</code>
                  </div>
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

      {/* Live theming demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live Theme Toggle Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-primary text-primary-foreground transition-all"
          >
            Switch to {isDark ? "Light" : "Dark"} Theme
          </button>

          <motion.div
            animate={{
              backgroundColor: isDark ? "#0f172a" : "#ffffff",
              color: isDark ? "#f1f5f9" : "#111827",
            }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border p-5 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px]">
                {isDark ? "data-theme=\"dark\"" : ":root (light)"}
              </Badge>
            </div>
            <motion.div
              animate={{
                backgroundColor: isDark ? "#1e293b" : "#f3f4f6",
              }}
              className="rounded-lg p-4 space-y-2"
            >
              <p className="text-xs font-bold">Sample Card</p>
              <p className="text-[10px] opacity-70">
                This card responds to the theme toggle. In production, you would
                swap CSS variables on the root element instead of inline styles.
              </p>
              <motion.button
                animate={{
                  backgroundColor: isDark ? "#818cf8" : "#6366f1",
                }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-semibold text-white"
              >
                var(--primary)
              </motion.button>
            </motion.div>
            <div className="rounded-xl bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {isDark
                ? `[data-theme="dark"] {\n  --bg: #0f172a;\n  --text: #f1f5f9;\n  --surface: #1e293b;\n  --primary: #818cf8;\n}`
                : `:root {\n  --bg: #ffffff;\n  --text: #111827;\n  --surface: #f3f4f6;\n  --primary: #6366f1;\n}`}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Quick reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {[
              { q: "How do CSS variables differ from Sass variables?", a: "CSS variables are live in the browser, can be changed at runtime with JS, and respect the cascade. Sass variables are compiled away at build time." },
              { q: "Can custom properties be animated?", a: "Not directly with transition (they are discrete), but you can register them with @property to define a type (e.g. <color>) and enable smooth transitions." },
              { q: "What happens if a variable is undefined and has no fallback?", a: "The property using var() receives the initial value (or inherits), it does not cause a parse error." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 space-y-1"
              >
                <p className="text-xs font-bold">{item.q}</p>
                <p className="text-[10px] text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
