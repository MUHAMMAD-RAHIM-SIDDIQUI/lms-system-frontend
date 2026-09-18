import { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getAllCourses } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load all approved courses once when the page opens
  useEffect(() => {
    async function loadCourses() {
      try {
        const res = await getAllCourses();
        setCourses(res.data.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  return (
    <div className="min-h-screen">
      <StudentNavbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-900">Browse courses</h1>
        <p className="mt-1 text-sm text-slate-500">Pick a course and start learning today.</p>

        <div className="mt-6">
          <Message type="error" text={error} />
          {loading ? (
            <Loader text="Loading courses..." />
          ) : courses.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">No courses available right now.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} to={`/student/courses/${course._id}`} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
