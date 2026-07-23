import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

/**
 * Reusable Input Field component tích hợp React Hook Form và hiển thị thông báo lỗi
 */
const InputField = forwardRef(
  (
    {
      label,
      type = "text",
      error,
      icon: Icon,
      endIcon: EndIcon,
      onEndIconClick,
      disabled = false,
      placeholder = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            className={`w-full py-3 px-4 ${
              Icon ? "pl-11" : "pl-4"
            } ${EndIcon ? "pr-11" : "pr-4"} 
            bg-slate-900/60 border text-slate-100 placeholder-slate-500 rounded-xl text-sm transition duration-200 
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
            ${
              error
                ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/30"
                : "border-slate-800 focus:border-indigo-500 hover:border-slate-700"
            }
            ${disabled ? "bg-slate-950/80 cursor-not-allowed opacity-60 text-slate-400" : ""}`}
            {...props}
          />
          {EndIcon && (
            <button
              type="button"
              onClick={onEndIconClick}
              tabIndex={-1}
              className="absolute right-3.5 text-slate-400 hover:text-slate-200 transition focus:outline-none"
            >
              <EndIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-medium pt-0.5 animate-fadeIn">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
