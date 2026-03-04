"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TableElement {
  tag: string;
  description: string;
  color: string;
}

const tableElements: TableElement[] = [
  { tag: "<table>", description: "Wraps the entire table", color: "bg-zinc-500" },
  { tag: "<caption>", description: "Table title (accessibility)", color: "bg-purple-500" },
  { tag: "<thead>", description: "Header row group", color: "bg-blue-500" },
  { tag: "<tbody>", description: "Data rows group", color: "bg-emerald-500" },
  { tag: "<tfoot>", description: "Footer/summary row group", color: "bg-amber-500" },
  { tag: "<tr>", description: "Table row", color: "bg-zinc-400" },
  { tag: "<th>", description: "Header cell (bold, centred)", color: "bg-blue-400" },
  { tag: "<td>", description: "Data cell", color: "bg-emerald-400" },
];

interface Row {
  name: string;
  subject: string;
  grade: string;
}

const defaultRows: Row[] = [
  { name: "Alice", subject: "Math", grade: "A" },
  { name: "Bob", subject: "Science", grade: "B+" },
];

export function TablesVisualization() {
  const [rows, setRows] = useState<Row[]>(defaultRows);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const addRow = () => {
    const names = ["Charlie", "Diana", "Eve", "Frank", "Grace"];
    const subjects = ["English", "History", "Art", "Physics", "Biology"];
    const grades = ["A-", "B", "A+", "B-", "C+"];
    const i = rows.length % names.length;
    setRows((prev) => [...prev, { name: names[i], subject: subjects[i], grade: grades[i] }]);
  };

  const removeRow = () => {
    if (rows.length > 1) setRows((prev) => prev.slice(0, -1));
  };

  return (
    <div className="space-y-6">
      {/* Element reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Table Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tableElements.map((el) => (
              <button
                key={el.tag}
                onMouseEnter={() => setActiveElement(el.tag)}
                onMouseLeave={() => setActiveElement(null)}
                className={`rounded-lg border p-2 text-left transition-all ${
                  activeElement === el.tag ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/50"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`w-2.5 h-2.5 rounded-sm ${el.color}`} />
                  <code className="text-xs font-bold">{el.tag}</code>
                </div>
                <p className="text-[10px] text-muted-foreground">{el.description}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive table builder */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Interactive Table</CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={removeRow} disabled={rows.length <= 1}>
                <Minus className="h-3.5 w-3.5 mr-1" /> Remove Row
              </Button>
              <Button size="sm" onClick={addRow}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Add Row
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rendered table */}
          <div className="rounded-xl border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Subject</th>
                  <th className="text-left p-3 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {rows.map((row, i) => (
                    <motion.tr
                      key={`${row.name}-${i}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t"
                    >
                      <td className="p-3">{row.name}</td>
                      <td className="p-3">{row.subject}</td>
                      <td className="p-3">
                        <Badge variant="secondary">{row.grade}</Badge>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
              <tfoot>
                <tr className="border-t bg-muted/30">
                  <td colSpan={2} className="p-3 font-semibold text-xs">
                    Total Students
                  </td>
                  <td className="p-3 font-semibold text-xs">{rows.length}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Colspan / Rowspan demo */}
          <div className="space-y-2">
            <p className="text-xs font-semibold">Spanning Demo:</p>
            <div className="rounded-xl border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-2 border-r">Time</th>
                    <th className="p-2 border-r">Mon</th>
                    <th className="p-2">Tue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-2 border-r">9 AM</td>
                    <td className="p-2 border-r bg-blue-500/10 text-center" rowSpan={2}>
                      <Badge className="bg-blue-500 text-[9px]">rowspan=2</Badge>
                      <p className="mt-1">Math</p>
                    </td>
                    <td className="p-2">English</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 border-r">10 AM</td>
                    <td className="p-2">Science</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-2 border-r">11 AM</td>
                    <td className="p-2 text-center bg-amber-500/10" colSpan={2}>
                      <Badge className="bg-amber-500 text-[9px]">colspan=2</Badge>
                      <p className="mt-1">Lunch Break</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
