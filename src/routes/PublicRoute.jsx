import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Public Route: Dành cho các trang như Login / Register
 * Nếu đã đăng nhập -> Chuyển hướng thẳng sang /profile
 */
const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-indigo-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Đang tải ứng dụng...</p>
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PublicRoute;
