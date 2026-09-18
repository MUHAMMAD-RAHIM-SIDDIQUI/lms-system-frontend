import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getCourseById, createCourseCheckout } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function StudentCourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [purchased, setPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState("");
  const purchaseParam = new URLSearchParams(window.location.search).get("purchase");

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await getCourseById(id);
        const data = res.data.data || res.data;
        setCourse(data.course || data);
        setPurchased(Boolean(data.purchased ?? res.data.purchased));
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  // ask backend for a stripe session then send the user to stripe
  async function handleBuy() {
    setError("");
    setBuying(true);
    try {
      const res = await createCourseCheckout(id);
      const session = res.data.session;
      if (session?.url) {
        window.location.href = session.url;
      } else {
        setError("Could not start the checkout, please try again");
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setBuying(false);
    }
  }

  return (
    <div className="min-h-screen">
      <StudentNavbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/student/courses" className="text-sm text-indigo-600 hover:underline">
          &larr; Back to courses
        </Link>

        <Message type="error" text={error} />
        {purchaseParam === "cancelled" && (
          <Message type="info" text="Checkout was cancelled, you were not charged." />
        )}

        {loading ? (
          <Loader text="Loading course..." />
        ) : !course ? (
          <p className="py-10 text-sm text-slate-500">Course not found.</p>
        ) : (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="text-3xl font-bold text-slate-900">{course.name}</h1>
            {course.trainer && (
              <p className="mt-2 text-sm text-slate-500">
                By {course.trainer.fullname || course.trainer.username} ({course.trainer.email})
              </p>
            )}
            <p className="mt-6 whitespace-pre-line text-slate-700">{course.description}</p>

            <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
              <span className="text-2xl font-bold text-indigo-600">${course.amount ?? course.price}</span>

              {purchased ? (
                <Link to="/student/my-courses" className="rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700">
                  Go to course
                </Link>
              ) : (
                <button onClick={handleBuy} disabled={buying} className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
                  {buying ? "Redirecting to Stripe..." : "Buy Now"}
                </button>
              )}
            </div>

            {!purchased && (
              <p className="mt-3 text-xs text-slate-400">
                Already paid? Your course will show up under "My Courses".
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
