"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MapEntry {
  key: string;
  value: string;
  id: number;
}

let nextId = 100;

export function MapSetVisualization() {
  const [mode, setMode] = useState<"map" | "set">("map");

  // Map state
  const [mapEntries, setMapEntries] = useState<MapEntry[]>([
    { key: "a", value: "3", id: 1 },
    { key: "b", value: "1", id: 2 },
    { key: "c", value: "2", id: 3 },
  ]);
  const [mapKey, setMapKey] = useState("");
  const [mapValue, setMapValue] = useState("");

  // Set state
  const [setA] = useState<string[]>(["1", "2", "3", "4", "5"]);
  const [setB] = useState<string[]>(["3", "4", "5", "6", "7"]);
  const [intersection, setIntersection] = useState<string[] | null>(null);
  const [lastAction, setLastAction] = useState("");

  // Map operations
  const mapSet = () => {
    if (!mapKey.trim()) return;
    const existing = mapEntries.findIndex((e) => e.key === mapKey.trim());
    if (existing >= 0) {
      const updated = [...mapEntries];
      updated[existing] = { ...updated[existing], value: mapValue.trim() || "0" };
      setMapEntries(updated);
      setLastAction(`map.set("${mapKey}", ${mapValue || "0"}) - updated`);
    } else {
      nextId++;
      setMapEntries([
        ...mapEntries,
        { key: mapKey.trim(), value: mapValue.trim() || "0", id: nextId },
      ]);
      setLastAction(`map.set("${mapKey}", ${mapValue || "0"}) - added`);
    }
    setMapKey("");
    setMapValue("");
  };

  const mapDelete = (key: string) => {
    setMapEntries(mapEntries.filter((e) => e.key !== key));
    setLastAction(`map.delete("${key}")`);
  };

  const sortByValue = () => {
    const sorted = [...mapEntries].sort(
      (a, b) => Number(b.value) - Number(a.value)
    );
    setMapEntries(sorted);
    setLastAction("Sorted by value (descending) - like Sort By Frequency");
  };

  // Set operations
  const findIntersection = () => {
    const sA = new Set(setA);
    const result = setB.filter((item) => sA.has(item));
    setIntersection(result);
    setLastAction(`Intersection: [${result.join(", ")}]`);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg">Map & Set Visualization</CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant={mode === "map" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => {
                setMode("map");
                setLastAction("");
              }}
            >
              Map
            </Badge>
            <Badge
              variant={mode === "set" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => {
                setMode("set");
                setLastAction("");
                setIntersection(null);
              }}
            >
              Set
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {mode === "map" ? (
            <>
              {/* Map controls */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <input
                  type="text"
                  value={mapKey}
                  onChange={(e) => setMapKey(e.target.value)}
                  placeholder="key"
                  className="rounded-md border bg-background px-2 py-1.5 text-sm font-mono w-20"
                />
                <input
                  type="text"
                  value={mapValue}
                  onChange={(e) => setMapValue(e.target.value)}
                  placeholder="value"
                  className="rounded-md border bg-background px-2 py-1.5 text-sm font-mono w-20"
                  onKeyDown={(e) => e.key === "Enter" && mapSet()}
                />
                <Button onClick={mapSet} size="sm" disabled={!mapKey.trim()}>
                  <Plus className="h-4 w-4 mr-1" />
                  Set
                </Button>
                <Button onClick={sortByValue} variant="outline" size="sm">
                  Sort by Value
                </Button>
              </div>

              {/* Map visual */}
              <div className="w-full max-w-xs">
                <div className="font-mono text-sm text-muted-foreground mb-1">
                  Map ({mapEntries.length} entries)
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-[1fr_auto_1fr_auto] gap-0 text-xs font-mono">
                    <div className="bg-muted p-2 font-semibold text-center">
                      Key
                    </div>
                    <div className="bg-muted" />
                    <div className="bg-muted p-2 font-semibold text-center">
                      Value
                    </div>
                    <div className="bg-muted p-2" />
                    <AnimatePresence mode="popLayout">
                      {mapEntries.map((entry) => (
                        <motion.div
                          key={entry.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="col-span-4 grid grid-cols-[1fr_auto_1fr_auto] border-t group"
                        >
                          <div className="p-2 text-center text-primary font-medium">
                            {entry.key}
                          </div>
                          <div className="p-2 text-muted-foreground">=&gt;</div>
                          <div className="p-2 text-center text-emerald-600 dark:text-emerald-400">
                            {entry.value}
                          </div>
                          <button
                            onClick={() => mapDelete(entry.key)}
                            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Set controls */}
              <div className="flex items-center gap-3">
                <Button onClick={findIntersection} size="sm">
                  <Search className="h-4 w-4 mr-1" />
                  Find Intersection
                </Button>
              </div>

              {/* Sets visual */}
              <div className="flex gap-4 flex-wrap justify-center">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    Set A
                  </div>
                  <div className="flex gap-1 flex-wrap justify-center">
                    {setA.map((val) => {
                      const inBoth = intersection?.includes(val);
                      return (
                        <motion.div
                          key={val}
                          animate={{
                            scale: inBoth ? 1.1 : 1,
                          }}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm border-2 transition-colors ${
                            inBoth
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary text-secondary-foreground border-secondary"
                          }`}
                        >
                          {val}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    Set B
                  </div>
                  <div className="flex gap-1 flex-wrap justify-center">
                    {setB.map((val) => {
                      const inBoth = intersection?.includes(val);
                      return (
                        <motion.div
                          key={val}
                          animate={{
                            scale: inBoth ? 1.1 : 1,
                          }}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm border-2 transition-colors ${
                            inBoth
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-secondary text-secondary-foreground border-secondary"
                          }`}
                        >
                          {val}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {intersection && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="text-xs text-muted-foreground font-mono mb-1">
                    Intersection (A ∩ B)
                  </div>
                  <div className="flex gap-1 justify-center">
                    {intersection.map((val) => (
                      <div
                        key={val}
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm bg-primary text-primary-foreground border-2 border-primary"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}

          {lastAction && (
            <motion.p
              key={lastAction}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground"
            >
              {lastAction}
            </motion.p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
