import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

//Inline SVG Icons
const Icon = {
  Schedule: () => (
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
  Upcoming: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Pending: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
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
  CheckCircle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
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
  Hospital: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
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
  Stethoscope: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-5 h-5"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
  Clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-3.5 h-3.5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  CalendarSmall: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-3.5 h-3.5"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Sparkle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-14 h-14 mx-auto"
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  UserCircle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-14 h-14 mx-auto"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
    </svg>
  ),
};

//Helpers
const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (t) => {
  try {
    return new Date(`1970-01-01T${t}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return t || "—";
  }
};

const avatarColors = [
  "#7c3aed",
  "#2563eb",
  "#0891b2",
  "#d97706",
  "#dc2626",
  "#059669",
  "#db2777",
];
const getAvatarColor = (name) =>
  avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];
const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

//Avatar
const Avatar = ({ name, size = "sm" }) => {
  const sz =
    size === "lg"
      ? "w-12 h-12 text-base"
      : size === "xl"
        ? "w-16 h-16 text-xl"
        : "w-9 h-9 text-sm";
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${getAvatarColor(name)}, ${avatarColors[(((name?.charCodeAt(0) || 0) % avatarColors.length) + 1) % avatarColors.length]})`,
      }}
    >
      {getInitial(name)}
    </div>
  );
};

// Status Badge
const StatusBadge = ({ status }) => {
  const map = {
    confirmed: {
      bg: "#1a3a2a",
      text: "#34d399",
      border: "#34d39940",
      label: "Confirmed",
    },
    rejected: {
      bg: "#3a1a1a",
      text: "#f87171",
      border: "#f8717140",
      label: "Cancelled",
    },
    pending: {
      bg: "#3a2e1a",
      text: "#fbbf24",
      border: "#fbbf2440",
      label: "Pending",
    },
    completed: {
      bg: "#172554",
      text: "#60a5fa",
      border: "#60a5fa40",
      label: "Completed",
    },
  };
  const s = map[status] || map.pending;
  return (
    <span
      className="px-3 py-1 rounded-lg text-xs font-bold"
      style={{
        background: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </span>
  );
};

// Stat Card
const StatCard = ({ label, value, icon, accent }) => (
  <div
    className="relative rounded-2xl p-5 overflow-hidden flex items-center gap-4 transition-all hover:-translate-y-1 group"
    style={{
      background: "linear-gradient(135deg, #1a1d2e 0%, #1c2032 100%)",
      border: `1px solid ${accent}33`,
    }}
  >
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background: `radial-gradient(circle at top right, ${accent}22, transparent 70%)`,
      }}
    />
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 relative z-10"
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        boxShadow: `0 4px 14px ${accent}40`,
      }}
    >
      {icon}
    </div>
    <div className="relative z-10 min-w-0">
      <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider truncate">
        {label}
      </p>
      <p className="text-3xl font-semibold mt-0.5" style={{ color: accent }}>
        {value}
      </p>
    </div>
  </div>
);

