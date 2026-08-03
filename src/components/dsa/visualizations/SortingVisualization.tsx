"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function generateArray(): number[] {
  return Array.from({ length: 20 }, () => Math.floor(Math.random() * 90) + 10);
}

export function SortingVisualization() {
  const [array, setArray] = useState<number[]>(generateArray());
  const [sorting, setSorting] = useState(false);
  const [currentIndices, setCurrentIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<"bubble" | "selection">("bubble");
  const stopRef = useRef(false);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = useCallback(async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (stopRef.current) return;
        setCurrentIndices([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
        await sleep(50);
      }
      setSortedIndices((prev) => [...prev, n - 1 - i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setCurrentIndices([]);
  }, [array]);

  const selectionSort = useCallback(async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      if (stopRef.current) return;
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (stopRef.current) return;
        setCurrentIndices([minIdx, j]);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        await sleep(50);
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setCurrentIndices([]);
  }, [array]);

  const startSort = async () => {
    stopRef.current = false;
    setSorting(true);
    setSortedIndices([]);
    setCurrentIndices([]);

    if (algorithm === "bubble") {
      await bubbleSort();
    } else {
      await selectionSort();
    }

    setSorting(false);
  };

  const reset = () => {
    stopRef.current = true;
    setSorting(false);
    setArray(generateArray());
    setCurrentIndices([]);
    setSortedIndices([]);
  };

  const maxVal = Math.max(...array);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg">Sorting Visualization</CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant={algorithm === "bubble" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => !sorting && setAlgorithm("bubble")}
            >
              Bubble Sort
            </Badge>
            <Badge
              variant={algorithm === "selection" ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => !sorting && setAlgorithm("selection")}
            >
              Selection Sort
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button onClick={startSort} size="sm" disabled={sorting}>
              <Play className="h-4 w-4 mr-1" />
              Sort
            </Button>
            <Button onClick={reset} variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>

          {/* Bars */}
          <div className="flex items-end gap-[2px] h-[200px] w-full max-w-lg px-2">
            {array.map((val, index) => {
              const isActive = currentIndices.includes(index);
              const isSorted = sortedIndices.includes(index);

              return (
                <motion.div
                  key={index}
                  layout
                  className={`flex-1 rounded-t-sm transition-colors duration-150 ${
                    isActive
                      ? "bg-destructive"
                      : isSorted
                      ? "bg-emerald-500"
                      : "bg-primary/60"
                  }`}
                  style={{
                    height: `${(val / maxVal) * 100}%`,
                  }}
                  transition={{ duration: 0.05 }}
                />
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-primary/60" />
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-destructive" />
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span>Sorted</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
