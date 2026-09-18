import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import Message from "../../components/Message";
import { studentLogin } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";
import { useStudentAuth } from "../../context/StudentAuthContext";

export default function StudentLogin() {
  const navigate = useNavigate();
  const { loginStudent } = useStudentAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      const res = await studentLogin(form.email, form.password);

      // if there is no token in the response the account is not verified yet,
      // backend already sent a fresh otp to the email
      if (!res.data?.data?.token) {
        setInfo(res.data.message || "OTP sent to your email, please verify your account before logging in");
        setTimeout(() => navigate("/student/verify-otp"), 1800);
        return;
      }

      loginStudent(res.data.data);
      navigate("/student/courses");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Student login" subtitle="Welcome back, continue learning">
      <Message type="error" text={error} />
      <Message type="info" text={info} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="password" type="password" required placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <Link /*to="/student/forgot-password"*/ className="text-indigo-600 hover:underline">Forgot password?</Link>
        <Link to="/student/signup" className="text-indigo-600 hover:underline">Create account</Link>
      </div>
    </AuthCard>
  );
}
