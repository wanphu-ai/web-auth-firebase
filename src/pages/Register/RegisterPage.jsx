import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { registerSchema } from "../../validations/authSchema";
import { authService } from "../../services/authService";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.register(data.email, data.password);
      toast.success("Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Top Glow Background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header / Logo */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 ring-8 ring-indigo-500/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Tạo tài khoản mới</h1>
          <p className="text-sm text-slate-400">Tham gia cùng chúng tôi chỉ với vài thao tác</p>
        </div>

        {/* Form Register */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Email */}
          <InputField
            label="Email"
            type="email"
            placeholder="example@domain.com"
            icon={Mail}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Input Password */}
          <InputField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={Lock}
            endIcon={showPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Input Confirm Password */}
          <InputField
            label="Xác nhận mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={Lock}
            endIcon={showConfirmPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Button Register */}
          <Button type="submit" isLoading={isLoading} className="mt-4">
            <UserPlus className="w-4 h-4" />
            <span>Đăng ký</span>
          </Button>
        </form>

        {/* Footer / Link Login */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-400">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
