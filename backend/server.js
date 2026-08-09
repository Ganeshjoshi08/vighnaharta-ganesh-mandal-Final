const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB().then(() => {
  // 🧹 Clean legacy hardcoded localhost URLs from database
  const Gallery = require("./models/Gallery");
  const Activity = require("./models/Activity");
  
  const cleanDatabaseUrls = async () => {
    try {
      const galleryItems = await Gallery.find({ imageUrl: { $regex: "http://localhost:5000" } });
      for (let item of galleryItems) {
        item.imageUrl = item.imageUrl.replace("http://localhost:5000", "");
        await item.save();
      }
      const activityItems = await Activity.find({ imageUrl: { $regex: "http://localhost:5000" } });
      for (let item of activityItems) {
        item.imageUrl = item.imageUrl.replace("http://localhost:5000", "");
        await item.save();
      }
      if (galleryItems.length > 0 || activityItems.length > 0) {
        console.log("🧹 Database image URLs migrated successfully!");
      }
    } catch (err) {
      console.error("Migration error:", err.message);
    }
  };
  cleanDatabaseUrls();
});

const app = express();

//--------------------------------------------------
// 🔐 MIDDLEWARES
//--------------------------------------------------
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://vighnhartamitramandal.vercel.app",
      "https://www.vighnhartamitramandal.vercel.app"
    ];
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
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
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

//--------------------------------------------------
// 🏠 BASE ROUTE

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