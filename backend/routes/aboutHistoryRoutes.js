const express = require("express");
const router = express.Router();
const AboutHistory = require("../models/AboutHistory");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// 📥 GET Config
router.get("/about-history", async (req, res) => {
  try {
    const config = await AboutHistory.findOne();
    res.status(200).json(config || null);
  } catch (err) {
    console.log("FETCH ABOUT HISTORY ERROR:", err);
    res.status(500).json({ msg: "Error fetching data ❌" });
  }
});

// ➕ UPDATE/CREATE Config (Admin Only)
router.post("/about-history", protect, isAdmin, async (req, res) => {
  try {
    const data = req.body;
    let config = await AboutHistory.findOne();

    if (config) {
      config = await AboutHistory.findByIdAndUpdate(config._id, data, { new: true });
    } else {
      config = new AboutHistory(data);
      await config.save();
    }

    res.status(200).json({ msg: "About & History settings updated 🎉", config });
  } catch (err) {
    console.log("UPDATE ABOUT HISTORY ERROR:", err);
    res.status(500).json({ msg: "Error saving data ❌" });
  }
});

module.exports = router;
