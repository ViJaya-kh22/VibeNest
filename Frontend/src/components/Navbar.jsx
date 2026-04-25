import { Link } from "react-router-dom"
import { useAuth } from "./context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const initials = user?.username
    ?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className='flex w-full bg-black h-16 justify-between items-center px-4 md:px-8 fixed z-50 border-b border-zinc-800'>
      
      {/* Logo */}
      <Link to="/" className='flex items-center gap-2'>
        <img className='h-8' src="/Logo_Black.png" alt="Logo" />
        <span className='text-lg font-bold hidden sm:block'>VibeNest</span>
      </Link>

      {/* Right side */}
      {user ? (
        <div className="flex items-center gap-3">

          <Link to="/profile">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0
              ${user.role === "artist"
                ? "bg-gradient-to-br from-green-500 to-emerald-700"
                : "bg-gradient-to-br from-purple-500 to-pink-600"
              }`}>
              {initials}
            </div>
          </Link>
          <button
            onClick={logout}
            className="text-sm text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-white text-black text-sm font-bold px-4 py-2 rounded-lg hover:bg-zinc-200 transition"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;