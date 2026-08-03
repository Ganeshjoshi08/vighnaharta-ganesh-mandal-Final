const express = require("express");
const router = express.Router();

const Announcement = require("../models/Announcement");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { logActivity, createNotification } = require("../utils/activityLogger");

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

    await logActivity(req.user.name, "Announcement Added");
    await createNotification(
      "ANNOUNCEMENT",
      "New Announcement 📢",
      message.length > 50 ? `${message.substring(0, 50)}...` : message,
      "/announcements"
    );

    res.json({ msg: "Announcement added ✅" });
  } catch (err) {
    res.status(500).json({ msg: "Error adding ❌" });
  }
});

// ❌ DELETE (ADMIN)
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const oldAnn = await Announcement.findById(req.params.id);
    if (oldAnn) {
      await Announcement.findByIdAndDelete(req.params.id);
      await logActivity(req.user.name, "Announcement Deleted");
    }
    res.json({ msg: "Deleted ✅" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting ❌" });
  }
});

module.exports = router;