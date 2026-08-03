const express = require("express");
const router = express.Router();
const { getHero, updateHero } = require("../controllers/heroController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ✅ Public: read hero setup
router.get("/", getHero);

// 🔒 Admin only: update hero text & images (heroImage, bgImage)
router.put(
  "/",
  protect,
  isAdmin,
  upload.fields([
    { name: "heroImage", maxCount: 1 },
    { name: "bgImage", maxCount: 1 }
  ]),
  updateHero
);

module.exports = router;
