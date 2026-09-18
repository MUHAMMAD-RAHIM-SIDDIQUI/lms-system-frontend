import { Link } from "react-router-dom";

export default function CourseCard({ course, to, footer, purchased = false }) {
  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-0 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="h-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500" />
        <div className="p-5">
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-indigo-600">Course</span>
            <span className="text-lg font-black text-indigo-600">${course.amount ?? course.price}</span>
          </div>
          <h3 className="text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-indigo-600">{course.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{course.description}</p>
          {course.trainer && <p className="mt-4 text-xs font-medium text-slate-400">By {course.trainer.fullname || course.trainer.username}</p>}
        </div>
      </div>
      <div className="border-t border-slate-100 p-4">
        {purchased ? <Link to={`/student/courses/${course._id}/learn`} className="block w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm">Continue learning →</Link> : footer ? footer : to && <Link to={to} className="block w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm">View details →</Link>}
      </div>
    </article>
  );
}
