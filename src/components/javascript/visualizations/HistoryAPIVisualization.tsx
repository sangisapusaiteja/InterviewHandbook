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
type HistoryTab = "pushState" | "replaceState" | "navigation" | "spaRouter";

interface GroupInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const groups: Record<HistoryTab, GroupInfo> = {
  pushState: {
    label: "pushState",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "history.pushState() adds a new entry to the browser&apos;s session history stack without triggering a page reload. It accepts a state object, a title (usually ignored), and a URL.",
    codeSnippet: `// Push a new history entry
history.pushState(
  { page: "about" },   // state object
  "",                   // title (unused)
  "/about"              // new URL
);

console.log("Current URL:", location.pathname);
console.log("History length:", history.length);

// Push another entry
history.pushState({ page: "contact" }, "", "/contact");
console.log("Current URL:", location.pathname);
console.log("History length:", history.length);`,
    codeOutput: [
      "Current URL: /about",
      "History length: 2",
      "Current URL: /contact",
      "History length: 3",
    ],
  },
  replaceState: {
    label: "replaceState",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "history.replaceState() modifies the current history entry instead of creating a new one. Useful for updating URL or state without growing the history stack.",
    codeSnippet: `// Start at /dashboard
console.log("Before:", location.pathname);
console.log("History length:", history.length);

// Replace current entry (no new entry created)
history.replaceState(
  { page: "settings" },
  "",
  "/settings"
);

console.log("After:", location.pathname);
console.log("History length:", history.length);
// Length stays the same — entry was replaced, not added`,
    codeOutput: [
      "Before: /dashboard",
      "History length: 1",
      "After: /settings",
      "History length: 1",
    ],
  },
  navigation: {
    label: "Navigation",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "history.back(), history.forward(), and history.go(n) let you navigate programmatically through the session history, just like clicking the browser&apos;s back/forward buttons.",
    codeSnippet: `// Navigate backward (same as browser back button)
history.back();

// Navigate forward (same as browser forward button)
history.forward();

// Go back 2 entries
history.go(-2);

// Go forward 1 entry
history.go(1);

// Reload current page
history.go(0);

// Listen for navigation events
window.addEventListener("popstate", (event) => {
  console.log("Navigated to:", location.pathname);
  console.log("State:", JSON.stringify(event.state));
});`,
    codeOutput: [
      "Navigated to: /about",
      'State: { "page": "about" }',
      "Navigated to: /home",
      'State: { "page": "home" }',
    ],
  },
  spaRouter: {
    label: "SPA Router",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The History API is the foundation of client-side routing in Single Page Applications. Combine pushState with a popstate listener to build a simple router.",
    codeSnippet: `// Simple SPA Router
const routes = {
  "/":        () => "Welcome to Home",
  "/about":   () => "About Us page",
  "/contact": () => "Contact Us page",
};

function navigate(path) {
  history.pushState({ path }, "", path);
  render(path);
}

function render(path) {
  const handler = routes[path] || (() => "404 Not Found");
  console.log("Rendering:", handler());
}

// Handle browser back/forward
window.addEventListener("popstate", (e) => {
  render(e.state?.path || "/");
});

navigate("/");
navigate("/about");
navigate("/contact");`,
    codeOutput: [
      "Rendering: Welcome to Home",
      "Rendering: About Us page",
      "Rendering: Contact Us page",
    ],
  },
};

const tabOrder: HistoryTab[] = ["pushState", "replaceState", "navigation", "spaRouter"];

// ─── Interactive History Stack ────────────────────────────────────────────────
interface HistoryEntry {
  url: string;
  id: number;
}

