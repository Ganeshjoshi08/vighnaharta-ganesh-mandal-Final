const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true
    },
    competition: {
      type: String,
      required: [true, "Competition choice is required"],
      trim: true
    },
    ticketId: {
      type: String,
      required: [true, "Ticket ID is required"],
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

// Clean output mapping
registrationSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Registration", registrationSchema);
