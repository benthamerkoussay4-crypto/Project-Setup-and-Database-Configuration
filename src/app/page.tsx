"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SchemaTester } from "@/components/SchemaTester";
import { UserProfileCard } from "@/components/UserProfileCard";
import { AuthModal } from "@/components/AuthModal";
import {
  ArrowUpRight,
  BookHeart,
  Check,
  CircleCheck,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  KeyRound,
  Layers3,
  LibraryBig,
  Lock,
  LockKeyhole,
  LogOut,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

const phase2Highlights = [
  {
    icon: Lock,
    number: "01",
    title: "User Registration & Login",
    description:
      "RESTful API endpoints (/api/auth/register, /api/auth/login) with Mongoose model validation.",
    detail: "Mongoose & Express REST API",
    color: "terracotta",
  },
  {
    icon: KeyRound,
    number: "02",
    title: "Bcrypt Password Hashing",
    description:
      "Passwords hashed using salted bcrypt prior to saving documents in MongoDB.",
    detail: "Bcrypt 10 rounds salt",
    color: "green",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "JWT Authorization",
    description:
      "JSON Web Tokens issued upon authentication and verified for protected user routes.",
    detail: "JWT Bearer & Cookie Auth",
    color: "gold",
  },
];

const authEndpoints = [
  ["POST", "/api/auth/register", "Name, email, password validation & user creation"],
  ["POST", "/api/auth/login", "Email & bcrypt password verification + JWT token issue"],
  ["GET", "/api/auth/me", "Protected user route returning active JWT profile"],
  ["POST", "/api/auth/logout", "Clears authentication cookies & local storage"],
];

const setupSteps = [
  "MongoDB & Mongoose connection initialized",
  "User Mongoose model created with email uniqueness & bcrypt hook",
  "JWT sign and verify helper functions implemented",
  "Register, Login, Profile (/api/auth/me) & Logout REST endpoints built",
  "Protected Auth Context & React Auth Modals integrated",
];

export default function HomePage() {
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openModal = (mode: "login" | "register") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--ink)]">
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      <header className="relative z-20 border-b border-[var(--line)]/80 bg-[var(--cream)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="BookNest home">
            <span className="grid size-10 place-items-center rounded-[13px] bg-[var(--forest)] text-white shadow-[0_8px_24px_rgba(32,70,57,0.18)] transition-transform group-hover:-rotate-3">
              <BookHeart size={21} strokeWidth={1.8} />
            </span>
            <span className="text-[22px] font-bold tracking-[-0.04em]">BookNest</span>
          </a>

          <nav className="hidden items-center gap-8 text-[13px] font-semibold text-[var(--muted)] md:flex" aria-label="Main navigation">
            <a className="text-[var(--forest)]" href="#top">Overview</a>
            <a className="transition-colors hover:text-[var(--forest)]" href="#auth">Auth Architecture</a>
            <a className="transition-colors hover:text-[var(--forest)]" href="#endpoints">REST Endpoints</a>
            <a className="transition-colors hover:text-[var(--forest)]" href="#report">Phase 2 Report</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden text-xs font-bold text-[var(--forest)] sm:inline-block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3.5 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut size={13} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal("login")}
                  className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2 text-xs font-bold text-[var(--ink)] transition-colors hover:bg-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openModal("register")}
                  className="rounded-full bg-[var(--forest)] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#18362c]"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section id="top" className="relative border-b border-[var(--line)]/80">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-glow absolute -right-40 -top-48 size-[610px] rounded-full" />
          <div className="book-lines absolute bottom-0 right-[6%] h-[72%] w-[38%] opacity-40" />
        </div>

        <div className="relative mx-auto grid max-w-[1180px] gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:py-[94px]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--sage)] bg-white/70 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--forest)]">
              <Sparkles size={13} fill="currentColor" /> Phase Two · MERN Authentication
            </div>
            <h1 className="max-w-[760px] text-[clamp(2.8rem,6.5vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.065em]">
              Secure authentication for
              <span className="font-serif font-normal italic text-[var(--terracotta)]"> book lovers.</span>
            </h1>
            <p className="mt-7 max-w-[610px] text-[17px] leading-8 text-[var(--muted)] sm:text-[18px]">
              Phase 2 is live! Complete user registration, login with bcrypt password hashing, and JWT authorization powered by MongoDB & Mongoose.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openModal("register")}
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--forest)] px-5 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(32,70,57,0.18)] transition-all hover:-translate-y-0.5"
              >
                Try User Registration <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => openModal("login")}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 py-3.5 text-sm font-bold text-[var(--ink)] shadow-sm transition-all hover:bg-[var(--cream)]"
              >
                Sign In with JWT
              </button>
            </div>
          </div>

          <aside className="status-card relative mx-auto w-full max-w-[420px] overflow-hidden rounded-[28px] border border-white/70 bg-white/78 p-6 shadow-[0_28px_80px_rgba(49,56,45,0.12)] backdrop-blur-xl lg:justify-self-end">
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">MERN Progress</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.045em]">Phase 02</p>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-[var(--pale-green)] text-[var(--forest)]">
                <ShieldCheck size={22} />
              </span>
            </div>

            <div className="relative mt-7">
              <div className="mb-2 flex items-end justify-between">
                <span className="text-sm font-semibold">Authentication</span>
                <span className="font-serif text-2xl italic text-[var(--forest)]">28.5%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--warm-gray)]">
                <div className="h-full w-[28.5%] rounded-full bg-[var(--forest)]" />
              </div>
              <p className="mt-2.5 text-xs text-[var(--muted)]">2 of 7 project phases complete</p>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[var(--line)]/80 bg-[var(--cream)]/60 p-3.5">
                <Database size={16} className="text-[var(--terracotta)]" />
                <p className="mt-2 text-lg font-bold">MongoDB</p>
                <p className="text-[10px] text-[var(--muted)]">Mongoose Driver</p>
              </div>
              <div className="rounded-2xl border border-[var(--line)]/80 bg-[var(--cream)]/60 p-3.5">
                <KeyRound size={16} className="text-[var(--gold)]" />
                <p className="mt-2 text-lg font-bold">JWT + Bcrypt</p>
                <p className="text-[10px] text-[var(--muted)]">10 Salt Rounds</p>
              </div>
            </div>

            <div className="relative mt-5 flex items-center gap-2.5 rounded-xl bg-[var(--forest)] px-4 py-3 text-xs font-semibold text-white">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#b7d1a2] opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-[#c9e6b3]" />
              </span>
              User Auth System Active
              <Check className="ml-auto" size={15} />
            </div>
          </aside>
        </div>
      </section>

      <section id="auth" className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20">
        <UserProfileCard onOpenAuth={() => openModal("login")} />

        <div className="mt-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="section-label">Authentication stack</p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold tracking-[-0.05em]">Phase 2 Highlights</h2>
          </div>
          <p className="max-w-[405px] text-sm leading-6 text-[var(--muted)]">
            User registration, login, bcrypt password hashing, and JWT tokens are implemented according to MERN stack REST standards.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {phase2Highlights.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.number} className="foundation-card group relative overflow-hidden rounded-[24px] border border-[var(--line)] bg-white/55 p-6 sm:p-7">
                <div className={`icon-tile icon-${card.color} grid size-12 place-items-center rounded-2xl`}>
                  <Icon size={21} strokeWidth={1.8} />
                </div>
                <span className="absolute right-6 top-7 font-serif text-sm italic text-[var(--soft-muted)]">/{card.number}</span>
                <h3 className="mt-8 text-xl font-bold tracking-[-0.025em]">{card.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[var(--muted)]">{card.description}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-[var(--line)] pt-5 text-xs font-bold text-[var(--forest)]">
                  <span className="grid size-5 place-items-center rounded-full bg-[var(--pale-green)]"><Check size={12} strokeWidth={3} /></span>
                  {card.detail}
                </div>
              </article>
            );
          })}
        </div>

        <SchemaTester />
      </section>

      <section id="endpoints" className="bg-[var(--forest)] text-white">
        <div className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b9cbbf]">REST API Specifications</p>
            <h2 className="mt-4 text-[clamp(2.3rem,4.5vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
              User Auth Routes.
            </h2>
            <p className="mt-6 text-[15px] leading-7 text-[#c6d2cb]">
              Standardized MERN RESTful endpoints with input validation, password hashing, and token issuance.
            </p>

            <div className="mt-9 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3.5">
                <span className="grid size-8 place-items-center rounded-xl bg-white/10"><LockKeyhole size={15} /></span>
                <div>
                  <p className="text-xs font-bold">Bcrypt Password Protection</p>
                  <p className="mt-0.5 text-[11px] text-[#aebfb5]">Salts & hashes passwords before database save</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3.5">
                <span className="grid size-8 place-items-center rounded-xl bg-white/10"><ShieldCheck size={15} /></span>
                <div>
                  <p className="text-xs font-bold">JWT Authentication</p>
                  <p className="mt-0.5 text-[11px] text-[#aebfb5]">Signed token sent in Bearer header & cookie</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#1a3a30] shadow-[0_25px_70px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-[var(--terracotta)] text-white"><ServerCog size={15} /></span>
                <div>
                  <p className="text-xs font-bold">Express / MERN REST API</p>
                  <p className="text-[10px] text-[#9db0a5]">MongoDB & Mongoose Controllers</p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider text-[#b9c9c0]">v2.0 Auth</span>
            </div>
            <div className="divide-y divide-white/[0.07]">
              {authEndpoints.map(([method, route, note], index) => (
                <div key={route} className="grid grid-cols-[50px_1fr] items-center gap-2 px-5 py-3.5 text-[11px] sm:grid-cols-[60px_1.2fr_1.3fr] sm:px-6">
                  <span className={`font-mono text-[10px] font-bold ${method === "POST" ? "text-emerald-400" : "text-sky-400"}`}>{method}</span>
                  <code className="font-semibold text-[#edf5f0]">{route}</code>
                  <span className="hidden text-[#94a99d] sm:block">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="report" className="relative mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="section-label">Phase 2 Report</p>
            <h2 className="mt-3 max-w-md text-[clamp(2.2rem,4vw,3.35rem)] font-semibold leading-[1.03] tracking-[-0.055em]">
              User authentication complete.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-7 text-[var(--muted)]">
              All Phase 2 requirements—User registration, login, bcrypt password hashing, JWT authorization, protected routes, and Mongoose user model—are implemented.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--pale-green)] px-4 py-2.5 text-xs font-bold text-[var(--forest)]">
              <CircleCheck size={15} /> Phase 2 Complete
            </div>
          </div>

          <div className="rounded-[26px] border border-[var(--line)] bg-white/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--muted)]">Phase 2 Checkpoints</p>
                <p className="mt-1 text-sm text-[var(--soft-muted)]">Completed</p>
              </div>
              <span className="font-serif text-3xl italic text-[var(--terracotta)]">05/05</span>
            </div>
            <ol className="mt-2">
              {setupSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-4 border-b border-[var(--line)] py-4 last:border-0">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--forest)] text-[11px] font-bold text-white">{index + 1}</span>
                  <span className="text-sm font-semibold">{step}</span>
                  <Check className="ml-auto shrink-0 text-[var(--forest)]" size={17} strokeWidth={2.5} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-7 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
            <BookHeart size={16} className="text-[var(--terracotta)]" /> BookNest
          </div>
          <p>MERN Stack Architecture · Phase 02</p>
          <p>User Authentication & Authorization</p>
        </div>
      </footer>
    </main>
  );
}
