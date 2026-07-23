import { describe, it, expect } from "vitest";
import { getFirebaseErrorMessage } from "../src/utils/firebaseErrorMessages";

describe("Firebase Error Mapping Testing (Kiểm tra phản hồi lỗi)", () => {

  it("1. Trả về 'Invalid Email' khi lỗi auth/invalid-email", () => {
    expect(getFirebaseErrorMessage("auth/invalid-email")).toBe("Invalid Email");
  });

  it("2. Trả về 'User not found' khi lỗi auth/user-not-found", () => {
    expect(getFirebaseErrorMessage("auth/user-not-found")).toBe("User not found");
  });

  it("3. Trả về 'Wrong password' khi sai mật khẩu", () => {
    expect(getFirebaseErrorMessage("auth/wrong-password")).toBe("Wrong password");
    expect(getFirebaseErrorMessage("auth/invalid-credential")).toBe("Wrong password");
  });

  it("4. Trả về 'Email already exists' khi trùng email", () => {
    expect(getFirebaseErrorMessage("auth/email-already-in-use")).toBe("Email already exists");
  });

  it("5. Trả về 'Password is too weak' khi mật khẩu yếu", () => {
    expect(getFirebaseErrorMessage("auth/weak-password")).toBe("Password is too weak");
  });

  it("6. Trả về 'Unknown error' đối với các lỗi không xác định", () => {
    expect(getFirebaseErrorMessage("auth/some-unknown-error")).toBe("Unknown error");
  });
});
