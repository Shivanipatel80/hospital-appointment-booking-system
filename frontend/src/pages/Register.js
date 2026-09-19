import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Sirf Patient Register hoga
      await API.post("/auth/register", {
        name,
        email,
        password,
        role: "patient",
      });

      // Auto Login
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registered Successfully!");

      navigate("/patient");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-8 sm:px-6">

      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />


      {/* Register Card */}
      <div className="relative w-full max-w-md">

        <div className="bg-slate-900/90 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 backdrop-blur-md">

          {/* Logo */}
          <div className="text-center mb-7 sm:mb-8">

            <div className="flex justify-center mb-4">

              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <FaUserPlus className="text-white text-2xl sm:text-3xl" />
              </div>

            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Medi<span className="text-blue-400">Care</span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Create your patient account
            </p>

          </div>


          {/* Heading */}
          <div className="mb-6">

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Create Patient Account
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Join MediCare and manage your healthcare easily.
            </p>

          </div>


          {/* Name */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>


          {/* Email */}
          <div className="mb-4">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>


          {/* Password */}
          <div className="mb-6">

            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>


          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold transition shadow-lg shadow-blue-600/20"
          >
            Create Account
          </button>


          {/* Login Link */}
          <p className="text-center mt-6 text-sm sm:text-base text-slate-400">

            Already have an account?{" "}

            <button
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              Login
            </button>

          </p>


          {/* Bottom Text */}
          <div className="mt-7 pt-5 border-t border-white/10 text-center">

            <p className="text-xs text-slate-500">
              🔒 Your information is protected and secure.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;