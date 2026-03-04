"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Directive {
  name: string;
  enabled: boolean;
  desc: string;
}

export function RobotsMetaVisualization() {
  const [directives, setDirectives] = useState<Directive[]>([
    { name: "index", enabled: true, desc: "Allow page to appear in search results" },
    { name: "follow", enabled: true, desc: "Follow and pass equity through outbound links" },
    { name: "noarchive", enabled: false, desc: "Don't show 'Cached' link in search results" },
    { name: "nosnippet", enabled: false, desc: "Don't show description snippet" },
  ]);

  const toggleDirective = (name: string) => {
    setDirectives((prev) =>
      prev.map((d) => {
        if (d.name === "index" && name === "index") return { ...d, name: d.enabled ? "noindex" : "index", enabled: !d.enabled };
        if (d.name === "noindex" && name === "noindex") return { ...d, name: d.enabled ? "noindex" : "index", enabled: !d.enabled };
        if (d.name === "follow" && name === "follow") return { ...d, name: d.enabled ? "nofollow" : "follow", enabled: !d.enabled };
        if (d.name === "nofollow" && name === "nofollow") return { ...d, name: d.enabled ? "nofollow" : "follow", enabled: !d.enabled };
        if (d.name === name) return { ...d, enabled: !d.enabled };
        return d;
      })
    );
  };

  const activeDirectives = directives
    .filter((d) => {
      if (d.name === "index" && d.enabled) return false; // index is default
      if (d.name === "follow" && d.enabled) return false; // follow is default
      if (!d.enabled && (d.name === "noarchive" || d.name === "nosnippet")) return false;
      return true;
    })
    .map((d) => d.name);

  const metaContent = activeDirectives.length > 0 ? activeDirectives.join(", ") : "index, follow";
  const isDefault = activeDirectives.length === 0;

  return (
    <div className="space-y-6">
      {/* Interactive directive builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Robots Directive Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Toggle directives to see how they affect the robots meta tag and search engine behaviour.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Toggle controls */}
            <div className="space-y-3">
              {directives.map((d) => {
                const isIndexOrFollow = d.name === "index" || d.name === "noindex" || d.name === "follow" || d.name === "nofollow";
                const label = isIndexOrFollow
                  ? (d.name === "index" || d.name === "noindex" ? "Index this page" : "Follow links on page")
                  : d.name;

                return (
                  <label key={d.name} className="flex items-start gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={d.name === "index" || d.name === "follow" ? d.enabled : d.enabled}
                      onChange={() => toggleDirective(d.name)}
                    />
                    <div>
                      <span className="font-semibold">{label}</span>
                      <p className="text-[10px] text-muted-foreground">{d.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {/* Generated tag + impact */}
            <div className="space-y-3">
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {isDefault
                  ? `<!-- Default: no tag needed -->\n<!-- <meta name="robots"\n      content="index, follow"> -->`
                  : `<meta name="robots"\n      content="${metaContent}">`}
              </div>

              <div className="rounded-xl border p-3 space-y-2">
                <p className="text-xs font-semibold">Effect on search:</p>
                {directives.map((d) => {
                  const isBlocking = d.name === "noindex" || d.name === "nofollow" || (d.enabled && (d.name === "noarchive" || d.name === "nosnippet"));
                  if (d.name === "index" && d.enabled) return (
                    <p key="idx" className="text-[10px] text-emerald-500">Page WILL appear in search results</p>
                  );
                  if (d.name === "noindex") return (
                    <p key="noidx" className="text-[10px] text-red-400">Page will NOT appear in search results</p>
                  );
                  if (d.name === "follow" && d.enabled) return (
                    <p key="fol" className="text-[10px] text-emerald-500">Links will pass authority (link equity)</p>
                  );
                  if (d.name === "nofollow") return (
                    <p key="nofol" className="text-[10px] text-red-400">Links will NOT pass authority</p>
                  );
                  if (isBlocking) return (
                    <p key={d.name} className="text-[10px] text-amber-500">{d.name}: {d.desc}</p>
                  );
                  return null;
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* robots.txt vs meta robots */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">robots.txt vs Meta Robots</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">
                    <Badge variant="outline" className="text-[9px]">robots.txt</Badge>
                  </th>
                  <th className="text-left p-2">
                    <Badge variant="outline" className="text-[9px]">Meta Robots</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "What it blocks", txt: "Crawling (bot never sees page)", meta: "Indexing (bot sees but won't list)" },
                  { feature: "Scope", txt: "Entire directories/paths", meta: "Individual pages" },
                  { feature: "Location", txt: "/robots.txt at site root", meta: "Inside <head> of each page" },
                  { feature: "If txt blocks", txt: "Bot never reaches page", meta: "Meta tag is never read" },
                  { feature: "Link equity", txt: "Page can still receive links", meta: "nofollow stops passing equity" },
                  { feature: "Use when", txt: "Block entire sections (admin, api)", meta: "Control individual page indexing" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2 text-muted-foreground">{row.txt}</td>
                    <td className="p-2 text-muted-foreground">{row.meta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* When to use noindex */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use noindex</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { page: "Login / registration pages", reason: "No value to search users" },
              { page: "Thank-you / confirmation pages", reason: "Thin content, transactional" },
              { page: "Internal search results", reason: "Duplicate/thin content, wastes crawl budget" },
              { page: "Staging / dev environments", reason: "Prevents accidental indexing" },
              { page: "Paginated archives (page 2+)", reason: "Avoid duplicate content issues" },
              { page: "Admin / dashboard pages", reason: "Private content, no search value" },
            ].map((item, i) => (
              <motion.div
                key={item.page}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className="bg-red-500 text-[9px] shrink-0">noindex</Badge>
                <div>
                  <p className="text-xs font-semibold">{item.page}</p>
                  <p className="text-[10px] text-muted-foreground">{item.reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
