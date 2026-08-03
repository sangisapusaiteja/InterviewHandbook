"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SemanticElement {
  tag: string;
  role: string;
  purpose: string;
  color: string;
}

const semanticElements: SemanticElement[] = [
  { tag: "<header>", role: "banner", purpose: "Site branding, navigation, introductory content", color: "bg-blue-500" },
  { tag: "<nav>", role: "navigation", purpose: "Major navigation links", color: "bg-indigo-500" },
  { tag: "<main>", role: "main", purpose: "Primary unique content of the page", color: "bg-emerald-500" },
  { tag: "<article>", role: "article", purpose: "Self-contained, distributable content", color: "bg-teal-500" },
  { tag: "<section>", role: "region*", purpose: "Thematic grouping with a heading", color: "bg-cyan-500" },
  { tag: "<aside>", role: "complementary", purpose: "Tangentially related sidebar content", color: "bg-amber-500" },
  { tag: "<footer>", role: "contentinfo", purpose: "Copyright, contact, legal links", color: "bg-zinc-500" },
  { tag: "<figure>", role: "figure", purpose: "Self-contained media with optional caption", color: "bg-purple-500" },
];

type ViewMode = "semantic" | "divSoup";

export function SemanticOverviewVisualization() {
  const [viewMode, setViewMode] = useState<ViewMode>("semantic");
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Semantic HTML vs Div Soup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("semantic")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "semantic" ? "bg-emerald-500 text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              Semantic HTML
            </button>
            <button
              onClick={() => setViewMode("divSoup")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "divSoup" ? "bg-red-500 text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              Div Soup
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-xl border bg-zinc-950 p-4 font-mono text-xs space-y-0.5 overflow-x-auto"
            >
              {viewMode === "semantic" ? (
                <>
                  <div className="text-blue-400">&lt;header&gt;</div>
                  <div className="pl-4 text-indigo-400">&lt;nav&gt; ... &lt;/nav&gt;</div>
                  <div className="text-blue-400">&lt;/header&gt;</div>
                  <div className="text-emerald-400">&lt;main&gt;</div>
                  <div className="pl-4 text-teal-400">&lt;article&gt;</div>
                  <div className="pl-8 text-cyan-400">&lt;section&gt; ... &lt;/section&gt;</div>
                  <div className="pl-8 text-cyan-400">&lt;section&gt; ... &lt;/section&gt;</div>
                  <div className="pl-4 text-teal-400">&lt;/article&gt;</div>
                  <div className="pl-4 text-amber-400">&lt;aside&gt; ... &lt;/aside&gt;</div>
                  <div className="text-emerald-400">&lt;/main&gt;</div>
                  <div className="text-zinc-400">&lt;footer&gt; ... &lt;/footer&gt;</div>
                </>
              ) : (
                <>
                  <div className="text-zinc-500">&lt;div class=&quot;header&quot;&gt;</div>
                  <div className="pl-4 text-zinc-500">&lt;div class=&quot;nav&quot;&gt; ... &lt;/div&gt;</div>
                  <div className="text-zinc-500">&lt;/div&gt;</div>
                  <div className="text-zinc-500">&lt;div class=&quot;main&quot;&gt;</div>
                  <div className="pl-4 text-zinc-500">&lt;div class=&quot;article&quot;&gt;</div>
                  <div className="pl-8 text-zinc-500">&lt;div class=&quot;section&quot;&gt; ... &lt;/div&gt;</div>
                  <div className="pl-8 text-zinc-500">&lt;div class=&quot;section&quot;&gt; ... &lt;/div&gt;</div>
                  <div className="pl-4 text-zinc-500">&lt;/div&gt;</div>
                  <div className="pl-4 text-zinc-500">&lt;div class=&quot;sidebar&quot;&gt; ... &lt;/div&gt;</div>
                  <div className="text-zinc-500">&lt;/div&gt;</div>
                  <div className="text-zinc-500">&lt;div class=&quot;footer&quot;&gt; ... &lt;/div&gt;</div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className={`rounded-lg p-3 text-xs ${
            viewMode === "semantic" ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-red-500/10 text-red-700 dark:text-red-400"
          }`}>
            {viewMode === "semantic"
              ? "Screen readers create a navigable landmark outline. Search engines understand the content hierarchy."
              : "Screen readers see only generic groups. Search engines cannot distinguish navigation from content."}
          </div>
        </CardContent>
      </Card>

      {/* Element reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Semantic Elements &amp; ARIA Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {semanticElements.map((el, i) => (
              <motion.div
                key={el.tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onMouseEnter={() => setHoveredTag(el.tag)}
                onMouseLeave={() => setHoveredTag(null)}
                className={`rounded-lg border p-2.5 flex items-center gap-3 transition-all ${
                  hoveredTag === el.tag ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/50"
                }`}
              >
                <span className={`w-3 h-3 rounded-sm shrink-0 ${el.color}`} />
                <code className="text-xs font-bold w-24 shrink-0">{el.tag}</code>
                <Badge variant="outline" className="text-[9px] shrink-0">role=&quot;{el.role}&quot;</Badge>
                <span className="text-xs text-muted-foreground flex-1 min-w-0 truncate">{el.purpose}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2">
            * &lt;section&gt; only gets role=&quot;region&quot; when it has an accessible name (aria-label or aria-labelledby).
          </p>
        </CardContent>
      </Card>

      {/* Visual page layout */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Typical Semantic Page Layout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden text-xs">
            {/* Header */}
            <div className="bg-blue-500/15 border-b p-3 text-center">
              <code className="text-blue-600 dark:text-blue-400 font-bold">&lt;header&gt;</code>
              <span className="text-muted-foreground ml-2">logo + nav</span>
            </div>
            {/* Main + Aside */}
            <div className="flex">
              <div className="flex-[2] border-r">
                <div className="bg-emerald-500/10 p-2 text-center border-b">
                  <code className="text-emerald-600 dark:text-emerald-400 font-bold">&lt;main&gt;</code>
                </div>
                <div className="bg-teal-500/10 p-2 text-center border-b ml-4 mr-4 mt-2 rounded-t-lg">
                  <code className="text-teal-600 dark:text-teal-400 font-bold">&lt;article&gt;</code>
                </div>
                <div className="bg-cyan-500/10 p-1.5 text-center ml-8 mr-8 border-b">
                  <code className="text-cyan-600 dark:text-cyan-400">&lt;section&gt;</code>
                </div>
                <div className="bg-cyan-500/10 p-1.5 text-center ml-8 mr-8 rounded-b-lg mb-2">
                  <code className="text-cyan-600 dark:text-cyan-400">&lt;section&gt;</code>
                </div>
              </div>
              <div className="flex-1 bg-amber-500/10 p-3 text-center">
                <code className="text-amber-600 dark:text-amber-400 font-bold">&lt;aside&gt;</code>
                <p className="text-muted-foreground mt-1">sidebar</p>
              </div>
            </div>
            {/* Footer */}
            <div className="bg-zinc-500/15 border-t p-3 text-center">
              <code className="text-zinc-600 dark:text-zinc-400 font-bold">&lt;footer&gt;</code>
              <span className="text-muted-foreground ml-2">copyright + links</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
