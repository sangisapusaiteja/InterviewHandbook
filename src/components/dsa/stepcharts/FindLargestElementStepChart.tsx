"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartRow {
  step: number;
  i: number;
  numsAtI: number;
  frequencyBefore: number;
  frequency: number;
  threshold: number;
  decision: string;
  reason: string;
  mapSnapshot: string;
  isReturn: boolean;
}

function buildRows(input: string): { arr: number[]; rows: ChartRow[]; result: number } {
  const parsed = input
    .split(",")
    .map((chunk) => Number(chunk.trim()))
    .filter((value) => !Number.isNaN(value));
  const arr = parsed.length > 0 ? parsed : [2, 2, 1, 1, 1, 2, 2];

  const threshold = Math.floor(arr.length / 2);
  const map = new Map<number, number>();
  const rows: ChartRow[] = [];

  for (let i = 0; i < arr.length; i++) {
    const numsAtI = arr[i];
    const frequencyBefore = map.get(numsAtI) ?? 0;
    const frequency = frequencyBefore + 1;

    map.set(numsAtI, frequency);

    const isReturn = frequency > threshold;

    rows.push({
      step: i + 1,
      i,
      numsAtI,
      frequencyBefore,
      frequency,
      threshold,
      decision: isReturn ? `return ${numsAtI}` : "continue",
      reason: isReturn
        ? `frequency became ${frequency}, so it is greater than length / 2 = ${threshold}.`
        : `frequency is ${frequency}, so it has not crossed length / 2 = ${threshold} yet.`,
      mapSnapshot: Array.from(map.entries())
        .map(([key, count]) => `${key}:${count}`)
        .join(", "),
      isReturn,
    });

    if (isReturn) {
      return { arr, rows, result: numsAtI };
    }
  }

  return { arr, rows, result: arr[0] };
}

export function FindLargestElementStepChart() {
  const [input, setInput] = useState("2,2,1,1,1,2,2");
  const { arr, rows, result } = useMemo(() => buildRows(input), [input]);

  const reset = () => {
    setInput("2,2,1,1,1,2,2");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Step-by-Step Chart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Array (comma-separated)
            </p>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 2,2,1,1,1,2,2"
            />
          </div>
          <Button size="sm" variant="outline" onClick={reset} className="md:w-auto">
            <RotateCcw className="mr-1 h-3.5 w-3.5" />
            Reset Example
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              nums
            </p>
            <p className="mt-1 font-mono text-sm">[{arr.join(", ")}]</p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              length / 2
            </p>
            <p className="mt-1 font-mono text-sm">{Math.floor(arr.length / 2)}</p>
          </div>
          <div className="rounded-xl border bg-emerald-500/10 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              return
            </p>
            <p className="mt-1 font-mono text-sm">{result}</p>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {rows.map((row) => (
            <div
              key={`${row.step}-${row.i}`}
              className={`rounded-xl border p-4 text-xs ${
                row.isReturn ? "border-emerald-500/40 bg-emerald-500/10" : "bg-background"
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">Step {row.step}</span>
                <span className="font-mono">i = {row.i}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-muted-foreground">nums[i]</p>
                  <p className="font-mono">{row.numsAtI}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">frequency</p>
                  <p className="font-mono">{row.frequencyBefore} -&gt; {row.frequency}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">length / 2</p>
                  <p className="font-mono">{row.threshold}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">map</p>
                  <p className="font-mono break-all">{`{${row.mapSnapshot}}`}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className={`font-medium ${row.isReturn ? "text-emerald-700 dark:text-emerald-400" : ""}`}>
                  {row.decision}
                </p>
                <p className="mt-1 text-muted-foreground">{row.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border md:block">
          <div className="min-w-[920px]">
            <div className="grid grid-cols-9 gap-3 bg-muted/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>Step</span>
              <span>i</span>
              <span>nums[i]</span>
              <span>freq before</span>
              <span>frequency</span>
              <span>length / 2</span>
              <span className="col-span-2">Decision</span>
              <span>map</span>
            </div>

            {rows.map((row) => (
              <div
                key={`${row.step}-${row.i}`}
                className={`grid grid-cols-9 gap-3 border-t px-4 py-3 text-xs ${
                  row.isReturn ? "bg-emerald-500/10" : "bg-background"
                }`}
              >
                <span className="font-mono">{row.step}</span>
                <span className="font-mono">{row.i}</span>
                <span className="font-mono">{row.numsAtI}</span>
                <span className="font-mono">{row.frequencyBefore}</span>
                <span className="font-mono">{row.frequency}</span>
                <span className="font-mono">{row.threshold}</span>
                <div className="col-span-2">
                  <p className={`font-medium ${row.isReturn ? "text-emerald-700 dark:text-emerald-400" : ""}`}>
                    {row.decision}
                  </p>
                  <p className="mt-1 text-muted-foreground">{row.reason}</p>
                </div>
                <span className="font-mono break-all">{`{${row.mapSnapshot}}`}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Why This Works
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            We store how many times each number has appeared so far. After updating <code>frequency</code>,
            we immediately compare it with <code>length / 2</code>. The first value whose
            <code> frequency </code> becomes greater than that threshold must be the majority element.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
