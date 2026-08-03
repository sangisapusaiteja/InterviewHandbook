"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartRow {
  step: number;
  i: number;
  numsAtI: number;
  kBefore: number;
  kAfter: number;
  decision: string;
  reason: string;
  numsSnapshot: string;
  keptPrefix: string;
}

function buildRows(input: string, valStr: string): {
  nums: number[];
  val: number;
  rows: ChartRow[];
  k: number;
  keptValues: number[];
} {
  const parsed = input
    .split(",")
    .map((chunk) => Number(chunk.trim()))
    .filter((value) => !Number.isNaN(value));
  const nums = parsed.length > 0 ? parsed : [0, 1, 2, 2, 3, 0, 4, 2];

  const parsedVal = Number(valStr);
  const val = !Number.isNaN(parsedVal) && valStr.trim() !== "" ? parsedVal : 2;

  const working = [...nums];
  const rows: ChartRow[] = [];
  let k = 0;

  for (let i = 0; i < working.length; i++) {
    const numsAtI = working[i];
    const kBefore = k;

    if (numsAtI !== val) {
      working[k] = numsAtI;
      k++;
      rows.push({
        step: i + 1,
        i,
        numsAtI,
        kBefore,
        kAfter: k,
        decision: "keep",
        reason: `nums[i] !== val, so copy nums[i] to nums[k] and increment k.`,
        numsSnapshot: `[${working.join(", ")}]`,
        keptPrefix: `[${working.slice(0, k).join(", ")}]`,
      });
    } else {
      rows.push({
        step: i + 1,
        i,
        numsAtI,
        kBefore,
        kAfter: k,
        decision: "skip",
        reason: `nums[i] === val, so skip it and keep k where it is.`,
        numsSnapshot: `[${working.join(", ")}]`,
        keptPrefix: `[${working.slice(0, k).join(", ")}]`,
      });
    }
  }

  return {
    nums,
    val,
    rows,
    k,
    keptValues: working.slice(0, k),
  };
}

export function RemoveElementStepChart() {
  const [input, setInput] = useState("0,1,2,2,3,0,4,2");
  const [valStr, setValStr] = useState("2");

  const { nums, val, rows, k, keptValues } = useMemo(
    () => buildRows(input, valStr),
    [input, valStr]
  );

  const reset = () => {
    setInput("0,1,2,2,3,0,4,2");
    setValStr("2");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Step-by-Step Chart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_160px_auto] md:items-end">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              Array (comma-separated)
            </p>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 0,1,2,2,3,0,4,2"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground">
              val
            </p>
            <input
              value={valStr}
              onChange={(event) => setValStr(event.target.value)}
              className="w-full rounded-lg border bg-muted/40 px-3 py-2 text-xs font-mono focus:outline-none"
              placeholder="e.g. 2"
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
              nums
            </p>
            <p className="mt-1 font-mono text-sm">[{nums.join(", ")}]</p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              val
            </p>
            <p className="mt-1 font-mono text-sm">{val}</p>
          </div>
          <div className="rounded-xl border bg-muted/20 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              k
            </p>
            <p className="mt-1 font-mono text-sm">{k}</p>
          </div>
          <div className="rounded-xl border bg-emerald-500/10 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              nums.slice(0, k)
            </p>
            <p className="mt-1 font-mono text-sm">[{keptValues.join(", ")}]</p>
          </div>
        </div>

        <div className="space-y-3 md:hidden">
          {rows.map((row) => (
            <div
              key={`${row.step}-${row.i}`}
              className={`rounded-xl border p-4 text-xs ${
                row.decision === "keep" ? "border-emerald-500/30 bg-emerald-500/5" : "bg-background"
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
                  <p className="text-muted-foreground">k</p>
                  <p className="font-mono">{row.kBefore} -&gt; {row.kAfter}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">nums.slice(0, k)</p>
                  <p className="font-mono break-all">{row.keptPrefix}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">nums</p>
                  <p className="font-mono break-all">{row.numsSnapshot}</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-medium">{row.decision}</p>
                <p className="mt-1 text-muted-foreground">{row.reason}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border md:block">
          <div className="min-w-[940px]">
            <div className="grid grid-cols-8 gap-3 bg-muted/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              <span>Step</span>
              <span>i</span>
              <span>nums[i]</span>
              <span>k before</span>
              <span>k after</span>
              <span>Decision</span>
              <span>nums.slice(0, k)</span>
              <span>nums</span>
            </div>

            {rows.map((row) => (
              <div
                key={`${row.step}-${row.i}`}
                className={`grid grid-cols-8 gap-3 border-t px-4 py-3 text-xs ${
                  row.decision === "keep" ? "bg-emerald-500/5" : "bg-background"
                }`}
              >
                <span className="font-mono">{row.step}</span>
                <span className="font-mono">{row.i}</span>
                <span className="font-mono">{row.numsAtI}</span>
                <span className="font-mono">{row.kBefore}</span>
                <span className="font-mono">{row.kAfter}</span>
                <div>
                  <p className="font-medium">{row.decision}</p>
                  <p className="mt-1 text-muted-foreground">{row.reason}</p>
                </div>
                <span className="font-mono break-all">{row.keptPrefix}</span>
                <span className="font-mono break-all">{row.numsSnapshot}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Why This Works
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            Pointer <code>i</code> scans every element. Pointer <code>k</code> marks the next slot
            where a kept value should be written. When <code>nums[i] !== val</code>, copy
            <code> nums[i] </code> to <code>nums[k]</code> and increment <code>k</code>. After the loop,
            <code> nums.slice(0, k) </code> is the filtered result.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
