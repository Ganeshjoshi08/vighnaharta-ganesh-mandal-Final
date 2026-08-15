const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    websiteName: {
      type: String,
      default: "श्री विघ्नहर्ता मित्र मंडळ"
    },
    logoUrl: {
      type: String,
      default: ""
    },
    faviconUrl: {
      type: String,
      default: ""
    },
    addressMr: {
      type: String,
      default: "विघ्नहर्ता चौक, जुन्या तहसीलच्या मागे, बीड."
    },
    addressEn: {
      type: String,
      default: "Vighnaharta Chowk, Behind Old Tehsil, Beed."
    },
    phoneNumber: {
      type: String,
      default: "+९१ ८७६७१ ३४६२३ / +९१ ८३९०७ ७४२२४"
    },
    email: {
      type: String,
      default: "vighnahartamitramandal025@gmail.com"
    },
    googleMapsLink: {
      type: String,
      default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6595280323722!2d75.76022137414726!3d18.99063815464892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc52b000a0a2cf3%3A0x90f7441ea36d8859!2sShree%20Vighnaharta%20Ganesh%20Mandir%2CBeed!5e0!3m2!1sen!2sin!4v1784914638915!5m2!1sen!2sin"
    },
    facebook: {
      type: String,
      default: "#"
    },
    instagram: {
      type: String,
      default: "#"
    },
    youtube: {
      type: String,
      default: "#"
    },
    twitter: {
      type: String,
      default: "#"
    },
    footerTextMr: {
      type: String,
      default: "श्रद्धा • सेवा • संस्कृती"
    },
    footerTextEn: {
      type: String,
      default: "DEVOTION • SERVICE • CULTURE"
    },
    copyrightMr: {
      type: String,
      default: "© 2024 श्री विघ्नहर्ता मित्र मंडळ. Developed by VMM-2026"
    },
    copyrightEn: {
      type: String,
      default: "© 2024 Shree Vighnaharta Mitra Mandal. Developed by VMM-2026"
    },
    supportEmail: {
      type: String,
      default: "vighnahartamitramandal025@gmail.com"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
