"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── Bar state ─────────────────────────────────────────────────────────────
type BarState = "idle" | "checking" | "min" | "sell" | "best-buy" | "best-sell" | "skipped";

// ─── Price Chart ───────────────────────────────────────────────────────────
function PriceChart({
  prices,
  states,
  currentIndex,
  minPrice,
  maxProfit,
  buyDay,
  sellDay,
}: {
  prices: number[];
  states: BarState[];
  currentIndex: number;
  minPrice: number | null;
  maxProfit: number;
  buyDay: number;
  sellDay: number;
}) {
  const maxVal = Math.max(...prices, 1);

  const colorMap: Record<BarState, string> = {
    idle: "#6b7280",
    checking: "#eab308",
    min: "#3b82f6",
    sell: "#22c55e",
    "best-buy": "#3b82f6",
    "best-sell": "#22c55e",
    skipped: "#374151",
  };

  return (
    <div className="flex flex-col items-center py-2">
      <div className="flex gap-1.5 items-end flex-wrap justify-center" style={{ minHeight: 120 }}>
        {prices.map((price, i) => {
          const state = states[i] ?? "idle";
          const height = Math.max((price / maxVal) * 100, 8);
          const isActive = i === currentIndex;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] font-mono font-bold"
                style={{ color: colorMap[state] }}
              >
                {price}
              </motion.span>
              <motion.div
                animate={{
                  backgroundColor: colorMap[state],
                  scale: isActive ? 1.1 : 1,
                  opacity: state === "skipped" ? 0.3 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="rounded-t-md"
                style={{ width: 28, height }}
              />
              <span className="text-[10px] text-muted-foreground">d{i}</span>
              {(i === buyDay && maxProfit > 0) && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] font-bold text-blue-500"
                >
                  BUY
                </motion.span>
              )}
              {(i === sellDay && maxProfit > 0) && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[9px] font-bold text-emerald-500"
                >
                  SELL
                </motion.span>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-3">
        {minPrice !== null && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-xs font-semibold font-mono"
          >
            Min Price = {minPrice}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold font-mono"
        >
          Max Profit = {maxProfit}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Step interface ────────────────────────────────────────────────────────
interface Step {
  states: BarState[];
  currentIndex: number;
  minPrice: number;
  maxProfit: number;
  buyDay: number;
  sellDay: number;
  output: string;
}

// ─── Build steps ───────────────────────────────────────────────────────────
function buildSteps(input: string): {
  prices: number[];
  steps: Step[];
  finalProfit: number;
  finalBuyDay: number;
  finalSellDay: number;
} {
  const nums = input
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => !isNaN(n));
  const prices = nums.length ? nums : [7, 1, 5, 3, 6, 4];

  const steps: Step[] = [];
  let minPrice = prices[0];
  let maxProfit = 0;
  let buyDay = 0;
  let sellDay = 0;
  let minDay = 0;

  // First day
  const firstStates: BarState[] = Array(prices.length).fill("idle");
  firstStates[0] = "min";
  steps.push({
    states: [...firstStates],
    currentIndex: 0,
    minPrice,
    maxProfit: 0,
    buyDay: -1,
    sellDay: -1,
    output: `Day 0: price=${prices[0]} → set minPrice=${prices[0]}`,
  });

  for (let i = 1; i < prices.length; i++) {
    const stateSnap: BarState[] = prices.map((_, idx) => {
      if (idx === minDay) return "min" as BarState;
      if (idx < i) return "skipped" as BarState;
      return "idle" as BarState;
    });

    if (prices[i] < minPrice) {
      minPrice = prices[i];
      minDay = i;
      stateSnap[i] = "min";
      // Update previous min to skipped
      for (let j = 0; j < i; j++) {
        if (stateSnap[j] === "min") stateSnap[j] = "skipped";
      }
      stateSnap[i] = "min";
      if (buyDay >= 0 && sellDay >= 0 && maxProfit > 0) {
        stateSnap[buyDay] = "best-buy";
        stateSnap[sellDay] = "best-sell";
      }
      steps.push({
        states: [...stateSnap],
        currentIndex: i,
        minPrice,
        maxProfit,
        buyDay,
        sellDay,
        output: `Day ${i}: price=${prices[i]} < minPrice → new minPrice=${prices[i]}`,
      });
    } else {
      const profit = prices[i] - minPrice;
      stateSnap[i] = "checking";
      if (profit > maxProfit) {
        maxProfit = profit;
        buyDay = minDay;
        sellDay = i;
        stateSnap[i] = "sell";
        stateSnap[minDay] = "best-buy";
        steps.push({
          states: [...stateSnap],
          currentIndex: i,
          minPrice,
          maxProfit,
          buyDay,
          sellDay,
          output: `Day ${i}: price=${prices[i]} - min=${minPrice} = ${profit} → new best profit!`,
        });
      } else {
        if (buyDay >= 0 && sellDay >= 0 && maxProfit > 0) {
          stateSnap[buyDay] = "best-buy";
          stateSnap[sellDay] = "best-sell";
        }
        steps.push({
          states: [...stateSnap],
          currentIndex: i,
          minPrice,
          maxProfit,
          buyDay,
          sellDay,
          output: `Day ${i}: price=${prices[i]} - min=${minPrice} = ${profit} ≤ best ${maxProfit}`,
        });
      }
    }
  }

  return { prices, steps, finalProfit: maxProfit, finalBuyDay: buyDay, finalSellDay: sellDay };
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
export function BuyAndSellStockVisualization() {
  const [input, setInput] = useState("7,1,5,3,6,4");
  const [stepIndex, setStepIndex] = useState(-1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [prices, setPrices] = useState<number[]>([7, 1, 5, 3, 6, 4]);
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
    const result = buildSteps(input);
    setPrices(result.prices);
    setSteps(result.steps);
    setOutput(
      result.finalProfit > 0
        ? [
            `Max Profit: ${result.finalProfit}`,
            `Buy on day ${result.finalBuyDay} (price=${result.prices[result.finalBuyDay]}), Sell on day ${result.finalSellDay} (price=${result.prices[result.finalSellDay]})`,
          ]
        : [`Max Profit: 0 (prices only decline, don't buy)`]
    );
    setHasRun(true);
    setRunning(true);
    for (let i = 0; i < result.steps.length; i++) {
      await new Promise<void>((res) => setTimeout(res, 700));
      setStepIndex(i);
    }
    setRunning(false);
  };

  const curStep = stepIndex >= 0 ? steps[stepIndex] : null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Best Time to Buy and Sell Stock</CardTitle>
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
                Prices (comma-separated)
              </p>
              <input
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  clear();
                }}
                className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
                placeholder="e.g. 7,1,5,3,6,4"
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
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Blue
                </span>
                {" — "}minimum price (best buy day)
              </p>
              <p>
                <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                  Yellow
                </span>
                {" — "}currently checking
              </p>
              <p>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Green
                </span>
                {" — "}best sell day
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Gray
                </span>
                {" — "}already scanned
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
{`function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else {
      const profit = prices[i] - minPrice;
      if (profit > maxProfit)
        maxProfit = profit;
    }
  }
  return maxProfit;
}
console.log(maxProfit([${prices.join(", ")}]));`}
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

        {/* Chart */}
        {hasRun && curStep && (
          <div className="rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground">
                Price Chart
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
            <PriceChart
              prices={prices}
              states={curStep.states}
              currentIndex={curStep.currentIndex}
              minPrice={curStep.minPrice}
              maxProfit={curStep.maxProfit}
              buyDay={curStep.buyDay}
              sellDay={curStep.sellDay}
            />
          </div>
        )}

        {/* Analogy */}
        <div className="rounded-xl border bg-amber-500/5 border-amber-500/20 p-4 space-y-2">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
            Real-Life Analogy
          </p>
          <p className="text-sm leading-relaxed">
            Imagine you have a time machine but can only use it once. You look at a
            stock&apos;s price chart and slide your finger from left to right. Your{" "}
            <strong>left eye</strong> remembers the lowest price seen so far — the
            best day to have bought. Your <strong>right eye</strong> looks at
            today&apos;s price and calculates: &quot;If I bought at that lowest
            point and sold today, how much would I make?&quot; You keep a mental
            note of the best profit. By the end, you know the perfect buy-sell pair
            — one smooth scan, no sorting needed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
