import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getStudentProfile } from "../../api/studentApi";
import { getErrorMessage, imageUrl } from "../../api/axiosInstance";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await getStudentProfile();
        setStudent(res.data.data || res.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  return (
    <div className="min-h-screen">
      <StudentNavbar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link to="/student/courses" className="text-sm text-indigo-600 hover:underline">
          &larr; Back to courses
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">My Profile</h1>
        <Message type="error" text={error} />

        {loading ? (
          <Loader text="Loading profile..." />
        ) : student ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
              {student.image ? (
                <img
                  src={imageUrl(student.image)}
                  alt={student.fullname}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
                  {(student.fullname || "S").charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{student.fullname}</h2>
                <p className="text-sm text-slate-500">@{student.username}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs uppercase text-slate-500">Full name</p>
                <p className="mt-1 font-medium text-slate-900">{student.fullname}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs uppercase text-slate-500">Username</p>
                <p className="mt-1 font-medium text-slate-900">{student.username}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs uppercase text-slate-500">Email</p>
                <p className="mt-1 font-medium text-slate-900">{student.email}</p>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
