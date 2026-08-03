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
type TopicKey = "structure" | "init" | "pip" | "distribution";

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
  structure: {
    label: "Package Structure",
    subtitle: "Directory with __init__.py",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "structure",
    description:
      "A Python package is a directory containing an __init__.py file and optionally sub-packages and modules. The directory hierarchy mirrors the import path, allowing logical grouping of related modules. Sub-packages are simply nested directories, each with their own __init__.py.",
    keyPoints: [
      "A package is a directory with an __init__.py file",
      "Sub-packages are nested directories with their own __init__.py",
      "Module files (.py) live inside the package directory",
      "Directory structure maps directly to import paths",
    ],
    codeSnippet: `import os

# Simulating a package directory layout
layout = {
    "mypackage/": None,
    "mypackage/__init__.py": "",
    "mypackage/utils.py": "def greet(): ...",
    "mypackage/core/": None,
    "mypackage/core/__init__.py": "",
    "mypackage/core/engine.py": "class Engine: ...",
}

print("Package layout:")
for path in layout:
    indent = "  " * path.count("/")
    name = path.rstrip("/").split("/")[-1]
    if path.endswith("/"):
        print(f"\{indent}[dir] \{name}/")
    else:
        print(f"\{indent}\{name}")

# Import path examples
print()
print("Import examples:")
print("import mypackage")
print("from mypackage import utils")
print("from mypackage.core import engine")`,
    codeOutput: [
      "Package layout:",
      "  [dir] mypackage/",
      "    __init__.py",
      "    utils.py",
      "    [dir] core/",
      "      __init__.py",
      "      engine.py",
      "",
      "Import examples:",
      "import mypackage",
      "from mypackage import utils",
      "from mypackage.core import engine",
    ],
  },
  init: {
    label: "__init__.py",
    subtitle: "Package Initialization",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "init",
    description:
      "The __init__.py file marks a directory as a Python package and runs when the package is first imported. It is commonly used to expose a clean public API by importing key names from sub-modules, define __all__ to control wildcard imports, and perform package-level initialization.",
    keyPoints: [
      "__init__.py runs when the package is first imported",
      "Use it to expose a clean public API from sub-modules",
      "__all__ controls what 'from package import *' exports",
      "Can be empty or contain initialization logic",
    ],
    codeSnippet: `# Simulating __init__.py behavior

# Example __init__.py content:
init_content = '''
from .utils import greet
from .core.engine import Engine

__all__ = ["greet", "Engine"]

print("mypackage initialized!")
'''

print("__init__.py content:")
print(init_content)

# Show __all__ usage
__all__ = ["greet", "Engine"]
print("Exported names via __all__:")
for name in __all__:
    print(f"  - \{name}")

print()
print("With __all__, 'from mypackage import *'")
print("only imports: greet, Engine")`,
    codeOutput: [
      "__init__.py content:",
      "",
      "from .utils import greet",
      "from .core.engine import Engine",
      "",
      '__all__ = ["greet", "Engine"]',
      "",
      "print(\"mypackage initialized!\")",
      "",
      "Exported names via __all__:",
      "  - greet",
      "  - Engine",
      "",
      "With __all__, 'from mypackage import *'",
      "only imports: greet, Engine",
    ],
  },
  pip: {
    label: "pip & PyPI",
    subtitle: "Installing Packages",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "pip",
    description:
      "pip is the standard package installer for Python, downloading packages from the Python Package Index (PyPI). Use pip install to add packages, pip freeze to capture versions, and requirements.txt to reproduce environments. Virtual environments isolate project dependencies from the system Python.",
    keyPoints: [
      "pip install <package> downloads from PyPI",
      "pip freeze > requirements.txt captures dependencies",
      "pip install -r requirements.txt reproduces an environment",
      "Virtual environments isolate per-project dependencies",
    ],
    codeSnippet: `import subprocess
import sys

# Common pip commands (as strings)
commands = [
    "pip install requests",
    "pip install requests==2.31.0",
    "pip install --upgrade requests",
    "pip uninstall requests",
    "pip freeze > requirements.txt",
    "pip install -r requirements.txt",
]

print("Common pip commands:")
for cmd in commands:
    print(f"  \$ \{cmd}")

# Virtual environment workflow
print()
print("Virtual environment workflow:")
venv_steps = [
    "python -m venv myenv",
    "source myenv/bin/activate  # Linux/Mac",
    "myenv\\\\Scripts\\\\activate   # Windows",
    "pip install requests",
    "pip freeze > requirements.txt",
    "deactivate",
]
for step in venv_steps:
    print(f"  \$ \{step}")

print()
print(f"Current Python: \{sys.version.split()[0]}")`,
    codeOutput: [
      "Common pip commands:",
      "  $ pip install requests",
      "  $ pip install requests==2.31.0",
      "  $ pip install --upgrade requests",
      "  $ pip uninstall requests",
      "  $ pip freeze > requirements.txt",
      "  $ pip install -r requirements.txt",
      "",
      "Virtual environment workflow:",
      "  $ python -m venv myenv",
      "  $ source myenv/bin/activate  # Linux/Mac",
      "  $ myenv\\Scripts\\activate   # Windows",
      "  $ pip install requests",
      "  $ pip freeze > requirements.txt",
      "  $ deactivate",
      "",
      "Current Python: 3.12.0",
    ],
  },
  distribution: {
    label: "Distribution",
    subtitle: "Building & Publishing",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "dist",
    description:
      "To share a Python package, define metadata in pyproject.toml (modern) or setup.py (legacy). Use build tools to create source distributions and wheels, then upload to PyPI with twine. pyproject.toml is now the standard, consolidating build system config, project metadata, and tool settings in one file.",
    keyPoints: [
      "pyproject.toml is the modern standard for project metadata",
      "setup.py is the legacy approach, still widely seen",
      "Build with 'python -m build' to create sdist and wheel",
      "Upload to PyPI with 'twine upload dist/*'",
    ],
    codeSnippet: `# pyproject.toml example (as a string)
pyproject = """
[build-system]
requires = ["setuptools>=68.0", "wheel"]
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "mypackage"
version = "1.0.0"
description = "A sample Python package"
requires-python = ">=3.8"
dependencies = [
    "requests>=2.28",
    "click>=8.0",
]
"""

print("pyproject.toml:")
print(pyproject)

# Build & publish workflow
print("Build & publish workflow:")
steps = [
    "pip install build twine",
    "python -m build",
    "twine check dist/*",
    "twine upload dist/*",
]
for step in steps:
    print(f"  \$ \{step}")

print()
print("Output files after build:")
print("  dist/mypackage-1.0.0.tar.gz   (sdist)")
print("  dist/mypackage-1.0.0-py3-none-any.whl (wheel)")`,
    codeOutput: [
      "pyproject.toml:",
      "",
      "[build-system]",
      'requires = ["setuptools>=68.0", "wheel"]',
      'build-backend = "setuptools.backends._legacy:_Backend"',
      "",
      "[project]",
      'name = "mypackage"',
      'version = "1.0.0"',
      'description = "A sample Python package"',
      'requires-python = ">=3.8"',
      "dependencies = [",
      '    "requests>=2.28",',
      '    "click>=8.0",',
      "]",
      "",
      "Build & publish workflow:",
      "  $ pip install build twine",
      "  $ python -m build",
      "  $ twine check dist/*",
      "  $ twine upload dist/*",
      "",
      "Output files after build:",
      "  dist/mypackage-1.0.0.tar.gz   (sdist)",
      "  dist/mypackage-1.0.0-py3-none-any.whl (wheel)",
    ],
  },
};

const order: TopicKey[] = ["structure", "init", "pip", "distribution"];

const chipColors: Record<TopicKey, string> = {
  structure: "bg-blue-500/15 border-blue-500/30 text-blue-400",
  init: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  pip: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  distribution: "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function PackagesVisualization() {
  const [selected, setSelected] = useState<TopicKey>("structure");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Packages</CardTitle>
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
