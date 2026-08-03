"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BoxModelVisualization() {
  const [boxSizing, setBoxSizing] = useState<"content-box" | "border-box">("border-box");

  return (
    <div className="space-y-6">
      {/* Interactive box model */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The CSS Box Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Every element is a box with four layers: margin, border, padding, and content.
          </p>

          {/* Visual box model diagram */}
          <div className="flex justify-center">
            <div className="text-center">
              {/* Margin layer */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-orange-100 dark:bg-orange-950/50 border-2 border-dashed border-orange-300 dark:border-orange-800 p-5 rounded-lg"
              >
                <span className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold block mb-2">Margin</span>
                {/* Border layer */}
                <div className="bg-yellow-100 dark:bg-yellow-950/50 border-4 border-yellow-500 p-4 rounded-lg">
                  <span className="text-[10px] text-yellow-700 dark:text-yellow-400 font-semibold block mb-2">Border</span>
                  {/* Padding layer */}
                  <div className="bg-green-100 dark:bg-green-950/50 border-2 border-dashed border-green-400 p-4 rounded-md">
                    <span className="text-[10px] text-green-700 dark:text-green-400 font-semibold block mb-2">Padding</span>
                    {/* Content */}
                    <div className="bg-blue-100 dark:bg-blue-950/50 border-2 border-blue-400 p-4 rounded text-center">
                      <span className="text-xs text-blue-700 dark:text-blue-400 font-bold">Content</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* content-box vs border-box */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">content-box vs border-box</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["content-box", "border-box"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setBoxSizing(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  boxSizing === mode
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <motion.div
            key={boxSizing}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              {boxSizing === "content-box" ? (
                <>
                  <Badge className="bg-red-500 text-[10px]">Default (Avoid)</Badge>
                  <p className="text-xs text-muted-foreground">
                    Width sets the content area only. Padding and border are added on top, making the total element larger than the specified width.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono space-y-1">
                    <p>width: 200px</p>
                    <p>+ padding: 20px × 2 = 40px</p>
                    <p>+ border: 2px × 2 = 4px</p>
                    <p className="font-bold text-primary border-t pt-1">Total: 244px</p>
                  </div>
                </>
              ) : (
                <>
                  <Badge className="bg-emerald-500 text-[10px]">Recommended</Badge>
                  <p className="text-xs text-muted-foreground">
                    Width includes content + padding + border. The element is exactly the size you specify. Content area shrinks to fit.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-3 text-xs font-mono space-y-1">
                    <p>width: 200px (total)</p>
                    <p>- padding: 20px × 2 = 40px</p>
                    <p>- border: 2px × 2 = 4px</p>
                    <p className="font-bold text-primary border-t pt-1">Content: 156px</p>
                  </div>
                </>
              )}
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {boxSizing === "content-box"
                ? `/* content-box (default) */\n.box {\n  box-sizing: content-box;\n  width: 200px;\n  padding: 20px;\n  border: 2px solid #333;\n}\n/* Rendered width = 244px!\n   200 + 40 + 4 = 244 */`
                : `/* border-box (recommended) */\n* {\n  box-sizing: border-box;\n}\n\n.box {\n  width: 200px;\n  padding: 20px;\n  border: 2px solid #333;\n}\n/* Rendered width = 200px exactly!\n   Content shrinks to 156px */`}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
