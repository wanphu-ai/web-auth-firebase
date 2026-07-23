import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { userService } from "./userService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrorMessages";

/**
 * Dịch vụ xử lý Firebase Authentication
 */
export const authService = {
  /**
   * Đăng ký tài khoản người dùng mới
   */
  register: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Sau khi tạo tài khoản Auth, tự động lưu thông tin user vào Firestore database
      await userService.createUserProfile(user);

      return user;
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      throw new Error(message);
    }
  },

  /**
   * Đăng nhập người dùng bằng Email & Mật khẩu
   */
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      throw new Error(message);
    }
  },

  /**
   * Đăng xuất hệ thống
   */
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Lỗi khi đăng xuất. Vui lòng thử lại.");
    }
  },

  /**
   * Gửi email khôi phục mật khẩu
   */
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      const message = getFirebaseErrorMessage(error.code);
      throw new Error(message);
    }
  },
};
