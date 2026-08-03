"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, FileText } from "lucide-react";

export function PropsStateVisualization() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"normal" | "stale" | "functional">("normal");

  const handleClick = () => {
    if (mode === "normal") {
      setCount((c) => c + 1);
    } else if (mode === "stale") {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    } else {
      setCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="h-5 w-5 text-primary" />
            Props & State Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={mode === "normal" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => { setMode("normal"); setCount(0); }}
            >
              Normal (+1)
            </Badge>
            <Badge
              variant={mode === "stale" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => { setMode("stale"); setCount(0); }}
            >
              Stale Closure (x3)
            </Badge>
            <Badge
              variant={mode === "functional" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => { setMode("functional"); setCount(0); }}
            >
              Functional Update (x3)
            </Badge>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {count}
              </div>
              <span className="text-xs text-muted-foreground">State</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                {count}
              </div>
              <span className="text-xs text-muted-foreground">Rendered</span>
            </div>
          </div>

          <Button onClick={handleClick} size="sm">
            Update State
          </Button>

          <div className="text-xs text-muted-foreground">
            {mode === "normal" && "Click increments by 1 using functional update."}
            {mode === "stale" && "setCount(count + 1) x3 — all see the same stale value!"}
            {mode === "functional" && "setCount(prev => prev + 1) x3 — each gets the latest value."}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-blue-500" />
              Props
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Data passed from parent to child. Read-only. Like a TV remote.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-green-500" />
              State
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Internal component data. Triggers re-render on change. Like a personal notebook.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
