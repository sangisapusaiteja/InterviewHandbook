"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConsoleSectionProps {
  output: string[];
}

export function ConsoleSection({ output }: ConsoleSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Terminal className="h-5 w-5 text-emerald-500" />
          Console Output
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-t bg-zinc-950 rounded-b-lg">
          <ScrollArea className="h-[200px] lg:h-[500px]">
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
                    Click &quot;Run Code&quot; to see output here...
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
                        transition={{ delay: index * 0.05 }}
                        className={
                          line.startsWith("Error:")
                            ? "text-red-400"
                            : line.startsWith("//")
                            ? "text-zinc-500"
                            : "text-emerald-400"
                        }
                      >
                        <span className="text-zinc-600 mr-2 select-none">
                          {">"}
                        </span>
                        <span className="whitespace-pre-wrap">{line}</span>
                      </motion.div>
                    ))}
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
