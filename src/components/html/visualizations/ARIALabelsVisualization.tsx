"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LabelType = "aria-label" | "aria-labelledby" | "aria-describedby";

const labelTypes: { id: LabelType; label: string }[] = [
  { id: "aria-label", label: "aria-label" },
  { id: "aria-labelledby", label: "aria-labelledby" },
  { id: "aria-describedby", label: "aria-describedby" },
];

const codeMap: Record<LabelType, string> = {
  "aria-label": `<!-- Icon button with no visible text -->\n<button aria-label="Close dialog">\n  <svg><!-- X icon --></svg>\n</button>\n<!-- Reader: "Close dialog, button" -->\n\n<!-- Distinguish multiple navs -->\n<nav aria-label="Main">...</nav>\n<nav aria-label="Footer">...</nav>\n\n<!-- Search input -->\n<input type="search"\n       aria-label="Search articles"\n       placeholder="Search...">`,
  "aria-labelledby": `<!-- Label from a heading -->\n<section aria-labelledby="pricing">\n  <h2 id="pricing">Pricing Plans</h2>\n  <p>Choose your plan.</p>\n</section>\n<!-- Reader: "Pricing Plans, region" -->\n\n<!-- Multiple IDs -->\n<span id="first">First</span>\n<span id="last">Name</span>\n<input aria-labelledby="first last">\n<!-- Reader: "First Name, edit text" -->\n\n<!-- Dialog title -->\n<div role="dialog"\n     aria-labelledby="dlg-title">\n  <h2 id="dlg-title">Confirm</h2>\n</div>`,
  "aria-describedby": `<!-- Form hint -->\n<label for="pw">Password:</label>\n<input type="password" id="pw"\n       aria-describedby="pw-hint">\n<p id="pw-hint">\n  Must be at least 8 characters.\n</p>\n<!-- Reader: "Password, edit text,\n   Must be at least 8 characters." -->\n\n<!-- Error message -->\n<input aria-describedby="err"\n       aria-invalid="true">\n<p id="err" role="alert">\n  Email is required.\n</p>`,
};

export function ARIALabelsVisualization() {
  const [activeType, setActiveType] = useState<LabelType>("aria-label");

  return (
    <div className="space-y-6">
      {/* Label type explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ARIA Labelling Attributes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Give elements accessible names and descriptions for screen readers.
          </p>

          <div className="flex flex-wrap gap-2">
            {labelTypes.map((lt) => (
              <button
                key={lt.id}
                onClick={() => setActiveType(lt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === lt.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {lt.label}
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
              {/* Explanation */}
              <div className="rounded-xl border p-4 space-y-3">
                {activeType === "aria-label" && (
                  <>
                    <Badge className="bg-blue-500 text-[10px]">Inline Name</Badge>
                    <p className="text-xs text-muted-foreground">
                      Provides a text string directly as the accessible name. Use when no visible text label exists.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                      <p><strong>When:</strong> Icon buttons, search inputs, distinguishing repeated elements</p>
                      <p><strong>Note:</strong> Overrides visible text for screen readers</p>
                      <p className="text-amber-500 italic">Prefer visible labels when possible — they help all users</p>
                    </div>
                  </>
                )}
                {activeType === "aria-labelledby" && (
                  <>
                    <Badge className="bg-emerald-500 text-[10px]">Reference Name</Badge>
                    <p className="text-xs text-muted-foreground">
                      Points to the ID of another element whose text becomes the accessible name. Highest priority in name calculation.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                      <p><strong>When:</strong> Visible label exists elsewhere (headings, other text)</p>
                      <p><strong>Feature:</strong> Can reference multiple IDs (space-separated)</p>
                      <p><strong>Priority:</strong> Wins over aria-label and native labels</p>
                    </div>
                  </>
                )}
                {activeType === "aria-describedby" && (
                  <>
                    <Badge className="bg-purple-500 text-[10px]">Supplementary Description</Badge>
                    <p className="text-xs text-muted-foreground">
                      Adds extra context announced AFTER the name and role. Doesn&apos;t replace the name.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-3 text-xs space-y-1">
                      <p><strong>When:</strong> Form hints, error messages, additional instructions</p>
                      <p><strong>Announced:</strong> After name + role (e.g., &quot;Password, edit, Must be 8+ chars&quot;)</p>
                      <p><strong>Feature:</strong> Can reference multiple IDs + hidden elements</p>
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

      {/* Priority order */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Accessible Name Priority</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { priority: 1, source: "aria-labelledby", desc: "Highest priority — references another element's text", color: "bg-red-500" },
              { priority: 2, source: "aria-label", desc: "Inline string — overrides visible text", color: "bg-amber-500" },
              { priority: 3, source: "<label> / alt / <legend>", desc: "Native HTML labelling mechanisms", color: "bg-blue-500" },
              { priority: 4, source: "title attribute", desc: "Shown as tooltip — weak accessible name", color: "bg-zinc-500" },
              { priority: 5, source: "placeholder", desc: "Last resort — disappears when typing", color: "bg-zinc-400" },
            ].map((item, i) => (
              <motion.div
                key={item.priority}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-center gap-3"
              >
                <div className={`w-6 h-6 rounded-full ${item.color} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                  {item.priority}
                </div>
                <div>
                  <code className="text-xs text-primary font-bold">{item.source}</code>
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
