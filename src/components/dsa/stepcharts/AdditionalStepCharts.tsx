"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Column = { key: string; label: string };
type SummaryItem = { label: string; value: string; tone?: "default" | "success" };
type StepRow = {
  id: string;
  values: Record<string, string>;
  reason: string;
  highlight?: "blue" | "green" | "amber";
};

function toneClass(tone?: StepRow["highlight"]) {
  if (tone === "green") return "bg-emerald-500/5 border-emerald-500/20";
  if (tone === "blue") return "bg-blue-500/5 border-blue-500/20";
  if (tone === "amber") return "bg-amber-500/5 border-amber-500/20";
  return "bg-background";
}

function StepChartTemplate({
  summary,
  columns,
  rows,
  why,
}: {
  summary: SummaryItem[];
  columns: Column[];
  rows: StepRow[];
  why: ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Step-by-Step Chart</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="grid grid-cols-1 gap-3 md:grid-cols-4"
          style={{ gridTemplateColumns: `repeat(${Math.min(Math.max(summary.length, 1), 4)}, minmax(0, 1fr))` }}
        >
          {summary.map((item) => (
            <div
              key={item.label}
              className={`rounded-xl border p-4 ${item.tone === "success" ? "bg-emerald-500/10" : "bg-muted/20"}`}
            >
              <p className={`text-[11px] font-semibold uppercase tracking-widest ${item.tone === "success" ? "text-emerald-700 dark:text-emerald-400" : "text-muted-foreground"}`}>
                {item.label}
              </p>
              <p className="mt-1 break-all font-mono text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 md:hidden">
          {rows.map((row, rowIndex) => (
            <div key={row.id} className={`rounded-xl border p-4 text-xs ${toneClass(row.highlight)}`}>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold text-muted-foreground">Step {rowIndex + 1}</span>
                <span className="font-mono">{row.values[columns[0].key]}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {columns.slice(1).map((column) => (
                  <div key={column.key}>
                    <p className="text-muted-foreground">{column.label}</p>
                    <p className="break-all font-mono">{row.values[column.key]}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-muted-foreground">{row.reason}</p>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto rounded-xl border md:block">
          <div style={{ minWidth: `${Math.max(columns.length * 140, 900)}px` }}>
            <div className="grid gap-3 bg-muted/60 px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
              {columns.map((column) => (
                <span key={column.key}>{column.label}</span>
              ))}
            </div>
            {rows.map((row) => (
              <div key={row.id} className={`grid gap-3 border-t px-4 py-3 text-xs ${toneClass(row.highlight)}`} style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
                {columns.map((column) => (
                  <div key={column.key}>
                    <p className="break-all font-mono">{row.values[column.key]}</p>
                    {column.key === "decision" && <p className="mt-1 text-muted-foreground">{row.reason}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Why This Works
          </p>
          <div className="mt-2 text-sm leading-relaxed">{why}</div>
        </div>
      </CardContent>
    </Card>
  );
}

const stepCol: Column = { key: "step", label: "step" };
const decisionCol: Column = { key: "decision", label: "decision" };

function fmtNums(nums: number[]) {
  return `[${nums.join(", ")}]`;
}
function fmtIntervals(intervals: number[][]) {
  return `[${intervals.map((it) => `[${it.join(",")}]`).join(", ")}]`;
}
function fmtMatrix(matrix: number[][]) {
  return matrix.map((row) => `[${row.join(", ")}]`).join(" ");
}

export function SquaresOfSortedArrayStepChart() {
  const nums = [-4, -1, 0, 3, 10];
  const result = new Array(nums.length).fill(0);
  let left = 0, right = nums.length - 1, pos = nums.length - 1;
  const rows: StepRow[] = [];
  let step = 1;
  while (left <= right) {
    const leftSq = nums[left] * nums[left];
    const rightSq = nums[right] * nums[right];
    if (leftSq > rightSq) {
      result[pos] = leftSq;
      rows.push({ id: String(step), highlight: "green", reason: "leftSq > rightSq, so place leftSq at result[pos] and move left.", values: { step: String(step++), left: String(left), right: String(right), pos: String(pos), leftSq: String(leftSq), rightSq: String(rightSq), result: fmtNums(result), decision: `result[pos] = ${leftSq}` } });
      left++;
    } else {
      result[pos] = rightSq;
      rows.push({ id: String(step), highlight: "blue", reason: "rightSq >= leftSq, so place rightSq at result[pos] and move right.", values: { step: String(step++), left: String(left), right: String(right), pos: String(pos), leftSq: String(leftSq), rightSq: String(rightSq), result: fmtNums(result), decision: `result[pos] = ${rightSq}` } });
      right--;
    }
    pos--;
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "result", value: fmtNums(result), tone: "success" }]} columns={[stepCol, { key: "left", label: "left" }, { key: "right", label: "right" }, { key: "pos", label: "pos" }, { key: "leftSq", label: "leftSq" }, { key: "rightSq", label: "rightSq" }, { key: "result", label: "result" }, decisionCol]} rows={rows} why={<><code>left</code> and <code>right</code> point to the largest absolute values. We fill <code>result[pos]</code> from the back with the larger square each time.</>} />;
}

export function RemoveDuplicatesSortedArrayStepChart() {
  const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const working = [...nums];
  let k = 0;
  const rows: StepRow[] = [];
  for (let i = 1; i < working.length; i++) {
    if (working[i] !== working[k]) {
      k++;
      working[k] = working[i];
      rows.push({ id: String(i), highlight: "green", reason: "nums[i] !== nums[k-1], so it is a new unique value.", values: { step: String(i), i: String(i), k: String(k), 'nums[i]': String(working[i]), 'nums[k]': String(working[k]), 'nums.slice(0, k + 1)': fmtNums(working.slice(0, k + 1)), decision: "keep unique" } });
    } else {
      rows.push({ id: String(i), reason: "nums[i] matches the last unique value, so skip it.", values: { step: String(i), i: String(i), k: String(k), 'nums[i]': String(working[i]), 'nums[k]': String(working[k]), 'nums.slice(0, k + 1)': fmtNums(working.slice(0, k + 1)), decision: "skip duplicate" } });
    }
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "k + 1", value: String(k + 1), tone: "success" }, { label: "nums.slice(0, k + 1)", value: fmtNums(working.slice(0, k + 1)) }]} columns={[stepCol, { key: "i", label: "i" }, { key: "k", label: "k" }, { key: "nums[i]", label: "nums[i]" }, { key: "nums[k]", label: "nums[k]" }, { key: "nums.slice(0, k + 1)", label: "nums.slice(0, k + 1)" }, decisionCol]} rows={rows} why={<><code>k</code> always marks the last unique position. Because the array is sorted, duplicates are adjacent, so comparing <code>nums[i]</code> with the last unique value is enough.</>} />;
}

export function SortColorsStepChart() {
  const nums = [2, 0, 2, 1, 1, 0];
  const working = [...nums];
  let low = 0, mid = 0, high = working.length - 1;
  const rows: StepRow[] = [];
  let step = 1;
  while (mid <= high) {
    if (working[mid] === 0) {
      [working[low], working[mid]] = [working[mid], working[low]];
      rows.push({ id: String(step), highlight: "green", reason: "nums[mid] is 0, so swap it into the low region and move low and mid.", values: { step: String(step++), low: String(low), mid: String(mid), high: String(high), 'nums[mid]': String(0), nums: fmtNums(working), decision: "swap(low, mid)" } });
      low++; mid++;
    } else if (working[mid] === 1) {
      rows.push({ id: String(step), reason: "nums[mid] is 1, so it already belongs in the middle region.", values: { step: String(step++), low: String(low), mid: String(mid), high: String(high), 'nums[mid]': String(1), nums: fmtNums(working), decision: "mid++" } });
      mid++;
    } else {
      [working[mid], working[high]] = [working[high], working[mid]];
      rows.push({ id: String(step), highlight: "blue", reason: "nums[mid] is 2, so swap it with high and shrink the 2s region. mid stays because the swapped value is unchecked.", values: { step: String(step++), low: String(low), mid: String(mid), high: String(high), 'nums[mid]': String(2), nums: fmtNums(working), decision: "swap(mid, high)" } });
      high--;
    }
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "sorted nums", value: fmtNums(working), tone: "success" }]} columns={[stepCol, { key: "low", label: "low" }, { key: "mid", label: "mid" }, { key: "high", label: "high" }, { key: "nums[mid]", label: "nums[mid]" }, { key: "nums", label: "nums" }, decisionCol]} rows={rows} why={<><code>low</code>, <code>mid</code>, and <code>high</code> partition the array into 0s, 1s, and 2s in one pass.</>} />;
}

export function RunningSumStepChart() {
  const nums = [1, 2, 3, 4];
  const working = [...nums];
  const rows: StepRow[] = [];
  for (let i = 1; i < working.length; i++) {
    const before = working[i];
    working[i] += working[i - 1];
    rows.push({ id: String(i), highlight: "green", reason: "Add the previous prefix sum into nums[i].", values: { step: String(i), i: String(i), 'nums[i] before': String(before), 'nums[i - 1]': String(working[i - 1]), 'nums[i]': String(working[i]), nums: fmtNums(working), decision: "nums[i] += nums[i - 1]" } });
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "runningSum(nums)", value: fmtNums(working), tone: "success" }]} columns={[stepCol, { key: "i", label: "i" }, { key: "nums[i] before", label: "nums[i] before" }, { key: "nums[i - 1]", label: "nums[i - 1]" }, { key: "nums[i]", label: "nums[i]" }, { key: "nums", label: "nums" }, decisionCol]} rows={rows} why={<><code>nums[i - 1]</code> already stores the running total up to the previous index, so adding it into <code>nums[i]</code> builds the prefix sum in place.</>} />;
}

export function FindPivotIndexStepChart() {
  const nums = [1, 7, 3, 6, 5, 6];
  const totalSum = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;
  const rows: StepRow[] = [];
  let answer = -1;
  for (let i = 0; i < nums.length; i++) {
    const rightSum = totalSum - leftSum - nums[i];
    const found = leftSum === rightSum;
    rows.push({ id: String(i), highlight: found ? "green" : undefined, reason: found ? "leftSum === rightSum, so this is the pivot index." : "leftSum and rightSum differ, so continue scanning.", values: { step: String(i + 1), i: String(i), leftSum: String(leftSum), 'nums[i]': String(nums[i]), rightSum: String(rightSum), totalSum: String(totalSum), decision: found ? `return ${i}` : "leftSum += nums[i]" } });
    if (found) { answer = i; break; }
    leftSum += nums[i];
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "totalSum", value: String(totalSum) }, { label: "pivot index", value: String(answer), tone: "success" }]} columns={[stepCol, { key: "i", label: "i" }, { key: "leftSum", label: "leftSum" }, { key: "nums[i]", label: "nums[i]" }, { key: "rightSum", label: "rightSum" }, { key: "totalSum", label: "totalSum" }, decisionCol]} rows={rows} why={<><code>leftSum</code> grows from the left, and <code>rightSum</code> is computed as <code>totalSum - leftSum - nums[i]</code>. Equality means the pivot is balanced.</>} />;
}

export function SubarraySumEqualsKStepChart() {
  const nums = [1, 1, 1];
  const k = 2;
  const map = new Map<number, number>();
  map.set(0, 1);
  let prefix = 0, count = 0;
  const rows: StepRow[] = [];
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];
    const need = prefix - k;
    const found = map.get(need) || 0;
    count += found;
    map.set(prefix, (map.get(prefix) || 0) + 1);
    rows.push({ id: String(i), highlight: found > 0 ? "green" : undefined, reason: found > 0 ? `prefix - k was seen ${found} time(s), so add that many subarrays to count.` : `prefix - k is not in the map yet.`, values: { step: String(i + 1), i: String(i), prefix: String(prefix), need: String(need), count: String(count), map: `{${Array.from(map.entries()).map(([a,b]) => `${a}:${b}`).join(", ")}}`, decision: found > 0 ? `count += ${found}` : "store prefix" } });
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "k", value: String(k) }, { label: "count", value: String(count), tone: "success" }]} columns={[stepCol, { key: "i", label: "i" }, { key: "prefix", label: "prefix" }, { key: "need", label: "prefix - k" }, { key: "count", label: "count" }, { key: "map", label: "map" }, decisionCol]} rows={rows} why={<><code>prefix - k</code> tells you which earlier prefix sum would make the current subarray sum to <code>k</code>. The map stores how many times each prefix has appeared.</>} />;
}

export function ContainsDuplicateStepChart() {
  const nums = [1, 2, 3, 1];
  const seen = new Set<number>();
  const rows: StepRow[] = [];
  let duplicate = "false";
  for (let i = 0; i < nums.length; i++) {
    const has = seen.has(nums[i]);
    if (has) duplicate = "true";
    rows.push({ id: String(i), highlight: has ? "green" : undefined, reason: has ? "seen already has nums[i], so the array contains a duplicate." : "Add nums[i] into seen and continue.", values: { step: String(i + 1), i: String(i), 'nums[i]': String(nums[i]), seen: `{${Array.from(seen).join(", ")}}`, decision: has ? "return true" : "seen.add(nums[i])" } });
    if (has) break;
    seen.add(nums[i]);
  }
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "containsDuplicate(nums)", value: duplicate, tone: "success" }]} columns={[stepCol, { key: "i", label: "i" }, { key: "nums[i]", label: "nums[i]" }, { key: "seen", label: "seen" }, decisionCol]} rows={rows} why={<><code>seen</code> is a hash set. If <code>nums[i]</code> is already there, you found a duplicate immediately.</>} />;
}

