"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FeatureTab = "has" | "nesting" | "layer" | "subgrid" | "color-mix" | "scroll";

const tabs: { id: FeatureTab; label: string }[] = [
  { id: "has", label: ":has()" },
  { id: "nesting", label: "Nesting" },
  { id: "layer", label: "@layer" },
  { id: "subgrid", label: "Subgrid" },
  { id: "color-mix", label: "color-mix()" },
  { id: "scroll", label: "Scroll Animations" },
];

const featureDetails: Record<
  FeatureTab,
  {
    title: string;
    description: string;
    support: string;
    supportLevel: "stable" | "new" | "experimental";
    points: { title: string; desc: string }[];
    code: string;
    interviewTip: string;
  }
> = {
  has: {
    title: ":has() — The Parent Selector",
    description:
      "Finally, CSS can select a parent based on its children. Often called the 'parent selector', :has() is actually a relational pseudo-class.",
    support: "Chrome 105+, Safari 15.4+, Firefox 121+",
    supportLevel: "stable",
    points: [
      {
        title: "Parent selection",
        desc: "div:has(> img) selects a div that directly contains an img.",
      },
      {
        title: "Sibling awareness",
        desc: "h2:has(+ p) selects an h2 that is immediately followed by a p.",
      },
      {
        title: "Form validation",
        desc: "form:has(:invalid) styles the form when any field is invalid.",
      },
      {
        title: "Conditional layouts",
        desc: ".card:has(.card-image) can apply a different layout when an image is present.",
      },
    ],
    code: `/* Select parent that has an image */
.card:has(> img) {
  padding: 0;
  overflow: hidden;
}

/* Style form when invalid */
form:has(:invalid) {
  border-color: red;
}

/* Sibling-aware selection */
h2:has(+ p) {
  margin-bottom: 0.5rem;
}

/* Conditional layout */
.grid:has(> :nth-child(4)) {
  grid-template-columns: repeat(2, 1fr);
}

/* Dark mode without JS */
html:has(#dark-toggle:checked) {
  color-scheme: dark;
  --bg: #0f172a;
  --text: #f1f5f9;
}

/* :has() with :not() */
.nav:not(:has(.dropdown:hover)) .menu {
  display: none;
}`,
    interviewTip:
      "Explain that :has() is NOT just a parent selector -- it is a general relational selector that can look at children, siblings, or any descendant. It was the most requested CSS feature for over a decade.",
  },
  nesting: {
    title: "CSS Nesting",
    description:
      "Native CSS nesting allows you to nest style rules inside one another, reducing repetition -- similar to what Sass has offered for years.",
    support: "Chrome 120+, Safari 17.2+, Firefox 117+",
    supportLevel: "stable",
    points: [
      {
        title: "& selector",
        desc: "The & represents the parent selector. .card { & .title { } } targets .card .title.",
      },
      {
        title: "Implicit &",
        desc: "Starting with an element or class like .child { } inside a rule works without & in newer browsers.",
      },
      {
        title: "Media queries",
        desc: "You can nest @media rules inside a selector block.",
      },
      {
        title: "No preprocessor needed",
        desc: "Reduces the need for Sass/Less just for nesting. Ships natively in the browser.",
      },
    ],
    code: `/* Native CSS nesting */
.card {
  padding: 1rem;
  border-radius: 8px;

  & .title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  & .body {
    color: #666;
    font-size: 0.875rem;
  }

  /* Pseudo-classes */
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  /* Nested media queries */
  @media (max-width: 768px) {
    padding: 0.75rem;

    & .title {
      font-size: 1rem;
    }
  }

  /* Compound selectors */
  &.featured {
    border: 2px solid gold;
  }
}`,
    interviewTip:
      "Mention that CSS nesting landed natively in all major browsers in 2023-2024. It reduces the need for Sass in many projects. The & is optional for descendant selectors in the latest spec but required for compound selectors.",
  },
  layer: {
    title: "@layer — Cascade Layers",
    description:
      "Cascade layers give you explicit control over the cascade order, making it easier to manage specificity conflicts in large codebases.",
    support: "Chrome 99+, Safari 15.4+, Firefox 97+",
    supportLevel: "stable",
    points: [
      {
        title: "Layer order",
        desc: "@layer reset, base, components, utilities; declares the priority order.",
      },
      {
        title: "Lower layers lose",
        desc: "Styles in earlier layers have lower priority, regardless of specificity.",
      },
      {
        title: "Unlayered styles win",
        desc: "Styles not in any layer beat all layered styles (useful for overrides).",
      },
      {
        title: "Third-party control",
        desc: "Wrap third-party CSS in a low-priority layer to prevent it from overriding your styles.",
      },
    ],
    code: `/* Declare layer order */
@layer reset, base, components, utilities;

/* Low priority — always overridable */
@layer reset {
  * { margin: 0; box-sizing: border-box; }
}

@layer base {
  body { font-family: system-ui; }
  a { color: var(--link); }
}

@layer components {
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }
  /* Even a #id selector here loses
     to a simple class in utilities */
}

@layer utilities {
  .text-center { text-align: center; }
  .hidden { display: none; }
}

/* Unlayered — highest priority */
.override { color: red !important; }

/* Import third-party into a layer */
@import url("lib.css") layer(vendor);`,
    interviewTip:
      "Cascade layers solve the specificity war problem. Explain that layer order (not selector specificity) determines which layer wins, making CSS architecture more predictable in large projects and design systems.",
  },
  subgrid: {
    title: "Subgrid",
    description:
      "Subgrid lets a grid item's children participate in the parent grid's track sizing, enabling perfectly aligned nested layouts.",
    support: "Chrome 117+, Safari 16+, Firefox 71+",
    supportLevel: "stable",
    points: [
      {
        title: "grid-template-columns: subgrid",
        desc: "Child grid adopts the parent grid's column tracks instead of defining its own.",
      },
      {
        title: "grid-template-rows: subgrid",
        desc: "Same for rows — child rows align with parent row tracks.",
      },
      {
        title: "Nested alignment",
        desc: "Card headers, bodies, and footers align across sibling cards without hacks.",
      },
      {
        title: "Replaces workarounds",
        desc: "No more display:contents hacks or manual track mirroring.",
      },
    ],
    code: `/* Parent grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* Each card spans 1 column,
   has 3 internal rows */
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  /* Card header, body, footer
     align across all cards */
}

.card-header { /* auto-placed row 1 */ }
.card-body   { /* auto-placed row 2 */ }
.card-footer { /* auto-placed row 3 */ }

/* Subgrid for columns too */
.form-grid {
  display: grid;
  grid-template-columns:
    [label] auto [input] 1fr;
  gap: 0.5rem 1rem;
}

.form-row {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
}`,
    interviewTip:
      "Subgrid solves the 'card alignment' problem — where card titles, content, and buttons need to line up across a row of cards. It is the last major piece of the CSS Grid specification.",
  },
  "color-mix": {
    title: "color-mix()",
    description:
      "Mix two colors together in a specified color space, creating dynamic color variations directly in CSS.",
    support: "Chrome 111+, Safari 16.2+, Firefox 113+",
    supportLevel: "stable",
    points: [
      {
        title: "Syntax",
        desc: "color-mix(in sRGB, color1 percentage, color2 percentage) blends two colors.",
      },
      {
        title: "Color spaces",
        desc: "Works in sRGB, oklch, oklab, hsl, lch, lab, and more.",
      },
      {
        title: "Opacity from variables",
        desc: "color-mix(in sRGB, var(--color) 50%, transparent) creates a semi-transparent version.",
      },
      {
        title: "Dynamic palettes",
        desc: "Generate lighter/darker variants from a single base color without preprocessors.",
      },
    ],
    code: `/* Basic mixing */
.mixed {
  /* 50/50 blend of blue and red */
  color: color-mix(in sRGB, blue, red);
}

/* Custom percentages */
.light-primary {
  background: color-mix(
    in sRGB, var(--primary) 20%, white
  );
}

.dark-primary {
  background: color-mix(
    in sRGB, var(--primary) 80%, black
  );
}

/* Opacity trick — no alpha channel needed */
.semi-transparent {
  background: color-mix(
    in sRGB, var(--primary) 50%, transparent
  );
}

/* Better perceptual mixing with oklch */
.perceptual {
  color: color-mix(
    in oklch, #6366f1 60%, #ec4899
  );
}

/* Dynamic hover states */
.btn:hover {
  background: color-mix(
    in oklch, var(--btn-bg) 85%, black
  );
}`,
    interviewTip:
      "color-mix() is a game-changer for design systems. You can derive an entire palette from one base color at runtime, and the opacity trick (mixing with transparent) solves the long-standing problem of applying opacity to CSS variable colors.",
  },
  scroll: {
    title: "Scroll-Driven Animations",
    description:
      "Animate elements based on scroll position, replacing JavaScript scroll listeners with pure CSS for better performance.",
    support: "Chrome 115+, Safari (partial, TP), Firefox 110+ (flag)",
    supportLevel: "new",
    points: [
      {
        title: "scroll()",
        desc: "animation-timeline: scroll() links an animation to the scroll progress of a container.",
      },
      {
        title: "view()",
        desc: "animation-timeline: view() triggers animation as an element enters/exits the viewport.",
      },
      {
        title: "animation-range",
        desc: "Control when the animation starts and ends: entry, exit, contain, cover.",
      },
      {
        title: "Performance",
        desc: "Runs on the compositor thread, achieving 60fps without JavaScript overhead.",
      },
    ],
    code: `/* Progress bar on page scroll */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--primary);
  transform-origin: left;
  animation: grow-bar linear;
  animation-timeline: scroll();
}

@keyframes grow-bar {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Fade in on scroll into view */
.reveal {
  animation: fade-in linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Parallax effect */
.parallax-bg {
  animation: parallax linear;
  animation-timeline: scroll();
}

@keyframes parallax {
  from { transform: translateY(0); }
  to   { transform: translateY(-30%); }
}`,
    interviewTip:
      "Scroll-driven animations replace IntersectionObserver and scroll event listeners for many use cases. Emphasize the performance benefit: they run off the main thread on the compositor, so they do not cause jank.",
  },
};

