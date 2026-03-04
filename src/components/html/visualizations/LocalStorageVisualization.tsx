"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type APIMethod = "setItem" | "getItem" | "removeItem" | "clear" | "key";

const methods: { id: APIMethod; label: string }[] = [
  { id: "setItem", label: "setItem()" },
  { id: "getItem", label: "getItem()" },
  { id: "removeItem", label: "removeItem()" },
  { id: "clear", label: "clear()" },
  { id: "key", label: "key()" },
];

const methodDetails: Record<APIMethod, { syntax: string; desc: string; code: string }> = {
  setItem: {
    syntax: "localStorage.setItem(key, value)",
    desc: "Stores a key-value pair. Value must be a string — use JSON.stringify() for objects.",
    code: `// Store a string
localStorage.setItem("username", "Alice");

// Store an object (must stringify)
const user = { name: "Alice", age: 30 };
localStorage.setItem("user", JSON.stringify(user));

// Store an array
const tags = ["html", "css", "js"];
localStorage.setItem("tags", JSON.stringify(tags));`,
  },
  getItem: {
    syntax: "localStorage.getItem(key)",
    desc: "Retrieves the value for a key. Returns null if the key doesn't exist.",
    code: `// Get a string
const name = localStorage.getItem("username");
// → "Alice"

// Get and parse an object
const raw = localStorage.getItem("user");
const user = raw ? JSON.parse(raw) : null;
// → { name: "Alice", age: 30 }

// Check if key exists
if (localStorage.getItem("token") === null) {
  console.log("Not logged in");
}`,
  },
  removeItem: {
    syntax: "localStorage.removeItem(key)",
    desc: "Removes a single key-value pair. No error if the key doesn't exist.",
    code: `// Remove a specific item
localStorage.removeItem("username");

// Verify it's gone
localStorage.getItem("username"); // → null

// Safe to call on non-existent keys
localStorage.removeItem("nonExistentKey");
// No error thrown`,
  },
  clear: {
    syntax: "localStorage.clear()",
    desc: "Removes ALL key-value pairs from localStorage for this origin. Use with caution!",
    code: `// Remove everything
localStorage.clear();

// localStorage.length is now 0
console.log(localStorage.length); // → 0

// ⚠️ This clears ALL data for this domain
// including data set by other parts of your app`,
  },
  key: {
    syntax: "localStorage.key(index)",
    desc: "Returns the key name at the given index. Useful for iterating over all stored items.",
    code: `// Get key at index 0
const firstKey = localStorage.key(0);

// Loop through all items
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const val = localStorage.getItem(key);
  console.log(key, "→", val);
}`,
  },
};

export function LocalStorageVisualization() {
  const [activeMethod, setActiveMethod] = useState<APIMethod>("setItem");
  const active = methodDetails[activeMethod];

  return (
    <div className="space-y-6">
      {/* API Explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">localStorage API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            localStorage stores key-value string pairs with no expiration — data persists even after the browser closes.
          </p>

          <div className="flex flex-wrap gap-2">
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMethod(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMethod === m.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeMethod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <code className="text-xs text-primary font-bold block">{active.syntax}</code>
              <p className="text-xs text-muted-foreground">{active.desc}</p>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* localStorage vs sessionStorage vs Cookies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Storage Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">localStorage</th>
                  <th className="text-left p-2">sessionStorage</th>
                  <th className="text-left p-2">Cookies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Capacity", local: "~5–10 MB", session: "~5 MB", cookie: "~4 KB" },
                  { feature: "Expires", local: "Never (manual)", session: "Tab close", cookie: "Set by server/JS" },
                  { feature: "Sent to server", local: "No", session: "No", cookie: "Every HTTP request" },
                  { feature: "Scope", local: "Origin-wide", session: "Per tab", cookie: "Origin + path" },
                  { feature: "API", local: "Simple JS", session: "Simple JS", cookie: "document.cookie (ugly)" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2">{row.local}</td>
                    <td className="p-2">{row.session}</td>
                    <td className="p-2 text-muted-foreground">{row.cookie}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Common use cases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Common Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { use: "Theme preference", detail: "Store dark/light mode choice across sessions", icon: "🎨" },
              { use: "Form drafts", detail: "Auto-save form data so users don't lose input", icon: "📝" },
              { use: "Auth tokens", detail: "Store JWT tokens (consider security implications)", icon: "🔑" },
              { use: "Shopping cart", detail: "Persist cart items when user leaves and returns", icon: "🛒" },
              { use: "User settings", detail: "Language, font size, notification preferences", icon: "⚙️" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <div>
                  <p className="text-xs font-bold">{item.use}</p>
                  <p className="text-[10px] text-muted-foreground">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gotchas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Important Gotchas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { issue: "Strings only", detail: "All values are stored as strings — always JSON.stringify objects and JSON.parse when reading" },
              { issue: "Synchronous API", detail: "Blocks the main thread — avoid storing large amounts of data; use IndexedDB for big datasets" },
              { issue: "Same-origin only", detail: "Data is scoped to protocol + domain + port — not shared across subdomains by default" },
              { issue: "No expiration", detail: "Data persists forever unless explicitly removed — implement your own TTL if needed" },
              { issue: "Security", detail: "Accessible to any JS on the page — never store sensitive data (passwords, PII) without encryption" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg border p-2.5 space-y-1"
              >
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-[8px] shrink-0">Warning</Badge>
                  <span className="text-xs font-bold">{item.issue}</span>
                </div>
                <p className="text-[10px] text-muted-foreground ml-[60px]">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
