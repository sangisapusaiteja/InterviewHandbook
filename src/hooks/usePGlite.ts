"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export interface SQLResult {
  columns: string[];
  rows: Record<string, unknown>[];
  command: string;
  rowCount: number;
}

export function usePGlite() {
  const dbRef = useRef<unknown>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const { PGlite } = await import("@electric-sql/pglite");
        if (cancelled) return;
        const db = new PGlite();
        await db.waitReady;
        dbRef.current = db;
        if (!cancelled) {
          setIsReady(true);
          setIsLoading(false);
        }
      } catch {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const exec = useCallback(
    async (sql: string): Promise<SQLResult[]> => {
      const db = dbRef.current as {
        exec: (sql: string) => Promise<
          {
            fields: { name: string }[];
            rows: Record<string, unknown>[];
            affectedRows?: number;
          }[]
        >;
      };
      if (!db) throw new Error("Database not ready");

      const results = await db.exec(sql);
      return results.map((r) => ({
        columns: r.fields.map((f) => f.name),
        rows: r.rows,
        command: "",
        rowCount: r.affectedRows ?? r.rows.length,
      }));
    },
    []
  );

  return { exec, isReady, isLoading };
}