function HistoryStackVisual() {
  const [stack, setStack] = useState<HistoryEntry[]>([{ url: "/home", id: 0 }]);
  const [pointer, setPointer] = useState(0);
  const [nextId, setNextId] = useState(1);

  const currentUrl = stack[pointer]?.url ?? "/home";

  const handlePushState = () => {
    const paths = ["/about", "/contact", "/blog", "/settings", "/profile", "/help"];
    const newPath = paths[nextId % paths.length];
    // Remove forward entries (like real browser behavior)
    const newStack = [...stack.slice(0, pointer + 1), { url: newPath, id: nextId }];
    setStack(newStack);
    setPointer(newStack.length - 1);
    setNextId(nextId + 1);
  };

  const handleReplaceState = () => {
    const paths = ["/dashboard", "/home", "/docs", "/faq"];
    const newPath = paths[nextId % paths.length];
    const newStack = [...stack];
    newStack[pointer] = { url: newPath, id: nextId };
    setStack(newStack);
    setNextId(nextId + 1);
  };

  const handleBack = () => {
    if (pointer > 0) setPointer(pointer - 1);
  };

  const handleForward = () => {
    if (pointer < stack.length - 1) setPointer(pointer + 1);
  };

  return (
    <Card className="border-2 border-dashed border-muted-foreground/25">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Interactive History Stack</CardTitle>
        <p className="text-xs text-muted-foreground">
          Simulate pushState, replaceState, and back/forward navigation
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Simulated URL bar */}
        <div className="rounded-lg border bg-zinc-100 dark:bg-zinc-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 rounded-md bg-white dark:bg-zinc-900 px-3 py-1 font-mono text-sm border">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentUrl}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="text-blue-600 dark:text-blue-400"
              >
                https://example.com{currentUrl}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handlePushState}
            className="bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 hover:bg-blue-500/25">
            pushState
          </Button>
          <Button size="sm" variant="outline" onClick={handleReplaceState}
            className="bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25">
            replaceState
          </Button>
          <Button size="sm" variant="outline" onClick={handleBack} disabled={pointer === 0}
            className="bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 hover:bg-violet-500/25">
            Back
          </Button>
          <Button size="sm" variant="outline" onClick={handleForward} disabled={pointer === stack.length - 1}
            className="bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300 hover:bg-violet-500/25">
            Forward
          </Button>
        </div>

        {/* History Stack */}
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            History Stack ({stack.length} {stack.length === 1 ? "entry" : "entries"})
          </p>
          <div className="space-y-1 max-h-[220px] overflow-y-auto">
            <AnimatePresence>
              {stack.map((entry, i) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -12, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 12, height: 0 }}
                  className={`flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-xs transition-colors ${
                    i === pointer
                      ? "bg-blue-500/15 border-blue-500/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/30"
                      : i > pointer
                        ? "bg-muted/30 border-muted text-muted-foreground/50"
                        : "bg-muted/10 border-muted text-muted-foreground"
                  }`}
                >
                  <span className="text-[10px] font-bold w-4 text-center">
                    {i === pointer ? "\u25B6" : i}
                  </span>
                  <span className="flex-1">{entry.url}</span>
                  {i === pointer && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40">
                      current
                    </Badge>
                  )}
                  {i > pointer && (
                    <span className="text-[10px] text-muted-foreground/40 italic">forward</span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function HistoryAPIVisualization() {
  const [activeTab, setActiveTab] = useState<HistoryTab>("pushState");
  const [output, setOutput] = useState<string[] | null>(null);

  const active = groups[activeTab];

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">History API</CardTitle>
        <p className="text-sm text-muted-foreground">
          Navigate and manipulate the browser&apos;s session history without full page reloads
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ── Tab Chips ── */}
        <div className="flex flex-wrap gap-2">
          {tabOrder.map((tab) => {
            const g = groups[tab];
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOutput(null);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? `${g.color} ring-2 ring-offset-1 ring-current`
                    : "border-muted text-muted-foreground hover:bg-muted/40"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        {/* ── Description Banner ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-4 ${active.color}`}
          >
            <div className="flex items-start gap-2">
              <Badge variant="outline" className={active.badgeColor}>
                {active.label}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed">{active.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* ── Code Snippet ── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">Code Example</p>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-xs"
              onClick={() => setOutput(active.codeOutput)}
            >
              <Play className="h-3 w-3" /> Run
            </Button>
          </div>
          <pre className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 overflow-x-auto">
            <code className="text-xs text-zinc-100 whitespace-pre">{active.codeSnippet}</code>
          </pre>
        </div>

        {/* ── Console Output ── */}
        <ConsoleOutput lines={output} />

        {/* ── Interactive Visual ── */}
        <HistoryStackVisual />

        {/* ── Reference Table ── */}
        <Card className="border-2 border-dashed border-muted-foreground/25">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">History API Methods Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2 pr-4 font-semibold">Method</th>
                    <th className="pb-2 pr-4 font-semibold">Description</th>
                    <th className="pb-2 font-semibold">Creates New Entry?</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">pushState(state, title, url)</td>
                    <td className="py-2 pr-4">Adds a new entry to the session history stack</td>
                    <td className="py-2">
                      <Badge variant="outline" className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40">Yes</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">replaceState(state, title, url)</td>
                    <td className="py-2 pr-4">Modifies the current history entry</td>
                    <td className="py-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40">No</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">back()</td>
                    <td className="py-2 pr-4">Goes back one entry (same as browser back button)</td>
                    <td className="py-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40">No</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">forward()</td>
                    <td className="py-2 pr-4">Goes forward one entry (same as browser forward button)</td>
                    <td className="py-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40">No</Badge>
                    </td>
                  </tr>
                  <tr className="border-b border-muted/50">
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">go(n)</td>
                    <td className="py-2 pr-4">Moves n entries (negative = back, positive = forward, 0 = reload)</td>
                    <td className="py-2">
                      <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/40">No</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-mono text-blue-600 dark:text-blue-400">popstate event</td>
                    <td className="py-2 pr-4">Fires when the active history entry changes via back/forward/go</td>
                    <td className="py-2">
                      <Badge variant="outline" className="bg-zinc-500/20 text-zinc-700 dark:text-zinc-300 border-zinc-500/40">N/A (event)</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
