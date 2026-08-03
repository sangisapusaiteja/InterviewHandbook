"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Package, GitFork } from "lucide-react";

export function StateManagementVisualization() {
  const [view, setView] = useState<"context" | "redux" | "zustand">("context");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant={view === "context" ? "default" : "outline"} className="cursor-pointer" onClick={() => setView("context")}>Context API</Badge>
        <Badge variant={view === "redux" ? "default" : "outline"} className="cursor-pointer" onClick={() => setView("redux")}>Redux Toolkit</Badge>
        <Badge variant={view === "zustand" ? "default" : "outline"} className="cursor-pointer" onClick={() => setView("zustand")}>Zustand</Badge>
      </div>

      {view === "context" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-blue-500" /> Context API</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-muted/30">
              <div className="p-2 rounded bg-blue-100 dark:bg-blue-900/30 text-xs font-medium">Provider (value)</div>
              <div className="flex gap-4">
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-xs">Component A</div>
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-xs">Component B</div>
                <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20 text-xs">Component C</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Built-in. Good for simple global state (theme, user, locale).</p>
          </CardContent>
        </Card>
      )}

      {view === "redux" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitFork className="h-4 w-4 text-purple-500" /> Redux Toolkit</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2 p-4 rounded-lg border bg-muted/30 text-xs">
              <div className="p-2 rounded bg-purple-100 dark:bg-purple-900/30">Action</div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="p-2 rounded bg-purple-100 dark:bg-purple-900/30">Dispatch</div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="p-2 rounded bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500">Reducer</div>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <div className="p-2 rounded bg-purple-100 dark:bg-purple-900/30">Store</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Store → Slice → Actions → Reducers → Dispatch → Selectors</p>
          </CardContent>
        </Card>
      )}

      {view === "zustand" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Package className="h-4 w-4 text-green-500" /> Zustand</CardTitle></CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border bg-muted/30 font-mono text-xs">
              <p className="text-muted-foreground">{'const useStore = create((set) => ({'}</p>
              <p className="ml-4">{'count: 0,'}</p>
              <p className="ml-4">{'increment: () => set(s => ({ count: s.count + 1 })),'}</p>
              <p className="text-muted-foreground">{'}));'}</p>
              <p className="text-muted-foreground mt-2">{'// Usage'}</p>
              <p>{'const { count, increment } = useStore();'}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Minimal, no boilerplate, no providers. Simpler than Redux.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return <span className={className}>→</span>;
}
