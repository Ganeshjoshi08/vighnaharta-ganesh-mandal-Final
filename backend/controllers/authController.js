const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTP = require("../utils/sendEmail");

//--------------------------------------------------
// 🔍 DEBUG REQUEST LOGGER (Toggleable)
//--------------------------------------------------
const DEBUG_MODE = true;

const debugLog = (message, meta = {}) => {
  if (DEBUG_MODE) {
    console.log(`[DEBUG] [AUTH] ${message} |`, JSON.stringify(meta));
  }
};

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
  const { name, email, password } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : "";

  debugLog("Signup request received", { method: req.method, url: req.originalUrl, email: normalizedEmail });

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, msg: "All fields required", message: "All fields required" });
    }

    if (!isValidName(name)) {
      return res.status(400).json({ success: false, msg: "Invalid name", message: "Invalid name" });
    }

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ success: false, msg: "Invalid email", message: "Invalid email" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        msg: "Password must be strong (8+, upper, lower, number, special)",
        message: "Password must be strong (8+, upper, lower, number, special)"
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ success: false, msg: "User already exists", message: "User already exists" });
      } else {
        // Automatically delete the old unverified user record to start fresh
        debugLog("Deleting existing unverified user record", { email: normalizedEmail });
        await User.deleteOne({ _id: existingUser._id });
      }
    }

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    const user = new User({
      name,
      email: normalizedEmail,
      password: hashed,
      isAdmin: normalizedEmail === ADMIN_EMAIL,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
      isVerified: false,
      otpResendCount: 0,
      otpLastSent: Date.now()
    });

    await user.save();

    debugLog("Attempting to send OTP email during signup...", { email: normalizedEmail });
    const emailSuccess = await sendOTP(normalizedEmail, otp);
    if (!emailSuccess) {
      debugLog("OTP email delivery failed during signup, deleting unverified record", { email: normalizedEmail });
      await User.deleteOne({ _id: user._id });
      return res.status(500).json({
        success: false,
        msg: "Failed to deliver OTP email. Please check if your email address is correct.",
        message: "Failed to deliver OTP email. Please check if your email address is correct."
      });
    }

    res.status(200).json({ success: true, msg: "OTP sent to email", message: "OTP sent to email" });

  } catch (err) {
    console.error("🔥 SIGNUP ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error during registration", message: err.message });
  }
};

//--------------------------------------------------
// ✅ VERIFY OTP
//--------------------------------------------------
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : "";

  debugLog("OTP verification request received", { method: req.method, url: req.originalUrl, email: normalizedEmail });

  try {
    if (!email || !otp) {
      return res.status(400).json({ success: false, msg: "Email & OTP required", message: "Email & OTP required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, msg: "Invalid or expired OTP", message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    user.otpResendCount = 0;
    user.otpLastSent = null;

    await user.save();

    res.status(200).json({ success: true, msg: "Account verified ✅", message: "Account verified ✅" });

  } catch (err) {
    console.error("🔥 VERIFY ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error during OTP verification", message: err.message });
  }
};

//--------------------------------------------------
// ✅ LOGIN
//--------------------------------------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : "";

  debugLog("Login request received", { method: req.method, url: req.originalUrl, email: normalizedEmail });

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email & password required", message: "Email & password required" });
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(400).json({ success: false, msg: "User not found", message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ success: false, msg: "Please verify your email first", message: "Please verify your email first" });
    }

    if (!user.password) {
      return res.status(500).json({ success: false, msg: "Password missing in DB", message: "Password missing in DB" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ success: false, msg: "Wrong password", message: "Wrong password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET missing in .env");
      return res.status(500).json({ success: false, msg: "Server config error", message: "JWT_SECRET missing in .env" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      isAdmin: user.isAdmin || false,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error("🔥 LOGIN ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error during login", message: err.message });
  }
};

//--------------------------------------------------
// 🔁 FORGOT PASSWORD
//--------------------------------------------------
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : "";

  debugLog("Forgot password request received", { method: req.method, url: req.originalUrl, email: normalizedEmail });

  try {
    if (!email) {
      return res.status(400).json({ success: false, msg: "Email required", message: "Email required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found", message: "User not found" });
    }

    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    user.otpResendCount = 0;
    user.otpLastSent = Date.now();

    await user.save();

    debugLog("Attempting to send OTP email for password reset...", { email: normalizedEmail });
    const emailSuccess = await sendOTP(normalizedEmail, otp);
    if (!emailSuccess) {
      debugLog("OTP email delivery failed for forgotPassword, clearing OTP values", { email: normalizedEmail });
      user.otp = null;
      user.otpExpiry = null;
      user.otpLastSent = null;
      user.otpResendCount = 0;
      await user.save();

      return res.status(500).json({
        success: false,
        msg: "Failed to deliver password reset OTP. Please check if your email address is correct.",
        message: "Failed to deliver password reset OTP. Please check if your email address is correct."
      });
    }

    res.status(200).json({ success: true, msg: "OTP sent for password reset", message: "OTP sent for password reset" });

  } catch (err) {
    console.error("🔥 FORGOT ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error during password reset request", message: err.message });
  }
};

