"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Apple, Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type OSKey = "linux" | "macos" | "windows";

interface OSInfo {
  label: string;
  icon: React.ReactNode;
  color: string;
  steps: { step: string; command: string }[];
  verifyCommands: string[];
  metaCommands: { cmd: string; desc: string }[];
}

const osData: Record<OSKey, OSInfo> = {
  linux: {
    label: "Linux (Ubuntu/Debian)",
    icon: <Terminal className="h-4 w-4" />,
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    steps: [
      { step: "Update packages", command: "sudo apt update" },
      { step: "Install PostgreSQL", command: "sudo apt install postgresql postgresql-contrib" },
      { step: "Start the service", command: "sudo systemctl start postgresql" },
      { step: "Enable on boot", command: "sudo systemctl enable postgresql" },
      { step: "Connect to PostgreSQL", command: "sudo -u postgres psql" },
    ],
    verifyCommands: [
      "$ psql --version",
      "psql (PostgreSQL) 16.2",
      "$ sudo systemctl status postgresql",
      "active (running)",
    ],
    metaCommands: [
      { cmd: "\\l", desc: "List all databases" },
      { cmd: "\\dt", desc: "List tables in current database" },
      { cmd: "\\du", desc: "List all roles/users" },
      { cmd: "\\c dbname", desc: "Connect to a database" },
      { cmd: "\\q", desc: "Quit psql" },
    ],
  },
  macos: {
    label: "macOS",
    icon: <Apple className="h-4 w-4" />,
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    steps: [
      { step: "Install Homebrew (if needed)", command: '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"' },
      { step: "Install PostgreSQL", command: "brew install postgresql@16" },
      { step: "Start the service", command: "brew services start postgresql@16" },
      { step: "Connect to PostgreSQL", command: "psql postgres" },
    ],
    verifyCommands: [
      "$ psql --version",
      "psql (PostgreSQL) 16.2",
      "$ brew services list",
      "postgresql@16 started",
    ],
    metaCommands: [
      { cmd: "\\l", desc: "List all databases" },
      { cmd: "\\dt", desc: "List tables in current database" },
      { cmd: "\\du", desc: "List all roles/users" },
      { cmd: "\\conninfo", desc: "Show connection info" },
      { cmd: "\\q", desc: "Quit psql" },
    ],
  },
  windows: {
    label: "Windows",
    icon: <Monitor className="h-4 w-4" />,
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    steps: [
      { step: "Download installer", command: "Visit enterprisedb.com/downloads" },
      { step: "Run the installer", command: "Double-click postgresql-16-windows-x64.exe" },
      { step: "Set password", command: "Enter password for postgres superuser" },
      { step: "Keep default port", command: "Port: 5432 (default)" },
      { step: "Open pgAdmin or psql", command: 'Start Menu > PostgreSQL > "SQL Shell (psql)"' },
    ],
    verifyCommands: [
      "Server [localhost]:",
      "Database [postgres]:",
      "Port [5432]:",
      "Username [postgres]:",
      "postgres=#",
    ],
    metaCommands: [
      { cmd: "\\l", desc: "List all databases" },
      { cmd: "\\dt", desc: "List tables in current database" },
      { cmd: "\\du", desc: "List all roles/users" },
      { cmd: "\\conninfo", desc: "Show connection info" },
      { cmd: "\\q", desc: "Quit psql" },
    ],
  },
};

const osOrder: OSKey[] = ["linux", "macos", "windows"];

export function InstallingVisualization() {
  const [selectedOS, setSelectedOS] = useState<OSKey>("linux");
  const [activeStep, setActiveStep] = useState(0);

  const os = osData[selectedOS];

  const handleOSChange = (key: OSKey) => {
    setSelectedOS(key);
    setActiveStep(0);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Installing PostgreSQL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* OS selector */}
        <div className="flex gap-2">
          {osOrder.map((key) => {
            const o = osData[key];
            const isActive = selectedOS === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleOSChange(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  isActive ? o.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {o.icon}
                <span className="hidden sm:inline">{o.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Installation steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOS}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-2"
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Installation Steps
            </p>
            {os.steps.map((s, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveStep(i)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-lg border p-3 cursor-pointer transition-all ${
                  activeStep === i
                    ? os.color + " shadow-sm"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeStep === i
                        ? "bg-primary text-primary-foreground"
                        : i < activeStep
                        ? "bg-emerald-500/20 text-emerald-600"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.step}</p>
                    <code className="text-xs text-muted-foreground font-mono block truncate">
                      {s.command}
                    </code>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Verify + Meta commands */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Verify Installation</p>
            <div className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1">
              {os.verifyCommands.map((line, i) => (
                <p key={i} className={line.startsWith("$") ? "text-sky-400" : "text-emerald-400"}>
                  {line}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">psql Meta-Commands</p>
            <div className="rounded-xl border overflow-hidden text-xs">
              <div className="grid grid-cols-2 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                <span>Command</span>
                <span>Description</span>
              </div>
              {os.metaCommands.map((mc) => (
                <div key={mc.cmd} className="grid grid-cols-2 px-3 py-2 border-t hover:bg-muted/30">
                  <code className="font-mono text-primary">{mc.cmd}</code>
                  <span className="text-muted-foreground">{mc.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
