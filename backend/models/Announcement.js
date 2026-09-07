const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    messageMr: {
      type: String,
      default: ""
    },
    messageEn: {
      type: String,
      default: ""
    },
    buttonText: {
      type: String,
      default: "येथे क्लिक करा"
    },
    buttonTextEn: {
      type: String,
      default: "Click Here"
    },
    buttonLink: {
      type: String,
      default: "/schedule"
    },
    showButton: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Announcement", announcementSchema);