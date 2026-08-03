const ActivityLog = require("../models/ActivityLog");
const Notification = require("../models/Notification");

const logActivity = async (username, action) => {
  try {
    const log = new ActivityLog({
      username: username || "System / Guest",
      action
    });
    await log.save();
    console.log(`[ACTIVITY] ${username || "Guest"}: ${action}`);
  } catch (err) {
    console.error("❌ Error logging activity:", err.message);
  }
};

const createNotification = async (type, title, message = "", actionUrl = "") => {
  try {
    const notif = new Notification({
      type,
      title,
      message,
      actionUrl
    });
    await notif.save();
    console.log(`[NOTIFICATION] ${type}: ${title}`);
  } catch (err) {
    console.error("❌ Error creating notification:", err.message);
  }
};

module.exports = {
  logActivity,
  createNotification
};
