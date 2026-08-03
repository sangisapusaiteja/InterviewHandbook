"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, BarChart3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserRow {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: UserRow[] = [
  { id: 1, name: "Alice", email: "alice@mail.com", active: true },
  { id: 2, name: "Bob", email: "bob@mail.com", active: false },
  { id: 3, name: "Charlie", email: "charlie@mail.com", active: true },
  { id: 4, name: "Diana", email: "diana@mail.com", active: false },
  { id: 5, name: "Eve", email: "eve@mail.com", active: true },
  { id: 6, name: "Frank", email: "frank@mail.com", active: false },
  { id: 7, name: "Grace", email: "grace@mail.com", active: true },
  { id: 8, name: "Hank", email: "hank@mail.com", active: false },
  { id: 9, name: "Ivy", email: "ivy@mail.com", active: true },
  { id: 10, name: "Jack", email: "jack@mail.com", active: false },
];

const activeUsers = users.filter((u) => u.active);

type ViewMode = "comparison" | "usage" | "examples";

interface ViewInfo {
  label: string;
  color: string;
  description: string;
}

const views: Record<ViewMode, ViewInfo> = {
  comparison: {
    label: "Size Comparison",
    color: "bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300",
    description:
      "A partial index only indexes rows that match the WHERE clause. This makes the index smaller, faster to update, and uses less disk space.",
  },
  usage: {
    label: "When to Use",
    color: "bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    description:
      "Partial indexes are ideal when you frequently query a subset of rows. Common patterns include active records, recent data, or non-null values.",
  },
  examples: {
    label: "Examples",
    color: "bg-violet-500/15 border-violet-500/40 text-violet-700 dark:text-violet-300",
    description:
      "Several real-world scenarios where partial indexes significantly outperform full indexes.",
  },
};

const viewOrder: ViewMode[] = ["comparison", "usage", "examples"];

const exampleIndexes = [
  {
    label: "Active users only",
    sql: "CREATE INDEX idx_active_users_email\n  ON users (email)\n  WHERE active = true;",
    benefit: "Only 5% of users are active -- index is 20x smaller",
  },
  {
    label: "Non-null values",
    sql: "CREATE INDEX idx_orders_shipped\n  ON orders (shipped_at)\n  WHERE shipped_at IS NOT NULL;",
    benefit: "Skips rows with NULL shipped_at (pending orders)",
  },
  {
    label: "Recent orders",
    sql: "CREATE INDEX idx_recent_orders\n  ON orders (created_at)\n  WHERE status = 'pending';",
    benefit: "Only indexes pending orders -- completed orders are excluded",
  },
  {
    label: "High-value transactions",
    sql: "CREATE INDEX idx_large_transactions\n  ON transactions (amount)\n  WHERE amount > 10000;",
    benefit: "Only 2% of transactions are large -- very compact index",
  },
];

