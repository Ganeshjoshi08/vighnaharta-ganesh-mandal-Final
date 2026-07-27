const Activity = require("../models/Activity");

//--------------------------------------------------
// 📥 GET ALL ACTIVITIES
//--------------------------------------------------
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ order: 1, createdAt: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// ➕ ADD ACTIVITY (ADMIN ONLY)
//--------------------------------------------------
exports.addActivity = async (req, res) => {
  try {
    if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
      return res.status(403).json({ msg: "Access denied ❌" });
    }

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ msg: "No file uploaded ❌" });
    }

    const { title, titleEn, tag, tagEn, description, descriptionEn, order } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required ❌" });
    }

    const act = new Activity({
      title,
      titleEn: titleEn || "",
      tag: tag || "",
      tagEn: tagEn || "",
      description: description || "",
      descriptionEn: descriptionEn || "",
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
      order: Number(order) || 0,
      uploadedBy: req.user._id
    });

    await act.save();

    res.status(201).json({
      msg: "Activity added ✅",
      activity: act
    });

  } catch (err) {
    console.log("ADD ACTIVITY ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 🔧 UPDATE ACTIVITY DETAILS & ORDER (ADMIN ONLY)
//--------------------------------------------------
exports.updateActivity = async (req, res) => {
  try {
    if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
      return res.status(403).json({ msg: "Access denied ❌" });
    }

    const { title, titleEn, tag, tagEn, description, descriptionEn, order } = req.body;
    const act = await Activity.findById(req.params.id);

    if (!act) {
      return res.status(404).json({ msg: "Activity not found ❌" });
    }

    if (title !== undefined) act.title = title;
    if (titleEn !== undefined) act.titleEn = titleEn;
    if (tag !== undefined) act.tag = tag;
    if (tagEn !== undefined) act.tagEn = tagEn;
    if (description !== undefined) act.description = description;
    if (descriptionEn !== undefined) act.descriptionEn = descriptionEn;
    if (order !== undefined) act.order = Number(order) || 0;

    await act.save();

    res.json({
      msg: "Activity updated ✅",
      activity: act
    });

  } catch (err) {
    console.log("UPDATE ACTIVITY ERROR:", err);
    res.status(500).json({ msg: "Update failed ❌" });
  }
};

//--------------------------------------------------
// ❌ DELETE
//--------------------------------------------------
exports.deleteActivity = async (req, res) => {
  try {
    if (!req.user || (req.user.isAdmin !== true && req.user.role !== "admin")) {
      return res.status(403).json({ msg: "Access denied ❌" });
    }

    await Activity.findByIdAndDelete(req.params.id);
    res.json({ msg: "Activity deleted ✅" });
  } catch (err) {
    console.log("DELETE ACTIVITY ERROR:", err);
    res.status(500).json({ msg: "Delete failed ❌" });
  }
};
