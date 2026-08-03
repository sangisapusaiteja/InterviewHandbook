"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ShieldCheck, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ConstraintKey = "notnull" | "unique" | "check" | "default" | "primary";

interface ConstraintInfo {
  label: string;
  color: string;
  badgeColor: string;
  description: string;
  createSQL: string;
  validInsert: { sql: string; result: string };
  invalidInsert: { sql: string; error: string };
}

const constraints: Record<ConstraintKey, ConstraintInfo> = {
  notnull: {
    label: "NOT NULL",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
    description: "Ensures a column cannot contain NULL values. Every row must have a value for this column.",
    createSQL: `CREATE TABLE students (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(100) NOT NULL\n);`,
    validInsert: {
      sql: "INSERT INTO students (name, email)\nVALUES ('Alice', 'alice@example.com');",
      result: "INSERT 0 1 -- Success!",
    },
    invalidInsert: {
      sql: "INSERT INTO students (name, email)\nVALUES (NULL, 'bob@example.com');",
      error: 'ERROR: null value in column "name"\nviolates not-null constraint',
    },
  },
  unique: {
    label: "UNIQUE",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    badgeColor: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
    description: "Ensures all values in a column are distinct. Multiple NULLs are allowed (NULL is not equal to NULL).",
    createSQL: `CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(100) UNIQUE,\n    username VARCHAR(50) UNIQUE\n);`,
    validInsert: {
      sql: "INSERT INTO users (email, username)\nVALUES ('alice@test.com', 'alice');",
      result: "INSERT 0 1 -- Success!",
    },
    invalidInsert: {
      sql: "INSERT INTO users (email, username)\nVALUES ('alice@test.com', 'bob');",
      error: 'ERROR: duplicate key value violates\nunique constraint "users_email_key"\nDETAIL: Key (email)=(alice@test.com) already exists.',
    },
  },
  check: {
    label: "CHECK",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
    description: "Validates data against a custom boolean expression. The row is rejected if the expression evaluates to FALSE.",
    createSQL: `CREATE TABLE products (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    price NUMERIC(8,2) CHECK (price > 0),\n    quantity INT CHECK (quantity >= 0)\n);`,
    validInsert: {
      sql: "INSERT INTO products (name, price, quantity)\nVALUES ('Laptop', 999.99, 10);",
      result: "INSERT 0 1 -- Success!",
    },
    invalidInsert: {
      sql: "INSERT INTO products (name, price, quantity)\nVALUES ('Free Item', -5.00, 10);",
      error: 'ERROR: new row for relation "products"\nviolates check constraint "products_price_check"\nDETAIL: Failing row contains (-5.00).',
    },
  },
  default: {
    label: "DEFAULT",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
    description: "Provides a fallback value when no value is specified during INSERT. Does not prevent NULL if explicitly inserted.",
    createSQL: `CREATE TABLE tasks (\n    id SERIAL PRIMARY KEY,\n    title VARCHAR(200) NOT NULL,\n    status VARCHAR(20) DEFAULT 'pending',\n    priority INT DEFAULT 1,\n    created_at TIMESTAMP DEFAULT NOW()\n);`,
    validInsert: {
      sql: "INSERT INTO tasks (title)\nVALUES ('Fix bug #123');\n\n-- status='pending', priority=1,\n-- created_at=NOW() automatically",
      result: "INSERT 0 1\n-- Row: ('Fix bug #123', 'pending', 1, '2024-01-15 10:30:00')",
    },
    invalidInsert: {
      sql: "INSERT INTO tasks (title, status)\nVALUES ('Task', NULL);\n\n-- NULL overrides the default!",
      error: "INSERT 0 1 -- This SUCCEEDS!\n-- status is NULL, not 'pending'\n-- DEFAULT only applies when column is omitted",
    },
  },
  primary: {
    label: "PRIMARY KEY",
    color: "bg-pink-500/15 border-pink-500/40 text-pink-700 dark:text-pink-300",
    badgeColor: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
    description: "Combines NOT NULL and UNIQUE. Uniquely identifies each row. Only one primary key per table.",
    createSQL: `CREATE TABLE departments (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);\n\n-- Composite primary key:\nCREATE TABLE enrollments (\n    student_id INT,\n    course_id INT,\n    PRIMARY KEY (student_id, course_id)\n);`,
    validInsert: {
      sql: "INSERT INTO departments (name)\nVALUES ('Engineering');\n-- id=1 auto-generated",
      result: "INSERT 0 1 -- id: 1",
    },
    invalidInsert: {
      sql: "INSERT INTO departments (id, name)\nVALUES (1, 'Marketing');",
      error: 'ERROR: duplicate key value violates\nunique constraint "departments_pkey"\nDETAIL: Key (id)=(1) already exists.',
    },
  },
};

const constraintOrder: ConstraintKey[] = ["notnull", "unique", "check", "default", "primary"];

export function ConstraintsVisualization() {
  const [selected, setSelected] = useState<ConstraintKey>("notnull");
  const [testType, setTestType] = useState<"valid" | "invalid">("valid");
  const [output, setOutput] = useState<string[] | null>(null);

  const constraint = constraints[selected];

  const handleSelect = (key: ConstraintKey) => {
    setSelected(key);
    setTestType("valid");
    setOutput(null);
  };

  const handleRun = () => {
    if (testType === "valid") {
      setOutput([constraint.validInsert.result]);
    } else {
      setOutput([constraint.invalidInsert.error]);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">PostgreSQL Constraints</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Constraint selector */}
        <div className="flex flex-wrap gap-2">
          {constraintOrder.map((key) => {
            const c = constraints[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? c.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <ShieldCheck className="h-3 w-3" />
                {c.label}
              </motion.button>
            );
          })}
        </div>

        {/* Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`rounded-xl border p-3 ${constraint.color}`}
          >
            <p className="text-sm">{constraint.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Table definition */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Table Definition</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {constraint.createSQL}
          </pre>
        </div>

        {/* Test toggle */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={testType === "valid" ? "default" : "outline"}
            onClick={() => { setTestType("valid"); setOutput(null); }}
            className="text-xs"
          >
            <Check className="h-3 w-3 mr-1" /> Valid Insert
          </Button>
          <Button
            size="sm"
            variant={testType === "invalid" ? "destructive" : "outline"}
            onClick={() => { setTestType("invalid"); setOutput(null); }}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" /> Invalid Insert
          </Button>
        </div>

        {/* SQL + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              {testType === "valid" ? "Valid" : "Invalid"} INSERT
            </p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[80px]">
              {testType === "valid" ? constraint.validInsert.sql : constraint.invalidInsert.sql}
            </pre>
            <Button size="sm" onClick={handleRun}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Result</p>
            <AnimatePresence mode="wait">
              {output ? (
                <motion.div
                  key={`${selected}-${testType}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[80px]"
                >
                  {output.map((line, i) => (
                    <p
                      key={i}
                      className={line.includes("ERROR") || line.includes("violates") ? "text-red-400" : "text-emerald-400"}
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[80px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to test</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
