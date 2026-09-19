import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUserMd,
  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Login API
      const res = await API.post("/auth/login", {
        email,
        password,
        role,
      });

      // Save login data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Success message
      setSuccess("Login Successful!");

      // Redirect
      setTimeout(() => {
        if (res.data.user.role === "doctor") {
          navigate("/doctor");
        } else if (res.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/patient");
        }
      }, 1000);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070d24] text-white flex items-center justify-center px-3 sm:px-5 md:px-8 py-5 sm:py-8 overflow-x-hidden">

      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full max-w-6xl min-h-[600px] lg:min-h-[650px] rounded-2xl sm:rounded-3xl overflow-hidden border border-blue-400/10 shadow-2xl bg-[#0d1530] flex flex-col lg:flex-row">

        {/* ========================================================= */}
        {/* LEFT SIDE */}
        {/* Desktop / Laptop only */}
        {/* ========================================================= */}

        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0b1433] via-[#14245a] to-[#070d24] p-8 xl:p-12 flex-col justify-between">

          {/* Background Glow */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />

          {/* ================= LOGO ================= */}
          <div className="relative z-10">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 xl:w-12 xl:h-12 rounded-xl xl:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-xl xl:text-2xl shadow-lg shadow-blue-600/20">
                🏥
              </div>

              <div>
                <h1 className="text-xl xl:text-2xl font-bold">
                  MediCare
                </h1>

                <p className="text-xs xl:text-sm text-blue-300">
                  Healthcare Appointment System
                </p>
              </div>

            </div>

          </div>

          {/* ================= LEFT CONTENT ================= */}
          <div className="relative z-10">

            <p className="text-blue-400 text-xs xl:text-sm font-semibold tracking-wide mb-3">
              YOUR HEALTH, OUR PRIORITY
            </p>

            <h2 className="text-4xl xl:text-5xl font-bold leading-tight mb-5">
              Quality Healthcare
              <br />

              <span className="text-blue-400">
                Made Simple.
              </span>
            </h2>

            <p className="text-gray-400 text-sm xl:text-base leading-7 max-w-md">
              Book appointments with trusted doctors quickly and easily.
              Manage your appointments and get the healthcare you deserve.
            </p>

            {/* ================= FEATURES ================= */}
            <div className="mt-7 xl:mt-8 space-y-4">

              {/* Feature 1 */}
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                  <FaUserMd />
                </div>

                <div>
                  <p className="font-semibold text-sm xl:text-base">
                    Trusted Doctors
                  </p>

                  <p className="text-xs xl:text-sm text-gray-500">
                    Find doctors by specialization
                  </p>
                </div>

              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                  <FaCalendarCheck />
                </div>

                <div>
                  <p className="font-semibold text-sm xl:text-base">
                    Easy Booking
                  </p>

                  <p className="text-xs xl:text-sm text-gray-500">
                    Schedule appointments easily
                  </p>
                </div>

              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shrink-0">
                  <FaShieldAlt />
                </div>

                <div>
                  <p className="font-semibold text-sm xl:text-base">
                    Secure & Reliable
                  </p>

                  <p className="text-xs xl:text-sm text-gray-500">
                    Your information stays protected
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ================= FOOTER ================= */}
          <p className="relative z-10 text-xs text-gray-500">
            © 2026 MediCare. Healthcare Appointment System.
          </p>

        </div>

        {/* ========================================================= */}
        {/* RIGHT SIDE - LOGIN */}
        {/* ========================================================= */}

        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-10 xl:px-14 bg-[#0d1530]">

          <div className="w-full max-w-md">

            {/* ================= MOBILE / TABLET LOGO ================= */}
            <div className="flex lg:hidden items-center justify-center gap-3 mb-8">

              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-blue-600/20">
                🏥
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  MediCare
                </h1>

                <p className="text-xs sm:text-sm text-blue-300">
                  Healthcare Appointment System
                </p>
              </div>

            </div>

            {/* ================= HEADING ================= */}
            <div className="mb-7 sm:mb-8">

              <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-wide mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Login to MediCare
              </h2>

              <p className="text-gray-500 text-sm sm:text-base mt-2">
                Access your healthcare dashboard
              </p>

            </div>

            {/* ================= SUCCESS MESSAGE ================= */}
            {success && (
              <div className="mb-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-emerald-400 text-sm text-center">
                ✓ {success}
              </div>
            )}

            {/* ================= ROLE ================= */}
            <div className="mb-5">

              <label className="block text-sm text-gray-400 mb-2">
                Login as
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-12 sm:h-[52px] px-4 rounded-xl bg-[#151f3d] border border-white/10 text-white text-sm sm:text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition cursor-pointer"
              >
                <option value="patient" className="bg-[#151f3d]">
                  Patient
                </option>

                <option value="doctor" className="bg-[#151f3d]">
                  Doctor
                </option>

                <option value="admin" className="bg-[#151f3d]">
                  Admin
                </option>
              </select>

            </div>

            {/* ================= EMAIL ================= */}
            <div className="mb-5">

              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 sm:h-[52px] pl-11 pr-4 rounded-xl bg-[#151f3d] border border-white/10 text-white text-sm sm:text-base placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                />

              </div>

            </div>

            {/* ================= PASSWORD ================= */}
            <div className="mb-6">

              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 sm:h-[52px] pl-11 pr-12 rounded-xl bg-[#151f3d] border border-white/10 text-white text-sm sm:text-base placeholder-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition p-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

            </div>

            {/* ================= LOGIN BUTTON ================= */}
            <button
              onClick={handleLogin}
              className="w-full h-12 sm:h-[52px] rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm sm:text-base font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 active:scale-[0.98]"
            >
              Login
            </button>

            {/* ================= REGISTER ================= */}
            <p className="text-center mt-6 text-sm text-gray-500">

              Don&apos;t have an account?{" "}

              <span
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer transition"
              >
                Create Account
              </span>

            </p>

            {/* ================= SECURITY ================= */}
            <div className="flex items-center justify-center gap-2 mt-7 sm:mt-8 text-xs text-gray-600">

              <FaShieldAlt />

              <span>
                Secure healthcare access
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;