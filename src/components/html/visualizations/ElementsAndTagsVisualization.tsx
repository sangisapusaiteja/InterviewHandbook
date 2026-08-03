"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TagType = "paired" | "self-closing" | "void";

interface TagExample {
  id: string;
  label: string;
  type: TagType;
  opening: string;
  content?: string;
  closing?: string;
  description: string;
  rendered: string;
}

const tagExamples: TagExample[] = [
  {
    id: "p",
    label: "<p>",
    type: "paired",
    opening: "<p>",
    content: "Hello World",
    closing: "</p>",
    description: "A paired tag — has an opening tag, content, and a closing tag.",
    rendered: "Hello World",
  },
  {
    id: "h1",
    label: "<h1>",
    type: "paired",
    opening: "<h1>",
    content: "My Title",
    closing: "</h1>",
    description: "Another paired tag — the heading element wraps text content.",
    rendered: "My Title",
  },
  {
    id: "strong",
    label: "<strong>",
    type: "paired",
    opening: "<strong>",
    content: "Bold text",
    closing: "</strong>",
    description: "A paired inline tag — makes text bold with semantic importance.",
    rendered: "Bold text",
  },
  {
    id: "br",
    label: "<br>",
    type: "void",
    opening: "<br>",
    description: "A void element — has no content and no closing tag. Creates a line break.",
    rendered: "↵",
  },
  {
    id: "img",
    label: "<img>",
    type: "void",
    opening: '<img src="photo.jpg" alt="A photo">',
    description: "A void element — self-contained with attributes, no closing tag needed.",
    rendered: "[image]",
  },
  {
    id: "input",
    label: "<input>",
    type: "self-closing",
    opening: '<input type="text" />',
    description: "Can be written as self-closing with />. Also a void element.",
    rendered: "[input field]",
  },
];

const typeColors: Record<TagType, string> = {
  paired: "bg-emerald-500",
  "self-closing": "bg-amber-500",
  void: "bg-blue-500",
};

const typeLabels: Record<TagType, string> = {
  paired: "Paired Tag",
  "self-closing": "Self-Closing",
  void: "Void Element",
};

export function ElementsAndTagsVisualization() {
  const [activeId, setActiveId] = useState("p");
  const active = tagExamples.find((t) => t.id === activeId)!;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Anatomy of HTML Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select a tag to see how it is structured.
        </p>

        {/* Tag selector */}
        <div className="flex flex-wrap gap-2">
          {tagExamples.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setActiveId(tag.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeId === tag.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Badge className={typeColors[active.type]}>
                {typeLabels[active.type]}
              </Badge>
            </div>

            {/* Tag anatomy */}
            <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-sm">
              <div className="flex flex-wrap items-center gap-1">
                {/* Opening tag */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-2 py-1 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30"
                >
                  {active.opening}
                </motion.span>

                {/* Content (if paired) */}
                {active.content && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  >
                    {active.content}
                  </motion.span>
                )}

                {/* Closing tag (if paired) */}
                {active.closing && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/30"
                  >
                    {active.closing}
                  </motion.span>
                )}
              </div>

              {/* Labels */}
              <div className="flex flex-wrap items-center gap-1 mt-2 text-[10px]">
                <span className="text-orange-400">↑ Opening Tag</span>
                {active.content && (
                  <span className="text-emerald-400 ml-2">↑ Content</span>
                )}
                {active.closing && (
                  <span className="text-red-400 ml-2">↑ Closing Tag</span>
                )}
              </div>
            </div>

            <p className="text-sm">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
