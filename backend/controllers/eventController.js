const Event = require("../models/Event");

// 🔐 Validation
const isValidTitle = (title) => {
  return title && title.trim().length >= 3;
};

const isValidDescription = (desc) => {
  return desc && desc.trim().length >= 5;
};

const isValidDate = (date) => {
  return !isNaN(Date.parse(date));
};

//--------------------------------------------------
// 📥 GET ALL EVENTS
//--------------------------------------------------
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.log("GET EVENTS ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// ➕ CREATE EVENT (ADMIN ONLY)
//--------------------------------------------------
exports.createEvent = async (req, res) => {
  try {
    let { title, description, date, location, image } = req.body;

    // 🔥 ONLY CHECK USER EXISTS (ADMIN ALREADY CHECKED IN ROUTE)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "Unauthorized ❌" });
    }

    // 🔥 CLEAN INPUT
    title = title?.trim();
    description = description?.trim();

    // validations
    if (!title || !description || !date) {
      return res.status(400).json({ msg: "Required fields missing ❌" });
    }

    if (!isValidTitle(title)) {
      return res.status(400).json({ msg: "Invalid title ❌" });
    }

    if (!isValidDescription(description)) {
      return res.status(400).json({ msg: "Invalid description ❌" });
    }

    if (!isValidDate(date)) {
      return res.status(400).json({ msg: "Invalid date ❌" });
    }

    // 🔥 DATE FIX
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ msg: "Invalid date format ❌" });
    }

    const event = new Event({
      title,
      description,
      date: parsedDate,
      location: location || "",
      image: image || "",
      createdBy: req.user._id
    });

    await event.save();

    res.status(201).json({
      msg: "Event created 🎉",
      event
    });

  } catch (err) {
    console.log("🔥 EVENT ERROR FULL:", err);
    res.status(500).json({
      msg: err.message || "Server error ❌"
    });
  }
};

//--------------------------------------------------
// ❌ DELETE EVENT
//--------------------------------------------------
exports.deleteEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized ❌" });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found ❌" });
    }

    await event.deleteOne();

    res.json({ msg: "Event deleted successfully ❌" });

  } catch (err) {
    console.log("DELETE EVENT ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};