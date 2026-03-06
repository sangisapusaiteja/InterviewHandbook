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
type TopicKey = "files-dirs" | "path-ops" | "environment" | "os-walk";

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
  "files-dirs": {
    label: "Files & Dirs",
    subtitle: "os.listdir, mkdir, remove, rename",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/10 text-blue-400",
    badgeLabel: "filesystem",
    description:
      "The os module provides functions for interacting with the file system. os.listdir() returns the contents of a directory, os.mkdir() creates a new directory, os.remove() deletes a file, and os.rename() renames or moves a file or directory. These are the building blocks for file management in Python.",
    keyPoints: [
      "os.listdir(path) returns a list of entries in the directory",
      "os.mkdir(path) creates a single directory (use os.makedirs for nested)",
      "os.remove(path) deletes a file (use os.rmdir for empty dirs)",
      "os.rename(src, dst) renames or moves a file or directory",
    ],
    codeSnippet: `import os

# List current directory contents
files = os.listdir(".")
print("Directory contents:", files[:5])

# Create a new directory
os.mkdir("test_folder")
print("Created: test_folder")

# Rename the directory
os.rename("test_folder", "my_folder")
print("Renamed to: my_folder")

# Check it exists, then clean up
print("Exists:", os.path.exists("my_folder"))
os.rmdir("my_folder")
print("Removed: my_folder")`,
    codeOutput: [
      "Directory contents: ['main.py', 'utils.py', 'data', 'README.md', 'config.json']",
      "Created: test_folder",
      "Renamed to: my_folder",
      "Exists: True",
      "Removed: my_folder",
    ],
  },
  "path-ops": {
    label: "Path Operations",
    subtitle: "os.path.join, exists, basename, splitext",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400",
    badgeLabel: "os.path",
    description:
      "os.path provides portable path manipulation utilities. os.path.join() constructs paths with the correct separator for the OS. os.path.exists() checks if a path exists, basename() extracts the filename, and splitext() splits name and extension. These ensure your code works across platforms.",
    keyPoints: [
      "os.path.join() handles OS-specific separators automatically",
      "os.path.exists() returns True if the path exists",
      "os.path.basename() extracts the filename from a full path",
      "os.path.splitext() splits into (root, extension) tuple",
    ],
    codeSnippet: `import os

# Building paths portably
full_path = os.path.join("home", "user", "docs", "report.pdf")
print("Joined path:", full_path)

# Extracting components
print("Basename:", os.path.basename(full_path))
print("Directory:", os.path.dirname(full_path))

# Splitting extension
name, ext = os.path.splitext("archive.tar.gz")
print(f"Name: {name}, Ext: {ext}")

# Checking existence and type
print("Current dir exists:", os.path.exists("."))
print("Is directory:", os.path.isdir("."))
print("Is file:", os.path.isfile("nonexistent.txt"))

# Absolute path
print("Absolute:", os.path.abspath("."))`,
    codeOutput: [
      "Joined path: home/user/docs/report.pdf",
      "Basename: report.pdf",
      "Directory: home/user/docs",
      "Name: archive.tar, Ext: .gz",
      "Current dir exists: True",
      "Is directory: True",
      "Is file: False",
      "Absolute: /home/user/projects",
    ],
  },
  environment: {
    label: "Environment",
    subtitle: "os.environ, getenv, platform info",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/10 text-violet-400",
    badgeLabel: "env",
    description:
      "os.environ is a mapping object representing the environment variables. os.getenv() safely retrieves a variable with an optional default. You can also set environment variables at runtime and query platform information like the OS name and current working directory.",
    keyPoints: [
      "os.environ is a dict-like object of all environment variables",
      "os.getenv(key, default) safely reads env vars with a fallback",
      "os.environ[key] = value sets an env var for the process",
      "os.name, os.getcwd(), os.getpid() provide platform/process info",
    ],
    codeSnippet: `import os

# Reading environment variables
home = os.getenv("HOME", "/default/home")
print("HOME:", home)

# Safe access with default
db_url = os.getenv("DATABASE_URL", "sqlite:///local.db")
print("DB URL:", db_url)

# Setting an environment variable
os.environ["MY_APP_MODE"] = "production"
print("APP_MODE:", os.environ["MY_APP_MODE"])

# Platform information
print("OS name:", os.name)
print("Current dir:", os.getcwd())
print("Process ID:", os.getpid())

# Listing some env vars
env_count = len(os.environ)
print(f"Total env vars: \${env_count}")`,
    codeOutput: [
      "HOME: /home/user",
      "DB URL: sqlite:///local.db",
      "APP_MODE: production",
      "OS name: posix",
      "Current dir: /home/user/projects",
      "Process ID: 12345",
      "Total env vars: 42",
    ],
  },
  "os-walk": {
    label: "os.walk()",
    subtitle: "Recursive Directory Traversal",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/10 text-orange-400",
    badgeLabel: "traversal",
    description:
      "os.walk() generates (dirpath, dirnames, filenames) tuples for every directory in a tree, walking top-down by default. It is the standard way to recursively traverse directories, find specific files, and filter by extension or pattern. Combine it with os.path.join to get full paths.",
    keyPoints: [
      "os.walk(top) yields (dirpath, dirnames, filenames) for each dir",
      "Default is top-down traversal; use topdown=False for bottom-up",
      "Combine with os.path.join(dirpath, f) for full file paths",
      "Filter filenames by extension using str.endswith() or splitext()",
    ],
    codeSnippet: `import os

# Walk a project directory
for dirpath, dirnames, filenames in os.walk("my_project"):
    level = dirpath.replace("my_project", "").count(os.sep)
    indent = "  " * level
    print(f"\${indent}{os.path.basename(dirpath)}/")
    for f in filenames:
        print(f"\${indent}  {f}")

print()
# Find all Python files recursively
py_files = []
for dirpath, _, filenames in os.walk("my_project"):
    for f in filenames:
        if f.endswith(".py"):
            py_files.append(os.path.join(dirpath, f))

print("Python files found:")
for pf in py_files:
    print(f"  {pf}")
print(f"Total: \${len(py_files)} files")`,
    codeOutput: [
      "my_project/",
      "  main.py",
      "  config.json",
      "  src/",
      "    app.py",
      "    utils.py",
      "  tests/",
      "    test_app.py",
      "",
      "Python files found:",
      "  my_project/main.py",
      "  my_project/src/app.py",
      "  my_project/src/utils.py",
      "  my_project/tests/test_app.py",
      "Total: 4 files",
    ],
  },
};

const order: TopicKey[] = ["files-dirs", "path-ops", "environment", "os-walk"];

const chipColors: Record<TopicKey, string> = {
  "files-dirs": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "path-ops": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  environment: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "os-walk": "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function OsModuleVisualization() {
  const [selected, setSelected] = useState<TopicKey>("files-dirs");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python os Module</CardTitle>
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
