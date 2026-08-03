"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ComponentKey = "postmaster" | "backends" | "shared_memory" | "wal" | "background" | "storage";

interface ArchComponent {
  label: string;
  category: string;
  color: string;
  badgeColor: string;
  description: string;
  details: string[];
  relatedQuery: string;
}

const components: Record<ComponentKey, ArchComponent> = {
  postmaster: {
    label: "Postmaster",
    category: "Main Process",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description:
      "The Postmaster is the main supervisor process. It starts when PostgreSQL launches, listens for incoming client connections on port 5432, and forks a new backend process for each connection.",
    details: [
      "Listens on TCP port 5432 by default",
      "Forks a backend process per client connection",
      "Manages startup and shutdown of the server",
      "Restarts backend processes if they crash",
    ],
    relatedQuery: "SHOW port;\n-- Result: 5432",
  },
  backends: {
    label: "Backend Processes",
    category: "Per-Connection",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description:
      "Each client connection gets a dedicated backend process that parses SQL, creates execution plans, and returns results. Backend processes communicate through shared memory.",
    details: [
      "One process per client connection",
      "Handles parsing, planning, and execution",
      "Accesses shared buffers for data",
      "Isolated from other backends",
    ],
    relatedQuery: "SELECT pid, usename, state\nFROM pg_stat_activity\nWHERE backend_type = 'client backend';",
  },
  shared_memory: {
    label: "Shared Buffers",
    category: "Memory",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description:
      "Shared buffers are a memory cache where PostgreSQL stores frequently accessed data pages. All backend processes read and write to this shared pool, reducing disk I/O.",
    details: [
      "Default: 128MB (tune to ~25% of RAM)",
      "Caches table and index data pages",
      "Shared across all backend processes",
      "Managed with clock-sweep algorithm",
    ],
    relatedQuery: "SHOW shared_buffers;\n-- Result: 128MB",
  },
  wal: {
    label: "WAL (Write-Ahead Log)",
    category: "Durability",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description:
      "The Write-Ahead Log records every change before it is applied to data files. This ensures crash recovery — after a crash, PostgreSQL replays the WAL to restore committed transactions.",
    details: [
      "Changes logged before data files are modified",
      "Enables crash recovery (replay WAL on restart)",
      "Used for streaming replication to replicas",
      "WAL files stored in pg_wal/ directory",
    ],
    relatedQuery: "SHOW wal_level;\n-- Result: replica\n\nSELECT pg_current_wal_lsn();",
  },
  background: {
    label: "Background Workers",
    category: "Maintenance",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    description:
      "Background processes run automatically to maintain the database. The autovacuum daemon cleans dead rows, the checkpointer writes dirty pages to disk, and the stats collector tracks usage.",
    details: [
      "Autovacuum: reclaims space from dead rows",
      "Checkpointer: flushes dirty pages to disk",
      "WAL Writer: flushes WAL buffers to disk",
      "Stats Collector: tracks table/index usage",
    ],
    relatedQuery: "SELECT pid, backend_type\nFROM pg_stat_activity\nWHERE backend_type != 'client backend';",
  },
  storage: {
    label: "Data Directory",
    category: "Storage",
    color: "bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-300",
    badgeColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",
    description:
      "The data directory (PGDATA) contains all database files: table data, indexes, WAL files, and configuration files like postgresql.conf and pg_hba.conf.",
    details: [
      "postgresql.conf: server settings",
      "pg_hba.conf: client authentication rules",
      "base/: actual table and index data files",
      "pg_wal/: write-ahead log files",
    ],
    relatedQuery: "SHOW data_directory;\n-- Result: /var/lib/postgresql/16/main\n\nSHOW config_file;",
  },
};

const layers: { label: string; keys: ComponentKey[] }[] = [
  { label: "Client Layer", keys: ["postmaster", "backends"] },
  { label: "Memory Layer", keys: ["shared_memory", "wal"] },
  { label: "Process & Storage", keys: ["background", "storage"] },
];

export function ArchitectureVisualization() {
  const [selected, setSelected] = useState<ComponentKey>("postmaster");
  const comp = components[selected];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL Architecture</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Architecture diagram */}
        <div className="space-y-3">
          {layers.map((layer) => (
            <div key={layer.label} className="space-y-1.5">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                {layer.label}
              </p>
              <div className="flex gap-2">
                {layer.keys.map((key) => {
                  const c = components[key];
                  const isActive = selected === key;
                  return (
                    <motion.button
                      key={key}
                      onClick={() => setSelected(key)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex-1 rounded-xl border px-3 py-2.5 text-left transition-all ${
                        isActive ? c.color + " shadow-sm" : "bg-background border-border hover:bg-muted/50"
                      }`}
                    >
                      <p className="text-xs font-bold">{c.label}</p>
                      <p className="text-[10px] text-muted-foreground">{c.category}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Component detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`rounded-xl border p-4 space-y-3 ${comp.color}`}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-lg font-bold">{comp.label}</span>
              <Badge variant="secondary" className={`text-[10px] ${comp.badgeColor}`}>
                {comp.category}
              </Badge>
            </div>
            <p className="text-sm leading-relaxed">{comp.description}</p>
            <ul className="space-y-1">
              {comp.details.map((d) => (
                <li key={d} className="text-xs flex items-start gap-2">
                  <span className="text-primary mt-0.5">*</span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Related query */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Related Query</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {comp.relatedQuery}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
