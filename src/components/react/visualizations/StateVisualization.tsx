"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw } from "lucide-react";

export function StateVisualization() {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"normal" | "stale" | "functional">("normal");

  const handleClick = () => {
    if (mode === "normal") setCount(c => c + 1);
    else if (mode === "stale") {
      setCount(count + 1); setCount(count + 1); setCount(count + 1);
    } else {
      setCount(p => p + 1); setCount(p => p + 1); setCount(p => p + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant={mode === "normal" ? "default" : "outline"} className="cursor-pointer" onClick={() => { setMode("normal"); setCount(0); }}>Normal (+1)</Badge>
        <Badge variant={mode === "stale" ? "default" : "outline"} className="cursor-pointer" onClick={() => { setMode("stale"); setCount(0); }}>Stale Closure (x3)</Badge>
        <Badge variant={mode === "functional" ? "default" : "outline"} className="cursor-pointer" onClick={() => { setMode("functional"); setCount(0); }}>Functional (x3)</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><FileText className="h-4 w-4 text-blue-500" /> State Batching Demo</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30 text-3xl font-bold">{count}</div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleClick}>Update State</Button>
            <Button size="sm" variant="outline" onClick={() => { setCount(0); setMode("normal"); }}><RefreshCw className="h-3 w-3 mr-1" />Reset</Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {mode === "normal" && "Click increments by 1 using functional update."}
            {mode === "stale" && "setCount(count + 1) x3 — all see the same stale value (0)!"}
            {mode === "functional" && "setCount(prev => prev + 1) x3 — each gets the latest value."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
