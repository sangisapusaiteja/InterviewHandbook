"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CodeLine {
  text: string;
  isComment: boolean;
}

const codeLines: CodeLine[] = [
  { text: "<!DOCTYPE html>", isComment: false },
  { text: "<html>", isComment: false },
  { text: "<head>", isComment: false },
  { text: "  <!-- Page metadata -->", isComment: true },
  { text: '  <title>My Site</title>', isComment: false },
  { text: "</head>", isComment: false },
  { text: "<body>", isComment: false },
  { text: "", isComment: false },
  { text: "  <!-- Main heading -->", isComment: true },
  { text: "  <h1>Welcome</h1>", isComment: false },
  { text: "", isComment: false },
  { text: "  <!-- TODO: Add navigation menu -->", isComment: true },
  { text: "", isComment: false },
  { text: "  <p>Hello World</p>", isComment: false },
  { text: "", isComment: false },
  { text: "  <!--", isComment: true },
  { text: "    This section is temporarily disabled.", isComment: true },
  { text: "    Uncomment when the feature is ready.", isComment: true },
  { text: "  -->", isComment: true },
  { text: "", isComment: false },
  { text: "</body>", isComment: false },
  { text: "</html>", isComment: false },
];

const commentUseCases = [
  {
    title: "Explain complex code",
    example: "<!-- Calculate total price including tax -->",
    description: "Leave notes for yourself or other developers.",
  },
  {
    title: "Temporarily disable code",
    example: "<!-- <div class=\"beta-feature\">...</div> -->",
    description: "Comment out code instead of deleting it.",
  },
  {
    title: "Mark sections",
    example: "<!-- ===== HEADER SECTION ===== -->",
    description: "Visually separate large HTML files into sections.",
  },
  {
    title: "TODO notes",
    example: "<!-- TODO: Add form validation -->",
    description: "Leave reminders for future work.",
  },
];

export function CommentsVisualization() {
  const [showComments, setShowComments] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comments in HTML</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Comments are invisible to users but visible in source code.
              Toggle to see what the browser renders.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="shrink-0 ml-4"
            >
              {showComments ? (
                <>
                  <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                  Hide Comments
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  Show Comments
                </>
              )}
            </Button>
          </div>

          {/* Code view */}
          <div className="rounded-xl border bg-zinc-950 p-4 font-mono text-xs overflow-x-auto">
            {codeLines.map((line, i) => {
              if (line.isComment && !showComments) return null;
              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`leading-relaxed ${
                    line.isComment
                      ? "text-zinc-500 italic"
                      : line.text === ""
                      ? "h-4"
                      : "text-zinc-300"
                  }`}
                >
                  <span className="text-zinc-700 select-none w-6 inline-block text-right mr-3">
                    {i + 1}
                  </span>
                  {line.text}
                </motion.div>
              );
            })}
          </div>

          {/* Syntax */}
          <div className="rounded-xl bg-muted/50 p-3 space-y-1">
            <p className="text-xs font-semibold">Comment Syntax:</p>
            <code className="text-xs text-primary font-mono">
              &lt;!-- Your comment here --&gt;
            </code>
            <p className="text-xs text-muted-foreground">
              Everything between <code>&lt;!--</code> and <code>--&gt;</code> is
              ignored by the browser. Comments can span multiple lines.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Use cases */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">When to Use Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {commentUseCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border p-3 space-y-1.5"
              >
                <p className="text-sm font-semibold">{uc.title}</p>
                <code className="text-[10px] text-emerald-500 font-mono block bg-zinc-950 rounded px-2 py-1">
                  {uc.example}
                </code>
                <p className="text-xs text-muted-foreground">{uc.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
