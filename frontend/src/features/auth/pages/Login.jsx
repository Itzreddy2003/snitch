import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "../hooks/auth.hook.js";
import GoogleButton from "../components/GoogleButton.jsx";


const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(formData.email, formData.password);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Reduced & Compact Card Container */}
      <div className="w-full max-w-3xl grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-black">
        {/* Left Side: Minimal Guy Editorial Image Panel */}
        <div className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-6 bg-zinc-900/50 overflow-hidden border-r border-zinc-800/60">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('/male_model_bg.png')` }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))",
            }}
          />

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-sm">
                S
              </div>
              <span className="font-black tracking-widest text-lg text-white">
                SNITCH<span className="text-yellow-400">.</span>
              </span>
            </Link>
          </div>

          {/* Bottom Minimal Info */}
          <div className="relative z-10 space-y-1">
            <p className="text-xs uppercase tracking-widest text-yellow-400 font-bold">
              SS26 Collection
            </p>
            <h2 className="text-xl font-black text-white leading-tight">
              Minimal Luxury & Streetwear
            </h2>
          </div>
        </div>

        {/* Right Side: Compact Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-zinc-950">
          {/* Top Header */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="inline-flex items-center gap-2 lg:hidden">
                <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-sm">
                  S
                </div>
                <span className="font-black tracking-widest text-base text-white">
                  SNITCH<span className="text-yellow-400">.</span>
                </span>
              </Link>

              <div className="text-xs text-zinc-400 ml-auto">
                No account?{" "}
                <Link
                  to="/register"
                  className="text-yellow-400 font-bold hover:underline"
                >
                  Register
                </Link>
              </div>
            </div>

            <div className="mb-5 space-y-1">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Sign In
              </h1>
              <p className="text-xs text-zinc-400">
                Access your account & wishlist
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-9 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                <>
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </>
              </button>

              {/* Divider */}
              <div className="relative my-3 text-center text-xs">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800/80"></div>
                </div>
                <span className="relative bg-zinc-950 px-2.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                  Or
                </span>
              </div>

              {/* Continue with Google Button */}
              <GoogleButton />
            </form>
          </div>

          {/* Footer */}
          <div className="pt-4 mt-4 border-t border-zinc-900 text-center text-[10px] text-zinc-600">
            &copy; {new Date().getFullYear()} SNITCH Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