export function ModernCSSVisualization() {
  const [activeTab, setActiveTab] = useState<FeatureTab>("has");
  const active = featureDetails[activeTab];

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modern CSS Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[11px] text-muted-foreground">
            CSS has evolved dramatically. These modern features reduce the need for JavaScript and preprocessors, enabling more powerful and performant web interfaces.
          </p>

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
            {/* Feature header */}
            <div className="rounded-xl border p-4 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-bold">{active.title}</p>
                <Badge
                  variant={active.supportLevel === "experimental" ? "destructive" : "outline"}
                  className="text-[9px]"
                >
                  {active.supportLevel === "stable"
                    ? "Stable"
                    : active.supportLevel === "new"
                    ? "New"
                    : "Experimental"}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">{active.description}</p>
              <p className="text-[10px] text-muted-foreground">
                <strong>Support:</strong> {active.support}
              </p>
            </div>

            {/* Details + code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4 space-y-3">
                {active.points.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="space-y-1"
                  >
                    <code className="text-[11px] text-primary font-bold">{p.title}</code>
                    <p className="text-[10px] text-muted-foreground ml-2">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {active.code}
              </div>
            </div>

            {/* Interview tip */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 space-y-1">
              <p className="text-xs font-bold text-amber-500">Interview Tip</p>
              <p className="text-[10px] text-muted-foreground">{active.interviewTip}</p>
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Feature status overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browser Support Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {tabs.map((t, i) => {
              const detail = featureDetails[t.id];
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border p-2.5 flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <code className="text-[11px] text-primary font-bold shrink-0">
                      {t.label}
                    </code>
                    <span className="text-[10px] text-muted-foreground truncate">
                      {detail.support}
                    </span>
                  </div>
                  <Badge
                    variant={detail.supportLevel === "experimental" ? "destructive" : "outline"}
                    className="text-[9px] shrink-0"
                  >
                    {detail.supportLevel === "stable"
                      ? "Stable"
                      : detail.supportLevel === "new"
                      ? "New"
                      : "Experimental"}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interview relevance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Relevance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                q: "What are the most impactful CSS features added recently?",
                a: ":has(), native nesting, @layer, subgrid, container queries, and color-mix() are the biggest additions. Together they reduce reliance on JavaScript and preprocessors.",
              },
              {
                q: "How does CSS nesting differ from Sass nesting?",
                a: "CSS nesting is native (no build step), uses & for compound selectors, and respects the cascade and specificity of the resulting flat selectors. Sass nesting compiles away at build time.",
              },
              {
                q: "When would you use @layer?",
                a: "In large applications or design systems where third-party CSS conflicts with your styles. Layers let you control cascade priority independent of selector specificity.",
              },
              {
                q: "What problem does :has() solve?",
                a: "It allows styling based on descendants or subsequent siblings — something previously impossible in CSS and requiring JavaScript. Examples: form validation states, conditional layouts, and parent-aware styling.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
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
