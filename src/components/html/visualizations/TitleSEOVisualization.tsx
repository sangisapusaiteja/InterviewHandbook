"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TitleSEOVisualization() {
  const [title, setTitle] = useState("HTML Meta Tags Guide — Learn SEO Basics | InterviewHandbook");

  const truncated = title.length > 60;
  const displayTitle = truncated ? title.slice(0, 57) + "..." : title;

  return (
    <div className="space-y-6">
      {/* Live SERP preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Google Search Result Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground" htmlFor="title-input">&lt;title&gt; content:</label>
            <input
              id="title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm mt-0.5 bg-background"
            />
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] ${truncated ? "text-red-400" : "text-emerald-500"}`}>
                {title.length}/60 characters
              </span>
              {truncated && (
                <Badge variant="destructive" className="text-[8px]">Will be truncated</Badge>
              )}
            </div>
          </div>

          {/* Google-style preview */}
          <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-1.5">
            <p className="text-xs text-muted-foreground">https://example.com &rsaquo; guides &rsaquo; meta-tags</p>
            <p className="text-blue-600 dark:text-blue-400 text-base hover:underline cursor-pointer">
              {displayTitle || "Page Title"}
            </p>
            <p className="text-xs text-muted-foreground">
              Master HTML meta tags for SEO. Learn how to write effective titles, descriptions, and OG tags that improve search rankings.
            </p>
          </div>

          {truncated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-amber-500 bg-amber-500/10 rounded-lg p-2.5"
            >
              Google will show: &quot;{displayTitle}&quot; — {title.length - 60} characters are hidden. Front-load important keywords!
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Good vs bad titles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Title Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { title: "JavaScript Closures Explained | InterviewHandbook", good: true, reason: "Keyword first, branded, under 60 chars" },
              { title: "Buy Running Shoes Online — Free Shipping | Nike", good: true, reason: "Clear intent, value prop, branded" },
              { title: "Home", good: false, reason: "Too vague — no keywords, no context" },
              { title: "Page 1", good: false, reason: "Generic — provides zero information to Google" },
              { title: "Buy Shoes | Buy Sneakers | Buy Trainers | ShoeShop", good: false, reason: "Keyword stuffing — Google may rewrite this" },
              { title: "Welcome to Our Amazing Website — The Best Place for Everything You Need Online Today", good: false, reason: "Too long (84 chars), will be truncated" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 space-y-1"
              >
                <div className="flex items-start gap-2">
                  <Badge className={`text-[9px] shrink-0 ${item.good ? "bg-emerald-500" : "bg-red-500"}`}>
                    {item.good ? "Good" : "Bad"}
                  </Badge>
                  <code className="text-xs text-primary break-all">{item.title}</code>
                </div>
                <p className="text-[10px] text-muted-foreground ml-12">{item.reason}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Where title appears */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Where &lt;title&gt; Appears</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { location: "Google search results", desc: "Clickable blue headline — #1 SEO factor", impact: "high" },
              { location: "Browser tab", desc: "Truncated to ~15 chars depending on tab width", impact: "medium" },
              { location: "Bookmarks & history", desc: "Full title shown when bookmarked", impact: "medium" },
              { location: "Social sharing fallback", desc: "Used if og:title is missing", impact: "medium" },
              { location: "Screen readers", desc: "Announced when the page loads — accessibility", impact: "high" },
            ].map((item, i) => (
              <motion.div
                key={item.location}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className={`text-[9px] shrink-0 ${item.impact === "high" ? "bg-red-500" : "bg-blue-500"}`}>
                  {item.impact === "high" ? "High Impact" : "Medium"}
                </Badge>
                <div>
                  <p className="text-xs font-semibold">{item.location}</p>
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
