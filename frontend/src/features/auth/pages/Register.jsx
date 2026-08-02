import { useState } from "react";
import { Link } from "react-router";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  Store,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../hooks/auth.hook.js";
import GoogleButton from "../components/GoogleButton.jsx";

const Register = () => {
  const { handleRegister } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    role: "buyer",
    password: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(
      formData.email,
      formData.fullName,
      formData.contact,
      formData.password,
      formData.role === "seller",
    );
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 sm:p-6 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Reduced & Compact Card Container */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-zinc-800/80 bg-zinc-950 overflow-hidden shadow-2xl shadow-black">
        {/* Left Side: Guy Editorial Image Panel */}
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
              Join SNITCH
            </p>
            <h2 className="text-xl font-black text-white leading-tight">
              Curated Luxury & Minimalist Drops
            </h2>
          </div>
        </div>

        {/* Right Side: Compact Register Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-zinc-950">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <Link to="/" className="inline-flex items-center gap-2 lg:hidden">
                <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-sm">
                  S
                </div>
                <span className="font-black tracking-widest text-base text-white">
                  SNITCH<span className="text-yellow-400">.</span>
                </span>
              </Link>

              <div className="text-xs text-zinc-400 ml-auto">
                Have an account?{" "}
                <Link
                  to="/login"
                  className="text-yellow-400 font-bold hover:underline"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="mb-4 space-y-0.5">
              <h1 className="text-2xl font-black text-white tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-zinc-400">Join SNITCH Marketplace</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Account Role Selector */}
              <div className="grid grid-cols-2 gap-2">
                <div
                  onClick={() => handleRoleSelect("buyer")}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                    formData.role === "buyer"
                      ? "bg-yellow-400/10 border-yellow-400 text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <ShoppingBag
                    size={15}
                    className={
                      formData.role === "buyer"
                        ? "text-yellow-400"
                        : "text-zinc-400"
                    }
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Buyer</div>
                    <div className="text-[10px] text-zinc-500">
                      Shop & track
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => handleRoleSelect("seller")}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2.5 ${
                    formData.role === "seller"
                      ? "bg-yellow-400/10 border-yellow-400 text-white"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <Store
                    size={15}
                    className={
                      formData.role === "seller"
                        ? "text-yellow-400"
                        : "text-zinc-400"
                    }
                  />
                  <div>
                    <div className="text-xs font-bold text-white">Seller</div>
                    <div className="text-[10px] text-zinc-500">Sell & earn</div>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <User size={16} />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Alex Morgan"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
              </div>

              {/* Email & Contact in 2 Cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block">
                    Contact Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="+1 555 000 0000"
                      required
                      className="w-full pl-9 pr-3 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
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
                    className="w-full pl-9 pr-8 py-2 bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="w-3.5 h-3.5 rounded bg-zinc-900 border-zinc-800 text-yellow-400 focus:ring-yellow-400 accent-yellow-400 cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-yellow-400 hover:underline font-semibold"
                    >
                      Terms
                    </a>{" "}
                    &{" "}
                    <a
                      href="#"
                      className="text-yellow-400 hover:underline font-semibold"
                    >
                      Privacy Policy
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded-lg shadow transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                <span>
                  Create{" "}
                  {formData.role === "seller" ? "Seller" : "Buyer"}{" "}
                  Account
                </span>
                <ArrowRight size={14} />
              </button>

              {/* Divider */}
              <div className="relative my-2.5 text-center text-xs">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800/80"></div>
                </div>
                <span className="relative bg-zinc-950 px-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                  Or
                </span>
              </div>

              {/* Continue with Google Button */}
              <GoogleButton />
            </form>
          </div>

          <div className="pt-3 mt-3 border-t border-zinc-900 text-center text-[10px] text-zinc-600">
            &copy; {new Date().getFullYear()} SNITCH Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
