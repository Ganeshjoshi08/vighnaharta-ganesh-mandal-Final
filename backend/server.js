const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

//--------------------------------------------------
// 🔐 MIDDLEWARES
//--------------------------------------------------
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ 🔥 BUG FIX (UPLOADS SERVE KARNE KE LIYE)
app.use("/uploads", express.static("uploads"));

//--------------------------------------------------
// 📡 ROUTES
//--------------------------------------------------
app.use("/api/auth", require("./routes/authRoutes"));

// 🔥 FIX HERE ONLY
app.use("/api", require("./routes/eventRoutes"));
app.use("/api", require("./routes/aboutHistoryRoutes"));

app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/mantras", require("./routes/mantraRoutes"));

//--------------------------------------------------
// 🏠 BASE ROUTE
//--------------------------------------------------
app.get("/", (req, res) => {
  res.send("🙏 Vighnaharta API running successfully 🚀");
});

//--------------------------------------------------
// ❌ GLOBAL ERROR HANDLER
//--------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    msg: err.message || "Something went wrong ❌"
  });
});

//--------------------------------------------------
// 🚀 SERVER START
//--------------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});