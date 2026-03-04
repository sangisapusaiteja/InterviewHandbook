"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CQSection = "comparison" | "syntax" | "container-type" | "examples";

const sections: { id: CQSection; label: string }[] = [
  { id: "comparison", label: "vs Media Queries" },
  { id: "syntax", label: "@container Syntax" },
  { id: "container-type", label: "Container Types" },
  { id: "examples", label: "Examples" },
];

const containerTypes = [
  { type: "inline-size", desc: "Query the inline (width) dimension of the container. Most common choice.", recommended: true },
  { type: "size", desc: "Query both inline and block (width and height) dimensions. Use when height matters.", recommended: false },
  { type: "normal", desc: "Default -- element is not a query container. Cannot be queried.", recommended: false },
];

const comparisonPoints = [
  { aspect: "Responds to", media: "Viewport (window) size", container: "Parent container size" },
  { aspect: "Scope", media: "Global -- same breakpoints everywhere", container: "Local -- component adapts to its context" },
  { aspect: "Reusability", media: "Same component in sidebar vs main = same look", container: "Same component adapts to where it is placed" },
  { aspect: "Syntax", media: "@media (min-width: 768px)", container: "@container (min-width: 400px)" },
  { aspect: "Best for", media: "Page-level layout changes", container: "Component-level responsive design" },
];