//  Detail Modal
const DetailModal = ({ appt, onClose, onUpdate }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
    <div
      className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "#1a1d2e",
        border: "1px solid rgba(124,58,237,0.4)",
      }}
    >
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg,#1e1035,#4c1d95)" }}
      >
        <span className="text-white font-bold">Patient Detail</span>
        <button onClick={onClose} className="text-purple-300 hover:text-white">
          <Icon.X />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4">
          <Avatar name={appt.patient?.name} size="lg" />
          <div>
            <p className="font-bold text-white text-lg">
              {appt.patient?.name || "Unknown"}
            </p>
            <p className="text-xs text-slate-400">
              {appt.patient?.email || "Email unavailable"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Date", value: formatDate(appt.date) },
            { label: "Time", value: formatTime(appt.time) },
            { label: "Status", value: <StatusBadge status={appt.status} /> },
            {
              label: "Specialization",
              value: appt.doctor?.specialization || "General",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-slate-500 text-xs mb-1">{label}</p>
              <div className="text-white text-sm font-semibold">{value}</div>
            </div>
          ))}
        </div>
        {appt.status === "pending" ? (
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => {
                onUpdate(appt._id, "confirmed");
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition"
              style={{ background: "linear-gradient(135deg,#065f46,#10b981)" }}
            >
              <Icon.Check /> Accept
            </button>
            <button
              onClick={() => {
                onUpdate(appt._id, "rejected");
                onClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition"
              style={{ background: "linear-gradient(135deg,#7f1d1d,#ef4444)" }}
            >
              <Icon.X /> Cancelled
            </button>
          </div>
        ) : appt.status === "confirmed" ? (
          <button
            onClick={() => {
              onUpdate(appt._id, "completed");
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition"
            style={{ background: "linear-gradient(135deg,#1e3a8a,#3b82f6)" }}
          >
            <Icon.CheckCircle /> Complete Appointment
          </button>
        ) : (
          <div className="text-center text-sm font-semibold text-slate-400 pt-2 capitalize">
            Appointment {appt.status}
          </div>
        )}
      </div>
    </div>
  </div>
);

// MAIN COMPONENT
function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [activeSection, setActiveSection] = useState("today");
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [patientSearch, setPatientSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchDoctorInfo = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setDoctorInfo(user);
    } catch {
      /* ignore */
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await API.get("/appointments/doctor");
      const data = res.data?.appointments || res.data?.data || res.data || [];
      setAppointments(data);

      // Generate notifications from pending
      const notifs = data
        .filter((a) => a.status === "pending")
        .slice(0, 8)
        .map((a) => ({
          id: `notif-${a._id}`,
          msg: `${a.patient?.name || "A patient"} booked an appointment`,
          time: a.date
            ? new Date(a.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
              })
            : "",
          read: false,
        }));
      setNotifications(notifs);
    } catch (err) {
      console.error(
        "Appointments fetch error:",
        err?.response?.status,
        err?.response?.data,
      );
    }
  }, []);

  useEffect(() => {
    fetchDoctorInfo();
    fetchAppointments();
  }, [fetchDoctorInfo, fetchAppointments]);

  const updateStatus = async (id, status) => {
    try {
      const response = await API.put(`/appointments/status/${id}`, { status });
      console.log("Status updated:", response.data);
      await fetchAppointments();
    } catch (err) {
      console.error("Status update failed:", err);
      alert(
        err?.response?.data?.message || "Failed to update appointment status",
      );
    }
  };

  // Derived data
  const todayStr = new Date().toISOString().split("T")[0];
  const now = new Date();

  const todayAppts = appointments
    .filter((a) => a.date && a.date.slice(0, 10) === todayStr)
    .sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  const upcomingAppts = appointments
    .filter((a) => {
      const dt = a.date
        ? new Date(`${a.date.slice(0, 10)}T${a.time || "00:00"}`)
        : null;
      return (
        dt &&
        dt > now &&
        a.date.slice(0, 10) !== todayStr &&
        a.status !== "rejected"
      );
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pendingAppts = appointments.filter((a) => a.status === "pending");
  const completedAppts = appointments.filter((a) => a.status === "completed");

  const uniquePatients = (() => {
    const seen = new Set();
    return appointments
      .filter((a) => {
        if (!a.patient?._id || seen.has(a.patient._id)) return false;
        seen.add(a.patient._id);
        return true;
      })
      .map((a) => ({
        ...a.patient,
        apptCount: appointments.filter((x) => x.patient?._id === a.patient._id)
          .length,
        lastAppt: appointments
          .filter((x) => x.patient?._id === a.patient._id)
          .sort((x, y) => new Date(y.date) - new Date(x.date))[0],
      }));
  })();

  const filteredPatients = uniquePatients.filter(
    (p) =>
      !patientSearch ||
      p.name?.toLowerCase().includes(patientSearch.toLowerCase()),
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  //  Nav items
  const navItems = [
    {
      key: "today",
      label: "Today's Schedule",
      icon: <Icon.Schedule />,
      badge: todayAppts.length,
      accent: "#10b981",
    },
    {
      key: "upcoming",
      label: "Upcoming",
      icon: <Icon.Upcoming />,
      badge: upcomingAppts.length,
      accent: "#3b82f6",
    },
    {
      key: "pending",
      label: "Pending Requests",
      icon: <Icon.Pending />,
      badge: pendingAppts.length,
      accent: "#f59e0b",
    },
    {
      key: "patients",
      label: "All Patients",
      icon: <Icon.Patients />,
      badge: 0,
      accent: "#a78bfa",
    },
  ];

  //  Section: Today's Schedule
  const renderToday = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Today's"
          value={todayAppts.length}
          icon={<Icon.Schedule />}
          accent="#10b981"
        />
        <StatCard
          label="Upcoming"
          value={upcomingAppts.length}
          icon={<Icon.Upcoming />}
          accent="#3b82f6"
        />
        <StatCard
          label="Pending"
          value={pendingAppts.length}
          icon={<Icon.Pending />}
          accent="#f59e0b"
        />
        <StatCard
          label="Completed"
          value={completedAppts.length}
          icon={<Icon.Completed />}
          accent="#22c55e"
        />
        <StatCard
          label="Total Appointments"
          value={appointments.length}
          icon={<Icon.Stethoscope />}
          accent="#a78bfa"
        />
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#1a1d2e",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(16,185,129,0.15)", color: "#10b981" }}
            >
              <Icon.Schedule />
            </div>
            <div>
              <p className="font-bold text-white">Today's Schedule</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {new Date().toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-xl"
            style={{
              background: "rgba(16,185,129,0.15)",
              color: "#10b981",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            {todayAppts.length} today
          </span>
        </div>

        {todayAppts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-slate-600 mb-3 flex items-center justify-center">
              <div style={{ transform: "scale(2.6)" }}>
                <Icon.Schedule />
              </div>
            </div>
            <p className="text-slate-400 font-semibold">
              No appointments today
            </p>
            <p className="text-slate-600 text-sm mt-1">Enjoy your free time!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  {["Patient", "Time", "Status", "Action"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {todayAppts.map((a) => (
                  <tr
                    key={a._id}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.025)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                    className="transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={a.patient?.name} />
                        <div>
                          <p className="font-semibold text-white text-sm">
                            {a.patient?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {a.patient?.email || ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white font-bold text-sm">
                        {formatTime(a.time)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-6 py-4">
                      {a.status === "pending" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(a._id, "confirmed")}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white transition"
                            style={{
                              background:
                                "linear-gradient(135deg,#065f46,#10b981)",
                            }}
                          >
                            Accept
                          </button>

                          <button
                            onClick={() => updateStatus(a._id, "rejected")}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white transition"
                            style={{
                              background:
                                "linear-gradient(135deg,#7f1d1d,#ef4444)",
                            }}
                          >
                            Cancelled
                          </button>
                        </div>
                      ) : a.status === "confirmed" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStatus(a._id, "completed")}
                            className="px-4 py-1.5 rounded-xl text-xs font-bold text-white transition"
                            style={{
                              background:
                                "linear-gradient(135deg,#1e3a8a,#3b82f6)",
                            }}
                          >
                            Complete
                          </button>

                          <button
                            onClick={() => setSelectedAppt(a)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                          >
                            <Icon.Eye />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 text-sm">
                            {a.status === "rejected"
                              ? "Cancelled"
                              : a.status.charAt(0).toUpperCase() +
                                a.status.slice(1)}
                          </span>

                          <button
                            onClick={() => setSelectedAppt(a)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                          >
                            <Icon.Eye />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // Section: Upcoming
  const renderUpcoming = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-white text-xl">Upcoming Appointments</h3>
        <p className="text-xs text-slate-400 mt-1">
          {upcomingAppts.length} upcoming appointments
        </p>
      </div>
      {upcomingAppts.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-slate-600 mb-3 flex items-center justify-center">
            <Icon.Sparkle />
          </p>
          <p className="text-slate-400 font-semibold">
            No upcoming appointments
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingAppts.map((a) => (
            <div
              key={a._id}
              className="rounded-2xl p-5 flex items-center justify-between gap-4 transition"
              style={{
                background: "#1a1d2e",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
              }
            >
              <div className="flex items-center gap-4">
                <Avatar name={a.patient?.name} size="lg" />
                <div>
                  <p className="font-bold text-white">
                    {a.patient?.name || "Unknown"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {a.patient?.email || ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-white font-semibold text-sm">
                    {formatDate(a.date)}
                  </p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {formatTime(a.time)}
                  </p>
                </div>
                <StatusBadge status={a.status} />
                <button
                  onClick={() => setSelectedAppt(a)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 transition"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <Icon.Eye />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Section: Pending Requests
  const renderPending = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-white text-xl">Pending Requests</h3>
          <p className="text-xs text-slate-400 mt-1">
            {pendingAppts.length} pending requests
          </p>
        </div>
        {pendingAppts.length > 0 && (
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-xl animate-pulse inline-flex items-center gap-1.5"
            style={{
              background: "rgba(245,158,11,0.15)",
              color: "#f59e0b",
              border: "1px solid rgba(245,158,11,0.3)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {pendingAppts.length} pending
          </span>
        )}
      </div>

      {pendingAppts.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="text-emerald-500 mb-3 flex items-center justify-center">
            <div style={{ transform: "scale(3)" }}>
              <Icon.CheckCircle />
            </div>
          </div>

          <p className="text-slate-400 font-semibold">
            You're all caught up! No pending requests
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingAppts.map((a) => (
            <div
              key={a._id}
              className="rounded-2xl p-5 transition"
              style={{
                background: "#1a1d2e",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <Avatar name={a.patient?.name} size="lg" />
                  <div>
                    <p className="font-bold text-white">
                      {a.patient?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {a.patient?.email || ""}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg font-medium inline-flex items-center gap-1"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#94a3b8",
                        }}
                      >
                        <Icon.CalendarSmall /> {formatDate(a.date)}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-lg font-medium inline-flex items-center gap-1"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#94a3b8",
                        }}
                      >
                        <Icon.Clock /> {formatTime(a.time)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateStatus(a._id, "confirmed")}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition shadow-lg hover:shadow-green-500/20"
                    style={{
                      background: "linear-gradient(135deg,#065f46,#10b981)",
                    }}
                  >
                    <Icon.Check /> Accept
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, "rejected")}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition shadow-lg hover:shadow-red-500/20"
                    style={{
                      background: "linear-gradient(135deg,#7f1d1d,#ef4444)",
                    }}
                  >
                    <Icon.X /> Cancelled
                  </button>
                  <button
                    onClick={() => setSelectedAppt(a)}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 transition"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Icon.Eye />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Section: All Patients
  const renderPatients = () => (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white text-xl">All Patients</h3>
          <p className="text-xs text-slate-400 mt-1">
            {uniquePatients.length} unique patients
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
            <Icon.Search />
          </span>
          <input
            type="text"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            style={{
              background: "#1a1d2e",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div
          className="rounded-2xl text-center py-16"
          style={{
            background: "#1a1d2e",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-slate-600 mb-3 flex items-center justify-center">
            <Icon.UserCircle />
          </p>
          <p className="text-slate-400">No patients found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl p-5 transition hover:scale-[1.01]"
              style={{
                background: "#1a1d2e",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar name={p.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white truncate">
                    {p.name || "Unknown"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {p.email || "No email"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span
                  className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                  style={{
                    background: "rgba(167,139,250,0.15)",
                    color: "#a78bfa",
                    border: "1px solid rgba(167,139,250,0.3)",
                  }}
                >
                  {p.apptCount} appointments
                </span>
                {p.lastAppt && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                    style={{
                      background: "rgba(148,163,184,0.1)",
                      color: "#94a3b8",
                      border: "1px solid rgba(148,163,184,0.2)",
                    }}
                  >
                    Last: {formatDate(p.lastAppt.date)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  //  MAIN RENDER
  const doctorName = doctorInfo?.name
    ? doctorInfo.name.toLowerCase().startsWith("dr")
      ? doctorInfo.name
      : `Dr. ${doctorInfo.name}`
    : "Dr. Doctor";

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "#0f1120", fontFamily: "'Segoe UI', sans-serif" }}
    >
      {/* MODALS */}
      {selectedAppt && (
        <DetailModal
          appt={selectedAppt}
          onClose={() => setSelectedAppt(null)}
          onUpdate={updateStatus}
        />
      )}

      {/*SIDEBAR*/}
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
            style={{ background: "linear-gradient(135deg,#064e3b,#10b981)" }}
          >
            <Icon.Hospital />
          </div>
          <div>
            <p className="font-bold text-white text-base">MediCare</p>
            <p className="text-xs text-emerald-400">Doctor Portal</p>
          </div>
        </div>

        {/* Doctor Info */}
        <div
          className="px-6 py-5 flex items-center gap-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Avatar name={doctorInfo?.name || "D"} size="lg" />
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">
              {doctorName}
            </p>
            <p className="text-xs text-slate-500">
              {doctorInfo?.specialization || "Doctor"}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ key, label, icon, badge, accent }) => {
            const active = activeSection === key;
            return (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition"
                style={{
                  background: active ? `${accent}18` : "transparent",
                  color: active ? "#fff" : "#64748b",
                  border: active
                    ? `1px solid ${accent}35`
                    : "1px solid transparent",
                }}
              >
                <span style={{ color: active ? accent : "#475569" }}>
                  {icon}
                </span>
                <span className="flex-1 text-left">{label}</span>
                {badge > 0 && (
                  <span
                    className="text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    style={{ background: active ? accent : "#374151" }}
                  >
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 transition"
            style={{ border: "1px solid rgba(239,68,68,0.2)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <Icon.Logout />
            Logout
          </button>
        </div>
      </aside>

      {/*  MAIN  */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between"
          style={{
            background: "rgba(15,17,32,0.95)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h1 className="text-white font-bold text-lg">
              {activeSection === "today"
                ? "Today's Schedule"
                : activeSection === "upcoming"
                  ? "Upcoming Appointments"
                  : activeSection === "pending"
                    ? "Pending Requests"
                    : "All Patients"}
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

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
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
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{
                      background: "linear-gradient(135deg,#064e3b,#10b981)",
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
                        className="text-emerald-200 hover:text-white text-xs transition"
                      >
                        Mark all read
                      </button>
                      <button
                        onClick={() => setShowNotif(false)}
                        className="text-emerald-200 hover:text-white"
                      >
                        <Icon.X />
                      </button>
                    </div>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-8">
                      No notifications
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 transition cursor-pointer"
                        style={{
                          background: !n.read
                            ? "rgba(16,185,129,0.07)"
                            : "transparent",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                        }}
                        onClick={() =>
                          setNotifications((ns) =>
                            ns.map((x) =>
                              x.id === n.id ? { ...x, read: true } : x,
                            ),
                          )
                        }
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? "bg-emerald-500" : "bg-slate-600"}`}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotifications((ns) =>
                              ns.filter((x) => x.id !== n.id),
                            );
                          }}
                          className="text-slate-600 hover:text-red-400 transition mt-0.5"
                        >
                          <Icon.X />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Doctor avatar */}
            <div className="flex items-center gap-2">
              <Avatar name={doctorInfo?.name || "D"} />
            </div>
          </div>
        </header>

        {/* Content */}
        <main
          className="flex-1 p-6 overflow-auto"
          onClick={() => setShowNotif(false)}
        >
          {activeSection === "today" && renderToday()}
          {activeSection === "upcoming" && renderUpcoming()}
          {activeSection === "pending" && renderPending()}
          {activeSection === "patients" && renderPatients()}
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;
