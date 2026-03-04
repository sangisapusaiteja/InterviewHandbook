"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type RoleCategory = "landmark" | "widget" | "live";

const categories: { id: RoleCategory; label: string }[] = [
  { id: "landmark", label: "Landmark Roles" },
  { id: "widget", label: "Widget Roles" },
  { id: "live", label: "Live Region Roles" },
];

const roleData: Record<RoleCategory, { role: string; html: string; desc: string; use: string }[]> = {
  landmark: [
    { role: "banner", html: "<header>", desc: "Site-wide header", use: "Main site header with logo and nav" },
    { role: "navigation", html: "<nav>", desc: "Navigation links", use: "Primary, secondary, or footer navigation" },
    { role: "main", html: "<main>", desc: "Main content", use: "Primary page content (one per page)" },
    { role: "complementary", html: "<aside>", desc: "Supporting content", use: "Sidebars, related links, ads" },
    { role: "contentinfo", html: "<footer>", desc: "Site-wide footer", use: "Copyright, legal links, contact info" },
    { role: "search", html: "<search>", desc: "Search functionality", use: "Search form/widget area" },
  ],
  widget: [
    { role: "button", html: "<button>", desc: "Clickable action trigger", use: "Always prefer native <button>" },
    { role: "tab", html: "—", desc: "Tab in a tablist", use: "Custom tab interfaces with aria-selected" },
    { role: "tabpanel", html: "—", desc: "Content panel for a tab", use: "Paired with tab via aria-controls" },
    { role: "dialog", html: "<dialog>", desc: "Modal or non-modal dialog", use: "Confirmation prompts, forms, alerts" },
    { role: "alert", html: "—", desc: "Important live message", use: "Error messages, success notifications" },
    { role: "switch", html: "—", desc: "On/off toggle", use: "Settings toggles (aria-checked)" },
  ],
  live: [
    { role: "alert", html: "—", desc: "Assertive announcement", use: "Errors, urgent messages (interrupts reader)" },
    { role: "status", html: "—", desc: "Polite status update", use: "Search results count, save confirmation" },
    { role: "log", html: "—", desc: "Appended messages", use: "Chat logs, activity feeds" },
    { role: "timer", html: "—", desc: "Countdown/timer", use: "Session timeout, auction timer" },
  ],
};

export function ARIARolesVisualization() {
  const [activeCategory, setActiveCategory] = useState<RoleCategory>("landmark");

  return (
    <div className="space-y-6">
      {/* Role explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ARIA Role Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Role</th>
                      <th className="text-left p-2">HTML Equiv.</th>
                      <th className="text-left p-2">Purpose</th>
                      <th className="text-left p-2">Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleData[activeCategory].map((r) => (
                      <tr key={r.role} className="border-b last:border-0">
                        <td className="p-2">
                          <code className="text-primary font-bold">role=&quot;{r.role}&quot;</code>
                        </td>
                        <td className="p-2">
                          <code className={r.html === "—" ? "text-muted-foreground" : "text-emerald-500"}>
                            {r.html}
                          </code>
                        </td>
                        <td className="p-2">{r.desc}</td>
                        <td className="p-2 text-muted-foreground">{r.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* First rule of ARIA */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">The Rules of ARIA</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { rule: "#1: Don't use ARIA if native HTML works", detail: "<button> is always better than <div role='button'>. Native elements include keyboard support, focus, and semantics for free." },
            { rule: "#2: Don't change native semantics", detail: "Don't do <button role='heading'>. If you need a heading that looks like a button, use <h2> with button-like CSS." },
            { rule: "#3: All ARIA widgets must be keyboard operable", detail: "If you add role='button', you MUST also handle Enter and Space keys. ARIA adds semantics only, not behaviour." },
            { rule: "#4: Don't use role='presentation' on focusable elements", detail: "Removing semantics from an interactive element makes it invisible to screen readers but still focusable — confusing." },
            { rule: "#5: All interactive elements must have accessible names", detail: "Every button, link, and input needs a label — via visible text, aria-label, or aria-labelledby." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-lg border p-3 space-y-1"
            >
              <p className="text-xs font-bold text-primary">{item.rule}</p>
              <p className="text-[10px] text-muted-foreground">{item.detail}</p>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Semantic vs ARIA comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Native HTML vs ARIA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-emerald-500 text-[10px]">Prefer This</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre">
                {`<button>Save</button>\n\n<nav>\n  <a href="/">Home</a>\n</nav>\n\n<main>\n  <h1>Title</h1>\n</main>`}
              </div>
              <p className="text-[10px] text-emerald-500">Keyboard, focus, and semantics built-in</p>
            </div>
            <div className="rounded-xl border p-4 space-y-2">
              <Badge className="bg-red-500 text-[10px]">Avoid This</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-red-400 whitespace-pre">
                {`<div role="button" tabindex="0"\n     onkeydown="...">\n  Save\n</div>\n\n<div role="navigation">\n  <div role="link">Home</div>\n</div>`}
              </div>
              <p className="text-[10px] text-red-400">More code, more bugs, worse a11y</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
