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
type TopicKey = "process-basics" | "pool-map" | "communication" | "executor";

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
  "process-basics": {
    label: "Process Basics",
    subtitle: "Process(target, args), start(), join()",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-400",
    badgeLabel: "process",
    description:
      "The multiprocessing module lets you spawn separate OS processes, each with its own memory space. You create a Process by passing a target function and args, then call start() to launch it and join() to wait for completion. Unlike threads, each process has independent memory so there are no shared-state race conditions.",
    keyPoints: [
      "Process(target=func, args=(...)) creates a new process",
      "start() launches the process, join() waits for it to finish",
      "Each process has its own separate memory space",
      "Bypasses the GIL for true CPU parallelism",
    ],
    codeSnippet: `import multiprocessing
import os

def worker(name):
    print(f"Worker \${name} | PID: \${os.getpid()}")

if __name__ == "__main__":
    print(f"Main process PID: \${os.getpid()}")

    p1 = multiprocessing.Process(target=worker, args=("A",))
    p2 = multiprocessing.Process(target=worker, args=("B",))

    p1.start()
    p2.start()

    p1.join()
    p2.join()

    print("Both processes finished")`,
    codeOutput: [
      "Main process PID: 12345",
      "Worker A | PID: 12346",
      "Worker B | PID: 12347",
      "Both processes finished",
    ],
  },
  "pool-map": {
    label: "Pool & map",
    subtitle: "Pool(processes), pool.map()",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    badgeLabel: "pool",
    description:
      "multiprocessing.Pool manages a pool of worker processes and distributes tasks across them. pool.map() applies a function to every item in an iterable in parallel, collecting results in order. Use pool.starmap() for functions that take multiple arguments, and always close/join or use a context manager.",
    keyPoints: [
      "Pool(processes=N) creates N reusable worker processes",
      "pool.map(func, iterable) distributes work and collects results",
      "pool.starmap() supports functions with multiple arguments",
      "Use 'with' context manager for automatic cleanup",
    ],
    codeSnippet: `from multiprocessing import Pool

def square(n):
    return n * n

def cube(n):
    return n * n * n

if __name__ == "__main__":
    numbers = [1, 2, 3, 4, 5]

    with Pool(processes=3) as pool:
        squares = pool.map(square, numbers)
        print(f"Squares: \${squares}")

        cubes = pool.map(cube, numbers)
        print(f"Cubes:   \${cubes}")

        # Async variant
        result = pool.map_async(square, [10, 20, 30])
        print(f"Async:   \${result.get()}")`,
    codeOutput: [
      "Squares: [1, 4, 9, 16, 25]",
      "Cubes:   [1, 8, 27, 64, 125]",
      "Async:   [100, 400, 900]",
    ],
  },
  communication: {
    label: "Communication",
    subtitle: "Queue, Pipe, Value, Array",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/20 text-violet-400",
    badgeLabel: "ipc",
    description:
      "Since processes have separate memory, you need special objects for inter-process communication. Queue provides a thread/process-safe FIFO queue. Pipe creates a two-way connection between two processes. Value and Array create shared memory objects backed by ctypes, allowing direct data sharing with synchronization.",
    keyPoints: [
      "Queue is a process-safe FIFO for passing messages",
      "Pipe returns (conn1, conn2) for two-way communication",
      "Value('type', init) creates a shared ctypes value",
      "Array('type', seq) creates a shared ctypes array",
    ],
    codeSnippet: `from multiprocessing import Process, Queue, Value, Array

def producer(q):
    for item in ["apple", "banana", "cherry"]:
        q.put(item)
    q.put(None)  # sentinel

def consumer(q):
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Got: \${item}")

def increment(shared_val, shared_arr):
    shared_val.value += 10
    for i in range(len(shared_arr)):
        shared_arr[i] *= 2

if __name__ == "__main__":
    q = Queue()
    Process(target=producer, args=(q,)).start()
    consumer(q)

    val = Value('i', 5)
    arr = Array('i', [1, 2, 3])
    p = Process(target=increment, args=(val, arr))
    p.start()
    p.join()
    print(f"Value: \${val.value}, Array: \${list(arr)}")`,
    codeOutput: [
      "Got: apple",
      "Got: banana",
      "Got: cherry",
      "Value: 15, Array: [2, 4, 6]",
    ],
  },
  executor: {
    label: "ProcessPoolExecutor",
    subtitle: "concurrent.futures high-level API",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-400",
    badgeLabel: "futures",
    description:
      "concurrent.futures.ProcessPoolExecutor provides a high-level interface for process-based parallelism. It uses the same API as ThreadPoolExecutor, making it easy to switch between threads and processes. submit() returns Future objects you can query, while map() works like the built-in but runs in parallel.",
    keyPoints: [
      "Same API as ThreadPoolExecutor — easy to swap",
      "submit(fn, *args) returns a Future with .result()",
      "map(fn, iterable) returns results in order",
      "as_completed() yields futures as they finish",
    ],
    codeSnippet: `from concurrent.futures import (
    ProcessPoolExecutor,
    as_completed
)
import time

def heavy_task(n):
    time.sleep(0.5)
    return n * n

if __name__ == "__main__":
    with ProcessPoolExecutor(max_workers=3) as exe:
        # Using submit + as_completed
        futures = {exe.submit(heavy_task, i): i for i in range(5)}
        for f in as_completed(futures):
            n = futures[f]
            print(f"Task \${n} => \${f.result()}")

        # Using map (ordered results)
        results = list(exe.map(heavy_task, [10, 20, 30]))
        print(f"Map results: \${results}")

    # Comparing with ThreadPoolExecutor
    # Just change ProcessPoolExecutor -> ThreadPoolExecutor
    print("Same API works for threads and processes!")`,
    codeOutput: [
      "Task 2 => 4",
      "Task 0 => 0",
      "Task 1 => 1",
      "Task 3 => 9",
      "Task 4 => 16",
      "Map results: [100, 400, 900]",
      "Same API works for threads and processes!",
    ],
  },
};

const order: TopicKey[] = ["process-basics", "pool-map", "communication", "executor"];

const chipColors: Record<TopicKey, string> = {
  "process-basics": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "pool-map": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  communication: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  executor: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function MultiprocessingVisualization() {
  const [selected, setSelected] = useState<TopicKey>("process-basics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Multiprocessing</CardTitle>
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
