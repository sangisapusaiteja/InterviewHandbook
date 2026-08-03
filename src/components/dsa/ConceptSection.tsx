"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  BookOpen,
  Code,
  Table,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Topic } from "@/types/topic";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface ConceptSectionProps {
  topic: Topic;
}

function parseSections(text: string) {
  const sections: { title: string; content: string; type: "section" | "code" | "table" }[] = [];
  const lines = text.split("\n");
  let currentTitle = "";
  let currentContent: string[] = [];
  let inCode = false;
  let codeContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith("```")) {
      if (inCode) {
        sections.push({ title: "", content: codeContent.join("\n"), type: "code" });
        codeContent = [];
        inCode = false;
      } else {
        if (currentContent.length > 0) {
          sections.push({ title: currentTitle, content: currentContent.join("\n"), type: "section" });
          currentContent = [];
        }
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      codeContent.push(line);
      continue;
    }
    if (line.startsWith("About ") || line.startsWith("Quick table") || line.startsWith("Important") || line.startsWith("Compare")) {
      if (currentContent.length > 0) {
        sections.push({ title: currentTitle, content: currentContent.join("\n"), type: "section" });
        currentContent = [];
      }
      currentTitle = line;
      continue;
    }
    if (line.startsWith("Variable |")) {
      if (currentContent.length > 0) {
        sections.push({ title: currentTitle, content: currentContent.join("\n"), type: "section" });
        currentContent = [];
      }
      currentContent.push(line);
      continue;
    }
    if (currentTitle || line.trim()) {
      currentContent.push(line);
    }
  }
  if (currentContent.length > 0) {
    sections.push({ title: currentTitle, content: currentContent.join("\n"), type: "section" });
  }
  return sections;
}

function renderTable(text: string) {
  const rows = text.split("\n").filter((l) => l.trim());
  const headers = rows[0]?.split("|").map((h) => h.trim()).filter(Boolean) ?? [];
  const dataRows = rows.slice(2).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left font-semibold text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, i) => (
            <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-muted-foreground">
                  {cell === "Yes" || cell === "Allowed" ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {cell}
                    </span>
                  ) : cell === "Error (TDZ)" ? (
                    <span className="inline-flex items-center gap-1.5 text-red-500">
                      <XCircle className="h-3.5 w-3.5" /> {cell}
                    </span>
                  ) : cell === "Uninitialized" ? (
                    <span className="inline-flex items-center gap-1.5 text-amber-500">
                      <AlertTriangle className="h-3.5 w-3.5" /> {cell}
                    </span>
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderCodeBlock(code: string) {
  return (
    <div className="relative rounded-xl bg-muted/80 border overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2 border-b bg-muted/50">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 text-[11px] font-medium text-muted-foreground">JavaScript</span>
      </div>
      <pre className="p-4 text-sm leading-relaxed overflow-x-auto"><code>{code}</code></pre>
    </div>
  );
}

function renderSectionContent(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("Variable |")) {
    return renderTable(trimmed);
  }

  const parts = trimmed.split(/(?=Output:|Why\?|Note:|Interview Answer|Follow-up)/);
  return (
    <div className="space-y-3">
      {parts.map((part, i) => {
        const p = part.trim();
        if (!p) return null;

        if (p.startsWith("Output:")) {
          const val = p.replace("Output:", "").trim();
          const isError = val.toLowerCase().includes("referenceerror") || val.toLowerCase().includes("error");
          return (
            <div key={i} className={`rounded-lg border px-4 py-3 ${isError ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30" : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30"}`}>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Output</span>
              <pre className="mt-1 text-sm font-mono">{val}</pre>
            </div>
          );
        }

        if (p.startsWith("Why?")) {
          return (
            <div key={i} className="rounded-lg border border-blue-200 bg-blue-50/50 px-4 py-3 dark:border-blue-900/50 dark:bg-blue-950/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Why?</span>
              <p className="mt-1 text-sm text-muted-foreground">{p.replace(/^Why\?\s*/i, "")}</p>
            </div>
          );
        }

        if (p.startsWith("Note:") || p.startsWith("Interview Answer") || p.startsWith("Important")) {
          return (
            <div key={i} className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/20">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
                <p className="text-sm text-muted-foreground">{p.replace(/^(Note:|Interview Answer|Important)\s*/i, "")}</p>
              </div>
            </div>
          );
        }

        if (p.startsWith("Follow-up")) {
          return (
            <div key={i} className="rounded-lg border border-purple-200 bg-purple-50/50 px-4 py-3 dark:border-purple-900/50 dark:bg-purple-950/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Follow-up</span>
              <p className="mt-1 text-sm text-muted-foreground">{p.replace(/^Follow-up[^:]*:\s*/i, "")}</p>
            </div>
          );
        }

        return <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>;
      })}
    </div>
  );
}

export function ConceptSection({ topic }: ConceptSectionProps) {
  const sections = parseSections(topic.concept.explanation);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Explanation */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              What is {topic.title}?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sections.map((section, i) => {
              if (section.type === "code") {
                return <div key={i}>{renderCodeBlock(section.content)}</div>;
              }
              if (section.type === "table") {
                return <div key={i}>{renderTable(section.content)}</div>;
              }
              return (
                <div key={i}>
                  {section.title && (
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      {section.title.startsWith("About") && <Code className="h-4 w-4 text-primary" />}
                      {section.title.startsWith("Quick table") && <Table className="h-4 w-4 text-primary" />}
                      {section.title.startsWith("Important") && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      {section.title}
                    </h4>
                  )}
                  {renderSectionContent(section.content)}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* Real Life Analogy */}
      <motion.div variants={item}>
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              Real Life Analogy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed italic">
              &ldquo;{topic.concept.realLifeAnalogy}&rdquo;
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Points */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Key Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {topic.concept.keyPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed pt-0.5">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      <Separator />

      {/* Interview Questions */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              Common Interview Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {topic.interviewQuestions.map((q, index) => (
                <AccordionItem key={index} value={`q-${index}`}>
                  <AccordionTrigger className="text-sm text-left">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          q.difficulty === "Easy"
                            ? "success"
                            : q.difficulty === "Medium"
                            ? "warning"
                            : "destructive"
                        }
                        className="text-[10px] shrink-0"
                      >
                        {q.difficulty}
                      </Badge>
                      <span>{q.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        Hint:
                      </p>
                      <p className="text-sm">{q.hint}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
