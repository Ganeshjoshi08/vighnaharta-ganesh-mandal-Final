const Gallery = require("../models/Gallery");
const { logActivity, createNotification } = require("../utils/activityLogger");

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
    if (!req.file || !req.file.filename) {
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    const img = new Gallery({
      imageUrl: `/uploads/${req.file.filename}`,
      title: req.body.title || "",
      category: req.body.category || "Smart Ganesh Utsav",
      order: Number(req.body.order) || 0,
      uploadedBy: req.user._id
    });

    await img.save();

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
    const img = await Gallery.findById(req.params.id);
    if (img) {
      await Gallery.findByIdAndDelete(req.params.id);
      await logActivity(req.user ? req.user.name : "Admin", `Gallery Image Deleted: ${img.title || "Untitled"}`);
    }
    res.json({ msg: "Deleted ✅" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete failed ❌" });
  }
};