import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrainerNavbar from "../../components/TrainerNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getSalesByCourse } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function TrainerSales() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSales() {
      try {
        const res = await getSalesByCourse();
        setRows(res.data.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadSales();
  }, []);

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Sales by course</h1>
        <Message type="error" text={error} />

        {loading ? (
          <Loader text="Loading sales..." />
        ) : rows.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">No sales data yet.</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Sales</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Your earning</th>
                  <th className="px-4 py-3">Platform fee</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const courseId = row.courseId || row._id;
                  return (
                    <tr key={courseId || i} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.courseName || row.name}</td>
                      <td className="px-4 py-3">{row.totalSales ?? 0}</td>
                      <td className="px-4 py-3">${row.totalRevenue ?? 0}</td>
                      <td className="px-4 py-3">${row.trainerEarning ?? 0}</td>
                      <td className="px-4 py-3">${row.platformFee ?? 0}</td>
                      <td className="px-4 py-3 text-right">
                        {courseId && (
                          <Link to={`/trainer/sales/${courseId}`} className="text-emerald-600 hover:underline">View</Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
