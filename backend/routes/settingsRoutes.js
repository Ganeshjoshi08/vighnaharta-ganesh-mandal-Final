const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/settingsController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ✅ Public: read settings
router.get("/", getSettings);

// 🔒 Admin only: update settings with optional image assets (logo, favicon)
router.put(
  "/",
  protect,
  isAdmin,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favicon", maxCount: 1 }
  ]),
  updateSettings
);

module.exports = router;
