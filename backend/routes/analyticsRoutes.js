const express = require("express");
const router = express.Router();
const {
  trackVisit,
  getSummary,
  getActivities,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getHealth
} = require("../controllers/analyticsController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 📊 ANALYTICS & VISIT ROUTING
//--------------------------------------------------

// ✅ Public: track page views & heartbeat
router.post("/track", trackVisit);

// 🔒 Admin only: summaries, log timeline & server health
router.get("/summary", protect, isAdmin, getSummary);
router.get("/activities", protect, isAdmin, getActivities);
router.get("/health", protect, isAdmin, getHealth);

// 🔒 Admin only: dashboard notifications
router.get("/notifications", protect, isAdmin, getNotifications);
router.put("/notifications/read-all", protect, isAdmin, markAllNotificationsRead);
router.put("/notifications/:id/read", protect, isAdmin, markNotificationRead);

module.exports = router;
