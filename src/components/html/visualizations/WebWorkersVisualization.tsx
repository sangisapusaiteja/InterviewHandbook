"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type WorkerType = "dedicated" | "shared" | "service";

const workerTypes: { id: WorkerType; label: string }[] = [
  { id: "dedicated", label: "Dedicated Worker" },
  { id: "shared", label: "Shared Worker" },
  { id: "service", label: "Service Worker" },
];

const workerDetails: Record<WorkerType, { desc: string; use: string; code: string }> = {
  dedicated: {
    desc: "A background thread owned by a single script. Most common type — used for offloading heavy computation.",
    use: "Image processing, data parsing, complex calculations, sorting large arrays",
    code: `// main.js — Create the worker
const worker = new Worker("worker.js");

// Send data to worker
worker.postMessage({ numbers: [5, 3, 8, 1, 9] });

// Receive result from worker
worker.onmessage = (e) => {
  console.log("Sorted:", e.data);
  // → [1, 3, 5, 8, 9]
};

worker.onerror = (e) => {
  console.error("Worker error:", e.message);
};

// Terminate when done
worker.terminate();

// ----- worker.js -----
self.onmessage = (e) => {
  const sorted = e.data.numbers.sort((a, b) => a - b);
  self.postMessage(sorted);
};`,
  },
  shared: {
    desc: "A single worker shared across multiple tabs/windows of the same origin. Uses MessagePort for communication.",
    use: "Shared WebSocket connections, cross-tab state sync, shared caches",
    code: `// main.js — Connect to shared worker
const worker = new SharedWorker("shared.js");

// Communication happens via port
worker.port.start();
worker.port.postMessage("Hello from Tab 1");

worker.port.onmessage = (e) => {
  console.log("Reply:", e.data);
};

// ----- shared.js -----
const connections = [];

self.onconnect = (e) => {
  const port = e.ports[0];
  connections.push(port);

  port.onmessage = (e) => {
    // Broadcast to all connected tabs
    connections.forEach((p) => {
      p.postMessage(\`Broadcast: \${e.data}\`);
    });
  };

  port.start();
};`,
  },
  service: {
    desc: "A proxy between the browser and network. Enables offline support, push notifications, and background sync.",
    use: "PWAs, offline-first apps, caching strategies, push notifications",
    code: `// main.js — Register service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then((reg) => {
      console.log("SW registered:", reg.scope);
    });
}

// ----- sw.js -----
// Cache assets on install
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/styles.css",
        "/app.js",
      ]);
    })
  );
});

// Serve from cache, fallback to network
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((cached) => cached || fetch(e.request))
  );
});`,
  },
};

export function WebWorkersVisualization() {
  const [activeType, setActiveType] = useState<WorkerType>("dedicated");
  const active = workerDetails[activeType];

  return (
    <div className="space-y-6">
      {/* Worker type explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Web Worker Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Web Workers run JavaScript in background threads — keeping the main thread responsive for UI interactions.
          </p>

          <div className="flex flex-wrap gap-2">
            {workerTypes.map((wt) => (
              <button
                key={wt.id}
                onClick={() => setActiveType(wt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeType === wt.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {wt.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs text-muted-foreground">{active.desc}</p>
              <div className="bg-muted/50 rounded-lg p-3 text-xs">
                <strong>Use cases:</strong> {active.use}
              </div>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Worker comparison table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Worker Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Feature</th>
                  <th className="text-left p-2">Dedicated</th>
                  <th className="text-left p-2">Shared</th>
                  <th className="text-left p-2">Service</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Owner", dedicated: "Single script", shared: "Multiple tabs", service: "Origin-wide" },
                  { feature: "Lifecycle", dedicated: "Lives with page", shared: "Lives with any tab", service: "Independent" },
                  { feature: "DOM access", dedicated: "No", shared: "No", service: "No" },
                  { feature: "Network intercept", dedicated: "No", shared: "No", service: "Yes (fetch)" },
                  { feature: "Offline support", dedicated: "No", shared: "No", service: "Yes" },
                  { feature: "Communication", dedicated: "postMessage", shared: "MessagePort", service: "postMessage + events" },
                ].map((row) => (
                  <tr key={row.feature} className="border-b last:border-0">
                    <td className="p-2 font-semibold">{row.feature}</td>
                    <td className="p-2">{row.dedicated}</td>
                    <td className="p-2">{row.shared}</td>
                    <td className="p-2">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* What workers CAN'T do */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Worker Limitations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">No Access To</Badge>
              <div className="space-y-1.5 text-xs">
                {[
                  "DOM (document, window)",
                  "document.querySelector(), getElementById()",
                  "alert(), confirm(), prompt()",
                  "localStorage, sessionStorage",
                  "Parent scope variables",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-red-500 shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Can Use</Badge>
              <div className="space-y-1.5 text-xs">
                {[
                  "fetch() and XMLHttpRequest",
                  "setTimeout(), setInterval()",
                  "IndexedDB",
                  "WebSockets",
                  "importScripts() for loading libraries",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Communication pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Communication Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { step: "1", action: "Main thread creates worker", code: "new Worker('worker.js')" },
              { step: "2", action: "Main sends message to worker", code: "worker.postMessage(data)" },
              { step: "3", action: "Worker receives message", code: "self.onmessage = (e) => { ... }" },
              { step: "4", action: "Worker sends result back", code: "self.postMessage(result)" },
              { step: "5", action: "Main receives result", code: "worker.onmessage = (e) => { ... }" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">{item.action}</p>
                  <code className="text-[10px] text-muted-foreground">{item.code}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
