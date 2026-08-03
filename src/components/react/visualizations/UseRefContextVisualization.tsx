"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, StickyNote, Share2 } from "lucide-react";

export function UseRefContextVisualization() {
  const [renderCount, setRenderCount] = useState(0);
  const refCount = useRef(0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <StickyNote className="h-4 w-4 text-orange-500" />
              useRef (no re-render)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center gap-4 p-3 rounded-lg border bg-muted/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">{refCount.current}</div>
                <div className="text-xs text-muted-foreground">ref.current</div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { refCount.current += 1; }}
            >
              Increment Ref (no re-render)
            </Button>
            <p className="text-xs text-muted-foreground">
              useRef does NOT cause re-render. The value updates silently.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Share2 className="h-4 w-4 text-blue-500" />
              useState (re-renders)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-center gap-4 p-3 rounded-lg border bg-muted/30">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">{renderCount}</div>
                <div className="text-xs text-muted-foreground">state</div>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRenderCount((c) => c + 1)}
            >
              Increment State (re-renders)
            </Button>
            <p className="text-xs text-muted-foreground">
              useState triggers a re-render when the value changes.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Code className="h-4 w-4 text-green-500" />
            useContext — Global State Without Prop Drilling
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/30 p-3 font-mono text-xs">
            <p className="text-muted-foreground">{'// Create context'}</p>
            <p>const UserContext = createContext();</p>
            <p className="text-muted-foreground mt-2">{'// Provide value'}</p>
            <p>{`<UserContext.Provider value={user}>`}</p>
            <p>{`  <App />`}</p>
            <p>{`</UserContext.Provider>`}</p>
            <p className="text-muted-foreground mt-2">{'// Consume anywhere'}</p>
            <p>const user = useContext(UserContext);</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
