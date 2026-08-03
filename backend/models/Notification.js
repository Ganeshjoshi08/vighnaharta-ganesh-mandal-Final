const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      required: true // e.g. USER_REGISTRATION, DONATION, ACTIVITY, GALLERY, ANNOUNCEMENT
    },
    actionUrl: {
      type: String,
      default: ""
    },
    isRead: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
