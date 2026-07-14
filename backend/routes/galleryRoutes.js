const express = require("express");
const router = express.Router();

const {
  getImages,
  addImage,
  deleteImage
} = require("../controllers/galleryController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// ✅ multer import
const upload = require("../middleware/upload");

//--------------------------------------------------
// 🖼️ GALLERY ROUTES
//--------------------------------------------------

// ✅ Public: sab images dekh sakte hain
router.get("/", getImages);

// 🔒 Admin only: image upload (SAFE FIX ADDED)
router.post(
  "/",
  protect,
  isAdmin,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        console.log("MULTER ERROR:", err);
        return res.status(400).json({ msg: "File upload error ❌" });
      }
      next();
    });
  },
  addImage
);

// 🔒 Admin only: delete image
router.delete("/:id", protect, isAdmin, deleteImage);

module.exports = router;