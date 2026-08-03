"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FuncTab = "min" | "max" | "env" | "attr" | "url";

const tabs: { id: FuncTab; label: string }[] = [
  { id: "min", label: "min()" },
  { id: "max", label: "max()" },
  { id: "env", label: "env()" },
  { id: "attr", label: "attr()" },
  { id: "url", label: "url()" },
];

const funcDetails: Record<
  FuncTab,
  {
    description: string;
    useCases: { title: string; desc: string }[];
    code: string;
    support: string;
  }
> = {
  min: {
    description:
      "Returns the smallest value from a comma-separated list. Great for setting maximum sizes responsively.",
    useCases: [
      {
        title: "Responsive max-width",
        desc: "min(100%, 1200px) caps at 1200px on large screens, stays 100% on small ones.",
      },
      {
        title: "Font cap",
        desc: "font-size: min(5vw, 2rem) prevents text from getting too large.",
      },
      {
        title: "Multiple breakpoints",
        desc: "min(100%, 90vw, 800px) picks the smallest of three values.",
      },
      {
        title: "With calc()",
        desc: "min(calc(100% - 2rem), 600px) combines arithmetic and bounds.",
      },
    ],
    code: `/* Responsive container */
.container {
  width: min(100%, 1200px);
  margin-inline: auto;
}

/* Prevent oversized text */
h1 {
  font-size: min(8vw, 3.5rem);
}

/* Card with adaptive width */
.card {
  width: min(100%, 90vw, 400px);
  padding: min(2rem, 4vw);
}

/* Combining with calc */
.content {
  width: min(
    calc(100% - 2 * var(--gutter)),
    800px
  );
}`,
    support: "All modern browsers (96%+)",
  },
  max: {
    description:
      "Returns the largest value from a comma-separated list. Perfect for setting minimum sizes.",
    useCases: [
      {
        title: "Minimum width",
        desc: "max(300px, 50%) ensures an element is at least 300px wide.",
      },
      {
        title: "Safe area inset",
        desc: "max(1rem, env(safe-area-inset-left)) for notched devices.",
      },
      {
        title: "Minimum font",
        desc: "font-size: max(16px, 1vw + 0.5rem) prevents tiny text.",
      },
      {
        title: "Dynamic floors",
        desc: "padding: max(1rem, 2vw) scales up but never below 1rem.",
      },
    ],
    code: `/* Minimum sidebar width */
.sidebar {
  width: max(250px, 20%);
}

/* Floor for font size */
.body-text {
  font-size: max(1rem, 1.2vw);
}

/* Safe padding on notched devices */
.layout {
  padding-left: max(
    1rem,
    env(safe-area-inset-left)
  );
}

/* Dynamic minimum spacing */
.section {
  padding-block: max(2rem, 4vh);
  gap: max(1rem, 2vw);
}`,
    support: "All modern browsers (96%+)",
  },
  env: {
    description:
      "Accesses environment variables set by the user agent, mainly for handling device safe areas.",
    useCases: [
      {
        title: "Safe area insets",
        desc: "env(safe-area-inset-*) handles notches and rounded corners on mobile devices.",
      },
      {
        title: "viewport-fit=cover",
        desc: "Required meta tag to make env() insets work: <meta name=\"viewport\" content=\"viewport-fit=cover\">.",
      },
      {
        title: "Fallback support",
        desc: "env(safe-area-inset-top, 0px) provides a fallback when not on a notched device.",
      },
      {
        title: "PWA status bar",
        desc: "titlebar-area-* variables for Window Controls Overlay in PWAs.",
      },
    ],
    code: `/* Enable safe area on iOS */
/* <meta name="viewport"
   content="viewport-fit=cover"> */

/* Use safe area insets */
body {
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
}

/* With fallback */
.footer {
  padding-bottom: env(
    safe-area-inset-bottom, 1rem
  );
}

/* Combine with max() */
.nav {
  padding-left: max(
    1rem,
    env(safe-area-inset-left)
  );
}

/* PWA Window Controls Overlay */
.titlebar {
  left: env(titlebar-area-x, 0);
  width: env(titlebar-area-width, 100%);
}`,
    support: "All modern browsers (iOS Safari 11.2+)",
  },
  attr: {
    description:
      "Reads an HTML attribute value for use in CSS, currently mostly in content with generated elements.",
    useCases: [
      {
        title: "Tooltip from data-*",
        desc: "Display data-tooltip attribute text in a ::before pseudo-element.",
      },
      {
        title: "Content property",
        desc: "attr() currently only works reliably inside the content property.",
      },
      {
        title: "Future: typed attr()",
        desc: "CSS Values Level 5 proposes attr(data-width px) for typed values in any property.",
      },
      {
        title: "Counters & labels",
        desc: "Show link URLs in print stylesheets: a::after { content: attr(href); }.",
      },
    ],
    code: `/* Tooltip from data attribute */
.tooltip {
  position: relative;
}
.tooltip::after {
  content: attr(data-tip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}
.tooltip:hover::after {
  opacity: 1;
}

/* Print stylesheet — show URLs */
@media print {
  a::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }
}

/* HTML: <span class="tooltip"
          data-tip="Hello!">Hover</span> */`,
    support: "All browsers (content only). Typed attr() is experimental.",
  },
  url: {
    description:
      "References external resources like images, fonts, and SVGs by their path or URL.",
    useCases: [
      {
        title: "Background images",
        desc: "background-image: url('image.jpg') loads images as backgrounds.",
      },
      {
        title: "@font-face",
        desc: "src: url('font.woff2') loads custom web fonts.",
      },
      {
        title: "Inline SVG / data URI",
        desc: "url('data:image/svg+xml,...') embeds SVG directly in CSS without a file request.",
      },
      {
        title: "cursor",
        desc: "cursor: url('pointer.png'), auto for custom cursors.",
      },
    ],
    code: `/* Background image */
.hero {
  background-image: url('/images/bg.jpg');
  background-size: cover;
  background-position: center;
}

/* Web font */
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/my.woff2') format('woff2'),
       url('/fonts/my.woff') format('woff');
}

/* Inline SVG data URI */
.icon {
  background: url('data:image/svg+xml,\\
    <svg xmlns="http://www.w3.org/2000/svg"\\
     viewBox="0 0 24 24">\\
      <path d="M12 2L2 22h20z"/>\\
    </svg>');
}

/* Custom cursor */
.canvas {
  cursor: url('crosshair.png') 12 12, crosshair;
}

/* CSS mask */
.masked {
  mask-image: url('mask.svg');
}`,
    support: "All browsers (universal support)",
  },
};

