"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FormatTag {
  id: string;
  tag: string;
  label: string;
  semantic: boolean;
  description: string;
  preview: React.ReactNode;
  alternative?: string;
}

const formatTags: FormatTag[] = [
  {
    id: "strong",
    tag: "<strong>",
    label: "Bold (semantic)",
    semantic: true,
    description: "Makes text bold with semantic importance — screen readers emphasise it.",
    preview: <span><strong>This text is important</strong> and this is normal.</span>,
    alternative: "<b>",
  },
  {
    id: "em",
    tag: "<em>",
    label: "Italic (semantic)",
    semantic: true,
    description: "Emphasises text with italics — conveys stress emphasis to screen readers.",
    preview: <span><em>This text is emphasised</em> and this is normal.</span>,
    alternative: "<i>",
  },
  {
    id: "mark",
    tag: "<mark>",
    label: "Highlight",
    semantic: true,
    description: "Highlights text with a yellow background — marks text of relevance.",
    preview: <span>Some text with <mark>highlighted words</mark> inside.</span>,
  },
  {
    id: "del",
    tag: "<del>",
    label: "Deleted",
    semantic: true,
    description: "Strikethrough text — indicates content that has been removed.",
    preview: <span>Price: <del>$50</del> $30</span>,
  },
  {
    id: "ins",
    tag: "<ins>",
    label: "Inserted",
    semantic: true,
    description: "Underlined text — indicates content that has been added.",
    preview: <span>Price: <del>$50</del> <ins>$30</ins></span>,
  },
  {
    id: "sub",
    tag: "<sub>",
    label: "Subscript",
    semantic: false,
    description: "Lowers text below the baseline — used in chemical formulas, footnotes.",
    preview: <span>H<sub>2</sub>O is the formula for water.</span>,
  },
  {
    id: "sup",
    tag: "<sup>",
    label: "Superscript",
    semantic: false,
    description: "Raises text above the baseline — used for exponents, ordinals.",
    preview: <span>E = mc<sup>2</sup> is Einstein&apos;s equation.</span>,
  },
  {
    id: "code",
    tag: "<code>",
    label: "Inline Code",
    semantic: true,
    description: "Displays text in monospace font — used for code snippets.",
    preview: <span>Use <code className="bg-muted px-1 rounded text-sm">console.log()</code> to debug.</span>,
  },
];

export function TextFormattingVisualization() {
  const [activeIds, setActiveIds] = useState<Set<string>>(new Set(["strong"]));

  const toggleTag = (id: string) => {
    setActiveIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Text Formatting Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Toggle formatting tags to explore how they work. Green tags are semantic
          (meaningful to screen readers), gray tags are presentational only.
        </p>

        {/* Tag toggle buttons */}
        <div className="flex flex-wrap gap-2">
          {formatTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleTag(tag.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all border ${
                activeIds.has(tag.id)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted hover:bg-muted/80 border-transparent"
              }`}
            >
              {tag.tag}
            </button>
          ))}
        </div>

        {/* Active tag details */}
        <div className="space-y-3">
          {formatTags
            .filter((t) => activeIds.has(t.id))
            .map((tag, i) => (
              <motion.div
                key={tag.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border p-3 space-y-2"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <code className="text-sm font-bold text-primary">{tag.tag}</code>
                  <Badge variant={tag.semantic ? "default" : "secondary"} className="text-[10px]">
                    {tag.semantic ? "Semantic" : "Presentational"}
                  </Badge>
                  {tag.alternative && (
                    <span className="text-[10px] text-muted-foreground">
                      Visual alternative: <code>{tag.alternative}</code>
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{tag.description}</p>
                <div className="rounded-lg bg-muted/50 p-2 text-sm">
                  {tag.preview}
                </div>
              </motion.div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
