const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
      trim: true
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100
    },

    category: {
      type: String,
      default: "Smart Ganesh Utsav",
      enum: ["Smart Ganesh Utsav", "Religious Activities", "Social Activities", "Cultural Activities", "Press Coverage"]
    },

    order: {
      type: Number,
      default: 0
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);