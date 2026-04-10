import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaCalendarAlt,
} from "react-icons/fa";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));

  // Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Time
  const formatTime = (time) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // fetch appointments
  const fetchAppointments = async () => {
    const res = await API.get("/appointments/my");
    setAppointments(res.data);
  };

  // fetch doctors
  const fetchDoctors = async () => {
    const res = await API.get("/auth/doctors");
    setDoctors(res.data);
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  // Filters
  const historyAppointments = appointments.filter(
    (a) => a.status === "confirmed" || a.status === "rejected"
  );

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "pending"
  );

  // book appointment
  const bookAppointment = async () => {
    if (!doctorId || !date || !time) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/appointments/create", {
        doctor: doctorId,
        date,
        time,
      });

      alert("Appointment Booked Successfully!");

      setDoctorId("");
      setDate("");
      setTime("");

      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Error booking appointment");
    }
  };

  // cancel appointment
  const cancelAppointment = async (id) => {
    await API.put(`/appointments/status/${id}`, {
      status: "rejected",
    });
    fetchAppointments();
  };

  // doctor filter
  const filteredDoctors =
    filter === "All"
      ? doctors
      : doctors.filter((d) => d.specialization === filter);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center rounded-xl">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 text-white p-2 rounded-lg">+</div>
          <h2 className="font-bold text-gray-700">
            Hospital Appointment Booking System
          </h2>
        </div>

        <div className="flex gap-4 text-gray-600 text-lg">
          <FaBell />
          <FaCog />
          <FaUserCircle className="text-2xl" />
        </div>
      </div>

      {/* WELCOME */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white mt-4 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold">
          Welcome, {user?.name} 👋
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-500 text-white p-4 rounded-xl shadow-md">
          <h3>Total Appointments</h3>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-xl shadow-md">
          <h3>Confirmed</h3>
          <p className="text-2xl font-bold">
            {appointments.filter((a) => a.status === "confirmed").length}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-xl shadow-md">
          <h3>Pending</h3>
          <p className="text-2xl font-bold">
            {appointments.filter((a) => a.status === "pending").length}
          </p>
        </div>
      </div>

      {/* BOOK APPOINTMENT */}
      <div className="bg-white mt-4 p-5 rounded-xl shadow-md">
        <h3 className="font-semibold mb-3">Book Appointment</h3>

        {/* Filter */}
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="All">All Specializations</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Neurologist">Neurologist</option>
        </select>

        {/* Doctor */}
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="">Select Doctor</option>
          {filteredDoctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name} ({d.specialization || "General"})
            </option>
          ))}
        </select>

        {/* Date */}
        <div className="relative mb-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded pr-10"
          />
          <FaCalendarAlt className="absolute right-3 top-3 text-gray-500" />
        </div>

        {/* Time Slots */}
        <h3 className="font-semibold mb-3">Available Time Slots</h3>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {["11:00", "12:00", "13:00", "15:00", "16:00", "17:00","18:00", "19:00", "20:00"].map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`p-3 rounded-lg border text-sm font-medium transition ${
                time === t
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {formatTime(t + ":00")}
            </button>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={bookAppointment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Book Appointment
        </button>
      </div>

      {/* UPCOMING */}
      <div className="bg-white mt-4 p-5 rounded-xl shadow-md">
        <h3 className="font-semibold mb-3">Upcoming Appointments</h3>

        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-3">
            No upcoming appointments
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Doctor</th>
                <th className="p-2">Specialization</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {upcomingAppointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-blue-600 font-medium">
                    {a.doctor?.name?.startsWith("Dr.")
                      ? a.doctor.name
                      : `Dr. ${a.doctor?.name}`}
                  </td>
                  <td className="p-2">{a.doctor?.specialization}</td>
                  <td className="p-2">{formatDate(a.date)}</td>
                  <td className="p-2">{formatTime(a.time)}</td>

                  <td className="p-2">
                    <button
                      onClick={() => cancelAppointment(a._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* HISTORY */}
      <div className="bg-white mt-4 p-5 rounded-xl shadow-md">
        <h3 className="font-semibold mb-3">Appointment History</h3>

        {historyAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-3">
            No history available
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Doctor</th>
                <th className="p-2">Specialization</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {historyAppointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="p-2 text-blue-600 font-medium">
                    {a.doctor?.name?.startsWith("Dr.")
                      ? a.doctor.name
                      : `Dr. ${a.doctor?.name}`}
                  </td>
                  <td className="p-2">{a.doctor?.specialization}</td>
                  <td className="p-2">{formatDate(a.date)}</td>
                  <td className="p-2">{formatTime(a.time)}</td>

                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        a.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;