"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { List, Plus, Trash2 } from "lucide-react";

export function ListsKeysVisualization() {
  const [items, setItems] = useState([{ id: 1, text: "Learn React" }, { id: 2, text: "Build a project" }, { id: 3, text: "Practice interviews" }]);
  const [useIndex, setUseIndex] = useState(false);

  const addItem = () => {
    const id = Date.now();
    setItems(i => [{ id, text: "New task " + id }, ...i]);
  };

  const removeItem = (id: number) => {
    setItems(i => i.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant={!useIndex ? "default" : "outline"} className="cursor-pointer" onClick={() => setUseIndex(false)}>Unique Keys (good)</Badge>
        <Badge variant={useIndex ? "default" : "outline"} className="cursor-pointer" onClick={() => setUseIndex(true)}>Index Keys (bad)</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><List className="h-4 w-4 text-blue-500" /> Lists & Keys Demo</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button size="sm" onClick={addItem}><Plus className="h-3 w-3 mr-1" />Add at Beginning</Button>
          <div className="rounded-lg border bg-muted/30">
            {items.map((item, index) => (
              <div key={useIndex ? index : item.id}
                className="flex items-center justify-between px-3 py-2 border-b last:border-b-0">
                <span className="text-sm">{item.text}</span>
                <button onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            {useIndex
              ? "Index keys shift on add/remove — React re-renders incorrectly."
              : "Unique keys let React track each item correctly."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
