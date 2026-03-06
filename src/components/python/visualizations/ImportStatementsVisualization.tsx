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
type TopicKey = "import-module" | "from-import" | "aliases" | "pep8-order";

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
  "import-module": {
    label: "import Module",
    subtitle: "Basic Import",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "import",
    description:
      "The import statement loads an entire module into the current namespace. You access its contents using dot notation (module.name). This keeps the namespace clean and makes it clear where each name comes from, which is helpful for readability and avoiding name collisions.",
    keyPoints: [
      "import loads the entire module object",
      "Access members via module.name dot notation",
      "Module acts as a namespace to avoid collisions",
      "Python caches imported modules in sys.modules",
    ],
    codeSnippet: `import math
import os

# Access via module.name
print("Pi:", math.pi)
print("Sqrt(16):", math.sqrt(16))
print("Ceil(4.2):", math.ceil(4.2))

# os module example
print("CWD:", os.getcwd())
print("Path sep:", os.sep)

# Module is an object
print("Type:", type(math))
print("Dir sample:", dir(math)[:5])`,
    codeOutput: [
      "Pi: 3.141592653589793",
      "Sqrt(16): 4.0",
      "Ceil(4.2): 5",
      "CWD: /home/user/project",
      "Path sep: /",
      "Type: <class 'module'>",
      "Dir sample: ['__doc__', '__loader__', '__name__', '__package__', '__spec__']",
    ],
  },
  "from-import": {
    label: "from...import",
    subtitle: "Selective Import",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "from",
    description:
      "The from...import syntax imports specific names directly into the current namespace. This allows direct access without the module prefix. You can import multiple names in one statement. The __all__ variable in a module controls what gets exported with from module import *.",
    keyPoints: [
      "Imports specific names directly into namespace",
      "No module prefix needed for access",
      "Can import multiple names: from x import a, b, c",
      "__all__ controls what 'from module import *' exports",
    ],
    codeSnippet: `from math import pi, sqrt, ceil
from os.path import join, exists

# Direct access without prefix
print("Pi:", pi)
print("Sqrt(25):", sqrt(25))
print("Ceil(7.1):", ceil(7.1))

# os.path functions directly
path = join("home", "user", "file.txt")
print("Joined path:", path)

# Multiple imports in one line
from collections import Counter, defaultdict
words = ["apple", "banana", "apple", "cherry"]
print("Counts:", Counter(words))

# defaultdict example
dd = defaultdict(int)
dd["key"] += 1
print("Default dict:", dict(dd))`,
    codeOutput: [
      "Pi: 3.141592653589793",
      "Sqrt(25): 5.0",
      "Ceil(7.1): 8",
      "Joined path: home/user/file.txt",
      "Counts: Counter({'apple': 2, 'banana': 1, 'cherry': 1})",
      "Default dict: {'key': 1}",
    ],
  },
  aliases: {
    label: "Aliases",
    subtitle: "import as / from...import as",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "as",
    description:
      "The 'as' keyword creates an alias for a module or imported name. This is useful for shortening long module names or avoiding name conflicts. Common conventions include np for numpy, pd for pandas, and plt for matplotlib.pyplot. These aliases are widely recognised in the Python community.",
    keyPoints: [
      "import module as alias shortens long names",
      "from module import name as alias avoids conflicts",
      "Common conventions: np, pd, plt, tf, sns",
      "Aliases improve readability for frequently used modules",
    ],
    codeSnippet: `# Module aliases
import math as m
import collections as col
import datetime as dt

print("Pi via alias:", m.pi)
print("Factorial(5):", m.factorial(5))

# Common conventions (shown as pattern)
# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt

# from...import with alias
from collections import OrderedDict as OD
from datetime import datetime as DateTime

od = OD([("a", 1), ("b", 2), ("c", 3)])
print("OrderedDict:", od)

now = DateTime.now()
print("Year:", now.year)

# Avoiding name conflicts
from math import log as math_log
print("math_log(100):", math_log(100))
print("Common aliases: np, pd, plt, tf, sns")`,
    codeOutput: [
      "Pi via alias: 3.141592653589793",
      "Factorial(5): 120",
      "OrderedDict: OrderedDict([('a', 1), ('b', 2), ('c', 3)])",
      "Year: 2025",
      "math_log(100): 4.605170185988092",
      "Common aliases: np, pd, plt, tf, sns",
    ],
  },
  "pep8-order": {
    label: "PEP 8 Order",
    subtitle: "Import Organization",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "style",
    description:
      "PEP 8 recommends organising imports into three groups separated by blank lines: (1) standard library imports, (2) third-party library imports, and (3) local application imports. Each group should be alphabetically sorted. Tools like isort can automate this ordering for consistent codebases.",
    keyPoints: [
      "Group 1: Standard library (os, sys, math, etc.)",
      "Group 2: Third-party packages (requests, numpy, etc.)",
      "Group 3: Local application/project imports",
      "Separate groups with a blank line, sort alphabetically",
    ],
    codeSnippet: `# PEP 8 Import Order Example:
#
# Group 1: Standard Library
# import math
# import os
# import sys
# from collections import defaultdict
# from pathlib import Path
#
# Group 2: Third-Party
# import numpy as np
# import pandas as pd
# from flask import Flask
#
# Group 3: Local Application
# from myapp.models import User
# from myapp.utils import helper

# Demonstrating the concept
import math
import os
import sys

print("=== PEP 8 Import Order ===")
print("1. stdlib:", "math, os, sys")
print("2. third-party:", "numpy, pandas, flask")
print("3. local:", "myapp.models, myapp.utils")
print()
print("Sorted alphabetically within groups")
print("Separated by blank lines")
print()
print("Tools: isort, black, ruff")
print("sys.path entries:", len(sys.path))`,
    codeOutput: [
      "=== PEP 8 Import Order ===",
      "1. stdlib: math, os, sys",
      "2. third-party: numpy, pandas, flask",
      "3. local: myapp.models, myapp.utils",
      "",
      "Sorted alphabetically within groups",
      "Separated by blank lines",
      "",
      "Tools: isort, black, ruff",
      "sys.path entries: 8",
    ],
  },
};

const order: TopicKey[] = ["import-module", "from-import", "aliases", "pep8-order"];

const chipColors: Record<TopicKey, string> = {
  "import-module": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "from-import": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  aliases: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "pep8-order": "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function ImportStatementsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("import-module");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Import Statements</CardTitle>
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
