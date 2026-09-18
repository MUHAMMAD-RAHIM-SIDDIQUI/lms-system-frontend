import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TrainerNavbar from "../../components/TrainerNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getTrainerCourse, editCourse } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function TrainerEditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", description: "", amount: "", videoUrl: "" });
  const [original, setOriginal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // pre-fill the form with the current course values
  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await getTrainerCourse(id);
        const course = res.data.data || res.data;
        const values = {
          name: course.name || "",
          description: course.description || "",
          amount: course.amount ?? "",
          videoUrl: course.videoUrl || "",
        };
        setForm(values);
        setOriginal(values);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // only send the fields the trainer actually changed
    const changed = {};
    Object.keys(form).forEach((key) => {
      if (String(form[key]) !== String(original[key])) {
        changed[key] = key === "amount" ? Number(form[key]) : form[key];
      }
    });

    if (Object.keys(changed).length === 0) {
      setError("Nothing changed yet");
      return;
    }

    setSaving(true);
    try {
      const res = await editCourse(id, changed);
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.data?.message || "Failed to update course");
      }
      navigate("/trainer/courses");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link to="/trainer/courses" className="text-sm text-emerald-600 hover:underline">&larr; Back to my courses</Link>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Edit course</h1>

        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
          <Message type="error" text={error} />
          {loading ? (
            <Loader text="Loading course..." />
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Course name" value={form.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <textarea name="description" rows="5" placeholder="Description" value={form.description} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input name="amount" type="number" min="0" placeholder="Price in USD" value={form.amount} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <input name="videoUrl" type="url" placeholder="Course video URL (YouTube or direct video URL)" value={form.videoUrl} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
              <p className="text-xs text-slate-500">Students can watch this video after purchasing the course.</p>
              <button type="submit" disabled={saving} className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
