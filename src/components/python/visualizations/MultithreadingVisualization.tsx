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
type TopicKey = "thread-basics" | "gil-io" | "synchronization" | "threadpool";

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
  "thread-basics": {
    label: "Thread Basics",
    subtitle: "Thread(target, args), start(), join()",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-400",
    badgeLabel: "threading",
    description:
      "The threading module provides Thread objects to run functions concurrently. Create a thread with Thread(target=func, args=(...)), call .start() to begin execution, and .join() to wait for completion. Daemon threads run in the background and are killed when the main program exits.",
    keyPoints: [
      "Thread(target=fn, args=(...)) creates a new thread",
      ".start() begins thread execution in the background",
      ".join() blocks until the thread finishes",
      "Daemon threads (daemon=True) exit with the main program",
    ],
    codeSnippet: `import threading
import time

def worker(name, delay):
    print(f"[\{name}] Starting...")
    time.sleep(delay)
    print(f"[\{name}] Done after \{delay}s")

# Create threads
t1 = threading.Thread(target=worker, args=("Thread-1", 2))
t2 = threading.Thread(target=worker, args=("Thread-2", 1))

t1.start()
t2.start()

# Wait for both to finish
t1.join()
t2.join()
print("All threads completed")

# Daemon thread example
d = threading.Thread(target=worker, args=("Daemon", 5), daemon=True)
d.start()
print(f"Daemon alive: \{d.is_alive()}")`,
    codeOutput: [
      "[Thread-1] Starting...",
      "[Thread-2] Starting...",
      "[Thread-2] Done after 1s",
      "[Thread-1] Done after 2s",
      "All threads completed",
      "[Daemon] Starting...",
      "Daemon alive: True",
    ],
  },
  "gil-io": {
    label: "GIL & I/O",
    subtitle: "Global Interpreter Lock & Concurrency",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    badgeLabel: "GIL",
    description:
      "The Global Interpreter Lock (GIL) allows only one thread to execute Python bytecode at a time. This means threads don't speed up CPU-bound work, but they DO help with I/O-bound tasks because the GIL is released during I/O operations like network requests, file reads, and sleep calls.",
    keyPoints: [
      "GIL allows only one thread to run Python bytecode at a time",
      "I/O-bound tasks benefit from threading (GIL released during I/O)",
      "CPU-bound tasks should use multiprocessing instead",
      "Use time comparisons to verify threading benefits",
    ],
    codeSnippet: `import threading
import time

# I/O-bound task (simulated with sleep)
def fetch_url(url, delay):
    print(f"Fetching \{url}...")
    time.sleep(delay)  # GIL released here!
    print(f"Done: \{url}")

# Sequential execution
start = time.time()
fetch_url("api/users", 1)
fetch_url("api/posts", 1)
fetch_url("api/comments", 1)
seq_time = time.time() - start
print(f"Sequential: \{seq_time:.1f}s")

# Threaded execution
start = time.time()
threads = []
for url, d in [("api/users",1), ("api/posts",1), ("api/comments",1)]:
    t = threading.Thread(target=fetch_url, args=(url, d))
    threads.append(t)
    t.start()
for t in threads:
    t.join()
par_time = time.time() - start
print(f"Threaded:   \{par_time:.1f}s")`,
    codeOutput: [
      "Fetching api/users...",
      "Done: api/users",
      "Fetching api/posts...",
      "Done: api/posts",
      "Fetching api/comments...",
      "Done: api/comments",
      "Sequential: 3.0s",
      "Fetching api/users...",
      "Fetching api/posts...",
      "Fetching api/comments...",
      "Done: api/users",
      "Done: api/posts",
      "Done: api/comments",
      "Threaded:   1.0s",
    ],
  },
  synchronization: {
    label: "Synchronization",
    subtitle: "Lock, RLock & Thread Safety",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/20 text-violet-400",
    badgeLabel: "Lock",
    description:
      "When multiple threads access shared data, race conditions can corrupt state. A Lock ensures only one thread enters a critical section at a time. RLock (reentrant lock) allows the same thread to acquire it multiple times. Always use 'with lock:' context manager for safety.",
    keyPoints: [
      "Race conditions occur when threads read/write shared data unsafely",
      "Lock.acquire() / Lock.release() or 'with lock:' for mutual exclusion",
      "RLock allows the same thread to acquire the lock multiple times",
      "Context manager ('with lock:') guarantees release even on exceptions",
    ],
    codeSnippet: `import threading

# Race condition demo (unsafe)
counter_unsafe = 0

def increment_unsafe():
    global counter_unsafe
    for _ in range(100000):
        counter_unsafe += 1  # NOT thread-safe!

# Thread-safe version with Lock
counter_safe = 0
lock = threading.Lock()

def increment_safe():
    global counter_safe
    for _ in range(100000):
        with lock:  # context manager = safe
            counter_safe += 1

# Run unsafe version
threads = [threading.Thread(target=increment_unsafe) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Unsafe counter: \{counter_unsafe}")
print(f"Expected:       200000")

# Run safe version
threads = [threading.Thread(target=increment_safe) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(f"Safe counter:   \{counter_safe}")`,
    codeOutput: [
      "Unsafe counter: 143267",
      "Expected:       200000",
      "Safe counter:   200000",
    ],
  },
  threadpool: {
    label: "ThreadPoolExecutor",
    subtitle: "concurrent.futures High-Level API",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-400",
    badgeLabel: "futures",
    description:
      "ThreadPoolExecutor from concurrent.futures provides a high-level interface for managing thread pools. Use submit() for individual tasks returning Future objects, map() for applying a function across iterables, and as_completed() to process results as they finish.",
    keyPoints: [
      "ThreadPoolExecutor manages a pool of reusable threads",
      "submit(fn, *args) returns a Future; call .result() to get the value",
      "map(fn, iterable) applies fn to each item in parallel",
      "as_completed(futures) yields futures as they finish",
    ],
    codeSnippet: `from concurrent.futures import (
    ThreadPoolExecutor, as_completed
)
import time

def download(url):
    time.sleep(1)  # simulate I/O
    return f"Data from \{url}"

urls = ["page/1", "page/2", "page/3", "page/4"]

# Using submit + as_completed
with ThreadPoolExecutor(max_workers=4) as pool:
    futures = {pool.submit(download, u): u for u in urls}
    for future in as_completed(futures):
        url = futures[future]
        print(f"\{url} -> \{future.result()}")

# Using map (preserves order)
with ThreadPoolExecutor(max_workers=4) as pool:
    results = pool.map(download, urls)
    for url, result in zip(urls, results):
        print(f"map: \{url} -> \{result}")`,
    codeOutput: [
      "page/3 -> Data from page/3",
      "page/1 -> Data from page/1",
      "page/4 -> Data from page/4",
      "page/2 -> Data from page/2",
      "map: page/1 -> Data from page/1",
      "map: page/2 -> Data from page/2",
      "map: page/3 -> Data from page/3",
      "map: page/4 -> Data from page/4",
    ],
  },
};

const order: TopicKey[] = ["thread-basics", "gil-io", "synchronization", "threadpool"];

const chipColors: Record<TopicKey, string> = {
  "thread-basics": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "gil-io": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  synchronization: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  threadpool: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function MultithreadingVisualization() {
  const [selected, setSelected] = useState<TopicKey>("thread-basics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Multithreading</CardTitle>
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
