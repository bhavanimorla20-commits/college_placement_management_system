

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage({
  email,
  otp,
  onResetSuccess,
  onBackToLogin,
}: {
  email: string;
  otp: string;
  onResetSuccess: () => void;
  onBackToLogin: () => void;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  // Eye icon states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "`${import.meta.env.VITE_API_URL}/reset-password`",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Password reset failed");
        return;
      }

      setMessage("Password reset successfully!");

      setTimeout(() => {
        onResetSuccess();
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <form
        onSubmit={handleResetPassword}
        className="w-full max-w-md space-y-5 rounded-xl border border-[#0B1F3A]/20 bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0B1F3A]">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your new password
          </p>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 pr-12 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#0B1F3A]"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 pr-12 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#0B1F3A]"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Reset Password Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#F97316] p-3 font-semibold text-white transition hover:bg-[#EA580C]"
        >
          Reset Password
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm font-medium text-[#0B1F3A]">
            {message}
          </p>
        )}

        {/* Back to Login */}
        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full text-sm font-medium text-[#0B1F3A] hover:text-[#F97316]"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}