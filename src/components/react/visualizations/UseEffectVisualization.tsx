"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Timer } from "lucide-react";

export function UseEffectVisualization() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-yellow-500" />
            useEffect Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30 text-3xl font-bold">
              {seconds}s
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={isRunning ? "outline" : "default"}
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "Stop" : "Start"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSeconds(0); setIsRunning(false); }}
            >
              Reset
            </Button>
          </div>
          <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-mono">
              {`useEffect(() => {`}
              <br />
              {`  const interval = setInterval(() => {`}
              <br />
              {`    setSeconds(s => s + 1);`}
              <br />
              {`  }, 1000);`}
              <br />
              {`  return () => clearInterval(interval);`}
              <br />
              {`}, [isRunning]);`}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Timer className="h-3 w-3" />
            Cleanup runs on unmount and before re-run
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
