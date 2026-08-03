"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SystemDesignTopic } from "@/types/system-design";

interface SystemDesignChecklistSectionProps {
  readonly topic: SystemDesignTopic;
}

function buildChecklist(topic: SystemDesignTopic) {
  const baseChecklist = [
    "Clarify the exact product goal before choosing components.",
    "State the main scale assumptions: users, traffic, data size, and growth.",
    "Call out the first bottleneck you expect under real load.",
    "Explain one tradeoff you are intentionally accepting.",
  ];

  const keywordChecklist = topic.concept.keyPoints.map((point) => point.replace(/^[A-Z]+\s*=\s*/i, ""));

  return [...baseChecklist, ...keywordChecklist].slice(0, 7);
}

function buildQuestions(topic: SystemDesignTopic) {
  return topic.interviewQuestions.map((item) => ({
    question: item.question,
    hint: item.hint,
    difficulty: item.difficulty,
  }));
}

export function SystemDesignChecklistSection({
  topic,
}: Readonly<SystemDesignChecklistSectionProps>) {
  const checklist = buildChecklist(topic);
  const questions = buildQuestions(topic);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Design Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.map((item, index) => (
            <div
              key={`${topic.slug}-checklist-${index + 1}`}
              className="flex items-start gap-3 rounded-lg border bg-muted/20 px-3 py-3"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {index + 1}
              </div>
              <p className="text-sm text-foreground">{item}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interview Angles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {questions.map((item, index) => (
            <div
              key={`${topic.slug}-question-${index + 1}`}
              className="rounded-lg border bg-background px-4 py-3"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-foreground">
                  {item.question}
                </p>
                <Badge variant="outline" className="shrink-0 text-[10px]">
                  {item.difficulty}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.hint}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
