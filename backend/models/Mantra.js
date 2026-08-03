const mongoose = require("mongoose");

const mantraSchema = new mongoose.Schema(
  {
    mantraNameMr: {
      type: String,
      required: true,
      trim: true
    },
    mantraNameEn: {
      type: String,
      required: true,
      trim: true
    },
    mantraTextMr: {
      type: String,
      required: true
    },
    mantraTextEn: {
      type: String,
      required: true
    },
    audioFile: {
      type: String,
      default: ""
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Mantra", mantraSchema);
