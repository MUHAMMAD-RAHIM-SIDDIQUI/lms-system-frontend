import { Navigate } from "react-router-dom";
import { useStudentAuth } from "../context/StudentAuthContext";
import Loader from "./Loader";

// if there is no student token, kick the user to the student login page
export default function StudentProtectedRoute({ children }) {
  const { student, loading } = useStudentAuth();
  const token = localStorage.getItem("studentToken");

  if (loading) return <Loader />;
  if (!token || !student) return <Navigate to="/student/login" replace />;

  return children;
}
