import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getMyCourses } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";

const purchaseMessages = {
  success: "Course purchased successfully! It's ready for you below.",
  error: "Something went wrong confirming your payment. If you were charged, please contact support.",
};

export default function StudentMyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const purchaseParam = new URLSearchParams(window.location.search).get("purchase");

  useEffect(() => {
    async function loadMyCourses() {
      try {
        const res = await getMyCourses();
        setCourses(res.data.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadMyCourses();
  }, []);

  return (
    <div className="min-h-screen">
      <StudentNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">My courses</h1>
        <p className="mt-1 text-sm text-slate-500">Everything you have purchased.</p>

        <div className="mt-6">
          <Message type="error" text={error} />
          {purchaseParam && (
            <Message
              type={purchaseParam === "success" ? "success" : "error"}
              text={purchaseMessages[purchaseParam] || ""}
            />
          )}
          {loading ? (
            <Loader text="Loading your courses..." />
          ) : courses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <p className="text-sm text-slate-500">You have not bought any course yet.</p>
              <Link to="/student/courses" className="mt-3 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm text-white hover:bg-indigo-700">
                Browse courses
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  purchased
                  footer={<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Purchased</span>}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
