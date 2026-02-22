"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QueueVisualization() {
  const [queue, setQueue] = useState<number[]>([10, 20, 30]);
  const [nextValue, setNextValue] = useState(40);
  const [lastAction, setLastAction] = useState<string>("");

  const enqueue = () => {
    if (queue.length >= 8) return;
    setQueue([...queue, nextValue]);
    setLastAction(`Enqueued ${nextValue}`);
    setNextValue(nextValue + 10);
  };

  const dequeue = () => {
    if (queue.length === 0) return;
    const val = queue[0];
    setQueue(queue.slice(1));
    setLastAction(`Dequeued ${val}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Queue Visualization (FIFO)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button onClick={enqueue} size="sm" disabled={queue.length >= 8}>
              <Plus className="h-4 w-4 mr-1" />
              Enqueue ({nextValue})
            </Button>
            <Button
              onClick={dequeue}
              variant="destructive"
              size="sm"
              disabled={queue.length === 0}
            >
              <Minus className="h-4 w-4 mr-1" />
              Dequeue
            </Button>
          </div>

          {lastAction && (
            <motion.p
              key={lastAction}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground"
            >
              {lastAction}
            </motion.p>
          )}

          {/* Queue visual */}
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="text-xs text-primary font-semibold">FRONT (Dequeue)</span>
              <span className="text-xs text-muted-foreground font-semibold">REAR (Enqueue)</span>
            </div>
            <div className="border-2 border-muted-foreground/30 rounded-lg min-h-[60px] flex items-center p-2 gap-2 overflow-x-auto">
              <AnimatePresence mode="popLayout">
                {queue.map((val, index) => (
                  <motion.div
                    key={`${val}-${index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.5, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: -50 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className={`w-14 h-14 shrink-0 rounded-md flex items-center justify-center font-mono font-bold text-sm ${
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {val}
                  </motion.div>
                ))}
              </AnimatePresence>
              {queue.length === 0 && (
                <p className="text-sm text-muted-foreground w-full text-center">
                  Empty Queue
                </p>
              )}
            </div>
            {/* Direction arrows */}
            <div className="flex justify-center mt-2">
              <span className="text-xs text-muted-foreground">
                → Direction of flow →
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Queue follows FIFO (First In, First Out). Elements are added at the
            rear and removed from the front.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
