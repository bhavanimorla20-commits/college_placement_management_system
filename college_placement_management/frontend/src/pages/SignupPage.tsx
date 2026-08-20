import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage({
  onSignup,
}: {
  onSignup: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Check password match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Check Terms and Privacy
    if (!agreeTerms) {
      setMessage(
        "Please agree to the Terms of Service and Privacy Policy"
      );
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Signup failed");
        return;
      }

      setMessage("Account created successfully!");

      console.log("Signup response:", data);

      setTimeout(() => {
        onSignup();
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Backend connection failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-8">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md space-y-5 rounded-xl border border-[#0B1F3A]/20 bg-white p-8 shadow-lg"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0B1F3A]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join the College Placement Management System
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 pr-12 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B1F3A]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B1F3A]"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[#F97316]"
          />

          <p className="text-sm text-slate-600">
            I agree to the{" "}
            <span className="font-medium text-[#0B1F3A]">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-[#0B1F3A]">
              Privacy Policy
            </span>
          </p>
        </div>

        {/* Create Account */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#F97316] p-3 font-semibold text-white transition hover:bg-[#EA580C]"
        >
          Create Account
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message === "Account created successfully!"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}