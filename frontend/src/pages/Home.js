import { useState } from "react";
import { useNavigate } from "react-router-dom";

import heroDoctors from "../assets/hero-doctors.png";
import doctorGeneral from "../assets/doctor-general.jpg";
import doctorCardio from "../assets/doctor-cardiologist.jpg";
import doctorDermato from "../assets/doctor-dermatologist.jpg";
import doctorNeuro from "../assets/doctor-neurologist.jpg";

function Home() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-md">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-[72px] sm:h-[80px] flex items-center justify-between">

            {/* LOGO */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl sm:text-3xl font-bold tracking-tight"
            >
              Medi<span className="text-blue-400">Care</span>
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-5 lg:gap-8 text-sm lg:text-base">

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="hover:text-blue-400 transition"
              >
                Home
              </button>

              <button
                onClick={() => goToSection("doctors")}
                className="hover:text-blue-400 transition"
              >
                Doctors
              </button>

              <button
                onClick={() => goToSection("services")}
                className="hover:text-blue-400 transition"
              >
                Services
              </button>

              <button
                onClick={() => navigate("/login")}
                className="px-5 lg:px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
              >
                Login
              </button>

            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-xl hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">

              <div className="flex flex-col gap-2">

                <button
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 hover:text-blue-400 transition"
                >
                  Home
                </button>

                <button
                  onClick={() => goToSection("doctors")}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 hover:text-blue-400 transition"
                >
                  Doctors
                </button>

                <button
                  onClick={() => goToSection("services")}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 hover:text-blue-400 transition"
                >
                  Services
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full mt-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium text-center"
                >
                  Login
                </button>

              </div>

            </div>
          )}

        </div>
      </nav>


      {/* =====================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative min-h-[calc(100vh-72px)] sm:min-h-[calc(100vh-80px)] flex items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        {/* Background glow */}
        <div className="absolute top-20 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            <p className="text-blue-400 font-semibold text-sm sm:text-base mb-4">
              YOUR HEALTH, OUR PRIORITY
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
              Quality Healthcare
              <br />
              <span className="text-blue-400">
                Made Simple.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 max-w-xl mx-auto lg:mx-0 mb-8">
              Book appointments with trusted doctors quickly and easily.
              Manage your appointments and get the healthcare you deserve.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">

              <button
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition shadow-lg shadow-blue-900/30"
              >
                Book Appointment
              </button>

              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-600 hover:bg-white/10 font-semibold transition"
              >
                Create Account
              </button>

            </div>

          </div>


          {/* RIGHT MEDICAL CARD */}
          <div className="flex justify-center lg:justify-end">

            <div className="relative w-full max-w-md lg:max-w-lg">

              {/* Glow */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />

              {/* Main Card */}
              <div className="relative bg-slate-900/80 border border-blue-400/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 xl:p-8 shadow-2xl backdrop-blur-sm">

                {/* Hero Image */}
                <img
                  src={heroDoctors}
                  alt="MediCare Doctors"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-56 xl:h-64 object-cover rounded-xl sm:rounded-2xl mb-5 sm:mb-6"
                />

                {/* MediCare */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">

                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-blue-600 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    🏥
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold">
                      MediCare
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm">
                      Healthcare Appointment System
                    </p>
                  </div>

                </div>


                {/* FEATURES */}
                <div className="space-y-3 sm:space-y-4">

                  {/* Feature 1 */}
                  <div className="bg-slate-800/80 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">

                    <div className="text-xl sm:text-2xl shrink-0">
                      👨‍⚕️
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">
                        Trusted Doctors
                      </p>

                      <p className="text-xs sm:text-sm text-slate-400">
                        Find doctors by specialization
                      </p>
                    </div>

                  </div>


                  {/* Feature 2 */}
                  <div className="bg-slate-800/80 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">

                    <div className="text-xl sm:text-2xl shrink-0">
                      📅
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">
                        Easy Booking
                      </p>

                      <p className="text-xs sm:text-sm text-slate-400">
                        Schedule appointments easily
                      </p>
                    </div>

                  </div>


                  {/* Feature 3 */}
                  <div className="bg-slate-800/80 rounded-xl p-3 sm:p-4 flex items-center gap-3 sm:gap-4">

                    <div className="text-xl sm:text-2xl shrink-0">
                      🔒
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold text-sm sm:text-base">
                        Secure & Reliable
                      </p>

                      <p className="text-xs sm:text-sm text-slate-400">
                        Your information stays protected
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE MEDICARE
      ====================================================== */}

      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

        <div className="max-w-7xl mx-auto text-center">

          <p className="text-blue-400 font-semibold text-sm sm:text-base mb-3">
            WHY CHOOSE MEDICARE
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Healthcare Made Easier
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-12">
            MediCare makes it simple to find doctors, book appointments,
            and manage your healthcare in one place.
          </p>


          {/* FEATURE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

            {/* Card 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-blue-500/50 transition">

              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-600/15 flex items-center justify-center text-3xl">
                👨‍⚕️
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Trusted Doctors
              </h3>

              <p className="text-slate-400 text-sm sm:text-base leading-7">
                Find qualified doctors from different medical specializations
                according to your needs.
              </p>

            </div>


            {/* Card 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-blue-500/50 transition">

              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-600/15 flex items-center justify-center text-3xl">
                📅
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Easy Appointment Booking
              </h3>

              <p className="text-slate-400 text-sm sm:text-base leading-7">
                Book your appointment quickly by selecting your preferred
                doctor, date, and time.
              </p>

            </div>


            {/* Card 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-blue-500/50 transition sm:col-span-2 lg:col-span-1">

              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-3xl">
                🔒
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Secure & Reliable
              </h3>

              <p className="text-slate-400 text-sm sm:text-base leading-7">
                Your appointment and account information is handled through a
                secure and reliable system.
              </p>

            </div>

          </div>


          {/* STATS */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto mt-12 sm:mt-16">

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">
                500+
              </h3>

              <p className="text-slate-400 text-xs sm:text-base mt-2">
                Patients
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-400">
                50+
              </h3>

              <p className="text-slate-400 text-xs sm:text-base mt-2">
                Doctors
              </p>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-emerald-400">
                10+
              </h3>

              <p className="text-slate-400 text-xs sm:text-base mt-2">
                Specializations
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          DOCTORS SECTION
      ====================================================== */}

      <section
        id="doctors"
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
      >

        <div className="max-w-7xl mx-auto text-center">

          <p className="text-blue-400 font-semibold text-sm sm:text-base mb-3">
            OUR DOCTORS
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Find the Right Doctor for You
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-12">
            Choose from a range of medical specialists and book an appointment
            according to your healthcare needs.
          </p>


          {/* DOCTOR GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

            {/* General Physician */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-500/50 transition">

              <img
                src={doctorGeneral}
                alt="General Physician"
                className="w-full h-52 sm:h-56 object-cover rounded-xl mb-5"
              />

              <h3 className="text-lg font-bold text-white mb-2">
                General Physician
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                Consultation for common health concerns and general medical
                care.
              </p>

            </div>


            {/* Cardiologist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-500/50 transition">

              <img
                src={doctorCardio}
                alt="Cardiologist"
                className="w-full h-52 sm:h-56 object-cover rounded-xl mb-5"
              />

              <h3 className="text-lg font-bold text-white mb-2">
                Cardiologist
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                Specialized care for heart and cardiovascular health.
              </p>

            </div>


            {/* Dermatologist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-500/50 transition">

              <img
                src={doctorDermato}
                alt="Dermatologist"
                className="w-full h-52 sm:h-56 object-cover rounded-xl mb-5"
              />

              <h3 className="text-lg font-bold text-white mb-2">
                Dermatologist
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                Professional care for skin, hair, and related conditions.
              </p>

            </div>


            {/* Neurologist */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 hover:border-blue-500/50 transition">

              <img
                src={doctorNeuro}
                alt="Neurologist"
                className="w-full h-52 sm:h-56 object-cover rounded-xl mb-5"
              />

              <h3 className="text-lg font-bold text-white mb-2">
                Neurologist
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                Specialized medical care for the brain and nervous system.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SERVICES SECTION
      ====================================================== */}

      <section
        id="services"
        className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
      >

        <div className="max-w-7xl mx-auto text-center">

          <p className="text-blue-400 font-semibold text-sm sm:text-base mb-3">
            OUR SERVICES
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Healthcare Services Made Simple
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 sm:mb-12">
            Everything you need to manage your healthcare appointments in one
            convenient platform.
          </p>


          {/* SERVICES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">

            {/* Service 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">

              <div className="text-4xl mb-5">
                📅
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                Appointment Booking
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                Book appointments with your preferred doctor, date, and time.
              </p>

            </div>


            {/* Service 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">

              <div className="text-4xl mb-5">
                🔎
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                Find Doctors
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                Search and choose doctors based on their medical specialization.
              </p>

            </div>


            {/* Service 3 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">

              <div className="text-4xl mb-5">
                📋
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                Appointment Management
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                View, manage, reschedule, and track your appointments easily.
              </p>

            </div>


            {/* Service 4 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">

              <div className="text-4xl mb-5">
                🔒
              </div>

              <h3 className="text-lg font-bold text-white mb-3">
                Secure Platform
              </h3>

              <p className="text-slate-400 text-sm leading-6">
                A secure platform designed to keep your account information
                protected.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-800 bg-slate-950 px-4 sm:px-6 lg:px-8 py-10">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">

            {/* BRAND */}
            <div>

              <h2 className="text-2xl font-bold text-white">
                Medi<span className="text-blue-400">Care</span>
              </h2>

              <p className="text-slate-400 mt-3 max-w-sm leading-6 text-sm sm:text-base">
                Your trusted healthcare appointment platform. Find doctors and
                manage your appointments easily.
              </p>

            </div>


            {/* QUICK LINKS */}
            <div>

              <h3 className="text-white font-semibold mb-4">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-slate-400">

                <button
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })
                  }
                  className="text-left hover:text-blue-400 transition"
                >
                  Home
                </button>

                <button
                  onClick={() => goToSection("doctors")}
                  className="text-left hover:text-blue-400 transition"
                >
                  Doctors
                </button>

                <button
                  onClick={() => goToSection("services")}
                  className="text-left hover:text-blue-400 transition"
                >
                  Services
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="text-left hover:text-blue-400 transition"
                >
                  Login
                </button>

              </div>

            </div>


            {/* CONTACT */}
            <div>

              <h3 className="text-white font-semibold mb-4">
                Contact
              </h3>

              <div className="space-y-3 text-slate-400 text-sm sm:text-base">

                <p className="break-all">
                  📧 support@medicare.com
                </p>

                <p>
                  📞 +91 98765 43210
                </p>

                <p>
                  📍 Healthcare Center
                </p>

              </div>

            </div>

          </div>


          {/* BOTTOM */}
          <div className="border-t border-slate-800 mt-8 pt-6 text-center">

            <p className="text-slate-500 text-sm">
              © 2026 MediCare. All rights reserved.
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;