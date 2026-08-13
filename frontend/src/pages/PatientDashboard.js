import { useEffect, useState, useCallback, useRef } from "react";
import API from "../services/api";
import {
  FaBell,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaListAlt,
  FaHospital,
  FaTimes,
  FaTrash,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaTimesCircle,
  FaPrint,
  FaDownload,
  FaStar,
  FaRedo,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const ITEMS_PER_PAGE = 8;

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("All");
  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("book");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const [showSlip, setShowSlip] = useState(false);
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const slipRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const getDoctorName = (doctor) => {
    if (!doctor || !doctor.name) return "Unknown Doctor";
    if (doctor.name.toLowerCase().startsWith("dr")) return doctor.name;
    return "Dr. " + doctor.name;
  };

  const formatDate = (d) => {
    if (!d) return "--";

    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (t) => {
    if (!t) return "--";

    return new Date(`1970-01-01T${t}`).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isAppointmentPast = (a) => {
    if (!a.date || !a.time) return false;
    return new Date(`${a.date.slice(0, 10)}T${a.time}`) < new Date();
  };

  const generateNotifications = useCallback((appts) => {
    const notifs = [];
    const now = new Date();
    appts.forEach((a) => {
      const dName = getDoctorName(a.doctor);
      const apptDT = a.date
        ? new Date(`${a.date.slice(0, 10)}T${a.time || "00:00"}`)
        : null;
      const isPast = apptDT ? apptDT < now : false;
      const dateLabel = a.date
        ? new Date(a.date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : "";
      const timeLabel = a.time
        ? new Date(`1970-01-01T${a.time}`).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      if (a.status === "confirmed" && !isPast)
        notifs.push({
          id: `c-${a._id}`,
          msg: `Appointment confirmed with ${dName} on ${dateLabel} at ${timeLabel}`,
          time: dateLabel,
          read: false,
          type: "confirmed",
        });
      if (a.status === "rejected")
        notifs.push({
          id: `r-${a._id}`,
          msg: `Appointment with ${dName} was cancelled`,
          time: dateLabel,
          read: true,
          type: "rejected",
        });
      if (a.status === "pending" && apptDT && !isPast) {
        const h = (apptDT - now) / 3600000;
        if (h <= 24)
          notifs.push({
            id: `rem-${a._id}`,
            msg: `Reminder: ${dName} appointment in ${Math.round(h)}h`,
            time: "Today",
            read: false,
            type: "reminder",
          });
        else
          notifs.push({
            id: `b-${a._id}`,
            msg: `Booked with ${dName} on ${dateLabel} at ${timeLabel}`,
            time: dateLabel,
            read: false,
            type: "booked",
          });
      }
    });
    return notifs.slice(0, 10);
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data);
      setNotifications(generateNotifications(res.data));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  }, [generateNotifications]);

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await API.get("/auth/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, [fetchAppointments, fetchDoctors]);

  const upcomingAppointments = appointments.filter(
    (a) => a.status !== "rejected" && !isAppointmentPast(a),
  );
  const historyAppointments = appointments.filter(
    (a) =>
      a.status === "confirmed" ||
      a.status === "rejected" ||
      a.status === "completed" ||
      isAppointmentPast(a),
  );

  const filteredHistory = historyAppointments
    .filter((a) => {
      const ms =
        getDoctorName(a.doctor)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (a.doctor?.specialization || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const mf = statusFilter === "All" || a.status === statusFilter;
      return ms && mf;
    })
    .sort((a, b) => {
      const da = new Date(`${a.date?.slice(0, 10)}T${a.time}`);
      const db = new Date(`${b.date?.slice(0, 10)}T${b.time}`);
      return sortOrder === "desc" ? db - da : da - db;
    });

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const bookAppointment = async () => {
    if (!doctorId || !date || !time) return alert("Please fill all fields");
    try {
      await API.post("/appointments/create", { doctor: doctorId, date, time });
      alert("Appointment booked successfully!");
      setDoctorId("");
      setDate("");
      setTime("");
      fetchAppointments();
    } catch {
      alert("Error booking appointment");
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await API.put(`/appointments/status/${id}`, {
        status: "rejected",
      });

      fetchAppointments();
    } catch (error) {
      console.error("Cancel failed:", error);
      alert("Failed to cancel appointment");
    }
  };

  const handleReschedule = async () => {
    if (!rescheduleDate || !rescheduleTime) {
      return alert("Select date and time");
    }

    // Check duplicate slot
    const alreadyBooked = appointments.some(
      (a) =>
        a._id !== rescheduleAppt._id &&
        a.doctor?._id === rescheduleAppt.doctor?._id &&
        a.date?.slice(0, 10) === rescheduleDate &&
        a.time === rescheduleTime &&
        a.status !== "rejected",
    );

    if (alreadyBooked) {
      return alert("This slot is already booked");
    }
    try {
      await API.put(`/appointments/${rescheduleAppt._id}`, {
        date: rescheduleDate,
        time: rescheduleTime,
      });

      alert("Appointment rescheduled!");

      setRescheduleAppt(null);
      setRescheduleDate("");
      setRescheduleTime("");

      fetchAppointments();
    } catch {
      alert("Reschedule failed. Check backend support.");
    }
  };
  const printSlip = () => {
    const content = slipRef.current?.innerHTML;
    const w = window.open("", "_blank");
    if (!w) {
      alert("Popup blocked");
      return;
    }
    w.document.write(`<html><head><title>Appointment Slip</title><style>
      body{font-family:Segoe UI,sans-serif;padding:30px;max-width:480px;margin:auto}
      .header{text-align:center;border-bottom:2px solid #2563eb;padding-bottom:12px;margin-bottom:20px}
      .title{font-size:22px;font-weight:700;color:#1e3a5f}
      .sub{color:#64748b;font-size:13px}
      .row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:0.5px solid #e2e8f0;font-size:14px}
      .label{color:#64748b;font-weight:500}.val{font-weight:600;color:#1e293b}
      .badge{display:inline-block;padding:4px 14px;border-radius:6px;font-size:12px;font-weight:600;background:#dcfce7;color:#166534}
      .footer{text-align:center;margin-top:20px;font-size:12px;color:#94a3b8}
    </style></head><body>${content}</body></html>`);
    w.document.close();
    w.print();
  };

  const markAllRead = () =>
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  const deleteNotif = (id) =>
    setNotifications((n) => n.filter((x) => x.id !== id));

  const filteredDoctors =
    filter === "All"
      ? doctors
      : doctors.filter((d) => d.specialization === filter);
  const timeSlots = [
    "11:00",
    "12:00",
    "13:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];
  const todayStr = new Date().toISOString().split("T")[0];
  const now = new Date();
  const currentTimeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const isSlotDisabled = (slot) => {
    if (!doctorId || !date) return true; // 👈 yeh line badli/add hui
    if (date === todayStr && slot <= currentTimeStr) return true;
    return appointments.some(
      (a) =>
        a.doctor?._id === doctorId &&
        a.date?.slice(0, 10) === date &&
        a.time === slot &&
        a.status !== "rejected",
    );
  };
  const selectedDoctor = filteredDoctors.find((d) => d._id === doctorId);

  const avatarColors = [
    "#2563eb",
    "#059669",
    "#7c3aed",
    "#db2777",
    "#d97706",
    "#0891b2",
  ];
  const getAvatarColor = (name) =>
    avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];
  const getInitial = (name) => (name || "?").charAt(0).toUpperCase();

  const StatusBadge = ({ status }) => {
    const s = {
      confirmed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      rejected: "bg-red-500/15 text-red-400 border-red-500/30",
      pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      completed: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    };
    const icons = {
      confirmed: "✓",
      rejected: "✕",
      pending: "⏳",
      completed: "✔",
    };
    const labels = {
      confirmed: "Confirmed",
      rejected: "Cancelled",
      pending: "Pending",
      completed: "Completed",
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${s[status] || s.pending}`}
      >
        {icons[status]}{" "}
        {labels[status] || status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const DoctorCard = ({ doctor }) => (
    <div
      className="flex items-center gap-4 p-4 rounded-2xl border mb-5 transition-all hover:border-blue-500/30"
      style={{
        background: "linear-gradient(135deg, #141b36 0%, #171f3d 100%)",
        borderColor: "rgba(59,130,246,0.18)",
      }}
    >
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ring-2"
        style={{
          background: getAvatarColor(doctor?.name),
          boxShadow: "0 0 0 3px rgba(59,130,246,0.12)",
        }}
      >
        {getInitial(doctor?.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-white text-sm truncate">
            {getDoctorName(doctor)}
          </p>
          <FaCheckCircle
            className="text-blue-400 flex-shrink-0"
            style={{ fontSize: "11px" }}
            title="Verified"
          />
        </div>
        <p className="text-xs text-blue-400 font-medium uppercase tracking-wide mt-0.5">
          {doctor?.specialization || "General"}
        </p>
        <div className="flex items-center gap-1 mt-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar
              key={s}
              className={s <= 4 ? "text-amber-400" : "text-slate-700"}
              style={{ fontSize: "10px" }}
            />
          ))}
          <span className="text-xs text-slate-500 ml-1.5">4.0 rating</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {doctor?.phone && (
            <span className="text-xs text-slate-400">📞 {doctor.phone}</span>
          )}

          {doctor?.consultFee !== undefined && doctor?.consultFee !== null && (
            <span className="text-xs text-slate-400">
              💰 ₹{doctor.consultFee} consultation fee
            </span>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">
        <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available
        </span>
      </div>
    </div>
  );
  const AppointmentSlip = ({ appt }) => (
    <div ref={slipRef}>
      <div className="header">
        <div className="title">MediCare Hospital</div>
        <div className="sub">Appointment Confirmation Slip</div>
      </div>
      <div className="row">
        <span className="label">Appointment ID</span>
        <span className="val">#{appt._id?.slice(-6).toUpperCase()}</span>
      </div>
      <div className="row">
        <span className="label">Patient Name</span>
        <span className="val">{user?.name}</span>
      </div>
      <div className="row">
        <span className="label">Doctor</span>
        <span className="val">{getDoctorName(appt.doctor)}</span>
      </div>
      <div className="row">
        <span className="label">Specialization</span>
        <span className="val">{appt.doctor?.specialization || "General"}</span>
      </div>
      <div className="row">
        <span className="label">Date</span>
        <span className="val">{formatDate(appt.date)}</span>
      </div>
      <div className="row">
        <span className="label">Time</span>
        <span className="val">{formatTime(appt.time)}</span>
      </div>
      <div className="row">
        <span className="label">Status</span>
        <span className="badge">
          {appt.status === "rejected"
            ? "Cancelled"
            : appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
        </span>
      </div>
    </div>
  );
  const navItems = [
    {
      key: "book",
      label: "Book Appointment",
      icon: <FaCalendarAlt />,
      badge: 0,
    },
    {
      key: "upcoming",
      label: "Upcoming",
      icon: <FaClock />,
      badge: upcomingAppointments.length,
    },
    { key: "history", label: "History", icon: <FaListAlt />, badge: 0 },
  ];
  return (
    <div className="min-h-screen flex" style={{ background: "#070b1d" }}>
      {/* ── SIDEBAR ── */}
      <aside
        className="hidden md:flex flex-col w-56 min-h-screen sticky top-0 z-30"
        style={{ background: "#0b1023" }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <FaHospital className="text-white text-sm" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">MediCare</p>
              <p className="text-blue-400 text-xs">Patient Portal</p>
            </div>
          </div>
        </div>
        <div
          className="px-5 py-3.5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ background: getAvatarColor(user?.name) }}
            >
              {getInitial(user?.name)}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{user?.name}</p>
              <p className="text-blue-400 text-xs">Patient</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setCurrentPage(1);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.key
                  ? "bg-blue-600 text-white"
                  : "text-blue-300 hover:bg-white hover:bg-opacity-5 hover:text-white"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-amber-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div
          className="px-3 py-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            <FaTimes className="text-sm" /> Logout
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header
          className="border-b px-6 py-3 flex justify-between items-center sticky top-0 z-20"
          style={{
            background: "#0b1023",
            borderColor: "rgba(255,255,255,0.07)",
          }}
        >
          <div>
            <p className="font-semibold text-white">
              {navItems.find((n) => n.key === activeTab)?.label}
            </p>
            <p className="text-slate-400 text-xs mt-0.5">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotif((p) => !p)}
                className="relative p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition"
              >
                <FaBell />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotif && (
                <div
                  className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border z-50 overflow-hidden"
                  style={{
                    background: "#12182f",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-2.5 border-b"
                    style={{
                      background: "#161d35",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <span className="font-semibold text-white text-sm">
                      Notifications
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={markAllRead}
                        className="text-blue-400 text-xs font-medium hover:text-blue-300"
                      >
                        Mark all read
                      </button>
                      <button
                        onClick={() => setShowNotif(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="max-h-72 overflow-y-auto divide-y"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-500 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition ${!n.read ? "bg-blue-500/10" : ""}`}
                        >
                          <div
                            className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                              n.type === "confirmed"
                                ? "bg-emerald-500"
                                : n.type === "rejected"
                                  ? "bg-red-400"
                                  : n.type === "reminder"
                                    ? "bg-amber-500"
                                    : "bg-blue-500"
                            }`}
                          />
                          <div className="flex-1">
                            <p
                              className={`text-xs ${!n.read ? "text-white font-medium" : "text-slate-500"}`}
                            >
                              {n.msg}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {n.time}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteNotif(n.id)}
                            className="text-slate-600 hover:text-red-400 transition"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
                style={{ background: getAvatarColor(user?.name) }}
              >
                {getInitial(user?.name)}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
          </div>
        </header>
        <main
          className="flex-1 p-6 space-y-5"
          onClick={() => setShowNotif(false)}
        >
          {/* ── STATS ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Appointments",
                value: appointments.length,
                icon: <FaListAlt />,
                color: "#3b82f6",
              },
              {
                label: "Confirmed",
                value: appointments.filter((a) => a.status === "confirmed")
                  .length,
                icon: <FaCheckCircle />,
                color: "#10b981",
              },
              {
                label: "Pending",
                value: appointments.filter((a) => a.status === "pending")
                  .length,
                icon: <FaClock />,
                color: "#f59e0b",
              },
              {
                label: "Cancelled",
                value: appointments.filter((a) => a.status === "rejected")
                  .length,
                icon: <FaTimesCircle />,
                color: "#ef4444",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-5 border overflow-hidden flex items-center gap-4 transition-all hover:-translate-y-1 group"
                style={{
                  background:
                    "linear-gradient(135deg, #12182f 0%, #141a33 100%)",
                  borderColor: `${s.color}33`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at top right, ${s.color}22, transparent 70%)`,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0 relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)`,
                    boxShadow: `0 4px 14px ${s.color}40`,
                  }}
                >
                  {s.icon}
                </div>
                <div className="relative z-10 min-w-0">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider truncate">
                    {s.label}
                  </p>
                  <p
                    className="text-3xl font-semibold mt-0.5"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── BOOK APPOINTMENT ── */}
          {activeTab === "book" && (
            <div
              className="rounded-2xl border overflow-hidden shadow-sm"
              style={{
                background: "#12182f",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="px-6 py-4 border-b border-gray-100 flex items-center gap-2.5"
                style={{
                  background: "#161d35",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">
                  <FaCalendarAlt />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">
                    Book New Appointment
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in the details to schedule your visit
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                      Specialization
                    </label>
                    <select
                      onChange={(e) => {
                        setFilter(e.target.value);
                        setDoctorId("");
                      }}
                      className="w-full px-3 py-2.5 border border-slate-700 rounded-lg text-sm text-white bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="All">All Specializations</option>

                      {SPECIALIZATIONS.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Select Doctor
                    </label>
                    <select
                      value={doctorId}
                      onChange={(e) => setDoctorId(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-700 rounded-lg text-sm text-white bg-[#0f172a] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                      <option value="">Select Doctor</option>
                      {filteredDoctors.map((d) => (
                        <option key={d._id} value={d._id}>
                          {getDoctorName(d)} — {d.specialization || "General"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Doctor Card */}
                {selectedDoctor && <DoctorCard doctor={selectedDoctor} />}

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Select Date
                    {!doctorId && (
                      <span className="ml-2 text-blue-400 normal-case font-normal text-xs">
                        select a doctor first
                      </span>
                    )}
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="date"
                      value={date}
                      min={todayStr}
                      disabled={!doctorId}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTime("");
                      }}
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-9 transition ${
                        !doctorId
                          ? "bg-[#0c1226] border-slate-800 text-slate-600 cursor-not-allowed"
                          : "bg-[#0f172a] border-slate-700 text-white [color-scheme:dark]"
                      }`}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Available Time Slots
                    {!doctorId || !date ? (
                      <span className="ml-2 text-blue-400 normal-case font-normal text-xs">
                        select doctor &amp; date first
                      </span>
                    ) : (
                      date === todayStr && (
                        <span className="ml-2 text-amber-600 normal-case font-normal text-xs">
                          — past slots unavailable
                        </span>
                      )
                    )}
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {timeSlots.map((t) => {
                      const disabled = isSlotDisabled(t);
                      const selected = time === t;
                      return (
                        <button
                          key={t}
                          onClick={() => !disabled && setTime(t)}
                          disabled={disabled}
                          className={`py-2.5 rounded-lg text-xs font-medium border transition-all ${
                            selected
                              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-lg scale-105"
                              : disabled
                                ? "bg-[#1a2238] text-slate-600 border-slate-800 cursor-not-allowed line-through"
                                : "bg-[#0f172a] text-slate-300 border-slate-700 hover:border-cyan-400 hover:text-cyan-300 hover:bg-[#172036]"
                          }`}
                        >
                          {formatTime(t + ":00")}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Summary */}
                {/* Summary */}
                {doctorId && date && time && (
                  <div
                    className="mb-5 p-4 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #141b36 0%, #171f3d 100%)",
                      border: "1px solid rgba(59,130,246,0.25)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    }}
                  >
                    <p className="text-xs font-bold text-blue-300 uppercase tracking-wide mb-3">
                      Appointment Summary
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-slate-400 text-xs">Doctor</span>
                        <p className="font-semibold text-white mt-0.5">
                          {getDoctorName(selectedDoctor)}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs">
                          Specialization
                        </span>
                        <p className="font-semibold text-white mt-0.5">
                          {selectedDoctor?.specialization || "General"}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs">Date</span>
                        <p className="font-semibold text-white mt-0.5">
                          {formatDate(date)}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 text-xs">Time</span>
                        <p className="font-semibold text-white mt-0.5">
                          {formatTime(time + ":00")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={bookAppointment}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-semibold transition shadow-sm"
                >
                  Confirm Booking →
                </button>
              </div>
            </div>
          )}

          {/* ── UPCOMING ── */}
          {activeTab === "upcoming" && (
            <div
              className="rounded-2xl border overflow-hidden shadow-sm"
              style={{
                background: "#12182f",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="px-6 py-4 border-b flex items-center gap-2.5"
                style={{
                  background: "#161d35",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">
                  <FaClock />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">
                    Upcoming Appointments
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage your scheduled visits
                  </p>
                </div>
                {upcomingAppointments.length > 0 && (
                  <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {upcomingAppointments.length} pending
                  </span>
                )}
              </div>

              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#1a2238] flex items-center justify-center mx-auto mb-4">
                    <FaCalendarAlt className="text-slate-500 text-2xl" />
                  </div>
                  <p className="text-slate-300 font-semibold">
                    No appointments scheduled
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Enjoy your free time today
                  </p>
                  <button
                    onClick={() => setActiveTab("book")}
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ) : (
                <div
                  className="divide-y"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  {upcomingAppointments.map((a) => (
                    <div
                      key={a._id}
                      className="px-6 py-4 hover:bg-white/[0.03] transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                            style={{
                              background: getAvatarColor(a.doctor?.name),
                            }}
                          >
                            {getInitial(a.doctor?.name)}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-sm">
                              {getDoctorName(a.doctor)}
                            </p>
                            <p className="text-xs text-slate-500">
                              {a.doctor?.specialization || "General"}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <FaCalendarAlt className="text-blue-400" />{" "}
                                {formatDate(a.date)}
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <FaClock className="text-amber-400" />{" "}
                                {formatTime(a.time)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={a.status} />
                          <button
                            onClick={() => setRescheduleAppt(a)}
                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                            title="Reschedule"
                          >
                            <FaRedo className="text-xs" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAppt(a);
                              setShowSlip(true);
                            }}
                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 transition"
                            title="View / Print Slip"
                          >
                            <FaPrint className="text-xs" />
                          </button>
                          <button
                            onClick={() => cancelAppointment(a._id)}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                            title="Cancel"
                          >
                            <FaTimesCircle className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── HISTORY ── */}
          {activeTab === "history" && (
            <div
              className="rounded-2xl border overflow-hidden shadow-sm"
              style={{
                background: "#12182f",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="px-6 py-4 border-b"
                style={{
                  background: "#161d35",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                    <FaListAlt />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      Appointment History
                    </h3>
                    <p className="text-xs text-slate-500">
                      Your past visits and records
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative flex-1 min-w-[140px]">
                    <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                    <input
                      type="text"
                      placeholder="Search doctor or specialization..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-7 pr-3 py-2 border border-slate-700 bg-[#0f172a] text-white placeholder-slate-500 rounded-lg text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <FaFilter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-7 pr-3 py-2 border border-slate-700 rounded-lg text-xs bg-[#0f172a] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="All">All Status</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="rejected">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <button
                    onClick={() =>
                      setSortOrder((s) => (s === "desc" ? "asc" : "desc"))
                    }
                    className="flex items-center gap-1.5 px-3 py-2 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 hover:bg-white/5 transition"
                  >
                    <FaSortAmountDown />{" "}
                    {sortOrder === "desc" ? "Newest" : "Oldest"}
                  </button>
                </div>
              </div>

              {filteredHistory.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#1a2238] flex items-center justify-center mx-auto mb-4">
                    <FaListAlt className="text-slate-500 text-2xl" />
                  </div>
                  <p className="text-slate-300 font-semibold">
                    No history found
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className="flex items-center justify-between px-6 py-2 border-b"
                    style={{
                      background: "#161d35",
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <p className="text-xs text-slate-500">
                      {filteredHistory.length} records found
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[540px]">
                      <thead>
                        <tr
                          className="border-b"
                          style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                          {[
                            "Doctor",
                            "Specialization",
                            "Date",
                            "Time",
                            "Status",
                            "Action",
                          ].map((h) => (
                            <th
                              key={h}
                              className="py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedHistory.map((a) => (
                          <tr
                            key={a._id}
                            className="border-b hover:bg-white/[0.03] transition group"
                            style={{ borderColor: "rgba(255,255,255,0.05)" }}
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                                  style={{
                                    background: getAvatarColor(a.doctor?.name),
                                  }}
                                >
                                  {getInitial(a.doctor?.name)}
                                </div>
                                <span className="font-semibold text-white">
                                  {getDoctorName(a.doctor)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">
                              {a.doctor?.specialization || "—"}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {formatDate(a.date)}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {formatTime(a.time)}
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusBadge status={a.status} />
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => {
                                  setSelectedAppt(a);
                                  setShowSlip(true);
                                }}
                                className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:bg-blue-500/10 px-2.5 py-1.5 rounded-lg transition"
                              >
                                <FaDownload className="text-xs" /> Slip
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div
                      className="flex items-center justify-between px-6 py-3 border-t"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <p className="text-xs text-slate-500">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                        {Math.min(
                          currentPage * ITEMS_PER_PAGE,
                          filteredHistory.length,
                        )}{" "}
                        of {filteredHistory.length}
                      </p>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-white/5 disabled:opacity-40 transition"
                        >
                          <FaChevronLeft className="text-xs" />
                        </button>
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((p) => (
                          <button
                            key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`w-7 h-7 rounded-lg text-xs font-medium transition ${
                              p === currentPage
                                ? "bg-blue-600 text-white"
                                : "border border-slate-700 text-slate-400 hover:bg-white/5"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-white/5 disabled:opacity-40 transition"
                        >
                          <FaChevronRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── APPOINTMENT SLIP MODAL ── */}
      {showSlip && selectedAppt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
          style={{ minHeight: "100vh" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div
              className="px-6 py-4 flex items-center justify-between border-b border-gray-100"
              style={{ background: "#f8fafc" }}
            >
              <div className="flex items-center gap-2">
                <FaPrint className="text-blue-600" />
                <span className="font-semibold text-gray-800">
                  Appointment Slip
                </span>
              </div>
              <button
                onClick={() => setShowSlip(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              {/* Slip content */}
              <div className="text-center border-b border-gray-200 pb-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-2">
                  <FaHospital className="text-white text-lg" />
                </div>
                <p className="font-bold text-gray-800 text-lg">
                  MediCare Hospital
                </p>
                <p className="text-gray-500 text-xs">
                  Appointment Confirmation
                </p>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  {
                    label: "Appointment ID",
                    value: `#${selectedAppt._id?.slice(-6).toUpperCase()}`,
                  },
                  { label: "Patient", value: user?.name },
                  {
                    label: "Doctor",
                    value: getDoctorName(selectedAppt.doctor),
                  },
                  {
                    label: "Specialization",
                    value: selectedAppt.doctor?.specialization || "General",
                  },
                  { label: "Date", value: formatDate(selectedAppt.date) },
                  { label: "Time", value: formatTime(selectedAppt.time) },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <span className="text-xs text-gray-500 font-medium">
                      {row.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-gray-500 font-medium">
                    Status
                  </span>
                  <StatusBadge status={selectedAppt.status} />
                </div>
              </div>
              <div ref={slipRef} style={{ display: "none" }}>
                <AppointmentSlip appt={selectedAppt} />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={printSlip}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  <FaPrint /> Print Slip
                </button>
                <button
                  onClick={() => setShowSlip(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── RESCHEDULE MODAL ── */}
      {rescheduleAppt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
          style={{ minHeight: "100vh" }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div
              className="px-6 py-4 flex items-center justify-between border-b border-gray-100"
              style={{ background: "#f8fafc" }}
            >
              <div className="flex items-center gap-2">
                <FaRedo className="text-blue-600" />
                <span className="font-semibold text-gray-800">
                  Reschedule Appointment
                </span>
              </div>
              <button
                onClick={() => setRescheduleAppt(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">
                  Current appointment
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {getDoctorName(rescheduleAppt.doctor)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(rescheduleAppt.date)} at{" "}
                  {formatTime(rescheduleAppt.time)}
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  min={todayStr}
                  onChange={(e) => {
                    setRescheduleDate(e.target.value);
                    setRescheduleTime("");
                  }}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  New Time Slot
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => {
                    const isPastSlot =
                      rescheduleDate === todayStr && t <= currentTimeStr;

                    const isBooked = appointments.some(
                      (a) =>
                        a._id !== rescheduleAppt._id &&
                        a.doctor?._id === rescheduleAppt.doctor?._id &&
                        a.date?.slice(0, 10) === rescheduleDate &&
                        a.time === t &&
                        a.status !== "rejected",
                    );

                    const disabled = isPastSlot || isBooked;

                    return (
                      <button
                        key={t}
                        disabled={disabled}
                        onClick={() => !disabled && setRescheduleTime(t)}
                        className={`py-2 rounded-lg text-xs font-medium border transition ${
                          rescheduleTime === t
                            ? "bg-blue-600 text-white border-blue-600"
                            : disabled
                              ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed line-through"
                              : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                        }`}
                      >
                        {formatTime(t + ":00")}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleReschedule}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => setRescheduleAppt(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
