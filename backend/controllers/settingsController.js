const Settings = require("../models/Settings");
const { logActivity } = require("../utils/activityLogger");
const fs = require("fs");
const path = require("path");

const deleteLocalFile = (filePath) => {
  if (!filePath) return;
  try {
    const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
    const absolutePath = path.join(__dirname, "..", relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlink(absolutePath, (err) => {
        if (err) console.error("❌ Failed to delete old asset:", absolutePath, err.message);
      });
    }
  } catch (err) {
    console.error("❌ Error unlinking file:", err);
  }
};

exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    console.error("🔥 GET SETTINGS ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Failed to load website settings", message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, msg: "Access Denied" });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    const {
      websiteName,
      addressMr,
      addressEn,
      phoneNumber,
      email,
      googleMapsLink,
      facebook,
      instagram,
      youtube,
      twitter,
      footerTextMr,
      footerTextEn,
      copyrightMr,
      copyrightEn,
      supportEmail
    } = req.body;

    // Handle uploaded files
    if (req.files) {
      if (req.files.logo && req.files.logo[0]) {
        if (settings.logoUrl) deleteLocalFile(settings.logoUrl);
        settings.logoUrl = `/uploads/${req.files.logo[0].filename}`;
      }
      if (req.files.favicon && req.files.favicon[0]) {
        if (settings.faviconUrl) deleteLocalFile(settings.faviconUrl);
        settings.faviconUrl = `/uploads/${req.files.favicon[0].filename}`;
      }
    }

    if (websiteName !== undefined) settings.websiteName = websiteName.trim();
    if (addressMr !== undefined) settings.addressMr = addressMr.trim();
    if (addressEn !== undefined) settings.addressEn = addressEn.trim();
    if (phoneNumber !== undefined) settings.phoneNumber = phoneNumber.trim();
    if (email !== undefined) settings.email = email.trim();
    if (googleMapsLink !== undefined) settings.googleMapsLink = googleMapsLink.trim();
    if (facebook !== undefined) settings.facebook = facebook.trim();
    if (instagram !== undefined) settings.instagram = instagram.trim();
    if (youtube !== undefined) settings.youtube = youtube.trim();
    if (twitter !== undefined) settings.twitter = twitter.trim();
    if (footerTextMr !== undefined) settings.footerTextMr = footerTextMr.trim();
    if (footerTextEn !== undefined) settings.footerTextEn = footerTextEn.trim();
    if (copyrightMr !== undefined) settings.copyrightMr = copyrightMr.trim();
    if (copyrightEn !== undefined) settings.copyrightEn = copyrightEn.trim();
    if (supportEmail !== undefined) settings.supportEmail = supportEmail.trim();

    await settings.save();

    await logActivity(req.user.name, "Website Settings Updated");

    res.status(200).json({ success: true, msg: "Website settings updated successfully! 🎉", data: settings });
  } catch (err) {
    console.error("🔥 UPDATE SETTINGS ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Failed to update settings", message: err.message });
  }
};
