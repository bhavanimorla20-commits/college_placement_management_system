import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage({
  onLogin,
  onForgotPassword,
}: {
  onLogin: (role: string) => void;
  onForgotPassword: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.detail || "Invalid email or password"
        );
        return;
      }

      // Save logged-in user details
      localStorage.setItem(
        "user",
        JSON.stringify({
          user_id: data.user_id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      console.log("Login response:", data);

      setMessage("Login successful!");

      // Notify parent component
      onLogin(data.role);

      // Redirect based on role
      if (data.role === "student") {
        window.location.href = "/student-dashboard";
        return;
      }

      if (data.role === "admin") {
        window.location.href = "/admin-dashboard";
        return;
      }

      if (data.role === "recruiter") {
        window.location.href = "/recruiter-dashboard";
        return;
      }

      if (data.role === "tpo") {
        window.location.href = "/tpo-dashboard";
        return;
      }
    } catch (error) {
      console.error("Login error:", error);

      setMessage(
        "Backend connection failed. Please make sure the backend is running."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-xl border border-[#0B1F3A]/20 bg-white p-8 shadow-lg"
      >
        {/* Heading */}
        <h1 className="text-center text-3xl font-bold text-[#0B1F3A]">
          Login
        </h1>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-[#0B1F3A]">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
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
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-lg border border-[#0B1F3A]/30 p-3 pr-12 outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0B1F3A]"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot Password */}
        <button
          type="button"
          onClick={onForgotPassword}
          className="w-full text-right text-sm font-medium text-[#0B1F3A] hover:text-[#F97316]"
        >
          Forgot Password?
        </button>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-[#F97316] p-3 font-semibold text-white transition hover:bg-[#EA580C]"
        >
          Login
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center font-medium ${
              message === "Login successful!"
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