export function ContainerQueriesVisualization() {
  const [activeSection, setActiveSection] = useState<CQSection>("comparison");

  return (
    <div className="space-y-6">
      {/* Section selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">CSS Container Queries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Container queries let components respond to the size of their parent container instead of the viewport. This enables truly reusable responsive components.
          </p>

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
            className="space-y-4"
          >
            {activeSection === "comparison" && (
              <>
                {/* Visual comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-4 space-y-3">
                    <Badge className="bg-blue-500 text-[10px]">Media Queries</Badge>
                    <p className="text-xs text-muted-foreground">Respond to the viewport (browser window) size.</p>
                    {/* Visual diagram */}
                    <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                      <div className="border border-dashed border-blue-400 rounded p-2">
                        <p className="text-[9px] text-blue-500 font-bold text-center mb-1">Viewport</p>
                        <div className="flex gap-1">
                          <div className="bg-blue-500/20 rounded p-1.5 flex-1">
                            <p className="text-[8px] text-center">Card A</p>
                          </div>
                          <div className="bg-blue-500/20 rounded p-1.5 flex-[2]">
                            <p className="text-[8px] text-center">Card B</p>
                          </div>
                        </div>
                        <p className="text-[8px] text-muted-foreground text-center mt-1">Both respond to window width</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border p-4 space-y-3">
                    <Badge className="bg-emerald-500 text-[10px]">Container Queries</Badge>
                    <p className="text-xs text-muted-foreground">Respond to the parent container size.</p>
                    {/* Visual diagram */}
                    <div className="rounded-lg bg-muted/50 p-3 space-y-2">
                      <div className="flex gap-2">
                        <div className="border border-dashed border-emerald-400 rounded p-1.5 w-1/3">
                          <p className="text-[8px] text-emerald-500 font-bold text-center mb-1">Sidebar</p>
                          <div className="bg-emerald-500/20 rounded p-1">
                            <p className="text-[8px] text-center">Card</p>
                            <p className="text-[7px] text-muted-foreground text-center">stacked</p>
                          </div>
                        </div>
                        <div className="border border-dashed border-emerald-400 rounded p-1.5 flex-1">
                          <p className="text-[8px] text-emerald-500 font-bold text-center mb-1">Main area</p>
                          <div className="bg-emerald-500/20 rounded p-1">
                            <p className="text-[8px] text-center">Same Card</p>
                            <p className="text-[7px] text-muted-foreground text-center">horizontal</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-[8px] text-muted-foreground text-center">Same component, different layout based on parent</p>
                    </div>
                  </motion.div>
                </div>

                {/* Comparison table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Aspect</th>
                        <th className="text-left p-2"><span className="text-blue-500">Media Query</span></th>
                        <th className="text-left p-2"><span className="text-emerald-500">Container Query</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonPoints.map((row, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b last:border-0"
                        >
                          <td className="p-2 font-semibold">{row.aspect}</td>
                          <td className="p-2 text-muted-foreground">{row.media}</td>
                          <td className="p-2 text-muted-foreground">{row.container}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeSection === "syntax" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 space-y-3">
                  <p className="text-xs font-semibold">Two steps to use container queries:</p>
                  <div className="space-y-2">
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">1</span>
                        <p className="text-[10px] font-semibold">Define a container</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground ml-7">Set <code className="text-primary">container-type</code> on the parent element to make it a query container.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="rounded-lg bg-muted/50 p-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">2</span>
                        <p className="text-[10px] font-semibold">Write @container rules</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground ml-7">Use <code className="text-primary">@container</code> blocks just like @media, but they respond to the container instead of the viewport.</p>
                    </motion.div>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 space-y-1">
                    <p className="text-[10px] font-semibold">Optional: container-name</p>
                    <p className="text-[10px] text-muted-foreground">Name containers to target specific ones when you have nested containers.</p>
                    <code className="text-[10px] text-primary block mt-1">container-name: sidebar;</code>
                    <code className="text-[10px] text-primary block">@container sidebar (min-width: 300px) &#123; ... &#125;</code>
                  </div>
                </div>
                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Step 1: Define a container */
.card-wrapper {
  container-type: inline-size;
}

/* Step 2: Query the container */
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}

@container (min-width: 600px) {
  .card {
    gap: 24px;
  }
  .card-image {
    width: 200px;
  }
}

/* Named containers */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

/* Shorthand */
.sidebar {
  container: sidebar / inline-size;
}

@container sidebar (max-width: 300px) {
  .widget { font-size: 0.875rem; }
}`}
                </div>
              </div>
            )}

            {activeSection === "container-type" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {containerTypes.map((ct, i) => (
                    <motion.div
                      key={ct.type}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="rounded-lg border p-3 flex items-start gap-3"
                    >
                      <div className="shrink-0">
                        <code className="text-xs text-primary font-bold">{ct.type}</code>
                        {ct.recommended && <Badge className="bg-emerald-500 text-[8px] ml-2">Most Common</Badge>}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{ct.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* inline-size: query width only */
.wrapper {
  container-type: inline-size;
}

/* size: query both width and height */
.wrapper {
  container-type: size;
}

@container (min-height: 400px) {
  .content { padding: 32px; }
}

/* Shorthand: name / type */
.wrapper {
  container: card-wrapper / inline-size;
}

/* Container query units */
.card {
  /* cqw = 1% of container width */
  font-size: clamp(14px, 3cqw, 18px);
  padding: 2cqw;
}

/* cqw, cqh, cqi, cqb, cqmin, cqmax */`}
                </div>
              </div>
            )}

            {activeSection === "examples" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border p-4 space-y-3">
                    <p className="text-xs font-semibold">Component-Based Responsive Design</p>
                    <p className="text-[10px] text-muted-foreground">
                      A product card that stacks vertically in narrow containers (sidebar) and lays out horizontally in wide containers (main content).
                    </p>
                    {/* Visual demo */}
                    <div className="space-y-2">
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-[9px] font-bold mb-1">Narrow container (sidebar):</p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary/10 border border-primary/30 rounded p-1.5 space-y-1">
                          <div className="h-8 bg-primary/20 rounded" />
                          <div className="h-2 bg-primary/15 rounded w-3/4" />
                          <div className="h-2 bg-primary/10 rounded w-1/2" />
                        </motion.div>
                      </div>
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-[9px] font-bold mb-1">Wide container (main):</p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-primary/10 border border-primary/30 rounded p-1.5 flex gap-2">
                          <div className="h-10 w-14 bg-primary/20 rounded shrink-0" />
                          <div className="flex-1 space-y-1">
                            <div className="h-2 bg-primary/15 rounded w-3/4" />
                            <div className="h-2 bg-primary/10 rounded w-1/2" />
                            <div className="h-2 bg-primary/10 rounded w-2/3" />
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Product card: adapts to container */
.product-wrapper {
  container-type: inline-size;
}

/* Default: stacked (narrow) */
.product-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

/* Wide container: horizontal */
@container (min-width: 400px) {
  .product-card {
    flex-direction: row;
    align-items: center;
  }
  .product-image {
    width: 150px;
    aspect-ratio: 1;
  }
}

/* Extra wide: show more details */
@container (min-width: 600px) {
  .product-card {
    gap: 24px;
  }
  .product-meta {
    display: flex;
  }
}`}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </CardContent>
      </Card>

      {/* Browser support */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Browser Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { browser: "Chrome", version: "105+", supported: true },
              { browser: "Firefox", version: "110+", supported: true },
              { browser: "Safari", version: "16+", supported: true },
              { browser: "Edge", version: "105+", supported: true },
            ].map((b, i) => (
              <motion.div
                key={b.browser}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2 text-center"
              >
                <p className="text-xs font-bold">{b.browser}</p>
                <Badge className={`${b.supported ? "bg-emerald-500" : "bg-red-500"} text-[10px] mt-1`}>{b.version}</Badge>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Container queries are supported in all modern browsers. For older browsers, use a progressive enhancement approach: write default styles that work without container queries, then enhance with @container rules.
          </p>
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
{`/* Progressive enhancement approach */
/* Default: works without CQ support */
.card {
  display: flex;
  flex-direction: column;
}

/* Enhanced: only if CQ is supported */
@supports (container-type: inline-size) {
  .card-wrapper {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .card {
      flex-direction: row;
    }
  }
}`}
          </div>
        </CardContent>
      </Card>

      {/* Interview reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Question</th>
                  <th className="text-left p-2">Key Answer</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { q: "What are container queries?", a: "CSS rules that respond to a parent container's size instead of the viewport, enabling component-level responsive design" },
                  { q: "Container vs media queries?", a: "Media queries respond to viewport; container queries respond to parent element. CQ enables reusable components" },
                  { q: "What is container-type: inline-size?", a: "Makes an element a query container for its inline (width) dimension. Required before using @container" },
                  { q: "What are container query units?", a: "cqw, cqh, cqi, cqb -- relative units based on the query container's dimensions (1cqw = 1% of container width)" },
                ].map((row) => (
                  <tr key={row.q} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.q}</td>
                    <td className="p-2 text-muted-foreground">{row.a}</td>
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
