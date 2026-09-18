import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TrainerNavbar from "../../components/TrainerNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getCourseSales } from "../../api/trainerApi";
import { getErrorMessage, imageUrl } from "../../api/axiosInstance";

export default function TrainerCourseSales() {
  const { courseId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourseSales() {
      try {
        const res = await getCourseSales(courseId);
        setData(res.data || {}); // backend returns {course, summary, students} directly on res.data, not nested under "data"
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadCourseSales();
  }, [courseId]);

  const students = data?.students || [];
  const course = data?.course || {};
  const summary = data?.summary || data || {};

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link to="/trainer/sales" className="text-sm text-emerald-600 hover:underline">&larr; Back to sales</Link>
        <Message type="error" text={error} />

        {loading ? (
          <Loader text="Loading course sales..." />
        ) : (
          <>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">{course.name || "Course sales"}</h1>
            {course.description && <p className="mt-1 text-sm text-slate-600">{course.description}</p>}

            <div className="mt-6 grid gap-4 sm:grid-cols-4">
              {[
                ["Total sales", summary.totalSales ?? 0],
                ["Total revenue", `$${summary.totalRevenue ?? 0}`],
                ["Your earning", `$${summary.trainerEarning ?? 0}`],
                ["Platform fee", `$${summary.platformFee ?? 0}`],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase text-slate-500">{label}</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-lg font-semibold text-slate-900">Students who bought this course</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length === 0 ? (
                    <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">Nobody bought this course yet.</td></tr>
                  ) : (
                    students.map((s, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="flex items-center gap-3 px-4 py-3">
                          {(s.studentImage || s.image) && <img src={imageUrl(s.studentImage || s.image)} alt={s.studentName || s.fullname} className="h-8 w-8 rounded-full object-cover" />}
                          <span>{s.studentName || s.fullname}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">{s.studentEmail || s.email}</td>
                        <td className="px-4 py-3">${s.amount}</td>
                        <td className="px-4 py-3">{s.purchasedAt ? new Date(s.purchasedAt).toLocaleDateString() : "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
