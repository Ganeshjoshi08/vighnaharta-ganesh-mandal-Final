const Event = require("../models/Event");
const Registration = require("../models/Registration");
const { logActivity, createNotification } = require("../utils/activityLogger");

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

    await logActivity(req.user.name, `Event Created: ${event.title}`);
    await createNotification(
      "EVENT",
      "New Event Created 📅",
      `Event "${event.title}" has been created for ${event.date.toLocaleDateString()}.`,
      "/events"
    );

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

    await logActivity(req.user.name, `Event Deleted: ${event.title}`);

    res.json({ msg: "Event deleted successfully ❌" });

  } catch (err) {
    console.log("DELETE EVENT ERROR:", err);
    res.status(500).json({ msg: "Server error ❌" });
  }
};

//--------------------------------------------------
// 📝 REGISTER FOR EVENT
//--------------------------------------------------
exports.registerForEvent = async (req, res) => {
  try {
    const { fullName, contactNumber, competition, ticketId } = req.body;

    if (!fullName || !contactNumber || !competition || !ticketId) {
      return res.status(400).json({ msg: "All fields are required ❌" });
    }

    const newRegistration = new Registration({
      fullName: fullName.trim(),
      contactNumber: contactNumber.trim(),
      competition: competition.trim(),
      ticketId: ticketId.trim()
    });

    await newRegistration.save();

    await logActivity(newRegistration.fullName, `Event Registration: ${newRegistration.competition}`);
    await createNotification(
      "USER_REGISTRATION",
      "New Event Registration 🎟️",
      `${newRegistration.fullName} registered for "${newRegistration.competition}".`,
      "/admin"
    );

    res.status(201).json({
      msg: "Registration successful 🎉",
      registration: newRegistration
    });
  } catch (err) {
    console.log("EVENT REGISTRATION ERROR:", err);
    res.status(500).json({
      msg: err.message || "Server error ❌"
    });
  }
};