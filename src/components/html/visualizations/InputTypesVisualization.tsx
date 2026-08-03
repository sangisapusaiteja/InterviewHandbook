"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InputTypeInfo {
  type: string;
  description: string;
  mobileKeyboard: string;
  validation: string;
  example: string;
}

const inputTypes: InputTypeInfo[] = [
  { type: "text", description: "Any text input", mobileKeyboard: "Standard", validation: "None", example: "Names, titles" },
  { type: "password", description: "Masked characters", mobileKeyboard: "Standard", validation: "None (hides input)", example: "Passwords, PINs" },
  { type: "email", description: "Email address", mobileKeyboard: "@ keyboard", validation: "Checks for @ and domain", example: "user@example.com" },
  { type: "number", description: "Numeric only", mobileKeyboard: "Number pad", validation: "min/max/step", example: "Age, quantity" },
  { type: "tel", description: "Phone number", mobileKeyboard: "Phone pad", validation: "None (use pattern)", example: "+1-234-567-8900" },
  { type: "url", description: "Web address", mobileKeyboard: "URL keyboard", validation: "Checks for protocol", example: "https://example.com" },
  { type: "date", description: "Date picker", mobileKeyboard: "Date picker", validation: "Valid date", example: "2024-01-15" },
  { type: "color", description: "Color picker", mobileKeyboard: "Color picker", validation: "Hex color", example: "#ff5500" },
  { type: "range", description: "Slider control", mobileKeyboard: "N/A", validation: "min/max/step", example: "Volume, brightness" },
  { type: "file", description: "File browser", mobileKeyboard: "File picker", validation: "accept filter", example: "Images, documents" },
  { type: "checkbox", description: "Boolean toggle", mobileKeyboard: "N/A", validation: "required", example: "Agree to terms" },
  { type: "radio", description: "Single choice", mobileKeyboard: "N/A", validation: "required", example: "Size: S/M/L" },
  { type: "hidden", description: "Invisible data", mobileKeyboard: "N/A", validation: "None", example: "CSRF tokens, IDs" },
  { type: "search", description: "Search field", mobileKeyboard: "Search keyboard", validation: "None", example: "Site search" },
];

export function InputTypesVisualization() {
  const [activeType, setActiveType] = useState<string>("text");
  const active = inputTypes.find((t) => t.type === activeType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">HTML Input Types Explorer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Click an input type to see its details and a live preview.
        </p>

        {/* Type grid */}
        <div className="flex flex-wrap gap-1.5">
          {inputTypes.map((it) => (
            <button
              key={it.type}
              onClick={() => setActiveType(it.type)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold transition-all ${
                activeType === it.type
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {it.type}
            </button>
          ))}
        </div>

        {/* Detail + preview */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={activeType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Info */}
              <div className="rounded-xl border p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-bold text-primary">type=&quot;{active.type}&quot;</code>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-24 shrink-0">Description:</span>
                    <span>{active.description}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-24 shrink-0">Mobile KB:</span>
                    <Badge variant="secondary" className="text-[10px]">{active.mobileKeyboard}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-24 shrink-0">Validation:</span>
                    <span>{active.validation}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-24 shrink-0">Use case:</span>
                    <span className="text-muted-foreground">{active.example}</span>
                  </div>
                </div>
              </div>

              {/* Live preview */}
              <div className="rounded-xl border p-4 bg-white dark:bg-zinc-900">
                <p className="text-xs font-semibold mb-3">Live Preview:</p>
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground block">
                    Sample {active.type} input:
                  </label>
                  {active.type === "hidden" ? (
                    <p className="text-xs text-muted-foreground italic">
                      Hidden inputs are invisible — no visual output.
                      <br />
                      <code className="text-primary">&lt;input type=&quot;hidden&quot; name=&quot;token&quot; value=&quot;abc123&quot;&gt;</code>
                    </p>
                  ) : active.type === "checkbox" ? (
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked /> Option A
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" /> Option B
                      </label>
                    </div>
                  ) : active.type === "radio" ? (
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="demo-radio" defaultChecked /> Option A
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="demo-radio" /> Option B
                      </label>
                    </div>
                  ) : (
                    <input
                      type={active.type}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder={active.example}
                      defaultValue={active.type === "color" ? "#3b82f6" : active.type === "range" ? "50" : undefined}
                      min={active.type === "number" || active.type === "range" ? "0" : undefined}
                      max={active.type === "number" || active.type === "range" ? "100" : undefined}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
