"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DBEntry {
  name: string;
  owner: string;
  encoding: string;
  size: string;
}

const initialDatabases: DBEntry[] = [
  { name: "postgres", owner: "postgres", encoding: "UTF8", size: "7.5 MB" },
  { name: "template0", owner: "postgres", encoding: "UTF8", size: "7.5 MB" },
  { name: "template1", owner: "postgres", encoding: "UTF8", size: "7.5 MB" },
];

type ActionKey = "create" | "connect" | "rename" | "drop" | "size";

interface ActionInfo {
  label: string;
  sql: string;
  description: string;
  color: string;
}

const actions: Record<ActionKey, ActionInfo> = {
  create: {
    label: "CREATE DATABASE",
    sql: "CREATE DATABASE my_app_db\n  OWNER = postgres\n  ENCODING = 'UTF8';",
    description: "Creates a new database using template1 as the default template. The new database is isolated from other databases.",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
  },
  connect: {
    label: "Connect",
    sql: "-- In psql:\n\\c my_app_db\n\n-- Or from terminal:\npsql -U postgres -d my_app_db",
    description: "Switch to a different database. You can only run queries against one database at a time in a session.",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
  },
  rename: {
    label: "ALTER / RENAME",
    sql: "ALTER DATABASE my_app_db\n  RENAME TO production_db;\n\nALTER DATABASE production_db\n  OWNER TO admin_user;",
    description: "Rename a database or change its owner. No active connections can exist when renaming a database.",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
  },
  drop: {
    label: "DROP DATABASE",
    sql: "-- Drop with safety check\nDROP DATABASE IF EXISTS my_app_db;\n\n-- Force drop (PG 13+)\nDROP DATABASE my_app_db WITH (FORCE);",
    description: "Permanently deletes a database and ALL its data. Cannot be undone. All connections must be terminated first.",
    color: "bg-red-500/15 border-red-500/40 text-red-700 dark:text-red-300",
  },
  size: {
    label: "Check Size",
    sql: "SELECT datname,\n  pg_size_pretty(\n    pg_database_size(datname)\n  ) AS size\nFROM pg_database\nORDER BY pg_database_size(datname) DESC;",
    description: "View the size of all databases. Useful for monitoring disk usage and planning storage.",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
  },
};

const actionOrder: ActionKey[] = ["create", "connect", "rename", "drop", "size"];

export function CreatingDatabaseVisualization() {
  const [selectedAction, setSelectedAction] = useState<ActionKey>("create");
  const [databases, setDatabases] = useState<DBEntry[]>(initialDatabases);
  const [output, setOutput] = useState<string[] | null>(null);

  const action = actions[selectedAction];

  const handleRun = () => {
    if (selectedAction === "create") {
      const exists = databases.some((db) => db.name === "my_app_db");
      if (!exists) {
        setDatabases([...databases, { name: "my_app_db", owner: "postgres", encoding: "UTF8", size: "7.5 MB" }]);
        setOutput(["CREATE DATABASE", "-- Database 'my_app_db' created successfully"]);
      } else {
        setOutput(["ERROR: database \"my_app_db\" already exists"]);
      }
    } else if (selectedAction === "drop") {
      setDatabases(databases.filter((db) => db.name !== "my_app_db"));
      setOutput(["DROP DATABASE", "-- Database 'my_app_db' dropped"]);
    } else if (selectedAction === "connect") {
      setOutput(["You are now connected to database \"my_app_db\" as user \"postgres\"."]);
    } else if (selectedAction === "rename") {
      setDatabases(databases.map((db) => (db.name === "my_app_db" ? { ...db, name: "production_db" } : db)));
      setOutput(["ALTER DATABASE", "-- Renamed to 'production_db'"]);
    } else if (selectedAction === "size") {
      setOutput(databases.map((db) => `${db.name.padEnd(20)} | ${db.size}`));
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Creating a Database</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Action selector */}
        <div className="flex flex-wrap gap-2">
          {actionOrder.map((key) => {
            const a = actions[key];
            const isActive = selectedAction === key;
            return (
              <motion.button
                key={key}
                onClick={() => { setSelectedAction(key); setOutput(null); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? a.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {a.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAction}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${action.color}`}
          >
            <p className="text-sm">{action.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[80px]">
              {action.sql}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[80px]"
                >
                  {output.map((line, i) => (
                    <p key={i} className="text-emerald-400">{line}</p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[80px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to execute</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live database list */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Database className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Databases on Server
            </p>
          </div>
          <div className="rounded-xl border overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
              <span>Name</span>
              <span>Owner</span>
              <span>Encoding</span>
              <span>Size</span>
            </div>
            <AnimatePresence>
              {databases.map((db) => (
                <motion.div
                  key={db.name}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-4 px-3 py-2 border-t"
                >
                  <span className="font-mono font-medium">{db.name}</span>
                  <span className="text-muted-foreground">{db.owner}</span>
                  <span className="text-muted-foreground">{db.encoding}</span>
                  <span className="text-muted-foreground">{db.size}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
