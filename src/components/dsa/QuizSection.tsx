"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Topic } from "@/types/topic";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

function generateQuestions(topic: Topic): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  for (const iq of topic.interviewQuestions) {
    const correctAnswer = iq.hint;
    const distractors = topic.concept.keyPoints
      .filter((kp) => kp !== correctAnswer)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    while (distractors.length < 3) {
      distractors.push("None of the above");
    }

    const options = [correctAnswer, ...distractors].sort(
      () => Math.random() - 0.5
    );
    const correctIndex = options.indexOf(correctAnswer);

    questions.push({
      question: iq.question,
      options,
      correctIndex,
      explanation: `Hint: ${iq.hint}`,
    });
  }

  for (const kp of topic.concept.keyPoints) {
    const words = kp.split(" ");
    const blankIndex = Math.floor(words.length / 2);
    const answer = words[blankIndex];
    const display = words
      .map((w, i) => (i === blankIndex ? "______" : w))
      .join(" ");

    const distractors = topic.concept.keyPoints
      .map((p) => p.split(" ")[blankIndex] || "")
      .filter((w) => w && w !== answer)
      .slice(0, 3);

    while (distractors.length < 3) {
      distractors.push("unknown");
    }

    const options = [answer, ...distractors].sort(
      () => Math.random() - 0.5
    );
    const correctIndex = options.indexOf(answer);

    questions.push({
      question: `Fill in the blank: "${display}"`,
      options,
      correctIndex,
      explanation: `The correct answer is "${answer}".`,
    });
  }

  const sentences = topic.concept.explanation
    .split(/[.!?]\s*/)
    .filter((s) => s.trim().length > 40);

  for (const sentence of sentences.slice(0, 10)) {
    const words = sentence.split(" ");
    if (words.length < 5) continue;
    const blankIndex = Math.floor(words.length / 2);
    const answer = words[blankIndex].replace(/[^a-zA-Z0-9-]/g, "");
    if (!answer || answer.length < 2) continue;
    const display = words
      .map((w, i) => (i === blankIndex ? "______" : w))
      .join(" ");

    const distractors = topic.concept.keyPoints
      .map((p) => {
        const pw = p.split(" ");
        return pw[Math.floor(pw.length / 2)]?.replace(/[^a-zA-Z0-9-]/g, "");
      })
      .filter((w) => w && w !== answer && w.length > 1)
      .slice(0, 3);

    while (distractors.length < 3) {
      distractors.push("it");
    }

    const options = [answer, ...distractors].sort(
      () => Math.random() - 0.5
    );
    const correctIndex = options.indexOf(answer);

    questions.push({
      question: `Complete the sentence: "${display}"`,
      options,
      correctIndex,
      explanation: `The correct answer is "${answer}".`,
    });
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, 15);
}

export function QuizSection({ topic }: { topic: Topic }) {
  const questions = useMemo(() => generateQuestions(topic), [topic]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const handleSelect = useCallback((index: number) => {
    setSelected(index);
    setShowResult(true);
  }, []);

  const handleNext = useCallback(() => {
    const correct = selected === questions[current].correctIndex;
    setScore((s) => s + (correct ? 1 : 0));
    setAnswers((a) => [...a, correct]);

    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  }, [current, selected, questions]);

  const handleRestart = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  }, []);

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card>
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-4xl font-bold text-primary mb-2">
              {score}/{questions.length}
            </p>
            <p className="text-muted-foreground mb-6">{percentage}% correct</p>
            <div className="flex justify-center gap-2 mb-6">
              {answers.map((correct, i) => (
                <span
                  key={i}
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    correct
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {correct ? "✓" : "✗"}
                </span>
              ))}
            </div>
            <Button onClick={handleRestart} variant="outline">
              <RotateCcw className="h-4 w-4 mr-1.5" />
              Retry Quiz
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const q = questions[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <HelpCircle className="h-5 w-5 text-primary" />
              Practice Quiz
            </CardTitle>
            <Badge variant="secondary">
              {current + 1} of {questions.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="font-semibold text-base">{q.question}</p>

          <div className="space-y-2">
            {q.options.map((option, index) => {
              let variant: "outline" | "default" | "destructive" | "success" =
                "outline";
              if (showResult) {
                if (index === q.correctIndex) variant = "success";
                else if (index === selected) variant = "destructive";
              }
              return (
                <button
                  key={index}
                  disabled={showResult}
                  onClick={() => handleSelect(index)}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                    variant === "success"
                      ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200"
                      : variant === "destructive"
                      ? "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200"
                      : selected === index
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        variant === "success"
                          ? "bg-emerald-500 text-white"
                          : variant === "destructive"
                          ? "bg-red-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showResult && index === q.correctIndex && (
                      <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-500 shrink-0" />
                    )}
                    {showResult && index === selected && index !== q.correctIndex && (
                      <XCircle className="h-4 w-4 ml-auto text-red-500 shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground"
              >
                {q.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          {showResult && (
            <Button onClick={handleNext} className="w-full">
              {current + 1 >= questions.length ? "See Results" : "Next Question"}
              <ChevronRight className="h-4 w-4 ml-1.5" />
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
