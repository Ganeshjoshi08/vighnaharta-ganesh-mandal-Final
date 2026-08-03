const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  verifyOTP,
  forgotPassword,
  resetPassword,
  resendOTP
} = require("../controllers/authController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 🔐 AUTH ROUTES
//--------------------------------------------------

// ✅ Signup + OTP send
router.post("/signup", signup);

// ✅ Verify OTP (signup)
router.post("/verify-otp", verifyOTP);

// ✅ Login
router.post("/login", login);

// 🔁 Forgot password (send OTP)
router.post("/forgot-password", forgotPassword);

// 🔒 Reset password (OTP + new password)
router.post("/reset-password", resetPassword);

// 🔁 Resend OTP (signup or password reset)
router.post("/resend-otp", resendOTP);

//--------------------------------------------------
// 🔥 EXTRA (PRO FEATURES)
//--------------------------------------------------

// 👤 GET CURRENT USER (profile)
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user); // 🔥 status added
});

// 👑 ADMIN CHECK TEST (optional)
router.get("/admin", protect, isAdmin, (req, res) => {
  res.status(200).json({ msg: "Welcome Admin 👑" }); // 🔥 status added
});

module.exports = router;