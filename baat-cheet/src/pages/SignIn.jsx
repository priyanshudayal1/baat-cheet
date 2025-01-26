import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signUp } = useAuthStore();

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[A-Za-z\s]{3,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!formData.fullName || !namePattern.test(formData.fullName)) {
      toast.error("Please enter a valid name (min 3 characters, letters only)");
      return false;
    }
    if (!formData.email || !emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password || !passwordPattern.test(formData.password)) {
      toast.error(
        "Password must be at least 8 characters with letters and numbers"
      );
      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isValidated = validateForm();
    if (!isValidated) return;
    signUp(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-slate-950 to-slate-900">
      {/* left side */}
      <div className="flex flex-col justify-center p-6 sm:p-20 items-center relative">
        <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-[2px] z-0" />
        <div className="relative z-10 w-full max-w-md space-y-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/30">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-900/30 transition-all duration-300 transform group-hover:scale-110">
                <MessageSquare className="size-8 text-cyan-400" />
              </div>
              <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-slate-400 text-lg">
                Get started with your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Input fields with enhanced styling */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="size-5 text-cyan-500/60" />
                </div>
                <input
                  type="text"
                  className="input w-full pl-11 bg-slate-900/50 backdrop-blur-sm border-slate-700/50 focus:border-cyan-500/50 transition-colors text-slate-200 placeholder:text-slate-500"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative transition-all duration-300 focus-within:scale-[1.02]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-5 text-cyan-500/60" />
                </div>
                <input
                  type="email"
                  className="input w-full pl-11 bg-slate-900/50 backdrop-blur-sm border-slate-700/50 focus:border-cyan-500/50 transition-colors text-slate-200 placeholder:text-slate-500"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
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
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 transition-all duration-300 hover:scale-[1.02] font-semibold text-lg shadow-lg shadow-cyan-500/20"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <div className="flex flex-row gap-2 items-center justify-center text-white">
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                  </div>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center">
            <p className="text-slate-400 text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400  hover:text-cyan-300 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side decorative section */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 z-0" />
        <div className="absolute inset-0 backdrop-blur-3xl z-10" />
        <div className="absolute -inset-x-40 inset-y-0 z-20">
          <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
          />
          <div className="absolute top-1/4 -left-24 size-96 rounded-full bg-cyan-600/20 blur-3xl animate-pulse z-0" />
          <div className="absolute top-1/2 -right-24 size-96 rounded-full bg-blue-600/20 blur-3xl animate-pulse delay-1000 z-0" />
        </div>
        <div className="absolute inset-0 bg-grid-slate-800/[0.04] z-30" />
      </div>
    </div>
  );
};

export default SignIn;
