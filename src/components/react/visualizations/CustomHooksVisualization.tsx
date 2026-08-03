"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

export function CustomHooksVisualization() {
  const [count, setCount] = useState(0);
  const [showWidth, setShowWidth] = useState(false);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(0), []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Code className="h-4 w-4 text-blue-500" /> useCounter()</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-2xl font-bold text-center">{count}</p>
            <div className="flex justify-center gap-2">
              <Button size="sm" onClick={increment}>+</Button>
              <Button size="sm" onClick={decrement}>-</Button>
              <Button size="sm" variant="outline" onClick={reset}>Reset</Button>
            </div>
            <div className="rounded-lg border bg-muted/30 p-2 font-mono text-[10px]">
              <p>{`function useCounter(initial = 0) {`}</p>
              <p className="ml-2">{`const [count, setCount] = useState(initial);`}</p>
              <p className="ml-2">{`const increment = useCallback(`}</p>
              <p className="ml-4">{`() => setCount(c => c + 1), []);`}</p>
              <p className="ml-2">{`return { count, increment, decrement, reset };`}</p>
              <p>{`}`}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Code className="h-4 w-4 text-green-500" /> useWindowWidth()</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button size="sm" variant="outline" onClick={() => setShowWidth(!showWidth)}>
              {showWidth ? "Hide" : "Show"} Width
            </Button>
            {showWidth && (
              <div className="p-3 rounded-lg border bg-muted/30 text-center">
                <p className="text-2xl font-bold">{window.innerWidth}px</p>
                <p className="text-xs text-muted-foreground">Window width</p>
              </div>
            )}
            <div className="rounded-lg border bg-muted/30 p-2 font-mono text-[10px]">
              <p>{`function useWindowWidth() {`}</p>
              <p className="ml-2">{`const [width, setWidth] = useState(window.innerWidth);`}</p>
              <p className="ml-2">{`useEffect(() => {`}</p>
              <p className="ml-4">{`const handler = () => setWidth(window.innerWidth);`}</p>
              <p className="ml-4">{`window.addEventListener("resize", handler);`}</p>
              <p className="ml-4">{`return () => window.removeEventListener("resize", handler);`}</p>
              <p className="ml-2">{`}, []);`}</p>
              <p className="ml-2">{`return width;`}</p>
              <p>{`}`}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-3">
          <p className="text-xs text-muted-foreground">
            Custom hooks start with <span className="font-medium text-foreground">use</span> and encapsulate reusable logic.
            They can call other hooks and return any value.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
