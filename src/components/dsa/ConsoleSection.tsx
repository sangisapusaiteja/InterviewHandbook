"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConsoleSectionProps {
  output: string[];
  /** If provided, renders an inline stdin textarea above the output (Python mode) */
  stdin?: {
    value: string;
    onChange: (v: string) => void;
  };
}

export function ConsoleSection({ output, stdin }: ConsoleSectionProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Terminal className="h-5 w-5 text-emerald-500" />
          Console Output
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col flex-1 min-h-0">
        {/* ── stdin panel (Python only) ──────────────────────────── */}
        {stdin && (
          <div className="border-t border-b border-zinc-700 bg-zinc-900 px-4 py-3 shrink-0">
            <p className="text-[11px] font-mono text-zinc-400 mb-1.5">
              Program Input{" "}
              <span className="text-zinc-600">(one value per line)</span>
            </p>
            <textarea
              value={stdin.value}
              onChange={(e) => stdin.onChange(e.target.value)}
              placeholder={"e.g.\n10\n20\n30"}
              rows={3}
              spellCheck={false}
              className="w-full rounded-md bg-zinc-950 border border-zinc-700 text-emerald-300 font-mono text-xs px-3 py-2 outline-none resize-none placeholder:text-zinc-700 focus:border-emerald-600 transition-colors"
            />
          </div>
        )}

        {/* ── output area ──────────────────────────────────────────── */}
        <div className="bg-zinc-950 rounded-b-lg flex-1">
          <ScrollArea className="h-[200px] lg:h-[380px]">
            <div className="p-4 font-mono text-sm">
              <AnimatePresence mode="wait">
                {output.length === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-500"
                  >
                    {stdin
                      ? 'Fill in inputs above, then click "Run Code"…'
                      : 'Click "Run Code" to see output here…'}
                  </motion.p>
                ) : (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1"
                  >
                    {output.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: Math.min(index * 0.03, 0.3) }}
                        className={
                          line.startsWith("Error:")
                            ? "text-red-400"
                            : line.startsWith("//") || line.startsWith("#")
                            ? "text-zinc-500"
                            : "text-emerald-400"
                        }
                      >
                        <span className="text-zinc-600 mr-2 select-none">{">"}</span>
                        <span className="whitespace-pre-wrap">{line}</span>
                      </motion.div>
                    ))}
                    <div ref={bottomRef} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
