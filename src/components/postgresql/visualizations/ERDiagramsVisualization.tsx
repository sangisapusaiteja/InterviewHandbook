"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Link2, List, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Entity {
  name: string;
  color: string;
  borderColor: string;
  textColor: string;
  attributes: Array<{ name: string; type: string; pk?: boolean; fk?: boolean }>;
}

const entities: Entity[] = [
  {
    name: "students",
    color: "bg-blue-500/10",
    borderColor: "border-blue-500/40",
    textColor: "text-blue-700 dark:text-blue-300",
    attributes: [
      { name: "student_id", type: "SERIAL", pk: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "email", type: "VARCHAR(100)" },
      { name: "major", type: "VARCHAR(50)" },
    ],
  },
  {
    name: "courses",
    color: "bg-emerald-500/10",
    borderColor: "border-emerald-500/40",
    textColor: "text-emerald-700 dark:text-emerald-300",
    attributes: [
      { name: "course_id", type: "SERIAL", pk: true },
      { name: "title", type: "VARCHAR(200)" },
      { name: "credits", type: "INT" },
      { name: "dept_id", type: "INT", fk: true },
    ],
  },
  {
    name: "enrollments",
    color: "bg-violet-500/10",
    borderColor: "border-violet-500/40",
    textColor: "text-violet-700 dark:text-violet-300",
    attributes: [
      { name: "student_id", type: "INT", pk: true, fk: true },
      { name: "course_id", type: "INT", pk: true, fk: true },
      { name: "enrolled_at", type: "DATE" },
      { name: "grade", type: "CHAR(2)" },
    ],
  },
  {
    name: "departments",
    color: "bg-orange-500/10",
    borderColor: "border-orange-500/40",
    textColor: "text-orange-700 dark:text-orange-300",
    attributes: [
      { name: "dept_id", type: "SERIAL", pk: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "building", type: "VARCHAR(50)" },
    ],
  },
];

interface Relationship {
  from: string;
  to: string;
  label: string;
  cardinality: string;
  color: string;
}

const relationships: Relationship[] = [
  { from: "students", to: "enrollments", label: "enrolls in", cardinality: "1 : N", color: "text-blue-600 dark:text-blue-400" },
  { from: "courses", to: "enrollments", label: "has enrollments", cardinality: "1 : N", color: "text-emerald-600 dark:text-emerald-400" },
  { from: "departments", to: "courses", label: "offers", cardinality: "1 : N", color: "text-orange-600 dark:text-orange-400" },
  { from: "students", to: "courses", label: "takes (via enrollments)", cardinality: "M : N", color: "text-violet-600 dark:text-violet-400" },
];

export function ERDiagramsVisualization() {
  const [showAttributes, setShowAttributes] = useState(true);
  const [selectedRelationship, setSelectedRelationship] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Entity-Relationship Diagrams</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAttributes(!showAttributes)}
            className="text-xs"
          >
            {showAttributes ? <EyeOff className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
            {showAttributes ? "Hide" : "Show"} Attributes
          </Button>
        </div>

        {/* ER Diagram */}
        <div className="rounded-xl border bg-muted/20 p-4">
          <p className="text-xs font-semibold text-muted-foreground mb-3">University Database ER Diagram</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {entities.map((entity) => (
              <motion.div
                key={entity.name}
                layout
                className={`rounded-xl border ${entity.color} ${entity.borderColor} p-3`}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Box className={`h-3.5 w-3.5 ${entity.textColor}`} />
                  <p className={`text-xs font-bold ${entity.textColor}`}>{entity.name}</p>
                </div>
                <AnimatePresence>
                  {showAttributes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {entity.attributes.map((attr) => (
                        <div key={attr.name} className="flex items-center gap-1 py-0.5">
                          <span className="text-[9px] font-mono">
                            {attr.pk && attr.fk ? "[PK,FK]" : attr.pk ? "[PK]" : attr.fk ? "[FK]" : ""}
                          </span>
                          <span className="text-[10px] font-mono font-medium">{attr.name}</span>
                          <span className="text-[8px] text-muted-foreground ml-auto">{attr.type}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Relationships */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground">Relationships & Cardinality</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {relationships.map((rel, i) => (
              <motion.button
                key={i}
                onClick={() => setSelectedRelationship(selectedRelationship === i ? null : i)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-lg border p-2.5 text-left transition-all ${
                  selectedRelationship === i
                    ? "bg-muted/60 border-foreground/20 shadow-sm"
                    : "bg-muted/20 border-border hover:bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold">{rel.from}</span>
                    <span className="text-[9px] text-muted-foreground">--</span>
                    <span className="text-[10px] font-mono font-bold">{rel.to}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${rel.color}`}>{rel.cardinality}</span>
                </div>
                <p className="text-[9px] text-muted-foreground mt-0.5">{rel.label}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cardinality legend */}
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="text-xs font-semibold mb-2">Cardinality Notation</p>
          <div className="flex items-center gap-1.5 mb-1.5">
            <List className="h-3 w-3 text-muted-foreground" />
            <div className="grid grid-cols-3 gap-3 flex-1">
              <div>
                <p className="text-[10px] font-bold">1 : 1</p>
                <p className="text-[9px] text-muted-foreground">One-to-One</p>
              </div>
              <div>
                <p className="text-[10px] font-bold">1 : N</p>
                <p className="text-[9px] text-muted-foreground">One-to-Many</p>
              </div>
              <div>
                <p className="text-[10px] font-bold">M : N</p>
                <p className="text-[9px] text-muted-foreground">Many-to-Many (needs junction table)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
