const mongoose = require("mongoose");

const aboutHistorySchema = new mongoose.Schema(
  {
    aboutMr1: { type: String, required: true },
    aboutMr2: { type: String, required: true },
    aboutMr3: { type: String, default: "" },
    aboutMr4: { type: String, default: "" },

    aboutEn1: { type: String, required: true },
    aboutEn2: { type: String, required: true },
    aboutEn3: { type: String, default: "" },
    aboutEn4: { type: String, default: "" },

    timeline1990Mr: { type: String, required: true },
    timeline1990En: { type: String, required: true },
    timeline2010Mr: { type: String, required: true },
    timeline2010En: { type: String, required: true },
    timeline2024Mr: { type: String, required: true },
    timeline2024En: { type: String, required: true }
  },
  { timestamps: true }
);

// Clean output mapping
aboutHistorySchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("AboutHistory", aboutHistorySchema);
