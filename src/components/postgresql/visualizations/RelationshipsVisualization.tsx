"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Link2, KeyRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RelType = "one-to-one" | "one-to-many" | "many-to-many";

interface RelInfo {
  label: string;
  color: string;
  description: string;
  fkPlacement: string;
  sql: string;
}

const relTypes: Record<RelType, RelInfo> = {
  "one-to-one": {
    label: "One-to-One",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "Each row in Table A relates to exactly one row in Table B, and vice versa. The FK is placed in either table with a UNIQUE constraint.",
    fkPlacement: "FK with UNIQUE constraint in either table",
    sql: `CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(user_id),
    bio TEXT,
    avatar_url VARCHAR(200)
);`,
  },
  "one-to-many": {
    label: "One-to-Many",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      'Each row in Table A can relate to many rows in Table B, but each row in Table B relates to only one row in Table A. The FK goes on the "many" side.',
    fkPlacement: 'FK on the "many" side table (no UNIQUE)',
    sql: `CREATE TABLE departments (
    dept_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    emp_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dept_id INT REFERENCES departments(dept_id)
    -- Many employees per department
);`,
  },
  "many-to-many": {
    label: "Many-to-Many",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Each row in Table A can relate to many rows in Table B, and vice versa. Requires a junction (bridge) table with FKs to both tables.",
    fkPlacement: "Junction table with composite PK of both FKs",
    sql: `CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL
);

-- Junction table
CREATE TABLE enrollments (
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id)
);`,
  },
};

const relOrder: RelType[] = ["one-to-one", "one-to-many", "many-to-many"];

/* Data for diagrams */
const oneToOneLeft = [
  { id: 1, label: "alice" },
  { id: 2, label: "bob" },
  { id: 3, label: "carol" },
];
const oneToOneRight = [
  { id: 1, fk: 1, label: "Alice bio..." },
  { id: 2, fk: 2, label: "Bob bio..." },
  { id: 3, fk: 3, label: "Carol bio..." },
];

const oneToManyLeft = [
  { id: 1, label: "Engineering" },
  { id: 2, label: "Marketing" },
];
const oneToManyRight = [
  { id: 1, fk: 1, label: "Alice" },
  { id: 2, fk: 1, label: "Bob" },
  { id: 3, fk: 2, label: "Carol" },
  { id: 4, fk: 1, label: "Dave" },
];

const manyLeft = [
  { id: 1, label: "Alice" },
  { id: 2, label: "Bob" },
];
const manyRight = [
  { id: 101, label: "Math" },
  { id: 102, label: "Physics" },
];
const junctionRows = [
  { left: 1, right: 101 },
  { left: 1, right: 102 },
  { left: 2, right: 101 },
];

export function RelationshipsVisualization() {
  const [selected, setSelected] = useState<RelType>("one-to-one");

  const rel = relTypes[selected];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Table Relationships</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tab selector */}
        <div className="flex flex-wrap gap-2">
          {relOrder.map((key) => {
            const r = relTypes[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => setSelected(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? r.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                <Link2 className="h-3 w-3" />
                {r.label}
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
            className={`rounded-xl border p-3 ${rel.color}`}
          >
            <p className="text-sm">{rel.description}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <KeyRound className="h-3 w-3" />
              <p className="text-[10px] font-bold">{rel.fkPlacement}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Visual diagram */}
        <AnimatePresence mode="wait">
          {selected === "one-to-one" && (
            <motion.div
              key="oto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3 min-w-[120px]">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">users</p>
                {oneToOneLeft.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5 text-[10px] py-0.5">
                    <span className="font-mono font-bold">{r.id}</span>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400">1 : 1</span>
                <ArrowRight className="h-5 w-5 text-blue-500" />
              </div>
              <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3 min-w-[160px]">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">user_profiles</p>
                {oneToOneRight.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5 text-[10px] py-0.5">
                    <span className="font-mono text-muted-foreground">FK:{r.fk}</span>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {selected === "one-to-many" && (
            <motion.div
              key="otm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3 min-w-[130px]">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">departments</p>
                {oneToManyLeft.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5 text-[10px] py-0.5">
                    <span className="font-mono font-bold">{r.id}</span>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">1 : N</span>
                <ArrowRight className="h-5 w-5 text-emerald-500" />
              </div>
              <div className="rounded-xl border bg-emerald-500/10 border-emerald-500/30 p-3 min-w-[130px]">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-2">employees</p>
                {oneToManyRight.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5 text-[10px] py-0.5">
                    <span className="font-mono font-bold">{r.id}</span>
                    <span>{r.label}</span>
                    <span className="font-mono text-muted-foreground ml-auto">FK:{r.fk}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {selected === "many-to-many" && (
            <motion.div
              key="mtm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-3 flex-wrap"
            >
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3 min-w-[100px]">
                <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">students</p>
                {manyLeft.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5 text-[10px] py-0.5">
                    <span className="font-mono font-bold">{r.id}</span>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400">M</span>
                <ArrowRight className="h-4 w-4 text-violet-500" />
              </div>
              <div className="rounded-xl border bg-orange-500/10 border-orange-500/30 p-3 min-w-[140px]">
                <p className="text-xs font-bold text-orange-700 dark:text-orange-300 mb-2">enrollments (junction)</p>
                {junctionRows.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] py-0.5 font-mono">
                    <span>s:{r.left}</span>
                    <span>c:{r.right}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-violet-600 dark:text-violet-400">N</span>
                <ArrowRight className="h-4 w-4 text-violet-500" />
              </div>
              <div className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-3 min-w-[100px]">
                <p className="text-xs font-bold text-violet-700 dark:text-violet-300 mb-2">courses</p>
                {manyRight.map((r) => (
                  <div key={r.id} className="flex items-center gap-1.5 text-[10px] py-0.5">
                    <span className="font-mono font-bold">{r.id}</span>
                    <span>{r.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SQL */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">SQL Definition</p>
          <pre className="text-[10px] font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
            {rel.sql}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
