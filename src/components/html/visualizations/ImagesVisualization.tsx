"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ImgAttribute {
  name: string;
  value: string;
  description: string;
  required: boolean;
}

const imgAttributes: ImgAttribute[] = [
  { name: "src", value: "photo.jpg", description: "Source path or URL of the image. Required — without it, nothing displays.", required: true },
  { name: "alt", value: "A beautiful sunset", description: "Alternative text — shown if image fails to load, read by screen readers. Required for accessibility.", required: true },
  { name: "width", value: "400", description: "Width in pixels. Helps the browser allocate space before loading.", required: false },
  { name: "height", value: "300", description: "Height in pixels. Prevents layout shift as images load.", required: false },
  { name: "loading", value: "lazy", description: "\"lazy\" defers loading until the image is near the viewport. Improves performance.", required: false },
];

const imageFormats = [
  { format: "JPEG / JPG", best: "Photos, complex images", pros: "Small file size", cons: "Lossy compression" },
  { format: "PNG", best: "Icons, logos, transparency", pros: "Lossless, supports transparency", cons: "Larger file size" },
  { format: "WebP", best: "Modern web (photos + graphics)", pros: "Best compression, supports transparency", cons: "Older browser support" },
  { format: "SVG", best: "Icons, logos, illustrations", pros: "Scalable, tiny file size", cons: "Not for photos" },
  { format: "GIF", best: "Simple animations", pros: "Supports animation", cons: "Limited to 256 colors" },
];

export function ImagesVisualization() {
  const [highlightedAttr, setHighlightedAttr] = useState<string | null>(null);

  const getHighlightClass = (attrName: string) => {
    if (highlightedAttr === attrName) return "ring-2 ring-primary bg-primary/10";
    return "";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Anatomy of the &lt;img&gt; Tag</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The &lt;img&gt; tag is a void element — no closing tag needed.
            Hover over attributes to learn about each one.
          </p>

          {/* Code display */}
          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-sm overflow-x-auto">
            <span className="text-orange-400">&lt;img</span>
            {imgAttributes.map((attr) => (
              <span key={attr.name}>
                {" "}
                <motion.span
                  onMouseEnter={() => setHighlightedAttr(attr.name)}
                  onMouseLeave={() => setHighlightedAttr(null)}
                  className={`inline-block px-1 rounded cursor-default transition-all ${
                    highlightedAttr === attr.name ? "bg-primary/20 ring-1 ring-primary" : ""
                  }`}
                >
                  <span className="text-blue-400">{attr.name}</span>
                  <span className="text-zinc-500">=</span>
                  <span className="text-emerald-400">&quot;{attr.value}&quot;</span>
                </motion.span>
              </span>
            ))}
            <span className="text-orange-400">&gt;</span>
          </div>

          {/* Attribute cards */}
          <div className="space-y-2">
            {imgAttributes.map((attr, i) => (
              <motion.div
                key={attr.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHighlightedAttr(attr.name)}
                onMouseLeave={() => setHighlightedAttr(null)}
                className={`rounded-lg border p-3 transition-all ${getHighlightClass(attr.name)}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs font-bold text-primary">{attr.name}</code>
                  {attr.required && (
                    <Badge variant="destructive" className="text-[9px] h-4">Required</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{attr.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Image formats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Image Formats Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-semibold">Format</th>
                  <th className="text-left p-2 font-semibold">Best For</th>
                  <th className="text-left p-2 font-semibold">Pros</th>
                  <th className="text-left p-2 font-semibold">Cons</th>
                </tr>
              </thead>
              <tbody>
                {imageFormats.map((fmt) => (
                  <tr key={fmt.format} className="border-b last:border-0">
                    <td className="p-2 font-mono font-semibold">{fmt.format}</td>
                    <td className="p-2 text-muted-foreground">{fmt.best}</td>
                    <td className="p-2 text-emerald-500">{fmt.pros}</td>
                    <td className="p-2 text-red-400">{fmt.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