export function MissingNumberStepChart() {
  const nums = [3, 0, 1];
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  let actualSum = 0;
  const rows: StepRow[] = nums.map((num, i) => {
    actualSum += num;
    return { id: String(i), reason: "Accumulate nums[i] into actualSum.", values: { step: String(i + 1), i: String(i), 'nums[i]': String(num), actualSum: String(actualSum), expectedSum: String(expectedSum), decision: "actualSum += nums[i]" } };
  });
  const missing = expectedSum - actualSum;
  rows.push({ id: "final", highlight: "green", reason: "Subtract the actual sum from the expected sum to get the missing number.", values: { step: String(rows.length + 1), i: "-", 'nums[i]': "-", actualSum: String(actualSum), expectedSum: String(expectedSum), decision: `return ${missing}` } });
  return <StepChartTemplate summary={[{ label: "nums", value: fmtNums(nums) }, { label: "expectedSum", value: String(expectedSum) }, { label: "missing", value: String(missing), tone: "success" }]} columns={[stepCol, { key: "i", label: "i" }, { key: "nums[i]", label: "nums[i]" }, { key: "actualSum", label: "actualSum" }, { key: "expectedSum", label: "expectedSum" }, decisionCol]} rows={rows} why={<><code>expectedSum</code> is the total for numbers <code>0..n</code>. The difference between <code>expectedSum</code> and <code>actualSum</code> is the missing number.</>} />;
}

