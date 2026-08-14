const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const Appointment = require("../models/Appointment");
const User = require("../models/User");

// CREATE APPOINTMENT
router.post("/create", protect, async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check doctor valid hai
    const doctorUser = await User.findById(doctor);
    if (!doctorUser || doctorUser.role !== "doctor") {
      return res.status(400).json({ message: "Invalid doctor" });
    }

    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: { $ne: "rejected" },
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked",
      });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PATIENT APPOINTMENTS
router.get("/my", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user._id,
      status: { $in: ["pending", "confirmed", "rejected", "completed"] },
    }).populate("doctor", "name email specialization");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DOCTOR APPOINTMENTS
router.get("/doctor", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Doctors only" });
    }
    const appointments = await Appointment.find({
      doctor: req.user._id,
    }).populate("patient", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE STATUS (Doctor/Admin only)
router.put("/status/:id", protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    // check exist
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // PATIENT SECURITY CHECK
    if (
      req.user.role === "patient" &&
      appointment.patient.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    //  Patient sirf cancel kar sakta hai
    if (req.user.role === "patient" && req.body.status !== "rejected") {
      return res.status(403).json({ message: "Patients can only cancel" });
    }

    // valid status check
    const validStatus = ["pending", "confirmed", "rejected", "completed"];
    if (!validStatus.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    appointment.status = req.body.status;
    await appointment.save();

    res.json({ message: "Status updated", appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN - ALL APPOINTMENTS
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name email specialization")
      .populate("patient", "name email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN - DELETE APPOINTMENT
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// RESCHEDULE APPOINTMENT
router.put("/:id", protect, async (req, res) => {
  try {
    const { date, time } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // only patient can reschedule
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;

    await appointment.save();

    res.json({
      message: "Appointment rescheduled",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
