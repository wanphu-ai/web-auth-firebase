import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Dịch vụ xử lý Firestore dữ liệu người dùng
 */
export const userService = {
  /**
   * Tạo thông tin user mới trong Firestore khi Đăng ký
   */
  createUserProfile: async (user, additionalData = {}) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);

    // Tách email lấy username mặc định nếu chưa có
    const defaultUsername = user.email ? user.email.split("@")[0] : "user";

    const userData = {
      uid: user.uid,
      email: user.email || "",
      username: additionalData.username || defaultUsername,
      avatar: additionalData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
      firstName: additionalData.firstName || "",
      lastName: additionalData.lastName || "",
      phone: additionalData.phone || "",
      address: additionalData.address || "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(userRef, userData);
    return userData;
  },

  /**
   * Lấy profile người dùng từ Firestore theo UID
   */
  getUserProfile: async (uid) => {
    if (!uid) return null;
    const userRef = doc(db, "users", uid);
    const snapDoc = await getDoc(userRef);

    if (snapDoc.exists()) {
      return snapDoc.data();
    }
    return null;
  },

  /**
   * Cập nhật thông tin profile người dùng trong Firestore
   */
  updateUserProfile: async (uid, updateData) => {
    if (!uid) throw new Error("Vui lòng cung cấp UID người dùng");
    const userRef = doc(db, "users", uid);

    const payload = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      phone: updateData.phone,
      address: updateData.address,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(userRef, payload);
    return payload;
  },
};
