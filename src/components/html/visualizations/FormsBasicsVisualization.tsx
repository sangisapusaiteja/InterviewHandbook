"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FormAttribute {
  name: string;
  description: string;
  example: string;
}

const formAttributes: FormAttribute[] = [
  { name: "action", description: "URL where form data is sent", example: 'action="/submit"' },
  { name: "method", description: "HTTP method — GET or POST", example: 'method="POST"' },
  { name: "enctype", description: "Encoding type (for file uploads)", example: 'enctype="multipart/form-data"' },
  { name: "novalidate", description: "Disables browser validation", example: "novalidate" },
  { name: "autocomplete", description: "Enables/disables autocomplete", example: 'autocomplete="off"' },
];

type MethodType = "GET" | "POST";

interface MethodInfo {
  method: MethodType;
  description: string;
  url: string;
  body: string;
  useCases: string[];
  pros: string[];
  cons: string[];
}

const methods: Record<MethodType, MethodInfo> = {
  GET: {
    method: "GET",
    description: "Appends data to the URL as query parameters",
    url: "/search?q=html&lang=en",
    body: "(empty — data is in the URL)",
    useCases: ["Search forms", "Filters", "Pagination"],
    pros: ["Bookmarkable", "Cacheable", "Browser history"],
    cons: ["Visible in URL", "~2KB limit", "Not for sensitive data"],
  },
  POST: {
    method: "POST",
    description: "Sends data in the HTTP request body",
    url: "/login",
    body: "username=john&password=secret",
    useCases: ["Login forms", "Registration", "File uploads"],
    pros: ["Private (not in URL)", "No size limit", "For sensitive data"],
    cons: ["Not bookmarkable", "Not cached", "Cannot use back button"],
  },
};

export function FormsBasicsVisualization() {
  const [activeMethod, setActiveMethod] = useState<MethodType>("GET");
  const info = methods[activeMethod];

  return (
    <div className="space-y-6">
      {/* GET vs POST */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">GET vs POST</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            {(["GET", "POST"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setActiveMethod(m)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeMethod === m
                    ? m === "GET"
                      ? "bg-blue-500 text-white"
                      : "bg-emerald-500 text-white"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMethod}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <p className="text-sm">{info.description}</p>

              {/* URL + Body preview */}
              <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-xs space-y-2">
                <div>
                  <span className="text-zinc-500">URL: </span>
                  <span className="text-blue-400">{info.url}</span>
                </div>
                <div>
                  <span className="text-zinc-500">Body: </span>
                  <span className="text-emerald-400">{info.body}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs font-semibold mb-1">Use Cases</p>
                  {info.useCases.map((uc) => (
                    <p key={uc} className="text-[10px] text-muted-foreground">• {uc}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1 text-emerald-500">Pros</p>
                  {info.pros.map((p) => (
                    <p key={p} className="text-[10px] text-muted-foreground">✓ {p}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold mb-1 text-red-400">Cons</p>
                  {info.cons.map((c) => (
                    <p key={c} className="text-[10px] text-muted-foreground">✗ {c}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Form attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {formAttributes.map((attr, i) => (
              <motion.div
                key={attr.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-start gap-3"
              >
                <code className="text-xs font-bold text-primary shrink-0 w-24">{attr.name}</code>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{attr.description}</p>
                  <code className="text-[10px] text-emerald-500 font-mono">{attr.example}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form flow diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Submission Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {["User fills inputs", "→", "Clicks submit", "→", "Browser validates", "→", "Sends HTTP request", "→", "Server processes"].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={step === "→" ? "text-muted-foreground text-lg shrink-0" : undefined}
              >
                {step === "→" ? (
                  <span>→</span>
                ) : (
                  <Badge variant="outline" className="text-[10px] whitespace-nowrap px-2 py-1">
                    {step}
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
