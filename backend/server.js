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
//--------------------------------------------------
app.get("/api/test-email", async (req, res) => {
  try {
    const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_PASS;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Vighnaharta 🙏 <onboarding@resend.dev>",
        to: "joshiganeshcsmss@gmail.com",
        subject: "Render Resend Verification Test",
        html: "<p>Resend HTTP API connection is successful!</p>"
      })
    });
    const data = await response.json();
    if (response.ok) {
      res.json({ success: true, message: "Resend HTTP API sent test email successfully!", data });
    } else {
      res.status(500).json({ success: false, error: data });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
});

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