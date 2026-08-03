"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Layers, ArrowRight } from "lucide-react";

export function ComponentsVisualization() {
  const [active, setActive] = useState<"composition" | "hoc" | "render">("composition");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant={active === "composition" ? "default" : "outline"} className="cursor-pointer" onClick={() => setActive("composition")}>Composition</Badge>
        <Badge variant={active === "hoc" ? "default" : "outline"} className="cursor-pointer" onClick={() => setActive("hoc")}>HOC</Badge>
        <Badge variant={active === "render" ? "default" : "outline"} className="cursor-pointer" onClick={() => setActive("render")}>Render Props</Badge>
      </div>

      {active === "composition" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Layers className="h-4 w-4 text-blue-500" /> Component Composition</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 p-4 rounded-lg border bg-muted/30">
              <div className="p-2 rounded bg-blue-100 dark:bg-blue-900/30 text-center text-sm font-medium">Header</div>
              <div className="p-4 rounded border-2 border-dashed border-blue-300 text-center text-sm text-muted-foreground">Content (children)</div>
              <div className="p-2 rounded bg-gray-100 dark:bg-gray-800 text-center text-sm font-medium">Footer</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Small components combine to build larger UIs.</p>
          </CardContent>
        </Card>
      )}

      {active === "hoc" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Boxes className="h-4 w-4 text-green-500" /> Higher-Order Component</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/30">
              <div className="p-2 rounded bg-green-100 dark:bg-green-900/30 text-xs">Component</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="p-2 rounded bg-green-100 dark:bg-green-900/30 text-xs border-2 border-green-500">withAuth()</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="p-2 rounded bg-green-100 dark:bg-green-900/30 text-xs font-medium">Enhanced Component</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">HOC wraps a component to add behavior (e.g., authentication check).</p>
          </CardContent>
        </Card>
      )}

      {active === "render" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Boxes className="h-4 w-4 text-purple-500" /> Render Props</CardTitle></CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border bg-muted/30 font-mono text-xs">
              <p className="text-muted-foreground">{'<DataProvider'}</p>
              <p className="text-muted-foreground ml-4">{'render={(data) => ('}</p>
              <p className="ml-8">{'<UserList data={data} />'}</p>
              <p className="text-muted-foreground ml-4">{')}'}</p>
              <p className="text-muted-foreground">{'/>'}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">A function prop controls what to render.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
