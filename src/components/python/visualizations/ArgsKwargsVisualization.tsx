"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Layers, BookOpen, Combine, Unplug } from "lucide-react";
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
type TopicKey = "args" | "kwargs" | "combined" | "unpacking";

interface TopicInfo {
  label: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  badgeColor: string;
  description: string;
  codeSnippet: string;
  codeOutput: string[];
  flowVisual: { input: string[]; target: string; targetLabel: string };
}

// ─── data ─────────────────────────────────────────────────────────────────────
const topics: Record<TopicKey, TopicInfo> = {
  args: {
    label: "*args",
    subtitle: "Tuple",
    icon: <Layers className="h-3.5 w-3.5" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "*args collects any extra positional arguments into a tuple. The function can then iterate over them, index them, or pass them along. The name 'args' is convention — the * is what matters.",
    codeSnippet: `def sum_all(*args):
    print(f"args = {args}")
    print(f"type = {type(args).__name__}")
    total = 0
    for num in args:
        total += num
    return total

result = sum_all(1, 2, 3, 4, 5)
print(f"Sum: {result}")

# Works with any number of arguments
print(f"Sum: {sum_all(10, 20)}")
print(f"Sum: {sum_all(7)}")`,
    codeOutput: [
      "args = (1, 2, 3, 4, 5)",
      "type = tuple",
      "Sum: 15",
      "args = (10, 20)",
      "type = tuple",
      "Sum: 30",
      "args = (7,)",
      "type = tuple",
      "Sum: 7",
    ],
    flowVisual: {
      input: ["1", "2", "3", "4", "5"],
      target: "args",
      targetLabel: "tuple: (1, 2, 3, 4, 5)",
    },
  },
  kwargs: {
    label: "**kwargs",
    subtitle: "Dict",
    icon: <BookOpen className="h-3.5 w-3.5" />,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "**kwargs collects any extra keyword arguments into a dictionary. Keys are the argument names (strings) and values are whatever was passed. Like *args, the name 'kwargs' is convention — the ** is what matters.",
    codeSnippet: `def print_info(**kwargs):
    print(f"kwargs = {kwargs}")
    print(f"type = {type(kwargs).__name__}")
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

print_info(name="Alice", age=30, role="Engineer")`,
    codeOutput: [
      "kwargs = {'name': 'Alice', 'age': 30, 'role': 'Engineer'}",
      "type = dict",
      "  name: Alice",
      "  age: 30",
      "  role: Engineer",
    ],
    flowVisual: {
      input: ["name='Alice'", "age=30", "role='Engineer'"],
      target: "kwargs",
      targetLabel: "dict: {'name': 'Alice', 'age': 30, ...}",
    },
  },
  combined: {
    label: "Combined Usage",
    subtitle: "All Together",
    icon: <Combine className="h-3.5 w-3.5" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "You can mix regular parameters, *args, and **kwargs in one function. The order must be: positional params, *args, keyword-only params, **kwargs. This is how many library functions accept flexible inputs.",
    codeSnippet: `def log(level, *args, **kwargs):
    print(f"[{level}]", end=" ")
    # *args -> extra positional messages
    for msg in args:
        print(msg, end=" ")
    # **kwargs -> metadata key=value pairs
    if kwargs:
        meta = ", ".join(f"{k}={v}" for k, v in kwargs.items())
        print(f"| {meta}")
    else:
        print()

log("INFO", "Server started", port=8080, host="0.0.0.0")
log("WARN", "Disk usage high", "Check /var", threshold=90)
log("ERROR", "Connection lost")`,
    codeOutput: [
      "[INFO] Server started | port=8080, host=0.0.0.0",
      "[WARN] Disk usage high Check /var | threshold=90",
      "[ERROR] Connection lost",
    ],
    flowVisual: {
      input: ['"INFO"', '"Server started"', "port=8080"],
      target: "level / *args / **kwargs",
      targetLabel: 'level="INFO", args=("Server...",), kwargs={...}',
    },
  },
  unpacking: {
    label: "Unpacking",
    subtitle: "* and **",
    icon: <Unplug className="h-3.5 w-3.5" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The * and ** operators also work in reverse — they unpack a list/tuple or dict into individual arguments when calling a function. This is essential for decorator forwarding and passing data structures as arguments.",
    codeSnippet: `def greet(name, age, city):
    print(f"{name}, {age}, from {city}")

# Unpack a list with *
info_list = ["Alice", 30, "NYC"]
greet(*info_list)

# Unpack a dict with **
info_dict = {"name": "Bob", "age": 25, "city": "LA"}
greet(**info_dict)

# Decorator forwarding pattern
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before call")
        result = func(*args, **kwargs)
        print("After call")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")

say_hello("Charlie")`,
    codeOutput: [
      "Alice, 30, from NYC",
      "Bob, 25, from LA",
      "Before call",
      "Hello, Charlie!",
      "After call",
    ],
    flowVisual: {
      input: ['["Alice", 30, "NYC"]', '{"name": "Bob", ...}'],
      target: "greet(name, age, city)",
      targetLabel: "* unpacks list, ** unpacks dict",
    },
  },
};

