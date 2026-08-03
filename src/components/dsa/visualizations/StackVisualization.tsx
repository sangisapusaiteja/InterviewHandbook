"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StackVisualization() {
  const [stack, setStack] = useState<number[]>([10, 20, 30]);
  const [nextValue, setNextValue] = useState(40);
  const [lastAction, setLastAction] = useState<string>("");

  const push = () => {
    if (stack.length >= 8) return;
    setStack([...stack, nextValue]);
    setLastAction(`Pushed ${nextValue}`);
    setNextValue(nextValue + 10);
  };

  const pop = () => {
    if (stack.length === 0) return;
    const val = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setLastAction(`Popped ${val}`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Stack Visualization (LIFO)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button onClick={push} size="sm" disabled={stack.length >= 8}>
              <Plus className="h-4 w-4 mr-1" />
              Push ({nextValue})
            </Button>
            <Button
              onClick={pop}
              variant="destructive"
              size="sm"
              disabled={stack.length === 0}
            >
              <Minus className="h-4 w-4 mr-1" />
              Pop
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

          {/* Stack visual */}
          <div className="relative w-48">
            {/* TOP label */}
            <div className="text-xs text-primary font-semibold text-center mb-1">
              TOP
            </div>
            <div className="border-l-2 border-r-2 border-b-2 border-muted-foreground/30 rounded-b-lg min-h-[250px] flex flex-col-reverse items-center p-2 gap-1.5">
              <AnimatePresence mode="popLayout">
                {stack.map((val, index) => (
                  <motion.div
                    key={`${val}-${index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.5, y: -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -30 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className={`w-full h-10 rounded-md flex items-center justify-center font-mono font-bold text-sm ${
                      index === stack.length - 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {val}
                  </motion.div>
                ))}
              </AnimatePresence>
              {stack.length === 0 && (
                <p className="text-sm text-muted-foreground">Empty Stack</p>
              )}
            </div>
            <div className="text-xs text-muted-foreground text-center mt-1">
              BOTTOM
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-xs">
            Stack follows LIFO (Last In, First Out). The last element pushed is
            the first one to be popped.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
