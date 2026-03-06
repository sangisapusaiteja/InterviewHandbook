"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, i) => (
            <p key={`${line}-${i}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type FetchTab = "getRequest" | "postRequest" | "errorHandling" | "parallelRequests";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<FetchTab, GroupInfo> = {
  getRequest: {
    label: "GET Request",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The simplest fetch call retrieves data from a URL. Use .then() chaining or async/await syntax to handle the response and parse JSON.",
    codeSnippet: `// Using .then() chaining
fetch("https://api.example.com/users/1")
  .then(response => response.json())
  .then(data => console.log(data));

// Using async/await
async function getUser() {
  const response = await fetch("https://api.example.com/users/1");
  const data = await response.json();
  console.log(data.name);
  console.log(data.email);
}
getUser();`,
    codeOutput: [
      '{ id: 1, name: "Alice", email: "alice@example.com" }',
      "Alice",
      "alice@example.com",
    ],
  },
  postRequest: {
    label: "POST Request",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Send data to a server using POST. Specify the method, headers (Content-Type), and a JSON-stringified body.",
    codeSnippet: `const newUser = { name: "Bob", email: "bob@test.com" };

const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newUser),
});

const created = await response.json();
console.log("Status:", response.status);
console.log("Created:", created);`,
    codeOutput: [
      "Status: 201",
      'Created: { id: 42, name: "Bob", email: "bob@test.com" }',
    ],
  },
  errorHandling: {
    label: "Error Handling",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Fetch only rejects on network failures, not HTTP errors (404, 500). Always check response.ok to distinguish network errors from HTTP errors.",
    codeSnippet: `async function safeFetch(url) {
  try {
    const response = await fetch(url);

    // HTTP errors (404, 500) do NOT throw
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    const data = await response.json();
    console.log("Success:", data.title);
  } catch (error) {
    // Network errors (offline, DNS) DO throw
    console.log("Error caught:", error.message);
  }
}

safeFetch("https://api.example.com/missing");
safeFetch("https://offline.invalid");`,
    codeOutput: [
      "Error caught: HTTP 404: Not Found",
      "Error caught: Failed to fetch",
    ],
  },
  parallelRequests: {
    label: "Parallel Requests",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "Use Promise.all to fire multiple fetch requests simultaneously. All requests run in parallel and resolve together, saving time.",
    codeSnippet: `const urls = [
  "https://api.example.com/users/1",
  "https://api.example.com/users/2",
  "https://api.example.com/users/3",
];

const responses = await Promise.all(
  urls.map(url => fetch(url))
);

const users = await Promise.all(
  responses.map(res => res.json())
);

users.forEach(u => console.log(u.name));
console.log("All", users.length, "requests complete!");`,
    codeOutput: [
      "Alice",
      "Bob",
      "Charlie",
      "All 3 requests complete!",
    ],
  },
};

const order: FetchTab[] = ["getRequest", "postRequest", "errorHandling", "parallelRequests"];

// ─── request/response flow steps for GET Request visual ───────────────────────
const flowSteps = [
  { id: "client", label: "Client", description: "Browser / App", color: "bg-blue-500 text-white" },
  { id: "request", label: "GET /users/1", description: "HTTP Request", color: "bg-amber-500 text-white" },
  { id: "server", label: "Server", description: "Process request", color: "bg-emerald-500 text-white" },
  { id: "response", label: "200 OK", description: "HTTP Response", color: "bg-violet-500 text-white" },
  { id: "parse", label: ".json()", description: "Parse JSON", color: "bg-rose-500 text-white" },
];

// ─── comparison table data ───────────────────────────────────────────────────
const comparisonRows = [
  {
    method: "GET",
    purpose: "Retrieve data",
    hasBody: "No",
    idempotent: "Yes",
  },
  {
    method: "POST",
    purpose: "Create resource",
    hasBody: "Yes",
    idempotent: "No",
  },
  {
    method: "PUT",
    purpose: "Replace resource",
    hasBody: "Yes",
    idempotent: "Yes",
  },
  {
    method: "PATCH",
    purpose: "Partial update",
    hasBody: "Yes",
    idempotent: "No",
  },
  {
    method: "DELETE",
    purpose: "Remove resource",
    hasBody: "Optional",
    idempotent: "Yes",
  },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export function FetchAPIVisualization() {
  const [selected, setSelected] = useState<FetchTab>("getRequest");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const group = groups[selected];

  const handleSelect = (key: FetchTab) => {
    setSelected(key);
    setOutputLines(null);
    setActiveStep(null);
    setAnimating(false);
  };

  const runFlowAnimation = async () => {
    setAnimating(true);
    for (let i = 0; i < flowSteps.length; i++) {
      setActiveStep(i);
      await new Promise((r) => setTimeout(r, 800));
    }
    setActiveStep(null);
    setAnimating(false);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Fetch API</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Group selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const g = groups[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? g.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${group.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{group.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${group.badgeColor}`}>
                  fetch
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{group.description}</p>
            </div>

            {/* Code + Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {group.codeSnippet}
                  </pre>
                </div>
                <Button size="sm" onClick={() => setOutputLines(group.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
              </div>

              {/* Right: Output */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                <ConsoleOutput lines={outputLines} />
              </div>
            </div>

            {/* Interactive request/response visual for GET Request */}
            {selected === "getRequest" && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Request / Response Flow
                </p>
                <div className="rounded-xl border bg-muted/20 px-4 py-5">
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {flowSteps.map((step, idx) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <motion.div
                          animate={{
                            scale: activeStep === idx ? 1.15 : 1,
                            boxShadow:
                              activeStep === idx
                                ? "0 0 16px rgba(59,130,246,0.5)"
                                : "0 0 0px transparent",
                          }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-mono transition-all ${
                            activeStep === idx
                              ? step.color + " ring-2 ring-offset-2 ring-offset-background ring-blue-400"
                              : "bg-muted border border-border text-muted-foreground"
                          }`}
                        >
                          <span className="font-bold text-sm">{step.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              activeStep === idx ? "opacity-90" : "opacity-60"
                            }`}
                          >
                            {step.description}
                          </span>
                        </motion.div>
                        {idx < flowSteps.length - 1 && (
                          <motion.span
                            animate={{
                              color:
                                activeStep === idx
                                  ? "rgb(59,130,246)"
                                  : "rgb(161,161,170)",
                            }}
                            className="text-lg font-bold select-none"
                          >
                            →
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={animating}
                      onClick={runFlowAnimation}
                    >
                      <Play className="h-3.5 w-3.5 mr-1" />
                      {animating ? "Animating..." : "Animate"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison table */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            HTTP Methods
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Method</span>
              <span>Purpose</span>
              <span>Has Body</span>
              <span>Idempotent</span>
            </div>
            {comparisonRows.map((row) => (
              <div
                key={row.method}
                className="grid grid-cols-4 px-3 py-2 border-t items-center gap-1"
              >
                <code className="font-mono font-bold text-blue-700 dark:text-blue-300">
                  {row.method}
                </code>
                <span className="text-[11px] text-muted-foreground">{row.purpose}</span>
                <span className="text-[11px] text-muted-foreground">{row.hasBody}</span>
                <span className="text-[11px] text-muted-foreground">{row.idempotent}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
