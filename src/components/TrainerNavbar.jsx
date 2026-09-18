import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTrainerAuth } from "../context/TrainerAuthContext";
import { imageUrl } from "../api/axiosInstance";

export default function TrainerNavbar() {
  const { trainer, logoutTrainer } = useTrainerAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => { logoutTrainer(); navigate("/trainer/login"); };
  const linkClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-emerald-50 text-emerald-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`;
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <Link to="/trainer/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-black text-white shadow-md">S</span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">SkillNest <span className="text-emerald-600">Trainer</span></span>
        </Link>
        <div className="order-3 flex w-full items-center justify-center gap-1 overflow-x-auto sm:order-2 sm:w-auto">
          <NavLink to="/trainer/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/trainer/courses" className={linkClass}>My Courses</NavLink>
          <NavLink to="/trainer/sales" className={linkClass}>Sales</NavLink>
          <NavLink to="/trainer/students" className={linkClass}>Students</NavLink>
         </div>
        
        <div className="relative order-2 sm:order-3">
          <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 shadow-sm hover:shadow-md">
            {trainer?.image ? <img src={imageUrl(trainer.image)} alt={trainer.fullname} className="h-8 w-8 rounded-full object-cover" /> : <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">{(trainer?.fullname || "T").charAt(0).toUpperCase()}</span>}
            <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 sm:block">{trainer?.fullname}</span><span className="text-xs text-slate-400">⌄</span>
          </button>
          {open && <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="border-b border-slate-100 px-3 pb-3 pt-2"><p className="truncate text-sm font-bold text-slate-800">{trainer?.fullname}</p><p className="mt-1 truncate text-xs text-slate-500">{trainer?.email}</p></div>
            <button onClick={handleLogout} className="mt-2 w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50">Logout</button>
          </div>}
        </div>
      </nav>
    </header>
  );
}
