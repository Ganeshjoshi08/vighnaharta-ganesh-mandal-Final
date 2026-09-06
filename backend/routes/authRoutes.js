const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout
} = require("../controllers/authController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

//--------------------------------------------------
// 🔐 AUTH ROUTES
//--------------------------------------------------

// ✅ Direct Signup (No OTP)
router.post("/signup", signup);

// ✅ Direct Login (Mobile & Password)
router.post("/login", login);

// 🚪 Logout
router.post("/logout", protect, logout);

// 👤 GET CURRENT USER (profile)
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

// 👑 ADMIN CHECK TEST
router.get("/admin", protect, isAdmin, (req, res) => {
  res.status(200).json({ msg: "Welcome Admin 👑" });
});

module.exports = router;