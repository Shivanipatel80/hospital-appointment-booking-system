const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// profile
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});


// GET DOCTORS
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    console.log("DOCTORS 👉", doctors);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
});


// UPDATE DOCTOR
router.put("/doctors/:id", async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Doctor updated", doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE DOCTOR
router.delete("/doctors/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ADD DOCTOR (ADMIN)
router.post("/doctors", protect, async (req, res) => {
  try {
    const { name, email, phone, specialization, password, consultFee } = req.body;

    // validation
    if (!name || !specialization || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const doctor = await User.create({
      name,
      email,
      phone,
      specialization,
      consultFee,
      role: "doctor",
      password,
    });

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;