//--------------------------------------------------
// 🔒 RESET PASSWORD
//--------------------------------------------------
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : "";

  debugLog("Reset password request received", { method: req.method, url: req.originalUrl, email: normalizedEmail });

  try {
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, msg: "All fields required", message: "All fields required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, msg: "Invalid OTP", message: "Invalid OTP" });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({
        success: false,
        msg: "Weak password (must be 8+, upper, lower, number, special)",
        message: "Weak password (must be 8+, upper, lower, number, special)"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpiry = null;
    user.otpResendCount = 0;
    user.otpLastSent = null;

    await user.save();

    res.status(200).json({ success: true, msg: "Password reset successful ✅", message: "Password reset successful ✅" });

  } catch (err) {
    console.error("🔥 RESET ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error during password reset", message: err.message });
  }
};

//--------------------------------------------------
// 🔁 RESEND OTP
//--------------------------------------------------
exports.resendOTP = async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email ? email.toLowerCase().trim() : "";

  debugLog("Resend OTP request received", { method: req.method, url: req.originalUrl, email: normalizedEmail });

  try {
    if (!email) {
      return res.status(400).json({ success: false, msg: "Email required", message: "Email required" });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found", message: "User not found" });
    }

    // Cooldown check (60 seconds)
    if (user.otpLastSent && (Date.now() - new Date(user.otpLastSent).getTime() < 60 * 1000)) {
      const remaining = Math.round(60 - (Date.now() - new Date(user.otpLastSent).getTime()) / 1000);
      return res.status(429).json({
        success: false,
        msg: `Please wait ${remaining} seconds before resending OTP.`,
        message: `Please wait ${remaining} seconds before resending OTP.`
      });
    }

    // Abuse/Spam limit check (max 5 resend attempts)
    if (user.otpResendCount >= 5) {
      return res.status(429).json({
        success: false,
        msg: "Maximum resend OTP limit (5 attempts) exceeded. Please sign up or request reset again.",
        message: "Maximum resend OTP limit (5 attempts) exceeded. Please sign up or request reset again."
      });
    }

    const newOtp = generateOTP();

    user.otp = newOtp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes validation
    user.otpResendCount = (user.otpResendCount || 0) + 1;
    user.otpLastSent = Date.now();

    await user.save();

    debugLog(`Resending OTP email (attempt ${user.otpResendCount}/5)...`, { email: normalizedEmail });
    const emailSuccess = await sendOTP(normalizedEmail, newOtp);
    if (!emailSuccess) {
      // Revert attempt details on email failure
      user.otpResendCount = Math.max(0, user.otpResendCount - 1);
      await user.save();

      return res.status(500).json({
        success: false,
        msg: "Failed to deliver OTP email. Please try again.",
        message: "Failed to deliver OTP email. Please try again."
      });
    }

    res.status(200).json({
      success: true,
      msg: `OTP resent successfully (Attempt ${user.otpResendCount}/5) 📧`,
      message: `OTP resent successfully (Attempt ${user.otpResendCount}/5) 📧`
    });

  } catch (err) {
    console.error("🔥 RESEND OTP ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error during resending OTP", message: err.message });
  }
};