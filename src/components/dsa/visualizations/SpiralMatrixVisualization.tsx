"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Cell state ────────────────────────────────────────────────────────────
type CellState = "idle" | "current" | "visited";

// ─── Grid Diagram ─────────────────────────────────────────────────────────
function GridDiagram({
  grid,
  states,
  currentRow,
  currentCol,
  visitOrder,
  direction,
}: {
  grid: number[][];
  states: CellState[][];
  currentRow: number;
  currentCol: number;
  visitOrder: number[][];
  direction: string;
}) {
  const colorMap: Record<CellState, string> = {
    idle: "transparent",
    current: "#eab308",
    visited: "#22c55e",
  };

  const dirArrow: Record<string, string> = {
    right: "→",
    down: "↓",
    left: "←",
    up: "↑",
  };

  return (
    <div className="flex flex-col items-center py-2 gap-3">
      <div className="flex items-center gap-2">
        <p className="text-[10px] text-muted-foreground text-center font-semibold">
          Matrix
        </p>
        {direction && (
          <motion.span
            key={direction}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-lg font-bold text-yellow-500"
          >
            {dirArrow[direction] || ""}
          </motion.span>
        )}
      </div>
      {grid.map((row, r) => (
        <div key={r} className="flex gap-1">
          {row.map((val, c) => {
            const state = states[r]?.[c] ?? "idle";
            const isActive = r === currentRow && c === currentCol;
            const order = visitOrder[r]?.[c] ?? -1;
            return (
              <motion.div
                key={`${r}-${c}`}
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isActive ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 flex flex-col items-center justify-center rounded-md border-2 border-border font-mono text-sm font-bold relative"
              >
                <span>{val}</span>
                {order >= 0 && (
                  <span className="text-[8px] text-muted-foreground absolute bottom-0.5 right-1">
                    #{order + 1}
                  </span>
                )}
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
  visitOrder: number[][];
  direction: string;
  result: number[];
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(gridInput: string): {
  grid: number[][];
  steps: Step[];
  result: number[];
} {
  const rows = gridInput.split(";").map((row) =>
    row
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !isNaN(n))
  );
  const grid = rows.length && rows[0].length ? rows : [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

  const R = grid.length;
  const C = grid[0].length;
  const steps: Step[] = [];
  const stateGrid: CellState[][] = grid.map((r) => r.map(() => "idle"));
  const orderGrid: number[][] = grid.map((r) => r.map(() => -1));

  const result: number[] = [];
  let top = 0, bottom = R - 1, left = 0, right = C - 1;
  let orderCount = 0;

  while (top <= bottom && left <= right) {
    // Right
    for (let c = left; c <= right; c++) {
      const snap = stateGrid.map((r) => [...r]);
      snap[top][c] = "current";
      orderGrid[top][c] = orderCount;
      result.push(grid[top][c]);
      steps.push({
        states: snap,
        currentRow: top,
        currentCol: c,
        visitOrder: orderGrid.map((r) => [...r]),
        direction: "right",
        result: [...result],
        output: `→ Visit (${top},${c}) = ${grid[top][c]} [step ${orderCount + 1}]`,
      });
      stateGrid[top][c] = "visited";
      orderCount++;
    }
    top++;

    // Down
    for (let r = top; r <= bottom; r++) {
      const snap = stateGrid.map((row) => [...row]);
      snap[r][right] = "current";
      orderGrid[r][right] = orderCount;
      result.push(grid[r][right]);
      steps.push({
        states: snap,
        currentRow: r,
        currentCol: right,
        visitOrder: orderGrid.map((row) => [...row]),
        direction: "down",
        result: [...result],
        output: `↓ Visit (${r},${right}) = ${grid[r][right]} [step ${orderCount + 1}]`,
      });
      stateGrid[r][right] = "visited";
      orderCount++;
    }
    right--;

    // Left
    if (top <= bottom) {
      for (let c = right; c >= left; c--) {
        const snap = stateGrid.map((row) => [...row]);
        snap[bottom][c] = "current";
        orderGrid[bottom][c] = orderCount;
        result.push(grid[bottom][c]);
        steps.push({
          states: snap,
          currentRow: bottom,
          currentCol: c,
          visitOrder: orderGrid.map((row) => [...row]),
          direction: "left",
          result: [...result],
          output: `← Visit (${bottom},${c}) = ${grid[bottom][c]} [step ${orderCount + 1}]`,
        });
        stateGrid[bottom][c] = "visited";
        orderCount++;
      }
      bottom--;
    }

    // Up
    if (left <= right) {
      for (let r = bottom; r >= top; r--) {
        const snap = stateGrid.map((row) => [...row]);
        snap[r][left] = "current";
        orderGrid[r][left] = orderCount;
        result.push(grid[r][left]);
        steps.push({
          states: snap,
          currentRow: r,
          currentCol: left,
          visitOrder: orderGrid.map((row) => [...row]),
          direction: "up",
          result: [...result],
          output: `↑ Visit (${r},${left}) = ${grid[r][left]} [step ${orderCount + 1}]`,
        });
        stateGrid[r][left] = "visited";
        orderCount++;
      }
      left++;
    }
  }

  // Final step
  steps.push({
    states: stateGrid.map((r) => [...r]),
    currentRow: -1,
    currentCol: -1,
    visitOrder: orderGrid.map((r) => [...r]),
    direction: "",
    result: [...result],
    output: `Spiral order: [${result.join(", ")}]`,
  });

  return { grid, steps, result };
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
export function SpiralMatrixVisualization() {
  const [gridInput, setGridInput] = useState("1,2,3;4,5,6;7,8,9");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [grid, setGrid] = useState<number[][]>([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
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
      `Spiral order: [${result.result.join(", ")}]`,
      `Matrix size: ${result.grid.length} x ${result.grid[0].length}`,
    ]);
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 500));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Spiral Matrix</CardTitle>
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
                Matrix (semicolon-separated rows)
              </p>
              <input
                value={gridInput}
                onChange={(e) => {
                  setGridInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 1,2,3;4,5,6;7,8,9"
              />
            </div>

            <Button
              size="sm"
              onClick={handleRun}
              disabled={running}
              className="w-full"
            >
              <Play className="h-3.5 w-3.5 mr-1" />
              {running ? "Spiraling..." : "Run"}
            </Button>

            <div className="rounded-lg border bg-muted/20 px-3 py-2 text-xs leading-relaxed space-y-1">
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}visited cell
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}current cell
              </p>
              <p className="text-muted-foreground">
                Direction arrows show spiral path: → ↓ ← ↑
              </p>
              <p className="text-muted-foreground">
                Numbers in bottom-right show visit order
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

            {curStep && curStep.result.length > 0 && (
              <div className="rounded-lg border bg-muted/30 px-3 py-2 text-xs font-mono">
                Result: [{curStep.result.join(", ")}]
              </div>
            )}
          </div>

          {/* Right: code + output */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                Code
              </p>
              <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
{`function spiralOrder(matrix) {
  const result = [];
  let top=0, bottom=matrix.length-1;
  let left=0, right=matrix[0].length-1;
  while (top<=bottom && left<=right) {
    for (let c=left; c<=right; c++)
      result.push(matrix[top][c]);
    top++;
    for (let r=top; r<=bottom; r++)
      result.push(matrix[r][right]);
    right--;
    if (top<=bottom)
      for (let c=right; c>=left; c--)
        result.push(matrix[bottom][c]);
    bottom--;
    if (left<=right)
      for (let r=bottom; r>=top; r--)
        result.push(matrix[r][left]);
    left++;
  }
  return result;
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
              visitOrder={curStep.visitOrder}
              direction={curStep.direction}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you are mowing a rectangular lawn in a spiral pattern. You
            start at the top-left corner and mow along the <strong>top edge</strong>,
            then turn and mow <strong>down the right side</strong>, then
            <strong> across the bottom</strong>, then <strong>up the left side</strong>.
            Each lap shrinks the unmowed rectangle. You keep spiraling inward
            until every strip of grass is cut — that is exactly how this
            algorithm peels layers off the matrix.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