export function MergeIntervalsStepChart() {
  const intervals = [[1,3],[2,6],[8,10],[15,18]];
  const sorted = [...intervals].sort((a,b)=>a[0]-b[0]);
  const merged = [sorted[0].slice()];
  const rows: StepRow[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const curr = sorted[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
      rows.push({ id: String(i), highlight: "green", reason: "curr overlaps the last merged interval, so extend the end.", values: { step: String(i), curr: `[${curr}]`, last: `[${last}]`, merged: fmtIntervals(merged), decision: "merge overlap" } });
    } else {
      merged.push(curr.slice());
      rows.push({ id: String(i), reason: "No overlap, so push curr as a new interval.", values: { step: String(i), curr: `[${curr}]`, last: `[${last}]`, merged: fmtIntervals(merged), decision: "merged.push(curr)" } });
    }
  }
  return <StepChartTemplate summary={[{ label: "intervals", value: fmtIntervals(intervals) }, { label: "merged", value: fmtIntervals(merged), tone: "success" }]} columns={[stepCol, { key: "curr", label: "curr" }, { key: "last", label: "last" }, { key: "merged", label: "merged" }, decisionCol]} rows={rows} why={<><code>intervals</code> are sorted by start time first. That guarantees each new interval only needs to be compared with <code>last</code>, the most recent merged interval.</>} />;
}

