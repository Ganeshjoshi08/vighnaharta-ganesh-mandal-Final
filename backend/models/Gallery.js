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

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);