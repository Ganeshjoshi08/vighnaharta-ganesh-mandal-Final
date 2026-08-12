const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
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
    },

    // 📋 New admin donation details
    donorName: {
      type: String,
      trim: true
    },
    mobileNumber: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    modeOfDonation: {
      type: String,
      enum: ["Cash", "Online"]
    },
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true
    },
    date: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);