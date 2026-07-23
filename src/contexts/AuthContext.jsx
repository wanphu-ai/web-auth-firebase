import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { userService } from "../services/userService";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy lại thông tin Profile mới nhất từ Firestore
  const fetchUserProfile = async (uid) => {
    try {
      if (!uid) {
        setUserProfile(null);
        return;
      }
      const profile = await userService.getUserProfile(uid);
      setUserProfile(profile);
    } catch (err) {
      console.error("Lỗi khi tải thông tin user profile:", err);
    }
  };

  useEffect(() => {
    // Lắng nghe trạng thái đăng nhập của Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const refreshProfile = async () => {
    if (currentUser) {
      await fetchUserProfile(currentUser.uid);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    logout,
    refreshProfile,
    setUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
};
