import { Link } from "react-router-dom";

// shared wrapper so all login/signup pages look the same
export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-180px] right-[-100px] h-[360px] w-[360px] rounded-full bg-violet-300/15 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl sm:p-9">
        <div className="mb-7 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">←</span>
            Back home
          </Link>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-black text-white shadow-lg shadow-indigo-200/60">S</span>
        </div>
        <div className="mb-7">
          <div className="mb-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          <h1 className="text-3xl font-black tracking-tight text-slate-950">{title}</h1>
          {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
