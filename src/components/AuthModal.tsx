"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, User as UserIcon, X, KeyRound, CheckCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = "login",
}: AuthModalProps) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        setSuccess("Login successful! Welcome back.");
      } else {
        await register(name, email, password);
        setSuccess("Registration successful! Account created.");
      }
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "An authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid size-8 place-items-center rounded-full bg-black/5 text-[var(--ink)] transition-colors hover:bg-black/10"
        >
          <X size={18} />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[var(--pale-green)] text-[var(--forest)]">
            <Lock size={22} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create BookNest Account"}
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {mode === "login"
              ? "Sign in using your email and bcrypt-hashed password"
              : "Register to unlock protected user features"}
          </p>
        </div>

        <div className="mt-6 flex rounded-2xl bg-[var(--warm-gray)] p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 rounded-xl py-2.5 transition-all ${
              mode === "login"
                ? "bg-white text-[var(--forest)] shadow-sm"
                : "text-[var(--muted)]"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 rounded-xl py-2.5 transition-all ${
              mode === "register"
                ? "bg-white text-[var(--forest)] shadow-sm"
                : "text-[var(--muted)]"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
            <CheckCircle2 size={16} /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "register" && (
            <div>
              <label className="mb-1 block text-xs font-bold text-[var(--ink)]">
                Full Name
              </label>
              <div className="relative">
                <UserIcon
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
                />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-xl border border-[var(--line)] bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-[var(--forest)] focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="mb-1 block text-xs font-bold text-[var(--ink)]">
              Email Address
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full rounded-xl border border-[var(--line)] bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-[var(--forest)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-[var(--ink)]">
              Password
            </label>
            <div className="relative">
              <KeyRound
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--muted)]"
              />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-[var(--line)] bg-white py-2.5 pl-10 pr-4 text-xs font-medium focus:border-[var(--forest)] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--forest)] py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#18362c] disabled:opacity-60"
          >
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center font-mono text-[10px] text-[var(--muted)]">
          🔒 Secured with bcrypt password hashing & JWT auth token
        </p>
      </div>
    </div>
  );
}