export function MaximumAverageSubarrayStepChart() {
  const nums = [1,12,-5,-6,50,3];
  const k = 4;
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  let maxSum = windowSum;
  const rows: StepRow[] = [{ id: 'init', highlight: 'blue', reason: 'Initialize the first window of size k.', values: { step: '1', i: `${k - 1}`, windowSum: String(windowSum), maxSum: String(maxSum), window: fmtNums(nums.slice(0, k)), decision: 'initial window' } }];
  let step = 2;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i-k];
    const improved = windowSum > maxSum;
    maxSum = Math.max(maxSum, windowSum);
    rows.push({ id: String(i), highlight: improved ? 'green' : undefined, reason: 'Slide the window by adding the new value and removing the old one.', values: { step: String(step++), i: String(i), windowSum: String(windowSum), maxSum: String(maxSum), window: fmtNums(nums.slice(i-k+1, i+1)), decision: improved ? 'update maxSum' : 'keep maxSum' } });
  }
  return <StepChartTemplate summary={[{ label: 'nums', value: fmtNums(nums) }, { label: 'k', value: String(k) }, { label: 'maxSum / k', value: String(maxSum / k), tone: 'success' }]} columns={[stepCol, { key: 'i', label: 'i' }, { key: 'windowSum', label: 'windowSum' }, { key: 'maxSum', label: 'maxSum' }, { key: 'window', label: 'window' }, decisionCol]} rows={rows} why={<><code>windowSum</code> is reused as the window slides, so each step only does one add and one subtract instead of recomputing a full subarray sum.</>} />;
}

