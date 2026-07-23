import React from "react";
import { ShieldCheck, LogOut, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Đã đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      toast.error("Lỗi khi đăng xuất");
    }
  };

  return (
    <nav className="w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent">
            AuthHub
          </span>
        </Link>

        {/* Right Section */}
        {currentUser ? (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition"
            >
              <img
                src={
                  userProfile?.avatar ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.uid}`
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 object-cover"
              />
              <span className="text-sm font-medium text-slate-200 hidden sm:inline-block">
                {userProfile?.username || currentUser.email?.split("@")[0]}
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-400 bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-lg hover:border-rose-500/30 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng xuất</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-300 hover:text-white px-3 py-1.5 transition"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition shadow-md shadow-indigo-600/20"
            >
              Đăng ký ngay
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
