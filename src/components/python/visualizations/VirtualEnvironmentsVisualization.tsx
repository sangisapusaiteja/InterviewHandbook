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
type TopicKey = "creating-venv" | "pip-mgmt" | "best-practices" | "modern-tools";

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
  "creating-venv": {
    label: "Creating venv",
    subtitle: "Create, Activate & Deactivate",
    color: "bg-blue-500/15 border-blue-500/30 text-blue-400",
    badgeColor: "bg-blue-500/20 text-blue-400",
    badgeLabel: "venv",
    description:
      "Python's built-in venv module creates isolated environments with their own site-packages directory. Use python -m venv to create one, then activate it with a platform-specific script. Deactivate returns you to the global interpreter. The created directory contains bin/, lib/, include/, and a pyvenv.cfg file.",
    keyPoints: [
      "python -m venv <name> creates an isolated environment",
      "Activate: source venv/bin/activate (Linux/Mac) or venv\\Scripts\\activate (Windows)",
      "deactivate command returns to system Python",
      "Directory structure: bin/, lib/, include/, pyvenv.cfg",
    ],
    codeSnippet: `# Create a virtual environment
python -m venv myproject_env

# Directory structure created
# myproject_env/
#   bin/          (Scripts/ on Windows)
#   include/
#   lib/
#   pyvenv.cfg

# Activate the environment
# Linux/Mac:
source myproject_env/bin/activate

# Windows:
# myproject_env\\Scripts\\activate

# Check active Python path
import sys
print(sys.prefix)
print(sys.executable)

# Deactivate when done
deactivate`,
    codeOutput: [
      "# Creating virtual environment...",
      "$ python -m venv myproject_env",
      "",
      "# After activation:",
      "(myproject_env) $ python -c \"import sys; print(sys.prefix)\"",
      "/home/user/project/myproject_env",
      "",
      "(myproject_env) $ which python",
      "/home/user/project/myproject_env/bin/python",
      "",
      "# After deactivate:",
      "$ which python",
      "/usr/bin/python3",
    ],
  },
  "pip-mgmt": {
    label: "pip Management",
    subtitle: "Install, Freeze & Requirements",
    color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/20 text-emerald-400",
    badgeLabel: "pip",
    description:
      "pip is the standard package manager for Python. Inside a virtual environment, pip install adds packages locally. Use pip freeze to capture exact versions into a requirements.txt file, which others can use to reproduce your environment. pip install --upgrade updates packages, and pip uninstall removes them.",
    keyPoints: [
      "pip install <pkg> installs into the active venv",
      "pip freeze > requirements.txt captures all versions",
      "pip install -r requirements.txt reproduces the environment",
      "pip install --upgrade <pkg> updates; pip uninstall <pkg> removes",
    ],
    codeSnippet: `# Install packages
pip install requests flask

# List installed packages
pip list

# Freeze current state to file
pip freeze > requirements.txt

# View requirements.txt
cat requirements.txt
# requests==2.31.0
# flask==3.0.0
# ...

# Install from requirements
pip install -r requirements.txt

# Upgrade a package
pip install --upgrade requests

# Uninstall a package
pip uninstall flask -y

# Install specific version
pip install requests==2.28.0`,
    codeOutput: [
      "$ pip install requests flask",
      "Successfully installed requests-2.31.0 flask-3.0.0 ...",
      "",
      "$ pip freeze",
      "blinker==1.7.0",
      "certifi==2024.2.2",
      "flask==3.0.0",
      "requests==2.31.0",
      "urllib3==2.1.0",
      "",
      "$ pip install --upgrade requests",
      "Successfully installed requests-2.32.0",
      "",
      "$ pip uninstall flask -y",
      "Successfully uninstalled flask-3.0.0",
    ],
  },
  "best-practices": {
    label: "Best Practices",
    subtitle: ".gitignore, Pinning & Deps",
    color: "bg-violet-500/15 border-violet-500/30 text-violet-400",
    badgeColor: "bg-violet-500/20 text-violet-400",
    badgeLabel: "tips",
    description:
      "Always add your venv directory to .gitignore — never commit it to version control. Pin exact versions in requirements.txt for reproducibility. Separate development dependencies (testing, linting) from production ones using requirements-dev.txt. Keep environments minimal and recreate them rather than patching.",
    keyPoints: [
      "Add venv/ to .gitignore — never commit environments",
      "Pin exact versions (==) for reproducible builds",
      "Separate dev vs prod: requirements.txt + requirements-dev.txt",
      "Recreate environments from scratch rather than patching",
    ],
    codeSnippet: `# .gitignore entry
echo "venv/" >> .gitignore
echo "*.pyc" >> .gitignore
echo "__pycache__/" >> .gitignore

# requirements.txt (production - pinned)
# requests==2.31.0
# flask==3.0.0
# gunicorn==21.2.0

# requirements-dev.txt (development)
# -r requirements.txt
# pytest==7.4.0
# black==23.7.0
# mypy==1.5.0

# Install dev dependencies (includes prod)
pip install -r requirements-dev.txt

# Recreate env from scratch
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt`,
    codeOutput: [
      "# .gitignore contents:",
      "venv/",
      "*.pyc",
      "__pycache__/",
      "",
      "# requirements.txt (pinned versions):",
      "requests==2.31.0",
      "flask==3.0.0",
      "gunicorn==21.2.0",
      "",
      "# requirements-dev.txt:",
      "-r requirements.txt",
      "pytest==7.4.0",
      "black==23.7.0",
      "mypy==1.5.0",
      "",
      "$ pip install -r requirements-dev.txt",
      "Successfully installed 8 packages",
    ],
  },
  "modern-tools": {
    label: "Modern Tools",
    subtitle: "Poetry, Pipenv, Conda & uv",
    color: "bg-orange-500/15 border-orange-500/30 text-orange-400",
    badgeColor: "bg-orange-500/20 text-orange-400",
    badgeLabel: "tools",
    description:
      "Beyond venv+pip, modern tools offer improved dependency management. Poetry uses pyproject.toml with a lock file and handles publishing. Pipenv combines Pipfile with automatic venv management. Conda manages non-Python dependencies and is popular in data science. uv is a blazing-fast Rust-based drop-in replacement for pip and venv.",
    keyPoints: [
      "Poetry: pyproject.toml, lock file, build & publish",
      "Pipenv: Pipfile + Pipfile.lock, auto venv management",
      "Conda: cross-language packages, great for data science",
      "uv: ultra-fast Rust-based pip/venv replacement",
    ],
    codeSnippet: `# ── Poetry ──
# pip install poetry
poetry new myproject
poetry add requests
poetry add --group dev pytest
poetry install
poetry run python main.py

# ── Pipenv ──
# pip install pipenv
pipenv install requests
pipenv install --dev pytest
pipenv shell
pipenv run python main.py

# ── Conda ──
conda create -n myenv python=3.11
conda activate myenv
conda install numpy pandas

# ── uv (ultra-fast) ──
# pip install uv
uv venv
source .venv/bin/activate
uv pip install requests flask
uv pip compile requirements.in -o requirements.txt`,
    codeOutput: [
      "# ── Poetry ──",
      "$ poetry new myproject",
      "Created package myproject in myproject/",
      "$ poetry add requests",
      "Using version ^2.31.0 for requests",
      "",
      "# ── Pipenv ──",
      "$ pipenv install requests",
      "Creating a virtualenv for this project...",
      "Adding requests to Pipfile...",
      "",
      "# ── Conda ──",
      "$ conda create -n myenv python=3.11",
      "Solving environment: done",
      "",
      "# ── uv (10-100x faster than pip) ──",
      "$ uv pip install requests flask",
      "Resolved 7 packages in 12ms",
      "Installed 7 packages in 48ms",
    ],
  },
};

const order: TopicKey[] = ["creating-venv", "pip-mgmt", "best-practices", "modern-tools"];

const chipColors: Record<TopicKey, string> = {
  "creating-venv": "bg-blue-500/15 border-blue-500/30 text-blue-400",
  "pip-mgmt": "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  "best-practices": "bg-violet-500/15 border-violet-500/30 text-violet-400",
  "modern-tools": "bg-orange-500/15 border-orange-500/30 text-orange-400",
};

// ─── Main export ──────────────────────────────────────────────────────────────
export function VirtualEnvironmentsVisualization() {
  const [selected, setSelected] = useState<TopicKey>("creating-venv");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const topic = topics[selected];

  const handleSelect = (key: TopicKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Virtual Environments</CardTitle>
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
