import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          Medi<span className="text-blue-400">Care</span>
        </h1>

        <div className="flex items-center gap-8 text-sm">
          <button className="hover:text-blue-400 transition">
            Home
          </button>

          <button
  onClick={() =>
    document.getElementById("doctors")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="hover:text-blue-400 transition"
>
  Doctors
</button>

          <button
  onClick={() =>
    document.getElementById("services")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="hover:text-blue-400 transition"
>
  Services
</button>

          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6">

        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <p className="text-blue-400 font-semibold mb-4">
              YOUR HEALTH, OUR PRIORITY
            </p>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Quality Healthcare
              <br />
              <span className="text-blue-400">
                Made Simple.
              </span>
            </h2>

            <p className="text-slate-300 text-lg leading-8 max-w-xl mb-8">
              Book appointments with trusted doctors quickly and easily.
              Manage your appointments and get the healthcare you deserve.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold transition shadow-lg shadow-blue-900/30"
              >
                Book Appointment
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-7 py-3 rounded-xl border border-slate-600 hover:bg-white/10 font-semibold transition"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Right Medical Card */}
          <div className="flex justify-center">

            <div className="relative w-full max-w-md">

              {/* Glow */}
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>

              {/* Main Card */}
              <div className="relative bg-slate-900/80 border border-blue-400/20 rounded-3xl p-8 shadow-2xl">

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl">
                    🏥
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      MediCare
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Healthcare Appointment System
                    </p>
                  </div>
                </div>

                <div className="space-y-4">

                  <div className="bg-slate-800/80 rounded-xl p-4 flex items-center gap-4">
                    <div className="text-2xl">👨‍⚕️</div>

                    <div>
                      <p className="font-semibold">
                        Trusted Doctors
                      </p>
                      <p className="text-sm text-slate-400">
                        Find doctors by specialization
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-4 flex items-center gap-4">
                    <div className="text-2xl">📅</div>

                    <div>
                      <p className="font-semibold">
                        Easy Booking
                      </p>
                      <p className="text-sm text-slate-400">
                        Schedule appointments easily
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-xl p-4 flex items-center gap-4">
                    <div className="text-2xl">🔒</div>

                    <div>
                      <p className="font-semibold">
                        Secure & Reliable
                      </p>
                      <p className="text-sm text-slate-400">
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


      {/* Why Choose MediCare */}
<section className="px-6 py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

  <div className="max-w-6xl mx-auto text-center">

    <p className="text-blue-400 font-semibold mb-3">
      WHY CHOOSE MEDICARE
    </p>

    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Healthcare Made Easier
    </h2>

    <p className="text-slate-400 max-w-2xl mx-auto mb-12">
      MediCare makes it simple to find doctors, book appointments,
      and manage your healthcare in one place.
    </p>

    {/* Feature Cards */}
    <div className="grid md:grid-cols-3 gap-6">

      {/* Card 1 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-blue-500/50 transition">

        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-600/15 flex items-center justify-center text-3xl">
          👨‍⚕️
        </div>

        <h3 className="text-xl font-bold text-white mb-3">
          Trusted Doctors
        </h3>

        <p className="text-slate-400 leading-7">
          Find qualified doctors from different medical
          specializations according to your needs.
        </p>

      </div>

      {/* Card 2 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-blue-500/50 transition">

        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-blue-600/15 flex items-center justify-center text-3xl">
          📅
        </div>

        <h3 className="text-xl font-bold text-white mb-3">
          Easy Appointment Booking
        </h3>

        <p className="text-slate-400 leading-7">
          Book your appointment quickly by selecting your
          preferred doctor, date, and time.
        </p>

      </div>

      {/* Card 3 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-blue-500/50 transition">

        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-3xl">
          🔒
        </div>

        <h3 className="text-xl font-bold text-white mb-3">
          Secure & Reliable
        </h3>

        <p className="text-slate-400 leading-7">
          Your appointment and account information is handled
          through a secure and reliable system.
        </p>

      </div>

    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">

      <div>
        <h3 className="text-3xl font-bold text-blue-400">
          500+
        </h3>
        <p className="text-slate-400 mt-2">
          Patients
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-blue-400">
          50+
        </h3>
        <p className="text-slate-400 mt-2">
          Doctors
        </p>
      </div>

      <div>
        <h3 className="text-3xl font-bold text-emerald-400">
          10+
        </h3>
        <p className="text-slate-400 mt-2">
          Specializations
        </p>
      </div>

    </div>

  </div>

</section>

{/* Doctors Section */}
<section
  id="doctors"
  className="px-6 py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
>
  <div className="max-w-6xl mx-auto text-center">

    <p className="text-blue-400 font-semibold mb-3">
      OUR DOCTORS
    </p>

    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Find the Right Doctor for You
    </h2>

    <p className="text-slate-400 max-w-2xl mx-auto mb-12">
      Choose from a range of medical specialists and book
      an appointment according to your healthcare needs.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* General Physician */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-600/15 flex items-center justify-center text-3xl">
          🩺
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          General Physician
        </h3>

        <p className="text-slate-400 text-sm">
          Consultation for common health concerns and general medical care.
        </p>
      </div>

      {/* Cardiologist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-600/15 flex items-center justify-center text-3xl">
          ❤️
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          Cardiologist
        </h3>

        <p className="text-slate-400 text-sm">
          Specialized care for heart and cardiovascular health.
        </p>
      </div>

      {/* Dermatologist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-600/15 flex items-center justify-center text-3xl">
          🧴
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          Dermatologist
        </h3>

        <p className="text-slate-400 text-sm">
          Professional care for skin, hair, and related conditions.
        </p>
      </div>

      {/* Neurologist */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-blue-600/15 flex items-center justify-center text-3xl">
          🧠
        </div>

        <h3 className="text-lg font-bold text-white mb-2">
          Neurologist
        </h3>

        <p className="text-slate-400 text-sm">
          Specialized medical care for the brain and nervous system.
        </p>
      </div>

    </div>
  </div>
</section>


{/* Services Section */}
<section
  id="services"
  className="px-6 py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
>
  <div className="max-w-6xl mx-auto text-center">

    <p className="text-blue-400 font-semibold mb-3">
      OUR SERVICES
    </p>

    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
      Healthcare Services Made Simple
    </h2>

    <p className="text-slate-400 max-w-2xl mx-auto mb-12">
      Everything you need to manage your healthcare appointments
      in one convenient platform.
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {/* Service 1 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition">
        <div className="text-4xl mb-5">
          📅
        </div>

        <h3 className="text-lg font-bold text-white mb-3">
          Appointment Booking
        </h3>

        <p className="text-slate-400 text-sm leading-6">
          Book appointments with your preferred doctor,
          date, and time.
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
          Search and choose doctors based on their
          medical specialization.
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
          View, manage, reschedule, and track your
          appointments easily.
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
          A secure platform designed to keep your
          account information protected.
        </p>
      </div>

    </div>
  </div>
</section>

{/* Footer */}
<footer className="border-t border-slate-800 bg-slate-950 px-6 py-10">
  <div className="max-w-6xl mx-auto">

    <div className="grid md:grid-cols-3 gap-8">

      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Medi<span className="text-blue-400">Care</span>
        </h2>

        <p className="text-slate-400 mt-3 max-w-sm leading-6">
          Your trusted healthcare appointment platform.
          Find doctors and manage your appointments easily.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white font-semibold mb-4">
          Quick Links
        </h3>

        <div className="flex flex-col gap-3 text-slate-400">
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="text-left hover:text-blue-400 transition"
          >
            Home
          </button>

          <button
            onClick={() =>
              document.getElementById("doctors")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="text-left hover:text-blue-400 transition"
          >
            Doctors
          </button>

          <button
            onClick={() =>
              document.getElementById("services")?.scrollIntoView({
                behavior: "smooth",
              })
            }
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

      {/* Contact */}
      <div>
        <h3 className="text-white font-semibold mb-4">
          Contact
        </h3>

        <div className="space-y-3 text-slate-400">
          <p>📧 support@medicare.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Healthcare Center</p>
        </div>
      </div>

    </div>

    {/* Bottom */}
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