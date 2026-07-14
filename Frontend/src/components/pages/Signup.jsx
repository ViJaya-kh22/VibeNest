import { useState } from "react";
import api from "../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const {login, loading ,setLoading} = useAuth();



  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",      
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await api.post("/auth/register", form);
       
      login(res.data.user);

      toast.success("User registered!");

      navigate("/")

    } catch (err) {
      console.log(err);
    }finally{
      setLoading(false)
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
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-zinc-100 tracking-tight">VibeNest</span>
          </div>
          <p className="text-xs text-zinc-500">create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">


          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium" >
              Username
            </label>
            <input
              name="username"
              placeholder="Enter name"
              onChange={handleChange}
              className="bg-[#1a1a1f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium" >
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@gmail.com"
              onChange={handleChange}
              className="bg-[#1a1a1f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium" >
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="bg-[#1a1a1f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          {/* Role selector — replaced radio buttons with styled toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium" >
              I am a
            </label>
            <div className="flex gap-2">
              {["user", "artist"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-all capitalize
                    ${form.role === r
                      ? "bg-violet-950 border-violet-500 text-violet-300"
                      : "bg-[#1a1a1f] border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-1 w-full bg-violet-600 hover:bg-violet-500 text-white rounded-lg py-3 text-sm font-medium transition-colors"
          >
           {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-400 hover:text-violet-300">
           Login 
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;