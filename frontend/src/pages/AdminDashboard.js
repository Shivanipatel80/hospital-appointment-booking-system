import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Icons
const Icon = {
  Dashboard: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Appointments: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Doctors: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Patients: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Logout: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Bell: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="w-4 h-4"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Trash: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  ),
  Edit: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Check: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="w-4 h-4"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  X: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="w-4 h-4"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Eye: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Download: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Search: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Hospital: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-6 h-6"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

// ─── Helpers ───
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (t) =>
  new Date(`1970-01-01T${t}`).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const getDoctorName = (doctor) => {
  if (!doctor?.name) return "Unknown Doctor";
  return doctor.name.toLowerCase().startsWith("dr")
    ? doctor.name
    : `Dr. ${doctor.name}`;
};

const avatarColors = [
  "#7c3aed",
  "#2563eb",
  "#0891b2",
  "#d97706",
  "#dc2626",
  "#059669",
];
const getAvatarColor = (name) =>
  avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];
const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const SPECIALIZATIONS = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Gynecologist",
  "ENT Specialist",
  "Ophthalmologist",
  "Psychiatrist",
  "Urologist",
  "Oncologist",
];

// ─── Sub-components ──
const Avatar = ({ name, size = "sm" }) => {
  const s = size === "lg" ? "w-12 h-12 text-lg" : "w-9 h-9 text-sm";
  return (
    <div
      className={`${s} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md`}
      style={{ background: getAvatarColor(name) }}
    >
      {getInitial(name)}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    confirmed: {
      cls: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      label: "✓ Confirmed",
    },
    rejected: {
      cls: "bg-red-500/20 text-red-400 border-red-500/30",
      label: "✕ Rejected",
    },
    pending: {
      cls: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      label: "⏳ Pending",
    },
  };
  const { cls, label } = map[status] || map.pending;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cls}`}>
      {label}
    </span>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  return (
    <div className="bg-[#161b22] border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-white/20 transition-colors">
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white text-xl"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs tracking-wide text-gray-400 uppercase">
          {label}
        </p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
};
 

// ─── Add Doctor Modal
const AddDoctorModal = ({ onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    name: editData?.name || "",
    specialization: editData?.specialization || "",
    email: editData?.email || "",
    phone: editData?.phone || "",
    experience: editData?.experience || "",
    fee: editData?.fee || "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !form.name.trim() ||
      !form.specialization.trim() ||
      !form.password.trim()
    ) {
      setError("Name, specialization, and password are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Something went wrong please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "#1a1d2e",
          border: "1px solid rgba(124,58,237,0.3)",
        }}
      >
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg,#4c1d95,#7c3aed)" }}
        >
          <span className="text-white font-bold text-base">
            {editData ? "✏️ Edit Doctor" : "➕ Add New Doctor"}
          </span>
          <button
            onClick={onClose}
            className="text-purple-200 hover:text-white transition p-1"
          >
            <Icon.X />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/40 text-red-400 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                key: "name",
                label: "Doctor Ka Naam *",
                placeholder: "Dr. Sharma",
                full: true,
              },
              {
                key: "email",
                label: "Email",
                placeholder: "doctor@hospital.com",
              },
              {
                key: "phone",
                label: "Phone Number",
                placeholder: "98XXXXXXXX",
              },
              {
                key: "experience",
                label: "Experience (years)",
                placeholder: "5",
              },
              { key: "fee", label: "Consultation Fee (₹)", placeholder: "500" },
              {
                key: "password",
                label: "Password *",
                placeholder: "Enter password",
                full: true,
              },
            ].map(({ key, label, placeholder, full }) => (
              <div key={key} className={full ? "col-span-2" : ""}>
                <label className="text-xs text-slate-400 font-medium mb-1.5 block">
                  {label}
                </label>
                <input
                  type={key === "password" ? "password" : "text"}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [key]: e.target.value }))
                  }
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                  style={{
                    background: "#0f1120",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              </div>
            ))}

            <div className="col-span-2">
              <label className="text-xs text-slate-400 font-medium mb-1.5 block">
                Specialization *
              </label>
              <select
                value={form.specialization}
                onChange={(e) =>
                  setForm((f) => ({ ...f, specialization: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                style={{
                  background: "#0f1120",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <option value="">-- Specialization --</option>
                {SPECIALIZATIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-400 transition hover:text-white"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-50 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg,#4c1d95,#7c3aed)" }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Icon.Check />
                  {editData ? "Update Doctor" : "Add New Doctor"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Appointment Detail Modal
const DetailModal = ({ appt, onClose, onUpdateStatus }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
    <div
      className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "#1a1d2e",
        border: "1px solid rgba(124,58,237,0.3)",
      }}
    >
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg,#4c1d95,#7c3aed)" }}
      >
        <span className="text-white font-bold">Appointment Detail</span>
        <button onClick={onClose} className="text-purple-200 hover:text-white">
          <Icon.X />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar name={appt.patient?.name} size="lg" />
          <div>
            <p className="font-bold text-white">
              {appt.patient?.name || "Unknown"}
            </p>
            <p className="text-xs text-slate-400">Patient</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Doctor", value: getDoctorName(appt.doctor) },
            {
              label: "Specialization",
              value: appt.doctor?.specialization || "General",
            },
            { label: "Date", value: formatDate(appt.date) },
            { label: "Time", value: formatTime(appt.time) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <p className="text-slate-500 text-xs mb-1">{label}</p>
              <p className="font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Status:</span>
          <StatusBadge status={appt.status} />
        </div>
        {appt.status === "pending" && (
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => {
                onUpdateStatus(appt._id, "confirmed");
                onClose();
              }}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
            >
              <Icon.Check /> Accept
            </button>
            <button
              onClick={() => {
                onUpdateStatus(appt._id, "rejected");
                onClose();
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2"
            >
              <Icon.X /> Reject
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [doctorSearch, setDoctorSearch] = useState("");
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await API.get("/auth/doctors");
      setDoctors(res.data?.doctors || res.data?.data || res.data || []);
    } catch (err) {
      console.error(
        "Doctors fetch error:",
        err?.response?.status,
        err?.response?.data,
      );
    }
  }, []);

  const generateNotifications = useCallback((appts) => {
    const now = new Date();
    return appts
      .filter((a) => {
        const dt = a.date
          ? new Date(`${a.date.slice(0, 10)}T${a.time || "00:00"}`)
          : null;
        return (
          dt && dt > now && (a.status === "pending" || a.status === "confirmed")
        );
      })
      .slice(0, 10)
      .map((a) => ({
        id: `${a.status}-${a._id}`,
        msg:
          a.status === "pending"
            ? `🆕 New: ${a.patient?.name || "Patient"} → ${getDoctorName(a.doctor)}`
            : `✅ Confirmed: ${a.patient?.name || "Patient"} → ${getDoctorName(a.doctor)}`,
        time: a.date
          ? new Date(a.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })
          : "",
        read: a.status === "confirmed",
        type: a.status,
      }));
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
      setNotifications(generateNotifications(res.data));
    } catch (err) {
      console.error("Appointments fetch error:", err);
    }
  }, [generateNotifications]);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [fetchAppointments, fetchDoctors]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/status/${id}`, { status });
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Appointment delete karein?")) return;
    try {
      await API.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch {
      alert("Delete failed");
    }
  };

  const handleAddDoctor = async (form) => {
    await API.post("/auth/doctors", form);
    fetchDoctors();
  };

  const handleEditDoctor = async (form) => {
    await API.put(`/auth/doctors/${editDoctor._id}`, form);
    setEditDoctor(null);
    fetchDoctors();
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Doctor delete karein?")) return;
    try {
      await API.delete(`/auth/doctors/${id}`);
      fetchDoctors();
    } catch {
      alert("Delete failed");
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAppts = appointments.filter(
    (a) => a.date && new Date(a.date).toISOString().split("T")[0] === todayStr,
  );

  const filteredAppts = appointments.filter((a) => {
    const matchSearch =
      !searchQuery ||
      a.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctor?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredDoctors = doctors.filter(
    (d) =>
      !doctorSearch ||
      d.name?.toLowerCase().includes(doctorSearch.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(doctorSearch.toLowerCase()),
  );

  const chartData = [
    {
      name: "Confirmed",
      value: appointments.filter((a) => a.status === "confirmed").length,
    },
    {
      name: "Pending",
      value: appointments.filter((a) => a.status === "pending").length,
    },
    {
      name: "Rejected",
      value: appointments.filter((a) => a.status === "rejected").length,
    },
  ];
  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  // Doctor-wise stats
  const doctorStats = doctors
    .map((d) => ({
      ...d,
      count: appointments.filter((a) => a.doctor?._id === d._id).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const maxCount = doctorStats[0]?.count || 1;

  // Sidebar nav
  const navItems = [
    { key: "overview", label: "Overview", icon: <Icon.Dashboard /> },
    {
      key: "appointments",
      label: "All Appointments",
      icon: <Icon.Appointments />,
      badge: appointments.filter((a) => a.status === "pending").length,
    },
    { key: "doctors", label: "Doctors", icon: <Icon.Doctors /> },
    { key: "patients", label: "Patients", icon: <Icon.Patients /> },
  ];

  // Section renderers
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          label="Total Appointments"
          value={appointments.length}
          icon={<Icon.Appointments />}
          color="linear-gradient(135deg,#4c1d95,#7c3aed)"
        />
        <StatCard
          label="Confirmed"
          value={appointments.filter((a) => a.status === "confirmed").length}
          icon={<Icon.Check />}
          color="linear-gradient(135deg,#065f46,#10b981)"
        />
        <StatCard
          label="Pending"
          value={appointments.filter((a) => a.status === "pending").length}
          icon={<Icon.Bell />}
          color="linear-gradient(135deg,#92400e,#f59e0b)"
        />
        <StatCard
          label="Cancelled"
          value={appointments.filter((a) => a.status === "rejected").length}
          icon={<Icon.X />}
         color="linear-gradient(135deg,#991b1b,#dc2626)"
        />
        <StatCard
          label="Today's"
          value={todayAppts.length}
          icon={<Icon.Appointments />}
          color="linear-gradient(135deg,#1e3a5f,#3b82f6)"
        />
        <StatCard
          label="Total Patients"
          value={
            new Set(appointments.map((a) => a.patient?._id).filter(Boolean))
              .size
          }
          icon={<Icon.Patients />}
          color="linear-gradient(135deg,#0e7490,#22d3ee)"
        />
        <StatCard
          label="Total Doctors"
          value={doctors.length}
          icon={<Icon.Doctors />}
          color="linear-gradient(135deg,#3730a3,#6366f1)"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-2xl p-6 shadow-lg"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="border-b border-slate-700 mb-4 pb-3">
  <p className="font-bold text-white">
    Appointments Overview
  </p>
  <p className="text-xs text-slate-400">
    Status breakdown
  </p>
</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#475569"
                tick={{ fontSize: 12, fill: "#94a3b8" }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <Tooltip
                contentStyle={{
                  background: "#0f1120",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={40}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="rounded-2xl p-6 shadow-lg"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="mb-4 pb-3 border-b border-slate-700/50">
  <p className="font-bold text-white">
    Status Distribution
  </p>
  <p className="text-xs text-slate-400">
    Pie chart
  </p>
</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "#475569" }}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0f1120",
                  border: "none",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />
              <Legend
                iconType="circle"
                formatter={(v) => (
                  <span style={{ color: "#94a3b8", fontSize: 12 }}>{v}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Doctor-wise stats */}
      <div
        className="rounded-2xl p-6 shadow-lg"
        style={{
          background: "#1a1d2e",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-bold text-white">Doctor-wise Statistics</p>
            <p className="text-xs text-slate-400 mt-0.5">
              Top doctors by appointments
            </p>
          </div>
          <span className="text-xs bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">
            Top {doctorStats.length}
          </span>
        </div>
        <div className="space-y-4">
          {doctorStats.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">
              No data available
            </p>
          ) : (
            doctorStats.map((d, i) => (
              <div key={d._id} className="flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: getAvatarColor(d.name) }}
                >
                  {getInitial(d.name)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">
                        {getDoctorName(d)}
                      </span>
                      <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">
                        {d.specialization || "General"}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-purple-400">
                      {d.count} appts
                    </span>
                  </div>
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(d.count / maxCount) * 100}%`,
                        background: `linear-gradient(90deg, ${avatarColors[i % avatarColors.length]}, ${avatarColors[(i + 1) % avatarColors.length]})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div
      className="rounded-2xl shadow-lg overflow-hidden"
      style={{
        background: "#1a1d2e",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div
        className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div>
          <h3 className="font-bold text-white text-lg">
            Appointments Management
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {filteredAppts.length} records
          </p>
        </div>
        <button
          onClick={() => {
            const headers = ["Patient,Doctor,Specialization,Date,Time,Status"];
            const rows = appointments.map(
              (a) =>
                `${a.patient?.name || ""},${getDoctorName(a.doctor)},${a.doctor?.specialization || ""},${a.date?.slice(0, 10) || ""},${a.time || ""},${a.status}`,
            );
            const csv = [...headers, ...rows].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "appointments.csv";
            link.click();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition"
          style={{ background: "linear-gradient(135deg,#4c1d95,#7c3aed)" }}
        >
          <Icon.Download /> Export CSV
        </button>
      </div>

      {/* Search + Filter */}
      <div
        className="px-6 py-4 flex flex-col sm:flex-row gap-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon.Search />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Patient ya doctor dhundein..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            style={{
              background: "#0f1120",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          style={{
            background: "#0f1120",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <option value="All">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredAppts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🗂️</p>
            <p className="text-slate-400 font-semibold">
              No appointments available
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Adjust your filters or search criteria
            </p>
          </div>
        ) : (
          <table className="w-full text-left min-w-[750px]">
            <thead>
              <tr
                style={{
                  background: "rgba(124,58,237,0.1)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {[
                  "Patient",
                  "Doctor",
                  "Specialization",
                  "Date",
                  "Time",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="py-3.5 px-4 text-xs font-bold text-purple-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredAppts.map((a) => (
                <tr
                  key={a._id}
                  className="transition"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(124,58,237,0.07)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={a.patient?.name} />
                      <span className="font-semibold text-white text-sm">
                        {a.patient?.name || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={a.doctor?.name} />
                      <span className="font-semibold text-white text-sm">
                        {getDoctorName(a.doctor)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs font-semibold bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg border border-blue-500/30">
                      {a.doctor?.specialization || "General"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 text-sm font-medium">
                    {formatDate(a.date)}
                  </td>
                  <td className="py-4 px-4 text-slate-300 text-sm">
                    {formatTime(a.time)}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedAppt(a)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 transition hover:bg-blue-500/20"
                        title="Detail Dekho"
                      >
                        <Icon.Eye />
                      </button>
                      {a.status === "pending" && (
                        <>
                          <button
                            onClick={() => updateStatus(a._id, "confirmed")}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-400 transition hover:bg-emerald-500/20"
                            title="Accept"
                          >
                            <Icon.Check />
                          </button>
                          <button
                            onClick={() => updateStatus(a._id, "rejected")}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 transition hover:bg-red-500/20"
                            title="Reject"
                          >
                            <Icon.X />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteAppointment(a._id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 transition hover:text-red-400 hover:bg-red-500/10"
                        title="Delete"
                      >
                        <Icon.Trash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-xl">Doctors Management</h3>
          <p className="text-xs text-slate-400 mt-1">
            {doctors.length} doctors registered
          </p>
        </div>
        <button
          onClick={() => setShowAddDoctor(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition shadow-lg hover:shadow-purple-500/30"
          style={{ background: "linear-gradient(135deg,#4c1d95,#7c3aed)" }}
        >
          <Icon.Plus /> Add Doctor
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
          <Icon.Search />
        </span>
        <input
          type="text"
          value={doctorSearch}
          onChange={(e) => setDoctorSearch(e.target.value)}
          placeholder="Doctor ya specialization dhundein..."
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-4xl mb-3">👨‍⚕️</p>
          <p className="text-slate-400 font-semibold">
            No doctors available at the moment
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Get started by adding a new doctor using the button above
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doc) => {
            const apptCount = appointments.filter(
              (a) => a.doctor?._id === doc._id,
            ).length;
            return (
              <div
                key={doc._id}
                className="rounded-2xl p-5 transition hover:scale-[1.01]"
                style={{
                  background: "#1a1d2e",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${getAvatarColor(doc.name)}, ${avatarColors[((doc.name?.charCodeAt(0) || 0) % avatarColors.length) + 1 >= avatarColors.length ? 0 : ((doc.name?.charCodeAt(0) || 0) % avatarColors.length) + 1]})`,
                      }}
                    >
                      {getInitial(doc.name)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">
                        {getDoctorName(doc)}
                      </p>
                      <span className="text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                        {doc.specialization || "General"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {apptCount} appts
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  {doc.email && (
                    <p className="text-xs text-slate-400 truncate">
                      📧 {doc.email}
                    </p>
                  )}
                  {doc.phone && (
                    <p className="text-xs text-slate-400">📞 {doc.phone}</p>
                  )}
                  {doc.experience && (
                    <p className="text-xs text-slate-400">
                      🏥 {doc.experience} years experience
                    </p>
                  )}
                  {doc.fee && (
                    <p className="text-xs text-slate-400">
                      💰 ₹{doc.fee} consultation fee
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div
                  className="flex gap-2 pt-3"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <button
                    onClick={() => setEditDoctor(doc)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-blue-400 transition hover:bg-blue-500/20"
                    style={{ border: "1px solid rgba(59,130,246,0.3)" }}
                  >
                    <Icon.Edit /> Edit
                  </button>
                  <button
                    onClick={() => deleteDoctor(doc._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-red-400 transition hover:bg-red-500/20"
                    style={{ border: "1px solid rgba(239,68,68,0.3)" }}
                  >
                    <Icon.Trash /> Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderPatients = () => {
    const uniquePatients = [];
    const seen = new Set();
    appointments.forEach((a) => {
      if (a.patient?._id && !seen.has(a.patient._id)) {
        seen.add(a.patient._id);
        uniquePatients.push(a.patient);
      }
    });

    return (
      <div className="space-y-5">
        <div>
          <h3 className="font-bold text-white text-xl">Patients List</h3>
          <p className="text-xs text-slate-400 mt-1">
            {uniquePatients.length} unique patients
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniquePatients.map((p) => {
            const patientAppts = appointments.filter(
              (a) => a.patient?._id === p._id,
            );
            return (
              <div
                key={p._id}
                className="rounded-2xl p-5"
                style={{
                  background: "#1a1d2e",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={p.name} size="lg" />
                  <div>
                    <p className="font-bold text-white">
                      {p.name || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.email || "No email"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg border border-purple-500/30">
                    {patientAppts.length} appointments
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg border border-emerald-500/30">
                    {
                      patientAppts.filter((a) => a.status === "confirmed")
                        .length
                    }{" "}
                    confirmed
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {uniquePatients.length === 0 && (
          <div
            className="rounded-2xl text-center py-16"
            style={{
              background: "#1a1d2e",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <p className="text-4xl mb-3">👤</p>
            <p className="text-slate-400">No patients available</p>
          </div>
        )}
      </div>
    );
  };

  // ── Render ──
  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0f1120", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* ── MODALS ── */}
      {selectedAppt && (
        <DetailModal
          appt={selectedAppt}
          onClose={() => setSelectedAppt(null)}
          onUpdateStatus={updateStatus}
        />
      )}
      {showAddDoctor && (
        <AddDoctorModal
          onClose={() => setShowAddDoctor(false)}
          onSave={handleAddDoctor}
        />
      )}
      {editDoctor && (
        <AddDoctorModal
          onClose={() => setEditDoctor(null)}
          onSave={handleEditDoctor}
          editData={editDoctor}
        />
      )}

      {/* ── SIDEBAR ──*/}
      <aside
        className="w-64 flex-shrink-0 flex flex-col sticky top-0 h-screen"
        style={{
          background: "#13162b",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "4px 0 24px rgba(0,0,0,0.3)",
        }}
      >
        {/* Logo */}
        <div
          className="px-6 py-6 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ background: "linear-gradient(135deg,#4c1d95,#7c3aed)" }}
          >
            <Icon.Hospital />
          </div>
          <div>
            <p className="font-bold text-white text-base">MediCare</p>
            <p className="text-xs text-purple-400">Admin Panel</p>
          </div>
        </div>

        {/* Admin info */}
        <div
          className="px-6 py-4 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a78bfa)" }}
          >
            A
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Admin</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ key, label, icon, badge }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition"
              style={{
                background:
                  activeSection === key
                    ? "linear-gradient(135deg,rgba(76,29,149,0.6),rgba(124,58,237,0.4))"
                    : "transparent",
                color: activeSection === key ? "#fff" : "#94a3b8",
                border:
                  activeSection === key
                    ? "1px solid rgba(124,58,237,0.4)"
                    : "1px solid transparent",
              }}
            >
              <span
                style={{ color: activeSection === key ? "#a78bfa" : "#64748b" }}
              >
                {icon}
              </span>
              <span className="flex-1 text-left">{label}</span>
              {badge > 0 && (
                <span className="bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            style={{ border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <Icon.Logout />
            Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ──────────*/}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
          style={{
            background: "rgba(15,17,32,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h1 className="text-white font-bold text-lg capitalize">
              {activeSection === "overview"
                ? "Dashboard Overview"
                : activeSection === "appointments"
                  ? "Appointments"
                  : activeSection === "doctors"
                    ? "Doctors Management"
                    : "Patients"}
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Notification bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotif((p) => !p)}
              className="relative p-2.5 rounded-xl text-slate-400 hover:text-white transition"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Icon.Bell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div
                className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                style={{
                  background: "#1a1d2e",
                  border: "1px solid rgba(124,58,237,0.3)",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{
                    background: "linear-gradient(135deg,#4c1d95,#7c3aed)",
                  }}
                >
                  <span className="text-white font-bold text-sm">
                    Notifications
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setNotifications((n) =>
                          n.map((x) => ({ ...x, read: true })),
                        )
                      }
                      className="text-purple-200 hover:text-white text-xs"
                    >
                      Please read everything
                    </button>
                    <button
                      onClick={() => setShowNotif(false)}
                      className="text-purple-200 hover:text-white"
                    >
                      <Icon.X />
                    </button>
                  </div>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-center text-slate-500 text-sm py-8">
                    No notification{" "}
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 px-4 py-3 transition"
                      style={{
                        background: !n.read
                          ? "rgba(124,58,237,0.1)"
                          : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.type === "confirmed" ? "bg-emerald-500" : "bg-blue-500"}`}
                      />
                      <div className="flex-1">
                        <p
                          className={`text-xs ${!n.read ? "text-white font-medium" : "text-slate-400"}`}
                        >
                          {n.msg}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {n.time}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications((n_) =>
                            n_.filter((x) => x.id !== n.id),
                          )
                        }
                        className="text-slate-600 hover:text-red-400 transition mt-1"
                      >
                        <Icon.X />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6" onClick={() => setShowNotif(false)}>
          {activeSection === "overview" && renderOverview()}
          {activeSection === "appointments" && renderAppointments()}
          {activeSection === "doctors" && renderDoctors()}
          {activeSection === "patients" && renderPatients()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