export function MoveZeroesStepChart() {
  const nums = [0,1,0,3,12];
  const working = [...nums];
  let writePos = 0;
  const rows: StepRow[] = [];
  for (let i = 0; i < working.length; i++) {
    if (working[i] !== 0) {
      [working[writePos], working[i]] = [working[i], working[writePos]];
      rows.push({ id: String(i), highlight: 'green', reason: 'Non-zero values are swapped forward to writePos.', values: { step: String(i + 1), i: String(i), writePos: String(writePos), 'nums[i]': String(working[writePos]), nums: fmtNums(working), decision: 'swap(writePos, i)' } });
      writePos++;
    } else {
      rows.push({ id: String(i), reason: 'Zero stays for now, so only i moves.', values: { step: String(i + 1), i: String(i), writePos: String(writePos), 'nums[i]': '0', nums: fmtNums(working), decision: 'skip zero' } });
    }
  }
  return <StepChartTemplate summary={[{ label: 'nums', value: fmtNums(nums) }, { label: 'moveZeroes(nums)', value: fmtNums(working), tone: 'success' }]} columns={[stepCol, { key: 'i', label: 'i' }, { key: 'writePos', label: 'writePos' }, { key: 'nums[i]', label: 'nums[i]' }, { key: 'nums', label: 'nums' }, decisionCol]} rows={rows} why={<><code>writePos</code> marks the next slot for a non-zero. Every non-zero is moved forward in original order, which naturally pushes zeroes to the back.</>} />;
}

export function LongestConsecutiveSequenceStepChart() {
  const nums = [100,4,200,1,3,2];
  const numSet = new Set(nums);
  let longest = 0;
  const rows: StepRow[] = [];
  for (const num of Array.from(numSet)) {
    if (!numSet.has(num - 1)) {
      let current = num;
      let streak = 1;
      while (numSet.has(current + 1)) { current++; streak++; }
      longest = Math.max(longest, streak);
      rows.push({ id: String(num), highlight: 'green', reason: 'num - 1 is missing, so this number starts a sequence.', values: { step: String(rows.length + 1), num: String(num), current: String(current), streak: String(streak), longest: String(longest), decision: 'count sequence' } });
    } else {
      rows.push({ id: String(num), reason: 'num - 1 exists, so this number is inside a sequence and not a start.', values: { step: String(rows.length + 1), num: String(num), current: '-', streak: '-', longest: String(longest), decision: 'skip' } });
    }
  }
  return <StepChartTemplate summary={[{ label: 'nums', value: fmtNums(nums) }, { label: 'longest', value: String(longest), tone: 'success' }]} columns={[stepCol, { key: 'num', label: 'num' }, { key: 'current', label: 'current' }, { key: 'streak', label: 'streak' }, { key: 'longest', label: 'longest' }, decisionCol]} rows={rows} why={<><code>numSet</code> gives O(1) lookup. Only numbers that do not have <code>num - 1</code> are sequence starts, which avoids recounting the same chain.</>} />;
}

