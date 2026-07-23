import { describe, it, expect } from "vitest";
import { registerSchema, loginSchema, profileSchema } from "../src/validations/authSchema";

describe("Validation Schemas Testing (Kiểm tra dữ liệu đầu vào)", () => {

  describe("Register Schema Validation", () => {
    it("1. Báo lỗi khi để trống Email, Password, ConfirmPassword", () => {
      const result = registerSchema.safeParse({ email: "", password: "", confirmPassword: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.email).toContain("Email là bắt buộc");
        expect(errors.password).toContain("Mật khẩu là bắt buộc");
      }
    });

    it("2. Báo lỗi khi Email sai định dạng", () => {
      const result = registerSchema.safeParse({
        email: "emailsaidinhdang",
        password: "Password123!",
        confirmPassword: "Password123!",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toContain("Invalid Email");
      }
    });

    it("3. Báo lỗi khi Mật khẩu quá ngắn (< 8 ký tự)", () => {
      const result = registerSchema.safeParse({
        email: "test@example.com",
        password: "Pass1!",
        confirmPassword: "Pass1!",
      });
      expect(result.success).toBe(false);
    });

    it("4. Báo lỗi khi Mật khẩu thiếu chữ hoa hoặc ký tự đặc biệt", () => {
      const resultNoUpper = registerSchema.safeParse({
        email: "test@example.com",
        password: "password123!",
        confirmPassword: "password123!",
      });
      expect(resultNoUpper.success).toBe(false);

      const resultNoSpecial = registerSchema.safeParse({
        email: "test@example.com",
        password: "Password123",
        confirmPassword: "Password123",
      });
      expect(resultNoSpecial.success).toBe(false);
    });

    it("5. Báo lỗi khi Confirm Password không khớp", () => {
      const result = registerSchema.safeParse({
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "KhongKhopPassword123!",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.confirmPassword).toContain("Mật khẩu xác nhận không trùng khớp");
      }
    });

    it("6. Đăng ký hợp lệ đầy đủ các tiêu chuẩn", () => {
      const result = registerSchema.safeParse({
        email: "hople@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("Login Schema Validation", () => {
    it("1. Báo lỗi khi thiếu Email hoặc Password", () => {
      const result = loginSchema.safeParse({ email: "", password: "" });
      expect(result.success).toBe(false);
    });

    it("2. Đăng nhập hợp lệ", () => {
      const result = loginSchema.safeParse({ email: "user@example.com", password: "Password123!" });
      expect(result.success).toBe(true);
    });
  });

  describe("Profile Schema Validation", () => {
    it("1. Báo lỗi khi bỏ trống Họ, Tên, Số điện thoại hoặc Địa chỉ", () => {
      const result = profileSchema.safeParse({ firstName: "", lastName: "", phone: "", address: "" });
      expect(result.success).toBe(false);
    });

    it("2. Báo lỗi khi Số điện thoại sai định dạng", () => {
      const result = profileSchema.safeParse({
        firstName: "Nguyen",
        lastName: "An",
        phone: "abc123456",
        address: "123 Street",
      });
      expect(result.success).toBe(false);
    });

    it("3. Cập nhật Profile hợp lệ", () => {
      const result = profileSchema.safeParse({
        firstName: "Nguyễn Văn",
        lastName: "An",
        phone: "0987654321",
        address: "123 Đường ABC, Quận 1",
      });
      expect(result.success).toBe(true);
    });
  });
});
