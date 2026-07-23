import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Edit3,
  Save,
  X,
  Shield,
  Calendar,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { useAuth } from "../../contexts/AuthContext";
import { profileSchema } from "../../validations/authSchema";
import { userService } from "../../services/userService";

const ProfilePage = () => {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    },
  });

  // Đổ dữ liệu từ Firestore vào form khi chuyển sang chế độ Edit hoặc khi data thay đổi
  useEffect(() => {
    if (userProfile) {
      reset({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
      });
    }
  }, [userProfile, reset]);

  const onSaveProfile = async (data) => {
    if (!currentUser) return;
    setIsSaving(true);
    try {
      await userService.updateUserProfile(currentUser.uid, data);
      await refreshProfile();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error("Lỗi khi cập nhật profile. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const isEmailVerified = currentUser?.emailVerified || false;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          {/* Avatar Container */}
          <div className="relative group">
            <img
              src={
                userProfile?.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.uid}`
              }
              alt="User Avatar"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-slate-950 border-2 border-indigo-500/40 p-1 object-cover shadow-xl shadow-indigo-500/10"
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-1.5 rounded-xl shadow-md border border-slate-900">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* User Info Header */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center sm:justify-start gap-3">
                  <span>
                    {userProfile?.firstName || userProfile?.lastName
                      ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
                      : userProfile?.username || "Thành viên"}
                  </span>
                </h1>
                <p className="text-sm font-medium text-indigo-400 mt-1">
                  @{userProfile?.username || currentUser?.email?.split("@")[0]}
                </p>
              </div>

              {/* Action Edit Button */}
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-sm font-semibold transition duration-200 shadow-md hover:shadow-indigo-500/10 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-indigo-400" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-sm font-semibold transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Hủy</span>
                </button>
              )}
            </div>

            {/* Email & Status Badge */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.email}</span>
              </div>

              {/* Trạng thái xác thực */}
              <div
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${
                  isEmailVerified
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                }`}
              >
                {isEmailVerified ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã xác thực Email</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Chưa xác thực Email</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Thông tin tài khoản</h2>
              <p className="text-xs text-slate-400">
                {isEditing ? "Chỉnh sửa thông tin cá nhân của bạn" : "Chi tiết thông tin cá nhân đã lưu"}
              </p>
            </div>
          </div>
        </div>

        {/* Display / Form Section */}
        {!isEditing ? (
          /* View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Họ và tên đệm
              </span>
              <p className="text-base font-semibold text-slate-100">
                {userProfile?.firstName || <span className="text-slate-600 font-normal italic">Chưa cập nhật</span>}
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Tên
              </span>
              <p className="text-base font-semibold text-slate-100">
                {userProfile?.lastName || <span className="text-slate-600 font-normal italic">Chưa cập nhật</span>}
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email
              </span>
              <p className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>{userProfile?.email || currentUser?.email}</span>
              </p>
            </div>

            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Số điện thoại
              </span>
              <p className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>{userProfile?.phone || <span className="text-slate-600 font-normal italic">Chưa cập nhật</span>}</span>
              </p>
            </div>

            <div className="md:col-span-2 space-y-1.5 p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Địa chỉ
              </span>
              <p className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{userProfile?.address || <span className="text-slate-600 font-normal italic">Chưa cập nhật</span>}</span>
              </p>
            </div>

            <div className="md:col-span-2 space-y-1.5 p-4 rounded-2xl bg-slate-950/20 border border-slate-900 opacity-70">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                User ID (UID)
              </span>
              <p className="text-xs font-mono text-slate-400 break-all">{currentUser?.uid}</p>
            </div>
          </div>
        ) : (
          /* Edit Mode Form */
          <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Họ và tên đệm */}
              <InputField
                label="Họ và tên đệm"
                placeholder="Nguyễn Văn"
                error={errors.firstName?.message}
                {...register("firstName")}
              />

              {/* Tên */}
              <InputField
                label="Tên"
                placeholder="An"
                error={errors.lastName?.message}
                {...register("lastName")}
              />

              {/* Email (Không cho sửa) */}
              <InputField
                label="Email (Không thể thay đổi)"
                value={currentUser?.email || ""}
                disabled
                icon={Mail}
              />

              {/* Số điện thoại */}
              <InputField
                label="Số điện thoại"
                placeholder="0987654321"
                icon={Phone}
                error={errors.phone?.message}
                {...register("phone")}
              />

              {/* Địa chỉ */}
              <div className="md:col-span-2">
                <InputField
                  label="Địa chỉ"
                  placeholder="123 Đường ABC, Quận 1, TP. Hồ Chí Minh"
                  icon={MapPin}
                  error={errors.address?.message}
                  {...register("address")}
                />
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition cursor-pointer"
              >
                Hủy
              </button>
              <Button type="submit" isLoading={isSaving} className="w-auto px-6">
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
