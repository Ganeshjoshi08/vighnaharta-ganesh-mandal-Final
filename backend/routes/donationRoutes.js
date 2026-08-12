const express = require("express");
const router = express.Router();

const {
  getDonations,
  createDonation,
  createAdminDonation,
  exportExcel,
  exportPdfReport
} = require("../controllers/donationController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 💰 DONATION ROUTES
//--------------------------------------------------

// 🔐 USER MUST LOGIN (🔥 FIX)
router.post("/", protect, createDonation);

// 🔒 ADMIN ONLY
router.get("/", protect, isAdmin, getDonations);
router.post("/admin-create", protect, isAdmin, createAdminDonation);
router.get("/export-excel", protect, isAdmin, exportExcel);
router.get("/export-pdf", protect, isAdmin, exportPdfReport);

module.exports = router;