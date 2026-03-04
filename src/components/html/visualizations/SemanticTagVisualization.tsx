"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BenefitItem {
  category: "Accessibility" | "SEO" | "Code Quality";
  benefit: string;
}

interface SemanticTagVisualizationProps {
  tag: string;
  ariaRole: string;
  description: string;
  benefits: BenefitItem[];
  screenReaderAnnouncement: string;
  codeExample: { semantic: string; nonSemantic: string };
  canHaveMultiple: boolean;
  allowedParents?: string;
  keyRule?: string;
}

const categoryIcons = {
  Accessibility: "♿",
  SEO: "🔍",
  "Code Quality": "📖",
};

const categoryColors = {
  Accessibility: "bg-blue-500",
  SEO: "bg-emerald-500",
  "Code Quality": "bg-purple-500",
};

export function SemanticTagVisualization({
  tag,
  ariaRole,
  description,
  benefits,
  screenReaderAnnouncement,
  codeExample,
  canHaveMultiple,
  allowedParents,
  keyRule,
}: SemanticTagVisualizationProps) {
  return (
    <div className="space-y-6">
      {/* Tag overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <code className="text-primary">{tag}</code>
            <Badge variant="outline" className="text-[10px]">role=&quot;{ariaRole}&quot;</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 space-y-1">
              <p className="text-xs font-semibold">Multiple allowed?</p>
              <p className="text-xs text-muted-foreground">
                {canHaveMultiple
                  ? "Yes — one per page + one per article/section"
                  : "No — only one visible instance per page"}
              </p>
            </div>
            {allowedParents && (
              <div className="rounded-lg border p-3 space-y-1">
                <p className="text-xs font-semibold">Placement</p>
                <p className="text-xs text-muted-foreground">{allowedParents}</p>
              </div>
            )}
          </div>

          {keyRule && (
            <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                <strong>Key rule:</strong> {keyRule}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Why Use {tag}?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 flex items-start gap-2.5"
              >
                <Badge className={`${categoryColors[b.category]} text-[9px] shrink-0`}>
                  {categoryIcons[b.category]} {b.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{b.benefit}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Screen reader demo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Screen Reader Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-lg border p-3 space-y-2">
              <Badge variant="destructive" className="text-[9px]">Without {tag}</Badge>
              <div className="bg-muted/50 rounded-lg p-2 text-xs font-mono">
                <p className="text-zinc-500">&quot;group&quot;</p>
                <p className="text-red-400 text-[10px] mt-1">No context — user has no idea what this section is.</p>
              </div>
            </div>
            <div className="rounded-lg border p-3 space-y-2">
              <Badge className="bg-emerald-500 text-[9px]">With {tag}</Badge>
              <div className="bg-muted/50 rounded-lg p-2 text-xs font-mono">
                <p className="text-emerald-500">&quot;{screenReaderAnnouncement}&quot;</p>
                <p className="text-emerald-400 text-[10px] mt-1">User can navigate here instantly.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Semantic vs Non-Semantic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Badge variant="destructive" className="text-[9px]">Non-Semantic</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-zinc-500 whitespace-pre overflow-x-auto">
                {codeExample.nonSemantic}
              </div>
            </div>
            <div className="space-y-1.5">
              <Badge className="bg-emerald-500 text-[9px]">Semantic</Badge>
              <div className="rounded-lg bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
                {codeExample.semantic}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
