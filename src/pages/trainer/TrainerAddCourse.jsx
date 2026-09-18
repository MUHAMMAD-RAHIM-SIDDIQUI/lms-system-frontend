import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrainerNavbar from "../../components/TrainerNavbar";
import Message from "../../components/Message";
import { addCourse } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function TrainerAddCourse() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", amount: "", videoUrl: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await addCourse({ ...form, amount: Number(form.amount) });
      navigate("/trainer/courses");
    } catch (err) {
      // usually this fails when stripe onboarding is not finished yet
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link to="/trainer/courses" className="text-sm text-emerald-600 hover:underline">&larr; Back to my courses</Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Add a course</h1>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <Message type="error" text={error} />
          {error && (
            <p className="mb-4 text-xs text-slate-500">
              If this is about payments, finish the "Set up payments" step on your dashboard first.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" required placeholder="Course name" value={form.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <textarea name="description" required rows="5" placeholder="Description" value={form.description} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input name="amount" type="number" min="0" required placeholder="Price in USD" value={form.amount} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <input name="videoUrl" type="url" placeholder="Course video URL (YouTube or direct video URL)" value={form.videoUrl} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            <p className="text-xs text-slate-500">The video is shown to students only after a successful purchase.</p>
            <button type="submit" disabled={loading} className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
              {loading ? "Saving..." : "Create course"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
