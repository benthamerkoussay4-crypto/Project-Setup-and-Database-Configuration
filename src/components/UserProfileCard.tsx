"use client";

import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, LogOut, Key, UserCheck, Sparkles } from "lucide-react";

export function UserProfileCard({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { user, token, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-white/60 p-4 text-xs font-semibold text-[var(--muted)]">
        <span className="size-2 animate-ping rounded-full bg-[var(--forest)]" /> Checking authentication state...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-white/70 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink)]">
            <UserCheck size={16} className="text-[var(--terracotta)]" />
            <span>Authentication Status</span>
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">
            You are currently browsing as a guest. Sign in to access protected routes and user recommendations.
          </p>
        </div>

        <button
          onClick={onOpenAuth}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--forest)] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#18362c]"
        >
          <Key size={14} /> Sign In / Register
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--forest)]/20 bg-emerald-50/50 p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-[var(--forest)] font-bold text-white shadow-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[var(--ink)]">{user.name}</span>
              <span className="rounded-full bg-[var(--pale-green)] px-2.5 py-0.5 text-[10px] font-bold text-[var(--forest)]">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)]">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-800">
            <ShieldCheck size={14} /> JWT Authenticated
          </span>
          <button
            onClick={() => logout()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="mt-4 border-t border-emerald-100 pt-3 font-mono text-[10px] text-emerald-900/70">
        🔑 Active JWT Token: <span className="truncate opacity-80">{token ? `${token.substring(0, 28)}...` : "Cookie Session Active"}</span>
      </div>
    </div>
  );
}
