import { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const res = await API.get("/appointments/doctor");
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/appointments/status/${id}`, { status });
    fetchAppointments();
  };

  return (
    <div className="min-h-screen bg-green-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow p-4 flex justify-between rounded">
        <h3 className="font-bold text-green-600">
          Hospital Appointment Booking System
        </h3>
        <div>👨‍⚕️</div>
      </div>

      {/* WELCOME */}
      <div className="bg-green-400 text-white mt-4 p-4 rounded">
        <h2 className="text-xl font-semibold">
          Welcome, Doctor!
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3>Today's Appointments</h3>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>

        <div className="bg-green-400 text-white p-4 rounded shadow">
          <h3>Available Slots</h3>
          <p className="text-2xl font-bold">12</p>
        </div>

        <div className="bg-green-600 text-white p-4 rounded shadow">
          <h3>Pending Requests</h3>
          <p className="text-2xl font-bold">
            {appointments.filter(a => a.status === "pending").length}
          </p>
        </div>
      </div>

      {/* SCHEDULE */}
      <div className="bg-white mt-4 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">Today's Schedule</h3>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Patient</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a._id} className="border-b">
                <td className="p-2">{a.patient?.name}</td>
                <td className="p-2">{a.time}</td>

                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white ${
                    a.status === "confirmed"
                      ? "bg-green-500"
                      : a.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}>
                    {a.status}
                  </span>
                </td>

                <td className="p-2">
                  {a.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(a._id, "confirmed")}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(a._id, "rejected")}
                        className="bg-red-500 text-white px-2 py-1 rounded"
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
      </div>

    </div>
  );
}

export default DoctorDashboard;