"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LinkPart = "opening" | "href" | "target" | "content" | "closing";

interface LinkPartInfo {
  id: LinkPart;
  code: string;
  color: string;
  textColor: string;
  label: string;
  description: string;
}

const linkParts: LinkPartInfo[] = [
  {
    id: "opening",
    code: "<a",
    color: "bg-orange-500/20 border-orange-500/30",
    textColor: "text-orange-400",
    label: "Opening Tag",
    description: "The anchor element — creates a clickable hyperlink.",
  },
  {
    id: "href",
    code: 'href="https://example.com"',
    color: "bg-blue-500/20 border-blue-500/30",
    textColor: "text-blue-400",
    label: "href Attribute",
    description: "The destination URL. Can be absolute (https://...), relative (./page), or an anchor (#section).",
  },
  {
    id: "target",
    code: 'target="_blank"',
    color: "bg-purple-500/20 border-purple-500/30",
    textColor: "text-purple-400",
    label: "target Attribute",
    description: '_blank opens in new tab. _self (default) opens in same tab. _parent and _top are for frames.',
  },
  {
    id: "content",
    code: "Visit Example",
    color: "bg-emerald-500/20 border-emerald-500/30",
    textColor: "text-emerald-400",
    label: "Link Text",
    description: "The visible, clickable text. Should be descriptive for accessibility — avoid 'click here'.",
  },
  {
    id: "closing",
    code: "</a>",
    color: "bg-red-500/20 border-red-500/30",
    textColor: "text-red-400",
    label: "Closing Tag",
    description: "Closes the anchor element. Everything between <a> and </a> is clickable.",
  },
];

const linkTypes = [
  { label: "External Link", code: '<a href="https://google.com">Google</a>', description: "Links to another website" },
  { label: "Internal Link", code: '<a href="/about">About Us</a>', description: "Links to another page on the same site" },
  { label: "Anchor Link", code: '<a href="#contact">Contact Section</a>', description: "Scrolls to an element with id=\"contact\"" },
  { label: "Email Link", code: '<a href="mailto:hi@site.com">Email Us</a>', description: "Opens the default email client" },
  { label: "Phone Link", code: '<a href="tel:+1234567890">Call Us</a>', description: "Opens phone dialer on mobile" },
];

export function LinksVisualization() {
  const [activePart, setActivePart] = useState<LinkPart | null>(null);
  const activeInfo = linkParts.find((p) => p.id === activePart);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Anatomy of an Anchor Tag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Hover over each part of the link to learn what it does.
          </p>

          {/* Interactive code display */}
          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-sm">
            <div className="flex flex-wrap items-center gap-1">
              {linkParts.map((part) => (
                <motion.span
                  key={part.id}
                  onMouseEnter={() => setActivePart(part.id)}
                  onMouseLeave={() => setActivePart(null)}
                  whileHover={{ scale: 1.05 }}
                  className={`px-2 py-1 rounded border cursor-default transition-all ${
                    activePart === part.id
                      ? `${part.color} ${part.textColor} ring-1 ring-primary`
                      : `${part.color} ${part.textColor}`
                  }`}
                >
                  {part.code}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            {activeInfo ? (
              <motion.div
                key={activeInfo.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="rounded-xl border p-3 space-y-1"
              >
                <Badge>{activeInfo.label}</Badge>
                <p className="text-sm">{activeInfo.description}</p>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-muted-foreground italic text-center py-2"
              >
                Hover over a code segment above
              </motion.p>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Link types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Types of Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {linkTypes.map((lt, i) => (
              <motion.div
                key={lt.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 flex flex-col sm:flex-row sm:items-center gap-2"
              >
                <span className="text-xs font-semibold shrink-0 w-28">{lt.label}</span>
                <code className="text-xs font-mono text-primary bg-primary/5 px-2 py-1 rounded flex-1">
                  {lt.code}
                </code>
                <span className="text-xs text-muted-foreground">{lt.description}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
