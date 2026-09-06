const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { logActivity, createNotification } = require("../utils/activityLogger");

//--------------------------------------------------
// 🔍 DEBUG REQUEST LOGGER
//--------------------------------------------------
const debugLog = (message, meta = {}) => {
  console.log(`[DEBUG] [AUTH] ${message} |`, JSON.stringify(meta));
};

//--------------------------------------------------
// ✅ DIRECT SIGNUP (NO OTP)
//--------------------------------------------------
exports.signup = async (req, res) => {
  const { firstName, lastName, name, phone, mobileNumber, email, password } = req.body;

  const rawPhone = (phone || mobileNumber || "").toString().trim();
  const cleanPhone = rawPhone.replace(/\D/g, "");
  
  const fName = (firstName || "").trim();
  const lName = (lastName || "").trim();
  const fullName = (name || `${fName} ${lName}`.trim() || fName).trim();

  debugLog("Direct signup request received", { phone: cleanPhone, name: fullName });

  try {
    if (!fullName || !cleanPhone || !password) {
      return res.status(400).json({
        success: false,
        msg: "First name, Last name, Mobile number and Password are required",
        message: "First name, Last name, Mobile number and Password are required"
      });
    }

    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        msg: "Please enter a valid 10-digit mobile number",
        message: "Please enter a valid 10-digit mobile number"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 6 characters long",
        message: "Password must be at least 6 characters long"
      });
    }

    // Check if user already exists with this phone number
    const existingUser = await User.findOne({ phone: cleanPhone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User with this mobile number already exists. Please login.",
        message: "User with this mobile number already exists. Please login."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: fName || fullName.split(" ")[0],
      lastName: lName || (fullName.split(" ").slice(1).join(" ") || ""),
      name: fullName,
      phone: cleanPhone,
      email: email ? email.toLowerCase().trim() : undefined,
      password: hashedPassword,
      isAdmin: false,
      isVerified: true
    });

    await user.save();

    // Log activity & create notification safely
    try {
      await logActivity(user.name, "New User Registration");
      await createNotification(
        "USER_REGISTRATION",
        "New User Registered 🎉",
        `${user.name} (${user.phone}) registered directly via mobile.`,
        "/admin/users"
      );
    } catch (logErr) {
      console.error("Activity log error:", logErr);
    }

    // Generate JWT token for immediate login
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "vighnaharta_secret_key",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      msg: "Registration successful! 🎉",
      message: "Registration successful! 🎉",
      token,
      isAdmin: user.isAdmin || false,
      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email
      }
    });

  } catch (err) {
    console.error("🔥 SIGNUP ERROR:", err);
    res.status(500).json({
      success: false,
      msg: "Server error during registration",
      message: err.message
    });
  }
};

//--------------------------------------------------
// ✅ DIRECT LOGIN (MOBILE + PASSWORD)
//--------------------------------------------------
exports.login = async (req, res) => {
  const { phone, mobileNumber, email, identifier, password } = req.body;
  const rawInput = (phone || mobileNumber || identifier || email || "").toString().trim();
  const cleanPhone = rawInput.replace(/\D/g, "");

  debugLog("Direct login request received", { input: rawInput });

  try {
    if (!rawInput || !password) {
      return res.status(400).json({
        success: false,
        msg: "Mobile number and Password are required",
        message: "Mobile number and Password are required"
      });
    }

    // Search by mobile number or email
    const queryConditions = [];
    if (cleanPhone) queryConditions.push({ phone: cleanPhone });
    if (rawInput) queryConditions.push({ phone: rawInput });
    if (rawInput.includes("@")) queryConditions.push({ email: rawInput.toLowerCase() });

    const user = await User.findOne({ $or: queryConditions }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        msg: "User not found with this mobile number",
        message: "User not found with this mobile number"
      });
    }

    if (!user.password) {
      return res.status(500).json({
        success: false,
        msg: "Password record missing",
        message: "Password record missing"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        msg: "Incorrect password. Please try again.",
        message: "Incorrect password. Please try again."
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "vighnaharta_secret_key",
      { expiresIn: "7d" }
    );

    try {
      await logActivity(user.name, user.isAdmin ? "Admin Login" : "User Login");
    } catch (logErr) {
      console.error("Activity log error:", logErr);
    }

    res.status(200).json({
      success: true,
      msg: "Login successful! 👋",
      message: "Login successful! 👋",
      token,
      isAdmin: user.isAdmin || false,
      user: {
        id: user._id,
        name: user.name,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email
      }
    });

  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      msg: "Server error during login",
      message: err.message
    });
  }
};

//--------------------------------------------------
// 🚪 LOGOUT
//--------------------------------------------------
exports.logout = async (req, res) => {
  try {
    if (req.user) {
      await logActivity(req.user.name, req.user.isAdmin ? "Admin Logout" : "User Logout");
    }
    res.status(200).json({ success: true, msg: "Logged out successfully 🚪" });
  } catch (err) {
    console.error("🔥 LOGOUT ERROR:", err);
    res.status(500).json({ success: false, msg: "Server error during logout", message: err.message });
  }
};