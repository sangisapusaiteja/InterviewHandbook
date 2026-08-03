"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitBranch, Eye, EyeOff } from "lucide-react";

export function ConditionalRenderingVisualization() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><GitBranch className="h-4 w-4 text-blue-500" /> Conditional Rendering Patterns</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge variant={isLoggedIn ? "destructive" : "default"} className="cursor-pointer" onClick={() => setIsLoggedIn(!isLoggedIn)}>
              {isLoggedIn ? "Log Out" : "Log In"}
            </Badge>
            {isLoggedIn && (
              <Badge variant="outline" className="cursor-pointer" onClick={() => setRole(r => r === "admin" ? "user" : "admin")}>
                Toggle {role === "admin" ? "User" : "Admin"}
              </Badge>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-3 rounded-lg border bg-muted/30">
              <p className="text-xs font-medium mb-1">Ternary</p>
              <div className="p-2 rounded bg-background text-xs text-center">
                {isLoggedIn ? <span className="text-green-600">Logged In</span> : <span className="text-red-600">Logged Out</span>}
              </div>
            </div>

            <div className="p-3 rounded-lg border bg-muted/30">
              <p className="text-xs font-medium mb-1">Logical &&</p>
              <div className="p-2 rounded bg-background text-xs text-center">
                {isLoggedIn && <span className="text-blue-600"><Eye className="h-3 w-3 inline mr-1" />Visible</span>}
                {!isLoggedIn && <span className="text-muted-foreground"><EyeOff className="h-3 w-3 inline mr-1" />Hidden</span>}
              </div>
            </div>

            <div className="p-3 rounded-lg border bg-muted/30">
              <p className="text-xs font-medium mb-1">Switch (role)</p>
              <div className="p-2 rounded bg-background text-xs text-center">
                {role === "admin" ? <span className="text-purple-600">Admin Panel</span> : <span className="text-muted-foreground">User View</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
