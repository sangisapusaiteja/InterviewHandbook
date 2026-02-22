"use client";

import { motion } from "framer-motion";
import { Lightbulb, BookOpen, Clock, HardDrive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DSATopic } from "@/types/dsa";

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
  topic: DSATopic;
}

export function ConceptSection({ topic }: ConceptSectionProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Explanation Card */}
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              What is {topic.title}?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {topic.concept.explanation}
            </p>
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

      {/* Complexity Info */}
      {(topic.concept.timeComplexity || topic.concept.spaceComplexity) && (
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Complexity</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 flex-wrap">
              {topic.concept.timeComplexity && (
                <div className="flex items-center gap-2 rounded-lg border p-3 flex-1 min-w-[200px]">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Time Complexity
                    </p>
                    <p className="font-mono font-semibold text-sm">
                      {topic.concept.timeComplexity}
                    </p>
                  </div>
                </div>
              )}
              {topic.concept.spaceComplexity && (
                <div className="flex items-center gap-2 rounded-lg border p-3 flex-1 min-w-[200px]">
                  <HardDrive className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Space Complexity
                    </p>
                    <p className="font-mono font-semibold text-sm">
                      {topic.concept.spaceComplexity}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

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
