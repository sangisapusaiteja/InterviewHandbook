"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// ─── ConsoleOutput ────────────────────────────────────────────────────────────
function ConsoleOutput({ lines }: Readonly<{ lines: string[] | null }>) {
  return (
    <AnimatePresence mode="wait">
      {lines ? (
        <motion.div
          key="out"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[52px]"
        >
          {lines.map((line, idx) => (
            <p key={`${idx}-${line}`} className="text-emerald-400">
              <span className="text-zinc-500 select-none mr-2">&gt;&gt;&gt;</span>
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
          <p className="text-xs text-muted-foreground italic">Click ▶ Run to see output</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── types ────────────────────────────────────────────────────────────────────
type TopicKey = "data-structures" | "comprehensions" | "caching" | "profiling";

interface TopicInfo {
  label: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  keyPoints: string[];
  codeSnippet: string;
  codeOutput: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  "data-structures": {
    label: "Data Structures",
    subtitle: "Choosing the Right Container",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-400",
    badgeLabel: "structures",
    description:
      "Choosing the right data structure is one of the most impactful performance decisions. Sets provide O(1) membership testing vs O(n) for lists. collections.deque gives O(1) append/pop from both ends, while list.pop(0) is O(n). Dicts offer O(1) key lookup, making them ideal for fast mapping operations.",
    keyPoints: [
      "Use set for fast membership testing (O(1) vs O(n) for list)",
      "Use collections.deque for efficient append/pop from both ends",
      "Dict lookups are O(1) — ideal for caching and indexing",
      "Avoid list.pop(0) — use deque.popleft() instead",
    ],
    codeSnippet: `import time
from collections import deque

# set vs list lookup
data_list = list(range(100_000))
data_set = set(data_list)

start = time.perf_counter()
99_999 in data_list
list_time = time.perf_counter() - start

start = time.perf_counter()
99_999 in data_set
set_time = time.perf_counter() - start

print(f"List lookup: \${list_time:.6f}s")
print(f"Set  lookup: \${set_time:.6f}s")
print(f"Set is ~\${list_time / set_time:.0f}x faster")

# deque vs list for left pop
dq = deque(range(10_000))
lst = list(range(10_000))

start = time.perf_counter()
while dq:
    dq.popleft()
deque_time = time.perf_counter() - start

start = time.perf_counter()
while lst:
    lst.pop(0)
list_pop_time = time.perf_counter() - start

print(f"\\ndeque.popleft: \${deque_time:.4f}s")
print(f"list.pop(0):   \${list_pop_time:.4f}s")`,
    codeOutput: [
      "List lookup: 0.001423s",
      "Set  lookup: 0.000001s",
      "Set is ~1423x faster",
      "",
      "deque.popleft: 0.0004s",
      "list.pop(0):   0.0127s",
    ],
  },
  comprehensions: {
    label: "Comprehensions",
    subtitle: "List Comps & Generators",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    badgeLabel: "comps",
    description:
      "List comprehensions are significantly faster than equivalent for-loops because they are optimized at the C level in CPython. Generator expressions use lazy evaluation to save memory — they yield items one at a time instead of building the full list in memory. Use generators when you only need to iterate once.",
    keyPoints: [
      "List comprehensions are ~30-50% faster than for-loops",
      "Generator expressions use almost zero extra memory",
      "Use generators for large datasets you iterate once",
      "Comprehensions are more Pythonic and readable",
    ],
    codeSnippet: `import time

n = 1_000_000

# List comprehension vs for-loop
start = time.perf_counter()
squares_comp = [x * x for x in range(n)]
comp_time = time.perf_counter() - start

start = time.perf_counter()
squares_loop = []
for x in range(n):
    squares_loop.append(x * x)
loop_time = time.perf_counter() - start

print(f"Comprehension: \${comp_time:.4f}s")
print(f"For-loop:      \${loop_time:.4f}s")
print(f"Comp is \${loop_time / comp_time:.1f}x faster")

# Generator expression — memory efficient
import sys
list_mem = sys.getsizeof([x * x for x in range(n)])
gen_mem = sys.getsizeof(x * x for x in range(n))

print(f"\\nList memory:      \${list_mem:,} bytes")
print(f"Generator memory: \${gen_mem:,} bytes")
print(f"Memory saved:     \${list_mem - gen_mem:,} bytes")`,
    codeOutput: [
      "Comprehension: 0.0523s",
      "For-loop:      0.0811s",
      "Comp is 1.6x faster",
      "",
      "List memory:      8,448,728 bytes",
      "Generator memory: 200 bytes",
      "Memory saved:     8,448,528 bytes",
    ],
  },
  caching: {
    label: "Caching",
    subtitle: "lru_cache & Memoization",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/20 text-violet-400",
    badgeLabel: "cache",
    description:
      "functools.lru_cache is a built-in decorator that caches function return values based on arguments. It turns expensive recursive or repeated computations into O(1) lookups after the first call. Use maxsize=None for unlimited cache or set a limit to control memory usage. Always avoid recomputing values inside loops.",
    keyPoints: [
      "@lru_cache turns repeated calls into O(1) lookups",
      "Dramatically speeds up recursive functions like Fibonacci",
      "Use maxsize=None for unlimited cache size",
      "Cache only pure functions (same input = same output)",
    ],
    codeSnippet: `from functools import lru_cache
import time

# Fibonacci without cache (exponential)
def fib_slow(n):
    if n < 2:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# Fibonacci with lru_cache (linear)
@lru_cache(maxsize=None)
def fib_fast(n):
    if n < 2:
        return n
    return fib_fast(n - 1) + fib_fast(n - 2)

start = time.perf_counter()
result_slow = fib_slow(32)
slow_time = time.perf_counter() - start

start = time.perf_counter()
result_fast = fib_fast(32)
fast_time = time.perf_counter() - start

print(f"fib(32) = \${result_slow}")
print(f"Without cache: \${slow_time:.4f}s")
print(f"With lru_cache: \${fast_time:.8f}s")
print(f"Speedup: \${slow_time / fast_time:.0f}x")

# Cache info
print(f"\\nCache info: \${fib_fast.cache_info()}")`,
    codeOutput: [
      "fib(32) = 2178309",
      "Without cache: 0.4312s",
      "With lru_cache: 0.00000120s",
      "Speedup: 359350x",
      "",
      "Cache info: CacheInfo(hits=30, misses=33, maxsize=None, currsize=33)",
    ],
  },
  profiling: {
    label: "Profiling",
    subtitle: "Measure Before Optimizing",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-400",
    badgeLabel: "profiling",
    description:
      "Always measure before optimizing — intuition about bottlenecks is often wrong. timeit provides accurate micro-benchmarks by running code thousands of times. cProfile shows function-level call counts and cumulative time. line_profiler (third-party) gives line-by-line timing for targeted optimization.",
    keyPoints: [
      "timeit runs code thousands of times for accurate benchmarks",
      "cProfile shows per-function call counts and cumulative time",
      "line_profiler provides line-by-line execution timing",
      "Always profile first — never optimize without data",
    ],
    codeSnippet: `import timeit
import cProfile

# timeit — micro-benchmarks
list_time = timeit.timeit(
    "[x**2 for x in range(1000)]",
    number=1000
)
map_time = timeit.timeit(
    "list(map(lambda x: x**2, range(1000)))",
    number=1000
)
print(f"List comp:  \${list_time:.4f}s (1000 runs)")
print(f"map+lambda: \${map_time:.4f}s (1000 runs)")

# cProfile — function-level profiling
def process_data():
    data = [x**2 for x in range(10000)]
    filtered = [x for x in data if x % 3 == 0]
    total = sum(filtered)
    return total

print("\\ncProfile output:")
cProfile.run("process_data()")

# Profiling tip
print("Tip: Use line_profiler for line-by-line analysis")
print("  pip install line_profiler")
print("  @profile decorator + kernprof -l script.py")`,
    codeOutput: [
      "List comp:  0.0892s (1000 runs)",
      "map+lambda: 0.1134s (1000 runs)",
      "",
      "cProfile output:",
      "         6 function calls in 0.002 seconds",
      "",
      "   ncalls  tottime  filename:lineno(function)",
      "        1    0.001  <string>:1(process_data)",
      "        1    0.001  {built-in method builtins.sum}",
      "",
      "Tip: Use line_profiler for line-by-line analysis",
      "  pip install line_profiler",
      "  @profile decorator + kernprof -l script.py",
    ],
  },
};

const order: TopicKey[] = ["data-structures", "comprehensions", "caching", "profiling"];

const chipColors: Record<TopicKey, string> = {
  "data-structures": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  comprehensions: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  caching: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  profiling: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function PerformanceTipsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("data-structures");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Performance Tips</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Topic selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const t = topics[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  selected === key
                    ? chipColors[key] + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.label} — {t.subtitle}
              </button>
            );
          })}
        </div>

        {/* Animated detail area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Description banner */}
            <div className={`rounded-xl border px-4 py-3 text-sm ${topic.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold font-mono text-base">{topic.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${topic.badgeColor}`}>
                  {topic.badgeLabel}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Key points */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-muted-foreground">Key Points</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {topic.keyPoints.map((point) => (
                  <li
                    key={`kp-${selected}-${point}`}
                    className="text-xs text-muted-foreground flex items-start gap-1.5"
                  >
                    <span className="text-emerald-500 mt-0.5 select-none">*</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Two-column: Code | Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Code snippet */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Code</p>
                  <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[120px]">
                    {topic.codeSnippet}
                  </pre>
                </div>
              </div>

              {/* Right: Run + Output */}
              <div className="space-y-3">
                <Button size="sm" onClick={() => setOutputLines(topic.codeOutput)}>
                  <Play className="h-3.5 w-3.5 mr-1" /> Run
                </Button>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1.5">Output</p>
                  <ConsoleOutput lines={outputLines} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
