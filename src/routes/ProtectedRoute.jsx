import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2 } from "lucide-react";

/**
 * Route bảo mật: Chỉ dành cho các trang bắt buộc đăng nhập (ví dụ: Profile)
 * Nếu chưa đăng nhập -> Chuyển hướng sang /login
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-indigo-400">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-400">Đang tải thông tin xác thực...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
