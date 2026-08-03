"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AttributeExample {
  id: string;
  tag: string;
  attributes: { name: string; value: string; description: string }[];
  code: string;
}

const examples: AttributeExample[] = [
  {
    id: "anchor",
    tag: "<a>",
    attributes: [
      { name: "href", value: "https://example.com", description: "URL the link points to" },
      { name: "target", value: "_blank", description: "Opens link in a new tab" },
      { name: "title", value: "Visit Example", description: "Tooltip text on hover" },
    ],
    code: '<a href="https://example.com" target="_blank" title="Visit Example">Click me</a>',
  },
  {
    id: "img",
    tag: "<img>",
    attributes: [
      { name: "src", value: "photo.jpg", description: "Path to the image file" },
      { name: "alt", value: "A sunset", description: "Alternative text for accessibility" },
      { name: "width", value: "300", description: "Width of the image in pixels" },
    ],
    code: '<img src="photo.jpg" alt="A sunset" width="300">',
  },
  {
    id: "input",
    tag: "<input>",
    attributes: [
      { name: "type", value: "email", description: "Specifies the input type" },
      { name: "placeholder", value: "Enter email", description: "Hint text shown when empty" },
      { name: "required", value: "(boolean)", description: "Makes the field mandatory — no value needed" },
    ],
    code: '<input type="email" placeholder="Enter email" required>',
  },
];

export function AttributesVisualization() {
  const [activeId, setActiveId] = useState("anchor");
  const active = examples.find((e) => e.id === activeId)!;
  const [highlightedAttr, setHighlightedAttr] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">How Attributes Work</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Attributes provide extra information to HTML elements. Select a tag,
          then hover over attributes to learn what each one does.
        </p>

        {/* Tag selector */}
        <div className="flex gap-2">
          {examples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => { setActiveId(ex.id); setHighlightedAttr(null); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeId === ex.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {ex.tag}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Code display */}
            <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-sm overflow-x-auto">
              <code className="text-zinc-300 whitespace-pre">{active.code}</code>
            </div>

            {/* Attribute cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {active.attributes.map((attr, i) => (
                <motion.div
                  key={attr.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHighlightedAttr(attr.name)}
                  onMouseLeave={() => setHighlightedAttr(null)}
                  className={`rounded-lg border p-3 transition-all cursor-default ${
                    highlightedAttr === attr.name
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-baseline gap-1 mb-1">
                    <code className="text-xs font-bold text-primary">
                      {attr.name}
                    </code>
                    <span className="text-[10px] text-muted-foreground">=</span>
                    <code className="text-xs text-emerald-500">
                      &quot;{attr.value}&quot;
                    </code>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {attr.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Syntax breakdown */}
            <div className="rounded-xl bg-muted/50 p-3 text-xs space-y-1">
              <p className="font-semibold">Attribute syntax:</p>
              <code className="text-primary">
                attribute-name=&quot;value&quot;
              </code>
              <p className="text-muted-foreground">
                Boolean attributes (like <code>required</code>, <code>disabled</code>) don&apos;t need a value.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
