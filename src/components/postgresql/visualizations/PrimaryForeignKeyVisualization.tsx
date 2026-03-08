"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, KeyRound, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TabKey = "pk" | "fk" | "actions" | "composite";

interface TabInfo {
  label: string;
  color: string;
  description: string;
  sql: string;
  example: string;
  output: string[];
}

const tabs: Record<TabKey, TabInfo> = {
  pk: {
    label: "Primary Key",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "A primary key uniquely identifies each row. It combines NOT NULL + UNIQUE. Only one per table. Common types: SERIAL or UUID.",
    sql: `CREATE TABLE departments (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL UNIQUE,\n    location VARCHAR(100)\n);`,
    example: `INSERT INTO departments (name, location)\nVALUES\n  ('Engineering', 'Floor 3'),\n  ('Marketing', 'Floor 2');\n\nSELECT * FROM departments;`,
    output: [
      "INSERT 0 2",
      " id |    name     | location",
      "----+-------------+---------",
      "  1 | Engineering | Floor 3",
      "  2 | Marketing   | Floor 2",
    ],
  },
  fk: {
    label: "Foreign Key",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "A foreign key references the primary key of another table, creating a relationship. It enforces referential integrity — you cannot insert a value that does not exist in the parent table.",
    sql: `CREATE TABLE employees (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    department_id INTEGER\n      REFERENCES departments(id)\n);`,
    example: `-- Valid: department_id 1 exists\nINSERT INTO employees (name, department_id)\nVALUES ('Alice', 1);\n\n-- Invalid: department_id 99 does not exist\nINSERT INTO employees (name, department_id)\nVALUES ('Bob', 99);`,
    output: [
      "INSERT 0 1 -- Alice added to Engineering",
      "",
      'ERROR: insert or update on table "employees"',
      'violates foreign key constraint "employees_department_id_fkey"',
      "DETAIL: Key (department_id)=(99) is not present",
      'in table "departments".',
    ],
  },
  actions: {
    label: "ON DELETE Actions",
    color: "bg-orange-500/15 border-orange-500/40 text-orange-700 dark:text-orange-300",
    description:
      "Foreign keys support actions when the referenced row is deleted: CASCADE (delete children too), SET NULL (set FK to NULL), RESTRICT (prevent deletion).",
    sql: `CREATE TABLE projects (\n    id SERIAL PRIMARY KEY,\n    title VARCHAR(200) NOT NULL,\n    -- If department deleted, delete project\n    dept_id INT REFERENCES departments(id)\n      ON DELETE CASCADE,\n    -- If lead deleted, set to NULL\n    lead_id INT REFERENCES employees(id)\n      ON DELETE SET NULL\n);`,
    example: `-- CASCADE: delete department\nDELETE FROM departments WHERE id = 1;\n-- All projects with dept_id=1\n-- are automatically deleted!\n\n-- SET NULL: delete employee\nDELETE FROM employees WHERE id = 5;\n-- Projects with lead_id=5\n-- now have lead_id=NULL\n\n-- RESTRICT (default): blocks delete\nDELETE FROM departments WHERE id = 2;\n-- ERROR if employees reference dept 2`,
    output: [
      "CASCADE:  child rows deleted automatically",
      "SET NULL: FK column set to NULL",
      "RESTRICT: DELETE blocked if children exist",
      "NO ACTION: same as RESTRICT (checked at txn end)",
      "SET DEFAULT: FK set to default value",
    ],
  },
  composite: {
    label: "Composite Key",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "A composite primary key uses multiple columns together to uniquely identify a row. Common in many-to-many junction tables where the combination is naturally unique.",
    sql: `-- Many-to-many: students <-> courses\nCREATE TABLE enrollments (\n    student_id INT REFERENCES students(id),\n    course_id INT REFERENCES courses(id),\n    enrolled_at DATE DEFAULT CURRENT_DATE,\n    grade CHAR(2),\n    PRIMARY KEY (student_id, course_id)\n);`,
    example: `-- Student 1 enrolls in course 101\nINSERT INTO enrollments (student_id, course_id)\nVALUES (1, 101);\n\n-- Student 1 enrolls in course 102 (OK)\nINSERT INTO enrollments (student_id, course_id)\nVALUES (1, 102);\n\n-- Student 1 + course 101 again (FAIL)\nINSERT INTO enrollments (student_id, course_id)\nVALUES (1, 101);`,
    output: [
      "INSERT 0 1 -- (1, 101) OK",
      "INSERT 0 1 -- (1, 102) OK",
      "",
      'ERROR: duplicate key value violates',
      'unique constraint "enrollments_pkey"',
      "DETAIL: Key (student_id, course_id)=(1, 101) already exists.",
    ],
  },
};