export function TwoSumStepChart() {
  const nums = [2,7,11,15];
  const target = 9;
  const map = new Map<number, number>();
  const rows: StepRow[] = [];
  let answer = '[]';
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const found = map.has(complement);
    if (found) answer = `[${map.get(complement)}, ${i}]`;
    rows.push({ id: String(i), highlight: found ? 'green' : undefined, reason: found ? 'The complement is already in the map, so the answer is found.' : 'Store nums[i] with its index and continue.', values: { step: String(i + 1), i: String(i), 'nums[i]': String(nums[i]), complement: String(complement), map: `{${Array.from(map.entries()).map(([a,b]) => `${a}:${b}`).join(', ')}}`, decision: found ? `return ${answer}` : 'map.set(nums[i], i)' } });
    if (found) break;
    map.set(nums[i], i);
  }
  return <StepChartTemplate summary={[{ label: 'nums', value: fmtNums(nums) }, { label: 'target', value: String(target) }, { label: 'twoSum(nums, target)', value: answer, tone: 'success' }]} columns={[stepCol, { key: 'i', label: 'i' }, { key: 'nums[i]', label: 'nums[i]' }, { key: 'complement', label: 'complement' }, { key: 'map', label: 'map' }, decisionCol]} rows={rows} why={<><code>complement = target - nums[i]</code>. If that complement already exists in <code>map</code>, you have the two indices in one pass.</>} />;
}

export function FindDisappearedNumbersStepChart() {
  const nums = [4,3,2,7,8,2,3,1];
  const working = [...nums];
  const rows: StepRow[] = [];
  for (let i = 0; i < working.length; i++) {
    const idx = Math.abs(working[i]) - 1;
    if (working[idx] > 0) working[idx] = -working[idx];
    rows.push({ id: String(i), reason: 'Use the value as an index and mark that slot negative.', values: { step: String(i + 1), i: String(i), idx: String(idx), 'nums[i]': String(nums[i]), nums: fmtNums(working), decision: 'mark present' } });
  }
  const result: number[] = [];
  for (let i = 0; i < working.length; i++) if (working[i] > 0) result.push(i + 1);
  return <StepChartTemplate summary={[{ label: 'nums', value: fmtNums(nums) }, { label: 'result', value: fmtNums(result), tone: 'success' }]} columns={[stepCol, { key: 'i', label: 'i' }, { key: 'idx', label: 'idx' }, { key: 'nums[i]', label: 'nums[i]' }, { key: 'nums', label: 'nums' }, decisionCol]} rows={rows} why={<><code>idx = Math.abs(nums[i]) - 1</code> maps a value to its presence slot. Positive values left over at the end reveal the disappeared numbers.</>} />;
}

export function ContainerWithMostWaterStepChart() {
  const height = [1,8,6,2,5,4,8,3,7];
  let left = 0, right = height.length - 1, maxWater = 0;
  const rows: StepRow[] = [];
  let step = 1;
  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    const area = w * h;
    const improved = area > maxWater;
    maxWater = Math.max(maxWater, area);
    rows.push({ id: String(step), highlight: improved ? 'green' : undefined, reason: 'Compute area using the shorter side, then move the shorter pointer inward.', values: { step: String(step++), left: String(left), right: String(right), area: String(area), maxWater: String(maxWater), decision: height[left] < height[right] ? 'left++' : 'right--' } });
    if (height[left] < height[right]) left++;
    else right--;
  }
  return <StepChartTemplate summary={[{ label: 'height', value: fmtNums(height) }, { label: 'maxWater', value: String(maxWater), tone: 'success' }]} columns={[stepCol, { key: 'left', label: 'left' }, { key: 'right', label: 'right' }, { key: 'area', label: 'area' }, { key: 'maxWater', label: 'maxWater' }, decisionCol]} rows={rows} why={<><code>area</code> is limited by the shorter wall, so only moving that pointer can possibly improve the container.</>} />;
}

