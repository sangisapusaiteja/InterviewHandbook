"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type GeoMethod = "getCurrentPosition" | "watchPosition" | "errors";

const geoMethods: { id: GeoMethod; label: string }[] = [
  { id: "getCurrentPosition", label: "getCurrentPosition()" },
  { id: "watchPosition", label: "watchPosition()" },
  { id: "errors", label: "Error Handling" },
];

const geoDetails: Record<GeoMethod, { desc: string; code: string }> = {
  getCurrentPosition: {
    desc: "Gets the device's current position once. Prompts the user for permission on first call.",
    code: `navigator.geolocation.getCurrentPosition(
  // Success callback
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log(\`Lat: \${latitude}\`);
    console.log(\`Lng: \${longitude}\`);
    console.log(\`Accuracy: \${position.coords.accuracy}m\`);
  },
  // Error callback
  (error) => {
    console.error(error.message);
  },
  // Options
  {
    enableHighAccuracy: true,
    timeout: 10000,        // 10 seconds
    maximumAge: 60000      // Cache for 1 minute
  }
);`,
  },
  watchPosition: {
    desc: "Continuously tracks the user's position. Returns a watch ID that can be used to stop tracking.",
    code: `// Start watching position
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    updateMap(latitude, longitude);
  },
  (error) => {
    console.error("Watch error:", error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0   // Always get fresh position
  }
);

// Stop watching when done
navigator.geolocation.clearWatch(watchId);`,
  },
  errors: {
    desc: "Three possible error codes: PERMISSION_DENIED (1), POSITION_UNAVAILABLE (2), TIMEOUT (3).",
    code: `navigator.geolocation.getCurrentPosition(
  (pos) => { /* success */ },
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // User clicked "Block"
        alert("Please enable location access");
        break;

      case error.POSITION_UNAVAILABLE:
        // GPS/network unavailable
        alert("Location unavailable");
        break;

      case error.TIMEOUT:
        // Took too long
        alert("Request timed out, try again");
        break;
    }
  }
);`,
  },
};

export function GeolocationVisualization() {
  const [activeMethod, setActiveMethod] = useState<GeoMethod>("getCurrentPosition");
  const active = geoDetails[activeMethod];

  return (
    <div className="space-y-6">
      {/* API Explorer */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Geolocation API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The Geolocation API lets web apps access the user&apos;s location — requires HTTPS and user permission.
          </p>

          <div className="flex flex-wrap gap-2">
            {geoMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMethod(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMethod === m.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeMethod}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-xl border p-4 space-y-3">
              <p className="text-xs text-muted-foreground">{active.desc}</p>
            </div>
            <div className="rounded-xl border bg-zinc-950 p-3 font-mono text-[11px] text-emerald-400 whitespace-pre overflow-x-auto">
              {active.code}
            </div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Position object properties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Position Object Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Property</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-left p-2">Always Available?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { prop: "coords.latitude", type: "number", desc: "Latitude in decimal degrees", available: "Yes" },
                  { prop: "coords.longitude", type: "number", desc: "Longitude in decimal degrees", available: "Yes" },
                  { prop: "coords.accuracy", type: "number", desc: "Accuracy in meters", available: "Yes" },
                  { prop: "coords.altitude", type: "number?", desc: "Altitude in meters above sea level", available: "No" },
                  { prop: "coords.speed", type: "number?", desc: "Speed in meters/second", available: "No" },
                  { prop: "coords.heading", type: "number?", desc: "Direction of travel in degrees", available: "No" },
                  { prop: "timestamp", type: "number", desc: "When the position was acquired", available: "Yes" },
                ].map((row) => (
                  <tr key={row.prop} className="border-b last:border-0">
                    <td className="p-2">
                      <code className="text-primary font-bold text-[10px]">{row.prop}</code>
                    </td>
                    <td className="p-2 font-mono text-muted-foreground">{row.type}</td>
                    <td className="p-2">{row.desc}</td>
                    <td className="p-2">
                      <Badge className={`text-[8px] ${row.available === "Yes" ? "bg-emerald-500" : "bg-zinc-500"}`}>
                        {row.available}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Security & best practices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security & Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { rule: "HTTPS required", detail: "Geolocation API only works on secure origins (HTTPS or localhost)" },
              { rule: "Always handle denial", detail: "Users can block location access — provide fallback UX (manual address input, default location)" },
              { rule: "Explain why", detail: "Tell users WHY you need their location before the browser prompt appears — increases permission grant rate" },
              { rule: "Minimize tracking", detail: "Use getCurrentPosition() for one-time needs; only use watchPosition() when continuous tracking is essential" },
              { rule: "Set timeouts", detail: "Always set timeout option — GPS can take seconds on mobile; don't leave users waiting indefinitely" },
              { rule: "Check support first", detail: "Use 'geolocation' in navigator to check if the API is available before calling it" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border p-2.5 space-y-1"
              >
                <p className="text-xs font-bold text-primary">{item.rule}</p>
                <p className="text-[10px] text-muted-foreground">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
