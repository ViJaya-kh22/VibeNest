import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
import { Cross } from "lucide-react";

const AuthModal = ({ onClose }) => {
  const { login, register } = useAuth();
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md mx-4 p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          {tab === "login" ? "Welcome back" : "Join VibeNest"}
        </h2>

        {/* Tabs */}
        <div className="flex bg-zinc-800 rounded-xl p-1 mb-6">
          {["login", "register"].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition ${
                tab === t
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {tab === "register" && (
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 transition"
            />
          )}

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 transition"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-zinc-500 transition"
          />

          {tab === "register" && (
            <div className="flex gap-3">
              {["user", "artist"].map((r) => (
                <button
                  key={r}
                  onClick={() => setForm({ ...form, role: r })}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize border transition ${
                    form.role === r
                      ? r === "artist"
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-white border-white text-black"
                      : "border-zinc-700 text-zinc-400 hover:text-white"
                  }`}
                >
                  {r === "artist" ? "🎵 Artist" : "🎧 Listener"}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition disabled:opacity-50 mt-2"
          >
            {loading ? "Please wait..." : tab === "login" ? "Log In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;