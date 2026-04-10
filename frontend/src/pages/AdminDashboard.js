import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-purple-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow p-4 flex justify-between rounded">
        <h3 className="font-bold text-purple-600">
          Hospital Appointment Booking System
        </h3>
        <div>🛠️</div>
      </div>

      {/* WELCOME */}
      <div className="bg-purple-400 text-white mt-4 p-4 rounded">
        <h2 className="text-xl font-semibold">
          Welcome, Admin!
        </h2>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-4">

        <div className="bg-purple-500 text-white p-4 rounded shadow">
          <h3>Total Appointments</h3>
          <p className="text-2xl font-bold">{appointments.length}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded shadow">
          <h3>Confirmed</h3>
          <p className="text-2xl font-bold">
            {appointments.filter(a => a.status === "confirmed").length}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded shadow">
          <h3>Pending</h3>
          <p className="text-2xl font-bold">
            {appointments.filter(a => a.status === "pending").length}
          </p>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white mt-4 p-4 rounded shadow">
        <h3 className="font-semibold mb-3">All Appointments</h3>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Patient</th>
              <th className="p-2">Doctor</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a._id} className="border-b">
                  <td className="p-2">{a.patient?.name}</td>
                  <td className="p-2">{a.doctor?.name}</td>
                  <td className="p-2">{a.date}</td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminDashboard;