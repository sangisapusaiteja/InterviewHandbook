"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, ArrowDown, Users } from "lucide-react";

export function PropsVisualization() {
  const [view, setView] = useState<"basic" | "drilling" | "children">("basic");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant={view === "basic" ? "default" : "outline"} className="cursor-pointer" onClick={() => setView("basic")}>Props Flow</Badge>
        <Badge variant={view === "drilling" ? "default" : "outline"} className="cursor-pointer" onClick={() => setView("drilling")}>Prop Drilling</Badge>
        <Badge variant={view === "children" ? "default" : "outline"} className="cursor-pointer" onClick={() => setView("children")}>Children</Badge>
      </div>

      {view === "basic" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><ArrowRightLeft className="h-4 w-4 text-blue-500" /> Props Flow</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-4 p-4 rounded-lg border bg-muted/30">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-center">
                <p className="text-xs font-medium">Parent</p>
                <p className="text-[10px] text-muted-foreground">owns data</p>
              </div>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-center">
                <p className="text-xs font-medium">Child</p>
                <p className="text-[10px] text-muted-foreground">reads only</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Props flow one way: parent → child. Children cannot modify props.</p>
          </CardContent>
        </Card>
      )}

      {view === "drilling" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-orange-500" /> Prop Drilling</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-muted/30">
              <div className="p-2 rounded bg-orange-100 dark:bg-orange-900/30 text-xs font-medium w-24 text-center">App (user)</div>
              <ArrowDown className="h-3 w-3 text-muted-foreground" />
              <div className="p-2 rounded bg-orange-50 dark:bg-orange-900/20 text-xs w-24 text-center">Layout</div>
              <ArrowDown className="h-3 w-3 text-muted-foreground" />
              <div className="p-2 rounded bg-orange-50 dark:bg-orange-900/20 text-xs w-24 text-center">Sidebar</div>
              <ArrowDown className="h-3 w-3 text-muted-foreground" />
              <div className="p-2 rounded bg-orange-100 dark:bg-orange-900/30 text-xs font-medium w-24 text-center border-2 border-orange-500">Profile</div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Passing props through many levels. Solution: Context API or state management.</p>
          </CardContent>
        </Card>
      )}

      {view === "children" && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-purple-500" /> Children Prop</CardTitle></CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border-2 border-purple-300 bg-muted/30">
              <p className="text-xs font-medium text-purple-600 mb-2">Card Component</p>
              <div className="p-3 rounded bg-white dark:bg-gray-800 border border-dashed">
                <p className="text-xs text-muted-foreground">children content goes here</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">children is a special prop for nested content between tags.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
