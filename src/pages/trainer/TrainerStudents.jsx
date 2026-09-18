import { useEffect, useState } from "react";
import TrainerNavbar from "../../components/TrainerNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getPurchasedStudents } from "../../api/trainerApi";
import { getErrorMessage, imageUrl } from "../../api/axiosInstance";

export default function TrainerStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await getPurchasedStudents();
        setStudents(res.data.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Students</h1>
        <p className="mt-1 text-sm text-slate-500">Everyone who purchased one of your courses.</p>
        <Message type="error" text={error} />

        {loading ? (
          <Loader text="Loading students..." />
        ) : students.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">No students yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Student</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="flex items-center gap-3 px-4 py-3">
                      {s.studentImage && <img src={imageUrl(s.studentImage)} alt={s.studentName} className="h-8 w-8 rounded-full object-cover" />}
                      <span className="font-medium text-slate-900">{s.studentName}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.studentEmail}</td>
                    <td className="px-4 py-3">{s.courseName}</td>
                    <td className="px-4 py-3">${s.amount}</td>
                    <td className="px-4 py-3">{s.purchasedAt ? new Date(s.purchasedAt).toLocaleDateString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
