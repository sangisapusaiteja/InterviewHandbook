"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  defaultVal: string;
}

interface TableDef {
  name: string;
  columns: Column[];
  sql: string;
  description: string;
}

const tables: TableDef[] = [
  {
    name: "employees",
    description: "Basic table with common column types and constraints",
    columns: [
      { name: "id", type: "SERIAL", nullable: false, defaultVal: "auto-increment" },
      { name: "first_name", type: "VARCHAR(50)", nullable: false, defaultVal: "-" },
      { name: "last_name", type: "VARCHAR(50)", nullable: false, defaultVal: "-" },
      { name: "email", type: "VARCHAR(100)", nullable: true, defaultVal: "-" },
      { name: "hire_date", type: "DATE", nullable: true, defaultVal: "CURRENT_DATE" },
      { name: "salary", type: "NUMERIC(10,2)", nullable: true, defaultVal: "-" },
      { name: "is_active", type: "BOOLEAN", nullable: true, defaultVal: "TRUE" },
    ],
    sql: `CREATE TABLE employees (\n    id SERIAL PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    email VARCHAR(100),\n    hire_date DATE DEFAULT CURRENT_DATE,\n    salary NUMERIC(10, 2),\n    is_active BOOLEAN DEFAULT TRUE\n);`,
  },
  {
    name: "products",
    description: "Table using GENERATED ALWAYS AS IDENTITY (modern approach)",
    columns: [
      { name: "id", type: "INT", nullable: false, defaultVal: "IDENTITY" },
      { name: "name", type: "VARCHAR(100)", nullable: false, defaultVal: "-" },
      { name: "price", type: "NUMERIC(8,2)", nullable: false, defaultVal: "-" },
      { name: "description", type: "TEXT", nullable: true, defaultVal: "-" },
      { name: "created_at", type: "TIMESTAMP", nullable: true, defaultVal: "NOW()" },
    ],
    sql: `CREATE TABLE products (\n    id INT GENERATED ALWAYS AS IDENTITY\n       PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    price NUMERIC(8, 2) NOT NULL,\n    description TEXT,\n    created_at TIMESTAMP DEFAULT NOW()\n);`,
  },
  {
    name: "orders",
    description: "Table with foreign key reference and multiple defaults",
    columns: [
      { name: "id", type: "SERIAL", nullable: false, defaultVal: "auto-increment" },
      { name: "customer_name", type: "VARCHAR(100)", nullable: false, defaultVal: "-" },
      { name: "product_id", type: "INTEGER", nullable: false, defaultVal: "-" },
      { name: "quantity", type: "INTEGER", nullable: true, defaultVal: "1" },
      { name: "status", type: "VARCHAR(20)", nullable: true, defaultVal: "'pending'" },
      { name: "ordered_at", type: "TIMESTAMPTZ", nullable: true, defaultVal: "NOW()" },
    ],
    sql: `CREATE TABLE orders (\n    id SERIAL PRIMARY KEY,\n    customer_name VARCHAR(100) NOT NULL,\n    product_id INTEGER REFERENCES products(id),\n    quantity INTEGER DEFAULT 1,\n    status VARCHAR(20) DEFAULT 'pending',\n    ordered_at TIMESTAMPTZ DEFAULT NOW()\n);`,
  },
];

export function CreatingTablesVisualization() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [created, setCreated] = useState<Set<number>>(new Set());
  const [output, setOutput] = useState<string[] | null>(null);

  const table = tables[selectedIdx];

  const handleRun = () => {
    setCreated((prev) => new Set(prev).add(selectedIdx));
    setOutput([
      "CREATE TABLE",
      `-- Table '${table.name}' created with ${table.columns.length} columns`,
    ]);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Creating Tables</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Table selector */}
        <div className="flex flex-wrap gap-2">
          {tables.map((t, i) => {
            const isActive = selectedIdx === i;
            const isCreated = created.has(i);
            return (
              <motion.button
                key={t.name}
                onClick={() => { setSelectedIdx(i); setOutput(null); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive
                    ? "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 shadow-sm"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.name}
                {isCreated && (
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 bg-emerald-500/20 text-emerald-600">
                    created
                  </Badge>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground">{table.description}</p>

        {/* Column structure */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="rounded-xl border overflow-hidden text-xs">
              <div className="grid grid-cols-4 bg-muted/60 px-3 py-2 font-semibold text-muted-foreground">
                <span>Column</span>
                <span>Type</span>
                <span>Nullable</span>
                <span>Default</span>
              </div>
              {table.columns.map((col) => (
                <div key={col.name} className="grid grid-cols-4 px-3 py-2 border-t hover:bg-muted/30">
                  <code className="font-mono font-medium text-primary">{col.name}</code>
                  <code className="font-mono text-muted-foreground">{col.type}</code>
                  <span>
                    {col.nullable ? (
                      <Badge variant="outline" className="text-[9px]">NULL</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[9px] bg-orange-500/20 text-orange-600">NOT NULL</Badge>
                    )}
                  </span>
                  <span className="text-muted-foreground font-mono">{col.defaultVal}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">CREATE TABLE SQL</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {table.sql}
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
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
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
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to create the table</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