export function CSSFunctionsVisualization() {
  const [activeTab, setActiveTab] = useState<FuncTab>("min");
  const active = funcDetails[activeTab];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Functions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === t.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="rounded-xl border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <code className="text-sm text-primary font-bold">{activeTab}()</code>
                <Badge variant="outline" className="text-[9px]">
                  {active.support}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">{active.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4 space-y-3">
                <p className="text-xs font-bold">Use Cases</p>
                {active.useCases.map((uc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="space-y-1"
                  >
                    <code className="text-[11px] text-primary font-bold">{uc.title}</code>
                    <p className="text-[10px] text-muted-foreground ml-2">{uc.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {active.code}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Modern patterns overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modern CSS Function Patterns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              pattern: "Fluid Responsive Design",
              code: "width: min(100%, 90vw, 1200px);",
              desc: "No media queries needed — the browser picks the best fit automatically.",
            },
            {
              pattern: "Safe Area Handling",
              code: "padding: max(1rem, env(safe-area-inset-top));",
              desc: "Gracefully handle notched devices while maintaining minimum padding.",
            },
            {
              pattern: "Dynamic Grid Columns",
              code: "grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));",
              desc: "Auto-responsive grid that works at all viewport sizes.",
            },
            {
              pattern: "Data-Driven Styles",
              code: ".bar::after { content: attr(data-value) '%'; }",
              desc: "Display HTML attribute values directly in CSS-generated content.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border p-3 space-y-1.5"
            >
              <p className="text-xs font-bold">{item.pattern}</p>
              <div className="rounded-lg bg-zinc-950 px-3 py-1.5 font-mono text-[11px] text-emerald-400 overflow-x-auto">
                {item.code}
              </div>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* All functions at a glance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Functions at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Function</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { fn: "calc()", cat: "Math", purpose: "Arithmetic with mixed units" },
                  { fn: "min()", cat: "Comparison", purpose: "Pick smallest value (max cap)" },
                  { fn: "max()", cat: "Comparison", purpose: "Pick largest value (min floor)" },
                  { fn: "clamp()", cat: "Comparison", purpose: "Value between min and max" },
                  { fn: "var()", cat: "Variable", purpose: "Read custom property" },
                  { fn: "env()", cat: "Environment", purpose: "Read UA environment variable" },
                  { fn: "attr()", cat: "Reference", purpose: "Read HTML attribute" },
                  { fn: "url()", cat: "Reference", purpose: "Load external resource" },
                  { fn: "color-mix()", cat: "Color", purpose: "Mix two colors" },
                  { fn: "rgb() / hsl()", cat: "Color", purpose: "Define colors" },
                ].map((row) => (
                  <tr key={row.fn} className="border-b last:border-0">
                    <td className="p-2 font-bold font-mono text-primary">{row.fn}</td>
                    <td className="p-2">
                      <Badge variant="outline" className="text-[9px]">
                        {row.cat}
                      </Badge>
                    </td>
                    <td className="p-2 text-muted-foreground">{row.purpose}</td>
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
