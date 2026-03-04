"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UseCase = "art-direction" | "format" | "combined";

const useCases: { id: UseCase; label: string }[] = [
  { id: "art-direction", label: "Art Direction" },
  { id: "format", label: "Format Switching" },
  { id: "combined", label: "Combined" },
];

export function PictureElementVisualization() {
  const [activeCase, setActiveCase] = useState<UseCase>("art-direction");

  return (
    <div className="space-y-6">
      {/* Use case explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">&lt;picture&gt; Use Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The <code>&lt;picture&gt;</code> element serves different images based on device, screen size, or browser format support.
          </p>

          <div className="flex flex-wrap gap-2">
            {useCases.map((uc) => (
              <button
                key={uc.id}
                onClick={() => setActiveCase(uc.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCase === uc.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {uc.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Visual explanation */}
              <div className="rounded-xl border p-4 space-y-3">
                {activeCase === "art-direction" && (
                  <>
                    <Badge className="bg-blue-500 text-[10px]">Art Direction</Badge>
                    <p className="text-xs text-muted-foreground">
                      Serve different image crops based on screen width. Mobile gets a tight crop, desktop gets the wide shot.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-10 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-900 rounded text-[8px] flex items-center justify-center">
                          Mobile
                        </div>
                        <span className="text-[10px] text-muted-foreground">Square crop — 300x300</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-10 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900 rounded text-[8px] flex items-center justify-center">
                          Tablet
                        </div>
                        <span className="text-[10px] text-muted-foreground">Medium crop — 600x300</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-40 h-10 bg-gradient-to-r from-emerald-200 to-emerald-300 dark:from-emerald-800 dark:to-emerald-900 rounded text-[8px] flex items-center justify-center">
                          Desktop
                        </div>
                        <span className="text-[10px] text-muted-foreground">Wide shot — 1200x400</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-emerald-500 italic">Uses media attribute on &lt;source&gt;</p>
                  </>
                )}
                {activeCase === "format" && (
                  <>
                    <Badge className="bg-purple-500 text-[10px]">Format Switching</Badge>
                    <p className="text-xs text-muted-foreground">
                      Serve modern formats (AVIF, WebP) to browsers that support them, with JPEG/PNG fallback.
                    </p>
                    <div className="space-y-2">
                      {[
                        { format: "AVIF", size: "45 KB", support: "Chrome, Firefox", color: "bg-emerald-100 dark:bg-emerald-900" },
                        { format: "WebP", size: "65 KB", support: "All modern", color: "bg-blue-100 dark:bg-blue-900" },
                        { format: "JPEG", size: "120 KB", support: "Universal", color: "bg-amber-100 dark:bg-amber-900" },
                      ].map((f) => (
                        <div key={f.format} className={`rounded-lg p-2 ${f.color} text-xs flex justify-between`}>
                          <span className="font-semibold">{f.format}</span>
                          <span>{f.size}</span>
                          <span className="text-muted-foreground">{f.support}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-emerald-500 italic">Uses type attribute on &lt;source&gt;</p>
                  </>
                )}
                {activeCase === "combined" && (
                  <>
                    <Badge className="bg-amber-500 text-[10px]">Combined</Badge>
                    <p className="text-xs text-muted-foreground">
                      Combine both patterns: art direction AND format switching for maximum optimization.
                    </p>
                    <div className="rounded-lg border p-3 bg-muted/50 text-xs space-y-1">
                      <p>1. Desktop + WebP (best case)</p>
                      <p>2. Desktop + JPEG (no WebP support)</p>
                      <p>3. Mobile + WebP</p>
                      <p>4. Mobile + JPEG (ultimate fallback)</p>
                    </div>
                    <p className="text-[10px] text-emerald-500 italic">Uses both media and type attributes</p>
                  </>
                )}
              </div>

              {/* Code */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {activeCase === "art-direction" && `<picture>\n  <source\n    media="(min-width: 800px)"\n    srcset="hero-wide.jpg">\n  <source\n    media="(min-width: 400px)"\n    srcset="hero-medium.jpg">\n  <img src="hero-mobile.jpg"\n       alt="Hero image">\n</picture>`}
                {activeCase === "format" && `<picture>\n  <source type="image/avif"\n          srcset="photo.avif">\n  <source type="image/webp"\n          srcset="photo.webp">\n  <img src="photo.jpg"\n       alt="Photo">\n</picture>`}
                {activeCase === "combined" && `<picture>\n  <source media="(min-width: 800px)"\n          type="image/webp"\n          srcset="hero-wide.webp">\n  <source media="(min-width: 800px)"\n          srcset="hero-wide.jpg">\n  <source type="image/webp"\n          srcset="hero-mobile.webp">\n  <img src="hero-mobile.jpg"\n       alt="Hero image">\n</picture>`}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* picture vs img srcset */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">&lt;picture&gt; vs &lt;img srcset&gt;</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">
                    <Badge variant="outline" className="text-[9px]">&lt;picture&gt;</Badge>
                  </th>
                  <th className="text-left p-2">
                    <Badge variant="outline" className="text-[9px]">&lt;img srcset&gt;</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Different images per breakpoint", picture: "Yes (art direction)", srcset: "No — same image, different sizes" },
                  { feature: "Format fallback", picture: "Yes (AVIF → WebP → JPEG)", srcset: "No" },
                  { feature: "Resolution switching", picture: "Not its purpose", srcset: "Yes (1x, 2x, 3x)" },
                  { feature: "Browser picks best", picture: "First match wins", srcset: "Browser chooses optimally" },
                  { feature: "Use when", picture: "Different crops or formats", srcset: "Same image, different resolutions" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2 text-muted-foreground">{row.picture}</td>
                    <td className="p-2 text-muted-foreground">{row.srcset}</td>
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
