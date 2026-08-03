"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Cpu, Shield } from "lucide-react";

export function MemoVisualization() {
  const [count, setCount] = useState(0);

  const doubled = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-blue-500" />
              useMemo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center p-3 rounded-lg border bg-muted/30">
              <div className="text-2xl font-bold text-blue-500">{doubled}</div>
              <div className="text-xs text-muted-foreground">count x 2 (memoized)</div>
            </div>
            <Button size="sm" variant="outline" onClick={() => setCount((c) => c + 1)}>
              Change count
            </Button>
            <p className="text-xs text-muted-foreground">
              Only recalculates when count changes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-green-500" />
              React.memo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs">
              <p>{`const Child = React.memo(`}</p>
              <p>{`  function Child({ name }) {`}</p>
              <p>{`    return <h1>{name}</h1>;`}</p>
              <p>{`  }`}</p>
              <p>{`);`}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Prevents re-render if props haven&apos;t changed (shallow compare).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Zap className="h-4 w-4 text-yellow-500" />
              useCallback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs">
              <p>{`const handleClick = useCallback(`}</p>
              <p>{`  () => { save(); }, []`}</p>
              <p>{`);`}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Memoizes function references to prevent unnecessary re-creation.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-2">Quick Reference</p>
          <div className="grid gap-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">useMemo</span> — memoizes values</p>
            <p><span className="font-semibold text-foreground">useCallback</span> — memoizes functions</p>
            <p><span className="font-semibold text-foreground">React.memo</span> — memoizes components</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
