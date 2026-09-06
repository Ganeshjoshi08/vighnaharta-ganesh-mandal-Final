const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true
    },

    lastName: {
      type: String,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true,
      sparse: true,
      index: true
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    isAdmin: {
      type: Boolean,
      default: false
    },

    isVerified: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);