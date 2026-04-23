import { useEffect, useState } from "react";
import API from "../services/api";
import { FaBell, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // login page
  };

  const getDisplayName = () => {
    if (user.role === "doctor") {
      if (user.name.toLowerCase().startsWith("dr")) {
        return user.name;
      }
      return "Dr. " + user.name;
    }
    return user.name;
  };

  // fetch appointments
  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/doctor");
      setAppointments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // update status
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/status/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  // today appointments
  const todayAppointments = appointments.filter((a) => {
    const today = new Date().toISOString().split("T")[0];
    const apptDate = new Date(a.date).toISOString().split("T")[0];
    return today === apptDate;
  });

  // upcoming appointments
  const upcomingAppointments = appointments.filter((a) => {
    const today = new Date().toISOString().split("T")[0];
    const apptDate = new Date(a.date).toISOString().split("T")[0];
    return apptDate > today;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
        <h2 className="font-bold text-green-600">
          Hospital Appointment Booking System
        </h2>

        <div className="flex items-center gap-4 text-gray-600">
          <FaBell />
          <div className="flex items-center gap-2">
            <FaUserMd />
            {user?.name}
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* WELCOME */}
      <div className="bg-gradient-to-r from-green-500 to-green-300 text-white mt-4 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold">
          Welcome, {getDisplayName()} 👋
        </h2>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="bg-green-500 text-white p-4 rounded-xl shadow-md">
          <h3>Today's Appointments</h3>
          <p className="text-2xl font-bold">{todayAppointments.length}</p>
        </div>

        <div className="bg-green-400 text-white p-4 rounded-xl shadow-md">
          <h3>Upcoming Appointments</h3>
          <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-xl shadow-md">
          <h3>Pending Requests</h3>
          <p className="text-2xl font-bold">
            {appointments.filter((a) => a.status === "pending").length}
          </p>
        </div>
      </div>

      {/* TODAY'S SCHEDULE */}
      <div className="bg-white p-5 rounded-xl shadow-md mt-5">
        <h3 className="font-bold text-lg mb-4">Today's Schedule</h3>

        {todayAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments today</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {todayAppointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      {a.patient?.name?.charAt(0)}
                    </div>
                    {a.patient?.name}
                  </td>

                  <td className="p-3 ">{a.time}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        a.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : a.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {a.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(a._id, "confirmed")}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded mr-2"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(a._id, "rejected")}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* UPCOMING APPOINTMENTS */}
      <div className="bg-white p-5 rounded-xl shadow-md mt-5">
        <h3 className="font-bold text-lg mb-4">Upcoming Appointments</h3>

        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500">No upcoming appointments</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Patient</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {upcomingAppointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                      {a.patient?.name?.charAt(0)}
                    </div>
                    {a.patient?.name}
                  </td>

                  <td className="p-3">
                    {new Date(a.date).toLocaleDateString()}
                  </td>

                  <td className="p-3">{a.time}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        a.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : a.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
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

export default DoctorDashboard;
