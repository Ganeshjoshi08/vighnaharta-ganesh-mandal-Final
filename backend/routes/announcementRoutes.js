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
    const { message, messageMr, messageEn, buttonText, buttonTextEn, buttonLink, showButton, active } = req.body;

    const mainMessage = message || messageMr || messageEn;
    if (!mainMessage) {
      return res.status(400).json({ msg: "Message required ❌" });
    }

    const newA = new Announcement({
      message: mainMessage,
      messageMr: messageMr || mainMessage,
      messageEn: messageEn || mainMessage,
      buttonText: buttonText || "येथे क्लिक करा",
      buttonTextEn: buttonTextEn || "Click Here",
      buttonLink: buttonLink || "/schedule",
      showButton: showButton !== undefined ? showButton : true,
      active: active !== undefined ? active : true
    });

    await newA.save();

    await logActivity(req.user.name, "Announcement Added");
    await createNotification(
      "ANNOUNCEMENT",
      "New Announcement 📢",
      mainMessage.length > 50 ? `${mainMessage.substring(0, 50)}...` : mainMessage,
      buttonLink || "/schedule"
    );

    res.json({ msg: "Announcement added ✅", announcement: newA });
  } catch (err) {
    res.status(500).json({ msg: "Error adding announcement ❌" });
  }
});

// ✏️ UPDATE (ADMIN)
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const { message, messageMr, messageEn, buttonText, buttonTextEn, buttonLink, showButton, active } = req.body;

    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: "Announcement not found ❌" });
    }

    if (message !== undefined) announcement.message = message;
    if (messageMr !== undefined) announcement.messageMr = messageMr;
    if (messageEn !== undefined) announcement.messageEn = messageEn;
    if (buttonText !== undefined) announcement.buttonText = buttonText;
    if (buttonTextEn !== undefined) announcement.buttonTextEn = buttonTextEn;
    if (buttonLink !== undefined) announcement.buttonLink = buttonLink;
    if (showButton !== undefined) announcement.showButton = showButton;
    if (active !== undefined) announcement.active = active;

    await announcement.save();
    await logActivity(req.user.name, "Announcement Updated");

    res.json({ msg: "Announcement updated ✅", announcement });
  } catch (err) {
    res.status(500).json({ msg: "Error updating announcement ❌" });
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