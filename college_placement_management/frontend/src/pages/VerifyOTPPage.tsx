import { useState } from "react";

export default function VerifyOTPPage({
  email,
  onVerify,
  onBack,
}: {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

 const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");

  try {
    const response = await fetch(
      "`${import.meta.env.VITE_API_URL}/verify-otp`",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.detail || "Invalid OTP");
      return;
    }

    setMessage("OTP verified successfully");

    onVerify(otp);
  } catch (error) {
    console.error(error);
    setMessage("Backend connection failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-md space-y-5 rounded-xl border border-[#0B1F3A]/20 bg-white p-8 shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0B1F3A]">
            Verify OTP
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter the 6-digit OTP sent to
          </p>

          <p className="mt-1 font-medium text-[#0B1F3A]">
            {email}
          </p>
        </div>

        {/* OTP */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            OTP
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setOtp(value);
            }}
            className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 text-center text-lg tracking-[0.4em] outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            required
          />
        </div>

        {/* Verify button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#F97316] p-3 font-semibold text-white transition hover:bg-[#EA580C]"
        >
          Verify OTP
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message === "OTP verified successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          className="w-full text-sm font-medium text-[#0B1F3A] hover:text-[#F97316]"
        >
          Back to Forgot Password
        </button>
      </form>
    </div>
  );
}