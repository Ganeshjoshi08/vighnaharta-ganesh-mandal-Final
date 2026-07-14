const express = require("express");
const router = express.Router();

const {
  getDonations,
  createDonation
} = require("../controllers/donationController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 💰 DONATION ROUTES
//--------------------------------------------------

// 🔐 USER MUST LOGIN (🔥 FIX)
router.post("/", protect, createDonation);

// 🔒 ADMIN ONLY
router.get("/", protect, isAdmin, getDonations);

module.exports = router;