import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import Message from "../../components/Message";
import { trainerLogin } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";
import { useTrainerAuth } from "../../context/TrainerAuthContext";

export default function TrainerLogin() {
  const navigate = useNavigate();
  const { loginTrainer } = useTrainerAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [pending, setPending] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    setPending(false);
    setLoading(true);

    try {
      const res = await trainerLogin(form.email, form.password);

      // no token means the account is not verified, backend resent the otp
      if (!res.data?.data?.token) {
        setInfo(res.data.message || "OTP sent to your email, please verify your account before logging in");
        setTimeout(() => navigate("/trainer/verify-otp"), 1800);
        return;
      }

      loginTrainer(res.data.data);
      navigate("/trainer/dashboard");
    } catch (err) {
      // 403 = admin has not approved this trainer yet, show it nicely
      if (err?.response?.status === 403) {
        setPending(true);
        setInfo(getErrorMessage(err));
      } else {
        setError(getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Trainer login" subtitle="Manage your courses and sales">
      <Message type="error" text={error} />
      <Message type={pending ? "info" : "info"} text={info} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="password" type="password" required placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <Link /*</div>to="/trainer/forgot-password"*/ className="text-emerald-600 hover:underline">Forgot password?</Link>
        <Link to="/trainer/signup" className="text-emerald-600 hover:underline">Create account</Link>
      </div>
    </AuthCard>
  );
}
