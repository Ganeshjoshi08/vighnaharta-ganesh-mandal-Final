const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Gallery = require("../models/Gallery");
const { logActivity, createNotification } = require("../utils/activityLogger");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//--------------------------------------------------
// 📥 GET ALL IMAGES
//--------------------------------------------------
exports.getImages = async (req, res) => {
  try {
    // Sort by order ascending, then by newest uploads
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// ➕ ADD IMAGE (ADMIN ONLY - FILE UPLOAD FIX)
//--------------------------------------------------
exports.addImage = async (req, res) => {
  try {
    // 🔒 Admin check (FIXED)
    if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
      return res.status(403).json({ msg: "Access denied ❌" });
    }

    // ✅ file check
    if (!req.file || !req.file.path) {
      console.log("❌ [DEBUG] Gallery Upload Error: req.file is missing or empty.");
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    console.log("⚡ [DEBUG] Gallery Upload Flow Started:");
    console.log(`   - Temporary local file path: ${req.file.path}`);
    
    // Check environment variables
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    
    if (!cloudName || !apiKey || !apiSecret) {
      console.log("❌ [DEBUG] Cloudinary configuration is missing in environment variables!");
      return res.status(500).json({ msg: "Cloudinary configuration variables are missing on server ❌" });
    }

    console.log(`   - Cloud Name: ${cloudName}`);
    console.log(`   - API Key: ${apiKey ? "configured (ends with " + apiKey.slice(-4) + ")" : "missing"}`);
    console.log(`   - API Secret: ${apiSecret ? "configured (hidden)" : "missing"}`);

    console.log("⚡ [DEBUG] Initiating Cloudinary upload...");
    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "vighnaharta_gallery"
      });
      console.log("✅ [DEBUG] Cloudinary upload successful!");
      console.log(`   - Secure URL: ${result.secure_url}`);
      console.log(`   - Public ID: ${result.public_id}`);
    } catch (uploadErr) {
      console.error("❌ [DEBUG] Cloudinary API upload failed:");
      console.error(uploadErr);
      return res.status(500).json({ 
        msg: "Cloudinary upload failed ❌", 
        error: uploadErr.message 
      });
    }

    // Delete local temp file
    if (fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
        console.log("✅ [DEBUG] Temporary local file deleted.");
      } catch (err) {
        console.error("⚠️ [DEBUG] Failed to delete temporary local file:", err.message);
      }
    }

    const img = new Gallery({
      imageUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      title: req.body.title || "",
      category: req.body.category || "Smart Ganesh Utsav",
      order: Number(req.body.order) || 0,
      uploadedBy: req.user._id
    });

    await img.save();
    console.log("✅ [DEBUG] Database record saved successfully!");

    await logActivity(req.user.name, `Gallery Image Uploaded: ${img.title || "Untitled"}`);
    await createNotification(
      "GALLERY",
      "New Gallery Image 🖼️",
      `Image "${img.title || "Untitled"}" has been uploaded in category "${img.category}".`,
      "/gallery"
    );

    res.status(201).json({
      msg: "Image uploaded 🖼️",
      img
    });

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 🔧 UPDATE IMAGE DETAILS & ORDER (ADMIN ONLY)
//--------------------------------------------------
exports.updateImage = async (req, res) => {
  try {
    if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
      return res.status(403).json({ msg: "Access denied ❌" });
    }

    const { title, category, order } = req.body;
    const img = await Gallery.findById(req.params.id);

    if (!img) {
      return res.status(404).json({ msg: "Image not found ❌" });
    }

    if (title !== undefined) img.title = title;
    if (category !== undefined) img.category = category;
    if (order !== undefined) img.order = Number(order) || 0;

    await img.save();

    res.json({
      msg: "Image updated ✅",
      img
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ msg: "Update failed ❌" });
  }
};

//--------------------------------------------------
// ❌ DELETE
//--------------------------------------------------
exports.deleteImage = async (req, res) => {
  try {
    if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
      return res.status(403).json({ msg: "Access denied ❌" });
    }

    const img = await Gallery.findById(req.params.id);
    if (!img) {
      return res.status(404).json({ msg: "Image not found ❌" });
    }

    console.log(`⚡ [DEBUG] Gallery Delete Flow Started for ID: ${img._id}`);
    
    // Delete from Cloudinary if public_id exists
    if (img.cloudinaryPublicId) {
      console.log(`⚡ [DEBUG] Deleting Cloudinary asset: ${img.cloudinaryPublicId}`);
      try {
        const delResult = await cloudinary.uploader.destroy(img.cloudinaryPublicId);
        console.log("✅ [DEBUG] Cloudinary deletion result:", delResult);
      } catch (delErr) {
        console.error("⚠️ [DEBUG] Cloudinary deletion failed:", delErr.message);
      }
    }

    // Delete local disk temp file for legacy images if present
    if (img.imageUrl && !img.imageUrl.startsWith("http")) {
      const localPath = path.join(__dirname, "../../", img.imageUrl);
      console.log(`⚡ [DEBUG] Deleting legacy local file: ${localPath}`);
      if (fs.existsSync(localPath)) {
        try {
          fs.unlinkSync(localPath);
          console.log("✅ [DEBUG] Legacy local file deleted from disk.");
        } catch (err) {
          console.error("⚠️ [DEBUG] Failed to delete legacy local file:", err.message);
        }
      }
    }

    await Gallery.findByIdAndDelete(req.params.id);
    await logActivity(req.user ? req.user.name : "Admin", `Gallery Image Deleted: ${img.title || "Untitled"}`);
    
    res.json({ msg: "Deleted ✅" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete failed ❌" });
  }
};