export function FloodFillStepChart() {
  const image = [[1,1,1],[1,1,0],[1,0,1]];
  const working = image.map((row) => [...row]);
  const sr = 1, sc = 1, color = 2;
  const startColor = working[sr][sc];
  const rows: StepRow[] = [];
  function dfs(r: number, c: number) {
    if (r < 0 || r >= working.length || c < 0 || c >= working[0].length) return;
    if (working[r][c] !== startColor) return;
    working[r][c] = color;
    rows.push({ id: `${r}-${c}`, highlight: 'green', reason: 'The cell matches startColor, so repaint it and continue DFS in 4 directions.', values: { step: String(rows.length + 1), r: String(r), c: String(c), color: String(color), image: fmtMatrix(working), decision: 'fill and dfs' } });
    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
  }
  dfs(sr, sc);
  return <StepChartTemplate summary={[{ label: 'image', value: fmtMatrix(image) }, { label: 'sr, sc, color', value: `${sr}, ${sc}, ${color}` }, { label: 'floodFill', value: fmtMatrix(working), tone: 'success' }]} columns={[stepCol, { key: 'r', label: 'r' }, { key: 'c', label: 'c' }, { key: 'color', label: 'color' }, { key: 'image', label: 'image' }, decisionCol]} rows={rows} why={<><code>dfs</code> spreads from <code>(sr, sc)</code> to 4-directionally connected cells that still match <code>startColor</code>.</>} />;
}

export function IslandPerimeterStepChart() {
  const grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]];
  let perimeter = 0;
  const rows: StepRow[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 1) {
        let edges = 4;
        if (r > 0 && grid[r - 1][c] === 1) edges -= 2;
        if (c > 0 && grid[r][c - 1] === 1) edges -= 2;
        perimeter += edges;
        rows.push({ id: `${r}-${c}`, reason: 'Each land cell adds 4 edges, then shared top/left edges subtract 2 each.', values: { step: String(rows.length + 1), r: String(r), c: String(c), edges: String(edges), perimeter: String(perimeter), decision: 'perimeter += edges' } });
      }
    }
  }
  return <StepChartTemplate summary={[{ label: 'grid', value: fmtMatrix(grid) }, { label: 'perimeter', value: String(perimeter), tone: 'success' }]} columns={[stepCol, { key: 'r', label: 'r' }, { key: 'c', label: 'c' }, { key: 'edges', label: 'edges' }, { key: 'perimeter', label: 'perimeter' }, decisionCol]} rows={rows} why={<><code>perimeter</code> accumulates exposed edges. Shared borders between neighboring land cells cancel out by subtracting 2.</>} />;
}

export function SpiralMatrixStepChart() {
  const matrix = [[1,2,3],[4,5,6],[7,8,9]];
  const result: number[] = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  const rows: StepRow[] = [];
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    rows.push({ id: `top-${top}`, highlight: 'blue', reason: 'Traverse the top row from left to right.', values: { step: String(rows.length + 1), top: String(top), bottom: String(bottom), left: String(left), right: String(right), result: fmtNums(result), decision: 'top++' } });
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    rows.push({ id: `right-${right}`, reason: 'Traverse the right column downward.', values: { step: String(rows.length + 1), top: String(top), bottom: String(bottom), left: String(left), right: String(right), result: fmtNums(result), decision: 'right--' } });
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      rows.push({ id: `bottom-${bottom}`, reason: 'Traverse the bottom row from right to left.', values: { step: String(rows.length + 1), top: String(top), bottom: String(bottom), left: String(left), right: String(right), result: fmtNums(result), decision: 'bottom--' } });
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      rows.push({ id: `left-${left}`, reason: 'Traverse the left column upward.', values: { step: String(rows.length + 1), top: String(top), bottom: String(bottom), left: String(left), right: String(right), result: fmtNums(result), decision: 'left++' } });
      left++;
    }
  }
  return <StepChartTemplate summary={[{ label: 'matrix', value: fmtMatrix(matrix) }, { label: 'result', value: fmtNums(result), tone: 'success' }]} columns={[stepCol, { key: 'top', label: 'top' }, { key: 'bottom', label: 'bottom' }, { key: 'left', label: 'left' }, { key: 'right', label: 'right' }, { key: 'result', label: 'result' }, decisionCol]} rows={rows} why={<><code>top</code>, <code>bottom</code>, <code>left</code>, and <code>right</code> shrink inward after each edge traversal, peeling the matrix layer by layer.</>} />;
}

