import { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import Message from "../../components/Message";
import { studentForgotPassword } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function StudentForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await studentForgotPassword(email);
      setSuccess(res.data.message || "Check your email for the reset link");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Forgot password" subtitle="We will email you a reset link">
      <Message type="error" text={error} />
      <Message type="success" text={success} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link to="/student/login" className="text-indigo-600 hover:underline">Back to login</Link>
      </p>
    </AuthCard>
  );
}
