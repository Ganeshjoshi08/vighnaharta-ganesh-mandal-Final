const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true, // ✅ already index
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false   // 🔥 HIDE PASSWORD
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    // 🔐 OTP SYSTEM
    otp: {
      type: String
    },

    otpExpiry: {
      type: Date
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    // 📱 OPTIONAL FUTURE
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// ❌ duplicate index remove already ✔️

// 🔥 AUTO REMOVE OTP AFTER VERIFY
userSchema.methods.clearOTP = function () {
  this.otp = null;
  this.otpExpiry = null;
};

module.exports = mongoose.model("User", userSchema);