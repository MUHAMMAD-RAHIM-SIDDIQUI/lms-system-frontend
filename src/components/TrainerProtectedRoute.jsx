import { Navigate } from "react-router-dom";
import { useTrainerAuth } from "../context/TrainerAuthContext";
import Loader from "./Loader";

// same idea as the student one but for the trainer side
export default function TrainerProtectedRoute({ children }) {
  const { trainer, loading } = useTrainerAuth();
  const token = localStorage.getItem("trainerToken");

  if (loading) return <Loader />;
  if (!token || !trainer) return <Navigate to="/trainer/login" replace />;

  return children;
}
