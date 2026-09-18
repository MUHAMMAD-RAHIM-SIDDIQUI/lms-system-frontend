import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import Message from "../../components/Message";
import { trainerVerifyOtp } from "../../api/trainerApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function TrainerVerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  // token comes from the signup page through router state
  const tempToken = location.state?.tempToken;
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!tempToken) {
      setError("Your verification session expired. Please sign up or login again to get a new OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await trainerVerifyOtp(otp, tempToken);
      setSuccess(res.data.message || "Account verified, please login");
      setTimeout(() => navigate("/trainer/login"), 1500);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Verify your email" subtitle={email ? `We sent a code to ${email}` : "Enter the code we emailed you"}>
      <Message type="error" text={error} />
      <Message type="success" text={success} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input required placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-center text-lg tracking-widest" />
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-60">
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        <Link to="/trainer/login" className="text-emerald-600 hover:underline">Back to login</Link>
      </p>
    </AuthCard>
  );
}
