"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal, Download, CheckCircle } from "lucide-react";
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
              <span className="text-zinc-500 select-none mr-2">&gt;</span>
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
type PlatformKey = "windows" | "macos" | "linux" | "verify";

interface PlatformDemo {
  label: string;
  icon: typeof Terminal;
  color: string;
  badgeColor: string;
  badgeLabel: string;
  description: string;
  steps: string[];
  code: string;
  output: string[];
}

// ─── data ─────────────────────────────────────────────────────────────────────
const demos: Record<PlatformKey, PlatformDemo> = {
  windows: {
    label: "Windows",
    icon: Download,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    badgeLabel: "Platform",
    description:
      "Download the official installer from python.org. Make sure to check 'Add Python to PATH' during installation.",
    steps: [
      "1. Visit python.org/downloads",
      "2. Download the latest Python 3.x installer (.exe)",
      "3. Run installer - CHECK 'Add Python to PATH'",
      "4. Click 'Install Now'",
    ],
    code: `# Download from python.org/downloads
# Run the .exe installer
# IMPORTANT: Check "Add Python to PATH"

# After install, open Command Prompt:
python --version
pip --version

# Create a virtual environment
python -m venv myproject_env
myproject_env\\Scripts\\activate

# Install a package inside venv
pip install requests`,
    output: [
      "Python 3.12.2",
      "pip 24.0 from C:\\Python312\\Lib\\site-packages\\pip (python 3.12)",
      "",
      "Creating virtual environment 'myproject_env'...",
      "(myproject_env) C:\\Users\\dev> pip install requests",
      "Successfully installed requests-2.31.0",
    ],
  },
  macos: {
    label: "macOS",
    icon: Terminal,
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    badgeLabel: "Platform",
    description:
      "Use Homebrew for the cleanest install on macOS. It manages versions and PATH automatically.",
    steps: [
      "1. Install Homebrew (if not installed)",
      "2. Run: brew install python",
      "3. Verify installation in Terminal",
      "4. Set up a virtual environment",
    ],
    code: `# Install Homebrew (if needed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python via Homebrew
brew install python

# Verify installation
python3 --version
pip3 --version

# Create a virtual environment
python3 -m venv myproject_env
source myproject_env/bin/activate

# Install a package inside venv
pip install requests`,
    output: [
      "==> Installing python@3.12...",
      "==> Python has been installed as: /opt/homebrew/bin/python3",
      "",
      "Python 3.12.2",
      "pip 24.0 from /opt/homebrew/lib/python3.12/site-packages/pip (python 3.12)",
      "",
      "Creating virtual environment 'myproject_env'...",
      "(myproject_env) $ pip install requests",
      "Successfully installed requests-2.31.0",
    ],
  },
  linux: {
    label: "Linux",
    icon: Terminal,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    badgeLabel: "Platform",
    description:
      "Most Linux distributions come with Python pre-installed. Use your package manager to install or update.",
    steps: [
      "1. Update package list",
      "2. Install Python 3 and pip",
      "3. Install venv module",
      "4. Create and activate a virtual environment",
    ],
    code: `# Update package list (Debian/Ubuntu)
sudo apt update

# Install Python 3 and pip
sudo apt install python3 python3-pip python3-venv

# Verify installation
python3 --version
pip3 --version

# Create a virtual environment
python3 -m venv myproject_env
source myproject_env/bin/activate

# Install a package inside venv
pip install requests`,
    output: [
      "Reading package lists... Done",
      "Setting up python3 (3.12.2-1) ...",
      "Setting up python3-pip (24.0+dfsg-1) ...",
      "",
      "Python 3.12.2",
      "pip 24.0 from /usr/lib/python3/dist-packages/pip (python 3.12)",
      "",
      "Creating virtual environment 'myproject_env'...",
      "(myproject_env) $ pip install requests",
      "Successfully installed requests-2.31.0",
    ],
  },
  verify: {
    label: "Verify Installation",
    icon: CheckCircle,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    badgeLabel: "All Platforms",
    description:
      "After installing Python on any platform, run these commands to confirm everything is working correctly.",
    steps: [
      "1. Check Python version",
      "2. Check pip version",
      "3. Test the REPL (interactive shell)",
      "4. Verify venv works",
    ],
    code: `# Check Python version
python3 --version

# Check pip version
pip3 --version

# Test the interactive REPL
python3 -c "print('Hello, Python!')"

# Check where Python is installed
python3 -c "import sys; print(sys.executable)"

# Verify venv module is available
python3 -c "import venv; print('venv module: OK')"

# Check installed packages
pip3 list`,
    output: [
      "Python 3.12.2",
      "pip 24.0 from /usr/lib/python3/dist-packages/pip (python 3.12)",
      "Hello, Python!",
      "/usr/bin/python3",
      "venv module: OK",
      "",
      "Package    Version",
      "---------- -------",
      "pip        24.0",
      "setuptools 69.1.0",
    ],
  },
};

