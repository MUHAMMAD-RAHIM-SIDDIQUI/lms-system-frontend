import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../components/AuthCard";
import Message from "../../components/Message";
import { studentSignup } from "../../api/studentApi";
import { getErrorMessage } from "../../api/axiosInstance";

export default function StudentSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  let waiting=(sec)=>{
   return new Promise((resolve)=>setTimeout((resolve),sec))
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await waiting(1000) 
   // backend expects multipart because of the profile image
    const data = new FormData();
    data.append("fullname", form.fullname);
    data.append("username", form.username);
    data.append("email", form.email);
    data.append("password", form.password);
    if (image) data.append("image", image);

    try {
      const res = await studentSignup(data);
      // this token is only for verifying the otp, not the real login token
      navigate("/student/login", {
        state: { tempToken: res.data.token, email: form.email },
      });  
      
    } catch (err) {
      setLoading(true)
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }  
   
    
  }

  return (
    <AuthCard title="Create student account" subtitle="We will email you an OTP to verify">
      <Message type="error" text={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="fullname" required placeholder="Full name" value={form.fullname} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="username" required placeholder="Username" value={form.username} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <input name="password" type="password" required placeholder="Password" value={form.password} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />

        <div>
          <label className="mb-1 block text-xs text-slate-500">Profile picture</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full text-sm" />
        </div>

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/student/login" className="text-indigo-600 hover:underline">Login</Link>
      </p>
    </AuthCard>
  );
}
