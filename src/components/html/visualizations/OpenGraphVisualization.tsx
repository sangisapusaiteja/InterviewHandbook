"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OpenGraphVisualization() {
  const [ogTitle, setOgTitle] = useState("HTML Meta Tags — Complete Guide");
  const [ogDesc, setOgDesc] = useState("Learn how OG tags control social media previews and improve click-through rates.");
  const [ogSite, setOgSite] = useState("Interview Handbook");

  return (
    <div className="space-y-6">
      {/* Live preview builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Social Card Preview Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Edit the fields to see how your page appears when shared on social media.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="og-title">og:title</label>
                <input
                  id="og-title"
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background"
                  maxLength={70}
                />
                <p className="text-[10px] text-muted-foreground mt-0.5">{ogTitle.length}/70 characters</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="og-desc">og:description</label>
                <textarea
                  id="og-desc"
                  value={ogDesc}
                  onChange={(e) => setOgDesc(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background resize-none"
                  rows={2}
                  maxLength={200}
                />
                <p className="text-[10px] text-muted-foreground mt-0.5">{ogDesc.length}/200 characters</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground" htmlFor="og-site">og:site_name</label>
                <input
                  id="og-site"
                  type="text"
                  value={ogSite}
                  onChange={(e) => setOgSite(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background"
                />
              </div>
            </div>

            {/* Social card preview */}
            <div className="space-y-3">
              <p className="text-xs font-semibold">Preview (Facebook/LinkedIn):</p>
              <div className="rounded-xl border overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 h-36 flex items-center justify-center">
                  <span className="text-3xl">🖼️</span>
                  <span className="ml-2 text-xs text-muted-foreground">1200 × 630</span>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase">{ogSite || "example.com"}</p>
                  <p className="text-sm font-semibold line-clamp-2">{ogTitle || "Page Title"}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{ogDesc || "Page description..."}</p>
                </div>
              </div>

              <p className="text-xs font-semibold">Preview (Twitter/X):</p>
              <div className="rounded-xl border overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 h-28 flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                  <span className="ml-2 text-xs text-muted-foreground">summary_large_image</span>
                </div>
                <div className="p-2.5 space-y-0.5">
                  <p className="text-xs font-semibold line-clamp-1">{ogTitle || "Page Title"}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-2">{ogDesc || "Page description..."}</p>
                  <p className="text-[10px] text-muted-foreground">example.com</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Required vs optional tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Open Graph Tags Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { tag: "og:title", required: true, desc: "Page title for social cards" },
              { tag: "og:type", required: true, desc: 'Content type (usually "website")' },
              { tag: "og:image", required: true, desc: "Preview image — absolute URL, 1200×630px recommended" },
              { tag: "og:url", required: true, desc: "Canonical URL of the page" },
              { tag: "og:description", required: false, desc: "Summary text (55-200 chars)" },
              { tag: "og:site_name", required: false, desc: "Name of the overall website" },
              { tag: "og:image:width", required: false, desc: "Image width in pixels (helps avoid flicker)" },
              { tag: "og:image:height", required: false, desc: "Image height in pixels" },
              { tag: "twitter:card", required: false, desc: "Twitter card type: summary, summary_large_image" },
            ].map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className={`text-[9px] shrink-0 ${item.required ? "bg-red-500" : "bg-blue-500"}`}>
                  {item.required ? "Required" : "Optional"}
                </Badge>
                <div>
                  <code className="text-xs text-primary font-bold">{item.tag}</code>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
