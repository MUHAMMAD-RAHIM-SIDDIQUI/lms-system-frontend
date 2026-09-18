import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import Message from "../components/Message";
import { studentResetPassword } from "../api/studentApi";
import { trainerResetPassword } from "../api/trainerApi";
import { getErrorMessage } from "../api/axiosInstance";

// this page is opened from the email link, same link shape for both roles
// so we ask the user which one they are
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Both passwords must match");
      return;
    }

    setLoading(true);
    try {
      const res =
        role === "student"
          ? await studentResetPassword(password, token)
          : await trainerResetPassword(password, token);

      setSuccess(res.data.message || "Password changed, you can login now");
      setTimeout(() => navigate(`/${role}/login`), 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Reset your password" subtitle="Pick your account type first">
      <Message type="error" text={error} />
      <Message type="success" text={success} />

      <div className="mb-4 flex gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={role === "student"}
            onChange={() => setRole("student")}
          />
          I am a Student
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={role === "trainer"}
            onChange={() => setRole("trainer")}
          />
          I am a Trainer
        </label>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Change password"}
        </button>
      </form>
    </AuthCard>
  );
}
