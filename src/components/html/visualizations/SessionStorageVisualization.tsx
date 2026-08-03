"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Scenario = "multiTab" | "formWizard" | "auth" | "scroll";

const scenarios: { id: Scenario; label: string }[] = [
  { id: "multiTab", label: "Multi-Tab Isolation" },
  { id: "formWizard", label: "Form Wizard" },
  { id: "auth", label: "Temporary Auth" },
  { id: "scroll", label: "Scroll Position" },
];

const scenarioDetails: Record<Scenario, { desc: string; code: string; why: string }> = {
  multiTab: {
    desc: "Each tab gets its own independent sessionStorage — data is NOT shared between tabs, even on the same domain.",
    why: "Perfect for multi-tab apps where each tab should have independent state.",
    code: `// Tab 1
sessionStorage.setItem("tab", "Tab 1");
sessionStorage.getItem("tab"); // → "Tab 1"

// Tab 2 (opened separately)
sessionStorage.getItem("tab"); // → null
sessionStorage.setItem("tab", "Tab 2");

// Each tab has its own sessionStorage!
// Closing a tab destroys its sessionStorage.`,
  },
  formWizard: {
    desc: "Store form progress across multiple pages within a single session. Data clears when the tab closes.",
    why: "User can navigate between form steps without losing input, but data doesn't linger after they leave.",
    code: `// Step 1: Save personal info
sessionStorage.setItem("step1", JSON.stringify({
  name: "Alice",
  email: "alice@example.com"
}));

// Step 2: Retrieve step 1 data
const step1 = JSON.parse(
  sessionStorage.getItem("step1")
);

// Step 3: Submit all data, then clean up
sessionStorage.removeItem("step1");
sessionStorage.removeItem("step2");`,
  },
  auth: {
    desc: "Store temporary authentication tokens that should expire when the user closes the tab.",
    why: "More secure than localStorage for sensitive sessions — auto-clears on tab close.",
    code: `// After login
sessionStorage.setItem("token",
  "eyJhbGciOiJIUzI1NiIs...");

// On API requests
const token = sessionStorage.getItem("token");
fetch("/api/data", {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});

// Token gone when tab closes — no cleanup needed`,
  },
  scroll: {
    desc: "Remember scroll position when navigating away and back within the same session.",
    why: "Enhances UX for long-scrolling pages — user returns to where they left off.",
    code: `// Save scroll position before leaving
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollY",
    window.scrollY.toString());
});

// Restore on page load
window.addEventListener("load", () => {
  const saved = sessionStorage.getItem("scrollY");
  if (saved) {
    window.scrollTo(0, parseInt(saved));
  }
});`,
  },
};

export function SessionStorageVisualization() {
  const [activeScenario, setActiveScenario] = useState<Scenario>("multiTab");
  const active = scenarioDetails[activeScenario];

  return (
    <div className="space-y-6">
      {/* Use case explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">sessionStorage Use Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            sessionStorage is identical to localStorage in API but scoped to a single browser tab and cleared when the tab closes.
          </p>

          <div className="flex flex-wrap gap-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeScenario === s.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs text-muted-foreground">{active.desc}</p>
              <div className="bg-muted/50 rounded-lg p-3 text-xs">
                <strong>Why sessionStorage?</strong> {active.why}
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* localStorage vs sessionStorage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">localStorage vs sessionStorage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-blue-500 text-[10px]">localStorage</Badge>
              <div className="space-y-1.5 text-xs">
                {[
                  "Persists forever (until cleared)",
                  "Shared across all tabs on same origin",
                  "Survives browser restart",
                  "Use for: theme, preferences, cart",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 shrink-0 mt-0.5">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-purple-500 text-[10px]">sessionStorage</Badge>
              <div className="space-y-1.5 text-xs">
                {[
                  "Cleared when tab closes",
                  "Isolated per tab (not shared)",
                  "Lost on browser restart",
                  "Use for: temp auth, form wizards, scroll pos",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-purple-500 shrink-0 mt-0.5">●</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API cheat sheet */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Method</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-left p-2">Returns</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { method: "setItem(key, val)", desc: "Store a value", returns: "undefined" },
                  { method: "getItem(key)", desc: "Retrieve a value", returns: "string | null" },
                  { method: "removeItem(key)", desc: "Delete a single item", returns: "undefined" },
                  { method: "clear()", desc: "Delete all items", returns: "undefined" },
                  { method: "key(index)", desc: "Get key name at index", returns: "string | null" },
                  { method: "length", desc: "Number of stored items", returns: "number" },
                ].map((row) => (
                  <tr key={row.method} className="border-b last:border-0">
                    <td className="p-2">
                      <code className="text-primary font-bold text-[10px]">{row.method}</code>
                    </td>
                    <td className="p-2">{row.desc}</td>
                    <td className="p-2 text-muted-foreground font-mono">{row.returns}</td>
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
