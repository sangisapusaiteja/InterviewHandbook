"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SandboxPermission {
  value: string;
  description: string;
  risk: "low" | "medium" | "high";
}

const sandboxPermissions: SandboxPermission[] = [
  { value: "allow-scripts", description: "Permit JavaScript execution", risk: "medium" },
  { value: "allow-same-origin", description: "Access origin cookies/storage", risk: "high" },
  { value: "allow-forms", description: "Allow form submission", risk: "low" },
  { value: "allow-popups", description: "Allow window.open()", risk: "medium" },
  { value: "allow-top-navigation", description: "Allow redirecting parent page", risk: "high" },
  { value: "allow-modals", description: "Allow alert(), confirm()", risk: "low" },
];

const riskColors = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

interface IframeAttribute {
  name: string;
  description: string;
  example: string;
  required: boolean;
}

const iframeAttributes: IframeAttribute[] = [
  { name: "src", description: "URL of the page to embed", example: 'src="https://example.com"', required: true },
  { name: "title", description: "Accessible name for screen readers", example: 'title="Map widget"', required: true },
  { name: "width", description: "Width of the iframe", example: 'width="600"', required: false },
  { name: "height", description: "Height of the iframe", example: 'height="400"', required: false },
  { name: "sandbox", description: "Security restrictions", example: 'sandbox="allow-scripts"', required: false },
  { name: "allow", description: "Feature permissions", example: 'allow="fullscreen"', required: false },
  { name: "loading", description: "Lazy loading for performance", example: 'loading="lazy"', required: false },
  { name: "srcdoc", description: "Inline HTML content (no HTTP request)", example: 'srcdoc="<p>Hello</p>"', required: false },
];

export function IframeVisualization() {
  const [enabledPermissions, setEnabledPermissions] = useState<Set<string>>(new Set());

  const togglePermission = (value: string) => {
    setEnabledPermissions((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const sandboxValue = enabledPermissions.size === 0
    ? "sandbox (all blocked)"
    : `sandbox="${Array.from(enabledPermissions).join(" ")}"`;

  return (
    <div className="space-y-6">
      {/* Iframe attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Iframe Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {iframeAttributes.map((attr, i) => (
              <motion.div
                key={attr.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <div className="flex items-center gap-1.5 shrink-0 w-20">
                  <code className="text-xs font-bold text-primary">{attr.name}</code>
                  {attr.required && (
                    <Badge variant="destructive" className="text-[8px] h-3.5 px-1">req</Badge>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{attr.description}</p>
                  <code className="text-[10px] text-emerald-500 font-mono">{attr.example}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sandbox builder */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sandbox Permission Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Toggle permissions to see how sandbox restricts iframe capabilities.
            Empty sandbox = everything blocked.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sandboxPermissions.map((perm) => (
              <button
                key={perm.value}
                onClick={() => togglePermission(perm.value)}
                className={`rounded-lg border p-2.5 text-left transition-all ${
                  enabledPermissions.has(perm.value)
                    ? "ring-2 ring-primary bg-primary/5"
                    : "hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-2 h-2 rounded-full ${riskColors[perm.risk]}`} />
                  <code className="text-xs font-bold">{perm.value}</code>
                  <Badge variant="outline" className="text-[8px] ml-auto">{perm.risk} risk</Badge>
                </div>
                <p className="text-[10px] text-muted-foreground">{perm.description}</p>
              </button>
            ))}
          </div>

          {/* Generated sandbox attribute */}
          <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-xs">
            <span className="text-zinc-500">&lt;iframe </span>
            <span className="text-blue-400">{sandboxValue}</span>
            <span className="text-zinc-500">&gt;&lt;/iframe&gt;</span>
          </div>

          <AnimatePresence>
            {enabledPermissions.has("allow-scripts") && enabledPermissions.has("allow-same-origin") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="rounded-lg border border-red-500/50 bg-red-500/10 p-3"
              >
                <p className="text-xs text-red-500 font-semibold">
                  Warning: allow-scripts + allow-same-origin together reduces sandbox
                  protection significantly. The iframe can access its origin&apos;s cookies and
                  storage with full script access.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Communication diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cross-Origin Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <div className="rounded-xl border p-3 text-center min-w-[120px]">
              <p className="text-xs font-semibold">Parent Page</p>
              <code className="text-[9px] text-primary block mt-1">iframe.contentWindow.postMessage()</code>
            </div>
            <div className="flex flex-col items-center gap-0.5 text-muted-foreground">
              <span className="text-xs">→ data →</span>
              <span className="text-xs">← data ←</span>
            </div>
            <div className="rounded-xl border p-3 text-center min-w-[120px]">
              <p className="text-xs font-semibold">Iframe</p>
              <code className="text-[9px] text-primary block mt-1">window.addEventListener(&apos;message&apos;)</code>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-3">
            postMessage() is the only safe way to communicate across origins.
            Always validate event.origin on the receiving end.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
