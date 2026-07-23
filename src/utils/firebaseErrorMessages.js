/**
 * Chuyển đổi mã lỗi từ Firebase Auth sang thông báo thân thiện với người dùng
 */
export const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid Email";
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Wrong password";
    case "auth/email-already-in-use":
      return "Email already exists";
    case "auth/weak-password":
      return "Password is too weak";
    case "auth/too-many-requests":
      return "Quá nhiều thao tác không hợp lệ. Vui lòng thử lại sau.";
    case "auth/network-request-failed":
      return "Lỗi kết nối mạng. Vui lòng kiểm tra lại Internet.";
    default:
      return "Unknown error";
  }
};
