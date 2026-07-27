const express = require("express");
const router = express.Router();

const {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity
} = require("../controllers/activityController");

const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

//--------------------------------------------------
// 🎯 ACTIVITIES ROUTES
//--------------------------------------------------

// ✅ Public: everyone can read
router.get("/", getActivities);

// 🔒 Admin only: create activity
router.post(
  "/",
  protect,
  isAdmin,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        console.log("MULTER ERROR:", err);
        return res.status(400).json({ msg: "File upload error ❌" });
      }
      next();
    });
  },
  addActivity
);

// 🔒 Admin only: update activity details and display order
router.put("/:id", protect, isAdmin, updateActivity);

// 🔒 Admin only: delete activity
router.delete("/:id", protect, isAdmin, deleteActivity);

module.exports = router;
