import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Component Button dùng chung với hiệu ứng gradient, loading spinner
 */
const Button = ({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "w-full py-3 px-5 rounded-xl font-semibold text-sm transition duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white focus:ring-indigo-500 shadow-indigo-600/20 hover:shadow-indigo-600/30",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 focus:ring-slate-500 shadow-slate-900/40",
    outline:
      "bg-transparent border border-indigo-500/50 hover:border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 focus:ring-indigo-500",
    danger:
      "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white focus:ring-rose-500 shadow-rose-600/20",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
