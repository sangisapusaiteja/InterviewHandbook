"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sortedArray = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 81, 95];

export function SearchingVisualization() {
  const [target, setTarget] = useState(23);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [found, setFound] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);
  const [method, setMethod] = useState<"linear" | "binary">("binary");
  const [steps, setSteps] = useState(0);
  const stopRef = useRef(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const linearSearch = useCallback(async () => {
    setSteps(0);
    for (let i = 0; i < sortedArray.length; i++) {
      if (stopRef.current) return;
      setCurrentIndex(i);
      setSteps((s) => s + 1);
      await sleep(400);

      if (sortedArray[i] === target) {
        setFound(i);
        return;
      }
    }
    setFound(-1);
  }, [target]);

  const binarySearch = useCallback(async () => {
    let lo = 0;
    let hi = sortedArray.length - 1;
    setSteps(0);

    while (lo <= hi) {
      if (stopRef.current) return;
      setLow(lo);
      setHigh(hi);
      const mid = Math.floor((lo + hi) / 2);
      setCurrentIndex(mid);
      setSteps((s) => s + 1);
      await sleep(600);

      if (sortedArray[mid] === target) {
        setFound(mid);
        return;
      } else if (sortedArray[mid] < target) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    setFound(-1);
  }, [target]);

  const startSearch = async () => {
    stopRef.current = false;
    setSearching(true);
    setFound(null);
    setCurrentIndex(null);
    setLow(null);
    setHigh(null);

    if (method === "linear") {
      await linearSearch();
    } else {
      await binarySearch();
    }

    setSearching(false);
  };

  const reset = () => {
    stopRef.current = true;
    setSearching(false);
    setCurrentIndex(null);
    setLow(null);
    setHigh(null);
    setFound(null);
    setSteps(0);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg">Searching Visualization</CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant={method === "linear" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => !searching && setMethod("linear")}
            >
              Linear
            </Badge>
            <Badge
              variant={method === "binary" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => !searching && setMethod("binary")}
            >
              Binary
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Target selector */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Target:</span>
              <select
                value={target}
                onChange={(e) => {
                  reset();
                  setTarget(Number(e.target.value));
                }}
                className="rounded-md border bg-background px-2 py-1 text-sm"
                disabled={searching}
              >
                {sortedArray.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
                <option value={99}>99 (not in array)</option>
              </select>
            </div>
            <Button onClick={startSearch} size="sm" disabled={searching}>
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>

          {/* Array visual */}
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {sortedArray.map((val, index) => {
              const isCurrent = currentIndex === index;
              const isFound = found === index;
              const inRange =
                method === "binary" &&
                low !== null &&
                high !== null &&
                index >= low &&
                index <= high;
              const outOfRange =
                method === "binary" && low !== null && high !== null && !inRange;

              return (
                <motion.div
                  key={index}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    opacity: outOfRange ? 0.3 : 1,
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono font-bold text-sm border-2 transition-colors ${
                      isFound
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : isCurrent
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-secondary-foreground border-secondary"
                    }`}
                  >
                    {val}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    [{index}]
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Status */}
          <div className="text-sm text-center space-y-1">
            <p className="text-muted-foreground">Steps taken: {steps}</p>
            {found !== null && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  found >= 0
                    ? "text-emerald-500 font-medium"
                    : "text-destructive font-medium"
                }
              >
                {found >= 0
                  ? `Found ${target} at index ${found}!`
                  : `${target} not found in array`}
              </motion.p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
