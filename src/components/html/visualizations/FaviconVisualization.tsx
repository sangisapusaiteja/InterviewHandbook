"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FaviconType = "svg" | "png" | "apple" | "manifest";

const faviconTypes: { id: FaviconType; label: string }[] = [
  { id: "svg", label: "SVG Favicon" },
  { id: "png", label: "PNG Fallback" },
  { id: "apple", label: "Apple Touch" },
  { id: "manifest", label: "PWA Manifest" },
];

const codeMap: Record<FaviconType, string> = {
  svg: `<!-- SVG favicon — scales to any size -->\n<link rel="icon"\n      type="image/svg+xml"\n      href="/icon.svg">\n\n<!-- Supports dark mode inside SVG! -->\n<!-- <style>\n  @media (prefers-color-scheme: dark) {\n    .icon-bg { fill: #1e293b; }\n  }\n</style> -->`,
  png: `<!-- PNG fallback for older browsers -->\n<link rel="icon"\n      type="image/png"\n      sizes="32x32"\n      href="/favicon-32x32.png">\n\n<link rel="icon"\n      type="image/png"\n      sizes="16x16"\n      href="/favicon-16x16.png">`,
  apple: `<!-- iOS home screen icon (180×180) -->\n<link rel="apple-touch-icon"\n      sizes="180x180"\n      href="/apple-touch-icon.png">\n\n<!-- iOS automatically rounds corners\n     and adds gloss effect -->`,
  manifest: `<!-- Link to PWA manifest -->\n<link rel="manifest" href="/site.webmanifest">\n\n<!-- site.webmanifest contents: -->\n{\n  "icons": [\n    {\n      "src": "/icon-192.png",\n      "sizes": "192x192",\n      "type": "image/png"\n    },\n    {\n      "src": "/icon-512.png",\n      "sizes": "512x512",\n      "type": "image/png"\n    }\n  ]\n}`,
};

export function FaviconVisualization() {
  const [activeType, setActiveType] = useState<FaviconType>("svg");

  return (
    <div className="space-y-6">
      {/* Favicon type explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Favicon Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {faviconTypes.map((ft) => (
              <button
                key={ft.id}
                onClick={() => setActiveType(ft.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === ft.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {ft.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Visual */}
              <div className="rounded-xl border p-4 space-y-3">
                {activeType === "svg" && (
                  <>
                    <Badge className="bg-emerald-500 text-[10px]">Recommended</Badge>
                    <p className="text-xs text-muted-foreground">
                      SVG favicons scale perfectly to any size and support dark mode via CSS media queries inside the SVG.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white text-xs font-bold">IH</div>
                      <span className="text-[10px] text-muted-foreground">16px tab</span>
                      <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm font-bold">IH</div>
                      <span className="text-[10px] text-muted-foreground">32px bookmark</span>
                      <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold">IH</div>
                      <span className="text-[10px] text-muted-foreground">64px shortcut</span>
                    </div>
                    <p className="text-[10px] text-emerald-500 italic">One SVG file — crisp at every size!</p>
                  </>
                )}
                {activeType === "png" && (
                  <>
                    <Badge className="bg-blue-500 text-[10px]">Fallback</Badge>
                    <p className="text-xs text-muted-foreground">
                      PNG favicons are pixel-based — you need separate files for each size. Used as fallback for browsers that don&apos;t support SVG favicons.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="w-4 h-4 rounded bg-blue-500 mx-auto" />
                        <span className="text-[8px] text-muted-foreground">16×16</span>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded bg-blue-500 mx-auto" />
                        <span className="text-[8px] text-muted-foreground">32×32</span>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded bg-blue-500 mx-auto" />
                        <span className="text-[8px] text-muted-foreground">48×48</span>
                      </div>
                    </div>
                  </>
                )}
                {activeType === "apple" && (
                  <>
                    <Badge className="bg-purple-500 text-[10px]">iOS</Badge>
                    <p className="text-xs text-muted-foreground">
                      When users &quot;Add to Home Screen&quot; on iOS, this 180×180 icon is used. iOS auto-applies rounded corners.
                    </p>
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                        IH
                      </div>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground">180×180px — iOS home screen</p>
                  </>
                )}
                {activeType === "manifest" && (
                  <>
                    <Badge className="bg-amber-500 text-[10px]">PWA / Android</Badge>
                    <p className="text-xs text-muted-foreground">
                      The web app manifest defines icons for PWA installation on Android. Requires 192×192 and 512×512 PNGs.
                    </p>
                    <div className="flex items-center gap-4 justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">IH</div>
                        <span className="text-[8px] text-muted-foreground">192px</span>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">IH</div>
                        <span className="text-[8px] text-muted-foreground">512px</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeMap[activeType]}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Where favicons appear */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Where Favicons Appear</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { location: "Browser tab", size: "16×16 or 32×32", icon: "🗂️" },
              { location: "Bookmarks bar", size: "16×16", icon: "⭐" },
              { location: "Google mobile search", size: "48×48 minimum", icon: "🔍" },
              { location: "iOS home screen", size: "180×180", icon: "📱" },
              { location: "Android/PWA install", size: "192×192, 512×512", icon: "📲" },
              { location: "Windows taskbar pin", size: "32×32", icon: "📌" },
            ].map((item, i) => (
              <motion.div
                key={item.location}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-center gap-3"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs font-semibold flex-1">{item.location}</span>
                <code className="text-[10px] text-muted-foreground">{item.size}</code>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
