"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type MetaCategory = "charset" | "description" | "http-equiv" | "theme";

const categories: { id: MetaCategory; label: string }[] = [
  { id: "charset", label: "charset" },
  { id: "description", label: "name + content" },
  { id: "http-equiv", label: "http-equiv" },
  { id: "theme", label: "theme-color" },
];

const codeMap: Record<MetaCategory, string> = {
  charset: `<!-- Always first in <head> -->\n<meta charset="UTF-8">`,
  description: `<!-- SEO description (shown in search results) -->\n<meta name="description"\n      content="Learn HTML meta tags for SEO.">\n\n<!-- Author -->\n<meta name="author" content="Interview Handbook">\n\n<!-- Viewport (responsive design) -->\n<meta name="viewport"\n      content="width=device-width, initial-scale=1.0">`,
  "http-equiv": `<!-- Auto-redirect after 5 seconds -->\n<meta http-equiv="refresh"\n      content="5;url=https://example.com">\n\n<!-- Disable caching -->\n<meta http-equiv="cache-control"\n      content="no-cache">\n\n<!-- Content type (rarely needed with charset) -->\n<meta http-equiv="content-type"\n      content="text/html; charset=UTF-8">`,
  theme: `<!-- Mobile browser address bar color -->\n<meta name="theme-color" content="#3b82f6">\n\n<!-- Dark mode variant -->\n<meta name="theme-color"\n      media="(prefers-color-scheme: dark)"\n      content="#1e293b">`,
};

export function MetaTagsVisualization() {
  const [activeCategory, setActiveCategory] = useState<MetaCategory>("charset");

  return (
    <div className="space-y-6">
      {/* Meta tag explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Meta Tag Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Meta tags live inside <code>&lt;head&gt;</code> and provide information about the page to browsers, search engines, and social platforms.
          </p>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Explanation */}
              <div className="rounded-xl border p-4 space-y-3">
                {activeCategory === "charset" && (
                  <>
                    <Badge className="bg-blue-500 text-[10px]">Encoding</Badge>
                    <p className="text-xs text-muted-foreground">
                      Declares the character encoding. UTF-8 supports all languages and should always be first in &lt;head&gt; (within the first 1024 bytes).
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                      <p className="text-emerald-500">With UTF-8: café, naïve, 日本語</p>
                      <p className="text-red-400">Without: cafÃ©, naÃ¯ve, æ¥æ¬èª</p>
                    </div>
                  </>
                )}
                {activeCategory === "description" && (
                  <>
                    <Badge className="bg-emerald-500 text-[10px]">SEO + Browser</Badge>
                    <p className="text-xs text-muted-foreground">
                      The <code>name</code> + <code>content</code> pattern provides metadata for search engines and browsers.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                      <p><strong>description:</strong> Shown as snippet in search results (150-160 chars)</p>
                      <p><strong>author:</strong> Page author information</p>
                      <p><strong>viewport:</strong> Mobile responsive scaling</p>
                      <p className="text-amber-500 italic">keywords meta is ignored by Google</p>
                    </div>
                  </>
                )}
                {activeCategory === "http-equiv" && (
                  <>
                    <Badge className="bg-purple-500 text-[10px]">HTTP Headers</Badge>
                    <p className="text-xs text-muted-foreground">
                      Simulates HTTP response headers. Use sparingly — server-side headers are preferred.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                      <p><strong>refresh:</strong> Redirect or auto-reload (prefer 301 redirects)</p>
                      <p><strong>cache-control:</strong> Caching behaviour</p>
                      <p className="text-amber-500 italic">Server headers override http-equiv tags</p>
                    </div>
                  </>
                )}
                {activeCategory === "theme" && (
                  <>
                    <Badge className="bg-amber-500 text-[10px]">Mobile UI</Badge>
                    <p className="text-xs text-muted-foreground">
                      Sets the browser&apos;s address bar color on mobile devices. Supports dark mode via media queries.
                    </p>
                    <div className="flex gap-2 mt-2">
                      <div className="rounded-lg p-3 text-center flex-1" style={{ background: "#3b82f6" }}>
                        <span className="text-white text-xs font-bold">Light</span>
                      </div>
                      <div className="rounded-lg p-3 text-center flex-1" style={{ background: "#1e293b" }}>
                        <span className="text-white text-xs font-bold">Dark</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeMap[activeCategory]}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Search result preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How Meta Tags Appear in Search</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-1.5">
            <p className="text-xs text-muted-foreground">example.com &gt; guides &gt; meta-tags</p>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline cursor-pointer">
              HTML Meta Tags Guide — Learn SEO Basics | InterviewHandbook
            </p>
            <p className="text-xs text-muted-foreground">
              Master HTML meta tags for SEO. Learn how to write effective titles, descriptions, and OG tags that improve search rankings and click-through rates.
            </p>
          </div>
          <div className="flex gap-2 text-[10px]">
            <Badge variant="outline">&lt;title&gt; → Blue headline</Badge>
            <Badge variant="outline">meta description → Snippet text</Badge>
            <Badge variant="outline">URL → Breadcrumb path</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