const order: PlatformKey[] = ["windows", "macos", "linux", "verify"];

// ─── Main export ──────────────────────────────────────────────────────────────
export function InstallationSetupVisualization() {
  const [selected, setSelected] = useState<PlatformKey>("windows");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const demo = demos[selected];
  const Icon = demo.icon;

  const handleSelect = (key: PlatformKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Python Installation &amp; Setup</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Platform selector chips */}
        <div className="flex flex-wrap gap-2">
          {order.map((key) => {
            const d = demos[key];
            return (
              <button
                key={key}
                onClick={() => handleSelect(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selected === key
                    ? d.color + " scale-105 shadow-sm"
                    : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-3 ${demo.color}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <span className="text-lg font-bold">{demo.label}</span>
                <Badge variant="secondary" className={`text-[10px] ${demo.badgeColor}`}>
                  {demo.badgeLabel}
                </Badge>
              </div>
            </div>
            <p className="text-sm leading-relaxed">{demo.description}</p>

            {/* Steps */}
            <div className="space-y-1">
              {demo.steps.map((step) => (
                <p key={step} className="text-xs font-mono opacity-90">
                  {step}
                </p>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Code + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Commands</p>
            <AnimatePresence mode="wait">
              <motion.pre
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]"
              >
                {demo.code}
              </motion.pre>
            </AnimatePresence>
            <Button size="sm" onClick={() => setOutputLines(demo.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <ConsoleOutput lines={outputLines} />
          </div>
        </div>

        {/* Quick Reference */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Essential Commands Reference
          </p>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Command</span>
              <span>Purpose</span>
              <span>Platform</span>
            </div>
            {[
              { cmd: "python3 --version", purpose: "Check Python version", platform: "All" },
              { cmd: "pip3 --version", purpose: "Check pip version", platform: "All" },
              { cmd: "python3 -m venv env", purpose: "Create virtual environment", platform: "All" },
              { cmd: "source env/bin/activate", purpose: "Activate venv", platform: "macOS / Linux" },
              { cmd: "env\\Scripts\\activate", purpose: "Activate venv", platform: "Windows" },
              { cmd: "deactivate", purpose: "Deactivate venv", platform: "All" },
              { cmd: "pip install <pkg>", purpose: "Install a package", platform: "All" },
              { cmd: "pip freeze > requirements.txt", purpose: "Save dependencies", platform: "All" },
            ].map((row) => (
              <div
                key={row.cmd}
                className="grid grid-cols-3 px-3 py-2.5 border-t hover:bg-muted/40 transition-colors"
              >
                <code className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                  {row.cmd}
                </code>
                <span className="text-muted-foreground">{row.purpose}</span>
                <Badge variant="outline" className="text-[10px] w-fit h-fit">
                  {row.platform}
                </Badge>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Always use virtual environments to isolate project dependencies and avoid conflicts between projects.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
