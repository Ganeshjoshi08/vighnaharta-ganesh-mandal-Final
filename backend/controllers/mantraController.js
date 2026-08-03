const Mantra = require("../models/Mantra");
const fs = require("fs");
const path = require("path");

//--------------------------------------------------
// 📂 LOCAL FILE CLEANUP HELPERS
//--------------------------------------------------
const deleteLocalFile = (filePath) => {
  if (!filePath) return;
  try {
    const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
    const absolutePath = path.join(__dirname, "..", relativePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlink(absolutePath, (err) => {
        if (err) {
          console.error("❌ Failed to delete local file:", absolutePath, err.message);
        } else {
          console.log("🗑️ Deleted old local audio file:", absolutePath);
        }
      });
    }
  } catch (err) {
    console.error("❌ Error unlinking file:", err);
  }
};

//--------------------------------------------------
// 🕉️ MANTRA CONTROLLERS
//--------------------------------------------------

// Get all Mantras (Admin gets all, client gets active only)
exports.getMantras = async (req, res) => {
  try {
    const activeOnly = req.query.activeOnly === "true";
    const filter = activeOnly ? { isActive: true } : {};

    const mantras = await Mantra.find(filter).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({ success: true, count: mantras.length, data: mantras });
  } catch (err) {
    console.error("🔥 GET MANTRAS ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error while fetching mantras", message: err.message });
  }
};

// Create a new Mantra
exports.addMantra = async (req, res) => {
  try {
    const { mantraNameMr, mantraNameEn, mantraTextMr, mantraTextEn, displayOrder, isActive } = req.body;

    // Validate inputs
    if (!mantraNameMr || !mantraNameEn || !mantraTextMr || !mantraTextEn) {
      // Cleanup uploaded file on validation failure
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        success: false, 
        msg: "All text fields (Marathi and English) are required ❌", 
        message: "All text fields (Marathi and English) are required" 
      });
    }

    let audioPath = "";
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowedExts = [".mp3", ".wav"];

      if (!allowedExts.includes(ext)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          success: false, 
          msg: "Only MP3 and WAV audio formats are allowed ❌", 
          message: "Only MP3 and WAV audio formats are allowed" 
        });
      }
      audioPath = `/uploads/${req.file.filename}`;
    }

    const mantra = new Mantra({
      mantraNameMr: mantraNameMr.trim(),
      mantraNameEn: mantraNameEn.trim(),
      mantraTextMr: mantraTextMr.trim(),
      mantraTextEn: mantraTextEn.trim(),
      audioFile: audioPath,
      displayOrder: Number(displayOrder) || 0,
      isActive: isActive === "false" ? false : true
    });

    await mantra.save();

    res.status(201).json({ success: true, msg: "Mantra created successfully 🎉", data: mantra });

  } catch (err) {
    console.error("🔥 ADD MANTRA ERROR STACK:", err);
    // Cleanup file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, msg: "Server error while creating mantra", message: err.message });
  }
};

// Update an existing Mantra
exports.updateMantra = async (req, res) => {
  try {
    const { id } = req.params;
    const { mantraNameMr, mantraNameEn, mantraTextMr, mantraTextEn, displayOrder, isActive } = req.body;

    const mantra = await Mantra.findById(id);
    if (!mantra) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ success: false, msg: "Mantra not found ❌", message: "Mantra not found" });
    }

    // Validate inputs if provided
    if (mantraNameMr !== undefined && !mantraNameMr) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, msg: "Mantra Name Marathi is required ❌" });
    }
    if (mantraNameEn !== undefined && !mantraNameEn) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, msg: "Mantra Name English is required ❌" });
    }
    if (mantraTextMr !== undefined && !mantraTextMr) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, msg: "Marathi Mantra Text is required ❌" });
    }
    if (mantraTextEn !== undefined && !mantraTextEn) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, msg: "English Mantra Text is required ❌" });
    }

    // Handle new audio upload
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      const allowedExts = [".mp3", ".wav"];

      if (!allowedExts.includes(ext)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ 
          success: false, 
          msg: "Only MP3 and WAV audio formats are allowed ❌", 
          message: "Only MP3 and WAV audio formats are allowed" 
        });
      }

      // Delete the old audio file from local disk if it exists
      if (mantra.audioFile) {
        deleteLocalFile(mantra.audioFile);
      }

      mantra.audioFile = `/uploads/${req.file.filename}`;
    }

    // Update fields
    if (mantraNameMr !== undefined) mantra.mantraNameMr = mantraNameMr.trim();
    if (mantraNameEn !== undefined) mantra.mantraNameEn = mantraNameEn.trim();
    if (mantraTextMr !== undefined) mantra.mantraTextMr = mantraTextMr.trim();
    if (mantraTextEn !== undefined) mantra.mantraTextEn = mantraTextEn.trim();
    if (displayOrder !== undefined) mantra.displayOrder = Number(displayOrder) || 0;
    if (isActive !== undefined) mantra.isActive = String(isActive) === "false" ? false : true;

    await mantra.save();

    res.status(200).json({ success: true, msg: "Mantra updated successfully 🎉", data: mantra });

  } catch (err) {
    console.error("🔥 UPDATE MANTRA ERROR STACK:", err);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, msg: "Server error while updating mantra", message: err.message });
  }
};

// Delete a Mantra
exports.deleteMantra = async (req, res) => {
  try {
    const { id } = req.params;

    const mantra = await Mantra.findById(id);
    if (!mantra) {
      return res.status(404).json({ success: false, msg: "Mantra not found ❌", message: "Mantra not found" });
    }

    // Delete the local file from disk if it exists
    if (mantra.audioFile) {
      deleteLocalFile(mantra.audioFile);
    }

    await Mantra.findByIdAndDelete(id);

    res.status(200).json({ success: true, msg: "Mantra deleted successfully 🗑️" });

  } catch (err) {
    console.error("🔥 DELETE MANTRA ERROR STACK:", err);
    res.status(500).json({ success: false, msg: "Server error while deleting mantra", message: err.message });
  }
};
