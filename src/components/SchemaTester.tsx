"use client";

import { useState } from "react";
import { Check, Database, RefreshCw, Server, Sparkles } from "lucide-react";

export function SchemaTester() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/schema-test");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Database test failed");
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-[var(--line)] bg-white/80 p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
            <Database size={18} className="text-[var(--terracotta)]" />
            <span>Schema & Connection Verification</span>
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Test live query execution on the <code className="rounded bg-[var(--warm-gray)] px-1.5 py-0.5 font-mono text-[11px]">book_recommendations</code> table.
          </p>
        </div>

        <button
          onClick={testConnection}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--forest)] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#18362c] disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loading ? "Testing..." : "Run Schema Test Query"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
          ❌ {error}
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--forest)]">
            <Check size={16} /> Connection verified ({result.database} via {result.orm})
          </div>
          <pre className="max-h-60 overflow-x-auto rounded-xl bg-[var(--ink)] p-4 font-mono text-[11px] leading-relaxed text-[#c6d2cb]">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
