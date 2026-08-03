"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, GitBranch, Key, Layers } from "lucide-react";

export function AdvancedReactVisualization() {
  const [items, setItems] = useState(["A", "B", "C"]);
  const [useIndex, setUseIndex] = useState(false);

  const addItem = () => {
    const newItem = String.fromCharCode(65 + items.length);
    setItems([newItem, ...items]);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-purple-500" />
              Virtual DOM
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            A lightweight copy of the Real DOM. React diffs old vs new Virtual DOM and patches only the changed parts in the Real DOM.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <GitBranch className="h-4 w-4 text-blue-500" />
              Reconciliation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            The diffing algorithm that compares old and new Virtual DOM trees and applies minimal updates to the Real DOM.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Key className="h-4 w-4 text-orange-500" />
            Keys in Lists — Interactive Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge
              variant={useIndex ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setUseIndex(true)}
            >
              Using Index (bad)
            </Badge>
            <Badge
              variant={!useIndex ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setUseIndex(false)}
            >
              Using Unique ID (good)
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
              <div
                key={useIndex ? index : item}
                className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/5 font-bold text-sm"
              >
                {item}
              </div>
            ))}
          </div>

          <Button size="sm" variant="outline" onClick={addItem}>
            Add Item at Beginning
          </Button>

          <p className="text-xs text-muted-foreground">
            {useIndex
              ? "With index keys, adding at the beginning shifts all indexes — React re-renders everything."
              : "With unique keys, React knows exactly which items are new and which shifted."}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Layers className="h-4 w-4 text-green-500" />
              Controlled vs Uncontrolled
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p><span className="font-semibold text-foreground">Controlled:</span> React manages input via state (value + onChange)</p>
            <p><span className="font-semibold text-foreground">Uncontrolled:</span> Browser manages input via ref</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Layers className="h-4 w-4 text-cyan-500" />
              React.lazy + Suspense
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>Lazy load components only when needed:</p>
            <div className="rounded-lg border bg-muted/30 p-2 font-mono text-xs">
              <p>{`const Dashboard = lazy(() => import("./Dashboard"));`}</p>
              <p>{`<Suspense fallback={<Loader />}>`}</p>
              <p>{`  <Dashboard />`}</p>
              <p>{`</Suspense>`}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
