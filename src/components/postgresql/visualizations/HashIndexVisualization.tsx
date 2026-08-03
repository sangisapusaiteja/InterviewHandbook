"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hash, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BucketEntry {
  key: string;
  hashValue: number;
  rowPointer: string;
}

const hashFunction = (key: string): number => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 8;
  }
  return hash;
};

const entries: BucketEntry[] = [
  { key: "alice@mail.com", hashValue: 0, rowPointer: "row 1" },
  { key: "bob@mail.com", hashValue: 0, rowPointer: "row 2" },
  { key: "charlie@mail.com", hashValue: 0, rowPointer: "row 3" },
  { key: "diana@mail.com", hashValue: 0, rowPointer: "row 4" },
  { key: "eve@mail.com", hashValue: 0, rowPointer: "row 5" },
  { key: "frank@mail.com", hashValue: 0, rowPointer: "row 6" },
  { key: "grace@mail.com", hashValue: 0, rowPointer: "row 7" },
  { key: "hank@mail.com", hashValue: 0, rowPointer: "row 8" },
].map((e) => ({ ...e, hashValue: hashFunction(e.key) }));

const buckets: Record<number, BucketEntry[]> = {};
for (let i = 0; i < 8; i++) buckets[i] = [];
entries.forEach((e) => buckets[e.hashValue].push(e));

const searchKeys = ["frank@mail.com", "alice@mail.com", "eve@mail.com"];

interface QueryExample {
  query: string;
  canUseHash: boolean;
  reason: string;
}

const queryExamples: QueryExample[] = [
  { query: "WHERE email = 'frank@mail.com'", canUseHash: true, reason: "Equality comparison -- hash index works perfectly" },
  { query: "WHERE email LIKE 'frank%'", canUseHash: false, reason: "Pattern matching -- hash cannot do range/pattern lookups" },
  { query: "WHERE email > 'frank@mail.com'", canUseHash: false, reason: "Range comparison -- hash only supports equality (=)" },
  { query: "WHERE email IN ('alice@mail.com', 'bob@mail.com')", canUseHash: true, reason: "IN is multiple equality checks -- hash works" },
  { query: "ORDER BY email", canUseHash: false, reason: "Sorting -- hash values have no order relationship" },
];

export function HashIndexVisualization() {
  const [searchKey, setSearchKey] = useState<string | null>(null);
  const [activeBucket, setActiveBucket] = useState<number | null>(null);
  const [foundEntry, setFoundEntry] = useState<BucketEntry | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  const handleSearch = (key: string) => {
    setSearchKey(key);
    setFoundEntry(null);
    const hash = hashFunction(key);
    setActiveBucket(hash);
    setTimeout(() => {
      const entry = entries.find((e) => e.key === key);
      setFoundEntry(entry || null);
    }, 600);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Hash Index</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Description */}
        <div className="rounded-xl border bg-blue-500/10 border-blue-500/30 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Hash className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <p className="text-xs font-bold text-blue-700 dark:text-blue-300">How Hash Indexes Work</p>
          </div>
          <p className="text-xs text-blue-700/80 dark:text-blue-300/80">
            A hash function converts the key into a bucket number. The bucket contains pointers to the actual rows.
            Lookups are O(1) on average but only support equality (=) comparisons.
          </p>
        </div>

        {/* SQL syntax */}
        <pre className="text-xs font-mono rounded-xl border bg-muted/40 px-4 py-3 whitespace-pre overflow-x-auto">
          {`CREATE INDEX idx_users_email_hash\n  ON users USING hash (email);`}
        </pre>

        {/* Search controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs font-semibold text-muted-foreground">Look up:</p>
          {searchKeys.map((key) => (
            <Button
              key={key}
              size="sm"
              variant={searchKey === key ? "default" : "outline"}
              className="text-[10px] h-7"
              onClick={() => handleSearch(key)}
            >
              <Search className="h-3 w-3 mr-1" />
              {key}
            </Button>
          ))}
        </div>

        {/* Hash function visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Hash function step */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Hash Function
            </p>
            <AnimatePresence mode="wait">
              {searchKey ? (
                <motion.div
                  key={searchKey}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="rounded-xl border bg-violet-500/10 border-violet-500/30 p-4 space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-violet-500/20 px-2 py-0.5 rounded text-violet-700 dark:text-violet-300">
                      input
                    </span>
                    <span className="text-xs font-mono font-bold">{searchKey}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center"
                    >
                      <Hash className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-700 dark:text-emerald-300">
                      bucket
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400"
                    >
                      {hashFunction(searchKey)}
                    </motion.span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border bg-muted/20 p-4 flex items-center justify-center min-h-[140px]"
                >
                  <p className="text-xs text-muted-foreground italic">Select a key to search</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bucket table */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Hash Table Buckets
            </p>
            <div className="space-y-1">
              {Object.entries(buckets).map(([bucketNum, bucketEntries]) => {
                const num = parseInt(bucketNum);
                const isActive = activeBucket === num;
                return (
                  <motion.div
                    key={bucketNum}
                    animate={{
                      backgroundColor: isActive ? "rgba(16, 185, 129, 0.15)" : "transparent",
                      scale: isActive ? 1.02 : 1,
                    }}
                    className={`flex items-center gap-2 px-2 py-1 rounded-lg border ${
                      isActive ? "border-emerald-500/40" : "border-border"
                    }`}
                  >
                    <span className={`text-[10px] font-mono font-bold w-6 ${
                      isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
                    }`}>
                      [{bucketNum}]
                    </span>
                    <div className="flex-1 flex gap-1.5 flex-wrap">
                      {bucketEntries.length === 0 ? (
                        <span className="text-[9px] text-muted-foreground italic">empty</span>
                      ) : (
                        bucketEntries.map((entry) => {
                          const isFound = foundEntry?.key === entry.key;
                          return (
                            <motion.span
                              key={entry.key}
                              animate={{
                                scale: isFound ? 1.1 : 1,
                                backgroundColor: isFound ? "rgba(16, 185, 129, 0.3)" : "transparent",
                              }}
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                isFound
                                  ? "text-emerald-700 dark:text-emerald-300 font-bold"
                                  : "text-foreground bg-muted/40"
                              }`}
                            >
                              {entry.key.split("@")[0]} → {entry.rowPointer}
                            </motion.span>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Found result */}
        <AnimatePresence>
          {foundEntry && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-300"
            >
              <p className="font-semibold">
                hash(&quot;{foundEntry.key}&quot;) = bucket {foundEntry.hashValue} → {foundEntry.rowPointer} (O(1) lookup)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supported operations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Supported Operations
            </p>
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-6"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? "Hide" : "Show"} Details
            </Button>
          </div>
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-1.5 pt-1">
                  {queryExamples.map((ex, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-start gap-2 p-2 rounded-lg border ${
                        ex.canUseHash
                          ? "bg-emerald-500/10 border-emerald-500/20"
                          : "bg-red-500/10 border-red-500/20"
                      }`}
                    >
                      {ex.canUseHash ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                      )}
                      <div>
                        <p className="text-[10px] font-mono font-bold">{ex.query}</p>
                        <p className="text-[10px] text-muted-foreground">{ex.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
