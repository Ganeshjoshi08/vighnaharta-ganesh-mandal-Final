const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 5,
      maxlength: 500
    },

    date: {
      type: Date,
      required: [true, "Date is required"]
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "" // 🔥 FIX
    },

    image: {
      type: String,
      default: "" // 🔥 FIX
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true // 🔥 IMPORTANT FIX
    }
  },
  { timestamps: true }
);

// 🔥 JSON CLEAN OUTPUT
eventSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Event", eventSchema);