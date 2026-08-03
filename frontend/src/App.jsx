import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import API from "./api/api";
import { SettingsProvider } from "./context/SettingsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Donation from "./pages/Donation";
import Atharvashirsha from "./pages/Atharvashirsha";
import Announcements from "./pages/Announcements";
import Mantras from "./pages/Mantras";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Copyright from "./pages/Copyright";

// New About Pages
import AboutDetails from "./pages/AboutDetails";
import AboutCommittee from "./pages/AboutCommittee";
import AboutJourney from "./pages/AboutJourney";
import AboutMission from "./pages/AboutMission";

// New Gallery Pages
import GallerySmart from "./pages/GallerySmart";
import GalleryReligious from "./pages/GalleryReligious";
import GallerySocial from "./pages/GallerySocial";
import GalleryCultural from "./pages/GalleryCultural";
import GalleryPress from "./pages/GalleryPress";

import Auth from "./pages/Auth";
import Admin from "./pages/Admin";

import ManageUsers from "./pages/ManageUsers";
import ManageDonations from "./pages/ManageDonations";
import ManageAnnouncements from "./pages/ManageAnnouncements";
import ManageEvents from "./pages/ManageEvents";
import ManageGallery from "./pages/ManageGallery"; // ✅ ADD
import ManageActivities from "./pages/ManageActivities";
import ManageMantras from "./pages/ManageMantras";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/auth");

  useEffect(() => {
    const updateHtmlLang = () => {
      const currentLang = localStorage.getItem("lang") || "marathi";
      document.documentElement.setAttribute("lang", currentLang);
    };

    updateHtmlLang();
    window.addEventListener("langChange", updateHtmlLang);
    return () => {
      window.removeEventListener("langChange", updateHtmlLang);
    };
  }, []);

  useEffect(() => {
    const trackPage = async () => {
      try {
        let sessionToken = sessionStorage.getItem("sessionToken");
        if (!sessionToken) {
          sessionToken = "sess_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          sessionStorage.setItem("sessionToken", sessionToken);
        }

        const ua = navigator.userAgent;
        let browser = "Other";
        if (ua.includes("Firefox")) browser = "Firefox";
        else if (ua.includes("SamsungBrowser")) browser = "Samsung Browser";
        else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
        else if (ua.includes("Trident")) browser = "IE";
        else if (ua.includes("Edge") || ua.includes("Edg")) browser = "Edge";
        else if (ua.includes("Chrome")) browser = "Chrome";
        else if (ua.includes("Safari")) browser = "Safari";

        let os = "Other";
        if (ua.includes("Windows")) os = "Windows";
        else if (ua.includes("Macintosh")) os = "MacOS";
        else if (ua.includes("Android")) os = "Android";
        else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
        else if (ua.includes("Linux")) os = "Linux";

        let deviceType = "Desktop";
        if (/Mobi|Android|iPhone/i.test(ua)) deviceType = "Mobile";
        else if (/Tablet|iPad/i.test(ua)) deviceType = "Tablet";

        await API.post("/analytics/track", {
          sessionId: sessionToken,
          path: location.pathname,
          referrer: document.referrer || "Direct",
          browser,
          deviceType,
          os
        });
      } catch (err) {
        console.error("Tracking error:", err);
      }
    };

    trackPage();
  }, [location.pathname]);

  useEffect(() => {
    let interval;
    const startHeartbeat = () => {
      clearInterval(interval);
      interval = setInterval(async () => {
        if (document.visibilityState === "visible") {
          try {
            const sessionToken = sessionStorage.getItem("sessionToken");
            if (sessionToken) {
              await API.post("/analytics/track", {
                sessionId: sessionToken,
                path: location.pathname,
                heartbeat: true
              });
            }
          } catch (err) {
            // ignore
          }
        }
      }, 30000);
    };

    startHeartbeat();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startHeartbeat();
      } else {
        clearInterval(interval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [location.pathname]);

  return (
    <SettingsProvider>
      {!hideLayout && <Navbar />}

      <Routes>

        {/* 🌐 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/atharva" element={<Atharvashirsha />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/mantras" element={<Mantras />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/copyright" element={<Copyright />} />

        {/* ℹ️ ABOUT SUB-CHANNELS */}
        <Route path="/about/details" element={<AboutDetails />} />
        <Route path="/about/committee" element={<AboutCommittee />} />
        <Route path="/about/journey" element={<AboutJourney />} />
        <Route path="/about/vision-mission" element={<AboutMission />} />

        {/* 📸 GALLERY SUB-CHANNELS */}
        <Route path="/gallery/smart-ganesh" element={<GallerySmart />} />
        <Route path="/gallery/religious" element={<GalleryReligious />} />
        <Route path="/gallery/social" element={<GallerySocial />} />
        <Route path="/gallery/cultural" element={<GalleryCultural />} />
        <Route path="/gallery/press" element={<GalleryPress />} />

        {/* 🔐 AUTH */}
        <Route path="/auth" element={<Auth />} />

        {/* 👑 ADMIN ROOT */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* 🔥 ADMIN PAGES */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <ManageUsers />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/donations"
          element={
            <PrivateRoute>
              <ManageDonations />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <PrivateRoute>
              <ManageAnnouncements />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <PrivateRoute>
              <ManageEvents />
            </PrivateRoute>
          }
        />

        {/* ✅ ONLY ADDITION (BUG FIX) */}
        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <ManageGallery />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/activities"
          element={
            <PrivateRoute>
              <ManageActivities />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/mantras"
          element={
            <PrivateRoute>
              <ManageMantras />
            </PrivateRoute>
          }
        />

        {/* ❌ 404 */}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found ❌
            </h2>
          }
        />

      </Routes>

      {!hideLayout && <Footer />}
    </SettingsProvider>
  );
}

export default App;