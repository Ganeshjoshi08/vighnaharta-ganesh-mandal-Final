const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    email: {
      type: String,
      lowercase: true,
      trim: true
    },

    message: {
      type: String,
      trim: true,
      maxlength: 200
    },

    paymentId: {
      type: String // future: Razorpay integration
    },

    // 🔥🔥🔥 MAIN ADD (USER LINK)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);