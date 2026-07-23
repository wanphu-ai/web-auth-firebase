import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { loginSchema } from "../../validations/authSchema";
import { authService } from "../../services/authService";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await authService.login(data.email, data.password);
      toast.success("Đăng nhập thành công!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      toast.error("Vui lòng nhập Email để khôi phục mật khẩu");
      return;
    }
    try {
      await authService.resetPassword(email);
      toast.success("Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800/80 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header / Logo */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30 ring-8 ring-indigo-500/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Chào mừng trở lại!</h1>
          <p className="text-sm text-slate-400">Đăng nhập tài khoản của bạn để tiếp tục</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Input Email */}
          <InputField
            label="Email"
            type="email"
            placeholder="example@domain.com"
            icon={Mail}
            error={errors.email?.message}
            {...register("email")}
          />

          {/* Input Password & Show/Hide */}
          <div>
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
            {/* Quên mật khẩu link */}
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => {
                  const emailInput = document.querySelector('input[type="email"]')?.value;
                  handleForgotPassword(emailInput);
                }}
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition focus:outline-none"
              >
                Quên mật khẩu?
              </button>
            </div>
          </div>

          {/* Button Submit */}
          <Button type="submit" isLoading={isLoading} className="mt-2">
            <span>Đăng nhập</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Footer / Link Register */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-400">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition inline-flex items-center gap-1 hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
