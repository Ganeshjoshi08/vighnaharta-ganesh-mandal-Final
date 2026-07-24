const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Donation = require("../models/Donation");
const Event = require("../models/Event");

const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 👤 USERS (ADMIN)
//--------------------------------------------------
router.get("/users", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.log("USERS ERROR:", err);
    res.status(500).json({ msg: "Error fetching users ❌" });
  }
});

//--------------------------------------------------
// 💰 DONATIONS (ADMIN)
//--------------------------------------------------
router.get("/donations", protect, isAdmin, async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(donations);
  } catch (err) {
    console.log("DONATION ERROR:", err);
    res.status(500).json({ msg: "Error fetching donations ❌" });
  }
});

//--------------------------------------------------
// 🎉 EVENTS (GET)
//--------------------------------------------------
router.get("/events", protect, isAdmin, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json(events);
  } catch (err) {
    console.log("EVENT FETCH ERROR:", err);
    res.status(500).json({ msg: "Error fetching events ❌" });
  }
});

//--------------------------------------------------
// ➕ ADD EVENT (FIXED)
//--------------------------------------------------
router.post("/events", protect, isAdmin, async (req, res) => {
  try {
    let { title, description, date, location, image } = req.body;

    // 🔥 USER SAFETY CHECK (MAIN FIX)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "Unauthorized ❌" });
    }

    // 🔥 CLEAN
    title = title?.trim();
    description = description?.trim();

    // 🔥 VALIDATION
    if (!title || title.length < 3) {
      return res.status(400).json({ msg: "Title min 3 chars ❌" });
    }

    if (!description || description.length < 5) {
      return res.status(400).json({ msg: "Description min 5 chars ❌" });
    }

    if (!date) {
      return res.status(400).json({ msg: "Date required ❌" });
    }

    // 🔥 DATE FIX
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ msg: "Invalid date ❌" });
    }

    const newEvent = new Event({
      title,
      description,
      date: parsedDate,
      location: location || "",
      image: image || "",
      createdBy: req.user._id // 🔥 CRITICAL FIX
    });

    await newEvent.save();

    res.status(201).json({
      msg: "Event added successfully 🎉",
      event: newEvent
    });

  } catch (err) {
    console.log("🔥 FULL EVENT ERROR:", err);
    res.status(500).json({
      msg: err.message || "Server error ❌"
    });
  }
});

//--------------------------------------------------
// ❌ DELETE EVENT
//--------------------------------------------------
router.delete("/events/:id", protect, isAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found ❌" });
    }

    await event.deleteOne();

    res.status(200).json({ msg: "Event deleted successfully ❌" });
  } catch (err) {
    console.log("DELETE EVENT ERROR:", err);
    res.status(500).json({ msg: "Error deleting event ❌" });
  }
});

//--------------------------------------------------
// 🎫 REGISTRATIONS (ADMIN)
//--------------------------------------------------
router.get("/registrations", protect, isAdmin, async (req, res) => {
  try {
    const registrations = await require("../models/Registration").find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (err) {
    console.log("REGISTRATION FETCH ERROR:", err);
    res.status(500).json({ msg: "Error fetching registrations ❌" });
  }
});

module.exports = router;