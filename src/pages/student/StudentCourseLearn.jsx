import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { getPurchasedCourse } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";

function getYoutubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
      if (parsed.pathname.startsWith("/embed/")) return url;
    }
  } catch {
    return "";
  }
  return "";
}

export default function StudentCourseLearn() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await getPurchasedCourse(id);
        setCourse(res.data.data || res.data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  const embedUrl = course?.videoUrl ? getYoutubeEmbedUrl(course.videoUrl) : "";

  return (
    <div className="min-h-screen">
      <StudentNavbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link to="/student/my-courses" className="text-sm text-indigo-600 hover:underline">
          &larr; Back to My Courses
        </Link>

        <Message type="error" text={error} />

        {loading ? (
          <Loader text="Loading course..." />
        ) : !course ? (
          <p className="py-10 text-sm text-slate-500">Course not found.</p>
        ) : (
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-slate-900">{course.name}</h1>
            <p className="mt-2 text-slate-600">{course.description}</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
              {course.videoUrl ? (
                embedUrl ? (
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src={embedUrl}
                      title={course.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <video className="max-h-[650px] w-full" controls controlsList="nodownload">
                    <source src={course.videoUrl} />
                    Your browser does not support video playback.
                  </video>
                )
              ) : (
                <div className="flex min-h-64 items-center justify-center bg-slate-900 p-8 text-center text-sm text-white">
                  Trainer has not added a video for this course yet.
                </div>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              Purchased course — your learning access is active.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
