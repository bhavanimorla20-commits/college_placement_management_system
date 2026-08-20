import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import StudentDashboardPage from "./pages/student/StudentDashboardPage";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and OTP passed between pages
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <LandingPage
            onLogin={() => navigate("/login")}
            onSignup={() => navigate("/signup")}
          />
        }
      />

      {/* Login */}
      <Route
        path="/login"
        element={
          <LoginPage
            onLogin={(role) => {
              if (role === "admin") {
                navigate("/admin-dashboard");
              } else if (role === "student") {
                navigate("/student-dashboard");
              } else {
                navigate("/dashboard");
              }
            }}
            onForgotPassword={() => navigate("/forgot-password")}
          />
        }
      />

      {/* Signup */}
      <Route
        path="/signup"
        element={
          <SignupPage
            onSignup={() => navigate("/login")}
          />
        }
      />

      {/* Forgot Password */}
      <Route
        path="/forgot-password"
        element={
          <ForgotPasswordPage
            onBackToLogin={() => navigate("/login")}
            onOtpSent={(email) => {
              navigate("/verify-otp", {
                state: { email },
              });
            }}
          />
        }
      />

      {/* Verify OTP */}
      <Route
        path="/verify-otp"
        element={
          email ? (
            <VerifyOTPPage
              email={email}
              onVerify={(otp) => {
                navigate("/reset-password", {
                  state: {
                    email,
                    otp,
                  },
                });
              }}
              onBack={() =>
                navigate("/forgot-password")
              }
            />
          ) : (
            <Navigate
              to="/forgot-password"
              replace
            />
          )
        }
      />

      {/* Reset Password */}
      <Route
        path="/reset-password"
        element={
          email && otp ? (
            <ResetPasswordPage
              email={email}
              otp={otp}
              onResetSuccess={() =>
                navigate("/login")
              }
              onBackToLogin={() =>
                navigate("/login")
              }
            />
          ) : (
            <Navigate
              to="/forgot-password"
              replace
            />
          )
        }
      />

      {/* General Dashboard */}
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      {/* Admin Dashboard */}
      <Route
        path="/admin-dashboard"
        element={<AdminDashboardPage />}
      />

      {/* Student Dashboard */}
      <Route
        path="/student-dashboard"
        element={<StudentDashboardPage />}
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;