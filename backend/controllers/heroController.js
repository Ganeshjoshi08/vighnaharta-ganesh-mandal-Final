const HeroSettings = require("../models/HeroSettings");
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
        if (err) console.error("❌ Failed to delete old hero asset:", absolutePath, err.message);
      });
    }
  } catch (err) {
    console.error("❌ Error unlinking file:", err);
  }
};

exports.getHero = async (req, res) => {
  try {
    let hero = await HeroSettings.findOne();
    if (!hero) {
      hero = new HeroSettings();
      // Add default buttons to match the original home buttons
      hero.buttons = [
        { textMr: "आरती", textEn: "Aarti", link: "/mantras" },
        { textMr: "देणगी", textEn: "Donate", link: "/donation" }
      ];
      await hero.save();
    }
    res.status(200).json({ success: true, data: hero });
  } catch (err) {
    console.error("🔥 GET HERO SETTINGS ERROR:", err);
    res.status(500).json({ success: false, msg: "Failed to load hero settings", message: err.message });
  }
};

exports.updateHero = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ success: false, msg: "Access Denied" });
    }

    let hero = await HeroSettings.findOne();
    if (!hero) {
      hero = new HeroSettings();
    }

    const {
      titleMr,
      titleEn,
      subMr,
      subEn,
      subtitleMr,
      subtitleEn,
      countdownDate,
      buttons
    } = req.body;

    // Handle uploaded files
    if (req.files) {
      if (req.files.heroImage && req.files.heroImage[0]) {
        if (hero.heroImage) deleteLocalFile(hero.heroImage);
        hero.heroImage = `/uploads/${req.files.heroImage[0].filename}`;
      }
      if (req.files.bgImage && req.files.bgImage[0]) {
        if (hero.bgImage) deleteLocalFile(hero.bgImage);
        hero.bgImage = `/uploads/${req.files.bgImage[0].filename}`;
      }
    }

    if (titleMr !== undefined) hero.titleMr = titleMr.trim();
    if (titleEn !== undefined) hero.titleEn = titleEn.trim();
    if (subMr !== undefined) hero.subMr = subMr.trim();
    if (subEn !== undefined) hero.subEn = subEn.trim();
    if (subtitleMr !== undefined) hero.subtitleMr = subtitleMr.trim();
    if (subtitleEn !== undefined) hero.subtitleEn = subtitleEn.trim();
    if (countdownDate !== undefined) hero.countdownDate = countdownDate.trim();

    if (buttons !== undefined) {
      try {
        const parsed = typeof buttons === "string" ? JSON.parse(buttons) : buttons;
        if (Array.isArray(parsed)) {
          hero.buttons = parsed.map(btn => ({
            textMr: btn.textMr || "",
            textEn: btn.textEn || "",
            link: btn.link || ""
          }));
        }
      } catch (err) {
        console.error("❌ Failed to parse hero buttons JSON:", err);
      }
    }

    await hero.save();

    await logActivity(req.user.name, "Hero Section CMS Updated");

    res.status(200).json({ success: true, msg: "Hero section settings updated! 🎉", data: hero });
  } catch (err) {
    console.error("🔥 UPDATE HERO SETTINGS ERROR:", err);
    res.status(500).json({ success: false, msg: "Failed to update hero settings", message: err.message });
  }
};