const order: TopicKey[] = ["args", "kwargs", "combined", "unpacking"];

const chipColors: Record<TopicKey, string> = {
  args: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  kwargs: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  combined: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  unpacking: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
};

const flowArrowColors: Record<TopicKey, string> = {
  args: "bg-blue-500",
  kwargs: "bg-emerald-500",
  combined: "bg-violet-500",
  unpacking: "bg-orange-500",
};

const flowBadgeColors: Record<TopicKey, string> = {
  args: "border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  kwargs: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  combined: "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  unpacking: "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-300",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ArgsKwargsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("args");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python *args &amp; **kwargs</CardTitle>
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
                {t.icon}
                {t.label} ({t.subtitle})
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
                  {topic.subtitle}
                </Badge>
              </div>
              <p className="leading-relaxed opacity-90">{topic.description}</p>
            </div>

            {/* Argument flow visual */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Argument Flow</p>
              <div className="rounded-xl border bg-muted/20 px-4 py-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {/* Input args */}
                  <div className="flex flex-wrap gap-1.5">
                    {topic.flowVisual.input.map((arg) => (
                      <motion.span
                        key={`flow-in-${arg}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`inline-block rounded-lg border px-2.5 py-1 text-xs font-mono font-medium ${flowBadgeColors[selected]}`}
                      >
                        {arg}
                      </motion.span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="flex items-center gap-1 origin-left"
                  >
                    <div className={`h-0.5 w-8 ${flowArrowColors[selected]} rounded-full`} />
                    <div
                      className={`w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] ${
                        selected === "args"
                          ? "border-l-blue-500"
                          : selected === "kwargs"
                          ? "border-l-emerald-500"
                          : selected === "combined"
                          ? "border-l-violet-500"
                          : "border-l-orange-500"
                      }`}
                    />
                  </motion.div>

                  {/* Target container */}
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className={`rounded-xl border-2 border-dashed px-4 py-2 text-center ${flowBadgeColors[selected]}`}
                  >
                    <p className="text-xs font-mono font-bold">{topic.flowVisual.target}</p>
                    <p className="text-[10px] opacity-75 mt-0.5">{topic.flowVisual.targetLabel}</p>
                  </motion.div>
                </div>
              </div>
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

        {/* Comparison table */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-muted-foreground">*args vs **kwargs — Comparison</p>
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Aspect</th>
                  <th className="text-left px-3 py-2 font-semibold text-blue-700 dark:text-blue-300">
                    <code>*args</code>
                  </th>
                  <th className="text-left px-3 py-2 font-semibold text-emerald-700 dark:text-emerald-300">
                    <code>**kwargs</code>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Collects</td>
                  <td className="px-3 py-2">Extra positional arguments</td>
                  <td className="px-3 py-2">Extra keyword arguments</td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Stored as</td>
                  <td className="px-3 py-2">
                    <code className="text-blue-600 dark:text-blue-400">tuple</code>
                  </td>
                  <td className="px-3 py-2">
                    <code className="text-emerald-600 dark:text-emerald-400">dict</code>
                  </td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Syntax</td>
                  <td className="px-3 py-2">
                    <code>def f(*args)</code>
                  </td>
                  <td className="px-3 py-2">
                    <code>def f(**kwargs)</code>
                  </td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Unpacking</td>
                  <td className="px-3 py-2">
                    <code>f(*my_list)</code>
                  </td>
                  <td className="px-3 py-2">
                    <code>f(**my_dict)</code>
                  </td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Order in def</td>
                  <td className="px-3 py-2">After positional params</td>
                  <td className="px-3 py-2">Always last</td>
                </tr>
                <tr className="border-t border-border/50">
                  <td className="px-3 py-2 font-medium text-muted-foreground">Common use</td>
                  <td className="px-3 py-2">Flexible positional input, wrappers</td>
                  <td className="px-3 py-2">Config options, metadata, forwarding</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
