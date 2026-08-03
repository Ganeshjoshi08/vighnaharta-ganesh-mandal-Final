const express = require("express");
const router = express.Router();
const {
  getMantras,
  addMantra,
  updateMantra,
  deleteMantra
} = require("../controllers/mantraController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

//--------------------------------------------------
// 🕉️ MANTRAS ROUTING
//--------------------------------------------------

// ✅ Public: everyone can read mantras
router.get("/", getMantras);

// 🔒 Admin only: add a new mantra (optional single audio upload)
router.post(
  "/",
  protect,
  isAdmin,
  (req, res, next) => {
    upload.single("audio")(req, res, function (err) {
      if (err) {
        console.error("Audio upload Multer error:", err);
        return res.status(400).json({ success: false, msg: "Audio file upload failed ❌", message: err.message });
      }
      next();
    });
  },
  addMantra
);

// 🔒 Admin only: update mantra details & optional audio file replacement
router.put(
  "/:id",
  protect,
  isAdmin,
  (req, res, next) => {
    upload.single("audio")(req, res, function (err) {
      if (err) {
        console.error("Audio upload Multer error:", err);
        return res.status(400).json({ success: false, msg: "Audio file upload failed ❌", message: err.message });
      }
      next();
    });
  },
  updateMantra
);

// 🔒 Admin only: delete mantra
router.delete("/:id", protect, isAdmin, deleteMantra);

module.exports = router;