const tabOrder: TabKey[] = ["pk", "fk", "actions", "composite"];

interface DeptRow { id: number; name: string }
interface EmpRow { id: number; name: string; dept_id: number | null }

const departments: DeptRow[] = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Marketing" },
  { id: 3, name: "Sales" },
];

const employees: EmpRow[] = [
  { id: 1, name: "Alice", dept_id: 1 },
  { id: 2, name: "Bob", dept_id: 2 },
  { id: 3, name: "Charlie", dept_id: 1 },
  { id: 4, name: "Diana", dept_id: 3 },
];

export function PrimaryForeignKeyVisualization() {
  const [selected, setSelected] = useState<TabKey>("pk");
  const [outputLines, setOutputLines] = useState<string[] | null>(null);

  const tab = tabs[selected];

  const handleSelect = (key: TabKey) => {
    setSelected(key);
    setOutputLines(null);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Primary Key & Foreign Key</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tab selector */}
        <div className="flex flex-wrap gap-2">
          {tabOrder.map((key) => {
            const t = tabs[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? t.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <KeyRound className="h-3 w-3" />
                {t.label}
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
            className={`rounded-xl border p-3 ${tab.color}`}
          >
            <p className="text-sm">{tab.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Relationship diagram */}
        {(selected === "pk" || selected === "fk") && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Relationship Diagram
            </p>
            <div className="flex items-center justify-center gap-4 py-3">
              {/* Departments table */}
              <div className="rounded-xl border bg-blue-500/10 p-3 min-w-[140px]">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">departments</p>
                {departments.map((d) => (
                  <div key={d.id} className="flex items-center gap-2 text-[10px] py-0.5">
                    <Badge variant="secondary" className="text-[8px] px-1 py-0 bg-blue-500/20">PK</Badge>
                    <span className="font-mono">{d.id}</span>
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                ))}
              </div>

              <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />

              {/* Employees table */}
              <div className="rounded-xl border bg-emerald-500/10 p-3 min-w-[180px]">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">employees</p>
                {employees.map((e) => (
                  <div key={e.id} className="flex items-center gap-2 text-[10px] py-0.5">
                    <Badge variant="secondary" className="text-[8px] px-1 py-0 bg-emerald-500/20">PK</Badge>
                    <span className="font-mono">{e.id}</span>
                    <span className="text-muted-foreground">{e.name}</span>
                    <Badge variant="outline" className="text-[8px] px-1 py-0">FK:{e.dept_id}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Table SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Table Definition</p>
          <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {tab.sql}
          </pre>
        </div>

        {/* Example + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Example</p>
            <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto min-h-[100px]">
              {tab.example}
            </pre>
            <Button size="sm" onClick={() => setOutputLines(tab.output)}>
              <Play className="h-3.5 w-3.5 mr-1" /> Run
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Output</p>
            <AnimatePresence mode="wait">
              {outputLines ? (
                <motion.div
                  key="out"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-zinc-900 dark:bg-zinc-950 px-4 py-3 font-mono text-xs space-y-1 min-h-[100px]"
                >
                  {outputLines.map((line, i) => (
                    <p
                      key={i}
                      className={
                        line.startsWith("ERROR") || line.includes("violates")
                          ? "text-red-400"
                          : line === ""
                          ? ""
                          : "text-emerald-400"
                      }
                    >
                      {line || "\u00A0"}
                    </p>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="ph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 px-4 py-3 min-h-[100px] flex items-center justify-center"
                >
                  <p className="text-xs text-muted-foreground italic">Click Run to see output</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
