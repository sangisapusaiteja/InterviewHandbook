"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "filling" | "filled" | "unchanged";

// ─── Grid Diagram ─────────────────────────────────────────────────────────
function GridDiagram({
  grid,
  states,
  currentRow,
  currentCol,
}: {
  grid: number[][];
  states: CellState[][];
  currentRow: number;
  currentCol: number;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    filling: "#eab308",
    filled: "#22c55e",
    unchanged: "#9ca3af",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-1">
      <p className="text-[10px] text-muted-foreground mb-1 text-center font-semibold">
        Grid
      </p>
      {grid.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((val, c) => {
            const state = states[r]?.[c] ?? "idle";
            const isActive = r === currentRow && c === currentCol;
            return (
              <motion.div
                key={`${r}-${c}`}
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isActive ? 1.2 : 1,
                  borderColor: isActive ? "#eab308" : undefined,
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 flex items-center justify-center rounded-md border-2 border-border font-mono text-sm font-bold"
              >
                {val}
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
  grid: number[][];
  states: CellState[][];
  currentRow: number;
  currentCol: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(
  gridInput: string,
  sr: number,
  sc: number,
  newColor: number
): { grid: number[][]; steps: Step[] } {
  const rows = gridInput.split(";").map((row) =>
    row
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n))
  );
  const grid = rows.length && rows[0].length ? rows : [[1, 1, 1], [1, 1, 0], [1, 0, 1]];

  const R = grid.length;
  const C = grid[0].length;
  const startRow = Math.min(sr, R - 1);
  const startCol = Math.min(sc, C - 1);
  const originalColor = grid[startRow][startCol];

  const steps: Step[] = [];
  const workGrid = grid.map((r) => [...r]);
  const stateGrid: CellState[][] = grid.map((r) => r.map(() => "idle"));

  if (originalColor === newColor) {
    steps.push({
      grid: workGrid.map((r) => [...r]),
      states: stateGrid.map((r) => [...r]),
      currentRow: startRow,
      currentCol: startCol,
      output: `Original color equals new color (${newColor}). No change needed.`,
    });
    return { grid, steps };
  }

  // BFS
  const queue: [number, number][] = [[startRow, startCol]];
  const visited = new Set<string>();
  visited.add(`${startRow},${startCol}`);

  // Initial step
  stateGrid[startRow][startCol] = "filling";
  steps.push({
    grid: workGrid.map((r) => [...r]),
    states: stateGrid.map((r) => [...r]),
    currentRow: startRow,
    currentCol: startCol,
    output: `Start BFS at (${startRow},${startCol}), original color=${originalColor}, new color=${newColor}`,
  });

  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;

    // Fill the cell
    workGrid[r][c] = newColor;
    stateGrid[r][c] = "filled";

    steps.push({
      grid: workGrid.map((row) => [...row]),
      states: stateGrid.map((row) => [...row]),
      currentRow: r,
      currentCol: c,
      output: `Fill (${r},${c}): ${originalColor} -> ${newColor}`,
    });

    // Explore neighbors
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < R &&
        nc >= 0 &&
        nc < C &&
        !visited.has(`${nr},${nc}`) &&
        workGrid[nr][nc] === originalColor
      ) {
        visited.add(`${nr},${nc}`);
        queue.push([nr, nc]);
        stateGrid[nr][nc] = "filling";
        steps.push({
          grid: workGrid.map((row) => [...row]),
          states: stateGrid.map((row) => [...row]),
          currentRow: nr,
          currentCol: nc,
          output: `Queue neighbor (${nr},${nc}) — color matches ${originalColor}`,
        });
      }
    }
  }

  // Mark unchanged cells
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (stateGrid[r][c] === "idle") {
        stateGrid[r][c] = "unchanged";
      }
    }
  }

  steps.push({
    grid: workGrid.map((row) => [...row]),
    states: stateGrid.map((row) => [...row]),
    currentRow: -1,
    currentCol: -1,
    output: `Flood fill complete! All connected pixels filled with ${newColor}.`,
  });

  return { grid, steps };
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
export function FloodFillVisualization() {
  const [gridInput, setGridInput] = useState("1,1,1;1,1,0;1,0,1");
  const [srInput, setSrInput] = useState("1");
  const [scInput, setScInput] = useState("1");
  const [colorInput, setColorInput] = useState("2");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
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
    const sr = Number(srInput) || 0;
    const sc = Number(scInput) || 0;
    const newColor = Number(colorInput) || 2;
    const result = buildSteps(gridInput, sr, sc, newColor);
    setSteps(result.steps);
    setOutput([
      `Flood fill from (${sr},${sc}) with color ${newColor}`,
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
        <CardTitle className="text-lg">Flood Fill</CardTitle>
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
                Grid (semicolon-separated rows)
              </p>
              <input
                value={gridInput}
                onChange={(e) => {
                  setGridInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1,1,1;1,1,0;1,0,1"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">sr</p>
                <input
                  value={srInput}
                  onChange={(e) => { setSrInput(e.target.value); clear(); }}
                  className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                  placeholder="1"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">sc</p>
                <input
                  value={scInput}
                  onChange={(e) => { setScInput(e.target.value); clear(); }}
                  className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                  placeholder="1"
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-muted-foreground">color</p>
                <input
                  value={colorInput}
                  onChange={(e) => { setColorInput(e.target.value); clear(); }}
                  className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                  placeholder="2"
                />
              </div>
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Filling..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Currently Filling
                </span>
                {" — "}cell queued for fill
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Filled
                </span>
                {" — "}cell color changed
              </p>
              <p>
                <span className="font-semibold text-gray-500 dark:text-gray-400">
                  Unchanged
                </span>
                {" — "}different color, not affected
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
{`function floodFill(image, sr, sc, color) {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const queue = [[sr, sc]];
  while (queue.length) {
    const [r, c] = queue.shift();
    if (image[r][c] !== orig) continue;
    image[r][c] = color;
    for (const [dr,dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nr = r+dr, nc = c+dc;
      if (nr>=0 && nr<image.length &&
          nc>=0 && nc<image[0].length)
        queue.push([nr, nc]);
    }
  }
  return image;
}
// floodFill(grid, ${srInput}, ${scInput}, ${colorInput})`}
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
              grid={curStep.grid}
              states={curStep.states}
              currentRow={curStep.currentRow}
              currentCol={curStep.currentCol}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Think of flood fill like pouring paint on a tile floor. You drop
            paint on one tile, and it spreads to every adjacent tile that has
            the <strong>same original color</strong>. Tiles with a different
            color act as walls that stop the paint from spreading. The paint
            keeps flowing outward until every reachable same-colored tile is
            covered — just like the bucket-fill tool in a drawing app.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
