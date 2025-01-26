import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigateTo = useNavigate();

  const { isLoggingIn, login, authUser } = useAuthStore();

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter a valid password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) return;

    const success = await login(formData);
    if (success) {
      // You can add navigation here if needed
      navigateTo("/");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-950 to-slate-900">
      {/* Left Side - Form */}
      <div className="flex flex-col p-6 sm:p-20 justify-center items-center relative">
        <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[2px] z-0" />
        <div className="relative z-10 w-full max-w-md space-y-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/30">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-900/30 transition-all duration-300 transform group-hover:scale-110">
                <MessageSquare className="size-8 text-cyan-400" />
              </div>
              <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-slate-400 text-lg">Sign in to your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-slate-300">
                  Email
                </span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-5 text-cyan-500/60" />
                </div>
                <input
                  type="email"
                  className="input w-full pl-11 bg-slate-900/50 backdrop-blur-sm border-slate-700/50 focus:border-cyan-500/50 transition-colors text-slate-200 placeholder:text-slate-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-slate-300">
                  Password
                </span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="size-5 text-cyan-500/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input w-full pl-11 bg-slate-900/50 backdrop-blur-sm border-slate-700/50 focus:border-cyan-500/50 transition-colors text-slate-200 placeholder:text-slate-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 transition-all duration-300 hover:scale-[1.02] font-semibold text-lg shadow-lg shadow-cyan-500/20"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-400 text-lg">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </div>
  );
};

export default Login;
