"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current" | "counted" | "water";

// ─── Grid Diagram ─────────────────────────────────────────────────────────
function GridDiagram({
  grid,
  states,
  currentRow,
  currentCol,
  edgeCount,
  edgeHighlights,
}: {
  grid: number[][];
  states: CellState[][];
  currentRow: number;
  currentCol: number;
  edgeCount: number;
  edgeHighlights: { r: number; c: number; side: string }[];
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    counted: "#22c55e",
    water: "#3b82f6",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-3">
      <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
        Grid — Perimeter: {edgeCount}
      </p>
      {grid.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((val, c) => {
            const state = states[r]?.[c] ?? "idle";
            const isActive = r === currentRow && c === currentCol;
            const cellEdges = edgeHighlights.filter((e) => e.r === r && e.c === c);
            return (
              <motion.div
                key={`${r}-${c}`}
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-md border-2 font-mono text-sm font-bold relative"
                style={{
                  borderTopColor: cellEdges.some((e) => e.side === "top") ? "#ef4444" : undefined,
                  borderBottomColor: cellEdges.some((e) => e.side === "bottom") ? "#ef4444" : undefined,
                  borderLeftColor: cellEdges.some((e) => e.side === "left") ? "#ef4444" : undefined,
                  borderRightColor: cellEdges.some((e) => e.side === "right") ? "#ef4444" : undefined,
                  borderWidth: cellEdges.length > 0 ? "3px" : undefined,
                }}
              >
                {val === 1 ? "1" : "0"}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: CellState[][];
  currentRow: number;
  currentCol: number;
  edgeCount: number;
  edgeHighlights: { r: number; c: number; side: string }[];
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(gridInput: string): {
  grid: number[][];
  steps: Step[];
  perimeter: number;
} {
  const rows = gridInput.split(";").map((row) =>
    row
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n))
  );
  const grid = rows.length && rows[0].length
    ? rows
    : [[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]];

  const R = grid.length;
  const C = grid[0].length;
  const steps: Step[] = [];
  const stateGrid: CellState[][] = grid.map((r) =>
    r.map((v) => (v === 0 ? "water" : "idle"))
  );

  let perimeter = 0;
  const allEdges: { r: number; c: number; side: string }[] = [];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 1) {
        const snap = stateGrid.map((row) => [...row]);
        snap[r][c] = "current";

        // Count edges
        let cellEdges = 0;
        const cellEdgeList: { r: number; c: number; side: string }[] = [];

        if (r === 0 || grid[r - 1][c] === 0) { cellEdges++; cellEdgeList.push({ r, c, side: "top" }); }
        if (r === R - 1 || grid[r + 1][c] === 0) { cellEdges++; cellEdgeList.push({ r, c, side: "bottom" }); }
        if (c === 0 || grid[r][c - 1] === 0) { cellEdges++; cellEdgeList.push({ r, c, side: "left" }); }
        if (c === C - 1 || grid[r][c + 1] === 0) { cellEdges++; cellEdgeList.push({ r, c, side: "right" }); }

        perimeter += cellEdges;
        allEdges.push(...cellEdgeList);

        steps.push({
          states: snap,
          currentRow: r,
          currentCol: c,
          edgeCount: perimeter,
          edgeHighlights: [...allEdges],
          output: `(${r},${c}): ${cellEdges} exposed edge(s) [${cellEdgeList.map((e) => e.side).join(", ")}] — total perimeter = ${perimeter}`,
        });

        stateGrid[r][c] = "counted";
      }
    }
  }

  // Final step
  steps.push({
    states: stateGrid.map((row) => [...row]),
    currentRow: -1,
    currentCol: -1,
    edgeCount: perimeter,
    edgeHighlights: allEdges,
    output: `Done! Total perimeter = ${perimeter}`,
  });

  return { grid, steps, perimeter };
}

// ─── Console Output ────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px] overflow-auto"
        >
          {lines.map((line, i) => (
            <p key={i} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
              {line}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="ph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[52px] flex items-center justify-center"
        >
          <p className="text-xs text-muted-foreground italic">
            Click ▶ Run to see the visualization
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export function IslandPerimeterVisualization() {
  const [gridInput, setGridInput] = useState("0,1,0,0;1,1,1,0;0,1,0,0;1,1,0,0");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [grid, setGrid] = useState<number[][]>([[0, 1, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [1, 1, 0, 0]]);
  const [output, setOutput] = useState<string[] | null>(null);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const clear = () => {
    setStepIndex(-1);
    setSteps([]);
    setOutput(null);
    setRunning(false);
    setHasRun(false);
  };

  const handleRun = async () => {
    if (running) return;
    const result = buildSteps(gridInput);
    setGrid(result.grid);
    setSteps(result.steps);
    setOutput([
      `Island perimeter: ${result.perimeter}`,
      `Grid size: ${result.grid.length} x ${result.grid[0].length}`,
    ]);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 600));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Island Perimeter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Visualization
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left: inputs + legend */}
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-muted-foreground">
                Grid (semicolon-separated rows of 0s and 1s)
              </p>
              <input
                value={gridInput}
                onChange={(e) => {
                  setGridInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 0,1,0,0;1,1,1,0;0,1,0,0;1,1,0,0"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Scanning..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}land cell (counted)
              </p>
              <p>
                <span className="font-semibold text-blue-500 dark:text-blue-400">
                  Blue
                </span>
                {" — "}water cell
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}current cell being checked
              </p>
              <p>
                <span className="font-semibold text-red-500 dark:text-red-400">
                  Red Border
                </span>
                {" — "}exposed edge (contributes to perimeter)
              </p>
            </div>

            {curStep && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={curStep.output}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs"
                >
                  {curStep.output}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Right: code + output */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                Code
              </p>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
{`function islandPerimeter(grid) {
  let perimeter = 0;
  const R = grid.length, C = grid[0].length;
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] === 1) {
        if (r===0 || grid[r-1][c]===0) perimeter++;
        if (r===R-1 || grid[r+1][c]===0) perimeter++;
        if (c===0 || grid[r][c-1]===0) perimeter++;
        if (c===C-1 || grid[r][c+1]===0) perimeter++;
      }
    }
  }
  return perimeter;
}`}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                Output
              </p>
              <ConsoleOutput lines={output} />
            </div>
          </div>
        </div>

        {/* Diagram */}
        {hasRun && curStep && (
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground">
                Diagram
                {stepIndex >= 0 && (
                  <span className="ml-2 font-normal">
                    — Step {stepIndex + 1} / {steps.length}
                  </span>
                )}
              </p>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-2 text-xs"
                onClick={clear}
              >
                <RotateCcw className="h-3 w-3 mr-1" /> Reset
              </Button>
            </div>
            <GridDiagram
              grid={grid}
              states={curStep.states}
              currentRow={curStep.currentRow}
              currentCol={curStep.currentCol}
              edgeCount={curStep.edgeCount}
              edgeHighlights={curStep.edgeHighlights}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you are building a fence around a group of connected garden
            plots. Each plot is a square tile, and you only need fencing on
            sides that face <strong>water</strong> (empty space) or the
            <strong> edge of the map</strong>. Where two land plots share a
            border, no fence is needed — they are already connected. Walk
            through each plot, count its exposed sides, and you have your
            total fence length: the island&apos;s perimeter.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
