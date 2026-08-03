const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true
    },
    path: {
      type: String,
      default: "/"
    },
    referrer: {
      type: String,
      default: "Direct"
    },
    browser: {
      type: String,
      default: "Other"
    },
    deviceType: {
      type: String,
      default: "Desktop"
    },
    os: {
      type: String,
      default: "Other"
    },
    country: {
      type: String,
      default: "India"
    },
    sessionDuration: {
      type: Number,
      default: 0 // in seconds
    },
    lastVisitedAt: {
      type: Date,
      default: Date.now
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Visit", visitSchema);
