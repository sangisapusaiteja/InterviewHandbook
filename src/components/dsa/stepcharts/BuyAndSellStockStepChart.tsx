"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartRow {
  step: number;
  i: number;
  pricesAtI: number;
  minPriceBefore: number;
  minPrice: number;
  profit: number | null;
  maxProfitBefore: number;
  maxProfit: number;
  decision: string;
  reason: string;
  buySell: string;
}

function buildRows(input: string): {
  prices: number[];
  rows: ChartRow[];
  maxProfit: number;
  buyDay: number;
  sellDay: number;
} {
  const parsed = input
    .split(",")
    .map((chunk) => Number(chunk.trim()))
    .filter((value) => !Number.isNaN(value));
  const prices = parsed.length > 0 ? parsed : [7, 1, 5, 3, 6, 4];

  let minPrice = Infinity;
  let minDay = -1;
  let maxProfit = 0;
  let buyDay = -1;
  let sellDay = -1;
  const rows: ChartRow[] = [];

  for (let i = 0; i < prices.length; i++) {
    const pricesAtI = prices[i];
    const minPriceBefore = minPrice;
    const maxProfitBefore = maxProfit;

    if (pricesAtI < minPrice) {
      minPrice = pricesAtI;
      minDay = i;
      rows.push({
        step: i + 1,
        i,
        pricesAtI,
        minPriceBefore,
        minPrice,
        profit: null,
        maxProfitBefore,
        maxProfit,
        decision: "update minPrice",
        reason:
          minPriceBefore === Infinity
            ? `This is the first price, so minPrice starts here.`
            : `prices[i] is smaller than the old minPrice, so it becomes the new buy candidate.`,
        buySell:
          maxProfit > 0 && buyDay >= 0 && sellDay >= 0
            ? `buy d${buyDay}, sell d${sellDay}`
            : "no trade yet",
      });
    } else {
      const profit = pricesAtI - minPrice;

      if (profit > maxProfit) {
        maxProfit = profit;
        buyDay = minDay;
        sellDay = i;
        rows.push({
          step: i + 1,
          i,
          pricesAtI,
          minPriceBefore,
          minPrice,
          profit,
          maxProfitBefore,
          maxProfit,
          decision: "update maxProfit",
          reason: `profit = prices[i] - minPrice = ${pricesAtI} - ${minPrice} = ${profit}, which beats the previous best ${maxProfitBefore}.`,
          buySell: `buy d${buyDay}, sell d${sellDay}`,
        });
      } else {
        rows.push({
          step: i + 1,
          i,
          pricesAtI,
          minPriceBefore,
          minPrice,
          profit,
          maxProfitBefore,
          maxProfit,
          decision: "keep maxProfit",
          reason: `profit = ${profit} does not beat maxProfit = ${maxProfitBefore}.`,
          buySell:
            maxProfit > 0 && buyDay >= 0 && sellDay >= 0
              ? `buy d${buyDay}, sell d${sellDay}`
              : "no trade yet",
        });
      }
    }
  }

  return { prices, rows, maxProfit, buyDay, sellDay };
}

export function BuyAndSellStockStepChart() {
  const [input, setInput] = useState("7,1,5,3,6,4");

  const { prices, rows, maxProfit, buyDay, sellDay } = useMemo(
    () => buildRows(input),
    [input]
  );

  const reset = () => {
    setInput("7,1,5,3,6,4");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Step-by-Step Chart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Prices (comma-separated)
            </p>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 7,1,5,3,6,4"
            />
          </div>

          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Reset Example
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              prices
            </p>
            <p className="mt-1 font-mono text-sm">[{prices.join(", ")}]</p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              minPrice
            </p>
            <p className="mt-1 font-mono text-sm">{rows.length > 0 ? rows[rows.length - 1].minPrice : "-"}</p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              maxProfit
            </p>
            <p className="mt-1 font-mono text-sm">{maxProfit}</p>
          </div>
          <div className="rounded-xl border bg-emerald-500/10 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              buy / sell
            </p>
            <p className="mt-1 font-mono text-sm">
              {buyDay >= 0 && sellDay >= 0 ? `d${buyDay} -> d${sellDay}` : "-"}
            </p>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {rows.map((row) => (
            <div
              key={`${row.step}-${row.i}`}
              className={`rounded-xl border p-4 text-xs ${
                row.decision === "update maxProfit"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : row.decision === "update minPrice"
                  ? "border-blue-500/30 bg-blue-500/5"
                  : "bg-background"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">Step {row.step}</span>
                <span className="font-mono">i = {row.i}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground">prices[i]</p>
                  <p className="font-mono">{row.pricesAtI}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">minPrice</p>
                  <p className="font-mono">
                    {row.minPriceBefore === Infinity ? "-" : row.minPriceBefore} -&gt; {row.minPrice}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">profit</p>
                  <p className="font-mono">{row.profit ?? "-"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">maxProfit</p>
                  <p className="font-mono">{row.maxProfitBefore} -&gt; {row.maxProfit}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-medium">{row.decision}</p>
                <p className="mt-1 text-muted-foreground">{row.reason}</p>
                <p className="mt-2 font-mono text-muted-foreground">{row.buySell}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border md:block">
          <div className="min-w-[1080px]">
            <div className="grid grid-cols-9 gap-3 bg-muted/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>Step</span>
              <span>i</span>
              <span>prices[i]</span>
              <span>minPrice before</span>
              <span>minPrice</span>
              <span>profit</span>
              <span>maxProfit</span>
              <span>Decision</span>
              <span>buy / sell</span>
            </div>

            {rows.map((row) => (
              <div
                key={`${row.step}-${row.i}`}
                className={`grid grid-cols-9 gap-3 border-t px-4 py-3 text-xs ${
                  row.decision === "update maxProfit"
                    ? "bg-emerald-500/5"
                    : row.decision === "update minPrice"
                    ? "bg-blue-500/5"
                    : "bg-background"
                }`}
              >
                <span className="font-mono">{row.step}</span>
                <span className="font-mono">{row.i}</span>
                <span className="font-mono">{row.pricesAtI}</span>
                <span className="font-mono">{row.minPriceBefore === Infinity ? "-" : row.minPriceBefore}</span>
                <span className="font-mono">{row.minPrice}</span>
                <span className="font-mono">{row.profit ?? "-"}</span>
                <span className="font-mono">{row.maxProfitBefore} -&gt; {row.maxProfit}</span>
                <div>
                  <p className="font-medium">{row.decision}</p>
                  <p className="mt-1 text-muted-foreground">{row.reason}</p>
                </div>
                <span className="font-mono break-all">{row.buySell}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Why This Works
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            As you move left to right, <code>minPrice</code> stores the cheapest price seen so far.
            At each index, compute <code>profit = prices[i] - minPrice</code>. If that profit beats
            <code> maxProfit </code>, update <code>maxProfit</code>. This finds the best single trade in one pass.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
