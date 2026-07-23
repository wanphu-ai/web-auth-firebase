import { z } from "zod";

// Regex kiểm tra mật khẩu: Tối thiểu 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

// Schema Đăng ký (Register)
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email là bắt buộc" })
      .email({ message: "Invalid Email" }),
    password: z
      .string()
      .min(1, { message: "Mật khẩu là bắt buộc" })
      .regex(passwordRegex, {
        message: "Password is too weak (Cần ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt)",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Xác nhận mật khẩu là bắt buộc" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không trùng khớp",
    path: ["confirmPassword"],
  });

// Schema Đăng nhập (Login)
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email là bắt buộc" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Mật khẩu là bắt buộc" }),
});

// Schema Chỉnh sửa Profile (Edit Profile)
export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "Họ và tên đệm là bắt buộc" }),
  lastName: z.string().min(1, { message: "Tên là bắt buộc" }),
  phone: z
    .string()
    .min(1, { message: "Số điện thoại là bắt buộc" })
    .regex(/^[0-9+\s-]{9,15}$/, { message: "Số điện thoại không hợp lệ" }),
  address: z.string().min(1, { message: "Địa chỉ là bắt buộc" }),
});
