"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function KeyboardNavigationVisualization() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const items = ["Home", "About", "Products", "Contact", "Subscribe"];

  return (
    <div className="space-y-6">
      {/* Interactive focus demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tab Focus Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Click the buttons below to simulate Tab key focus moving through interactive elements. In a real page, press Tab to navigate.
          </p>

          <div className="flex gap-1">
            <button
              onClick={() => setFocusedIndex(Math.max(0, focusedIndex - 1))}
              className="px-3 py-1 rounded-lg text-xs bg-muted hover:bg-muted/80 font-semibold"
            >
              ← Shift+Tab
            </button>
            <button
              onClick={() => setFocusedIndex(Math.min(items.length - 1, focusedIndex + 1))}
              className="px-3 py-1 rounded-lg text-xs bg-muted hover:bg-muted/80 font-semibold"
            >
              Tab →
            </button>
          </div>

          <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900 space-y-3">
            {/* Skip link */}
            <div className={`text-xs px-3 py-1.5 rounded border transition-all ${
              focusedIndex === -1 ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950" : "opacity-40"
            }`}>
              Skip to main content
            </div>

            {/* Nav items */}
            <nav className="flex flex-wrap gap-2">
              {items.map((item, i) => (
                <motion.div
                  key={item}
                  animate={{
                    scale: focusedIndex === i ? 1.05 : 1,
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    focusedIndex === i
                      ? "ring-2 ring-blue-500 ring-offset-2 bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {item}
                  {focusedIndex === i && (
                    <span className="ml-1 text-[9px] opacity-70">← focus</span>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="rounded-lg bg-muted/50 p-2 text-[10px] text-muted-foreground">
              <strong>Focus order:</strong> {items.map((item, i) => (
                <span key={item} className={focusedIndex === i ? "text-primary font-bold" : ""}>
                  {item}{i < items.length - 1 ? " → " : ""}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key bindings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Essential Keyboard Shortcuts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Key</th>
                  <th className="text-left p-2">Action</th>
                  <th className="text-left p-2">Elements</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "Tab", action: "Move focus to next interactive element", elements: "All focusable" },
                  { key: "Shift + Tab", action: "Move focus to previous element", elements: "All focusable" },
                  { key: "Enter", action: "Activate link or button", elements: "<a>, <button>" },
                  { key: "Space", action: "Activate button, toggle checkbox", elements: "<button>, <input>" },
                  { key: "Escape", action: "Close modal, menu, or popup", elements: "Dialogs, menus" },
                  { key: "Arrow keys", action: "Navigate within widget", elements: "Tabs, menus, radios" },
                ].map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="p-2">
                      <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono font-bold">{row.key}</kbd>
                    </td>
                    <td className="p-2">{row.action}</td>
                    <td className="p-2 text-muted-foreground">{row.elements}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* tabindex reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">tabindex Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              {
                value: 'tabindex="0"',
                effect: "Adds element to natural tab order (DOM position)",
                use: "Custom widgets that need keyboard access",
                status: "use",
              },
              {
                value: 'tabindex="-1"',
                effect: "Focusable via JS only — NOT reachable by Tab",
                use: "Modal containers, programmatic focus targets",
                status: "use",
              },
              {
                value: 'tabindex="1+" (positive)',
                effect: "Focused BEFORE tabindex=0 — breaks natural order",
                use: "NEVER use — creates confusing, unmaintainable tab order",
                status: "avoid",
              },
            ].map((item, i) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <code className="text-xs text-primary font-bold">{item.value}</code>
                  <Badge className={`text-[8px] ${item.status === "use" ? "bg-emerald-500" : "bg-red-500"}`}>
                    {item.status === "use" ? "Use" : "Avoid"}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{item.effect}</p>
                <p className="text-[10px]"><strong>When:</strong> {item.use}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Focus indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Focus Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Never Do This</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-red-400 whitespace-pre">
                {`/* WCAG 2.4.7 violation! */\n*:focus {\n  outline: none;\n}`}
              </div>
              <p className="text-[10px] text-red-400">Keyboard users can&apos;t see where they are</p>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Do This Instead</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {`/* Custom visible focus */\n:focus-visible {\n  outline: 3px solid #3b82f6;\n  outline-offset: 2px;\n}`}
              </div>
              <p className="text-[10px] text-emerald-500">Shows only for keyboard, not mouse clicks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
