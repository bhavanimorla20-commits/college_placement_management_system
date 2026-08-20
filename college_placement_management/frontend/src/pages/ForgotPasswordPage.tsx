import { useState } from "react";

export default function ForgotPasswordPage({
  onBackToLogin,
  onOtpSent,
}: {
  onBackToLogin: () => void;
  onOtpSent: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Failed to generate OTP");
        return;
      }

      setMessage("OTP sent successfully!");

      console.log("Forgot password response:", data);

      // Go to Verify OTP page
      setTimeout(() => {
        onOtpSent(email);
      }, 800);
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <form
        onSubmit={handleForgotPassword}
        className="w-full max-w-md space-y-5 rounded-xl border border-[#0B1F3A]/20 bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0B1F3A]">
            Forgot Password
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your email to receive an OTP
          </p>
        </div>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
          required
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-[#F97316] p-3 font-semibold text-white transition hover:bg-[#EA580C]"
        >
          Send OTP
        </button>

        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message === "OTP sent successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

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