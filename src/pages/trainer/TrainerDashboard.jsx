import { useEffect, useState } from "react";
import TrainerNavbar from "../../components/TrainerNavbar";
import OnboardingBanner from "../../components/OnboardingBanner";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getDashboard } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";

// one small stat box
function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

const onboardingMessages = {
  success: "Payment setup complete! You can now add courses.",
  "already-done": "Your payment setup was already complete.",
  incomplete: "Payment setup is not finished yet, please try again.",
  refresh: "That setup link expired, please click \"Set up payments\" again.",
  error: "Something went wrong while checking your payment setup.",
};

export default function TrainerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const onboardingParam = new URLSearchParams(window.location.search).get("onboarding");

  async function loadDashboard() {
    try {
      const res = await getDashboard();
      setStats(res.data.data || {});
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();

    // trainer might finish stripe onboarding in another tab, refresh when they come back here
    function handleFocus() {
      loadDashboard();
    }
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const sales = stats?.recentSales || [];

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <OnboardingBanner onboarded={stats?.stripeOnBoardedStatus} />

        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <Message type="error" text={error} />
        {onboardingParam && (
          <Message
            type={onboardingParam === "success" || onboardingParam === "already-done" ? "success" : "error"}
            text={onboardingMessages[onboardingParam] || ""}
          />
        )}

        {loading ? (
          <Loader text="Loading dashboard..." />
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard label="Total courses" value={stats?.totalCourses ?? 0} />
              <StatCard label="Total sales" value={stats?.totalSales ?? 0} />
              <StatCard label="Total revenue" value={`$${stats?.totalRevenue ?? 0}`} />
              <StatCard label="Your earning" value={`$${stats?.trainerEarning ?? 0}`} />
              <StatCard label="Platform fee" value={`$${stats?.platformFee ?? 0}`} />
            </div>

            <h2 className="mt-10 text-lg font-semibold text-slate-900">Recent sales</h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-6 text-center text-slate-500">No sales yet.</td>
                    </tr>
                  ) : (
                    sales.map((s, i) => (
                      <tr key={i} className="border-t border-slate-100">
                        <td className="px-4 py-3">{s.studentName}</td>
                        <td className="px-4 py-3">{s.courseName}</td>
                        <td className="px-4 py-3">${s.amount}</td>
                        <td className="px-4 py-3">{s.date ? new Date(s.date).toLocaleDateString() : "-"}</td>
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
