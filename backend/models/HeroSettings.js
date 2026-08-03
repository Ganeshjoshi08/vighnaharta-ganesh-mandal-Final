const mongoose = require("mongoose");

const heroSettingsSchema = new mongoose.Schema(
  {
    titleMr: {
      type: String,
      default: "ivaGnahtaa_ imaPa ma/DL"
    },
    titleEn: {
      type: String,
      default: "Vighnaharta Mitra Mandal"
    },
    subMr: {
      type: String,
      default: "॥ श्री विघ्नहर्ताय नमः ॥"
    },
    subEn: {
      type: String,
      default: "|| Shree Vighnahartaya Namah ||"
    },
    subtitleMr: {
      type: String,
      default: "स्थापना: १९९० • विघ्नहर्ता चौक, बीड"
    },
    subtitleEn: {
      type: String,
      default: "Established: 1990 • Vighnaharta Chowk, Beed"
    },
    heroImage: {
      type: String,
      default: "" // lord Ganesha image url
    },
    bgImage: {
      type: String,
      default: "" // hero section bg image
    },
    countdownDate: {
      type: String,
      default: "" // format "2026-09-15T00:00:00"
    },
    buttons: [
      {
        textMr: { type: String, default: "" },
        textEn: { type: String, default: "" },
        link: { type: String, default: "" }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("HeroSettings", heroSettingsSchema);
