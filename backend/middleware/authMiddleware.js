const jwt = require("jsonwebtoken");
const User = require("../models/User");

//--------------------------------------------------
// 🔐 PROTECT ROUTE
//--------------------------------------------------
exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res.status(401).json({ msg: "No token provided ❌" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Invalid token ❌" });
    }

    if (!process.env.JWT_SECRET) {
      console.log("❌ JWT_SECRET missing in .env");
      return res.status(500).json({ msg: "Server config error ❌" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.id || decoded._id;

    if (!userId) {
      return res.status(401).json({ msg: "Invalid token payload ❌" });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found ❌" });
    }

    req.user = user;
    req.userId = user._id;

    next();

  } catch (err) {
    console.log("🔥 AUTH ERROR:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired ⏳" });
    }

    return res.status(401).json({ msg: "Invalid token ❌" });
  }
};

//--------------------------------------------------
// 👑 ADMIN CHECK (ORIGINAL + SAFE FIX)
//--------------------------------------------------
exports.isAdmin = (req, res, next) => {
  try {
    // 🔥 ORIGINAL LOGIC + FIX (role support add)
    if (
      !req.user ||
      (req.user.isAdmin !== true && req.user.role !== "admin")
    ) {
      return res.status(403).json({
        msg: "Access Denied ❌ (Admin only)"
      });
    }

    next();

  } catch (err) {
    console.log("🔥 ADMIN ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};