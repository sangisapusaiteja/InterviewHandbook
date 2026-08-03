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
type TopicKey = "basics" | "name-guard" | "sys-path" | "reload";

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
  basics: {
    label: "Module Basics",
    subtitle: "Import & Use .py Files",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "import",
    description:
      "A module is simply a .py file containing Python definitions and statements. You import a module with the import keyword, then access its attributes using dot notation. The built-in dir() function lists all names defined in a module, making it easy to explore what a module offers.",
    keyPoints: [
      "A module is any .py file with Python code",
      "Use import to load a module by filename (without .py)",
      "Access module contents with dot notation: module.func()",
      "dir(module) lists all names defined in the module",
    ],
    codeSnippet: `import math

# Using module attributes
print("pi:", math.pi)
print("sqrt(16):", math.sqrt(16))
print("ceil(4.2):", math.ceil(4.2))

# Selective import
from math import factorial, gcd
print("5!:", factorial(5))
print("gcd(12, 8):", gcd(12, 8))

# Exploring a module with dir()
names = [n for n in dir(math) if not n.startswith("_")]
print("Public names count:", len(names))
print("First 5:", names[:5])`,
    codeOutput: [
      "pi: 3.141592653589793",
      "sqrt(16): 4.0",
      "ceil(4.2): 5",
      "5!: 120",
      "gcd(12, 8): 4",
      "Public names count: 30",
      "First 5: ['acos', 'acosh', 'asin', 'asinh', 'atan']",
    ],
  },
  "name-guard": {
    label: "__name__ Guard",
    subtitle: "if __name__ == '__main__'",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "guard",
    description:
      "When Python runs a file directly, it sets __name__ to '__main__'. When the file is imported as a module, __name__ is set to the module's name instead. The if __name__ == '__main__' guard lets you include code that only runs when the file is executed directly, not when imported.",
    keyPoints: [
      "__name__ is '__main__' when a script is run directly",
      "__name__ is the module name when imported",
      "Guard prevents code from running on import",
      "Common pattern for scripts that double as importable modules",
    ],
    codeSnippet: `# Simulating __name__ behavior

# When run directly:
name_direct = "__main__"
print("Running directly:")
print(f"  __name__ = {name_direct}")

# When imported:
name_imported = "my_module"
print("When imported:")
print(f"  __name__ = {name_imported}")

# The guard pattern
def greet(name):
    return f"Hello, {name}!"

# This block only runs when executed directly
if name_direct == "__main__":
    print()
    print("Guard active — running as script")
    print(greet("World"))
    print("Tests or CLI logic goes here")`,
    codeOutput: [
      "Running directly:",
      "  __name__ = __main__",
      "When imported:",
      "  __name__ = my_module",
      "",
      "Guard active — running as script",
      "Hello, World!",
      "Tests or CLI logic goes here",
    ],
  },
  "sys-path": {
    label: "sys.path",
    subtitle: "Module Search Path",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "path",
    description:
      "When you import a module, Python searches for it in the directories listed in sys.path. This list starts with the script's directory, then includes PYTHONPATH environment variable entries, and finally the standard library and site-packages. You can modify sys.path at runtime to add custom module directories.",
    keyPoints: [
      "sys.path is a list of directories Python searches for modules",
      "Script directory is always first in sys.path",
      "PYTHONPATH env var adds extra search directories",
      "You can append to sys.path at runtime for custom paths",
    ],
    codeSnippet: `import sys

# Show first few entries in sys.path
print("sys.path entries:")
for i, path in enumerate(sys.path[:4]):
    label = path if path else "(current dir)"
    print(f"  [{i}] {label}")

print(f"  ... ({len(sys.path)} total entries)")

# Adding a custom path
custom = "/my/custom/modules"
sys.path.append(custom)
print(f"\\nAppended: {custom}")
print(f"Now {len(sys.path)} entries")

# Checking where a module lives
print(f"\\nmath module location:")
import math
print(f"  {math.__file__}")`,
    codeOutput: [
      "sys.path entries:",
      "  [0] (current dir)",
      "  [1] /usr/lib/python3.11",
      "  [2] /usr/lib/python3.11/lib-dynload",
      "  [3] /usr/lib/python3.11/site-packages",
      "  ... (6 total entries)",
      "",
      "Appended: /my/custom/modules",
      "Now 7 entries",
      "",
      "math module location:",
      "  /usr/lib/python3.11/lib-dynload/math.cpython-311-x86_64-linux-gnu.so",
    ],
  },
  reload: {
    label: "Module Reload",
    subtitle: "importlib.reload & Caching",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "reload",
    description:
      "Python caches imported modules in sys.modules so each module is loaded only once per interpreter session. If you modify a module's source and need the changes without restarting, use importlib.reload(). This is especially useful during interactive development and debugging sessions.",
    keyPoints: [
      "sys.modules is a dict caching all imported modules",
      "Subsequent imports reuse the cached module object",
      "importlib.reload() forces re-execution of module code",
      "Reload does not update from-imports already bound",
    ],
    codeSnippet: `import sys
import importlib
import math

# Check module caching in sys.modules
print("Is math cached?", "math" in sys.modules)
print("Same object?", sys.modules["math"] is math)

# Show some cached modules
cached = [k for k in sys.modules if not k.startswith("_")]
print(f"\\nCached modules: {len(cached)}")
print("First 5:", sorted(cached)[:5])

# Reloading a module
print("\\nReloading math module...")
reloaded = importlib.reload(math)
print("Reload successful:", reloaded is math)
print("pi still works:", reloaded.pi)

# Practical note
print("\\nNote: reload() re-executes module code")
print("Existing from-imports are NOT updated")`,
    codeOutput: [
      "Is math cached? True",
      "Same object? True",
      "",
      "Cached modules: 12",
      "First 5: ['abc', 'codecs', 'encodings', 'importlib', 'io']",
      "",
      "Reloading math module...",
      "Reload successful: True",
      "pi still works: 3.141592653589793",
      "",
      "Note: reload() re-executes module code",
      "Existing from-imports are NOT updated",
    ],
  },
};

const order: TopicKey[] = ["basics", "name-guard", "sys-path", "reload"];

const chipColors: Record<TopicKey, string> = {
  basics: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "name-guard": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  "sys-path": "bg-violet-500/15 border-violet-500/30 text-violet-400",
  reload: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ModulesVisualization() {
  const [selected, setSelected] = useState<TopicKey>("basics");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Modules</CardTitle>
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
