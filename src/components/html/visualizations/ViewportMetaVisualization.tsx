"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ViewportMetaVisualization() {
  const [hasViewport, setHasViewport] = useState(true);

  return (
    <div className="space-y-6">
      {/* With vs without viewport */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">With vs Without Viewport Meta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={hasViewport}
              onChange={(e) => setHasViewport(e.target.checked)}
            />
            <span className="font-semibold">Viewport meta tag enabled</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone mockup */}
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: hasViewport ? 1 : 0.95 }}
                className="relative w-48 h-80 rounded-3xl border-4 border-zinc-800 dark:border-zinc-300 bg-white dark:bg-zinc-900 overflow-hidden"
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 dark:bg-zinc-300 rounded-b-xl" />

                {/* Screen content */}
                <div className="mt-6 p-2 h-full">
                  {hasViewport ? (
                    <div className="space-y-2">
                      <div className="h-4 bg-blue-500 rounded w-3/4" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                      <div className="h-8 bg-emerald-100 dark:bg-emerald-900 rounded mt-2" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                      <p className="text-[7px] text-emerald-500 mt-1 text-center">Readable text size</p>
                    </div>
                  ) : (
                    <div className="space-y-0.5 transform scale-[0.35] origin-top-left w-[280%]">
                      <div className="h-4 bg-blue-500 rounded w-3/4" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-5/6" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                      <div className="h-8 bg-red-100 dark:bg-red-900 rounded mt-2" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-4/5" />
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded w-full" />
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Explanation */}
            <div className="space-y-3">
              <Badge className={hasViewport ? "bg-emerald-500" : "bg-red-500"}>
                {hasViewport ? "With viewport meta" : "Without viewport meta"}
              </Badge>
              {hasViewport ? (
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>Viewport width = device width (e.g., 375px on iPhone)</p>
                  <p>Text is readable without zooming</p>
                  <p>Media queries trigger at correct breakpoints</p>
                  <p>Touch targets are appropriately sized</p>
                  <p className="text-emerald-500 font-semibold">Google considers this mobile-friendly</p>
                </div>
              ) : (
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>Browser uses ~980px virtual viewport</p>
                  <p>Page is shrunk to fit — everything is tiny</p>
                  <p>Users must pinch-to-zoom to read anything</p>
                  <p>Media queries think the screen is 980px wide</p>
                  <p className="text-red-400 font-semibold">Google marks this as NOT mobile-friendly</p>
                </div>
              )}

              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {hasViewport
                  ? `<meta name="viewport"\n      content="width=device-width,\n              initial-scale=1.0">`
                  : `<!-- No viewport meta tag -->\n<!-- Browser defaults to ~980px width -->`}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Viewport properties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Viewport Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { prop: "width=device-width", desc: "Match viewport to device screen width", status: "essential" },
              { prop: "initial-scale=1.0", desc: "Set initial zoom to 100%", status: "essential" },
              { prop: "minimum-scale", desc: "Minimum zoom level allowed", status: "optional" },
              { prop: "maximum-scale=1.0", desc: "Prevents zoom — accessibility issue!", status: "avoid" },
              { prop: "user-scalable=no", desc: "Disables pinch-to-zoom — WCAG violation!", status: "avoid" },
            ].map((item, i) => (
              <motion.div
                key={item.prop}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className={`text-[9px] shrink-0 ${
                  item.status === "essential" ? "bg-emerald-500" :
                  item.status === "optional" ? "bg-blue-500" : "bg-red-500"
                }`}>
                  {item.status === "essential" ? "Essential" : item.status === "optional" ? "Optional" : "Avoid"}
                </Badge>
                <div>
                  <code className="text-xs text-primary font-bold">{item.prop}</code>
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
