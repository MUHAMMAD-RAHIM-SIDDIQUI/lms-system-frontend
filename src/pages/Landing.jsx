import { Link } from "react-router-dom";

const features = [
  { icon: "◈", title: "Learn with purpose", text: "Discover focused courses built to turn curiosity into practical skills." },
  { icon: "↗", title: "Teach & grow", text: "Publish your knowledge, reach learners and keep track of every sale." },
  { icon: "✓", title: "Simple & secure", text: "Verified accounts and secure checkout keep the learning journey smooth." },
];

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden bg-transparent">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-black text-white shadow-lg shadow-indigo-200">S</span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">SkillNest <span className="text-indigo-600">LMS</span></span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <Link to="/student/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-900">Student login</Link>
          <Link to="/trainer/login" className="rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">Trainer login</Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pt-16 lg:pt-20">
        <div className="absolute left-1/2 top-0 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />
        <section className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-indigo-600 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Learn. Teach. Grow.
          </div>
          <h1 className="text-5xl font-black leading-[1.03] tracking-[-.045em] text-slate-950 sm:text-6xl lg:text-7xl">
            Your skills deserve a <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">bigger stage.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            SkillNest is a modern learning marketplace where students find valuable courses and trainers turn expertise into income.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/student/login" className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-200 transition hover:-translate-y-1 hover:shadow-2xl sm:w-auto">
              Start learning <span className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/trainer/login" className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-7 py-4 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:w-auto">
              Become a trainer <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <div key={item.title} className="group rounded-2xl border border-white/80 bg-white/80 p-6 text-left shadow-lg shadow-slate-200/50 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg font-black text-indigo-600 transition group-hover:scale-105">{item.icon}</div>
              <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-white/80 bg-slate-950 p-7 text-white shadow-2xl sm:p-10">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-300">One platform, two journeys</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Built for people who love learning.</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Whether you are starting from zero or sharing years of experience, everything you need is in one place.</p>
            </div>
            <Link to="/student/login" className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-indigo-50">Explore SkillNest →</Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/70 py-7 text-center text-xs font-medium text-slate-500">
        © {new Date().getFullYear()} SkillNest LMS · Learn something worth knowing.
      </footer>
    </div>
  );
}
