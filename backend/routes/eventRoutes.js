const express = require("express");
const router = express.Router();

const {
  getEvents,
  createEvent,
  deleteEvent
} = require("../controllers/eventController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 🎉 EVENT ROUTES
//--------------------------------------------------

// ✅ Public
router.get("/events", getEvents);

// 🔒 Admin
router.post("/events", protect, isAdmin, createEvent);

// ❌ Delete
router.delete("/events/:id", protect, isAdmin, deleteEvent);

module.exports = router;