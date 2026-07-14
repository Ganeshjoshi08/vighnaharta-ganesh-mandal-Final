const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendEmail");

//--------------------------------------------------
// 🔐 VALIDATIONS
//--------------------------------------------------
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidName = (name) => {
  return /^[A-Za-z\s]{3,30}$/.test(name);
};

const isStrongPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//--------------------------------------------------
// 🔥 ADMIN EMAIL
//--------------------------------------------------
const ADMIN_EMAIL = "awdhalshreyas@gmail.com";

//--------------------------------------------------
// ✅ SIGNUP + OTP
//--------------------------------------------------
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim(); // 🔥 FIX

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ msg: "Invalid name" });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        msg: "Password must be strong (8+, upper, lower, number, special)"
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = new User({
      name,
      email: normalizedEmail, // 🔥 FIX
      password: hashed,
      isAdmin: normalizedEmail === ADMIN_EMAIL,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
      isVerified: false
    });

    await user.save();

    try {
      await sendOTP(normalizedEmail, otp);
    } catch (err) {
      console.log("📧 Mail error:", err.message);
    }

    res.status(200).json({ msg: "OTP sent to email" });

  } catch (err) {
    console.log("🔥 SIGNUP ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// ✅ VERIFY OTP
//--------------------------------------------------
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const normalizedEmail = email.toLowerCase().trim(); // 🔥 FIX

    if (!email || !otp) {
      return res.status(400).json({ msg: "Email & OTP required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({ msg: "Account verified ✅" });

  } catch (err) {
    console.log("🔥 VERIFY ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// ✅ LOGIN (🔥 FINAL FIX)
//--------------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim(); // 🔥 FIX

    if (!email || !password) {
      return res.status(400).json({ msg: "Email & password required" });
    }

    // 🔥 CRITICAL FIX: include password
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Please verify your email first" });
    }

    if (!user.password) {
      return res.status(500).json({ msg: "Password missing in DB" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET missing in .env");
      return res.status(500).json({ msg: "Server config error" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      isAdmin: user.isAdmin || false,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log("🔥 LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 🔁 FORGOT PASSWORD
//--------------------------------------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const normalizedEmail = email.toLowerCase().trim(); // 🔥 FIX

    if (!email) {
      return res.status(400).json({ msg: "Email required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    try {
      await sendOTP(normalizedEmail, otp);
    } catch (err) {
      console.log("📧 Mail error:", err.message);
    }

    res.status(200).json({ msg: "OTP sent for password reset" });

  } catch (err) {
    console.log("🔥 FORGOT ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 🔒 RESET PASSWORD
//--------------------------------------------------
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const normalizedEmail = email.toLowerCase().trim(); // 🔥 FIX

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ msg: "Weak password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({ msg: "Password reset successful ✅" });

  } catch (err) {
    console.log("🔥 RESET ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};