export function PartialIndexVisualization() {
  const [selected, setSelected] = useState<ViewMode>("comparison");
  const [showIndexView, setShowIndexView] = useState(false);

  const view = views[selected];

  const handleSelect = (key: ViewMode) => {
    setSelected(key);
    setShowIndexView(false);
  };

  const fullIndexSize = users.length;
  const partialIndexSize = activeUsers.length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Partial Index</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* SQL syntax */}
        <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
          {`CREATE INDEX idx_active_users_email\n  ON users (email)\n  WHERE active = true;  -- only index active users`}
        </pre>

        {/* View selector */}
        <div className="flex flex-wrap gap-2">
          {viewOrder.map((key) => {
            const v = views[key];
            const isActive = selected === key;
            return (
              <motion.button
                key={key}
                onClick={() => handleSelect(key)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isActive ? v.color + " shadow-sm" : "bg-background border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {key === "comparison" ? <BarChart3 className="h-3 w-3" /> : <Filter className="h-3 w-3" />}
                {v.label}
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
            className={`rounded-xl border p-3 ${view.color}`}
          >
            <p className="text-sm">{view.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Comparison tab */}
        {selected === "comparison" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={() => setShowIndexView(!showIndexView)}>
                {showIndexView ? "Hide" : "Show"} Index Contents
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full table */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground">All Users (table)</p>
                <div className="rounded-xl border bg-muted/20 overflow-hidden">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="px-2 py-1.5 text-left font-semibold">id</th>
                        <th className="px-2 py-1.5 text-left font-semibold">name</th>
                        <th className="px-2 py-1.5 text-left font-semibold">active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <motion.tr
                          key={user.id}
                          animate={{
                            backgroundColor: showIndexView && user.active
                              ? "rgba(16, 185, 129, 0.1)"
                              : showIndexView && !user.active
                              ? "rgba(239, 68, 68, 0.05)"
                              : "transparent",
                            opacity: showIndexView && !user.active ? 0.4 : 1,
                          }}
                          className="border-b last:border-b-0"
                        >
                          <td className="px-2 py-1 font-mono">{user.id}</td>
                          <td className="px-2 py-1 font-mono">{user.name}</td>
                          <td className="px-2 py-1">
                            <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-medium ${
                              user.active
                                ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                                : "bg-red-500/20 text-red-700 dark:text-red-300"
                            }`}>
                              {user.active ? "true" : "false"}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Index comparison */}
              <div className="space-y-3">
                {/* Full index */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                    Full Index ({fullIndexSize} entries)
                  </p>
                  <div className="flex gap-1">
                    {users.map((u) => (
                      <motion.div
                        key={u.id}
                        className="flex-1 h-6 rounded bg-orange-500/30 border border-orange-500/40 flex items-center justify-center"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: u.id * 0.05 }}
                      >
                        <span className="text-[8px] font-mono">{u.id}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Partial index */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Partial Index ({partialIndexSize} entries)
                  </p>
                  <div className="flex gap-1">
                    {users.map((u) => (
                      <motion.div
                        key={u.id}
                        className={`flex-1 h-6 rounded flex items-center justify-center ${
                          u.active
                            ? "bg-emerald-500/30 border border-emerald-500/40"
                            : "bg-muted/20 border border-dashed border-muted-foreground/20"
                        }`}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: u.id * 0.05 }}
                      >
                        <span className={`text-[8px] font-mono ${u.active ? "" : "text-muted-foreground/30"}`}>
                          {u.active ? u.id : ""}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Size comparison bars */}
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Size Comparison (real-world: 1M rows, 5% active)
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-16 text-muted-foreground">Full</span>
                      <div className="flex-1 bg-muted/30 rounded-full h-5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-orange-500/40 flex items-center justify-end pr-2"
                        >
                          <span className="text-[9px] font-mono font-bold">256 MB</span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] w-16 text-muted-foreground">Partial</span>
                      <div className="flex-1 bg-muted/30 rounded-full h-5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "5%" }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full rounded-full bg-emerald-500/40 flex items-center justify-end pr-2 min-w-[60px]"
                        >
                          <span className="text-[9px] font-mono font-bold">13 MB</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usage tab */}
        {selected === "usage" && (
          <div className="space-y-3">
            {[
              { title: "Skewed data distribution", desc: "Most rows have one value (e.g., 95% inactive), and you only query the minority", icon: "📊" },
              { title: "Soft deletes", desc: "Index only non-deleted rows: WHERE deleted_at IS NULL", icon: "🗑️" },
              { title: "Status-based queries", desc: "Index only pending/active items, skip completed/archived", icon: "📋" },
              { title: "Non-null columns", desc: "Skip NULL values that you never query: WHERE column IS NOT NULL", icon: "🔍" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 rounded-xl border bg-emerald-500/5 border-emerald-500/20 p-3"
              >
                <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold">{item.title}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Examples tab */}
        {selected === "examples" && (
          <div className="space-y-3">
            {exampleIndexes.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-1.5"
              >
                <p className="text-xs font-bold text-violet-700 dark:text-violet-300">{ex.label}</p>
                <pre className="text-[10px] font-mono rounded-xl border bg-muted/40 px-3 py-2 whitespace-pre overflow-x-auto">
                  {ex.sql}
                </pre>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-300">
                  <Check className="h-3 w-3 inline mr-1" />
                  {ex.benefit}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
