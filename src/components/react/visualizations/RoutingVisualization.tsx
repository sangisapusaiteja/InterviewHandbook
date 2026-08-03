"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Shield } from "lucide-react";

export function RoutingVisualization() {
  const [page, setPage] = useState("home");
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Globe className="h-4 w-4 text-blue-500" /> React Router Concepts</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <nav className="flex gap-2 border-b pb-2">
            {["home", "about", "dashboard"].map(p => (
              <Badge key={p} variant={page === p ? "default" : "outline"} className="cursor-pointer" onClick={() => setPage(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Badge>
            ))}
          </nav>

          <div className="p-4 rounded-lg border bg-muted/30 min-h-[100px]">
            {page === "home" && <p className="text-sm">Home Page — public route</p>}
            {page === "about" && <p className="text-sm">About Page — public route</p>}
            {page === "dashboard" && (
              isAuth ? (
                <div>
                  <p className="text-sm text-green-600">Dashboard — protected route (authenticated)</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-orange-600">Protected route — please log in</p>
                  <Badge variant="default" className="cursor-pointer" onClick={() => setIsAuth(true)}>
                    <Shield className="h-3 w-3 mr-1" />Simulate Login
                  </Badge>
                </div>
              )
            )}
          </div>

          <div className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            <div className="p-2 rounded border"><span className="font-medium text-foreground">Link</span> — declarative navigation</div>
            <div className="p-2 rounded border"><span className="font-medium text-foreground">useParams</span> — access route params</div>
            <div className="p-2 rounded border"><span className="font-medium text-foreground">useNavigate</span> — programmatic nav</div>
            <div className="p-2 rounded border"><span className="font-medium text-foreground">NavLink</span> — active state styling</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
