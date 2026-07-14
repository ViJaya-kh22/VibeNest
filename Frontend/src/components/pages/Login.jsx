import { useState } from "react";
import api from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const {login} = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);


      login(res.data.user, res.data.token);

      localStorage.setItem("token", res.data.token);

      toast.success("Welcome back!");

      navigate("/");
    } catch (err) {

      toast.error(err.response?.data?.message || "Invalid credentials");

      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0d0d0f]">
      <div className="w-[340px] bg-[#111114] border border-white/10 rounded-2xl p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 flex items-center justify-center">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-zinc-100 tracking-tight">VibeNest</span>
          </div>
          <p className="text-xs text-zinc-500">welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
              className="bg-[#1a1a1f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium">
                Password
              </label>

            </div>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="bg-[#1a1a1f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg py-3 text-sm font-medium transition-colors"
          >
            {loading ? "Loging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-violet-400 hover:text-violet-300">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;