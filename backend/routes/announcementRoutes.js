const express = require("express");
const router = express.Router();

const Announcement = require("../models/Announcement");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// 📢 GET ALL (PUBLIC)
router.get("/", async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching announcements ❌" });
  }
});

// ➕ ADD (ADMIN)
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ msg: "Message required ❌" });
    }

    const newA = new Announcement({ message });
    await newA.save();

    res.json({ msg: "Announcement added ✅" });
  } catch (err) {
    res.status(500).json({ msg: "Error adding ❌" });
  }
});

// ❌ DELETE (ADMIN)
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted ✅" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting ❌" });
  }
});

module.exports = router;