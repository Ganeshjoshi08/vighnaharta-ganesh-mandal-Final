const Gallery = require("../models/Gallery");

//--------------------------------------------------
// 📥 GET ALL IMAGES
//--------------------------------------------------
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
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
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      title: req.body.title || "",
      uploadedBy: req.user._id
    });

    await img.save();

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
// ❌ DELETE
//--------------------------------------------------
exports.deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted ✅" });
  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ msg: "Delete failed ❌" });
  }
};