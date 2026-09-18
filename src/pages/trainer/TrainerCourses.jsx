import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrainerNavbar from "../../components/TrainerNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getTrainerCourses, deleteCourse } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function TrainerCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadCourses() {
    try {
      const res = await getTrainerCourses();
      setCourses(res.data.data || []);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  // ask first, deleting a course cannot be undone
  async function handleDelete(courseId) {
    const sure = window.confirm("Are you sure you want to delete this course?");
    if (!sure) return;

    setError("");
    setSuccess("");
    try {
      const res = await deleteCourse(courseId);
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.data?.message || "Failed to delete course");
      }
      setSuccess(res.data.message || "Course deleted");
      setCourses((current) => current.filter((c) => c._id !== courseId));
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  return (
    <div className="min-h-screen">
      <TrainerNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My courses</h1>
          <Link to="/trainer/courses/add" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            Add Course
          </Link>
        </div>

        <div className="mt-6">
          <Message type="error" text={error} />
          <Message type="success" text={success} />

          {loading ? (
            <Loader text="Loading your courses..." />
          ) : courses.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
              You have not created any course yet.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id} className="border-t border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-900">{course.name}</td>
                      <td className="max-w-xs truncate px-4 py-3 text-slate-600">{course.description}</td>
                      <td className="px-4 py-3">${course.amount}</td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/trainer/courses/edit/${course._id}`} className="mr-3 text-emerald-600 hover:underline">Edit</Link>
                        <button onClick={() => handleDelete(course._id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