export function CanPlaceFlowersStepChart() {
  const flowerbed = [1,0,0,0,1];
  const fb = [...flowerbed];
  let n = 1;
  const rows: StepRow[] = [];
  for (let i = 0; i < fb.length; i++) {
    if (fb[i] === 0) {
      const leftEmpty = i === 0 || fb[i - 1] === 0;
      const rightEmpty = i === fb.length - 1 || fb[i + 1] === 0;
      if (leftEmpty && rightEmpty) {
        fb[i] = 1; n--;
        rows.push({ id: String(i), highlight: 'green', reason: 'Both neighbors are empty (or boundaries), so plant here and decrement n.', values: { step: String(rows.length + 1), i: String(i), n: String(n), flowerbed: fmtNums(fb), decision: 'plant' } });
        if (n <= 0) break;
      } else {
        rows.push({ id: String(i), reason: 'A neighbor is occupied, so this plot is not valid.', values: { step: String(rows.length + 1), i: String(i), n: String(n), flowerbed: fmtNums(fb), decision: 'skip' } });
      }
    }
  }
  return <StepChartTemplate summary={[{ label: 'flowerbed', value: fmtNums(flowerbed) }, { label: 'n', value: '1' }, { label: 'canPlaceFlowers', value: String(n <= 0), tone: 'success' }]} columns={[stepCol, { key: 'i', label: 'i' }, { key: 'n', label: 'n' }, { key: 'flowerbed', label: 'flowerbed' }, decisionCol]} rows={rows} why={<><code>leftEmpty</code> and <code>rightEmpty</code> enforce the no-adjacent-flowers rule. Planting greedily as soon as a spot is valid never hurts later choices.</>} />;
}

export function MajorityElementBoyerMooreStepChart() {
  const nums = [2,2,1,1,1,2,2];
  let candidate = nums[0];
  let count = 0;
  const rows: StepRow[] = [];
  nums.forEach((num, i) => {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
    rows.push({ id: String(i), highlight: count > 0 ? 'green' : undefined, reason: count === 1 && candidate === num ? 'When count hits 0, choose the current num as the new candidate.' : 'Matching values increase count; different values cancel it out.', values: { step: String(i + 1), num: String(num), candidate: String(candidate), count: String(count), decision: 'update count' } });
  });
  return <StepChartTemplate summary={[{ label: 'nums', value: fmtNums(nums) }, { label: 'candidate', value: String(candidate), tone: 'success' }]} columns={[stepCol, { key: 'num', label: 'num' }, { key: 'candidate', label: 'candidate' }, { key: 'count', label: 'count' }, decisionCol]} rows={rows} why={<><code>candidate</code> survives pairwise cancellations because the true majority appears more than all other values combined.</>} />;
}

export function ThreeSumStepChart() {
  const nums = [-1,0,1,2,-1,-4].sort((a,b)=>a-b);
  const result: number[][] = [];
  const rows: StepRow[] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      rows.push({ id: `skip-${i}`, reason: 'Skip duplicate i values to avoid duplicate triplets.', values: { step: String(rows.length + 1), i: String(i), left: '-', right: '-', sum: '-', result: JSON.stringify(result), decision: 'continue' } });
      continue;
    }
    if (nums[i] > 0) break;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        rows.push({ id: `${i}-${left}-${right}`, highlight: 'green', reason: 'The triplet sums to 0, so add it and move both pointers past duplicates.', values: { step: String(rows.length + 1), i: String(i), left: String(left), right: String(right), sum: String(sum), result: JSON.stringify(result), decision: 'push triplet' } });
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) {
        rows.push({ id: `${i}-${left}-${right}`, reason: 'The sum is too small, so move left to increase it.', values: { step: String(rows.length + 1), i: String(i), left: String(left), right: String(right), sum: String(sum), result: JSON.stringify(result), decision: 'left++' } });
        left++;
      } else {
        rows.push({ id: `${i}-${left}-${right}`, reason: 'The sum is too large, so move right to decrease it.', values: { step: String(rows.length + 1), i: String(i), left: String(left), right: String(right), sum: String(sum), result: JSON.stringify(result), decision: 'right--' } });
        right--;
      }
    }
  }
  return <StepChartTemplate summary={[{ label: 'sorted nums', value: fmtNums(nums) }, { label: 'result', value: JSON.stringify(result), tone: 'success' }]} columns={[stepCol, { key: 'i', label: 'i' }, { key: 'left', label: 'left' }, { key: 'right', label: 'right' }, { key: 'sum', label: 'sum' }, { key: 'result', label: 'result' }, decisionCol]} rows={rows} why={<><code>nums</code> is sorted first. For each fixed <code>i</code>, a two-pointer scan on <code>left</code> and <code>right</code> finds all pairs that complete the triplet.</>} />;
}
